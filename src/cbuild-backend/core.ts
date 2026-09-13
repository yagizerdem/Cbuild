import { BaseModel, NormalRule } from "@cbuild-backend/model.js";
import {
  fileExistbyAbsolutePath,
  fileExistbyAbsolutePathAsync,
  getModifiedTimeNs,
  getModifiedTimeNsAsync,
  resolveAndGetAbsolutePath,
} from "@cbuild-backend/file-utils.js";
import { Env } from "@cbuild-backend/env.js";
import { IR } from "@src/compiler/ir.js";
import { isCompatible } from "@cbuild-backend/semantic.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import {
  findDefaultTarget,
  findTarget,
  getTargetSubgraph,
  GraphBuilder,
  hasCircularDependency,
  topologicalSort,
} from "@cbuild-backend/graph-builder.js";
import {
  RecipeExpansionEngine,
  ValueExpansionEngine,
} from "@cbuild-backend/expansion.js";
import { ProcessRunner } from "@cbuild-backend/process.js";

interface RunnerOptions {
  context?: Env;
}

export class Core {
  private context: Env;
  constructor(context: Env) {
    this.context = context;
  }

  public async runAsync(rules: IR[], options?: RunnerOptions) {
    const currentContext =
      options?.context ??
      this.context ??
      (() => {
        throw new Error("No context available");
      })();

    isCompatible(rules);

    const graphBuilder = new GraphBuilder(currentContext);

    // contains type of relations in under single interface. ex. hooks
    const graph: BaseModel[] = await graphBuilder.buildAsync(rules);
    // contains relation only needed for build
    const normalRulesGraph = this.collectNormalRuleModels(graph);

    const target = findDefaultTarget(normalRulesGraph);
    if (!target) {
      throw CbuildException.from({
        errorType: ErrorType.SEMANTIC,
        machineCode: MachineCode.NO_TARGET_FOUND,
        message: "No target found",
        row: -1,
        column: -1,
      });
    }

    const targetRule = findTarget(normalRulesGraph, target);

    // contains only the rules relevant to the target
    const rulesSubGraph = getTargetSubgraph(normalRulesGraph, target);

    const flag = hasCircularDependency(rulesSubGraph);

    if (flag) {
      throw CbuildException.from({
        errorType: ErrorType.SEMANTIC,
        machineCode: MachineCode.CIRCULAR_DEPQ,
        message: "Circular dependency detected",
        row: -1,
        column: -1,
      });
    }

    await this.buildTargetsSequentialAsync(rulesSubGraph, targetRule);
  }

  public collectNormalRuleModels(baseModesl: BaseModel[]): NormalRule[] {
    return baseModesl.filter((model) => model instanceof NormalRule);
  }

  public buildTargetDependencyMap(rules: NormalRule[]): Map<string, string[]> {
    const targetMap = new Map<string, string[]>(); // target -> prerequisites

    rules.forEach((rule) => {
      if (!targetMap.has(rule.target)) {
        targetMap.set(rule.target, []);
      }

      targetMap.get(rule.target)!.push(...rule.prerequisites);
    });

    return targetMap;
  }

  public buildTargetDependencyReverseMap(
    rules: NormalRule[],
  ): Map<string, string[]> {
    const preq = new Set(rules.map((r) => r.target));

    const reverseTargetMap = new Map<string, string[]>(); //  preq -> targets that depend on this prerequisite

    preq.forEach((p) => {
      if (!reverseTargetMap.has(p)) {
        reverseTargetMap.set(p, []);
      }

      reverseTargetMap
        .get(p)!
        .push(
          ...Array.from(
            new Set(
              rules
                .filter((rule) => rule.prerequisites.includes(p))
                .map((r) => r.target),
            ),
          ),
        );
    });

    return reverseTargetMap;
  }

  public async shouldRebuildAsync(
    rule: NormalRule,
    baseDir: string,
  ): Promise<boolean> {
    const targetEntryPath: string = resolveAndGetAbsolutePath(
      baseDir,
      rule.target,
    );

    if (!(await fileExistbyAbsolutePathAsync(targetEntryPath))) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      await getModifiedTimeNsAsync(targetEntryPath);

    if (!lastModifiedDateOfTarget) return true;

    for (const preq of rule.prerequisites) {
      const preqAbsolutePath = resolveAndGetAbsolutePath(baseDir, preq);
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

    if (!fileExistbyAbsolutePath(targetEntryPath)) return true;

    const lastModifiedDateOfTarget: bigint | undefined =
      getModifiedTimeNs(targetEntryPath);

    if (lastModifiedDateOfTarget === undefined) return true;

    for (const preq of rule.prerequisites) {
      const preqAbsolutePath = resolveAndGetAbsolutePath(baseDir, preq);
      const exist: boolean = fileExistbyAbsolutePath(preqAbsolutePath);
      if (!exist) return true;

      const lastModifiedDateOfPreq: bigint | undefined =
        getModifiedTimeNs(preqAbsolutePath);

      if (lastModifiedDateOfPreq === undefined) return true;
      if (lastModifiedDateOfPreq > lastModifiedDateOfTarget) return true;
    }

    return false;
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

      if (shellVar != null) {
        if (!shellVar.isDeferred()) shellPath = shellVar.getRawValue();
        else {
          const defferedValue = shellVar.getDeferredValue();
          if (defferedValue) {
            shellPath = valueExpansionEngine.expand(defferedValue);
          }
        }
      }

      const result =
        shellPath != null
          ? processRunner.runSync(command, {
              shell: {
                executable: shellPath,
                args: [],
              },
              cwd: process.cwd(),
              env: process.env,
              output: "capture",
            })
          : processRunner.runSync(command, {
              cwd: process.cwd(),
              env: process.env,
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

      if (!this.context.setting.silent) {
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

      if (shellVar != null) {
        if (!shellVar.isDeferred()) shellPath = shellVar.getRawValue();
        else {
          const defferedValue = shellVar.getDeferredValue();
          if (defferedValue) {
            shellPath = valueExpansionEngine.expand(defferedValue);
          }
        }
      }

      const result = await (shellPath != null
        ? processRunner.runAsync(command, {
            shell: {
              executable: shellPath,
              args: [],
            },
            cwd: process.cwd(),
            env: process.env,
            output: "capture",
          })
        : processRunner.runAsync(command, {
            cwd: process.cwd(),
            env: process.env,
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

      if (!this.context.setting.silent) {
        console.log(`${command}\n${normalizedStdout}`);
      } else {
        console.log(normalizedStdout);
      }
    }
  }

  // parallel build
}
