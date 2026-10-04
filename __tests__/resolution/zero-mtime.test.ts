import { afterEach, describe, expect, test, vi } from "vitest";
import * as files from "@src/file-utils.js";
import { OutOfDateChecker } from "@src/cbuild-backend/execution/preq-resolution/out-of-date.js";
import type {
  PreqResolution,
  TargetResolution,
} from "@src/cbuild-backend/execution/preq-resolution/type.js";
import { cleanup, environment, fixture } from "./support.js";

afterEach(cleanup);

const cases = [
  {
    label: "equal zero timestamps are current",
    targetTime: 0n,
    preqTime: 0n,
    stale: false,
  },
  {
    label: "zero prerequisite is older than a positive target",
    targetTime: 1n,
    preqTime: 0n,
    stale: false,
  },
  {
    label: "positive prerequisite is newer than a zero target",
    targetTime: 0n,
    preqTime: 1n,
    stale: true,
  },
  {
    label: "equal positive timestamps are current (control)",
    targetTime: 1n,
    preqTime: 1n,
    stale: false,
  },
  {
    label: "unknown target timestamp is stale",
    targetTime: undefined,
    preqTime: 0n,
    stale: true,
  },
  {
    label: "unknown prerequisite timestamp is stale",
    targetTime: 1n,
    preqTime: undefined,
    stale: true,
  },
];

for (const mode of ["sync", "async"] as const) {
  describe(`${mode} nanosecond freshness contracts`, () => {
    test.each(cases)("$label", async ({ targetTime, preqTime, stale }) => {
      const disk = fixture();
      const targetPath = disk.write("app.o");
      const preqPath = disk.write("app.c");
      const timestamps = new Map<string, bigint | undefined>([
        [targetPath, targetTime],
        [preqPath, preqTime],
      ]);
      // Keep existence checks real; inject only exact nanosecond timestamps.
      const timestamp =
        mode === "sync"
          ? vi
              .spyOn(files, "getModifiedTimeNs")
              .mockImplementation((name) => timestamps.get(name))
          : vi
              .spyOn(files, "getModifiedTimeNsAsync")
              .mockImplementation(async (name) => timestamps.get(name));
      const resolvedTarget: TargetResolution = {
        targetName: "app.o",
        vpathRules: [],
        origin: { type: "absolute", absolutePath: targetPath },
      };
      const prerequisite: PreqResolution = {
        preqName: "app.c",
        vpathRules: [],
        origin: { type: "absolute", absolutePath: preqPath },
      };
      const checker = new OutOfDateChecker(environment());
      const preqs = [prerequisite];
      const direct =
        mode === "sync"
          ? checker.isOutOfDateSync(resolvedTarget, prerequisite)
          : await checker.isOutOfDateAsync(resolvedTarget, prerequisite);
      const result =
        mode === "sync"
          ? checker.resolveOutOfDateSync(resolvedTarget, preqs)
          : await checker.resolveOutOfDateAsync(resolvedTarget, preqs);
      expect.soft(direct).toBe(stale);
      expect.soft(result.isTargetOutOfDate).toBe(stale);
      expect.soft(result.outOfDatePreqs).toEqual(stale ? [prerequisite] : []);
      expect(result.resolvedTarget).toBe(resolvedTarget);
      expect(result.resolvedPreqs).toBe(preqs);
      expect(timestamp).toHaveBeenCalledWith(targetPath);
      if (targetTime !== undefined && targetTime !== 0n)
        expect(timestamp).toHaveBeenCalledWith(preqPath);
    });

    test("existing target with zero timestamp and no prerequisites is current", async () => {
      const disk = fixture();
      const absolutePath = disk.write("leaf");
      if (mode === "sync")
        vi.spyOn(files, "getModifiedTimeNs").mockReturnValue(0n);
      else vi.spyOn(files, "getModifiedTimeNsAsync").mockResolvedValue(0n);
      const resolved: TargetResolution = {
        targetName: "leaf",
        vpathRules: [],
        origin: { type: "absolute", absolutePath },
      };
      const checker = new OutOfDateChecker(environment());
      expect(
        mode === "sync"
          ? checker.isOutOfDateSync(resolved, [])
          : await checker.isOutOfDateAsync(resolved, []),
      ).toBe(false);
    });
  });
}
