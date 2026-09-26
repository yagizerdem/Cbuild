import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { topologicalSort } from "@cbuild-backend/depq-graph.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";
import { resolvePreqs } from "@src/cbuild-backend/execution/preq-resolution/preq-resolver.js";
import { createProcessEnv } from "@src/cbuild-backend/execution/create-process-env.js";
import CommandRunner from "@src/cbuild-backend/execution/command-runner.js";
import AutomaticVariableEnv from "@src/cbuild-backend/execution/auto-variable.js";

export class Build {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];
  public constructor(context: Env, explicitRules: NormalRule[]) {
    this.context = context;
    this.explicitRules = explicitRules;
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
    const preqResolutions = resolvePreqs(this.explicitRules, rule).first;

    if (!preqResolutions.some((preq) => preq.meta?.outOfDate)) {
      return;
    }

    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      preqResolutions,
    );
    const automaticEnv = automaticVariableEnv.generate();

    const recipeExpansionEngine = new RecipeExpansionEngine(automaticEnv);
    const valueExpansionEngine = new ValueExpansionEngine(this.context);

    for (const recipeIR of rule.evaluatedRecipeIRs) {
      // expand recipe before executing
      const command: string = recipeIR.exec(recipeExpansionEngine);

      const shellVar = this.context.getVariable("SHELL");
      let shellPath: string | null = null;

      if (shellVar != undefined) {
        shellPath = valueExpansionEngine.expand(shellVar.value);
      }

      // send variables that marked as exported to child processes
      const processEnv = createProcessEnv(this.context, valueExpansionEngine);

      const commandRunner = new CommandRunner({
        command,
        processEnv,
        srcRule: rule,
        context: this.context,
        shellPath,
      });
      commandRunner.runCommandSync();
    }
  }

  public async buildTargetAsync(rule: NormalRule) {
    const preqResolutions = resolvePreqs(this.explicitRules, rule).first;

    if (!preqResolutions.some((preq) => preq.meta?.outOfDate)) {
      return;
    }

    const automaticVariableEnv = new AutomaticVariableEnv(
      rule,
      this.context,
      preqResolutions,
    );
    const automaticEnv = automaticVariableEnv.generate();

    const recipeExpansionEngine = new RecipeExpansionEngine(automaticEnv);
    const valueExpansionEngine = new ValueExpansionEngine(this.context);

    for (const recipeIR of rule.evaluatedRecipeIRs) {
      // expand recipe before executing
      const command: string = recipeIR.exec(recipeExpansionEngine);

      const shellVar = this.context.getVariable("SHELL");
      let shellPath: string | null = null;

      if (shellVar != undefined) {
        shellPath = valueExpansionEngine.expand(shellVar.value);
      }

      // send variables that marked as exported to child processes
      const processEnv = createProcessEnv(this.context, valueExpansionEngine);

      const commandRunner = new CommandRunner({
        command,
        processEnv,
        srcRule: rule,
        context: this.context,
        shellPath,
      });
      await commandRunner.runCommandAsync();
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
