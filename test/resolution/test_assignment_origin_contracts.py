import unittest

from cbuild_backend.core import CliVar, Core, EnvVar
from cbuild_backend.env import VariableOrigin
from cbuild_backend.expansion import (
    RecursiveVariableExpansionException,
    ValueExpansionEngine,
)
from test.resolution.case_support import (
    cleanup,
    environment,
    evaluate,
    expand,
    value,
)


class AssignmentFlavorsAndConditionalScopeTest(unittest.TestCase):
    """E01-E05 assignment flavors and conditional scope"""

    def tearDown(self) -> None:
        cleanup()

    def test_e01_recursive_append_stores_rhs_references_for_later_expansion(
        self,
    ) -> None:
        env = evaluate(
            "BASE = before\nLIST = $(BASE)\nLIST += $(BASE)\nBASE = after\n",
        ).env
        self.assertEqual(env.require_variable("LIST").flavor, "recursive")
        self.assertEqual(expand("$(LIST)", env), "after after")

    def test_e02_raw_append_expands_rhs_immediately_and_keeps_text_only_storage(
        self,
    ) -> None:
        env = evaluate(
            "BASE = before\nLIST := initial\nLIST += $(BASE)\nBASE = after\n",
        ).env
        self.assertEqual(env.require_variable("LIST").flavor, "raw")
        self.assertEqual(
            all(
                part.kind == "text"
                for part in env.require_variable("LIST").value.parts
            ),
            True,
        )
        self.assertEqual(env.require_raw_variable("LIST"), "initial before")
        self.assertEqual(expand("$(LIST)", env), "initial before")

    def test_e03_undefined_append_creates_a_recursive_variable(self) -> None:
        env = evaluate("LIST += $(BASE)\nBASE = after\n").env
        variable = env.require_variable("LIST")
        self.assertEqual(variable.flavor, "recursive")
        self.assertEqual(variable.origin, "file")
        self.assertEqual(expand("$(LIST)", env), "after")

    def test_e04_parent_definition_blocks_conditional_local_assignment(self) -> None:
        for parent_value in ["parent", ""]:
            with self.subTest(parent_value=parent_value):
                parent = environment()
                parent.set_raw_variable("FLAGS", parent_value)
                child = environment({}, parent)
                evaluate("FLAGS ?= fallback\n", child)
                self.assertEqual(child.has_variable("FLAGS"), False)
                self.assertEqual(expand("$(FLAGS)", child), parent_value)

    def test_e05_an_existing_empty_variable_blocks_conditional_assignment(
        self,
    ) -> None:
        for operator in ["=", ":="]:
            with self.subTest(operator=operator):
                env = evaluate(f"FLAGS {operator}\nFLAGS ?= fallback\n").env
                self.assertEqual(env.has_variable("FLAGS"), True)
                self.assertEqual(expand("$(FLAGS)", env), "")


class ExplicitOriginPriorityMatrixTest(unittest.TestCase):
    """E06 explicit origin priority matrix"""

    # Independent, explicit expectation order rather than importing the production map.
    origins: list[VariableOrigin] = [
        "automatic",
        "default",
        "environment",
        "file",
        "environment-overridden",
        "command-line",
        "override",
    ]

    def tearDown(self) -> None:
        cleanup()

    def test_assignment_against_existing_origin(self) -> None:
        for prefix in ["", "override "]:
            for origin in self.origins:
                with self.subTest(f"{prefix or 'ordinary '}assignment against existing {origin}"):
                    env = environment()
                    env.set_raw_variable("FLAGS", "original", origin)
                    rank = self.origins.index(origin)
                    wins = rank <= (6 if prefix else 3)
                    evaluate(f"{prefix}FLAGS := replacement\n", env)
                    self.assertEqual(
                        expand("$(FLAGS)", env),
                        "replacement" if wins else "original",
                    )
                    self.assertEqual(
                        env.require_variable("FLAGS").origin,
                        ("override" if prefix else "file") if wins else origin,
                    )

    def test_cli_merge_against_origin(self) -> None:
        for origin in self.origins:
            with self.subTest(origin=origin):
                env = environment()
                env.set_raw_variable("FLAGS", "original", origin)
                Core(env).merge_cli_vars([CliVar(key="FLAGS", value="cli")])
                self.assertEqual(
                    expand("$(FLAGS)", env),
                    "cli" if self.origins.index(origin) < 5 else "original",
                )

    def test_environment_merge_against_origin(self) -> None:
        for environment_overrides in [False, True]:
            for origin in self.origins:
                with self.subTest(
                    f"environment merge with overrides={environment_overrides} against {origin}"
                ):
                    env = environment({"environment_overrides": environment_overrides})
                    env.set_raw_variable("FLAGS", "original", origin)
                    Core(env).merge_env_vars(
                        [EnvVar(key="FLAGS", value="environment")]
                    )
                    rank = 4 if environment_overrides else 2
                    self.assertEqual(
                        expand("$(FLAGS)", env),
                        "environment"
                        if self.origins.index(origin) < rank
                        else "original",
                    )


class DeletionMetadataAndInvalidComputedNamesTest(unittest.TestCase):
    """E07-E12 deletion, metadata and invalid computed names"""

    def tearDown(self) -> None:
        cleanup()

    def test_e07_undefine_local_symbol_reveals_the_parent_definition(self) -> None:
        parent = environment()
        parent.set_raw_variable("FLAGS", "parent")
        child = environment({}, parent)
        child.set_raw_variable("FLAGS", "local")
        evaluate("undefine FLAGS\n", child)
        self.assertEqual(child.has_variable("FLAGS"), False)
        self.assertEqual(expand("$(FLAGS)", child), "parent")

    def test_e08_override_undefine_removes_origin(self) -> None:
        origins: list[VariableOrigin] = [
            "environment",
            "file",
            "command-line",
            "override",
        ]
        for origin in origins:
            with self.subTest(origin=origin):
                env = environment()
                env.set_raw_variable("FLAGS", "value", origin)
                evaluate("override undefine FLAGS\n", env)
                self.assertEqual(env.has_variable("FLAGS"), False)

    def test_ordinary_undefine_protects_origin(self) -> None:
        origins: list[VariableOrigin] = ["command-line", "override"]
        for origin in origins:
            with self.subTest(origin=origin):
                env = environment()
                env.set_raw_variable("FLAGS", "value", origin)
                evaluate("undefine FLAGS\n", env)
                self.assertEqual(env.require_variable("FLAGS").origin, origin)

    def test_e09_exported_metadata_survives_an_ordinary_replacement_or_append_until_unexport(
        self,
    ) -> None:
        for operator in ["=", ":=", "+="]:
            with self.subTest(operator=operator):
                env = evaluate(
                    f"export FLAGS = first\nFLAGS {operator} second\n",
                ).env
                self.assertEqual(env.require_variable("FLAGS").is_exported, True)
                self.assertIn("FLAGS", env.get_exported_variables())
                evaluate("unexport FLAGS\n", env)
                self.assertEqual(env.require_variable("FLAGS").is_exported, False)

    def test_e10_recursion_exception_releases_lookup_state_and_permits_later_recovery(
        self,
    ) -> None:
        env = evaluate("A = $(B)\nB = $(A)\nGOOD = valid\n").env
        active: set[str] = set()
        engine = ValueExpansionEngine(env, active)
        with self.assertRaises(RecursiveVariableExpansionException):
            engine.expand(value("$(A)"))
        self.assertEqual(len(active), 0)
        env.set_raw_variable("B", "recovered")
        self.assertEqual(engine.expand(value("$(A)|$(GOOD)")), "recovered|valid")
        self.assertEqual(len(active), 0)

    def test_e11_empty_computed_assignment_name_rejects_without_inserting_a_symbol(
        self,
    ) -> None:
        env = environment()
        with self.assertRaises(TypeError):
            evaluate("$(UNDEFINED) := value\n", env)
        self.assertEqual(env.variable_count, 0)

    def test_e12_current_cbuild_contract_computed_multi_word_assignment_name_is_one_symbol_not_a_list(
        self,
    ) -> None:
        env = evaluate("KEY = FIRST SECOND\n$(KEY) := value\n").env
        self.assertEqual(env.require_raw_variable("FIRST SECOND"), "value")
        self.assertEqual(env.has_variable("FIRST"), False)
        self.assertEqual(env.has_variable("SECOND"), False)
        self.assertEqual(expand("$($(KEY))", env), "value")


if __name__ == "__main__":
    unittest.main()
