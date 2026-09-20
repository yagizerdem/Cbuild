import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import {
  fileExistbyAbsolutePath,
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNs,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@src/file-utils.js";
import { topologicalSort } from "@cbuild-backend/depq-graph.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Env } from "@cbuild-backend/env.js";
import { ProcessRunner } from "@cbuild-backend/process.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { PreqResolver } from "./preq-resolver.js";

export class Build {
  private readonly context: Env;
  private readonly rulePatterns: NormalRule[];
  public constructor(context: Env, rulePatterns: NormalRule[]) {
    this.context = context;
    this.rulePatterns = rulePatterns;
  }

  public async shouldRebuildAsync(
    rule: NormalRule,
    baseDir: string,
  ): Promise<boolean> {
    const targetEntryPath: string = resolveAndGetAbsolutePath(
      baseDir,
      rule.target,
    );

    // resolve preqs
    const preqResolver = new PreqResolver(
      this.rulePatterns,
      rule.vpathRules ?? [],
    );

    const preqResolutions = rule.prerequisites.map((preq) =>
      preqResolver.resolve(preq),
    );

    const notFound = preqResolutions.find(
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

    if (!(await fileExistbyAbsolutePathAsync(targetEntryPath))) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      await getModifiedTimeNsAsync(targetEntryPath);

    if (!lastModifiedDateOfTarget) return true;

    for (const preq of preqResolutions) {
      if (preq.origin.type === "target-rule") return true;
      const preqAbsolutePath =
        preq.origin.type === "cwd"
          ? preq.origin.absolutePath
          : preq.origin.type === "vpath"
            ? preq.origin.absolutePath
            : preq.origin.type === "absolute"
              ? preq.origin.absolutePath
              : (() => {
                  throw CbuildException.from({
                    errorType: ErrorType.PROCESS,
                    machineCode: MachineCode.DEPQ_NOT_FOUND,
                    message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
                    column: -1,
                    row: -1,
                  });
                })();

      const exist: boolean =
        await fileExistbyAbsolutePathAsync(preqAbsolutePath);
      if (!exist) return true;

      const lastModifiedDateOfPreq: bigint | undefined =
        await getModifiedTimeNsAsync(preqAbsolutePath);

      if (!lastModifiedDateOfPreq) return true;
      if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
    }

    return false;
  }

  public shouldRebuildSync(rule: NormalRule, baseDir: string): boolean {
    const targetEntryPath: string = resolveAndGetAbsolutePath(
      baseDir,
      rule.target,
    );

    // resolve preqs
    const preqResolver = new PreqResolver(
      this.rulePatterns,
      rule.vpathRules ?? [],
    );

    const preqResolutions = rule.prerequisites.map((preq) =>
      preqResolver.resolve(preq),
    );

    const notFound = preqResolutions.find(
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

    if (!fileExistbyAbsolutePath(targetEntryPath)) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      getModifiedTimeNs(targetEntryPath);

    if (!lastModifiedDateOfTarget) return true;

    for (const preq of preqResolutions) {
      if (preq.origin.type === "target-rule") return true;
      const preqAbsolutePath =
        preq.origin.type === "cwd"
          ? preq.origin.absolutePath
          : preq.origin.type === "vpath"
            ? preq.origin.absolutePath
            : preq.origin.type === "absolute"
              ? preq.origin.absolutePath
              : (() => {
                  throw CbuildException.from({
                    errorType: ErrorType.PROCESS,
                    machineCode: MachineCode.DEPQ_NOT_FOUND,
                    message: `cbuild: No rule to make target '${preq.preqName}', needed by '${rule.target}'. Stop.`,
                    column: -1,
                    row: -1,
                  });
                })();

      const exist: boolean = fileExistbyAbsolutePath(preqAbsolutePath);
      if (!exist) return true;

      const lastModifiedDateOfPreq: bigint | undefined =
        getModifiedTimeNs(preqAbsolutePath);

      if (!lastModifiedDateOfPreq) return true;
      if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
    }

    return false;
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

      for (const prerequisite of rule.prerequisites) {
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
      for (const preq of rule.prerequisites) {
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
    if (!this.shouldRebuildSync(rule, process.cwd())) {
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
    if (!(await this.shouldRebuildAsync(rule, process.cwd()))) {
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
