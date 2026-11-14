import unittest
from unittest import mock

from cbuild_backend.core import CliVar, Core, EnvVar
from cbuild_backend.expansion import (
    RecursiveVariableExpansionException,
    ValueExpansionEngine,
)
from test.resolution.helpers import (
    commands,
    environment,
    evaluate,
    expand,
    target,
    value,
)
from type.cbuild_exception import CbuildException, MachineCode


class AssignmentLifetimeTest(unittest.TestCase):
    """assignment lifetime through parser/compiler/evaluator/expansion"""

    def tearDown(self) -> None:
        mock.patch.stopall()

    def test_operator_captures_or_defers_its_rhs_at_the_correct_time(self) -> None:
        for operator, expected, flavor in [
            ("=", "after", "recursive"),
            (":=", "before", "raw"),
            ("::=", "before", "raw"),
            ("?=", "after", "recursive"),
            (":::=", "before", "recursive"),
        ]:
            with self.subTest(operator=operator):
                env = evaluate(
                    f"BASE = before\nRESULT {operator} $(BASE)\nBASE = after\n"
                ).env
                self.assertEqual(expand("$(RESULT)", env), expected)
                variable = env.require_variable("RESULT")
                self.assertEqual(variable.flavor, flavor)
                self.assertEqual(variable.origin, "file")
                self.assertEqual(variable.is_exported, False)

    def test_recursive_assignment_can_reference_a_later_declaration(self) -> None:
        result = evaluate(
            "FILES = $(addsuffix .c,$(NAMES))\nNAMES = a b\nall: $(FILES)\n"
        )
        self.assertEqual(expand("$(FILES)", result.env), "a.c b.c")
        self.assertEqual(target(result.rules, "all").prerequisites, ["a.c", "b.c"])

    def test_immediate_assignment_sees_undefined_variables_as_empty(self) -> None:
        env = evaluate("SNAPSHOT := before[$(LATER)]after\nLATER = value\n").env
        self.assertEqual(env.require_raw_variable("SNAPSHOT"), "before[]after")

    def test_recursive_append_expands_both_pieces_using_the_final_environment(
        self,
    ) -> None:
        env = evaluate(
            "BASE = old\nLIST = $(BASE)\nLIST += $(BASE)\nBASE = new\n"
        ).env
        self.assertEqual(expand("$(LIST)", env), "new new")
        self.assertEqual(env.require_variable("LIST").flavor, "recursive")

    def test_append_to_an_undefined_symbol_creates_a_recursive_variable(self) -> None:
        env = evaluate("LIST += $(BASE)\nBASE = later\n").env
        self.assertEqual(expand("$(LIST)", env), "later")
        self.assertEqual(env.variable_count, 2)

    def test_literal_append_preserves_order_and_separates_words(self) -> None:
        env = evaluate("LIST := a\nLIST += b\nLIST += c\n").env
        self.assertEqual(expand("$(LIST)", env), "a b c")
        self.assertEqual(env.require_variable("LIST").flavor, "raw")

    def test_conditional_assignment_preserves_an_existing_value(self) -> None:
        for initial in ["", "existing"]:
            with self.subTest(initial=initial):
                env = environment()
                env.set_raw_variable("A", initial)
                evaluate("A ?= $(error must-not-evaluate)\n", env)
                self.assertEqual(env.require_raw_variable("A"), initial)

    def test_computed_assignment_names_and_computed_references_agree(self) -> None:
        env = evaluate(
            "MODE = debug\nFLAGS_$(MODE) := -g\nKEY := FLAGS_debug\nRESULT = $($(KEY))\n"
        ).env
        self.assertEqual(expand("$(RESULT)", env), "-g")
        self.assertEqual(
            [name for name, _ in env.variable_entries()],
            ["MODE", "FLAGS_debug", "KEY", "RESULT"],
        )

    def test_nested_expansion_drives_target_and_prerequisite_word_lists(self) -> None:
        rules = evaluate(
            "NAMES = b a b\nTARGETS := $(addprefix obj/,$(addsuffix .o,$(sort $(NAMES))))\n$(TARGETS): $(addsuffix .h,$(sort $(NAMES))) | $(strip cache   stamp)\n"
        ).rules
        self.assertEqual([rule.target for rule in rules], ["obj/a.o", "obj/b.o"])
        for rule in rules:
            self.assertEqual(rule.prerequisites, ["a.h", "b.h"])
            self.assertEqual(rule.order_only_prerequisites, ["cache", "stamp"])

    def test_rule_headers_resolve_immediately_while_recipes_see_later_assignments(
        self,
    ) -> None:
        result = evaluate(
            "NAME = early\nPREQ = first\n$(NAME): $(PREQ)\n\techo $(NAME) $(PREQ)\nNAME = late\nPREQ = second\n"
        )
        self.assertEqual(result.rules[0].target, "early")
        self.assertEqual(result.rules[0].prerequisites, ["first"])
        self.assertEqual(commands(result.rules[0], result.env), ["echo late second"])

    def test_a_recursive_variable_reused_by_two_rules_resolves_at_each_rules_position(
        self,
    ) -> None:
        rules = evaluate(
            "BASE = first\nFILES = $(BASE).c\none: $(FILES)\nBASE = second\ntwo: $(FILES)\n"
        ).rules
        self.assertEqual(
            [rule.prerequisites for rule in rules], [["first.c"], ["second.c"]]
        )

    def test_rejects_recursive_lookup(self) -> None:
        for source in [
            "A = $(A)",
            "A = $(B)\nB = $(A)",
            "A = $(B)\nB = $(C)\nC = $(A)",
        ]:
            with self.subTest(source=source):
                env = evaluate(source).env
                with self.assertRaises(RecursiveVariableExpansionException):
                    expand("$(A)", env)

    def test_recursive_lookup_failure_releases_lookup_state_for_later_expansions(
        self,
    ) -> None:
        env = evaluate("A = $(B)\nB = $(A)\nGOOD = usable\n").env
        active: set[str] = set()
        engine = ValueExpansionEngine(env, active)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(value("$(A)"))
        self.assertEqual(len(active), 0)
        env.set_raw_variable("B", "recovered")
        self.assertEqual(engine.expand(value("$(A)|$(GOOD)")), "recovered|usable")

    def test_failed_immediate_expansion_leaves_an_existing_symbol_untouched(
        self,
    ) -> None:
        env = environment()
        env.set_raw_variable("A", "original")
        original = env.require_variable("A")
        with self.assertRaises(CbuildException) as context:
            evaluate("A := $(error assignment-failed)\n", env)
        self.assertEqual(context.exception.machine_code, MachineCode.ERROR_FN)
        self.assertIs(env.require_variable("A"), original)

    def test_assignment_and_expansion_integrate_function(self) -> None:
        for expression, expected in [
            ("$(strip   a   b  )", "a b"),
            ("$(sort b a b c)", "a b c"),
            ("$(patsubst %.c,obj/%.o,a.c b.c note.h)", "obj/a.o obj/b.o note.h"),
            ("$(filter %.c,a.c b.h c.c)", "a.c c.c"),
            ("$(filter-out %.h,a.c b.h c.c)", "a.c c.c"),
            ("$(subst src/,obj/,src/a src/b)", "obj/a obj/b"),
            ("$(foreach n,a b,$(addsuffix .o,$(n)))", "a.o b.o"),
            ("$(if yes,chosen,$(error unused))", "chosen"),
            ("$(or ,chosen,$(error unused))", "chosen"),
            ("$(and yes,,$(error unused))", ""),
            ("$(join a b,1 2)", "a1 b2"),
            ("$(word 2,a b c)", "b"),
            ("$(wordlist 2,3,a b c d)", "b c"),
            ("$(lastword a b)", "b"),
        ]:
            with self.subTest(expression=expression):
                env = evaluate(f"RESULT := {expression}\n").env
                self.assertEqual(env.require_raw_variable("RESULT"), expected)
                self.assertEqual(expand("$(RESULT)", env), expected)

    def test_call_parameters_and_foreach_iteration_symbols_do_not_leak_into_the_root_table(
        self,
    ) -> None:
        env = evaluate(
            "pair = $(1):$(2)\n1 = global\nitem = parent\nRESULT := $(foreach item,a b,$(call pair,$(item),x))\n"
        ).env
        self.assertEqual(expand("$(RESULT)", env), "a:x b:x")
        self.assertEqual(expand("$(1)|$(item)", env), "global|parent")
        self.assertEqual(env.has_variable("2"), False)

    def test_command_line_priority_survives_ordinary_assignments(self) -> None:
        for operator in ["=", ":=", "+="]:
            with self.subTest(operator=operator):
                env = environment()
                Core(env).merge_cli_vars([CliVar(key="FLAGS", value="cli")])
                evaluate(f"FLAGS {operator} file\nall: $(FLAGS)\n", env)
                self.assertEqual(expand("$(FLAGS)", env), "cli")
                self.assertEqual(env.require_variable("FLAGS").origin, "command-line")

    def test_override_assignment_wins_over_command_line_values(self) -> None:
        env = environment()
        Core(env).merge_cli_vars([CliVar(key="FLAGS", value="cli")])
        evaluate("override FLAGS := file\n", env)
        variable = env.require_variable("FLAGS")
        self.assertEqual(variable.origin, "override")
        self.assertEqual(variable.flavor, "raw")
        self.assertEqual(expand("$(FLAGS)", env), "file")

    def test_environment_override_flag_controls_assignment_precedence(self) -> None:
        for environment_overrides in [False, True]:
            with self.subTest(environment_overrides=environment_overrides):
                env = environment({"environment_overrides": environment_overrides})
                Core(env).merge_env_vars([EnvVar(key="FLAGS", value="environment")])
                evaluate("FLAGS := file\n", env)
                self.assertEqual(
                    expand("$(FLAGS)", env),
                    "environment" if environment_overrides else "file",
                )

    def test_export_and_unexport_statements_change_metadata_without_replacing_the_symbol(
        self,
    ) -> None:
        env = evaluate("FLAGS = value\nexport FLAGS\n").env
        symbol = env.require_variable("FLAGS")
        self.assertIs(env.get_exported_variables().get("FLAGS"), symbol)
        evaluate("unexport FLAGS\n", env)
        self.assertIs(env.require_variable("FLAGS"), symbol)
        self.assertEqual(len(env.get_exported_variables()), 0)

    def test_undefine_removes_a_symbol_and_allows_conditional_reassignment(
        self,
    ) -> None:
        env = evaluate("A = old\nundefine A\nA ?= new\nundefine MISSING\n").env
        self.assertEqual(expand("$(A)", env), "new")
        self.assertEqual(env.variable_count, 1)

    def test_ordinary_undefine_protects_command_line_variables_override_undefine_removes_them(
        self,
    ) -> None:
        env = environment()
        env.set_raw_variable("A", "cli", "command-line")
        evaluate("undefine A\n", env)
        self.assertEqual(env.has_variable("A"), True)
        evaluate("override undefine A\n", env)
        self.assertEqual(env.has_variable("A"), False)

    def test_target_specific_assignments_isolate_symbols_and_inherit_the_global_table(
        self,
    ) -> None:
        env = evaluate(
            "FLAGS = global\nSHARED = shared\none: FLAGS = first\none: EXTRA = local\ntwo: FLAGS := second\none:\n\techo $(FLAGS) $(EXTRA) $(SHARED)\ntwo:\n\techo $(FLAGS) $(EXTRA) $(SHARED)\n"
        ).env
        self.assertEqual(expand("$(FLAGS)", env), "global")
        self.assertEqual(
            expand("$(FLAGS)|$(EXTRA)|$(SHARED)", env.target_envs["one"]),
            "first|local|shared",
        )
        self.assertEqual(
            expand("$(FLAGS)|$(EXTRA)|$(SHARED)", env.target_envs["two"]),
            "second||shared",
        )
        self.assertIs(env.target_envs["one"].enclosing, env)
        self.assertEqual(env.target_envs["one"].variable_count, 2)
        self.assertEqual(env.has_variable("EXTRA"), False)


if __name__ == "__main__":
    unittest.main()
