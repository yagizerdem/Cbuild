import os
from pathlib import Path
import re
import shutil
import tempfile
from types import SimpleNamespace
from typing import cast
import unittest
from unittest.mock import patch

from cbuild_backend.env import Env
from cbuild_backend.evaluator.assignment_evaluator import AssignmentIREvaluator
from cbuild_backend.evaluator.conditional_evaluator import ConditionalIREvaluator
from cbuild_backend.execution.auto_variable import AutomaticVariableEnv
from cbuild_backend.execution.preq_resolution.type import (
    OutOfDateResolution,
    PathOrigin,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.expansion import (
    RecipeExpansionEngine,
    RecursiveVariableExpansionException,
    ValueExpansionEngine,
)
from cbuild_backend.model import NormalRule
from cbuild_compiler.ir import AssignmentIR, ConditionalIR, NormalRuleIR
from test.util.cli_options import empty_cli_options
from test.util.compile import compile
from type.cbuild_exception import CbuildException, MachineCode


# Test numbers correspond to the requested 101-case coverage list.
# Every expression below is parsed and compiled; no hand-built expression IR.
def _environment(parent=None):
    env = Env(empty_cli_options())
    env.enclosing = parent
    return env


def _compiled_rule(command, prerequisites=""):
    rule = compile(f"build/app: {prerequisites}\n\t{command}\n")[0]
    assert isinstance(rule, NormalRuleIR)
    return cast(NormalRuleIR, rule)


def _recipe(command):
    return _compiled_rule(command).recipes[0]


def _value(expression):
    ir = _recipe(expression)
    if ir.recipe.kind != "command":
        raise Exception("Expected command recipe")
    return ir.recipe.command


def _expand(expression, env=None):
    if env is None:
        env = _environment()
    return _recipe(expression).exec(RecipeExpansionEngine(env))


def _deferred(env, name, expression):
    env.set_deferred_variable(name, _value(expression))


def _automatic(command, parent=None, names=None, order_only=None, stale=None):
    if parent is None:
        parent = _environment()
    if names is None:
        names = ["src/a.ts", "lib/b.ts", "src/a.ts", "src/c.ts", "other/a.ts"]
    if order_only is None:
        order_only = ["cache", "build/stamp", "cache"]
    if stale is None:
        stale = [0, 2, 4]
    header = (
        f"{' '.join(names)}{(f' | {" ".join(order_only)}' if len(order_only) else '')}"
    )
    ir = _compiled_rule(command, header)
    engine = ValueExpansionEngine(parent)
    rule = NormalRule(
        {
            "target": engine.expand(ir.targets[0]),
            "prerequisites": [engine.expand(item) for item in ir.prerequisites],
            "order_only_prerequisites": [
                engine.expand(item) for item in ir.order_only_prerequisites
            ],
            "shell_commands": [],
            "recipe_irs": ir.recipes,
            "evaluated_recipe_irs": ir.recipes,
            "rule_ir": ir,
            "rule_seperator": ir.separator,
        }
    )

    def resolve(preq_name):
        return PreqResolution(
            preq_name=preq_name,
            vpath_rules=[],
            origin=PathOrigin("cwd", os.path.abspath(preq_name)),
        )

    preqs = [resolve(item) for item in rule.prerequisites]
    target = TargetResolution(
        target_name=rule.target,
        vpath_rules=[],
        origin=PathOrigin("cwd", os.path.abspath(rule.target)),
    )
    # Supply a deterministic freshness result: timestamp resolution is not under test.
    env = AutomaticVariableEnv(
        rule,
        parent,
        target,
        preqs,
        [resolve(item) for item in rule.order_only_prerequisites],
        OutOfDateResolution(
            resolved_target=target,
            resolved_preqs=preqs,
            is_target_out_of_date=len(stale) > 0,
            out_of_date_preqs=[preqs[index] for index in stale],
        ),
    ).generate()
    return SimpleNamespace(
        env=env, ir=ir, run=lambda: ir.recipes[0].exec(RecipeExpansionEngine(env))
    )


def _expect_error(action, message):
    caught = None
    try:
        action()
    except Exception as error:
        caught = error
    assert isinstance(caught, CbuildException)
    assert caught.machine_code == MachineCode.ERROR_FN
    assert caught.message == message


def _slash(input):
    return input.replace("\\", "/")


def _words(output):
    return [] if output == "" else [_slash(item) for item in re.split(r"\s+", output)]


class _RestoreMocksTestCase(unittest.TestCase):
    def tearDown(self) -> None:
        patch.stopall()


class RecipeAutomaticVariablesParserCompilerExpansionTest(_RestoreMocksTestCase):
    def test_1_10_recipe_reference(self) -> None:
        for _id, expression, expected in [
            [1, "$(+F)", "a.ts b.ts a.ts c.ts a.ts"],
            [2, "$(+D)", "src lib src src other"],
            [3, "$(?F)", "a.ts a.ts"],
            [4, "$(?D)", "src other"],
            [5, "$(|)", "cache build/stamp"],
            [6, "${+F}", "a.ts b.ts a.ts c.ts a.ts"],
            [7, "${+D}", "src lib src src other"],
            [8, "${?F}", "a.ts a.ts"],
            [9, "${?D}", "src other"],
            [10, "${|}", "cache build/stamp"],
        ]:
            with self.subTest(
                "%i. recipe reference %s",
                _id=_id,
                expression=expression,
                expected=expected,
            ):
                self.assertEqual(
                    _automatic(f"echo [{expression}]").run(), f"echo [{expected}]"
                )

    def test_11_prerequisite_automatic_variables_are_empty_without_prerequisites(
        self,
    ) -> None:
        self.assertEqual(
            _automatic("echo [$<][$^][$+][$?][$|]", _environment(), [], [], []).run(),
            "echo [][][][][]",
        )

    def test_12_prerequisite_d_f_variants_are_empty_target_d_f_remain_available(
        self,
    ) -> None:
        self.assertEqual(
            _automatic(
                "echo [$(<D)][$(<F)][$(^D)][$(^F)][$(+D)][$(+F)][$(?D)][$(?F)]|$(@D)|$(@F)",
                _environment(),
                [],
                [],
                [],
            ).run(),
            "echo [][][][][][][][]|build|app",
        )

    def test_13_22_duplicate_behavior(self) -> None:
        for _id, expression, expected in [
            [13, "$+", "src/a.ts lib/b.ts src/a.ts src/c.ts other/a.ts"],
            [14, "$(+D)", "src lib src src other"],
            [15, "$(+F)", "a.ts b.ts a.ts c.ts a.ts"],
            [16, "$^", "src/a.ts lib/b.ts src/c.ts other/a.ts"],
            [17, "$(^D)", "src lib src other"],
            [18, "$(^F)", "a.ts b.ts c.ts a.ts"],
            [19, "$?", "src/a.ts other/a.ts"],
            [20, "$(?D)", "src other"],
            [21, "$(?F)", "a.ts a.ts"],
            [22, "$|", "cache build/stamp"],
        ]:
            with self.subTest(
                "%i. duplicate behavior of %s",
                _id=_id,
                expression=expression,
                expected=expected,
            ):
                # Distinct files sharing a basename/directory must survive D/F projection.
                self.assertEqual(
                    _automatic(f"echo {expression}").run(), f"echo {expected}"
                )

    def test_23_automatic_variables_shadow_values_through_nested_environments(
        self,
    ) -> None:
        global_ = _environment()
        global_.set_raw_variable("+F", "global")
        local = _environment(global_)
        local.set_raw_variable("+F", "local")
        auto = _automatic("echo $(+F)", local)
        child = _environment(auto.env)
        self.assertEqual(_expand("echo $(+F)", child), "echo a.ts b.ts a.ts c.ts a.ts")
        self.assertEqual(local.require_raw_variable("+F"), "local")
        self.assertEqual(global_.require_raw_variable("+F"), "global")

    def test_24_automatic_bindings_win_locally_without_overwriting_global_variables(
        self,
    ) -> None:
        global_ = _environment()
        global_.set_raw_variable("+", "global-list", "command-line")
        global_.set_raw_variable("MODE", "debug")
        original = global_.require_variable("+")
        auto = _automatic("echo $+|$(MODE)", global_, ["input.ts"], [], [])
        self.assertEqual(auto.run(), "echo input.ts|debug")
        self.assertEqual(auto.env.require_variable("+").origin, "automatic")
        self.assertEqual(global_.require_variable("+"), original)
        self.assertEqual(global_.require_raw_variable("+"), "global-list")


class CallScopeTest(_RestoreMocksTestCase):
    def test_25_call_binds_0_to_the_function_name(self) -> None:
        env = _environment()
        _deferred(env, "label", "$(0):$(1)")
        self.assertEqual(_expand("$(call label,arg)", env), "label:arg")

    def test_26_nested_call_restores_the_outer_0(self) -> None:
        env = _environment()
        _deferred(env, "inner", "$(0)")
        _deferred(env, "outer", "$(0)|$(call inner)|$(0)")
        self.assertEqual(_expand("$(call outer)", env), "outer|inner|outer")

    def test_27_missing_inner_positional_arguments_shadow_outer_arguments(self) -> None:
        env = _environment()
        _deferred(env, "inner", "[$(1)][$(2)][$(9)]")
        _deferred(env, "outer", "$(call inner,x)|$(2)|$(9)")
        self.assertEqual(_expand("$(call outer,a,b,c,d,e,f,g,h,i)", env), "[x][][]|b|i")

    def test_28_nested_calls_isolate_arguments_beyond_position_nine(self) -> None:
        env = _environment()
        args = ",".join([f"a{i + 1}" for i in range(12)])
        _deferred(env, "inner", "[$(1)][$(10)][$(12)]")
        _deferred(env, "outer", f"$(call inner,{args})|$(call inner,x)|$(10)|$(12)")
        self.assertEqual(
            _expand(f"$(call outer,{args})", env), "[a1][a10][a12]|[x][][]|a10|a12"
        )

    def test_29_call_leaves_existing_positional_bindings_intact_and_adds_none(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("0", "root")
        env.set_raw_variable("1", "saved")
        _deferred(env, "fn", "$(0):$(1):$(2)")
        entries = [*env.variable_entries()]
        self.assertEqual(
            _expand("$(call fn,x,y)|$(0)|$(1)|$(2)", env), "fn:x:y|root|saved|"
        )
        self.assertEqual([*env.variable_entries()], entries)

    def test_30_call_exception_leaves_positional_bindings_intact(self) -> None:
        env = _environment()
        env.set_raw_variable("1", "saved")
        _deferred(env, "fail", "$(error failed-$(1))")
        entries = [*env.variable_entries()]
        _expect_error(lambda: _expand("$(call fail,x)", env), "failed-x")
        self.assertEqual([*env.variable_entries()], entries)
        self.assertEqual(_expand("[$(0)][$(1)][$(2)]", env), "[][saved][]")

    def test_31_nested_call_exception_cleans_every_call_scope(self) -> None:
        env = _environment()
        _deferred(env, "inner", "$(error $(0)-$(1))")
        _deferred(env, "outer", "$(call inner,$(1))")
        entries = [*env.variable_entries()]
        _expect_error(lambda: _expand("$(call outer,x)", env), "inner-x")
        self.assertEqual([*env.variable_entries()], entries)
        _deferred(env, "inner", "$(0):$(1)")
        self.assertEqual(_expand("$(call outer,recovered)", env), "inner:recovered")
        self.assertEqual(env.has_variable("0"), False)
        self.assertEqual(env.has_variable("1"), False)

    def test_32_call_finds_global_variables(self) -> None:
        global_ = _environment()
        global_.set_raw_variable("GLOBAL", "root")
        _deferred(global_, "fn", "$(GLOBAL)-$(1)")
        self.assertEqual(_expand("$(call fn,x)", _environment(global_)), "root-x")

    def test_33_call_resolves_enclosing_variables_before_global_variables(self) -> None:
        global_ = _environment()
        global_.set_raw_variable("NAME", "global")
        _deferred(global_, "fn", "$(NAME)")
        local = _environment(global_)
        local.set_raw_variable("NAME", "local")
        self.assertEqual(_expand("$(call fn)", local), "local")

    def test_34_nested_deferred_variables_see_the_current_call_arguments(self) -> None:
        env = _environment()
        _deferred(env, "leaf", "$(1)-$(SUFFIX)")
        _deferred(env, "middle", "$(leaf)")
        _deferred(env, "fn", "$(middle)")
        env.set_raw_variable("SUFFIX", "tail")
        self.assertEqual(_expand("$(call fn,head)", env), "head-tail")

    def test_35_call_expands_its_function_name(self) -> None:
        env = _environment()
        env.set_raw_variable("SELECT", "fn")
        _deferred(env, "fn", "$(0):$(1)")
        self.assertEqual(_expand("$(call $(SELECT),x)", env), "fn:x")


class ForeachScopeTest(_RestoreMocksTestCase):
    def test_36_foreach_restores_the_exact_previous_iterator_variable(self) -> None:
        env = _environment()
        _deferred(env, "item", "$(BASE)")
        env.set_raw_variable("BASE", "saved")
        original = env.require_variable("item")
        self.assertEqual(
            _expand("$(foreach item,a b,[$(item)])|$(item)", env), "[a] [b]|saved"
        )
        self.assertEqual(env.require_variable("item"), original)

    def test_37_nested_foreach_iterators_shadow_enclosing_values(self) -> None:
        global_ = _environment()
        global_.set_raw_variable("i", "global-i")
        global_.set_raw_variable("j", "global-j")
        env = _environment(global_)
        self.assertEqual(
            _expand("$(foreach i,a b,$(foreach j,1 2,$(i)$(j)))|$(i)|$(j)", env),
            "a1 a2 b1 b2|global-i|global-j",
        )
        self.assertEqual(env.variable_count, 0)

    def test_38_nested_foreach_with_the_same_iterator_restores_the_outer_iteration(
        self,
    ) -> None:
        self.assertEqual(
            _expand("$(foreach x,a b,$(x):$(foreach x,1 2,$(x)):$(x))"),
            "a:1 2:a b:1 2:b",
        )

    def test_39_foreach_exception_removes_new_iterators_and_restores_old_ones(
        self,
    ) -> None:
        for existing in [False, True]:
            env = _environment()
            if existing:
                env.set_raw_variable("x", "saved")
            entries = [*env.variable_entries()]
            _expect_error(
                lambda: _expand("$(foreach x,a b,$(error fail-$(x)))", env), "fail-a"
            )
            self.assertEqual([*env.variable_entries()], entries)

    def test_40_foreach_containing_call_cleans_scopes_on_success_and_failure(
        self,
    ) -> None:
        env = _environment()
        _deferred(env, "fn", "$(1)-$(x)")
        self.assertEqual(_expand("$(foreach x,a b,$(call fn,$(x)))", env), "a-a b-b")
        _deferred(env, "fn", "$(error fail-$(1))")
        entries = [*env.variable_entries()]
        _expect_error(
            lambda: _expand("$(foreach x,a b,$(call fn,$(x)))", env), "fail-a"
        )
        self.assertEqual([*env.variable_entries()], entries)

    def test_41_call_containing_foreach_cleans_scopes_on_success_and_failure(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("x", "saved")
        _deferred(env, "fn", "$(foreach x,a b,$(1)-$(x))")
        self.assertEqual(_expand("$(call fn,arg)|$(x)", env), "arg-a arg-b|saved")
        _deferred(env, "fn", "$(foreach x,a b,$(error $(1)-$(x)))")
        entries = [*env.variable_entries()]
        _expect_error(lambda: _expand("$(call fn,arg)", env), "arg-a")
        self.assertEqual([*env.variable_entries()], entries)

    def test_42_foreach_body_looks_up_enclosing_variables(self) -> None:
        parent = _environment()
        parent.set_raw_variable("PREFIX", "root")
        self.assertEqual(
            _expand("$(foreach x,a b,$(PREFIX)-$(x))", _environment(parent)),
            "root-a root-b",
        )


class RecursionAndReusableEngineExceptionCleanupTest(_RestoreMocksTestCase):
    def test_43_46_recursion_is_rejected(self) -> None:
        for _id, _name, definitions in [
            [43, "direct self recursion", {"A": "$(A)"}],
            [44, "indirect recursion", {"A": "$(B)", "B": "$(A)"}],
            [
                45,
                "four-variable cycle",
                {"A": "$(B)", "B": "$(C)", "C": "$(D)", "D": "$(A)"},
            ],
            [
                46,
                "recursion inside nested functions",
                {"A": "$(strip $(if yes,$(B),ok))", "B": "$(A)"},
            ],
        ]:
            with self.subTest("%i. %s", _id=_id, _name=_name, definitions=definitions):
                env = _environment()
                for name, expression in list(definitions.items()):
                    _deferred(env, name, expression)
                with self.assertRaises(Exception) as raised:
                    _expand("$(A)", env)
                self.assertEqual(
                    str(raised.exception), str(RecursiveVariableExpansionException("A"))
                )

    def test_47_49_active_lookups_are_cleared_after_exception(self) -> None:
        for _id, _name, definitions, kind in [
            [47, "recursion exception", {"A": "$(B)", "B": "$(A)"}, "recursive"],
            [48, "function exception", {"A": "$(error boom)"}, "function"],
            [
                49,
                "nested exception",
                {"A": "$(strip $(B))", "B": "$(if yes,$(error boom),ok)"},
                "function",
            ],
        ]:
            with self.subTest(
                "%i. active lookups are cleared after %s",
                _id=_id,
                _name=_name,
                definitions=definitions,
                kind=kind,
            ):
                env = _environment()
                for name, expression in list(definitions.items()):
                    _deferred(env, name, expression)
                active = set()
                engine = ValueExpansionEngine(env, active)
                expression = _value("$(A)")
                if kind == "recursive":
                    with self.assertRaises(RecursiveVariableExpansionException):
                        engine.expand(expression)
                else:
                    _expect_error(lambda: engine.expand(expression), "boom")
                self.assertEqual([*active], [])
                _deferred(env, "A", "recovered")
                self.assertEqual(engine.expand(expression), "recovered")
                self.assertEqual([*active], [])

    def test_50_the_same_recipe_engine_works_again_after_an_exception(self) -> None:
        env = _environment()
        _deferred(env, "A", "$(error boom)")
        engine = RecipeExpansionEngine(env)
        ir = _recipe("echo $(A)")
        _expect_error(lambda: ir.exec(engine), "boom")
        _deferred(env, "A", "ok")
        self.assertEqual(ir.exec(engine), "echo ok")
        self.assertEqual(ir.exec(engine), "echo ok")


class WildcardExpansionAgainstIsolatedRealFilesTest(_RestoreMocksTestCase):
    directory: str
    relative: str

    def setUp(self) -> None:
        # Unique self.directory under cwd permits self.relative tests without process.chdir.
        self.directory = tempfile.mkdtemp(prefix=".recipe-expansion-", dir=os.getcwd())
        self.relative = _slash(os.path.relpath(self.directory, os.getcwd()))
        os.makedirs(os.path.join(self.directory, "nested"))
        for name in ["a.ts", "b.txt", ".hidden.ts", "nested/c.ts"]:
            Path(os.path.join(self.directory, name)).write_text("fixture", newline="")

    def tearDown(self) -> None:
        super().tearDown()
        if not self.directory:
            return
        inside = os.path.relpath(self.directory, os.getcwd())
        if (
            os.path.isabs(inside)
            or not inside.startswith(".recipe-expansion-")
            or os.sep in inside
        ):
            raise Exception(
                "Refusing to remove a self.directory outside the test fixture"
            )
        shutil.rmtree(self.directory, ignore_errors=True)

    def _wildcard(self, patterns, env=None):
        if env is None:
            env = _environment()
        env.set_raw_variable("PATTERNS", patterns)
        return _words(_expand("$(wildcard $(PATTERNS))", env))

    def test_51_unmatched_wildcard_produces_no_words(self) -> None:
        self.assertEqual(self._wildcard(f"{self.relative}/*.missing"), [])

    def test_52_a_literal_existing_filename_is_returned(self) -> None:
        self.assertEqual(
            self._wildcard(f"{self.relative}/a.ts"), [f"{self.relative}/a.ts"]
        )

    def test_53_57_wildcard_handles_whitespace(self) -> None:
        for _id, _name, leading, separator, trailing in [
            [53, "leading whitespace", "  \t", " ", ""],
            [54, "trailing whitespace", "", " ", " \t "],
            [55, "consecutive spaces", "", "    ", ""],
            [56, "tab-separated patterns", "", "\t", ""],
            [57, "mixed whitespace", "\t ", " \t\n  ", "\n\t"],
        ]:
            with self.subTest(
                "%i. wildcard handles %s",
                _id=_id,
                _name=_name,
                leading=leading,
                separator=separator,
                trailing=trailing,
            ):
                self.assertEqual(
                    self._wildcard(
                        f"{leading}{self.relative}/a.ts{separator}{self.relative}/b.txt{trailing}"
                    ),
                    [f"{self.relative}/a.ts", f"{self.relative}/b.txt"],
                )

    def test_58_duplicate_patterns_preserve_duplicate_results(self) -> None:
        self.assertEqual(
            self._wildcard(f"{self.relative}/a.ts {self.relative}/a.ts"),
            [f"{self.relative}/a.ts", f"{self.relative}/a.ts"],
        )

    def test_59_relative_directory_patterns_find_nested_files(self) -> None:
        self.assertEqual(
            self._wildcard(f"{self.relative}/nested/*.ts"),
            [f"{self.relative}/nested/c.ts"],
        )

    def test_60_absolute_path_patterns_return_absolute_paths(self) -> None:
        self.assertEqual(
            self._wildcard(f"{_slash(self.directory)}/*.ts"),
            [f"{_slash(self.directory)}/a.ts"],
        )

    def test_61_hidden_files_require_an_explicitly_matching_dot_pattern(self) -> None:
        self.assertEqual(
            self._wildcard(f"{self.relative}/*.ts"), [f"{self.relative}/a.ts"]
        )
        self.assertEqual(
            self._wildcard(f"{self.relative}/.*.ts"), [f"{self.relative}/.hidden.ts"]
        )

    def test_62_wildcard_expands_nested_variables(self) -> None:
        env = _environment()
        env.set_raw_variable("DIR", self.relative)
        _deferred(env, "PATTERN", "$(DIR)/nested/*.ts")
        self.assertEqual(
            _words(_expand("$(wildcard $(PATTERN))", env)),
            [f"{self.relative}/nested/c.ts"],
        )

    def test_63_wildcard_expands_nested_functions(self) -> None:
        env = _environment()
        env.set_raw_variable("DIR", self.relative)
        self.assertEqual(
            _words(_expand("$(wildcard $(addsuffix /a.ts,$(strip $(DIR))))", env)),
            [f"{self.relative}/a.ts"],
        )

    def test_64_an_empty_expanded_wildcard_argument_produces_no_words(self) -> None:
        self.assertEqual(_expand("$(wildcard $(MISSING))"), "")


class ComputedVariableNamesAndRecipeIntegrationTest(_RestoreMocksTestCase):
    def test_65_nested_variable_references_construct_a_variable_name(self) -> None:
        env = _environment()
        env.set_raw_variable("KEY", "NAME")
        env.set_raw_variable("NAME", "value")
        self.assertEqual(_expand("$($(KEY))", env), "value")

    def test_66_a_nested_function_constructs_a_variable_name(self) -> None:
        env = _environment()
        env.set_raw_variable("NAME", "value")
        self.assertEqual(_expand("$($(strip NAME))", env), "value")

    def test_67_dynamic_names_combine_literal_and_expanded_components(self) -> None:
        env = _environment()
        env.set_raw_variable("MODE", "debug")
        env.set_raw_variable("flags_debug", "-g")
        self.assertEqual(_expand("$(flags_$(MODE))", env), "-g")

    def test_68_the_parser_and_compiler_preserve_complete_automatic_variable_names(
        self,
    ) -> None:
        for name in ["+F", "+D", "?F", "?D", "|", "^F", "^D", "<F", "<D", "@F", "@D"]:
            for expression in [f"$({name})", f"${{{name}}}"]:
                parts = _value(expression).parts
                self.assertEqual(len(parts), 1)
                part = parts[0]
                self.assertEqual(part.kind, "variable-reference")
                if part.kind != "variable-reference":
                    raise Exception("Expected reference")
                # Lexer tokens may compile to separate text parts; their complete name
                # must be preserved, without requiring a particular IR chunk layout.
                self.assertEqual(
                    all(item.kind == "text" for item in part.name_expr.parts), True
                )
                self.assertEqual(
                    "".join(
                        [
                            (item.lexeme if item.kind == "text" else "")
                            for item in part.name_expr.parts
                        ]
                    ),
                    name,
                )

    def test_69_lexer_punctuation_tokens_survive_inside_variable_names(self) -> None:
        env = _environment()
        for name in ["+F", "?D", "|", "@F", "^D", "<F", "a-b", "a.b", "a/b"]:
            env.set_raw_variable(name, f"value:{name}")
            self.assertEqual(_expand(f"$({name})", env), f"value:{name}")
            self.assertEqual(_expand(f"${{{name}}}", env), f"value:{name}")

    def test_70_parentheses_and_braces_are_equivalent_for_computed_references(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("KEY", "NAME")
        env.set_raw_variable("NAME", "value")
        self.assertEqual(
            _expand("$(NAME)|${NAME}|$($(KEY))|${${KEY}}", env),
            "value|value|value|value",
        )

    def test_71_a_variable_named_after_a_function_remains_distinct_from_its_invocation(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("strip", "variable")
        self.assertEqual(
            _expand("$(strip)|${strip}|$(strip   a   b  )", env),
            "variable|variable|a b",
        )

    def test_72_undefined_dynamic_variable_names_expand_to_empty(self) -> None:
        env = _environment()
        env.set_raw_variable("KEY", "absent")
        self.assertEqual(_expand("before$($(KEY))after", env), "beforeafter")

    def test_73_an_empty_dynamic_variable_name_expands_to_empty(self) -> None:
        self.assertEqual(_expand("before$($(MISSING))after"), "beforeafter")

    def test_74_recipes_expand_raw_variables_without_interpreting_their_contents(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("RAW", "$(error must-not-run)")
        self.assertEqual(_expand("echo $(RAW)", env), "echo $(error must-not-run)")

    def test_75_recipes_evaluate_deferred_variables(self) -> None:
        env = _environment()
        env.set_raw_variable("NAME", "world")
        _deferred(env, "GREETING", "hello $(NAME)")
        self.assertEqual(_expand("echo $(GREETING)", env), "echo hello world")

    def test_76_recipes_expand_nested_functions(self) -> None:
        self.assertEqual(
            _expand("echo $(addprefix obj/,$(addsuffix .o,$(strip a   b)))"),
            "echo obj/a.o obj/b.o",
        )

    def test_77_recipes_combine_automatic_and_normal_variables(self) -> None:
        env = _environment()
        env.set_raw_variable("TOOL", "compiler")
        self.assertEqual(
            _automatic("$(TOOL) $(+F)", env, ["src/a.ts"], [], []).run(),
            "compiler a.ts",
        )

    def test_78_recipe_expansion_propagates_function_errors(self) -> None:
        _expect_error(lambda: _expand("echo $(error recipe-failed)"), "recipe-failed")

    def test_79_immediate_assignment_expansion_rejects_without_installing_a_value(
        self,
    ) -> None:
        env = _environment()
        ir = compile("RESULT := $(error assignment-failed)\n")[0]
        self.assertIsInstance(ir, AssignmentIR)
        with self.assertRaises(Exception) as raised:
            AssignmentIREvaluator(env, cast(AssignmentIR, ir)).execute()
        self.assertEqual(raised.exception.machine_code, MachineCode.ERROR_FN)
        self.assertEqual(raised.exception.message, "assignment-failed")
        self.assertEqual(env.has_variable("RESULT"), False)

    def test_80_conditional_expansion_propagates_errors_before_selecting_a_branch(
        self,
    ) -> None:
        env = _environment()
        ir = compile(
            "ifeq ($(error condition-failed),yes)\nRESULT = yes\nelse\nRESULT = no\nendif\n"
        )[0]
        self.assertIsInstance(ir, ConditionalIR)
        _expect_error(
            lambda: ConditionalIREvaluator(env, cast(ConditionalIR, ir)).execute(),
            "condition-failed",
        )
        self.assertEqual(env.variable_count, 0)


class EvaluationOrderLazinessAndDiagnosticsTest(_RestoreMocksTestCase):
    def test_81_ordinary_function_arguments_evaluate_from_left_to_right(self) -> None:
        warn = patch("builtins.print").start()
        self.assertEqual(
            _expand("$(subst $(warning first)a,$(warning second)b,$(warning third)a)"),
            "b",
        )
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list],
            [["first"], ["second"], ["third"]],
        )

    def test_82_foreach_does_not_evaluate_its_body_for_an_empty_list(self) -> None:
        self.assertEqual(_expand("$(foreach x,$(MISSING),$(error unused))"), "")

    def test_83_if_expands_only_the_selected_branch(self) -> None:
        self.assertEqual(_expand("$(if yes,chosen,$(error unused))"), "chosen")
        self.assertEqual(
            _expand("$(if $(MISSING),$(error unused),fallback)"), "fallback"
        )

    def test_84_or_stops_at_the_first_nonempty_argument(self) -> None:
        self.assertEqual(_expand("$(or $(MISSING),chosen,$(error unused))"), "chosen")

    def test_85_and_stops_at_the_first_empty_argument(self) -> None:
        self.assertEqual(_expand("$(and yes,$(MISSING),$(error unused))"), "")
        self.assertEqual(_expand("$(and first,last)"), "last")

    def test_86_call_evaluates_arguments_before_its_body_in_caller_scope(self) -> None:
        env = _environment()
        env.set_raw_variable("1", "caller")
        _deferred(env, "fn", "$(warning body)$(1)-$(2)")
        warn = patch("builtins.print").start()
        self.assertEqual(
            _expand("$(call fn,$(warning first)a,$(warning second)$(1))", env),
            "a-caller",
        )
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list],
            [["first"], ["second"], ["body"]],
        )

    def test_87_foreach_evaluates_name_and_list_once_then_body_in_word_order(
        self,
    ) -> None:
        warn = patch("builtins.print").start()
        self.assertEqual(
            _expand(
                "$(foreach $(warning name)x,$(warning list)a b,$(warning body-$(x))[$(x)])"
            ),
            "[a] [b]",
        )
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list],
            [["name"], ["list"], ["body-a"], ["body-b"]],
        )

    def test_88_error_expands_its_message_argument(self) -> None:
        env = _environment()
        env.set_raw_variable("MESSAGE", "expanded-message")
        _expect_error(lambda: _expand("$(error $(MESSAGE))", env), "expanded-message")

    def test_89_warning_expands_its_message_argument_and_returns_empty(self) -> None:
        env = _environment()
        env.set_raw_variable("MESSAGE", "expanded-message")
        warn = patch("builtins.print").start()
        self.assertEqual(
            _expand("before$(warning $(MESSAGE))after", env), "beforeafter"
        )
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list], [["expanded-message"]]
        )

    def test_90_error_evaluates_nested_message_functions(self) -> None:
        _expect_error(
            lambda: _expand("$(error $(strip $(addprefix failed-,x)))"), "failed-x"
        )

    def test_91_warning_evaluates_nested_message_functions(self) -> None:
        warn = patch("builtins.print").start()
        self.assertEqual(_expand("$(warning $(strip $(addprefix warn-,x)))"), "")
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list], [["warn-x"]]
        )

    def test_92_undefined_warnings_respect_lookup_through_nested_environments(
        self,
    ) -> None:
        root = _environment()
        root.set_raw_variable("KNOWN", "found")
        env = _environment(_environment(root))
        env.cli_options.warn_undefined_variables = True
        warn = patch("builtins.print").start()
        self.assertEqual(_expand("$(KNOWN)|$(MISSING)", env), "found|")
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list],
            [["cbuild: warning: undefined variable 'MISSING'"]],
        )

    def test_93_undefined_warnings_use_the_expanded_dynamic_name(self) -> None:
        env = _environment()
        env.cli_options.warn_undefined_variables = True
        env.set_raw_variable("KEY", "missing_dynamic")
        warn = patch("builtins.print").start()
        self.assertEqual(_expand("$($(KEY))", env), "")
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list],
            [["cbuild: warning: undefined variable 'missing_dynamic'"]],
        )


class VariableLifetimeEmptyResultsAndDeepExpansionTest(_RestoreMocksTestCase):
    def test_94_raw_contents_stay_literal_through_nested_deferred_call_and_foreach_expansion(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("RAW", "$(error must-not-run)")
        _deferred(env, "ALIAS", "$(RAW)")
        _deferred(env, "identity", "$(1)")
        self.assertEqual(
            _expand(
                "$(strip $(ALIAS))|$(call identity,$(ALIAS))|$(foreach x,a,$(ALIAS))",
                env,
            ),
            "$(error must-not-run)|$(error must-not-run)|$(error must-not-run)",
        )

    def test_95_deferred_variables_evaluate_on_every_access(self) -> None:
        env = _environment()
        _deferred(env, "A", "$(warning evaluated)value")
        warn = patch("builtins.print").start()
        self.assertEqual(_expand("$(A)|$(A)", env), "value|value")
        self.assertEqual(
            [list(call.args) for call in warn.call_args_list],
            [["evaluated"], ["evaluated"]],
        )
        self.assertEqual(env.require_variable("A").is_deferred(), True)

    def test_96_deferred_assignment_sees_later_environment_changes(self) -> None:
        env = _environment()
        env.set_raw_variable("BASE", "before")
        ir = compile("RESULT = $(BASE)\n")[0]
        AssignmentIREvaluator(env, cast(AssignmentIR, ir)).execute()
        engine = RecipeExpansionEngine(env)
        command = _recipe("$(RESULT)")
        self.assertEqual(command.exec(engine), "before")
        env.set_raw_variable("BASE", "after")
        self.assertEqual(command.exec(engine), "after")

    def test_97_immediate_assignment_retains_its_value_after_environment_changes(
        self,
    ) -> None:
        env = _environment()
        env.set_raw_variable("BASE", "before")
        ir = compile("RESULT := $(BASE)\n")[0]
        AssignmentIREvaluator(env, cast(AssignmentIR, ir)).execute()
        env.set_raw_variable("BASE", "after")
        self.assertEqual(_expand("$(RESULT)|$(BASE)", env), "before|after")
        self.assertEqual(env.require_variable("RESULT").is_deferred(), False)

    def test_98_empty_expansions_preserve_surrounding_text_exactly(self) -> None:
        self.assertEqual(
            _expand("echo before[$(MISSING)]$(if $(MISSING),unused,$(MISSING))after"),
            "echo before[]after",
        )

    def test_99_a_deep_deferred_chain_expands_and_leaves_no_active_lookups(
        self,
    ) -> None:
        env = _environment()
        depth = 200
        env.set_raw_variable(f"V{depth}", "leaf")
        for i in range(depth - 1, 0 - 1, -1):
            _deferred(env, f"V{i}", f"[$(V{i + 1})]")
        active = set()
        engine = ValueExpansionEngine(env, active)
        self.assertEqual(
            engine.expand(_value("$(V0)")), "[" * depth + "leaf" + "]" * depth
        )
        self.assertEqual(len(active), 0)

    def test_100_deeply_nested_functions_survive_parsing_compilation_and_expansion(
        self,
    ) -> None:
        expression = "leaf"
        for i in range(0, 64):
            expression = f"$(strip {expression})"
        self.assertEqual(_expand(f"before[{expression}]after"), "before[leaf]after")

    def test_101_deeply_nested_variable_names_survive_the_complete_recipe_pipeline(
        self,
    ) -> None:
        env = _environment()
        depth = 64
        for i in range(0, depth):
            env.set_raw_variable(f"K{i}", f"K{i + 1}")
        env.set_raw_variable(f"K{depth}", "leaf")
        expression = "$(K0)"
        for i in range(0, depth):
            expression = f"$({expression})"
        self.assertEqual(_expand(expression, env), "leaf")


if __name__ == "__main__":
    unittest.main()
