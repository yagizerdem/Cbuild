import { afterEach, describe, expect, test, vi } from "vitest";
import * as files from "@src/file-utils.js";
import { getTargetSubgraph, topologicalSort } from "@src/cbuild-backend/depq-graph.js";
import { cleanup, commands, fixture, implicit, target } from "./support.js";

afterEach(cleanup);

describe("failed candidate rollback with shared and order-only intermediates", () => {
  test.each(["absent", "cycle"] as const)("a late %s failure leaves only the successful plan in the graph", async (failure) => {
    const disk = fixture();
    for (const name of ["app.shared-src", "app.dead-src", "app.shared-order-src", "app.dead-order-src", "app.good-src"])
      disk.write(name);
    const realExists = files.fileExistbyAbsolutePath;
    const reads = vi.spyOn(files, "fileExistbyAbsolutePath").mockImplementation(realExists);
    const cyclic = failure === "cycle" ? "%.absent: %.o\n\techo cycle\n" : "";
    const source = "all: app.o\n" +
      // Both alternatives require chaining, so the second cannot win the direct
      // pass before the first candidate's intermediate plans have been explored.
      "%.o: %.shared %.dead | %.shared-order %.dead-order %.absent\n\techo rejected\n" +
      "%.o: %.shared %.good | %.shared-order\n\techo accepted\n" +
      "%.shared: %.shared-src\n\techo shared\n" +
      "%.dead: %.dead-src\n\techo discarded\n" +
      "%.shared-order: %.shared-order-src\n\techo shared-order\n" +
      "%.dead-order: %.dead-order-src\n\techo discarded-order\n" +
      "%.good: %.good-src\n\techo good\n" + cyclic;
    const result = await implicit(source, disk.root);
    const called = reads.mock.calls.map(([filename]) => filename);
    // These files belong to completed intermediate plans in the rejected
    // candidate; checking them proves the rollback path was actually reached.
    expect(called).toContain(disk.path("app.dead-src"));
    expect(called).toContain(disk.path("app.dead-order-src"));
    expect(called).toContain(disk.path("app.absent"));
    const expectedNames = ["all", "app.o", "app.shared", "app.good", "app.shared-order"];
    expect(result.rules.map((rule) => rule.target).sort()).toEqual([...expectedNames].sort());
    const object = target(result.rules, "app.o");
    expect(commands(object, result.env)).toEqual(["echo accepted"]);
    expect(object.prerequisites).toEqual(["app.shared", "app.good"]);
    expect(object.orderOnlyPrerequisites).toEqual(["app.shared-order"]);
    expect(target(result.rules, "app.shared").prerequisites).toEqual(["app.shared-src"]);
    expect(target(result.rules, "app.good").prerequisites).toEqual(["app.good-src"]);
    expect(target(result.rules, "app.shared-order").prerequisites).toEqual(["app.shared-order-src"]);
    expect(new Set(result.rules.map((rule) => rule.uuid)).size).toBe(expectedNames.length);
    const graph = getTargetSubgraph(result.rules, "all");
    expect(graph.map((rule) => rule.target).sort()).toEqual([...expectedNames].sort());
    const order = topologicalSort(graph, target(result.rules, "all")).map((rule) => rule.target);
    for (const name of ["app.shared", "app.good", "app.shared-order"]) {
      expect(order.filter((entry) => entry === name)).toHaveLength(1);
      expect(order.indexOf(name)).toBeLessThan(order.indexOf("app.o"));
    }
    expect(order.at(-1)).toBe("all");
    expect(result.original.map((rule) => rule.target)).toEqual(["all"]);
    expect(result.patterns[0]!.prerequisites).toEqual(["%.shared", "%.dead"]);
    // Repeating resolution on the same resolver also must not accumulate leaks.
    expect(result.resolver.resolve().map((rule) => rule.target).sort()).toEqual([...expectedNames].sort());
  });
});
