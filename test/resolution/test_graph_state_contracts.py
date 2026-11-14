import unittest

from cbuild_backend.depq_graph import (
    find_default_target_name,
    find_target_list,
    find_target_rule,
    get_target_subgraph,
    has_circular_dependency,
    topological_sort,
)
from test.resolution.case_support import (
    cleanup,
    commands,
    evaluate,
    fixture,
    normalized,
    target,
)
from type.cbuild_exception import CbuildException, MachineCode


class GraphAndNormalizationContractsTest(unittest.TestCase):
    """G01-G14 graph and normalization contracts"""

    def tearDown(self) -> None:
        cleanup()

    def test_cycle_is_detected_in_reachable_graph_and_sorting(self) -> None:
        for _name, source in [
            ("G01 self-cycle", "a: a\n"),
            ("G02 two-node cycle", "a: b\nb: a\n"),
            ("G03 order-only cycle", "a: | b\nb: | a\n"),
            ("G04 mixed-edge cycle", "a: b\nb: | a\n"),
        ]:
            with self.subTest(_name):
                rules = normalized(source).rules
                self.assertEqual(has_circular_dependency(rules), True)
                with self.assertRaises(CbuildException) as context:
                    get_target_subgraph(rules, "a")
                self.assertEqual(
                    context.exception.machine_code, MachineCode.CIRCULAR_DEPQ
                )
                with self.assertRaises(CbuildException) as context:
                    topological_sort(rules, rules[0])
                self.assertEqual(
                    context.exception.machine_code, MachineCode.CIRCULAR_DEPQ
                )

    def test_g05_diamond_retains_one_shared_model_and_puts_it_before_both_consumers(
        self,
    ) -> None:
        rules = normalized("all: left right\nleft: shared\nright: shared\nshared:\n").rules
        graph = get_target_subgraph(rules, "all")
        self.assertEqual(
            sorted(rule.target for rule in graph), ["all", "left", "right", "shared"]
        )
        order = [rule.target for rule in topological_sort(graph, rules[0])]
        self.assertEqual(len([name for name in order if name == "shared"]), 1)
        self.assertLess(order.index("shared"), order.index("left"))
        self.assertLess(order.index("shared"), order.index("right"))
        self.assertEqual(order[-1], "all")

    def test_g06_duplicate_normal_order_only_edges_never_duplicate_graph_nodes(
        self,
    ) -> None:
        rules = normalized("all: dep dep | dep dep\ndep:\n").rules
        self.assertEqual(
            [rule.target for rule in get_target_subgraph(rules, "all")],
            ["all", "dep"],
        )
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, rules[0])],
            ["dep", "all"],
        )

    def test_g07_disconnected_cycles_have_no_effect_on_a_safe_requested_goal(
        self,
    ) -> None:
        rules = normalized("safe: leaf\nleaf:\nbad: other\nother: bad\n").rules
        self.assertEqual(has_circular_dependency(rules), True)
        self.assertEqual(
            [rule.target for rule in get_target_subgraph(rules, "safe")],
            ["safe", "leaf"],
        )
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, target(rules, "safe"))],
            ["leaf", "safe"],
        )

    def test_g08_missing_goal_lookup_rejects_while_subgraph_extraction_returns_an_empty_graph(
        self,
    ) -> None:
        rules = normalized("existing:\n").rules
        with self.assertRaises(CbuildException) as context:
            find_target_rule(rules, "missing")
        self.assertEqual(context.exception.machine_code, MachineCode.FILE_NOT_FOUND)
        self.assertEqual(get_target_subgraph(rules, "missing"), [])

    def test_g09_multiple_double_colon_models_retain_identities_inputs_and_independent_recipes(
        self,
    ) -> None:
        result = normalized(
            "all:: first\n\techo first\nall:: second\n\techo second\nfirst:\nsecond:\n"
        )
        rules = result.rules
        entries = find_target_list(rules, "all")
        self.assertEqual(len(entries), 2)
        self.assertNotEqual(entries[0].uuid, entries[1].uuid)
        self.assertEqual(
            [rule.prerequisites for rule in entries], [["first"], ["second"]]
        )
        self.assertEqual(
            [commands(rule, result.env) for rule in entries],
            [["echo first"], ["echo second"]],
        )
        self.assertEqual(len(get_target_subgraph(rules, "all")), 4)
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, entries[0])],
            ["first", "second", "all", "all"],
        )

    def test_g10_mixed_colon_separators_reject_regardless_of_declaration_order(
        self,
    ) -> None:
        for source in ["all: first\nall:: second\n", "all:: first\nall: second\n"]:
            with self.subTest(source=source):
                with self.assertRaises(CbuildException) as context:
                    normalized(source)
                self.assertEqual(
                    context.exception.machine_code, MachineCode.INVALID_RULE_SEPERATOR
                )

    def test_g11_normalized_multi_target_models_retain_independent_mutable_arrays(
        self,
    ) -> None:
        result = normalized("one two: common | cache\n\techo shared\n")
        one, two = result.rules[0], result.rules[1]
        self.assertIsNot(one.prerequisites, two.prerequisites)
        self.assertIsNot(one.order_only_prerequisites, two.order_only_prerequisites)
        self.assertIsNot(one.recipe_irs, two.recipe_irs)
        self.assertIsNot(one.evaluated_recipe_irs, two.evaluated_recipe_irs)
        one.prerequisites.append("extra")
        one.recipe_irs.pop()
        one.evaluated_recipe_irs.pop()
        self.assertEqual(two.prerequisites, ["common"])
        self.assertEqual(commands(two, result.env), ["echo shared"])

    def test_g12_recipe_less_duplicate_declarations_merge_inputs_in_source_order(
        self,
    ) -> None:
        rules = normalized(
            "all: first | stamp1\nall: second first | stamp2\nall: third\n"
        ).rules
        self.assertEqual(len(rules), 1)
        self.assertEqual(rules[0].prerequisites, ["first", "second", "first", "third"])
        self.assertEqual(rules[0].order_only_prerequisites, ["stamp1", "stamp2"])
        self.assertEqual(rules[0].recipe_irs, [])

    def test_g13_included_files_first_target_remains_the_default_goal(self) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("goals.mk", "included:\n")
        rules = normalized("include goals.mk\nmain:\n").rules
        self.assertEqual(find_default_target_name(rules), "included")

    def test_g14_conditional_and_included_models_enter_the_graph_once_without_normalization_masking_repeats(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("included.mk", "included: leaf\nleaf:\n")
        rules = evaluate(
            "before:\nifeq (yes,yes)\nconditional: included\ninclude included.mk\nendif\nafter:\n"
        ).rules
        self.assertEqual(
            [rule.target for rule in rules],
            ["before", "conditional", "included", "leaf", "after"],
        )
        self.assertEqual(
            [rule.target for rule in get_target_subgraph(rules, "conditional")],
            ["conditional", "included", "leaf"],
        )


if __name__ == "__main__":
    unittest.main()
