import { afterEach, describe, expect, test, vi } from "vitest";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { MachineCode } from "@src/cbuild-exception.js";
import { findDefaultTargetName, getTargetSubgraph } from "@src/cbuild-backend/depq-graph.js";
import { cleanup, environment, evaluate, expand, fixture, target } from "./case-support.js";

afterEach(cleanup);

describe("I01-I05 repeated and nested include", () => {
  test("I01 repeated include is evaluated twice in source order, without deduplication", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("repeat.mk", "VISITS += included\nrepeated: input\n");
    const { env, rules } = await evaluate("VISITS = start\ninclude repeat.mk\nVISITS += between\ninclude repeat.mk\n");
    expect(expand("$(VISITS)", env)).toBe("start included between included");
    expect(rules.map((rule) => rule.target)).toEqual(["repeated", "repeated"]);
    expect(rules[0]!.uuid).not.toBe(rules[1]!.uuid);
  });

  test("I02/I03/I04 main -> a.mk -> b.mk shares assignments and adds each rule once", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("a.mk", "VISITS += a-before\na-before:\ninclude b.mk\nVISITS += a-after\na-after:\n");
    disk.write("b.mk", "VISITS += b\nINNER := visible\nb:\n");
    const { env, rules } = await evaluate("VISITS = main\nmain-before:\ninclude a.mk\nRESULT := $(INNER)\nmain-after:\n");
    expect(expand("$(VISITS)", env)).toBe("main a-before b a-after");
    expect(env.requireRawVariable("RESULT")).toBe("visible");
    expect(rules.map((rule) => rule.target)).toEqual(["main-before", "a-before", "b", "a-after", "main-after"]);
  });

  test("I05 nested include vpath is active for subsequent main-file rules", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("a.mk", "include b.mk\n");
    disk.write("b.mk", "vpath %.c sources\n");
    const { state, rules } = await evaluate("include a.mk\nfollowing: input.c\n");
    expect(state.vpaths.map((rule) => [rule.pattern, rule.dirs])).toEqual([["%.c", ["sources"]]]);
    expect(rules[0]!.vpathRules.map((rule) => rule.pattern)).toEqual(["%.c"]);
  });
});

describe("I06/I07 include cycle rejection with a finite read guard", () => {
  // The guard is only a fail-fast bound, not a replacement cycle implementation.
  // A passing test requires the production evaluator to reject before revisiting
  // an included file. A guard error is explicitly considered a test failure.
  test.each([
    { label: "I06 mutual include cycle", a: "include b.mk\n", b: "include a.mk\n" },
    { label: "I07 self include cycle", a: "include a.mk\n", b: "UNUSED = unused\n" },
  ])("$label rejects with a cycle diagnostic before repeated reads", async ({ a, b }) => {
    const disk = fixture();
    disk.cwd();
    disk.write("a.mk", a);
    disk.write("b.mk", b);
    const seen = new Set<string>();
    const guardError = new Error("TEST_READ_GUARD: evaluator revisited an active include without detecting a cycle");
    const read = fsPromises.readFile.bind(fsPromises);
    vi.spyOn(fsPromises, "readFile").mockImplementation((async (...args: Parameters<typeof fsPromises.readFile>) => {
      const filename = path.resolve(String(args[0]));
      if (filename.startsWith(disk.root)) {
        if (seen.has(filename)) throw guardError;
        seen.add(filename);
      }
      return read(...args);
    }) as typeof fsPromises.readFile);
    let caught: unknown;
    try { await evaluate("include a.mk\n"); } catch (error) { caught = error; }
    expect(caught, "The test read guard must not be the mechanism rejecting the cycle").not.toBe(guardError);
    expect(caught).toBeInstanceOf(Error);
    expect((caught as Error).message).toMatch(/cycle|circular|recursive.*include/i);
  });
});

describe("I08-I15 include path ordering, missing files and search precedence", () => {
  test("I08 multiple paths in one directive preserve source order", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("first.mk", "VISITS += first\nfirst:\n");
    disk.write("second.mk", "VISITS += second\nsecond:\n");
    const { env, rules } = await evaluate("include first.mk second.mk\n");
    expect(expand("$(VISITS)", env)).toBe("first second");
    expect(rules.map((rule) => rule.target)).toEqual(["first", "second"]);
  });

  test("I09 mandatory include rejects the second missing path after evaluating the first", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("first.mk", "FIRST := loaded\n");
    const env = environment();
    await expect(evaluate("include first.mk missing.mk\nAFTER := unreachable\n", env)).rejects.toMatchObject({ machineCode: MachineCode.INCLUDE_FILE_NOT_FOUND });
    expect(env.requireRawVariable("FIRST")).toBe("loaded");
    expect(env.hasVariable("AFTER")).toBe(false);
  });

  test.each(["-include", "sinclude"])("I10 %s evaluates existing files among missing paths", async (directive) => {
    const disk = fixture();
    disk.cwd();
    disk.write("first.mk", "VISITS += first\nfirst:\n");
    disk.write("last.mk", "VISITS += last\nlast:\n");
    const { env, rules } = await evaluate(`${directive} missing-before.mk first.mk missing-middle.mk last.mk missing-after.mk\n`);
    expect(expand("$(VISITS)", env)).toBe("first last");
    expect(rules.map((rule) => rule.target)).toEqual(["first", "last"]);
  });

  test("I11 cwd takes precedence over includeDir", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("same.mk", "CHOSEN := cwd\n");
    disk.write("includes/same.mk", "CHOSEN := includeDir\n");
    const { env } = await evaluate("include same.mk\n", environment({ includeDir: ["includes"] }));
    expect(env.requireRawVariable("CHOSEN")).toBe("cwd");
  });

  test.each([["first", "second"], ["second", "first"]])("I12 includeDir order %s then %s", async (first, second) => {
    const disk = fixture();
    disk.cwd();
    disk.write("first/same.mk", "CHOSEN := first\n");
    disk.write("second/same.mk", "CHOSEN := second\n");
    const { env } = await evaluate("include same.mk\n", environment({ includeDir: ["absent", first, second] }));
    expect(env.requireRawVariable("CHOSEN")).toBe(first);
  });

  test("I13 variable and nested function expansion produces multiple include filenames", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("first.mk", "VISITS += first\n");
    disk.write("second.mk", "VISITS += second\n");
    const { env } = await evaluate("NAMES = first second\nFILES = $(addsuffix .mk,$(strip $(NAMES)))\ninclude $(FILES)\n");
    expect(expand("$(VISITS)", env)).toBe("first second");
  });

  test("I14/I15 included file metadata has the basename and cwd-relative path", async () => {
    const disk = fixture();
    disk.cwd();
    const absolutePath = disk.write("includes/settings.mk", "included:\n");
    const { rules } = await evaluate("include settings.mk\n", environment({ includeDir: ["includes"] }));
    const metadata = rules[0]!.ruleIR.buildFileMeta;
    expect(metadata).toMatchObject({ name: "settings.mk", relativePath: path.join("includes", "settings.mk"), absolutePath });
  });

  test("I16 nested metadata never inherits the parent file's identity", async () => {
    const disk = fixture();
    disk.cwd();
    const outer = disk.write("a.mk", "outer:\ninclude nested/b.mk\n");
    const inner = disk.write("nested/b.mk", "inner:\n");
    const { rules } = await evaluate("include a.mk\n");
    expect(target(rules, "outer").ruleIR.buildFileMeta).toMatchObject({ name: "a.mk", absolutePath: outer, relativePath: "a.mk" });
    expect(target(rules, "inner").ruleIR.buildFileMeta).toMatchObject({ name: "b.mk", absolutePath: inner, relativePath: path.join("nested", "b.mk") });
    expect(target(rules, "outer").ruleIR.buildFileMeta).not.toBe(target(rules, "inner").ruleIR.buildFileMeta);
  });

  test("default goal is the first included rule when main declares no earlier target", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("goals.mk", "included: dependency\ndependency:\n");
    const { rules } = await evaluate("SETTING = value\ninclude goals.mk\nmain:\n");
    expect(findDefaultTargetName(rules)).toBe("included");
    expect(getTargetSubgraph(rules).map((rule) => rule.target)).toEqual(["included", "dependency"]);
  });
});
