import io
import unittest
from contextlib import redirect_stderr

from test.resolution.case_support import (
    cleanup,
    commands,
    environment,
    evaluate,
    expand,
    fixture,
)


class IfdefStoredDefinitionContractsTest(unittest.TestCase):
    """C01-C14 ifdef/ifndef stored-definition contracts"""

    cases = [
        {"name": "C01/C02 recursive expression expanding to empty", "source": "EMPTY =\nFLAG = $(EMPTY)\n", "defined": True},
        {"name": "C03/C04 raw empty value", "source": "FLAG :=\n", "defined": False},
        {"name": "C05/C06 undefined name", "source": "OTHER = yes\n", "defined": False},
        {"name": "C07/C08 deferred reference to an undefined symbol", "source": "FLAG = $(UNDEFINED)\n", "defined": True},
        {"name": "recursive literal empty definition", "source": "FLAG =\n", "defined": False},
        {"name": "raw nonempty definition", "source": "FLAG := yes\n", "defined": True},
        {"name": "immediate-escaped recursive storage containing only empty text", "source": "FLAG :::= $(UNDEFINED)\n", "defined": False},
        {"name": "recursive self-reference is defined without expansion", "source": "FLAG = $(FLAG)\n", "defined": True},
        {"name": "deferred error expression is defined without executing error", "source": "FLAG = $(error must-not-run)\n", "defined": True},
        {"name": "empty-expanding function is still a nonempty definition", "source": "FLAG = $(strip $(MISSING))\n", "defined": True},
    ]

    directives = ["ifdef", "ifndef"]

    def tearDown(self) -> None:
        cleanup()

    def test_stored_definition_cases(self) -> None:
        for directive in self.directives:
            for case in self.cases:
                with self.subTest(f"{directive}: {case['name']}"):
                    env = evaluate(
                        f"{case['source']}{directive} FLAG\nRESULT := then\nelse\nRESULT := else\nendif\n"
                    ).env
                    defined = case["defined"]
                    self.assertEqual(
                        expand("$(RESULT)", env),
                        "then"
                        if (defined if directive == "ifdef" else not defined)
                        else "else",
                    )

    def test_c09_c10_computed_name(self) -> None:
        for directive in self.directives:
            for present in [True, False]:
                with self.subTest(f"C09/C10 {directive} computed name, present={present}"):
                    env = evaluate(
                        f"KEY = FLAG\n{'FLAG = yes\n' if present else ''}{directive} $($(strip KEY))\nRESULT := then\nelse\nRESULT := else\nendif\n"
                    ).env
                    self.assertEqual(
                        expand("$(RESULT)", env),
                        "then"
                        if (present if directive == "ifdef" else not present)
                        else "else",
                    )

    def test_c11_c12_sees_a_parent_definition(self) -> None:
        for directive in self.directives:
            for flavor in ["raw", "recursive"]:
                with self.subTest(f"C11/C12 {directive} sees a {flavor} parent definition"):
                    parent = evaluate(
                        "FLAG := parent\n" if flavor == "raw" else "FLAG = $(MISSING)\n"
                    ).env
                    child = environment({}, parent)
                    evaluate(
                        f"{directive} FLAG\nRESULT := then\nelse\nRESULT := else\nendif\n",
                        child,
                    )
                    self.assertEqual(child.has_variable("FLAG"), False)
                    self.assertEqual(
                        expand("$(RESULT)", child),
                        "then" if directive == "ifdef" else "else",
                    )

    def test_c13_c14_local_shadows_parent(self) -> None:
        for directive in self.directives:
            for case in [
                {"local": "", "parent": "parent", "defined": False},
                {"local": "local", "parent": "", "defined": True},
            ]:
                with self.subTest(
                    f"C13/C14 {directive} local '{case['local']}' shadows parent '{case['parent']}'"
                ):
                    parent = environment()
                    parent.set_raw_variable("FLAG", case["parent"])
                    child = environment({}, parent)
                    child.set_raw_variable("FLAG", case["local"])
                    evaluate(
                        f"{directive} FLAG\nRESULT := then\nelse\nRESULT := else\nendif\n",
                        child,
                    )
                    defined = case["defined"]
                    self.assertEqual(
                        expand("$(RESULT)", child),
                        "then"
                        if (defined if directive == "ifdef" else not defined)
                        else "else",
                    )
                    self.assertEqual(parent.require_raw_variable("FLAG"), case["parent"])


class StringComparisonAndExpansionTest(unittest.TestCase):
    """C15-C18 string comparison and expansion"""

    def tearDown(self) -> None:
        cleanup()

    def test_c15_c16_compares_two_empty_expansions(self) -> None:
        for directive in ["ifeq", "ifneq"]:
            with self.subTest(directive=directive):
                env = evaluate(
                    f"{directive} ($(MISSING),$(ALSO_MISSING))\nRESULT := then\nelse\nRESULT := else\nendif\n"
                ).env
                self.assertEqual(
                    expand("$(RESULT)", env),
                    "then" if directive == "ifeq" else "else",
                )

    def test_literal_empty_operands(self) -> None:
        for directive in ["ifeq", "ifneq"]:
            with self.subTest(directive=directive):
                env = evaluate(
                    f"{directive} (,)\nRESULT := then\nelse\nRESULT := else\nendif\n"
                ).env
                self.assertEqual(
                    expand("$(RESULT)", env),
                    "then" if directive == "ifeq" else "else",
                )

    def test_c17_nested_functions_compare_their_final_strings(self) -> None:
        env = evaluate(
            "NAMES = b a b\nifeq ($(strip $(addprefix obj/,$(sort $(NAMES)))),obj/a obj/b)\nRESULT := equal\nelse\nRESULT := unequal\nendif\n"
        ).env
        self.assertEqual(expand("$(RESULT)", env), "equal")

    def test_c18_nested_computed_variable_comparison(self) -> None:
        for rhs in ["same", "different"]:
            with self.subTest(rhs=rhs):
                env = evaluate(
                    f"LEFT_KEY = LEFT\nRIGHT_KEY = RIGHT\nLEFT = same\nRIGHT = {rhs}\nifneq ($($(LEFT_KEY)),$($(RIGHT_KEY)))\nRESULT := unequal\nelse\nRESULT := equal\nendif\n"
                ).env
                self.assertEqual(
                    expand("$(RESULT)", env),
                    "equal" if rhs == "same" else "unequal",
                )

    def test_comparison_strings_are_never_looked_up_again_as_variable_names(
        self,
    ) -> None:
        env = evaluate(
            "release = $(error second-lookup)\ndebug = $(error second-lookup)\nMODE = release\nifeq ($(MODE),debug)\nRESULT := wrong\nelse\nRESULT := right\nendif\n"
        ).env
        self.assertEqual(expand("$(RESULT)", env), "right")


class InactiveBranchesAndStateChangesTest(unittest.TestCase):
    """C19-C24 inactive branches and state changes"""

    def tearDown(self) -> None:
        cleanup()

    def test_c19_c20_c21_inactive_error_assignment_and_rule_produce_no_effect(
        self,
    ) -> None:
        result = evaluate(
            "ifeq (yes,no)\nBAD := $(error inactive)\ninactive: $(error inactive-header)\nelse\nGOOD := selected\nactive:\nendif\n"
        )
        self.assertEqual(result.env.has_variable("BAD"), False)
        self.assertEqual(result.env.require_raw_variable("GOOD"), "selected")
        self.assertEqual([rule.target for rule in result.rules], ["active"])

    def test_c22_only_the_active_path_of_nested_conditionals_is_evaluated(
        self,
    ) -> None:
        result = evaluate(
            "ifeq (yes,yes)\nifneq (x,y)\nGOOD := nested\nactive:\nelse\nBAD := $(error inactive-inner)\nendif\nelse\nBAD := $(error inactive-outer)\nendif\n"
        )
        self.assertEqual(result.env.require_raw_variable("GOOD"), "nested")
        self.assertEqual(result.env.has_variable("BAD"), False)
        self.assertEqual([rule.target for rule in result.rules], ["active"])

    def test_c23_conditional_include_is_evaluated_only_for_active_branch(
        self,
    ) -> None:
        for active in [True, False]:
            with self.subTest(active=active):
                disk = fixture()
                disk.cwd()
                disk.write("branch.mk", "FROM_INCLUDE := included\nincluded:\n")
                result = evaluate(
                    f"ifeq (yes,{'yes' if active else 'no'})\ninclude branch.mk\nelse\nOTHER := other\nendif\n"
                )
                self.assertEqual(result.env.has_variable("FROM_INCLUDE"), active)
                self.assertEqual(
                    [rule.target for rule in result.rules],
                    ["included"] if active else [],
                )

    def test_inactive_missing_mandatory_include_never_attempts_a_read(self) -> None:
        disk = fixture()
        disk.cwd()
        self.assertEqual(
            evaluate("ifeq (yes,no)\ninclude missing.mk\nendif\n").rules, []
        )

    def test_c24_conditional_vpath_changes_state_only_for_active_branch(
        self,
    ) -> None:
        for active in [True, False]:
            with self.subTest(active=active):
                result = evaluate(
                    f"ifeq (yes,{'yes' if active else 'no'})\nvpath %.c sources\nendif\nall:\n"
                )
                self.assertEqual(
                    [rule.pattern for rule in result.state.vpaths],
                    ["%.c"] if active else [],
                )
                self.assertEqual(
                    [rule.pattern for rule in result.rules[0].vpath_rules],
                    ["%.c"] if active else [],
                )

    def test_conditional_recipe_never_expands_the_inactive_error_command(
        self,
    ) -> None:
        result = evaluate(
            "MODE = release\nall:\nifeq ($(MODE),debug)\n\t$(error inactive-recipe)\nelse\n\techo release\nendif\n"
        )
        self.assertEqual(commands(result.rules[0], result.env), ["echo release"])
        self.assertEqual(len(result.rules[0].evaluated_recipe_irs), 1)

    def test_ifdef_does_not_execute_deferred_warning_side_effects(self) -> None:
        warning = io.StringIO()
        with redirect_stderr(warning):
            env = evaluate(
                "FLAG = $(warning must-not-run)\nifdef FLAG\nRESULT := defined\nendif\n"
            ).env
        self.assertEqual(env.require_raw_variable("RESULT"), "defined")
        self.assertEqual(warning.getvalue(), "")


if __name__ == "__main__":
    unittest.main()
