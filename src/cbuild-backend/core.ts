import {
  BaseModel,
  ImplicitPatterRule,
  NormalRule,
  VpathRule,
} from "@cbuild-backend/model.js";

import {
  compareVarPriority,
  Env,
  SymbolTableVariable,
  VariableOrigin,
} from "@cbuild-backend/env.js";
import { IR } from "@src/compiler/ir.js";
import { isCompatible } from "@cbuild-backend/semantic.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import {
  findDefaultTargetName,
  findTargetRule,
  getTargetSubgraph,
  hasCircularDependency,
} from "@cbuild-backend/depq-graph.js";

import SequentialSchedular from "@cbuild-backend/execution/schedular/sequential-schedular.js";
import ParallelSchedular from "@cbuild-backend/execution/schedular/parallel-scheduler.js";
import BuildFileEvaluator from "@cbuild-backend/evaluator/core/buildfile-evaluator.js";
import { ImplicitRuleResolver } from "@cbuild-backend/implicit-rule-resolver.js";
import { BuildFileEvaluationState } from "@cbuild-backend/evaluator/core/type.js";
import { NormalizeModels } from "@cbuild-backend/normalize-models.js";
import { DatabasePrinter } from "@cbuild-backend/database-printer.js";
import {
  registerBuiltInImplicitRules,
  registerBuiltInImplicitVariables,
} from "@cbuild-backend/built-in.js";
import { BuildFileMeta } from "@src/type/buildfile-meta.js";

export interface CliVar {
  key: string;
  value: string;
}

export interface EnvVar {
  key: string;
  value: string;
}

export interface RunnerOptions {
  context?: Env;
  cliVars?: CliVar[];
  envVars?: EnvVar[];
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

    registerBuiltInImplicitVariables(this.context);

    this.mergeEnvVars(options?.envVars ?? []);
    this.mergeCliVars(options?.cliVars ?? []);

    const evaluationState: BuildFileEvaluationState = {
      resolvedModels: [],
      vpaths: [],
      includeGuard: [],
    };
    const evaluator = new BuildFileEvaluator(
      currentContext,
      rules,
      evaluationState,
    );
    const resolvedModels = await evaluator.evaluateAsync();

    // contains relation only needed for build
    const explicitRules = this.collectNormalRuleModels(resolvedModels);
    const patterns = this.collectImplicitPatternRuleModels(resolvedModels);

    // add seperate resolutino step and normalize rules
    const normalization = new NormalizeModels(explicitRules);
    const normalizedExplicitRules = normalization.normalize();

    if (this.context.cliOptions.printDataBase) {
      const databasePrinter = new DatabasePrinter();
      databasePrinter.print({
        context: this.context,
        explicitRules: normalizedExplicitRules,
        implicitRules: patterns,
        vpaths: normalizedExplicitRules.reduce((acc: VpathRule[], rule) => {
          if (rule.vpathRules) {
            for (const vpathRule of rule.vpathRules) {
              acc.push(vpathRule);
            }
          }
          return acc;
        }, []),
      });

      process.exit(0);
    }

    const targetName = findDefaultTargetName(normalizedExplicitRules);
    if (!targetName) {
      throw CbuildException.from({
        errorType: ErrorType.SEMANTIC,
        machineCode: MachineCode.NO_TARGET_FOUND,
        message: "No target found",
        row: -1,
        column: -1,
      });
    }

    const resolution = new ImplicitRuleResolver(
      normalizedExplicitRules,
      patterns,
      process.cwd(),
    ).resolve();

    // contains only the rules relevant to the target
    const rulesSubGraph = getTargetSubgraph(resolution, targetName);
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

    if (currentContext.cliOptions.sequential) {
      const schedular = new SequentialSchedular(currentContext, rulesSubGraph);
      await schedular.sequentialScheduleAsync(
        findTargetRule(rulesSubGraph, targetName!),
      );
    } else {
      const schedular = new ParallelSchedular(currentContext, rulesSubGraph);
      await schedular.parallelSchedule();
    }
  }

  public collectNormalRuleModels(baseModesl: BaseModel[]): NormalRule[] {
    return baseModesl.filter((model) => model instanceof NormalRule);
  }

  public collectImplicitPatternRuleModels(
    baseModesl: BaseModel[],
  ): ImplicitPatterRule[] {
    return baseModesl.filter((model) => model instanceof ImplicitPatterRule);
  }

  public mergeEnvVars(envVars: EnvVar[]) {
    const envOrigin: Extract<
      VariableOrigin,
      "environment" | "environment-overridden"
    > = this.context.cliOptions.environmentOverrides
      ? "environment-overridden"
      : "environment";

    for (const envVar of envVars) {
      if (this.context.hasVariable(envVar.key)) {
        const symbolTableVar: SymbolTableVariable = this.context.getVariable(
          envVar.key,
        )!;
        if (compareVarPriority(symbolTableVar.origin, envOrigin) < 0) {
          this.context.setRawVariable(envVar.key, envVar.value, envOrigin);
        }
      } else {
        this.context.setRawVariable(envVar.key, envVar.value, envOrigin);
      }
    }
  }

  public mergeCliVars(cliVars: CliVar[]) {
    for (const cliVar of cliVars) {
      if (this.context.hasVariable(cliVar.key)) {
        const symbolTableVar: SymbolTableVariable = this.context.getVariable(
          cliVar.key,
        )!;
        if (compareVarPriority(symbolTableVar.origin, "command-line") < 0) {
          this.context.setRawVariable(cliVar.key, cliVar.value, "command-line");
        }
      } else {
        this.context.setRawVariable(cliVar.key, cliVar.value, "command-line");
      }
    }
  }
}
