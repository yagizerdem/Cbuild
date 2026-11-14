import unittest

from cbuild_backend.execution.preq_resolution.preq_resolver import PreqResolver
from cbuild_backend.execution.preq_resolution.type import PathOrigin
from test.resolution.case_support import (
    automatic,
    cleanup,
    evaluate,
    expand,
    fixture,
    target,
)


class DeclarationSnapshotsClearAndRedefinitionTest(unittest.TestCase):
    """V01-V06 declaration snapshots, clear and redefinition"""

    def tearDown(self) -> None:
        cleanup()

    def test_v01_later_declarations_affect_only_subsequent_rules_under_the_snapshot_contract(
        self,
    ) -> None:
        rules = evaluate("before:\nvpath %.c sources\nafter:\n").rules
        self.assertEqual(target(rules, "before").vpath_rules, [])
        self.assertEqual(
            [[rule.pattern, rule.dirs] for rule in target(rules, "after").vpath_rules],
            [["%.c", ["sources"]]],
        )

    def test_v02_pattern_clear_removes_only_the_chosen_pattern_from_subsequent_rules(
        self,
    ) -> None:
        rules = evaluate(
            "vpath %.c sources\nvpath %.h headers\nbefore:\nvpath %.c\nafter:\n"
        ).rules
        self.assertEqual(
            [rule.pattern for rule in target(rules, "before").vpath_rules],
            ["%.c", "%.h"],
        )
        self.assertEqual(
            [rule.pattern for rule in target(rules, "after").vpath_rules], ["%.h"]
        )

    def test_v03_bare_vpath_clears_every_active_pattern_for_subsequent_rules(
        self,
    ) -> None:
        result = evaluate(
            "vpath %.c sources\nvpath %.h headers\nbefore:\nvpath\nafter:\n"
        )
        self.assertEqual(len(target(result.rules, "before").vpath_rules), 2)
        self.assertEqual(target(result.rules, "after").vpath_rules, [])
        self.assertEqual(result.state.vpaths, [])

    def test_v04_overlapping_matching_declarations_preserve_order(self) -> None:
        disk = fixture()
        disk.cwd()
        first = disk.write("general/source.c")
        disk.write("specific/source.c")
        rules = evaluate("vpath % general\nvpath %.c specific\nall: source.c\n").rules
        self.assertEqual(
            PreqResolver(rules, rules[0].vpath_rules).resolve("source.c").origin,
            PathOrigin(type="vpath", absolute_path=first),
        )

    def test_v05_repeated_patterns_retain_directory_search_order(self) -> None:
        disk = fixture()
        disk.cwd()
        first = disk.write("second/source.c")
        disk.write("third/source.c")
        rules = evaluate(
            "vpath %.c missing second\nvpath %.c third\nall: source.c\n"
        ).rules
        self.assertEqual(
            PreqResolver(rules, rules[0].vpath_rules).resolve("source.c").origin,
            PathOrigin(type="vpath", absolute_path=first),
        )

    def test_v06_pattern_can_be_cleared_then_redefined_without_resurrecting_old_directories(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("old/source.c")
        expected = disk.write("new/source.c")
        rules = evaluate(
            "vpath %.c old\nvpath %.c\nvpath %.c new\nall: source.c\n"
        ).rules
        self.assertEqual([rule.dirs for rule in rules[0].vpath_rules], [["new"]])
        self.assertEqual(
            PreqResolver(rules, rules[0].vpath_rules).resolve("source.c").origin,
            PathOrigin(type="vpath", absolute_path=expected),
        )


class FileLookupAndOriginalAutomaticNamesTest(unittest.TestCase):
    """V07-V10 file lookup and original automatic names"""

    def tearDown(self) -> None:
        cleanup()

    def test_v07_a_nonmatching_pattern_has_no_effect_on_lookup(self) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("headers/source.c")
        rules = evaluate("vpath %.h headers\nall: source.c\n").rules
        self.assertEqual(
            PreqResolver(rules, rules[0].vpath_rules).resolve("source.c").origin.type,
            "not-found",
        )

    def test_v08_cwd_wins_over_vpath(self) -> None:
        disk = fixture()
        disk.cwd()
        expected = disk.write("source.c")
        disk.write("sources/source.c")
        rules = evaluate("vpath %.c sources\nall: source.c\n").rules
        self.assertEqual(
            PreqResolver(rules, rules[0].vpath_rules).resolve("source.c").origin,
            PathOrigin(type="cwd", absolute_path=expected),
        )

    def test_v09_missing_absolute_prerequisite_never_falls_back_to_vpath(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("sources/source.c")
        rules = evaluate("vpath %.c sources\nall:\n").rules
        self.assertEqual(
            PreqResolver(rules, rules[0].vpath_rules)
            .resolve(disk.path("missing/source.c"))
            .origin.type,
            "not-found",
        )

    def test_v10_vpath_lookup_preserves_original_prerequisite_names_in_automatic_variables(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("sources/input.c")
        result = evaluate("vpath %.c sources\nall: input.c\n")
        resolution = automatic(result.rules, result.rules[0], result.env)
        scope, preqs = resolution.scope, resolution.preqs
        self.assertEqual(preqs.first[0].origin.type, "vpath")
        self.assertEqual(preqs.first[0].preq_name, "input.c")
        self.assertEqual(
            expand("$(<)|$(^)|$(+)|$(?)", scope), "input.c|input.c|input.c|input.c"
        )


if __name__ == "__main__":
    unittest.main()
