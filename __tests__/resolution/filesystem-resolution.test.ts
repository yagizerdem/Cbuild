import { afterEach, describe, expect, test } from "vitest";
import { PreqResolver, resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { TargetResolver, resolveTarget } from "@src/cbuild-backend/execution/preq-resolution/target-resolver.js";
import { VpathRule } from "@src/cbuild-backend/model.js";
import { ErrorType, MachineCode } from "@src/cbuild-exception.js";
import { cleanupFixtures, evaluate, fixture, target } from "./helpers.js";

afterEach(cleanupFixtures);

describe.each(["target", "prerequisite"] as const)("%s disk lookup", (kind) => {
  function resolver(vpaths: VpathRule[] = []) {
    return kind === "target" ? new TargetResolver([], vpaths) : new PreqResolver([], vpaths);
  }

  test("existing absolute path resolves with its original name", () => {
    const disk = fixture();
    const absolute = disk.write("nested/input.txt");
    const result = resolver().resolve(absolute);
    expect(result.origin).toEqual({ type: "absolute", absolutePath: absolute });
    expect(kind === "target" ? (result as ReturnType<TargetResolver["resolve"]>).targetName : (result as ReturnType<PreqResolver["resolve"]>).preqName).toBe(absolute);
  });

  test("missing absolute path does not fall back to vpath", () => {
    const disk = fixture();
    expect(resolver([new VpathRule("%", [disk.root])]).resolve(disk.path("missing")).origin).toEqual({ type: "not-found" });
  });

  test("existing relative path resolves from cwd", () => {
    const disk = fixture();
    disk.useAsCwd();
    const absolute = disk.write("nested/input.txt");
    expect(resolver().resolve("nested/input.txt").origin).toEqual({ type: "cwd", absolutePath: absolute });
  });

  test("cwd takes precedence over matching vpath files", () => {
    const disk = fixture();
    disk.useAsCwd();
    const local = disk.write("input.c");
    disk.write("sources/input.c");
    expect(resolver([new VpathRule("%.c", [disk.path("sources")])]).resolve("input.c").origin)
      .toEqual({ type: "cwd", absolutePath: local });
  });

  test("matching vpath selects the first directory containing the file", () => {
    const disk = fixture();
    disk.useAsCwd();
    const found = disk.write("second/input.c");
    disk.write("third/input.c");
    const vpaths = [new VpathRule("%.c", [disk.path("first"), disk.path("second"), disk.path("third")])];
    const result = resolver(vpaths).resolve("input.c");
    expect(result.origin).toEqual({ type: "vpath", absolutePath: found });
    expect(result.vpathRules).toBe(vpaths);
  });

  test("nonmatching vpath patterns are skipped even when the file exists there", () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("wrong/input.c");
    const found = disk.write("correct/input.c");
    expect(resolver([new VpathRule("%.h", [disk.path("wrong")]), new VpathRule("%.c", [disk.path("correct")])]).resolve("input.c").origin)
      .toEqual({ type: "vpath", absolutePath: found });
  });

  test("vpath declarations are searched in declaration order", () => {
    const disk = fixture();
    disk.useAsCwd();
    const first = disk.write("first/input.c");
    disk.write("second/input.c");
    expect(resolver([new VpathRule("%", [disk.path("first")]), new VpathRule("%.c", [disk.path("second")])]).resolve("input.c").origin)
      .toEqual({ type: "vpath", absolutePath: first });
  });

  test("missing relative input reports not-found", () => {
    const disk = fixture();
    disk.useAsCwd();
    expect(resolver().resolve("missing.c").origin).toEqual({ type: "not-found" });
  });

  test("paths containing spaces and Unicode resolve without word splitting", () => {
    const disk = fixture();
    disk.useAsCwd();
    const absolute = disk.write("space dir/öğe.c");
    expect(resolver().resolve("space dir/öğe.c").origin).toEqual({ type: "cwd", absolutePath: absolute });
  });

  test("relative dot segments are normalized in the absolute result", () => {
    const disk = fixture();
    disk.useAsCwd();
    const absolute = disk.write("nested/input.c");
    expect(resolver().resolve("./nested/../nested/input.c").origin).toEqual({ type: "cwd", absolutePath: absolute });
  });
});

describe("rule inputs and lookup wrappers", () => {
  test("a missing file with an exact declared target is a target-rule prerequisite", async () => {
    const disk = fixture();
    disk.useAsCwd();
    const { rules } = await evaluate("all: generated\ngenerated:\n");
    expect(new PreqResolver(rules, []).resolve("generated").origin).toEqual({ type: "target-rule" });
    expect(new TargetResolver(rules, []).resolve("generated").origin).toEqual({ type: "not-found" });
  });

  test("an existing file takes precedence over a declared prerequisite target", async () => {
    const disk = fixture();
    disk.useAsCwd();
    const absolute = disk.write("generated");
    const { rules } = await evaluate("generated:\n");
    expect(new PreqResolver(rules, []).resolve("generated").origin).toEqual({ type: "cwd", absolutePath: absolute });
  });

  test("literal target lookup does not treat percent characters as implicit patterns", async () => {
    const disk = fixture();
    disk.useAsCwd();
    const { rules } = await evaluate("all:\n");
    expect(new PreqResolver(rules, []).resolve("app.o").origin.type).toBe("not-found");
  });

  test("resolvePreqs preserves normal/order-only order, duplicates and distinct origins", async () => {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("local.c");
    disk.write("sources/remote.c");
    const { rules, env } = await evaluate("vpath %.c sources\nall: local.c remote.c generated local.c | cache stamp cache\ngenerated:\ncache:\nstamp:\n");
    const result = resolvePreqs(rules, target(rules, "all"), env);
    expect(result.first.map((preq) => [preq.preqName, preq.origin.type]))
      .toEqual([["local.c", "cwd"], ["remote.c", "vpath"], ["generated", "target-rule"], ["local.c", "cwd"]]);
    expect(result.second.map((preq) => preq.preqName)).toEqual(["cache", "stamp", "cache"]);
    expect(result.second.every((preq) => preq.origin.type === "target-rule")).toBe(true);
  });

  test.each(["all: missing\n", "all: | missing\n"])("resolvePreqs rejects missing normal or order-only prerequisites", async (source) => {
    const disk = fixture();
    disk.useAsCwd();
    const { rules, env } = await evaluate(source);
    expect(() => resolvePreqs(rules, rules[0]!, env)).toThrow(expect.objectContaining({
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.DEPQ_NOT_FOUND,
      message: expect.stringContaining("'missing', needed by 'all'"),
    }));
  });

  test("resolvePreqs returns separate empty lists for a leaf rule", async () => {
    const { rules, env } = await evaluate("leaf:\n");
    expect(resolvePreqs(rules, rules[0]!, env)).toEqual({ first: [], second: [] });
  });

  test("resolveTarget uses the rule's captured vpath configuration", async () => {
    const disk = fixture();
    disk.useAsCwd();
    const absolute = disk.write("objects/app.o");
    const { rules, env } = await evaluate("vpath %.o objects\napp.o:\n");
    expect(resolveTarget(rules, rules[0]!, env).origin).toEqual({ type: "vpath", absolutePath: absolute });
  });

  test("clearing a vpath pattern removes it only from subsequent rule resolution", async () => {
    const { rules } = await evaluate("vpath %.c sources\nfirst: a.c\nvpath %.c\nsecond: a.c\n");
    expect(rules[0]!.vpathRules.map((rule) => rule.pattern)).toEqual(["%.c"]);
    expect(rules[1]!.vpathRules).toEqual([]);
  });

  test("clear-all resets vpath configuration", async () => {
    const { rules } = await evaluate("vpath %.c sources\nvpath %.h headers\nvpath\nall:\n");
    expect(rules[0]!.vpathRules).toEqual([]);
  });
});
