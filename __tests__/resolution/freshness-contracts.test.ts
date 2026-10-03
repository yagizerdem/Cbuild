import { afterEach, describe, expect, test } from "vitest";
import { OutOfDateChecker } from "@src/cbuild-backend/execution/preq-resolution/out-of-date.js";
import { cleanup, automatic, evaluate, expand, fixture, NEW, NOW, OLD } from "./case-support.js";

afterEach(cleanup);

describe.each(["sync", "async"] as const)("F01-F11 freshness contracts (%s)", (mode) => {
  async function setup(source: string, files: Record<string, number>) {
    const disk = fixture();
    disk.cwd();
    for (const [name, timestamp] of Object.entries(files)) disk.write(name, name, timestamp);
    const { rules, env } = await evaluate(source);
    const rule = rules[0]!;
    const { resolvedTarget, preqs } = automatic(rules, rule, env);
    const resolve = () => {
      const checker = new OutOfDateChecker(env);
      return mode === "sync" ? Promise.resolve(checker.resolveOutOfDateSync(resolvedTarget, preqs.first)) : checker.resolveOutOfDateAsync(resolvedTarget, preqs.first);
    };
    return { disk, env, rule, rules, preqs, resolvedTarget, resolve };
  }

  test("F01 newer order-only prerequisite is resolved without marking target stale", async () => {
    const { preqs, resolve } = await setup("target: source | stamp\n", { target: NOW, source: OLD, stamp: NEW });
    expect(preqs.second.map((preq) => preq.preqName)).toEqual(["stamp"]);
    expect(await resolve()).toMatchObject({ isTargetOutOfDate: false, outOfDatePreqs: [] });
  });

  test("F02 newer normal prerequisite marks target stale", async () => {
    expect(await (await setup("target: source\n", { target: NOW, source: NEW })).resolve()).toMatchObject({ isTargetOutOfDate: true });
  });

  test("F03/F04 stale duplicate order is preserved in age data and deduplicated in question-mark variable", async () => {
    const { resolve, rules, rule, env } = await setup("target: old a b a b\n", { target: NOW, old: OLD, a: NEW, b: NEW });
    const result = await resolve();
    expect(result.resolvedPreqs.map((preq) => preq.preqName)).toEqual(["old", "a", "b", "a", "b"]);
    expect(result.outOfDatePreqs.map((preq) => preq.preqName)).toEqual(["a", "b", "a", "b"]);
    expect(expand("$(?)", automatic(rules, rule, env).scope)).toBe("a b");
  });

  test("F05 missing target plus existing prerequisite is stale", async () => {
    const result = await (await setup("missing: source\n", { source: OLD })).resolve();
    expect(result.isTargetOutOfDate).toBe(true);
    expect(result.outOfDatePreqs.map((preq) => preq.preqName)).toEqual(["source"]);
  });

  test("F06 missing target with no prerequisite is stale", async () => {
    expect(await (await setup("missing:\n", {})).resolve()).toMatchObject({ isTargetOutOfDate: true, outOfDatePreqs: [] });
  });

  test("F07 existing target with no prerequisite is up to date", async () => {
    expect(await (await setup("target:\n", { target: NOW })).resolve()).toMatchObject({ isTargetOutOfDate: false, outOfDatePreqs: [] });
  });

  test("F08 equal timestamp is not stale", async () => {
    expect(await (await setup("target: source\n", { target: NOW, source: NOW })).resolve()).toMatchObject({ isTargetOutOfDate: false });
  });

  for (const oldFlag of ["oldFile", "assumeOld"] as const) {
    test.each(["newFile", "assumeNew", "whatIf"] as const)(`F09 ${oldFlag} wins over %s for the same file`, async (newFlag) => {
      const { env, resolve } = await setup("target: source\n", { target: NOW, source: NEW });
      env.cliOptions[oldFlag] = ["source"];
      env.cliOptions[newFlag] = ["source"];
      expect(await resolve()).toMatchObject({ isTargetOutOfDate: false, outOfDatePreqs: [] });
    });
  }

  test.each([OLD, NEW])("F10 vpath prerequisite timestamp %s determines freshness", async (mtime) => {
    const { preqs, resolve } = await setup("vpath %.c sources\ntarget: input.c\n", { target: NOW, "sources/input.c": mtime });
    expect(preqs.first[0]!.origin.type).toBe("vpath");
    expect((await resolve()).isTargetOutOfDate).toBe(mtime === NEW);
  });

  test.each([OLD, NEW])("F11 target resolved from vpath uses that target's timestamp %s", async (mtime) => {
    const { resolvedTarget, resolve } = await setup("vpath %.o objects\napp.o: source\n", { "objects/app.o": mtime, source: NOW });
    expect(resolvedTarget.origin.type).toBe("vpath");
    expect((await resolve()).isTargetOutOfDate).toBe(mtime === OLD);
  });
});
