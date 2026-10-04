import { afterEach, describe, expect, test } from "vitest";
import { cleanup, automatic, commands, evaluate, expand, fixture } from "./case-support.js";

afterEach(cleanup);

describe("S01-S13 static pattern expansion and isolation", () => {
  test("S01/S02 multiple targets derive independent stems from one target pattern", async () => {
    const { rules } = await evaluate("a.o b.o: %.o: %.c\n");
    expect(rules.map((rule) => [rule.target, rule.prerequisites])).toEqual([["a.o", ["a.c"]], ["b.o", ["b.c"]]]);
  });

  test("S03 empty stem substitutes to an empty string", async () => {
    const { rules } = await evaluate(".o: %.o: %.c | %.stamp\n");
    expect(rules[0]!.target).toBe(".o");
    expect(rules[0]!.prerequisites).toEqual([".c"]);
    expect(rules[0]!.orderOnlyPrerequisites).toEqual([".stamp"]);
  });

  test("S04 target prefix and suffix are stripped when deriving the stem", async () => {
    const { rules } = await evaluate("pre-one.suf pre-two.suf: pre-%.suf: src/%.c\n");
    expect(rules.map((rule) => rule.prerequisites)).toEqual([["src/one.c"], ["src/two.c"]]);
  });

  test("S05 nonmatching static targets are omitted under the current CBuild contract", async () => {
    const { rules } = await evaluate("a.o README b.h: %.o: %.c\n");
    expect(rules.map((rule) => rule.target)).toEqual(["a.o"]);
  });

  test("S06/S07 multiple patterns share a stem and literal prerequisites remain unchanged", async () => {
    const { rules } = await evaluate("a.o: %.o: src/%.c headers/%.h config.h\n");
    expect(rules[0]!.prerequisites).toEqual(["src/a.c", "headers/a.h", "config.h"]);
  });

  test("S08 order-only prerequisite patterns receive stem substitution", async () => {
    const { rules } = await evaluate("a.o b.o: %.o: %.c | cache/%.stamp prepare\n");
    expect(rules.map((rule) => rule.orderOnlyPrerequisites)).toEqual([["cache/a.stamp", "prepare"], ["cache/b.stamp", "prepare"]]);
  });

  test("S09 expanded target lists split into separate targets", async () => {
    const { rules } = await evaluate("OBJECTS = a.o b.o\n$(OBJECTS): %.o: %.c\n");
    expect(rules.map((rule) => rule.target)).toEqual(["a.o", "b.o"]);
  });

  test("S10 expanded prerequisite lists split before substitution", async () => {
    const { rules } = await evaluate("INPUTS = %.c common.h\na.o: %.o: $(INPUTS)\n");
    expect(rules[0]!.prerequisites).toEqual(["a.c", "common.h"]);
  });

  test("expanded order-only lists also split before substitution", async () => {
    const { rules } = await evaluate("ORDER = cache/%.stamp prepare\na.o: %.o: %.c | $(ORDER)\n");
    expect(rules[0]!.orderOnlyPrerequisites).toEqual(["cache/a.stamp", "prepare"]);
  });

  test("S11/S12 target models own separate recipe and prerequisite arrays", async () => {
    const { rules, env } = await evaluate("a.o b.o: %.o: %.c | %.stamp\n\techo compile\n");
    const [first, second] = rules;
    expect(first!.recipeIRs).not.toBe(second!.recipeIRs);
    expect(first!.evaluatedRecipeIRs).not.toBe(second!.evaluatedRecipeIRs);
    expect(first!.prerequisites).not.toBe(second!.prerequisites);
    expect(first!.orderOnlyPrerequisites).not.toBe(second!.orderOnlyPrerequisites);
    first!.recipeIRs.pop();
    first!.evaluatedRecipeIRs.pop();
    first!.prerequisites.push("extra");
    first!.orderOnlyPrerequisites.push("extra-stamp");
    expect(commands(second!, env)).toEqual(["echo compile"]);
    expect(second!.prerequisites).toEqual(["b.c"]);
    expect(second!.orderOnlyPrerequisites).toEqual(["b.stamp"]);
  });

  test("S13 static-rule automatic target and first source names use the concrete target", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("src/a.c");
    disk.write("src/b.c");
    const { rules, env } = await evaluate("a.o b.o: %.o: src/%.c\n\techo $(@) $(<)\n");
    expect(rules.map((rule) => commands(rule, automatic(rules, rule, env).scope)))
      .toEqual([["echo a.o src/a.c"], ["echo b.o src/b.c"]]);
  });

  test("S13 current limitation: static-rule star automatic variable is unsupported", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("a.c");
    const { rules, env } = await evaluate("a.o: %.o: %.c\n");
    const { scope } = automatic(rules, rules[0]!, env);
    expect(scope.hasVariable("*")).toBe(false);
    expect(expand("$(*)", scope)).toBe("");
  });
});
