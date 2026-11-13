import os
from types import SimpleNamespace
from typing import cast
import unittest

from cbuild_backend.env import Env
from cbuild_backend.execution.auto_variable import AutomaticVariableEnv
from cbuild_backend.execution.preq_resolution.type import (
    OutOfDateResolution,
    PathOrigin,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.expansion import RecipeExpansionEngine, ValueExpansionEngine
from cbuild_backend.model import NormalRule
from cbuild_compiler.ir import NormalRuleIR
from test.util.cli_options import empty_cli_options
from test.util.compile import compile
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


# Only the eight requested gaps: every expression uses the real parser,
# compiler and expansion engine. No shell execution or filesystem fixtures.
def _environment():
    return Env(empty_cli_options())


def _compiled_rule(command, target="app", prerequisites=""):
    ir = compile(f"{target}: {prerequisites}\n\t{command}\n")[0]
    assert isinstance(ir, NormalRuleIR)
    return cast(NormalRuleIR, ir)


def _recipe(expression):
    return _compiled_rule(expression).recipes[0]


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


_SYNTAXES = ["parentheses", "braces"]


def _invocation(body, syntax):
    return f"$({body})" if syntax == "parentheses" else "${" + body + "}"


def _automatic(command, target="app", stem=None):
    parent = _environment()
    ir = _compiled_rule(command, target, "foo.o bar.o foo.o | stamp stamp")
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
            "stem": stem,
        }
    )

    def resolve(preq_name):
        return PreqResolution(
            preq_name=preq_name,
            vpath_rules=[],
            origin=PathOrigin("cwd", os.path.abspath(preq_name)),
        )

    preqs = [resolve(item) for item in rule.prerequisites]
    resolved_target = TargetResolution(
        target_name=rule.target,
        vpath_rules=[],
        origin=PathOrigin("cwd", os.path.abspath(rule.target)),
    )
    # Freshness is deterministic; only automatic bindings and expansion are tested.
    env = AutomaticVariableEnv(
        rule,
        parent,
        resolved_target,
        preqs,
        [resolve(item) for item in rule.order_only_prerequisites],
        OutOfDateResolution(
            resolved_target=resolved_target,
            resolved_preqs=preqs,
            is_target_out_of_date=True,
            out_of_date_preqs=[preqs[0], preqs[2]],
        ),
    ).generate()
    return SimpleNamespace(
        env=env, rule=rule, run=lambda: ir.recipes[0].exec(RecipeExpansionEngine(env))
    )


class Case1DirectTargetAutomaticVariableTest(unittest.TestCase):
    # Active regression tests: AutomaticVariableEnv currently omits the @ binding.
    def test_reference_expands_to_the_actual_target(self) -> None:
        for reference in ["$@", "$(@)", "${@}"]:
            with self.subTest("%s expands to the actual target", reference=reference):
                self.assertEqual(
                    _automatic(f"echo [{reference}]", "build/app").run(),
                    "echo [build/app]",
                )


class Case2StemAutomaticVariableExplicitlyUnsupportedTest(unittest.TestCase):
    def test_a_resolved_rule_stem_is_currently_not_exposed_as_star(self) -> None:
        # Model support for stem does not imply an automatic-variable binding.
        # This documents the limitation, rather than claiming successful stem expansion.
        auto = _automatic("echo [$*][$(*)][${*}]", "foo.o", "foo")
        self.assertEqual(auto.rule.stem, "foo")
        self.assertEqual(auto.env.has_variable("*"), False)
        self.assertEqual(auto.run(), "echo [][][]")


class Case3SingleCharacterVariableReferencesTest(unittest.TestCase):
    def test_short_reference_agrees_with_both_delimited_references(self) -> None:
        for name, expected in [
            ["A", "uppercase"],
            ["x", "lowercase"],
            ["1", "positional"],
        ]:
            with self.subTest(
                "$%s agrees with both delimited references",
                name=name,
                expected=expected,
            ):
                env = _environment()
                env.set_raw_variable(name, expected)
                self.assertEqual(
                    _expand(f"[${name}][$({name})][${{{name}}}]", env),
                    f"[{expected}][{expected}][{expected}]",
                )

    def test_a_short_reference_consumes_exactly_one_character(self) -> None:
        env = _environment()
        env.set_raw_variable("A", "alpha")
        env.set_raw_variable("AB", "long-name")
        env.set_raw_variable("1", "one")
        env.set_raw_variable("10", "ten")
        self.assertEqual(
            _expand("$AB|$(AB)|$10|$(10)", env), "alphaB|long-name|one0|ten"
        )

    def test_dollar_1_reads_a_call_parameter_using_each_invocation(self) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(
                "$1 reads a call parameter using %s invocation", syntax=syntax
            ):
                env = _environment()
                _deferred(env, "short", "$0:[$1][$2]")
                self.assertEqual(
                    _expand(_invocation("call short,first,second", syntax), env),
                    "short:[first][second]",
                )


class Case4BraceFunctionInvocationTest(unittest.TestCase):
    def test_brace_function_compiles_as_a_function_and_expands(self) -> None:
        for body, expected in [
            ["strip   a   b  ", "a b"],
            ["subst a,z,banana", "bznznz"],
            ["word 2,one two three", "two"],
            ["if yes,chosen,unused", "chosen"],
            ["foreach x,a b,[$x]", "[a] [b]"],
            ["strip ${subst a,z, a   b }", "z b"],
            ["subst a,z,$(strip a   b)", "z b"],
        ]:
            with self.subTest(
                "${%s} compiles as a function and expands", body=body, expected=expected
            ):
                expression = _invocation(body, "braces")
                self.assertEqual(_value(expression).parts[0].kind, "function-call")
                self.assertEqual(_expand(expression), expected)
                self.assertEqual(_expand(_invocation(body, "parentheses")), expected)

    def test_brace_call_evaluates_a_deferred_body_containing_brace_functions(
        self,
    ) -> None:
        env = _environment()
        _deferred(env, "decorate", "${strip ${subst a,z,$1}}")
        self.assertEqual(_expand("${call decorate, a   b }", env), "z b")


class Case5ExcessArgumentsSTest(unittest.TestCase):
    # CBuild currently rejects excess arguments for fixed-arity functions;
    # these tests pin that policy without asserting GNU Make compatibility.
    def test_function_rejects_excess_arguments_during_compilation(self) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                for name, body in [
                    ["subst", "subst a,b,a,extra"],
                    ["word", "word 1,one two,extra"],
                    ["if", "if yes,then,else,extra"],
                    ["foreach", "foreach x,a b,[$x],extra"],
                ]:
                    with self.subTest(
                        "%s rejects excess arguments during compilation",
                        name=name,
                        body=body,
                    ):
                        caught = None
                        try:
                            _recipe(_invocation(body, syntax))
                        except Exception as error:
                            caught = error
                        self.assertIsInstance(caught, CbuildException)
                        self.assertEqual(caught.error_type, ErrorType.SEMANTIC)
                        self.assertEqual(
                            caught.machine_code, MachineCode.FUNCTION_COMPILATION_ERROR
                        )
                        self.assertIn(name, caught.message)

    def test_call_accepts_additional_parameters_beyond_those_read_by_its_body(
        self,
    ) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                _deferred(env, "first", "$1")
                self.assertEqual(
                    _expand(_invocation("call first,a,b,c,d", syntax), env), "a"
                )

    def test_call_exposes_every_supplied_argument_including_positions_above_nine(
        self,
    ) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                _deferred(env, "many", "[$(1)][$(9)][$(10)][$(12)]")
                args = ",".join([f"a{i + 1}" for i in range(12)])
                self.assertEqual(
                    _expand(_invocation(f"call many,{args}", syntax), env),
                    "[a1][a9][a10][a12]",
                )


class Case6EmptyAndCommaHeavyArgumentsSTest(unittest.TestCase):
    def test_function_preserves_syntactically_empty_arguments(self) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                for body, expected in [
                    ["subst a,,banana", "bnn"],
                    ["subst a,b,", ""],
                    ["word 1,", ""],
                    ["if ,then,else", "else"],
                    ["if yes,,else", ""],
                    ["if yes,then,", "then"],
                    ["foreach x,,[$x]", ""],
                    ["foreach x,a b,", " "],
                    ["or ,,chosen,", "chosen"],
                    ["and first,,last", ""],
                ]:
                    with self.subTest(
                        "%s preserves syntactically empty arguments",
                        body=body,
                        expected=expected,
                    ):
                        self.assertEqual(_expand(_invocation(body, syntax)), expected)

    def test_commas_produced_by_a_variable_remain_inside_one_argument(self) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                env.set_raw_variable("PAIR", "a,b")
                self.assertEqual(
                    _expand(_invocation("subst $(PAIR),Z,$(PAIR)", syntax), env), "Z"
                )

    def test_commas_produced_by_a_nested_function_do_not_change_outer_arity(
        self,
    ) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                env.set_raw_variable("COMMA", ",")
                nested = _invocation("subst x,$(COMMA),axb", syntax)
                self.assertEqual(
                    _expand(_invocation(f"subst {nested},Z,{nested}", syntax), env), "Z"
                )

    def test_nested_function_separator_commas_do_not_split_enclosing_call_parameters(
        self,
    ) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                _deferred(env, "pair", "[$1][$2]")
                nested = _invocation("subst a,z,banana", syntax)
                self.assertEqual(
                    _expand(_invocation(f"call pair,{nested},tail", syntax), env),
                    "[bznznz][tail]",
                )


class Case7EmptyCallPositionalSlotsSTest(unittest.TestCase):
    def test_call_slots_retain_parameter_indices(self) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                for args, expected, slots in [
                    ["first,,third", "[first][][third][]", ["first", "", "third"]],
                    [",second,third", "[][second][third][]", ["", "second", "third"]],
                    ["first,second,", "[first][second][][]", ["first", "second", ""]],
                    [
                        "first,,,fourth",
                        "[first][][][fourth]",
                        ["first", "", "", "fourth"],
                    ],
                    [",,", "[][][][]", ["", "", ""]],
                ]:
                    with self.subTest(
                        "call slots,%s retains parameter indices",
                        args=args,
                        expected=expected,
                        slots=slots,
                    ):
                        env = _environment()
                        _deferred(env, "slots", "[$1][$2][$3][$4]")
                        expression = _invocation(f"call slots,{args}", syntax)
                        self.assertEqual(_expand(expression, env), expected)
                        part = _value(expression).parts[0]
                        self.assertEqual(part.kind, "function-call")
                        if part.kind != "function-call":
                            raise Exception("Expected call function")
                        # Check trailing slots in compiled IR too: a missing slot also expands empty.
                        self.assertEqual(
                            [
                                ValueExpansionEngine(env).expand(arg)
                                for arg in part.function.args
                            ],
                            ["slots", *slots],
                        )

    def test_arguments_that_expand_to_empty_retain_their_slots(self) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                _deferred(env, "slots", "[$1][$2][$3]")
                self.assertEqual(
                    _expand(
                        _invocation("call slots,first,$(MISSING),third", syntax), env
                    ),
                    "[first][][third]",
                )

    def test_a_comma_bearing_expansion_remains_a_single_positional_argument(
        self,
    ) -> None:
        for syntax in _SYNTAXES:
            with self.subTest(syntax=syntax):
                env = _environment()
                env.set_raw_variable("PAIR", "a,b")
                _deferred(env, "slots", "[$1][$2][$3]")
                self.assertEqual(
                    _expand(_invocation("call slots,$(PAIR),,tail", syntax), env),
                    "[a,b][][tail]",
                )


class Case8DirectoryFreeAutomaticDFVariablesTest(unittest.TestCase):
    def test_d_f_variable_projects_directory_free_filenames_with_both_syntaxes(
        self,
    ) -> None:
        for name, expected in [
            ["@D", "."],
            ["@F", "app"],
            ["<D", "."],
            ["<F", "foo.o"],
            ["^D", ". ."],
            ["^F", "foo.o bar.o"],
            ["+D", ". . ."],
            ["+F", "foo.o bar.o foo.o"],
            ["?D", "."],
            ["?F", "foo.o"],
        ]:
            with self.subTest(
                "%s projects directory-free filenames with both _SYNTAXES",
                name=name,
                expected=expected,
            ):
                for syntax in _SYNTAXES:
                    self.assertEqual(
                        _automatic(f"echo [{_invocation(name, syntax)}]").run(),
                        f"echo [{expected}]",
                    )

    def test_automatic_variable_agrees_with_parentheses_and_braces(self) -> None:
        for name, expected in [
            ["<", "foo.o"],
            ["^", "foo.o bar.o"],
            ["+", "foo.o bar.o foo.o"],
            ["?", "foo.o"],
            ["|", "stamp"],
        ]:
            with self.subTest(
                "$%s agrees with parentheses and braces", name=name, expected=expected
            ):
                references = [
                    f"${name}",
                    _invocation(name, "parentheses"),
                    _invocation(name, "braces"),
                ]
                self.assertEqual(
                    _automatic(
                        "echo "
                        + "|".join([f"[{reference}]" for reference in references])
                    ).run(),
                    f"echo [{expected}]|[{expected}]|[{expected}]",
                )


if __name__ == "__main__":
    unittest.main()
