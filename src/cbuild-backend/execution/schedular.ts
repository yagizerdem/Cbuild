import { topologicalSort } from "@cbuild-backend/depq-graph.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Build } from "@cbuild-backend/execution/build.js";
import type { Env } from "@cbuild-backend/env.js";
import { getOsInfo } from "@cbuild-backend/os.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";

export default class Schedular {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];

  public constructor(context: Env, rules: NormalRule[]) {
    this.context = context;
    this.explicitRules = rules;
  }
  // sequuential build

  public sequentialSchedule(targetRule: NormalRule): void {
    const build = new Build(this.context, this.explicitRules);

    // should not have circular dependencies to sort
    const sortedRules = topologicalSort(this.explicitRules, targetRule);

    for (let i = 0; i < sortedRules.length; i++) {
      const current: NormalRule = sortedRules[i]!;
      build.buildTargetSync(current);
    }
  }

  public async sequentialScheduleAsync(targetRule: NormalRule): Promise<void> {
    const build = new Build(this.context, this.explicitRules);

    // should not have circular dependencies to sort
    const sortedRules = topologicalSort(this.explicitRules, targetRule);

    for (let i = 0; i < sortedRules.length; i++) {
      const current: NormalRule = sortedRules[i]!;
      await build.buildTargetAsync(current);
    }
  }

  // parallel build

  public async parallelSchedule() {
    // programmatic exception
    if (this.context.cliOptions.sequential) {
      throw new Error(
        "Cannot perform parallel build when sequential mode is enabled",
      );
    }
    // const osInfo = getOsInfo();
    const concurrency = this.context.cliOptions.jobs ?? 1;

    if (concurrency <= 0) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.UNSUPPORTED,
        message: "cbuild: the '-j' option requires a positive integer argument",
      });
    }

    const build = new Build(this.context, this.explicitRules);

    const targetMap = this.createTargetMap(this.explicitRules);
    const reverseTargetMap = this.createReverseTargetMap(this.explicitRules);

    const rulesByUuid = new Map<string, NormalRule>();
    for (const rule of this.explicitRules) {
      rulesByUuid.set(rule.uuid, rule);
    }

    const targetPreqCount = new Map<string, number>();

    for (const rule of this.explicitRules) {
      const targetPrerequisites = targetMap.get(rule.uuid) ?? [];
      targetPreqCount.set(
        rule.uuid,
        new Set(targetPrerequisites.map((preqRule) => preqRule.uuid)).size,
      );
    }

    const currentBuilds = new Set<string>();
    const completedBuilds = new Set<string>();
    const failedBuilds = new Set<string>();
    const blockedBuilds = new Set<string>();

    const runningBuilds = new Set<Promise<void>>();

    const getRulesWithNoPrerequisites = () => {
      const rulesWithNoPrerequisites: string[] = [];
      for (const [uuid, count] of targetPreqCount.entries()) {
        if (
          count === 0 &&
          !completedBuilds.has(uuid) &&
          !currentBuilds.has(uuid)
        ) {
          rulesWithNoPrerequisites.push(uuid);
        }
      }
      return rulesWithNoPrerequisites;
    };

    const getNextBuilds = (count: number) => {
      const nextBuilds: string[] = [];
      const nextRules = getRulesWithNoPrerequisites().filter(
        (uuid) => !failedBuilds.has(uuid) && !blockedBuilds.has(uuid),
      );
      for (let i = 0; i < count; i++) {
        const nextRuleUuid = nextRules.pop();
        if (!nextRuleUuid) {
          break;
        }
        nextBuilds.push(nextRuleUuid);
      }
      return nextBuilds;
    };

    // recursively block dependents of a failed build
    const blockDependents = (uuid: string) => {
      const dependents = reverseTargetMap.get(uuid) ?? [];

      for (const dependent of dependents) {
        const dependentUuid = dependent.uuid;

        if (
          blockedBuilds.has(dependentUuid) ||
          failedBuilds.has(dependentUuid)
        ) {
          continue;
        }

        blockedBuilds.add(dependentUuid);
        blockDependents(dependentUuid);
      }
    };

    const buildRule = async (uuid: string) => {
      const rule = rulesByUuid.get(uuid);
      if (!rule) {
        throw new Error(`Rule with uuid "${uuid}" does not exist`);
      }
      currentBuilds.add(uuid);
      try {
        await build.buildTargetAsync(rule);
        completedBuilds.add(uuid);
        const dependents = reverseTargetMap.get(uuid) ?? [];
        for (const dependent of dependents) {
          const count = targetPreqCount.get(dependent.uuid);
          if (count === undefined) {
            continue;
          }
          targetPreqCount.set(dependent.uuid, Math.max(0, count - 1));
        }
      } catch (error) {
        if (this.context.cliOptions.keepGoing) {
          failedBuilds.add(uuid);
          blockDependents(uuid);
        } else {
          throw error;
        }
      } finally {
        currentBuilds.delete(uuid);
      }
    };

    while (
      completedBuilds.size + failedBuilds.size + blockedBuilds.size <
      this.explicitRules.length
    ) {
      if (currentBuilds.size < concurrency) {
        if (!this.canStartJob()) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          continue;
        }
        const availableSlots = concurrency - currentBuilds.size;
        const nextBuilds = getNextBuilds(availableSlots);

        for (const uuid of nextBuilds) {
          currentBuilds.add(uuid);
          let buildPromise!: Promise<void>;
          buildPromise = buildRule(uuid).finally(() => {
            runningBuilds.delete(buildPromise);
          });

          runningBuilds.add(buildPromise);
        }
      }

      if (runningBuilds.size === 0) {
        if (
          completedBuilds.size + failedBuilds.size + blockedBuilds.size <
          this.explicitRules.length
        ) {
          throw new Error(
            "cbuild: Build graph is stuck. A circular dependency or malformed cli option may exist.",
          );
        }
        break;
      }

      // Wake the scheduler immediately when any build finishes.
      await Promise.race(runningBuilds);
    }

    if (failedBuilds.size > 0) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.BUILD_FAILED,
        message: "cbuild: Target(s) failed; build incomplete.",
      });
    }
  }

  // maps rule uuid to preq rules
  public createTargetMap(rules: NormalRule[]): Map<string, NormalRule[]> {
    const rulesByTarget = new Map<string, NormalRule[]>();

    // merges rules with same target names into array
    for (const rule of rules) {
      const existing = rulesByTarget.get(rule.target);

      if (existing) {
        existing.push(rule);
      } else {
        rulesByTarget.set(rule.target, [rule]);
      }
    }

    const targetMap = new Map<string, NormalRule[]>();

    for (const rule of rules) {
      const dependencies: NormalRule[] = [];

      for (const prerequisite of [
        ...rule.prerequisites,
        ...rule.orderOnlyPrerequisites,
      ]) {
        const matches = rulesByTarget.get(prerequisite);

        if (matches) {
          dependencies.push(...matches);
        }
      }

      targetMap.set(rule.uuid, dependencies);
    }

    return targetMap;
  }

  public createReverseTargetMap(
    rules: NormalRule[],
  ): Map<string, NormalRule[]> {
    const rulesByTarget = new Map<string, NormalRule[]>();

    // merges rules with same target names into array
    for (const rule of rules) {
      const existing = rulesByTarget.get(rule.target);

      if (existing) {
        existing.push(rule);
      } else {
        rulesByTarget.set(rule.target, [rule]);
      }
    }

    const reverseTargetMap = new Map<string, NormalRule[]>();

    for (const rule of rules) {
      for (const preq of [
        ...rule.prerequisites,
        ...rule.orderOnlyPrerequisites,
      ]) {
        const preqRules = rulesByTarget.get(preq);
        if (!preqRules) continue; // No rule produces this prerequisite; it may be a filesystem or external dependency.

        for (const preqRule of preqRules) {
          const existing = reverseTargetMap.get(preqRule.uuid);
          if (existing) {
            existing.push(rule);
          } else {
            reverseTargetMap.set(preqRule.uuid, [rule]);
          }
        }
      }
    }

    return reverseTargetMap;
  }

  private canStartJob(): boolean {
    const maxLoad = this.context.cliOptions.loadAverage;
    if (maxLoad == null) {
      return true;
    }
    const osInfo = getOsInfo();
    const currentLoad = osInfo.loadAverage[0];
    return currentLoad < maxLoad;
  }
}
