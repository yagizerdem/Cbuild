import unittest

from cbuild_backend.depq_graph import (
    find_default_target_name,
    find_rule_by_uuid,
    find_target_list,
    find_target_rule,
    find_top_level_targets,
    get_all_subgraphs,
    get_target_subgraph,
    has_circular_dependency,
    topological_sort,
)
from test.resolution.helpers import commands, evaluate, normalized, target
from type.cbuild_exception import CbuildException, MachineCode


class NormalizationOfParsedAndExpandedRulesTest(unittest.TestCase):
    """normalization of parsed and expanded rules"""

    def test_single_colon_declarations_merge_prerequisite_lists_in_source_order(
        self,
    ) -> None:
        rules = normalized("all: a b | cache\nall: b c | stamp\nother:\n").rules
        self.assertEqual([rule.target for rule in rules], ["all", "other"])
        self.assertEqual(rules[0].prerequisites, ["a", "b", "b", "c"])
        self.assertEqual(rules[0].order_only_prerequisites, ["cache", "stamp"])

    def test_last_nonempty_recipe_wins_while_later_recipe_less_declarations_add_inputs(
        self,
    ) -> None:
        result = normalized(
            "all: first\n\techo old\nall: second\n\techo new\nall: third\n"
        )
        self.assertEqual(commands(result.rules[0], result.env), ["echo new"])
        self.assertEqual(result.rules[0].prerequisites, ["first", "second", "third"])

    def test_double_colon_entries_retain_independent_recipes_and_prerequisites(
        self,
    ) -> None:
        result = normalized("all:: first\n\techo first\nall:: second\n\techo second\n")
        rules = result.rules
        self.assertEqual(len(rules), 2)
        self.assertEqual(
            [rule.prerequisites for rule in rules], [["first"], ["second"]]
        )
        self.assertEqual(
            [commands(rule, result.env) for rule in rules],
            [["echo first"], ["echo second"]],
        )
        self.assertNotEqual(rules[0].uuid, rules[1].uuid)

    def test_rejects_mixed_separators_for_the_same_expanded_target(self) -> None:
        for source in ["all: a\nall:: b\n", "all:: a\nall: b\n"]:
            with self.subTest(source=source):
                with self.assertRaises(CbuildException) as context:
                    normalized(source)
                self.assertEqual(
                    context.exception.machine_code, MachineCode.INVALID_RULE_SEPERATOR
                )

    def test_different_targets_can_use_different_separators(self) -> None:
        self.assertEqual(len(normalized("first: a\nsecond:: b\n").rules), 2)

    def test_multi_target_rule_owns_independent_prerequisite_and_recipe_arrays(
        self,
    ) -> None:
        rules = evaluate("a b: common | cache\n\techo shared\n").rules
        self.assertEqual(len(rules), 2)
        self.assertIsNot(rules[0].prerequisites, rules[1].prerequisites)
        self.assertIsNot(rules[0].recipe_irs, rules[1].recipe_irs)
        rules[0].prerequisites.append("extra")
        self.assertEqual(rules[1].prerequisites, ["common"])

    def test_undefined_and_whitespace_only_expansions_do_not_create_empty_dependencies(
        self,
    ) -> None:
        rules = evaluate(
            "EMPTY =\nall: $(EMPTY) $(MISSING) $(strip   a    b) | $(EMPTY)\n"
        ).rules
        self.assertEqual(rules[0].prerequisites, ["a", "b"])
        self.assertEqual(rules[0].order_only_prerequisites, [])

    def test_a_completely_empty_target_expansion_creates_no_model(self) -> None:
        self.assertEqual(evaluate("$(MISSING): a\n").rules, [])


class ReachableGraphAndDependencyOrderTest(unittest.TestCase):
    """reachable graph and dependency order"""

    diamond = "app: left right | prepare\nleft: shared\nright: shared\nshared: source.txt\nprepare:\nunrelated: ignored\nignored:\n"

    def test_subgraph_contains_normal_order_only_targets_shared_nodes_once_and_no_unrelated_nodes(
        self,
    ) -> None:
        rules = normalized(self.diamond).rules
        graph = get_target_subgraph(rules, "app")
        self.assertEqual(
            sorted(rule.target for rule in graph),
            ["app", "left", "prepare", "right", "shared"],
        )
        self.assertEqual(len([rule for rule in graph if rule.target == "shared"]), 1)
        self.assertEqual(target(graph, "shared").prerequisites, ["source.txt"])
        self.assertEqual(has_circular_dependency(graph), False)

    def test_topological_sort_puts_every_dependency_before_its_consumer(
        self,
    ) -> None:
        rules = normalized(self.diamond).rules
        sorted_rules = topological_sort(rules, target(rules, "app"))
        names = [rule.target for rule in sorted_rules]
        self.assertEqual(len(names), 5)
        self.assertEqual(names[-1], "app")
        for rule in sorted_rules:
            for preq in [*rule.prerequisites, *rule.order_only_prerequisites]:
                if preq in names:
                    self.assertLess(names.index(preq), names.index(rule.target))

    def test_duplicate_dependencies_do_not_duplicate_graph_nodes_or_sorted_rules(
        self,
    ) -> None:
        rules = normalized("all: a a a | a b b\na: b b\nb:\n").rules
        self.assertEqual(
            sorted(rule.target for rule in get_target_subgraph(rules)),
            ["a", "all", "b"],
        )
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, rules[0])],
            ["b", "a", "all"],
        )

    def test_empty_graph_and_explicitly_missing_goals_have_no_reachable_rules(
        self,
    ) -> None:
        self.assertIsNone(find_default_target_name([]))
        self.assertEqual(get_target_subgraph([]), [])
        self.assertEqual(get_target_subgraph([], None), [])
        self.assertEqual(get_all_subgraphs([]), [])
        self.assertEqual(has_circular_dependency([]), False)

    def test_default_goal_remains_the_first_declared_target(self) -> None:
        rules = normalized(
            "chosen: dependency\nsecond:\ndependency:\nchosen: extra\n"
        ).rules
        self.assertEqual(find_default_target_name(rules), "chosen")
        self.assertEqual(
            sorted(rule.target for rule in get_target_subgraph(rules)),
            ["chosen", "dependency"],
        )
        self.assertEqual(get_target_subgraph(rules, "missing"), [])

    def test_top_level_targets_exclude_normal_and_order_only_dependencies_and_preserve_order(
        self,
    ) -> None:
        rules = normalized(
            "second: shared | setup\nfirst: shared\nshared:\nsetup:\nsecond: extra\n"
        ).rules
        self.assertEqual(find_top_level_targets(rules), ["second", "first"])
        self.assertEqual(
            [sorted(rule.target for rule in graph) for graph in get_all_subgraphs(rules)],
            [["second", "setup", "shared"], ["first", "shared"]],
        )

    def test_detects_cycle_and_rejects_sorting_and_subgraph_extraction(self) -> None:
        for _name, source in [
            ("self-edge", "a: a\n"),
            ("two-node cycle", "a: b\nb: a\n"),
            ("long cycle", "a: b\nb: c\nc: d\nd: a\n"),
            ("order-only cycle", "a: | b\nb: | a\n"),
            ("mixed-edge cycle", "a: b\nb: | a\n"),
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

    def test_an_unrelated_cycle_does_not_prevent_resolving_a_safe_goal(self) -> None:
        rules = normalized("safe: leaf\nleaf:\nx: y\ny: x\n").rules
        self.assertEqual(has_circular_dependency(rules), True)
        self.assertEqual(
            [rule.target for rule in get_target_subgraph(rules, "safe")],
            ["safe", "leaf"],
        )
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, rules[0])],
            ["leaf", "safe"],
        )

    def test_double_colon_nodes_keep_every_entry_and_include_every_entrys_dependencies(
        self,
    ) -> None:
        rules = normalized("all:: left\nall:: right\nleft:\nright:\n").rules
        self.assertEqual(len(get_target_subgraph(rules, "all")), 4)
        sorted_rules = topological_sort(rules, rules[0])
        self.assertEqual(
            [rule.target for rule in sorted_rules], ["left", "right", "all", "all"]
        )

    def test_a_long_acyclic_chain_retains_every_node_in_prerequisite_first_order(
        self,
    ) -> None:
        length = 120
        source = "".join(
            f"n{index}:{f' n{index + 1}' if index + 1 < length else ''}\n"
            for index in range(length)
        )
        rules = normalized(source).rules
        self.assertEqual(has_circular_dependency(rules), False)
        self.assertEqual(len(get_target_subgraph(rules)), length)
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, rules[0])],
            [f"n{length - index - 1}" for index in range(length)],
        )

    def test_lookup_finds_the_first_target_rule_all_entries_and_exact_uuid_identity(
        self,
    ) -> None:
        rules = normalized("all:: first\nall:: second\nother:\n").rules
        self.assertIs(find_target_rule(rules, "all"), rules[0])
        self.assertEqual(find_target_list(rules, "all"), rules[0:2])
        self.assertIs(find_rule_by_uuid(rules, rules[1].uuid), rules[1])
        with self.assertRaises(CbuildException) as context:
            find_target_rule(rules, "absent")
        self.assertEqual(context.exception.machine_code, MachineCode.FILE_NOT_FOUND)
        with self.assertRaises(CbuildException) as context:
            find_target_list(rules, "absent")
        self.assertEqual(context.exception.machine_code, MachineCode.FILE_NOT_FOUND)
        with self.assertRaisesRegex(Exception, "not found"):
            find_rule_by_uuid(rules, "absent")

    def test_expanded_prerequisite_names_become_graph_edges_rather_than_literal_references(
        self,
    ) -> None:
        rules = normalized(
            "NAMES = left right\nall: $(NAMES)\nleft: shared\nright: shared\nshared:\n"
        ).rules
        self.assertEqual(
            [rule.target for rule in topological_sort(rules, rules[0])],
            ["shared", "left", "right", "all"],
        )


if __name__ == "__main__":
    unittest.main()
