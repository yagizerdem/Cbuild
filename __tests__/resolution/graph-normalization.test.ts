import { describe, expect, test } from "vitest";
import { findDefaultTargetName, findRuleByUUID, findTargetList, findTargetRule, findTopLevelTargets, getAllSubgraphs, getTargetSubgraph, hasCircularDependency, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { MachineCode } from "@src/cbuild-exception.js";
import { commands, environment, evaluate, normalized, target } from "./helpers.js";

describe("normalization of parsed and expanded rules", () => {
  test("single-colon declarations merge prerequisite lists in source order", async () => {
    const { rules } = await normalized("all: a b | cache\nall: b c | stamp\nother:\n");
    expect(rules.map((rule) => rule.target)).toEqual(["all", "other"]);
    expect(rules[0]!.prerequisites).toEqual(["a", "b", "b", "c"]);
    expect(rules[0]!.orderOnlyPrerequisites).toEqual(["cache", "stamp"]);
  });

  test("last nonempty recipe wins while later recipe-less declarations add inputs", async () => {
    const { rules, env } = await normalized("all: first\n\techo old\nall: second\n\techo new\nall: third\n");
    expect(commands(rules[0]!, env)).toEqual(["echo new"]);
    expect(rules[0]!.prerequisites).toEqual(["first", "second", "third"]);
  });

  test("double-colon entries retain independent recipes and prerequisites", async () => {
    const { rules, env } = await normalized("all:: first\n\techo first\nall:: second\n\techo second\n");
    expect(rules).toHaveLength(2);
    expect(rules.map((rule) => rule.prerequisites)).toEqual([["first"], ["second"]]);
    expect(rules.map((rule) => commands(rule, env))).toEqual([["echo first"], ["echo second"]]);
    expect(rules[0]!.uuid).not.toBe(rules[1]!.uuid);
  });

  test.each(["all: a\nall:: b\n", "all:: a\nall: b\n"])("rejects mixed separators for the same expanded target", async (source) => {
    await expect(normalized(source)).rejects.toMatchObject({ machineCode: MachineCode.INVALID_RULE_SEPERATOR });
  });

  test("different targets can use different separators", async () => {
    expect((await normalized("first: a\nsecond:: b\n")).rules).toHaveLength(2);
  });

  test("multi-target rule owns independent prerequisite and recipe arrays", async () => {
    const { rules } = await evaluate("a b: common | cache\n\techo shared\n");
    expect(rules).toHaveLength(2);
    expect(rules[0]!.prerequisites).not.toBe(rules[1]!.prerequisites);
    expect(rules[0]!.recipeIRs).not.toBe(rules[1]!.recipeIRs);
    rules[0]!.prerequisites.push("extra");
    expect(rules[1]!.prerequisites).toEqual(["common"]);
  });

  test("undefined and whitespace-only expansions do not create empty dependencies", async () => {
    const { rules } = await evaluate("EMPTY =\nall: $(EMPTY) $(MISSING) $(strip   a    b) | $(EMPTY)\n");
    expect(rules[0]!.prerequisites).toEqual(["a", "b"]);
    expect(rules[0]!.orderOnlyPrerequisites).toEqual([]);
  });

  test("a completely empty target expansion creates no model", async () => {
    expect((await evaluate("$(MISSING): a\n")).rules).toEqual([]);
  });
});

describe("reachable graph and dependency order", () => {
  const diamond = "app: left right | prepare\nleft: shared\nright: shared\nshared: source.txt\nprepare:\nunrelated: ignored\nignored:\n";

  test("subgraph contains normal/order-only targets, shared nodes once, and no unrelated nodes", async () => {
    const { rules } = await normalized(diamond);
    const graph = getTargetSubgraph(rules, "app");
    expect(graph.map((rule) => rule.target).sort()).toEqual(["app", "left", "prepare", "right", "shared"]);
    expect(graph.filter((rule) => rule.target === "shared")).toHaveLength(1);
    expect(target(graph, "shared").prerequisites).toEqual(["source.txt"]);
    expect(hasCircularDependency(graph)).toBe(false);
  });

  test("topological sort puts every dependency before its consumer", async () => {
    const { rules } = await normalized(diamond);
    const sorted = topologicalSort(rules, target(rules, "app"));
    const names = sorted.map((rule) => rule.target);
    expect(names).toHaveLength(5);
    expect(names.at(-1)).toBe("app");
    for (const rule of sorted) {
      for (const preq of [...rule.prerequisites, ...rule.orderOnlyPrerequisites]) {
        if (names.includes(preq)) expect(names.indexOf(preq)).toBeLessThan(names.indexOf(rule.target));
      }
    }
  });

  test("duplicate dependencies do not duplicate graph nodes or sorted rules", async () => {
    const { rules } = await normalized("all: a a a | a b b\na: b b\nb:\n");
    expect(getTargetSubgraph(rules).map((rule) => rule.target).sort()).toEqual(["a", "all", "b"]);
    expect(topologicalSort(rules, rules[0]!).map((rule) => rule.target)).toEqual(["b", "a", "all"]);
  });

  test("empty graph and explicitly missing goals have no reachable rules", () => {
    expect(findDefaultTargetName([])).toBeNull();
    expect(getTargetSubgraph([])).toEqual([]);
    expect(getTargetSubgraph([], null)).toEqual([]);
    expect(getAllSubgraphs([])).toEqual([]);
    expect(hasCircularDependency([])).toBe(false);
  });

  test("default goal remains the first declared target", async () => {
    const { rules } = await normalized("chosen: dependency\nsecond:\ndependency:\nchosen: extra\n");
    expect(findDefaultTargetName(rules)).toBe("chosen");
    expect(getTargetSubgraph(rules).map((rule) => rule.target).sort()).toEqual(["chosen", "dependency"]);
    expect(getTargetSubgraph(rules, "missing")).toEqual([]);
  });

  test("top-level targets exclude normal and order-only dependencies and preserve order", async () => {
    const { rules } = await normalized("second: shared | setup\nfirst: shared\nshared:\nsetup:\nsecond: extra\n");
    expect(findTopLevelTargets(rules)).toEqual(["second", "first"]);
    expect(getAllSubgraphs(rules).map((graph) => graph.map((rule) => rule.target).sort()))
      .toEqual([["second", "setup", "shared"], ["first", "shared"]]);
  });

  test.each([
    ["self-edge", "a: a\n"],
    ["two-node cycle", "a: b\nb: a\n"],
    ["long cycle", "a: b\nb: c\nc: d\nd: a\n"],
    ["order-only cycle", "a: | b\nb: | a\n"],
    ["mixed-edge cycle", "a: b\nb: | a\n"],
  ])("detects %s and rejects sorting/subgraph extraction", async (_name, source) => {
    const { rules } = await normalized(source);
    expect(hasCircularDependency(rules)).toBe(true);
    expect(() => getTargetSubgraph(rules, "a")).toThrow(expect.objectContaining({ machineCode: MachineCode.CIRCULAR_DEPQ }));
    expect(() => topologicalSort(rules, rules[0]!)).toThrow(expect.objectContaining({ machineCode: MachineCode.CIRCULAR_DEPQ }));
  });

  test("an unrelated cycle does not prevent resolving a safe goal", async () => {
    const { rules } = await normalized("safe: leaf\nleaf:\nx: y\ny: x\n");
    expect(hasCircularDependency(rules)).toBe(true);
    expect(getTargetSubgraph(rules, "safe").map((rule) => rule.target)).toEqual(["safe", "leaf"]);
    expect(topologicalSort(rules, rules[0]!).map((rule) => rule.target)).toEqual(["leaf", "safe"]);
  });

  test("double-colon nodes keep every entry and include every entry's dependencies", async () => {
    const { rules } = await normalized("all:: left\nall:: right\nleft:\nright:\n");
    expect(getTargetSubgraph(rules, "all")).toHaveLength(4);
    const sorted = topologicalSort(rules, rules[0]!);
    expect(sorted.map((rule) => rule.target)).toEqual(["left", "right", "all", "all"]);
  });

  test("a long acyclic chain retains every node in prerequisite-first order", async () => {
    const length = 120;
    const source = Array.from({ length }, (_, index) => `n${index}:${index + 1 < length ? ` n${index + 1}` : ""}\n`).join("");
    const { rules } = await normalized(source);
    expect(hasCircularDependency(rules)).toBe(false);
    expect(getTargetSubgraph(rules)).toHaveLength(length);
    expect(topologicalSort(rules, rules[0]!).map((rule) => rule.target))
      .toEqual(Array.from({ length }, (_, index) => `n${length - index - 1}`));
  });

  test("lookup finds the first target rule, all entries, and exact UUID identity", async () => {
    const { rules } = await normalized("all:: first\nall:: second\nother:\n");
    expect(findTargetRule(rules, "all")).toBe(rules[0]);
    expect(findTargetList(rules, "all")).toEqual(rules.slice(0, 2));
    expect(findRuleByUUID(rules, rules[1]!.uuid)).toBe(rules[1]);
    expect(() => findTargetRule(rules, "absent")).toThrow(expect.objectContaining({ machineCode: MachineCode.FILE_NOT_FOUND }));
    expect(() => findTargetList(rules, "absent")).toThrow(expect.objectContaining({ machineCode: MachineCode.FILE_NOT_FOUND }));
    expect(() => findRuleByUUID(rules, "absent")).toThrow("not found");
  });

  test("expanded prerequisite names become graph edges rather than literal references", async () => {
    const { rules } = await normalized("NAMES = left right\nall: $(NAMES)\nleft: shared\nright: shared\nshared:\n");
    expect(topologicalSort(rules, rules[0]!).map((rule) => rule.target)).toEqual(["shared", "left", "right", "all"]);
  });
});
