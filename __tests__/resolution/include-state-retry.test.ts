import { afterEach, describe, expect, test } from "vitest";
import { MachineCode } from "@src/cbuild-exception.js";
import { cleanup, environment, evaluate, evaluationState, fixture } from "./support.js";

afterEach(cleanup);

describe("include guard cleanup and retries using the identical state", () => {
  test.each(["include", "-include", "sinclude"])(
    "%s propagates evaluation errors, cleans the guard, and permits retry", async (directive) => {
      const disk = fixture();
      disk.cwd();
      disk.write("part.mk", "BROKEN := $(error evaluation-failed)\n");
      const env = environment();
      const state = evaluationState();
      const outer = disk.path("outer.mk");
      state.includeGuard.push(outer);
      const source = `${directive} part.mk\n`;
      await expect(evaluate(source, env, state)).rejects.toMatchObject({ machineCode: MachineCode.ERROR_FN });
      expect(state.includeGuard).toEqual([outer]);
      // Repair only a file created by this test. Reuse both state and environment.
      disk.write("part.mk", "RECOVERED := yes\nrecovered:\n");
      const retried = await evaluate(source, env, state);
      expect(retried.state).toBe(state);
      expect(retried.env).toBe(env);
      expect(state.includeGuard).toEqual([outer]);
      expect(env.requireRawVariable("RECOVERED")).toBe("yes");
      expect(retried.rules.map((rule) => rule.target)).toEqual(["recovered"]);
    },
  );

  test("nested evaluator errors unwind every active include before retry", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("a.mk", "include b.mk\nafter-a:\n");
    disk.write("b.mk", "include c.mk\nafter-b:\n");
    disk.write("c.mk", "FAIL := $(error nested-failure)\n");
    const env = environment();
    const state = evaluationState();
    await expect(evaluate("include a.mk\n", env, state)).rejects.toMatchObject({ machineCode: MachineCode.ERROR_FN });
    expect(state.includeGuard).toEqual([]);
    disk.write("c.mk", "leaf:\n");
    const retried = await evaluate("include a.mk\n", env, state);
    expect(retried.state).toBe(state);
    expect(retried.rules.map((rule) => rule.target)).toEqual(["leaf", "after-b", "after-a"]);
    expect(new Set(retried.rules.map((rule) => rule.uuid)).size).toBe(3);
    expect(state.includeGuard).toEqual([]);
  });

  test("a rejected circular include can be repaired and retried on the same state", async () => {
    const disk = fixture();
    disk.cwd();
    disk.write("a.mk", "include b.mk\n");
    disk.write("b.mk", "include a.mk\n");
    const env = environment();
    const state = evaluationState();
    await expect(evaluate("include a.mk\n", env, state)).rejects.toMatchObject({ machineCode: MachineCode.CIRCULAR_INCLUDE });
    expect(state.includeGuard).toEqual([]);
    disk.write("b.mk", "repaired:\n");
    const retried = await evaluate("include a.mk\n", env, state);
    expect(retried.state).toBe(state);
    expect(retried.rules.map((rule) => rule.target)).toEqual(["repaired"]);
    expect(state.includeGuard).toEqual([]);
  });
});
