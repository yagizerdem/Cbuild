import unittest
from unittest import mock

from cbuild_backend import implicit_rule_resolver
from cbuild_backend.depq_graph import get_target_subgraph, topological_sort
from test.resolution.support import cleanup, commands, fixture, implicit, target


class FailedCandidateRollbackTest(unittest.TestCase):
    """failed candidate rollback with shared and order-only intermediates"""

    def tearDown(self) -> None:
        cleanup()

    def test_a_late_failure_leaves_only_the_successful_plan_in_the_graph(
        self,
    ) -> None:
        for failure in ["absent", "cycle"]:
            with self.subTest(failure=failure):
                disk = fixture()
                for name in [
                    "app.shared-src",
                    "app.dead-src",
                    "app.shared-order-src",
                    "app.dead-order-src",
                    "app.good-src",
                ]:
                    disk.write(name)
                real_exists = implicit_rule_resolver.file_exist_by_absolute_path
                reads = mock.patch.object(
                    implicit_rule_resolver,
                    "file_exist_by_absolute_path",
                    side_effect=real_exists,
                ).start()
                cyclic = "%.absent: %.o\n\techo cycle\n" if failure == "cycle" else ""
                source = (
                    "all: app.o\n"
                    # Both alternatives require chaining, so the second cannot win the direct
                    # pass before the first candidate's intermediate plans have been explored.
                    + "%.o: %.shared %.dead | %.shared-order %.dead-order %.absent\n\techo rejected\n"
                    + "%.o: %.shared %.good | %.shared-order\n\techo accepted\n"
                    + "%.shared: %.shared-src\n\techo shared\n"
                    + "%.dead: %.dead-src\n\techo discarded\n"
                    + "%.shared-order: %.shared-order-src\n\techo shared-order\n"
                    + "%.dead-order: %.dead-order-src\n\techo discarded-order\n"
                    + "%.good: %.good-src\n\techo good\n"
                    + cyclic
                )
                result = implicit(source, disk.root)
                called = [call.args[0] for call in reads.call_args_list]
                # These files belong to completed intermediate plans in the rejected
                # candidate; checking them proves the rollback path was actually reached.
                self.assertIn(disk.path("app.dead-src"), called)
                self.assertIn(disk.path("app.dead-order-src"), called)
                self.assertIn(disk.path("app.absent"), called)
                expected_names = [
                    "all",
                    "app.o",
                    "app.shared",
                    "app.good",
                    "app.shared-order",
                ]
                self.assertEqual(
                    sorted(rule.target for rule in result.rules), sorted(expected_names)
                )
                object = target(result.rules, "app.o")
                self.assertEqual(commands(object, result.env), ["echo accepted"])
                self.assertEqual(object.prerequisites, ["app.shared", "app.good"])
                self.assertEqual(object.order_only_prerequisites, ["app.shared-order"])
                self.assertEqual(
                    target(result.rules, "app.shared").prerequisites, ["app.shared-src"]
                )
                self.assertEqual(
                    target(result.rules, "app.good").prerequisites, ["app.good-src"]
                )
                self.assertEqual(
                    target(result.rules, "app.shared-order").prerequisites,
                    ["app.shared-order-src"],
                )
                self.assertEqual(
                    len({rule.uuid for rule in result.rules}), len(expected_names)
                )
                graph = get_target_subgraph(result.rules, "all")
                self.assertEqual(
                    sorted(rule.target for rule in graph), sorted(expected_names)
                )
                order = [
                    rule.target
                    for rule in topological_sort(graph, target(result.rules, "all"))
                ]
                for name in ["app.shared", "app.good", "app.shared-order"]:
                    self.assertEqual(len([entry for entry in order if entry == name]), 1)
                    self.assertLess(order.index(name), order.index("app.o"))
                self.assertEqual(order[-1], "all")
                self.assertEqual([rule.target for rule in result.original], ["all"])
                self.assertEqual(
                    result.patterns[0].prerequisites, ["%.shared", "%.dead"]
                )
                # Repeating resolution on the same resolver also must not accumulate leaks.
                self.assertEqual(
                    sorted(rule.target for rule in result.resolver.resolve()),
                    sorted(expected_names),
                )
                mock.patch.stopall()


if __name__ == "__main__":
    unittest.main()
