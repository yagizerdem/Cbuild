import { Env } from "@cbuild-backend/env.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Build } from "@cbuild-backend/execution/build.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import {
  createTargetMap,
  createReverseTargetMap,
  RuleUUID,
} from "@cbuild-backend/execution/schedular/data-structure.js";
import { getOsInfo } from "@src/cbuild-backend/os.js";

export default class ParallelScheduler {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];

  // holds uuid of rules in diffent build stages
  private currentBuilds = new Set<RuleUUID>();
  private completedBuilds = new Set<RuleUUID>();
  private failedBuilds = new Set<RuleUUID>();
  private blockedBuilds = new Set<RuleUUID>();

  // holds promises of currently running builds
  private runningBuilds = new Set<Promise<void>>();

  // graph data strucure for tracking target dependencies
  private readonly targetMap: Map<RuleUUID, NormalRule[]>;
  private readonly reverseTargetMap: Map<RuleUUID, NormalRule[]>;
  private targetPreqCount: Map<RuleUUID, number> = new Map<RuleUUID, number>();
  private rulesByUuid: Map<RuleUUID, NormalRule> = new Map<
    RuleUUID,
    NormalRule
  >();

  public constructor(context: Env, rules: NormalRule[]) {
    this.context = context;
    this.explicitRules = rules;

    // holds uuid of rules in diffent build stages
    this.currentBuilds = new Set<string>();
    this.blockedBuilds = new Set<string>();
    this.completedBuilds = new Set<string>();
    this.failedBuilds = new Set<string>();

    this.targetMap = createTargetMap(rules);
    this.reverseTargetMap = createReverseTargetMap(rules);

    this.createTargetPreqCountMap();
    this.createRulesByUuidMap();
  }

  private createTargetPreqCountMap() {
    this.targetPreqCount = new Map<RuleUUID, number>();
    for (const rule of this.explicitRules) {
      const targetPrerequisites = this.targetMap.get(rule.uuid) ?? [];
      this.targetPreqCount.set(
        rule.uuid,
        new Set(targetPrerequisites.map((preqRule) => preqRule.uuid)).size,
      );
    }
  }

  private createRulesByUuidMap() {
    this.rulesByUuid = new Map<string, NormalRule>();
    for (const rule of this.explicitRules) {
      this.rulesByUuid.set(rule.uuid, rule);
    }
  }

  private getNextBuilds(count: number) {
    const nextBuilds: string[] = [];
    const nextRules = this.getRulesWithNoPrerequisites().filter(
      (uuid) =>
        !this.failedBuilds.has(uuid) &&
        !this.blockedBuilds.has(uuid) &&
        !this.completedBuilds.has(uuid) &&
        !this.currentBuilds.has(uuid),
    );
    for (let i = 0; i < count; i++) {
      const nextRuleUuid = nextRules.pop();
      if (!nextRuleUuid) {
        break;
      }
      nextBuilds.push(nextRuleUuid);
    }
    return nextBuilds;
  }

  private getRulesWithNoPrerequisites() {
    const rulesWithNoPrerequisites: string[] = [];
    for (const [uuid, count] of this.targetPreqCount.entries()) {
      if (count === 0) {
        rulesWithNoPrerequisites.push(uuid);
      }
    }
    return rulesWithNoPrerequisites;
  }

  // recursively block dependents of a failed build
  private blockDependents(uuid: string) {
    const dependents = this.reverseTargetMap.get(uuid) ?? [];

    for (const dependent of dependents) {
      const dependentUuid = dependent.uuid;

      if (
        this.blockedBuilds.has(dependentUuid) ||
        this.failedBuilds.has(dependentUuid)
      ) {
        continue;
      }

      this.blockedBuilds.add(dependentUuid);
      this.blockDependents(dependentUuid);
    }
  }

  private async buildRule(uuid: string) {
    const build = new Build(this.context, this.explicitRules);

    const rule = this.rulesByUuid.get(uuid);
    if (!rule) {
      throw new Error(`Rule with uuid "${uuid}" does not exist`);
    }
    this.currentBuilds.add(uuid);
    try {
      await build.buildTargetAsync(rule);
      this.completedBuilds.add(uuid);
      const dependents = this.reverseTargetMap.get(uuid) ?? [];
      for (const dependent of dependents) {
        const count = this.targetPreqCount.get(dependent.uuid);
        if (count === undefined) {
          continue;
        }
        this.targetPreqCount.set(dependent.uuid, Math.max(0, count - 1));
      }
    } catch (error) {
      if (this.context.cliOptions.keepGoing) {
        this.failedBuilds.add(uuid);
        this.blockDependents(uuid);
      } else {
        throw error;
      }
    } finally {
      this.currentBuilds.delete(uuid);
    }
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

  private ensureNotSequential() {
    if (this.context.cliOptions.sequential) {
      // programmatic exception
      throw new Error(
        "Cannot perform parallel build when sequential mode is enabled",
      );
    }
  }

  private throwIfBuildFailed(): void {
    if (this.failedBuilds.size === 0) {
      return;
    }

    throw CbuildException.from({
      column: -1,
      row: -1,
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.BUILD_FAILED,
      message: "cbuild: Target(s) failed; build incomplete.",
    });
  }

  private ensureConcurrencyIsPositiveInteger(concurrency: number) {
    if (concurrency <= 0) {
      throw CbuildException.from({
        column: -1,
        row: -1,
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.UNSUPPORTED,
        message: "cbuild: the '-j' option requires a positive integer argument",
      });
    }
  }

  public async parallelSchedule() {
    this.ensureNotSequential();
    const concurrency = this.context.cliOptions.jobs ?? 1;
    this.ensureConcurrencyIsPositiveInteger(concurrency);

    try {
      if (this.context.cliOptions.printDirectory) {
        console.log(`cbuild: Entering directory '${process.cwd()}'`);
      }

      while (
        this.completedBuilds.size +
          this.failedBuilds.size +
          this.blockedBuilds.size <
        this.explicitRules.length
      ) {
        if (this.currentBuilds.size < concurrency) {
          if (!this.canStartJob()) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            continue;
          }
          const availableSlots = concurrency - this.currentBuilds.size;
          const nextBuilds = this.getNextBuilds(availableSlots);

          for (const uuid of nextBuilds) {
            this.currentBuilds.add(uuid);
            let buildPromise!: Promise<void>;
            buildPromise = this.buildRule(uuid).finally(() => {
              this.runningBuilds.delete(buildPromise);
            });

            this.runningBuilds.add(buildPromise);
          }
        }

        if (this.runningBuilds.size === 0) {
          if (
            this.completedBuilds.size +
              this.failedBuilds.size +
              this.blockedBuilds.size <
            this.explicitRules.length
          ) {
            throw new Error(
              "cbuild: Build graph is stuck. A circular dependency or malformed cli option may exist.",
            );
          }
          break;
        }

        // Wake the scheduler immediately when any build finishes.
        await Promise.race(this.runningBuilds);
      }

      this.throwIfBuildFailed();
    } finally {
      if (this.context.cliOptions.printDirectory) {
        console.log(`cbuild: Leaving directory '${process.cwd()}'`);
      }
    }
  }
}
