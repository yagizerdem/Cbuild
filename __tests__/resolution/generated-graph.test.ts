import { describe, expect, test } from "vitest";
import { getTargetSubgraph, hasCircularDependency, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { MachineCode } from "@src/cbuild-exception.js";
import { normalized, target } from "./helpers.js";

type Edges = { normal: number[]; orderOnly: number[] };

// A small deterministic generator produces repeatable varied DAGs. All edges
// point at larger indices, so acyclicity follows independently of production DFS.
function dag(seed: number, size = 32): Edges[] {
  let state = seed;
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state;
  };
  return Array.from({ length: size }, (_, node) => {
    const edges: Edges = { normal: [], orderOnly: [] };
    for (let dependency = node + 1; dependency < size; dependency++) {
      const draw = next() % 9;
      if (draw === 0 || draw === 1) edges.normal.push(dependency);
      if (draw === 2) edges.orderOnly.push(dependency);
    }
    return edges;
  });
}

function sourceOf(edges: Edges[]) {
  return edges.map((edge, index) => `n${index}: ${edge.normal.map((name) => `n${name}`).join(" ")}${edge.orderOnly.length ? ` | ${edge.orderOnly.map((name) => `n${name}`).join(" ")}` : ""}\n`).join("");
}

function reachable(edges: Edges[], start: number): number[] {
  // Breadth-first traversal of the fixture's numeric edges is the test oracle;
  // it does not call the implementation's traversal to derive expectations.
  const found = new Set([start]);
  const queue = [start];
  for (let index = 0; index < queue.length; index++) {
    const edge = edges[queue[index]!]!;
    for (const dependency of [...edge.normal, ...edge.orderOnly]) {
      if (found.has(dependency)) continue;
      found.add(dependency);
      queue.push(dependency);
    }
  }
  return [...found].sort((left, right) => left - right);
}

describe("generated graph invariants with independent expectations", () => {
  test.each([1, 7, 42, 2026, 65535])("seed %s: all edge classes resolve exactly and every reachable dependency precedes its consumer", async (seed) => {
    const edges = dag(seed);
    const { rules } = await normalized(sourceOf(edges));
    expect(rules).toHaveLength(edges.length);
    expect(hasCircularDependency(rules)).toBe(false);
    for (const start of [0, 5, 17, 31]) {
      const graph = getTargetSubgraph(rules, `n${start}`);
      const expected = reachable(edges, start).map((node) => `n${node}`).sort();
      expect(graph.map((rule) => rule.target).sort()).toEqual(expected);
      const sorted = topologicalSort(rules, target(rules, `n${start}`));
      const positions = new Map(sorted.map((rule, index) => [rule.target, index]));
      expect([...positions.keys()].sort()).toEqual(expected);
      expect(sorted).toHaveLength(expected.length);
      for (const rule of sorted) {
        const node = Number(rule.target.slice(1));
        expect(rule.prerequisites).toEqual(edges[node]!.normal.map((dependency) => `n${dependency}`));
        expect(rule.orderOnlyPrerequisites).toEqual(edges[node]!.orderOnly.map((dependency) => `n${dependency}`));
        for (const dependency of [...rule.prerequisites, ...rule.orderOnlyPrerequisites]) {
          expect(positions.get(dependency)!).toBeLessThan(positions.get(rule.target)!);
        }
      }
    }
  });

  test.each(["normal", "orderOnly"] as const)("a back edge through %s prerequisites converts a chain into a rejected cycle", async (kind) => {
    const edges = Array.from({ length: 24 }, (_, index): Edges => ({ normal: index < 23 ? [index + 1] : [], orderOnly: [] }));
    edges[23]![kind].push(0);
    const { rules } = await normalized(sourceOf(edges));
    expect(hasCircularDependency(rules)).toBe(true);
    expect(() => getTargetSubgraph(rules, "n0")).toThrow(expect.objectContaining({ machineCode: MachineCode.CIRCULAR_DEPQ }));
    expect(() => topologicalSort(rules, rules[0]!)).toThrow(expect.objectContaining({ machineCode: MachineCode.CIRCULAR_DEPQ }));
  });
});
