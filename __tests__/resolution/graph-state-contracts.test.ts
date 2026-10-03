import { afterEach, describe, expect, test } from "vitest";
import { findDefaultTargetName, findTargetList, findTargetRule, getTargetSubgraph, hasCircularDependency, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { MachineCode } from "@src/cbuild-exception.js";
import { cleanup, commands, evaluate, fixture, normalized, target } from "./case-support.js";

afterEach(cleanup);

describe("G01-G14 graph and normalization contracts", () => {
  test.each([
    ["G01 self-cycle", "a: a\n"],
    ["G02 two-node cycle", "a: b\nb: a\n"],
    ["G03 order-only cycle", "a: | b\nb: | a\n"],
    ["G04 mixed-edge cycle", "a: b\nb: | a\n"],
  ])("%s is detected in reachable graph and sorting", async (_name, source) => {
    const { rules } = await normalized(source);
    expect(hasCircularDependency(rules)).toBe(true);
    expect(() => getTargetSubgraph(rules, "a")).toThrow(expect.objectContaining({ machineCode: MachineCode.CIRCULAR_DEPQ }));
    expect(() => topologicalSort(rules, rules[0]!)).toThrow(expect.objectContaining({ machineCode: MachineCode.CIRCULAR_DEPQ }));
  });

  test("G05 diamond retains one shared model and puts it before both consumers", async () => {
    const { rules } = await normalized("all: left right\nleft: shared\nright: shared\nshared:\n");
    const graph = getTargetSubgraph(rules, "all");
    expect(graph.map((rule) => rule.target).sort()).toEqual(["all", "left", "right", "shared"]);
    const order = topologicalSort(graph, rules[0]!).map((rule) => rule.target);
    expect(order.filter((name) => name === "shared")).toHaveLength(1);
    expect(order.indexOf("shared")).toBeLessThan(order.indexOf("left"));
    expect(order.indexOf("shared")).toBeLessThan(order.indexOf("right"));
    expect(order.at(-1)).toBe("all");
  });

  test("G06 duplicate normal/order-only edges never duplicate graph nodes", async () => {
    const { rules } = await normalized("all: dep dep | dep dep\ndep:\n");
    expect(getTargetSubgraph(rules, "all").map((rule) => rule.target)).toEqual(["all", "dep"]);
    expect(topologicalSort(rules, rules[0]!).map((rule) => rule.target)).toEqual(["dep", "all"]);
  });

  test("G07 disconnected cycles have no effect on a safe requested goal", async () => {
    const { rules } = await normalized("safe: leaf\nleaf:\nbad: other\nother: bad\n");
    expect(hasCircularDependency(rules)).toBe(true);
    expect(getTargetSubgraph(rules, "safe").map((rule) => rule.target)).toEqual(["safe", "leaf"]);
    expect(topologicalSort(rules, target(rules, "safe")).map((rule) => rule.target)).toEqual(["leaf", "safe"]);
  });

  test("G08 missing goal lookup rejects while subgraph extraction returns an empty graph", async () => {
    const { rules } = await normalized("existing:\n");
    expect(() => findTargetRule(rules, "missing")).toThrow(expect.objectContaining({ machineCode: MachineCode.FILE_NOT_FOUND }));
    expect(getTargetSubgraph(rules, "missing")).toEqual([]);
  });

  test("G09 multiple double-colon models retain identities, inputs and independent recipes", async () => {
    const { rules, env } = await normalized("all:: first\n\techo first\nall:: second\n\techo second\nfirst:\nsecond:\n");
    const entries = findTargetList(rules, "all");
    expect(entries).toHaveLength(2);
    expect(entries[0]!.uuid).not.toBe(entries[1]!.uuid);
    expect(entries.map((rule) => rule.prerequisites)).toEqual([["first"], ["second"]]);
    expect(entries.map((rule) => commands(rule, env))).toEqual([["echo first"], ["echo second"]]);
    expect(getTargetSubgraph(rules, "all")).toHaveLength(4);
    expect(topologicalSort(rules, entries[0]!).map((rule) => rule.target)).toEqual(["first", "second", "all", "all"]);
  });

  test.each(["all: first\nall:: second\n", "all:: first\nall: second\n"])("G10 mixed colon separators reject regardless of declaration order", async (source) => {
    await expect(normalized(source)).rejects.toMatchObject({ machineCode: MachineCode.INVALID_RULE_SEPERATOR });
  });

  test("G11 normalized multi-target models retain independent mutable arrays", async () => {
    const { rules, env } = await normalized("one two: common | cache\n\techo shared\n");
    const [one, two] = rules;
    expect(one!.prerequisites).not.toBe(two!.prerequisites);
    expect(one!.orderOnlyPrerequisites).not.toBe(two!.orderOnlyPrerequisites);
    expect(one!.recipeIRs).not.toBe(two!.recipeIRs);
    expect(one!.evaluatedRecipeIRs).not.toBe(two!.evaluatedRecipeIRs);
    one!.prerequisites.push("extra");
    one!.recipeIRs.pop();
    one!.evaluatedRecipeIRs.pop();
    expect(two!.prerequisites).toEqual(["common"]);
    expect(commands(two!, env)).toEqual(["echo shared"]);
  });

  test("G12 recipe-less duplicate declarations merge inputs in source order", async () => {
    const { rules } = await normalized("all: first | stamp1\nall: second first | stamp2\nall: third\n");
    expect(rules).toHaveLength(1);
    expect(rules[0]!.prerequisites).toEqual(["first", "second", "first", "third"]);
    expect(rules[0]!.orderOnlyPrerequisites).toEqual(["stamp1", "stamp2"]);
    expect(rules[0]!.recipeIRs).toEqual([]);
  });

  test("G13 included file's first target remains the default goal", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("goals.mk", "included:\n");
    const { rules } = await normalized("include goals.mk\nmain:\n");
    expect(findDefaultTargetName(rules)).toBe("included");
  });

  test("G14 conditional and included models enter the graph once, without normalization masking repeats", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("included.mk", "included: leaf\nleaf:\n");
    const { rules } = await evaluate("before:\nifeq (yes,yes)\nconditional: included\ninclude included.mk\nendif\nafter:\n");
    expect(rules.map((rule) => rule.target)).toEqual(["before", "conditional", "included", "leaf", "after"]);
    expect(getTargetSubgraph(rules, "conditional").map((rule) => rule.target)).toEqual(["conditional", "included", "leaf"]);
  });
});
