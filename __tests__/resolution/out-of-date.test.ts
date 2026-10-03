import { afterEach, describe, expect, test } from "vitest";
import { rmSync } from "node:fs";
import { OutOfDateChecker } from "@src/cbuild-backend/execution/preq-resolution/out-of-date.js";
import { TargetResolver } from "@src/cbuild-backend/execution/preq-resolution/target-resolver.js";
import { PreqResolver } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { MachineCode } from "@src/cbuild-exception.js";
import { cleanupFixtures, environment, evaluate, fixture } from "./helpers.js";

afterEach(cleanupFixtures);
// Whole seconds with a large separation avoid sleeps and filesystem precision races.
const OLD = 1_700_000_000;
const TARGET = OLD + 100;
const NEW = TARGET + 100;

describe.each(["sync", "async"] as const)("out-of-date %s", (mode) => {
  async function setup(sourceTime = OLD) {
    const disk = fixture();
    disk.useAsCwd();
    disk.write("app.o", "output", TARGET);
    disk.write("app.c", "source", sourceTime);
    const env = environment();
    const checker = new OutOfDateChecker(env);
    const targetResolver = new TargetResolver([], []);
    const preqResolver = new PreqResolver([], []);
    const target = targetResolver.resolve("app.o");
    const source = preqResolver.resolve("app.c");
    const check = (preqs = [source]) => mode === "sync"
      ? Promise.resolve().then(() => checker.isOutOfDateSync(target, preqs))
      : checker.isOutOfDateAsync(target, preqs);
    const resolve = (preqs = [source]) => mode === "sync"
      ? Promise.resolve().then(() => checker.resolveOutOfDateSync(target, preqs))
      : checker.resolveOutOfDateAsync(target, preqs);
    return { disk, env, checker, target, source, targetResolver, preqResolver, check, resolve };
  }

  test.each([[OLD, false], [TARGET, false], [NEW, true]])("source mtime %s produces stale=%s", async (mtime, expected) => {
    const { check } = await setup(mtime);
    expect(await check()).toBe(expected);
  });

  test("an existing target with no prerequisites is up to date", async () => {
    const { check, resolve } = await setup();
    expect(await check([])).toBe(false);
    expect((await resolve([])).isTargetOutOfDate).toBe(false);
  });

  test("a deleted target is stale even after an earlier successful resolution", async () => {
    const { disk, check } = await setup();
    rmSync(disk.path("app.o"));
    expect(await check()).toBe(true);
  });

  test("a missing target is stale even when it has no inputs", async () => {
    const { checker, targetResolver } = await setup();
    const target = targetResolver.resolve("missing.o");
    const result = mode === "sync" ? checker.resolveOutOfDateSync(target, []) : await checker.resolveOutOfDateAsync(target, []);
    expect(result).toMatchObject({ isTargetOutOfDate: true, outOfDatePreqs: [] });
  });

  test("a prerequisite disappearing after resolution is an error", async () => {
    const { disk, check } = await setup();
    rmSync(disk.path("app.c"));
    await expect(check()).rejects.toMatchObject({ machineCode: MachineCode.DEPQ_NOT_FOUND });
  });

  test("not-found prerequisite origins reject against an existing target", async () => {
    const { check, preqResolver } = await setup();
    await expect(check([preqResolver.resolve("missing.c")])).rejects.toMatchObject({ machineCode: MachineCode.DEPQ_NOT_FOUND });
  });

  test("a prerequisite with a rule but no file marks the target stale", async () => {
    const { target, checker } = await setup();
    const { rules } = await evaluate("generated:\n");
    const preq = new PreqResolver(rules, []).resolve("generated");
    const result = mode === "sync" ? checker.isOutOfDateSync(target, preq) : await checker.isOutOfDateAsync(target, preq);
    expect(result).toBe(true);
  });

  test.each(["newFile", "assumeNew", "whatIf"] as const)("%s forces an older prerequisite to count as new", async (flag) => {
    const { env, check } = await setup();
    env.cliOptions[flag] = ["app.c"];
    expect(await check()).toBe(true);
  });

  test.each(["oldFile", "assumeOld"] as const)("%s suppresses a newer prerequisite", async (flag) => {
    const { env, check } = await setup(NEW);
    env.cliOptions[flag] = ["app.c"];
    expect(await check()).toBe(false);
  });

  test("unrelated CLI file flags do not change the target's age", async () => {
    const { env, check } = await setup();
    env.cliOptions.newFile = ["unrelated.c"];
    expect(await check()).toBe(false);
  });

  test("assume-old takes precedence when the same input is also assume-new", async () => {
    const { env, check } = await setup(NEW);
    env.cliOptions.oldFile = ["app.c"];
    env.cliOptions.newFile = ["app.c"];
    expect(await check()).toBe(false);
  });

  test("resolution returns only newer inputs and preserves duplicate input order", async () => {
    const { disk, source, preqResolver, resolve, target } = await setup();
    disk.write("new.c", "new", NEW);
    const newer = preqResolver.resolve("new.c");
    const preqs = [source, newer, newer];
    const result = await resolve(preqs);
    expect(result.resolvedTarget).toBe(target);
    expect(result.resolvedPreqs).toBe(preqs);
    expect(result.outOfDatePreqs).toEqual([newer, newer]);
    expect(result.isTargetOutOfDate).toBe(true);
  });

  test("missing target makes every resolved normal prerequisite out of date", async () => {
    const { checker, source, targetResolver } = await setup();
    const target = targetResolver.resolve("missing.o");
    const result = mode === "sync" ? checker.resolveOutOfDateSync(target, [source]) : await checker.resolveOutOfDateAsync(target, [source]);
    expect(result.outOfDatePreqs).toEqual([source]);
  });
});
