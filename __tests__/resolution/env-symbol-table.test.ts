import { describe, expect, test, vi } from "vitest";
import { compareVarPriority, SymbolTableVariable, type VariableOrigin } from "@src/cbuild-backend/env.js";
import { Core } from "@src/cbuild-backend/core.js";
import { environment, expand, value } from "./helpers.js";

describe("symbol table storage and scope", () => {
  test("new tables are empty and independent", () => {
    const first = environment();
    const second = environment();
    first.setRawVariable("A", "first");
    expect(first.variableCount).toBe(1);
    expect(second.variableCount).toBe(0);
    expect([...second.variableEntries()]).toEqual([]);
  });

  test("replacement changes one entry without increasing the symbol count", () => {
    const env = environment();
    env.setRawVariable("A", "old");
    env.setRawVariable("B", "second");
    env.setRawVariable("A", "new", "override", true);
    expect(env.variableCount).toBe(2);
    expect([...env.variableEntries()].map(([name]) => name)).toEqual(["A", "B"]);
    expect(env.requireVariable("A")).toMatchObject({ origin: "override", flavor: "raw", isExported: true });
    expect(env.requireRawVariable("A")).toBe("new");
  });

  test.each(["toString", "constructor", "__proto__", "hasOwnProperty", "0", "A-B", "é"])("stores ordinary symbol %s without prototype collisions", (name) => {
    const env = environment();
    env.setRawVariable(name, "stored");
    expect(env.requireRawVariable(name)).toBe("stored");
    expect(env.variableCount).toBe(1);
  });

  test("variable names are case-sensitive", () => {
    const env = environment();
    env.setRawVariable("FLAGS", "upper");
    env.setRawVariable("flags", "lower");
    expect(expand("$(FLAGS)|$(flags)", env)).toBe("upper|lower");
  });

  test("raw values stay literal while deferred values resolve references", () => {
    const env = environment();
    env.setRawVariable("BASE", "resolved");
    env.setRawVariable("RAW", "$(BASE)");
    env.setDeferredVariable("DEFERRED", value("$(BASE)"));
    expect(expand("$(RAW)|$(DEFERRED)", env)).toBe("$(BASE)|resolved");
    expect(env.getRawVariable("DEFERRED")).toBeNull();
    expect(() => env.requireRawVariable("DEFERRED")).toThrow("Variable has no raw value");
  });

  test("empty values differ from missing symbols", () => {
    const env = environment();
    env.setRawVariable("EMPTY", "");
    expect(env.hasVariable("EMPTY")).toBe(true);
    expect(env.getRawVariableOrDefault("EMPTY", "fallback")).toBe("");
    expect(env.getRawVariableOrDefault("MISSING", "fallback")).toBe("fallback");
  });

  test("local lookup and recursive lookup have different scope", () => {
    const parent = environment();
    parent.setRawVariable("A", "parent");
    const child = environment({}, parent);
    const grandchild = environment({}, child);
    expect(child.hasVariable("A")).toBe(false);
    expect(child.getVariable("A")).toBeUndefined();
    expect(grandchild.hasVariableRecursive("A")).toBe(true);
    expect(grandchild.requireVariableRecursive("A")).toBe(parent.requireVariable("A"));
    expect(child.variableCount).toBe(0);
  });

  test("local shadowing and deletion reveal an unchanged parent symbol", () => {
    const parent = environment();
    parent.setRawVariable("A", "parent");
    const child = environment({}, parent);
    child.setRawVariable("A", "child");
    expect(expand("$(A)", child)).toBe("child");
    expect(expand("$(A)", parent)).toBe("parent");
    expect(child.deleteVariable("A")).toBe(true);
    expect(expand("$(A)", child)).toBe("parent");
  });

  test("empty local value shadows nonempty parent", () => {
    const parent = environment();
    parent.setRawVariable("A", "parent");
    const child = environment({}, parent);
    child.setRawVariable("A", "");
    expect(expand("$(A)", child)).toBe("");
  });

  test("isolated positional scope blocks inherited digits but allows named symbols", () => {
    const parent = environment();
    parent.setRawVariable("1", "parent-arg");
    parent.setRawVariable("12", "parent-arg12");
    parent.setRawVariable("NAMED", "parent-name");
    const child = environment({}, parent);
    child.islatePositionalVariables = true;
    expect(expand("$(1)|$(12)|$(NAMED)", child)).toBe("||parent-name");
    expect(child.hasVariableRecursive("1")).toBe(false);
    child.setRawVariable("1", "local-arg");
    expect(expand("$(1)", child)).toBe("local-arg");
  });

  test("define rejects duplicates while define-if-absent preserves them", () => {
    const env = environment();
    const first = SymbolTableVariable.rawVariable("first");
    env.defineVariable("A", first);
    expect(() => env.defineVariable("A", SymbolTableVariable.rawVariable("second"))).toThrow("already exists");
    expect(env.defineVariableIfAbsent("A", SymbolTableVariable.rawVariable("second"))).toBe(false);
    expect(env.requireVariable("A")).toBe(first);
    expect(env.defineVariableIfAbsent("B", first)).toBe(true);
  });

  test("get-or-create invokes the factory only for missing local entries", () => {
    const env = environment();
    const factory = vi.fn(() => SymbolTableVariable.rawVariable("created"));
    const first = env.getOrCreateVariable("A", factory);
    expect(env.getOrCreateVariable("A", factory)).toBe(first);
    expect(factory).toHaveBeenCalledTimes(1);
  });

  test("replace and update return the documented symbols", () => {
    const env = environment();
    const old = SymbolTableVariable.rawVariable("old");
    const next = SymbolTableVariable.rawVariable("next");
    env.setVariable("A", old);
    expect(env.replaceVariable("A", next)).toBe(old);
    expect(env.updateVariable("A", (current) => SymbolTableVariable.rawVariable(`${current.getRawValue()}!`)).getRawValue()).toBe("next!");
    expect(env.variableCount).toBe(1);
  });

  test("delete/remove/clear affect only the local table", () => {
    const parent = environment();
    parent.setRawVariable("PARENT", "retained");
    const env = environment({}, parent);
    env.setRawVariable("A", "a");
    env.setRawVariable("B", "b");
    expect(env.removeVariable("A").getRawValue()).toBe("a");
    expect(env.deleteVariable("A")).toBe(false);
    env.clearVariables();
    expect(env.variableCount).toBe(0);
    expect(parent.variableCount).toBe(1);
  });

  test("export selection returns only local exported symbols", () => {
    const parent = environment();
    parent.setRawVariable("PARENT", "p", "file", true);
    const env = environment({}, parent);
    env.setRawVariable("A", "a", "file", true);
    env.setRawVariable("B", "b");
    expect([...env.getExportedVariables().keys()]).toEqual(["A"]);
    env.setVariableExported("B", true);
    env.setVariableExported("A", false);
    expect([...env.getExportedVariables().keys()]).toEqual(["B"]);
  });

  test.each(["requireVariable", "requireVariableRecursive", "removeVariable"] as const)("%s rejects a missing symbol without inserting it", (method) => {
    const env = environment();
    expect(() => env[method]("MISSING")).toThrow("Undefined variable");
    expect(env.variableCount).toBe(0);
  });

  test("empty names are rejected without mutating the table", () => {
    const env = environment();
    expect(() => env.setRawVariable("", "value")).toThrow(TypeError);
    expect(env.variableCount).toBe(0);
  });

  test("merging tables replaces collisions and keeps unrelated entries", () => {
    const left = environment();
    const right = environment();
    left.setRawVariable("A", "left");
    left.setRawVariable("B", "retained");
    right.setRawVariable("A", "right", "command-line");
    right.setRawVariable("C", "added");
    left.merge(right);
    expect(expand("$(A)|$(B)|$(C)", left)).toBe("right|retained|added");
    expect(left.requireVariable("A").origin).toBe("command-line");
  });
});

describe("origin priority and input merging", () => {
  const ordered: VariableOrigin[] = ["automatic", "default", "environment", "file", "environment-overridden", "command-line", "override"];
  test.each(ordered.map((origin, index) => ({ origin, index })))("$origin compares correctly against every origin", ({ origin, index }) => {
    for (let other = 0; other < ordered.length; other++) {
      expect(compareVarPriority(origin, ordered[other]!)).toBe(Math.sign(index - other));
    }
  });

  test.each(ordered)("CLI merge respects existing %s origin", (origin) => {
    const env = environment();
    env.setRawVariable("A", "existing", origin);
    new Core(env).mergeCliVars([{ key: "A", value: "cli" }, { key: "NEW", value: "created" }]);
    const protectedOrigin = origin === "command-line" || origin === "override";
    expect(env.requireRawVariable("A")).toBe(protectedOrigin ? "existing" : "cli");
    expect(env.requireVariable("A").origin).toBe(protectedOrigin ? origin : "command-line");
    expect(env.requireRawVariable("NEW")).toBe("created");
  });

  test.each([false, true])("environment merge %s respects file and override origins", (environmentOverrides) => {
    const env = environment({ environmentOverrides });
    env.setRawVariable("FILE", "file", "file");
    env.setRawVariable("OVERRIDE", "override", "override");
    new Core(env).mergeEnvVars([{ key: "FILE", value: "env" }, { key: "OVERRIDE", value: "env" }]);
    expect(env.requireRawVariable("FILE")).toBe(environmentOverrides ? "env" : "file");
    expect(env.requireRawVariable("OVERRIDE")).toBe("override");
  });
});
