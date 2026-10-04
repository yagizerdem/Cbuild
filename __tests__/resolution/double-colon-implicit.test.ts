import { afterEach, describe, expect, test } from "vitest";
import {
  getTargetSubgraph,
  topologicalSort,
} from "@src/cbuild-backend/depq-graph.js";
import { cleanup, commands, fixture, implicit } from "./support.js";

afterEach(cleanup);

describe("double-colon entries receiving implicit recipes independently", () => {
  test.each([false, true])(
    "only the recipe-less entry inherits, recipe entry last=%s",
    async (reverse) => {
      const disk = fixture();
      disk.write("app.c");
      const explicit = "app.o:: explicit.h | explicit-order\n\techo explicit\n";
      const blank = "app.o:: blank.h | blank-order\n";
      const result = await implicit(
        `${reverse ? blank + explicit : explicit + blank}` +
          "explicit.h:\nblank.h:\nexplicit-order:\nblank-order:\nimplicit-order:\n" +
          "%.o: %.c | implicit-order\n\techo implicit\n",
        disk.root,
      );
      const entries = result.rules.filter((rule) => rule.target === "app.o");
      const before = result.original.filter((rule) => rule.target === "app.o");
      expect(entries).toHaveLength(2);
      expect(entries.map((rule) => rule.uuid)).toEqual(
        before.map((rule) => rule.uuid),
      );
      expect(new Set(entries.map((rule) => rule.uuid)).size).toBe(2);
      expect(entries.map((rule) => rule.ruleSeperator)).toEqual(["::", "::"]);
      const recipeEntry = entries[reverse ? 1 : 0]!;
      const inherited = entries[reverse ? 0 : 1]!;
      expect(recipeEntry).toBe(before[reverse ? 1 : 0]);
      expect(commands(recipeEntry, result.env)).toEqual(["echo explicit"]);
      expect(recipeEntry.prerequisites).toEqual(["explicit.h"]);
      expect(recipeEntry.orderOnlyPrerequisites).toEqual(["explicit-order"]);
      expect(commands(inherited, result.env)).toEqual(["echo implicit"]);
      expect(inherited.prerequisites).toEqual(["app.c", "blank.h"]);
      expect(inherited.orderOnlyPrerequisites).toEqual([
        "implicit-order",
        "blank-order",
      ]);
      expect(inherited.stem).toBe("app");
      expect(inherited.ruleIR).toBe(result.patterns[0]!.ruleIR);
      expect(before[reverse ? 0 : 1]!.recipeIRs).toEqual([]);
      expect(before[reverse ? 0 : 1]!.prerequisites).toEqual(["blank.h"]);

      const graph = getTargetSubgraph(result.rules, "app.o");
      expect(
        graph
          .filter((rule) => rule.target === "app.o")
          .map((rule) => rule.uuid)
          .sort(),
      ).toEqual(entries.map((rule) => rule.uuid).sort());
      const order = topologicalSort(graph, entries[0]!);
      for (const entry of entries) {
        for (const input of [
          ...entry.prerequisites,
          ...entry.orderOnlyPrerequisites,
        ]) {
          const node = order.find((rule) => rule.target === input);
          if (node)
            expect(order.indexOf(node)).toBeLessThan(order.indexOf(entry));
        }
      }
    },
  );

  test("two recipe-less siblings inherit separate arrays without touching the explicit sibling or pattern", async () => {
    const disk = fixture();
    disk.write("app.c");
    const result = await implicit(
      "app.o:: first.h | first-order\napp.o:: second.h | second-order\n" +
        "app.o:: explicit.h\n\techo explicit\n" +
        "first.h:\nsecond.h:\nexplicit.h:\nfirst-order:\nsecond-order:\nimplicit-order:\n" +
        "%.o: %.c | implicit-order\n\techo implicit\n",
      disk.root,
    );
    const entries = result.rules.filter((rule) => rule.target === "app.o");
    expect(entries).toHaveLength(3);
    expect(entries.map((rule) => commands(rule, result.env))).toEqual([
      ["echo implicit"],
      ["echo implicit"],
      ["echo explicit"],
    ]);
    expect(entries.map((rule) => rule.prerequisites)).toEqual([
      ["app.c", "first.h"],
      ["app.c", "second.h"],
      ["explicit.h"],
    ]);
    expect(entries.map((rule) => rule.orderOnlyPrerequisites)).toEqual([
      ["implicit-order", "first-order"],
      ["implicit-order", "second-order"],
      [],
    ]);
    expect(entries.map((rule) => rule.uuid)).toEqual(
      result.original
        .filter((rule) => rule.target === "app.o")
        .map((rule) => rule.uuid),
    );
    expect(new Set(entries.map((rule) => rule.uuid)).size).toBe(3);
    const [first, second] = entries;
    for (const key of [
      "prerequisites",
      "orderOnlyPrerequisites",
      "recipeIRs",
      "evaluatedRecipeIRs",
    ] as const)
      expect(first![key]).not.toBe(second![key]);
    first!.prerequisites.push("test-only-marker");
    first!.orderOnlyPrerequisites.push("test-only-order");
    first!.recipeIRs.pop();
    first!.evaluatedRecipeIRs.pop();
    expect(second!.prerequisites).toEqual(["app.c", "second.h"]);
    expect(second!.orderOnlyPrerequisites).toEqual([
      "implicit-order",
      "second-order",
    ]);
    expect(commands(second!, result.env)).toEqual(["echo implicit"]);
    expect(result.patterns[0]!.prerequisites).toEqual(["%.c"]);
    expect(result.patterns[0]!.orderOnlyPrerequisites).toEqual([
      "implicit-order",
    ]);
    expect(result.patterns[0]!.recipeIRs).toHaveLength(1);
    expect(result.patterns[0]!.evaluatedRecipeIRs).toHaveLength(1);
  });
});
