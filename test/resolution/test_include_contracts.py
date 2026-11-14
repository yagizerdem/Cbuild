import os
import re
import unittest
from unittest import mock

from cbuild_backend.depq_graph import find_default_target_name, get_target_subgraph
from cbuild_backend.evaluator import include_evaluator
from test.resolution.case_support import (
    cleanup,
    environment,
    evaluate,
    expand,
    fixture,
    target,
)
from type.cbuild_exception import CbuildException, MachineCode


class RepeatedAndNestedIncludeTest(unittest.TestCase):
    """I01-I05 repeated and nested include"""

    def tearDown(self) -> None:
        cleanup()

    def test_i01_repeated_include_is_evaluated_twice_in_source_order_without_deduplication(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("repeat.mk", "VISITS += included\nrepeated: input\n")
        result = evaluate(
            "VISITS = start\ninclude repeat.mk\nVISITS += between\ninclude repeat.mk\n"
        )
        self.assertEqual(
            expand("$(VISITS)", result.env), "start included between included"
        )
        self.assertEqual(
            [rule.target for rule in result.rules], ["repeated", "repeated"]
        )
        self.assertNotEqual(result.rules[0].uuid, result.rules[1].uuid)

    def test_i02_i03_i04_main_a_mk_b_mk_shares_assignments_and_adds_each_rule_once(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write(
            "a.mk",
            "VISITS += a-before\na-before:\ninclude b.mk\nVISITS += a-after\na-after:\n",
        )
        disk.write("b.mk", "VISITS += b\nINNER := visible\nb:\n")
        result = evaluate(
            "VISITS = main\nmain-before:\ninclude a.mk\nRESULT := $(INNER)\nmain-after:\n"
        )
        self.assertEqual(
            expand("$(VISITS)", result.env), "main a-before b a-after"
        )
        self.assertEqual(result.env.require_raw_variable("RESULT"), "visible")
        self.assertEqual(
            [rule.target for rule in result.rules],
            ["main-before", "a-before", "b", "a-after", "main-after"],
        )

    def test_i05_nested_include_vpath_is_active_for_subsequent_main_file_rules(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("a.mk", "include b.mk\n")
        disk.write("b.mk", "vpath %.c sources\n")
        result = evaluate("include a.mk\nfollowing: input.c\n")
        self.assertEqual(
            [[rule.pattern, rule.dirs] for rule in result.state.vpaths],
            [["%.c", ["sources"]]],
        )
        self.assertEqual(
            [rule.pattern for rule in result.rules[0].vpath_rules], ["%.c"]
        )


class IncludeCycleRejectionTest(unittest.TestCase):
    """I06/I07 include cycle rejection with a finite read guard"""

    # The guard is only a fail-fast bound, not a replacement cycle implementation.
    # A passing test requires the production evaluator to reject before revisiting
    # an included file. A guard error is explicitly considered a test failure.

    def tearDown(self) -> None:
        cleanup()

    def test_rejects_with_a_cycle_diagnostic_before_repeated_reads(self) -> None:
        for case in [
            {"label": "I06 mutual include cycle", "a": "include b.mk\n", "b": "include a.mk\n"},
            {"label": "I07 self include cycle", "a": "include a.mk\n", "b": "UNUSED = unused\n"},
        ]:
            with self.subTest(case["label"]):
                disk = fixture()
                disk.cwd()
                disk.write("a.mk", case["a"])
                disk.write("b.mk", case["b"])
                seen: set[str] = set()
                guard_error = Exception(
                    "TEST_READ_GUARD: evaluator revisited an active include without detecting a cycle"
                )
                read = include_evaluator._read_text

                def guarded_read(file_path: str) -> str:
                    filename = os.path.abspath(str(file_path))
                    if filename.startswith(disk.root):
                        if filename in seen:
                            raise guard_error
                        seen.add(filename)
                    return read(file_path)

                with mock.patch.object(
                    include_evaluator, "_read_text", side_effect=guarded_read
                ):
                    caught: BaseException | None = None
                    try:
                        evaluate("include a.mk\n")
                    except Exception as error:
                        caught = error
                self.assertIsNot(
                    caught,
                    guard_error,
                    "The test read guard must not be the mechanism rejecting the cycle",
                )
                self.assertIsInstance(caught, Exception)
                self.assertRegex(
                    str(caught),
                    re.compile(r"cycle|circular|recursive.*include", re.IGNORECASE),
                )


class IncludePathOrderingMissingFilesAndSearchPrecedenceTest(unittest.TestCase):
    """I08-I15 include path ordering, missing files and search precedence"""

    def tearDown(self) -> None:
        cleanup()

    def test_i08_multiple_paths_in_one_directive_preserve_source_order(self) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("first.mk", "VISITS += first\nfirst:\n")
        disk.write("second.mk", "VISITS += second\nsecond:\n")
        result = evaluate("include first.mk second.mk\n")
        self.assertEqual(expand("$(VISITS)", result.env), "first second")
        self.assertEqual([rule.target for rule in result.rules], ["first", "second"])

    def test_i09_mandatory_include_rejects_the_second_missing_path_after_evaluating_the_first(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("first.mk", "FIRST := loaded\n")
        env = environment()
        with self.assertRaises(CbuildException) as context:
            evaluate("include first.mk missing.mk\nAFTER := unreachable\n", env)
        self.assertEqual(
            context.exception.machine_code, MachineCode.INCLUDE_FILE_NOT_FOUND
        )
        self.assertEqual(env.require_raw_variable("FIRST"), "loaded")
        self.assertEqual(env.has_variable("AFTER"), False)

    def test_i10_evaluates_existing_files_among_missing_paths(self) -> None:
        for directive in ["-include", "sinclude"]:
            with self.subTest(directive=directive):
                disk = fixture()
                disk.cwd()
                disk.write("first.mk", "VISITS += first\nfirst:\n")
                disk.write("last.mk", "VISITS += last\nlast:\n")
                result = evaluate(
                    f"{directive} missing-before.mk first.mk missing-middle.mk last.mk missing-after.mk\n"
                )
                self.assertEqual(expand("$(VISITS)", result.env), "first last")
                self.assertEqual(
                    [rule.target for rule in result.rules], ["first", "last"]
                )

    def test_i11_cwd_takes_precedence_over_include_dir(self) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("same.mk", "CHOSEN := cwd\n")
        disk.write("includes/same.mk", "CHOSEN := includeDir\n")
        env = evaluate(
            "include same.mk\n", environment({"include_dir": ["includes"]})
        ).env
        self.assertEqual(env.require_raw_variable("CHOSEN"), "cwd")

    def test_i12_include_dir_order(self) -> None:
        for first, second in [("first", "second"), ("second", "first")]:
            with self.subTest(f"I12 includeDir order {first} then {second}"):
                disk = fixture()
                disk.cwd()
                disk.write("first/same.mk", "CHOSEN := first\n")
                disk.write("second/same.mk", "CHOSEN := second\n")
                env = evaluate(
                    "include same.mk\n",
                    environment({"include_dir": ["absent", first, second]}),
                ).env
                self.assertEqual(env.require_raw_variable("CHOSEN"), first)

    def test_i13_variable_and_nested_function_expansion_produces_multiple_include_filenames(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("first.mk", "VISITS += first\n")
        disk.write("second.mk", "VISITS += second\n")
        env = evaluate(
            "NAMES = first second\nFILES = $(addsuffix .mk,$(strip $(NAMES)))\ninclude $(FILES)\n"
        ).env
        self.assertEqual(expand("$(VISITS)", env), "first second")

    def test_i14_i15_included_file_metadata_has_the_basename_and_cwd_relative_path(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        absolute_path = disk.write("includes/settings.mk", "included:\n")
        rules = evaluate(
            "include settings.mk\n", environment({"include_dir": ["includes"]})
        ).rules
        metadata = rules[0].rule_ir.build_file_meta
        self.assertEqual(metadata.name, "settings.mk")
        self.assertEqual(metadata.relative_path, os.path.join("includes", "settings.mk"))
        self.assertEqual(metadata.absolute_path, absolute_path)

    def test_i16_nested_metadata_never_inherits_the_parent_files_identity(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        outer = disk.write("a.mk", "outer:\ninclude nested/b.mk\n")
        inner = disk.write("nested/b.mk", "inner:\n")
        rules = evaluate("include a.mk\n").rules
        outer_meta = target(rules, "outer").rule_ir.build_file_meta
        inner_meta = target(rules, "inner").rule_ir.build_file_meta
        self.assertEqual(outer_meta.name, "a.mk")
        self.assertEqual(outer_meta.absolute_path, outer)
        self.assertEqual(outer_meta.relative_path, "a.mk")
        self.assertEqual(inner_meta.name, "b.mk")
        self.assertEqual(inner_meta.absolute_path, inner)
        self.assertEqual(inner_meta.relative_path, os.path.join("nested", "b.mk"))
        self.assertIsNot(outer_meta, inner_meta)

    def test_default_goal_is_the_first_included_rule_when_main_declares_no_earlier_target(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("goals.mk", "included: dependency\ndependency:\n")
        rules = evaluate("SETTING = value\ninclude goals.mk\nmain:\n").rules
        self.assertEqual(find_default_target_name(rules), "included")
        self.assertEqual(
            [rule.target for rule in get_target_subgraph(rules)],
            ["included", "dependency"],
        )


if __name__ == "__main__":
    unittest.main()
