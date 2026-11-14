import unittest

from test.resolution.case_support import (
    automatic,
    cleanup,
    commands,
    evaluate,
    expand,
    fixture,
)


class StaticPatternExpansionAndIsolationTest(unittest.TestCase):
    """S01-S13 static pattern expansion and isolation"""

    def tearDown(self) -> None:
        cleanup()

    def test_s01_s02_multiple_targets_derive_independent_stems_from_one_target_pattern(
        self,
    ) -> None:
        rules = evaluate("a.o b.o: %.o: %.c\n").rules
        self.assertEqual(
            [[rule.target, rule.prerequisites] for rule in rules],
            [["a.o", ["a.c"]], ["b.o", ["b.c"]]],
        )

    def test_s03_empty_stem_substitutes_to_an_empty_string(self) -> None:
        rules = evaluate(".o: %.o: %.c | %.stamp\n").rules
        self.assertEqual(rules[0].target, ".o")
        self.assertEqual(rules[0].prerequisites, [".c"])
        self.assertEqual(rules[0].order_only_prerequisites, [".stamp"])

    def test_s04_target_prefix_and_suffix_are_stripped_when_deriving_the_stem(
        self,
    ) -> None:
        rules = evaluate("pre-one.suf pre-two.suf: pre-%.suf: src/%.c\n").rules
        self.assertEqual(
            [rule.prerequisites for rule in rules], [["src/one.c"], ["src/two.c"]]
        )

    def test_s05_nonmatching_static_targets_are_omitted_under_the_current_cbuild_contract(
        self,
    ) -> None:
        rules = evaluate("a.o README b.h: %.o: %.c\n").rules
        self.assertEqual([rule.target for rule in rules], ["a.o"])

    def test_s06_s07_multiple_patterns_share_a_stem_and_literal_prerequisites_remain_unchanged(
        self,
    ) -> None:
        rules = evaluate("a.o: %.o: src/%.c headers/%.h config.h\n").rules
        self.assertEqual(
            rules[0].prerequisites, ["src/a.c", "headers/a.h", "config.h"]
        )

    def test_s08_order_only_prerequisite_patterns_receive_stem_substitution(
        self,
    ) -> None:
        rules = evaluate("a.o b.o: %.o: %.c | cache/%.stamp prepare\n").rules
        self.assertEqual(
            [rule.order_only_prerequisites for rule in rules],
            [["cache/a.stamp", "prepare"], ["cache/b.stamp", "prepare"]],
        )

    def test_s09_expanded_target_lists_split_into_separate_targets(self) -> None:
        rules = evaluate("OBJECTS = a.o b.o\n$(OBJECTS): %.o: %.c\n").rules
        self.assertEqual([rule.target for rule in rules], ["a.o", "b.o"])

    def test_s10_expanded_prerequisite_lists_split_before_substitution(self) -> None:
        rules = evaluate("INPUTS = %.c common.h\na.o: %.o: $(INPUTS)\n").rules
        self.assertEqual(rules[0].prerequisites, ["a.c", "common.h"])

    def test_expanded_order_only_lists_also_split_before_substitution(self) -> None:
        rules = evaluate("ORDER = cache/%.stamp prepare\na.o: %.o: %.c | $(ORDER)\n").rules
        self.assertEqual(
            rules[0].order_only_prerequisites, ["cache/a.stamp", "prepare"]
        )

    def test_s11_s12_target_models_own_separate_recipe_and_prerequisite_arrays(
        self,
    ) -> None:
        result = evaluate("a.o b.o: %.o: %.c | %.stamp\n\techo compile\n")
        first, second = result.rules[0], result.rules[1]
        self.assertIsNot(first.recipe_irs, second.recipe_irs)
        self.assertIsNot(first.evaluated_recipe_irs, second.evaluated_recipe_irs)
        self.assertIsNot(first.prerequisites, second.prerequisites)
        self.assertIsNot(
            first.order_only_prerequisites, second.order_only_prerequisites
        )
        first.recipe_irs.pop()
        first.evaluated_recipe_irs.pop()
        first.prerequisites.append("extra")
        first.order_only_prerequisites.append("extra-stamp")
        self.assertEqual(commands(second, result.env), ["echo compile"])
        self.assertEqual(second.prerequisites, ["b.c"])
        self.assertEqual(second.order_only_prerequisites, ["b.stamp"])

    def test_s13_static_rule_automatic_target_and_first_source_names_use_the_concrete_target(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("src/a.c")
        disk.write("src/b.c")
        result = evaluate("a.o b.o: %.o: src/%.c\n\techo $(@) $(<)\n")
        self.assertEqual(
            [
                commands(rule, automatic(result.rules, rule, result.env).scope)
                for rule in result.rules
            ],
            [["echo a.o src/a.c"], ["echo b.o src/b.c"]],
        )

    def test_s13_current_limitation_static_rule_star_automatic_variable_is_unsupported(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("a.c")
        result = evaluate("a.o: %.o: %.c\n")
        scope = automatic(result.rules, result.rules[0], result.env).scope
        self.assertEqual(scope.has_variable("*"), False)
        self.assertEqual(expand("$(*)", scope), "")


if __name__ == "__main__":
    unittest.main()
