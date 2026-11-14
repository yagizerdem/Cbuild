import unittest

from cbuild_backend.depq_graph import get_target_subgraph, topological_sort
from test.resolution.support import cleanup, commands, fixture, implicit


class DoubleColonEntriesReceivingImplicitRecipesTest(unittest.TestCase):
    """double-colon entries receiving implicit recipes independently"""

    def tearDown(self) -> None:
        cleanup()

    def test_only_the_recipe_less_entry_inherits(self) -> None:
        for reverse in [False, True]:
            with self.subTest(f"recipe entry last={reverse}"):
                disk = fixture()
                disk.write("app.c")
                explicit = "app.o:: explicit.h | explicit-order\n\techo explicit\n"
                blank = "app.o:: blank.h | blank-order\n"
                result = implicit(
                    f"{blank + explicit if reverse else explicit + blank}"
                    + "explicit.h:\nblank.h:\nexplicit-order:\nblank-order:\nimplicit-order:\n"
                    + "%.o: %.c | implicit-order\n\techo implicit\n",
                    disk.root,
                )
                entries = [rule for rule in result.rules if rule.target == "app.o"]
                before = [rule for rule in result.original if rule.target == "app.o"]
                self.assertEqual(len(entries), 2)
                self.assertEqual(
                    [rule.uuid for rule in entries], [rule.uuid for rule in before]
                )
                self.assertEqual(len({rule.uuid for rule in entries}), 2)
                self.assertEqual(
                    [rule.rule_seperator for rule in entries], ["::", "::"]
                )
                recipe_entry = entries[1 if reverse else 0]
                inherited = entries[0 if reverse else 1]
                self.assertIs(recipe_entry, before[1 if reverse else 0])
                self.assertEqual(commands(recipe_entry, result.env), ["echo explicit"])
                self.assertEqual(recipe_entry.prerequisites, ["explicit.h"])
                self.assertEqual(
                    recipe_entry.order_only_prerequisites, ["explicit-order"]
                )
                self.assertEqual(commands(inherited, result.env), ["echo implicit"])
                self.assertEqual(inherited.prerequisites, ["app.c", "blank.h"])
                self.assertEqual(
                    inherited.order_only_prerequisites,
                    ["implicit-order", "blank-order"],
                )
                self.assertEqual(inherited.stem, "app")
                self.assertIs(inherited.rule_ir, result.patterns[0].rule_ir)
                self.assertEqual(before[0 if reverse else 1].recipe_irs, [])
                self.assertEqual(before[0 if reverse else 1].prerequisites, ["blank.h"])

                graph = get_target_subgraph(result.rules, "app.o")
                self.assertEqual(
                    sorted(rule.uuid for rule in graph if rule.target == "app.o"),
                    sorted(rule.uuid for rule in entries),
                )
                order = topological_sort(graph, entries[0])
                for entry in entries:
                    for input in [
                        *entry.prerequisites,
                        *entry.order_only_prerequisites,
                    ]:
                        node = next(
                            (rule for rule in order if rule.target == input), None
                        )
                        if node:
                            self.assertLess(order.index(node), order.index(entry))

    def test_two_recipe_less_siblings_inherit_separate_arrays_without_touching_the_explicit_sibling_or_pattern(
        self,
    ) -> None:
        disk = fixture()
        disk.write("app.c")
        result = implicit(
            "app.o:: first.h | first-order\napp.o:: second.h | second-order\n"
            + "app.o:: explicit.h\n\techo explicit\n"
            + "first.h:\nsecond.h:\nexplicit.h:\nfirst-order:\nsecond-order:\nimplicit-order:\n"
            + "%.o: %.c | implicit-order\n\techo implicit\n",
            disk.root,
        )
        entries = [rule for rule in result.rules if rule.target == "app.o"]
        self.assertEqual(len(entries), 3)
        self.assertEqual(
            [commands(rule, result.env) for rule in entries],
            [["echo implicit"], ["echo implicit"], ["echo explicit"]],
        )
        self.assertEqual(
            [rule.prerequisites for rule in entries],
            [["app.c", "first.h"], ["app.c", "second.h"], ["explicit.h"]],
        )
        self.assertEqual(
            [rule.order_only_prerequisites for rule in entries],
            [["implicit-order", "first-order"], ["implicit-order", "second-order"], []],
        )
        self.assertEqual(
            [rule.uuid for rule in entries],
            [rule.uuid for rule in result.original if rule.target == "app.o"],
        )
        self.assertEqual(len({rule.uuid for rule in entries}), 3)
        first, second = entries[0], entries[1]
        for key in [
            "prerequisites",
            "order_only_prerequisites",
            "recipe_irs",
            "evaluated_recipe_irs",
        ]:
            self.assertIsNot(getattr(first, key), getattr(second, key))
        first.prerequisites.append("test-only-marker")
        first.order_only_prerequisites.append("test-only-order")
        first.recipe_irs.pop()
        first.evaluated_recipe_irs.pop()
        self.assertEqual(second.prerequisites, ["app.c", "second.h"])
        self.assertEqual(
            second.order_only_prerequisites, ["implicit-order", "second-order"]
        )
        self.assertEqual(commands(second, result.env), ["echo implicit"])
        self.assertEqual(result.patterns[0].prerequisites, ["%.c"])
        self.assertEqual(result.patterns[0].order_only_prerequisites, ["implicit-order"])
        self.assertEqual(len(result.patterns[0].recipe_irs), 1)
        self.assertEqual(len(result.patterns[0].evaluated_recipe_irs), 1)


if __name__ == "__main__":
    unittest.main()
