import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { topologicalSort } from "@cbuild-backend/depq-graph.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";
import { ProcessRunner } from "@cbuild-backend/process.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import {
  PreqResolution,
  PreqResolver,
} from "@cbuild-backend/execution/preq-resolver.js";
import {
  isOutOfDateAsync,
  isOutOfDateSync,
} from "@cbuild-backend/execution/out-of-date.js";

export type Pair<T1, T2> = {
  first: T1;
  second: T2;
};

export class Build {
  private readonly context: Env;
  private readonly rulePatterns: NormalRule[];
  public constructor(context: Env, rulePatterns: NormalRule[]) {
    this.context = context;
    this.rulePatterns = rulePatterns;
  }

  public resolvePreqs(
    rule: NormalRule,
  ): Pair<PreqResolution[], PreqResolution[]> {
    const preqResolver = new PreqResolver(
      this.rulePatterns,
      rule.vpathRules ?? [],
    );

    const preqResolutions = rule.prerequisites.map((preq) =>
      preqResolver.resolve(preq),
    );

    const orderOnlyPreqResolutions = rule.orderOnlyPrerequisites.map((preq) =>
      preqResolver.resolve(preq),
    );

    const notFound = [...preqResolutions, ...orderOnlyPreqResolutions].find(
      (resolution) => resolution.origin.type === "not-found",
    );

    if (notFound) {
      throw CbuildException.from({
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.DEPQ_NOT_FOUND,
        message: `cbuild: No rule to make target '${notFound.preqName}', needed by '${rule.target}'. Stop.`,
        column: -1,
        row: -1,
      });
    }

    return {
      first: preqResolutions,
      second: orderOnlyPreqResolutions,
    };
  }

  public async shouldRebuildAsync(rule: NormalRule): Promise<boolean> {
    // resolve preqs
    const preqResolutions = this.resolvePreqs(rule).first;
    return await isOutOfDateAsync(rule, preqResolutions);
  }

  public shouldRebuildSync(rule: NormalRule): boolean {
    // resolve preqs
    const preqResolutions = this.resolvePreqs(rule).first;
    return isOutOfDateSync(rule, preqResolutions);
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

  // sequuential build

  public buildTargetsSequentialSync(
    rules: NormalRule[],
    targetRule: NormalRule,
  ): void {
    // should not have circular dependencies to sort
    const sortedRules = topologicalSort(rules, targetRule);

    for (let i = 0; i < sortedRules.length; i++) {
      const current: NormalRule = sortedRules[i]!;
      this.buildTargetSync(current);
    }
  }

  public async buildTargetsSequentialAsync(
    rules: NormalRule[],
    targetRule: NormalRule,
  ): Promise<void> {
    // should not have circular dependencies to sort
    const sortedRules = topologicalSort(rules, targetRule);

    for (let i = 0; i < sortedRules.length; i++) {
      const current: NormalRule = sortedRules[i]!;
      await this.buildTargetAsync(current);
    }
  }

  public buildTargetSync(rule: NormalRule) {
    if (!this.shouldRebuildSync(rule)) {
      return;
    }

    const recipeExpansionEngine = new RecipeExpansionEngine(this.context);
    const valueExpansionEngine = new ValueExpansionEngine(this.context);

    const processRunner = new ProcessRunner();

    for (const recipeIR of rule.recipeIRS) {
      // expand recipe before executing
      const command: string = recipeIR.exec(recipeExpansionEngine);

      const shellVar = this.context.getVariable("SHELL");
      let shellPath: string | null = null;

      if (shellVar != undefined) {
        shellPath = valueExpansionEngine.expand(shellVar.value);
      }

      // send variables that marked as exported to child processes
      const exportedVariablesEntries = this.context.getExportedVariables();
      const exportedVarsMap: Record<string, string> = {};
      for (const [identifier, exportedVariable] of exportedVariablesEntries) {
        const expandedVariable = valueExpansionEngine.expand(
          exportedVariable.value,
        );
        exportedVarsMap[identifier] = expandedVariable;
      }

      const result =
        shellPath != null
          ? processRunner.runSync(command, {
              shell: {
                executable: shellPath,
                args: [],
              },
              cwd: process.cwd(),
              env: { ...process.env, ...exportedVarsMap },
              output: "capture",
            })
          : processRunner.runSync(command, {
              cwd: process.cwd(),
              env: { ...process.env, ...exportedVarsMap },
              output: "capture",
            });

      if (result.exitCode == null || result.exitCode !== 0) {
        throw CbuildException.from({
          column: -1,
          row: -1,
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.SHELL_COMMAND_FAILED,
          message: `Build failed for target '${rule.target}': ${command}, message : ${result.stderr}`,
        });
      }

      let normalizedStdout: string = result.stdout.trim();

      if (!this.context.settings.silent) {
        console.log(`${command}\n${normalizedStdout}`);
      } else {
        console.log(normalizedStdout);
      }
    }
  }

  public async buildTargetAsync(rule: NormalRule) {
    if (!(await this.shouldRebuildAsync(rule))) {
      return;
    }

    const recipeExpansionEngine = new RecipeExpansionEngine(this.context);
    const valueExpansionEngine = new ValueExpansionEngine(this.context);

    const processRunner = new ProcessRunner();

    for (const recipeIR of rule.recipeIRS) {
      // expand recipe before executing
      const command: string = recipeIR.exec(recipeExpansionEngine);

      const shellVar = this.context.getVariable("SHELL");
      let shellPath: string | null = null;

      if (shellVar != undefined) {
        shellPath = valueExpansionEngine.expand(shellVar.value);
      }

      // send variables that marked as exported to child processes
      const exportedVariablesEntries = this.context.getExportedVariables();
      const exportedVarsMap: Record<string, string> = {};
      for (const [identifier, exportedVariable] of exportedVariablesEntries) {
        const expandedVariable = valueExpansionEngine.expand(
          exportedVariable.value,
        );
        exportedVarsMap[identifier] = expandedVariable;
      }

      const result = await (shellPath != null
        ? processRunner.runAsync(command, {
            shell: {
              executable: shellPath,
              args: [],
            },
            cwd: process.cwd(),
            env: { ...process.env, ...exportedVarsMap },
            output: "capture",
          })
        : processRunner.runAsync(command, {
            cwd: process.cwd(),
            env: { ...process.env, ...exportedVarsMap },
            output: "capture",
          }));

      if (result.exitCode == null || result.exitCode !== 0) {
        throw CbuildException.from({
          column: -1,
          row: -1,
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.SHELL_COMMAND_FAILED,
          message: `Build failed for target '${rule.target}': ${command}, message : ${result.stderr}`,
        });
      }

      let normalizedStdout: string = result.stdout.trim();
      if (normalizedStdout.endsWith("\n")) {
        normalizedStdout = normalizedStdout.substring(
          0,
          normalizedStdout.length - 1,
        );
      }

      if (!this.context.settings.silent) {
        console.log(`${command}\n${normalizedStdout}`);
      } else {
        console.log(normalizedStdout);
      }
    }
  }

  // parallel build

  public async parallelBuildTargetAsync(
    rules: NormalRule[],
    concurrency: number,
  ) {
    if (concurrency <= 0) {
      throw new Error("Concurrency must be greater than 0");
    }

    const targetMap = this.createTargetMap(rules);
    const reverseTargetMap = this.createReverseTargetMap(rules);

    const rulesByUuid = new Map<string, NormalRule>();
    for (const rule of rules) {
      rulesByUuid.set(rule.uuid, rule);
    }

    const targetPreqCount = new Map<string, number>();

    for (const rule of rules) {
      const targetPrerequisites = targetMap.get(rule.uuid) ?? [];
      targetPreqCount.set(
        rule.uuid,
        new Set(targetPrerequisites.map((preqRule) => preqRule.uuid)).size,
      );
    }

    const currentBuilds = new Set<string>();
    const completedBuilds = new Set<string>();
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
      const nextRules = getRulesWithNoPrerequisites();
      for (let i = 0; i < count; i++) {
        const nextRuleUuid = nextRules.pop();
        if (!nextRuleUuid) {
          break;
        }
        nextBuilds.push(nextRuleUuid);
      }
      return nextBuilds;
    };

    const buildRule = async (uuid: string) => {
      const rule = rulesByUuid.get(uuid);
      if (!rule) {
        throw new Error(`Rule with uuid "${uuid}" does not exist`);
      }
      currentBuilds.add(uuid);
      try {
        await this.buildTargetAsync(rule);
        completedBuilds.add(uuid);
        const dependents = reverseTargetMap.get(uuid) ?? [];
        for (const dependent of dependents) {
          const count = targetPreqCount.get(dependent.uuid);
          if (count === undefined) {
            continue;
          }
          targetPreqCount.set(dependent.uuid, Math.max(0, count - 1));
        }
      } finally {
        currentBuilds.delete(uuid);
      }
    };

    while (completedBuilds.size < rules.length) {
      if (currentBuilds.size < concurrency) {
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
        if (completedBuilds.size < rules.length) {
          throw new Error(
            "Build graph is stuck. A circular dependency may exist.",
          );
        }
        break;
      }

      // Wake the scheduler immediately when any build finishes.
      await Promise.race(runningBuilds);
    }
  }
}
