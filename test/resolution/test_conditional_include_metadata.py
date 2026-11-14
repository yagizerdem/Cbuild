import io
import unittest
from contextlib import redirect_stderr

from cbuild_backend.evaluator.core.buildfile_evaluator import BuildFileEvaluator
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.model import NormalRule
from core.frontend import frontend
from test.resolution.helpers import (
    cleanup_fixtures,
    commands,
    environment,
    evaluate,
    expand,
    fixture,
    value,
)
from type.buildfile_meta import BuildFileMeta
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class ConditionalAssignmentAndRecipeSelectionTest(unittest.TestCase):
    """conditional assignment and recipe selection"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_condition_with_mode_selects_the_expected_branch(self) -> None:
        for condition, mode, expected in [
            ("ifeq ($(MODE),debug)", "debug", "then"),
            ("ifeq ($(MODE),debug)", "release", "else"),
            ("ifneq ($(MODE),debug)", "release", "then"),
            ("ifneq ($(MODE),debug)", "debug", "else"),
            ("ifdef MODE", "defined", "then"),
            ("ifdef MODE", "", "else"),
            ("ifndef MODE", "", "then"),
            ("ifndef MODE", "defined", "else"),
        ]:
            with self.subTest(f"{condition} with MODE='{mode}'"):
                env = evaluate(
                    f"MODE ={f' {mode}' if mode else ''}\n{condition}\nRESULT := then\nelse\nRESULT := else\nendif\n",
                ).env
                self.assertEqual(expand("$(RESULT)", env), expected)
                self.assertEqual(env.variable_count, 2)

    def test_nested_conditionals_evaluate_only_the_selected_assignments(
        self,
    ) -> None:
        env = evaluate(
            "MODE = debug\nifeq ($(MODE),debug)\nifdef MODE\nRESULT := selected\nelse\nRESULT := $(error inner-inactive)\nendif\nelse\nRESULT := $(error outer-inactive)\nendif\n",
        ).env
        self.assertEqual(expand("$(RESULT)", env), "selected")

    def test_a_missing_else_branch_performs_no_assignment(self) -> None:
        env = evaluate("ifeq (no,yes)\nUNUSED := bad\nendif\n").env
        self.assertEqual(env.variable_count, 0)

    def test_conditional_recipe_selects_the_command(self) -> None:
        for mode in ["debug", "release"]:
            with self.subTest(mode=mode):
                result = evaluate(
                    f"MODE = {mode}\nall:\nifeq ($(MODE),debug)\n\techo debug\nelse\n\techo release\nendif\n",
                )
                self.assertEqual(
                    commands(result.rules[0], result.env), [f"echo {mode}"]
                )
                self.assertEqual(len(result.rules[0].evaluated_recipe_irs), 1)

    def test_conditional_recipe_selection_precedes_later_variable_reassignment(
        self,
    ) -> None:
        result = evaluate(
            "MODE = debug\nall:\nifeq ($(MODE),debug)\n\techo selected $(MODE)\nelse\n\techo wrong\nendif\nMODE = release\n",
        )
        self.assertEqual(
            commands(result.rules[0], result.env), ["echo selected release"]
        )

    def test_nested_recipe_conditionals_resolve_to_flat_command_recipes(
        self,
    ) -> None:
        result = evaluate(
            "MODE = yes\nall:\nifdef MODE\nifeq ($(MODE),yes)\n\techo nested\nelse\n\techo wrong\nendif\nelse\n\techo wrong-outer\nendif\n",
        )
        self.assertEqual(commands(result.rules[0], result.env), ["echo nested"])
        self.assertEqual(
            all(
                ir.recipe.kind == "command"
                for ir in result.rules[0].evaluated_recipe_irs
            ),
            True,
        )

    def test_undefined_lookup_warning_uses_the_computed_symbol_name(self) -> None:
        env = environment({"warn_undefined_variables": True})
        warning = io.StringIO()
        with redirect_stderr(warning):
            evaluate("KEY = ABSENT\nRESULT := before[$($(KEY))]after\n", env)
        self.assertEqual(expand("$(RESULT)", env), "before[]after")
        self.assertEqual(
            warning.getvalue().splitlines(),
            ["cbuild: warning: undefined variable 'ABSENT'"],
        )
        self.assertEqual(env.has_variable("ABSENT"), False)

    def test_successful_and_failed_expansions_preserve_existing_symbol_table_identities(
        self,
    ) -> None:
        env = evaluate(
            "A = value\nB = $(A)\nBAD = $(error expansion-failed)\n",
        ).env
        before = list(env.variable_entries())
        engine = ValueExpansionEngine(env)
        self.assertEqual(engine.expand(value("$(B)")), "value")
        with self.assertRaises(CbuildException) as context:
            engine.expand(value("$(BAD)"))
        self.assertEqual(context.exception.machine_code, MachineCode.ERROR_FN)
        self.assertEqual(list(env.variable_entries()), before)
        for name, symbol in before:
            self.assertIs(env.require_variable(name), symbol)


class IncludeLookupAndBuildFileMetadataTest(unittest.TestCase):
    """include lookup and build-file metadata"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_ignores_a_missing_include_and_continues_assignments(self) -> None:
        for directive in ["-include", "sinclude"]:
            with self.subTest(directive=directive):
                disk = fixture()
                disk.use_as_cwd()
                env = evaluate(
                    f"{directive} missing.mk\nRESULT := continued\n",
                ).env
                self.assertEqual(env.require_raw_variable("RESULT"), "continued")

    def test_mandatory_missing_include_rejects_with_its_process_machine_code(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        with self.assertRaises(CbuildException) as context:
            evaluate("include missing.mk\n")
        self.assertEqual(context.exception.error_type, ErrorType.PROCESS)
        self.assertEqual(
            context.exception.machine_code, MachineCode.INCLUDE_FILE_NOT_FOUND
        )

    def test_include_path_expansion_loads_assignments_into_the_same_symbol_table(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("settings.mk", "VALUE = from-include\n")
        env = evaluate(
            "FILE = settings.mk\ninclude $(FILE)\nRESULT := $(VALUE)\n",
        ).env
        self.assertEqual(env.require_raw_variable("RESULT"), "from-include")
        self.assertEqual(env.require_variable("VALUE").origin, "file")

    def test_cwd_include_takes_precedence_over_an_include_dir_file_with_the_same_name(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("settings.mk", "VALUE = local\n")
        disk.write("includes/settings.mk", "VALUE = search-dir\n")
        env = evaluate(
            "include settings.mk\n",
            environment({"include_dir": ["includes"]}),
        ).env
        self.assertEqual(expand("$(VALUE)", env), "local")

    def test_include_dir_search_finds_an_include_absent_from_cwd(self) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("includes/settings.mk", "VALUE = search-dir\n")
        env = evaluate(
            "include settings.mk\n",
            environment({"include_dir": ["missing", "includes"]}),
        ).env
        self.assertEqual(expand("$(VALUE)", env), "search-dir")

    def test_multiple_expanded_include_paths_apply_assignments_in_listed_order(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("first.mk", "VALUE = first\n")
        disk.write("second.mk", "VALUE = second\n")
        env = evaluate(
            "FILES = first.mk second.mk\ninclude $(FILES)\n",
        ).env
        self.assertEqual(expand("$(VALUE)", env), "second")

    def test_frontend_metadata_is_retained_by_the_resolved_rule_ir(self) -> None:
        disk = fixture()
        raw_content = "NAME = generated\n$(NAME): source\n\techo $(NAME)\n"
        meta = BuildFileMeta(
            name="Buildfile",
            relative_path="Buildfile",
            absolute_path=disk.path("Buildfile"),
            size=len(raw_content.encode("utf-8")),
            raw_content=raw_content,
        )
        irs = frontend(meta)
        self.assertEqual(all(ir.build_file_meta is meta for ir in irs), True)
        models = BuildFileEvaluator(
            environment(),
            irs,
            BuildFileEvaluationState(vpaths=[], resolved_models=[], include_guard=[]),
        ).evaluate()
        rule = next(model for model in models if isinstance(model, NormalRule))
        self.assertIs(rule.rule_ir.build_file_meta, meta)
        self.assertEqual(rule.target, "generated")
        self.assertEqual(rule.prerequisites, ["source"])


if __name__ == "__main__":
    unittest.main()
