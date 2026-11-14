import unittest
from dataclasses import dataclass, field

from cbuild_backend.depq_graph import (
    get_target_subgraph,
    has_circular_dependency,
    topological_sort,
)
from test.resolution.helpers import normalized, target
from type.cbuild_exception import CbuildException, MachineCode


@dataclass
class Edges:
    normal: list[int] = field(default_factory=list)
    order_only: list[int] = field(default_factory=list)


# A small deterministic generator produces repeatable varied DAGs. All edges
# point at larger indices, so acyclicity follows independently of production DFS.
def dag(seed: int, size: int = 32) -> list[Edges]:
    state = seed

    def next() -> int:
        nonlocal state
        state = (state * 1664525 + 1013904223) & 0xFFFFFFFF
        return state

    result: list[Edges] = []
    for node in range(size):
        edges = Edges()
        for dependency in range(node + 1, size):
            draw = next() % 9
            if draw == 0 or draw == 1:
                edges.normal.append(dependency)
            if draw == 2:
                edges.order_only.append(dependency)
        result.append(edges)
    return result


def source_of(edges: list[Edges]) -> str:
    return "".join(
        f"n{index}: {' '.join(f'n{name}' for name in edge.normal)}"
        + (
            f" | {' '.join(f'n{name}' for name in edge.order_only)}"
            if len(edge.order_only)
            else ""
        )
        + "\n"
        for index, edge in enumerate(edges)
    )


def reachable(edges: list[Edges], start: int) -> list[int]:
    # Breadth-first traversal of the fixture's numeric edges is the test oracle;
    # it does not call the implementation's traversal to derive expectations.
    found = {start}
    queue = [start]
    index = 0
    while index < len(queue):
        edge = edges[queue[index]]
        for dependency in [*edge.normal, *edge.order_only]:
            if dependency in found:
                continue
            found.add(dependency)
            queue.append(dependency)
        index += 1
    return sorted(found)


class GeneratedGraphInvariantsTest(unittest.TestCase):
    """generated graph invariants with independent expectations"""

    def test_all_edge_classes_resolve_exactly_and_every_reachable_dependency_precedes_its_consumer(
        self,
    ) -> None:
        for seed in [1, 7, 42, 2026, 65535]:
            with self.subTest(seed=seed):
                edges = dag(seed)
                rules = normalized(source_of(edges)).rules
                self.assertEqual(len(rules), len(edges))
                self.assertEqual(has_circular_dependency(rules), False)
                for start in [0, 5, 17, 31]:
                    graph = get_target_subgraph(rules, f"n{start}")
                    expected = sorted(f"n{node}" for node in reachable(edges, start))
                    self.assertEqual(sorted(rule.target for rule in graph), expected)
                    sorted_rules = topological_sort(rules, target(rules, f"n{start}"))
                    positions = {
                        rule.target: index for index, rule in enumerate(sorted_rules)
                    }
                    self.assertEqual(sorted(positions.keys()), expected)
                    self.assertEqual(len(sorted_rules), len(expected))
                    for rule in sorted_rules:
                        node = int(rule.target[1:])
                        self.assertEqual(
                            rule.prerequisites,
                            [f"n{dependency}" for dependency in edges[node].normal],
                        )
                        self.assertEqual(
                            rule.order_only_prerequisites,
                            [f"n{dependency}" for dependency in edges[node].order_only],
                        )
                        for dependency in [
                            *rule.prerequisites,
                            *rule.order_only_prerequisites,
                        ]:
                            self.assertLess(
                                positions[dependency], positions[rule.target]
                            )

    def test_a_back_edge_converts_a_chain_into_a_rejected_cycle(self) -> None:
        for kind in ["normal", "order_only"]:
            with self.subTest(kind=kind):
                edges = [
                    Edges(normal=[index + 1] if index < 23 else [], order_only=[])
                    for index in range(24)
                ]
                getattr(edges[23], kind).append(0)
                rules = normalized(source_of(edges)).rules
                self.assertEqual(has_circular_dependency(rules), True)
                with self.assertRaises(CbuildException) as context:
                    get_target_subgraph(rules, "n0")
                self.assertEqual(
                    context.exception.machine_code, MachineCode.CIRCULAR_DEPQ
                )
                with self.assertRaises(CbuildException) as context:
                    topological_sort(rules, rules[0])
                self.assertEqual(
                    context.exception.machine_code, MachineCode.CIRCULAR_DEPQ
                )


if __name__ == "__main__":
    unittest.main()
