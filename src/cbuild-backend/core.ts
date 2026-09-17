import { BaseModel, NormalRule } from "@cbuild-backend/model.js";

import {
  compareVarPriority,
  Env,
  SymbolTableVariable,
} from "@cbuild-backend/env.js";
import { IR } from "@src/compiler/ir.js";
import { isCompatible } from "@cbuild-backend/semantic.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import {
  filterModelResolverPassIr,
  ModelResolver,
} from "@src/cbuild-backend/model-resolver.js";
import {
  findDefaultTarget,
  findTarget,
  getTargetSubgraph,
  hasCircularDependency,
} from "@cbuild-backend/depq-graph.js";

import { evaluateBuildFile } from "./buildfile-evaluator.js";
import { Build } from "./build.js";

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

    this.mergeEnvVars(options?.envVars ?? []);
    this.mergeCliVars(options?.cliVars ?? []);

    const evaluatedIr = await evaluateBuildFile(rules, currentContext);

    const modelResolver = new ModelResolver(currentContext);

    // contains type of relations in under single interface. ex. hooks
    const graph: BaseModel[] = await modelResolver.buildAsync(
      filterModelResolverPassIr(evaluatedIr),
    );

    // add seperate resolutino step and normalize rules

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

    const builder = new Build(currentContext);
    await builder.parallelBuildTargetAsync(rulesSubGraph, 2);
  }

  public collectNormalRuleModels(baseModesl: BaseModel[]): NormalRule[] {
    return baseModesl.filter((model) => model instanceof NormalRule);
  }

  public mergeEnvVars(envVars: EnvVar[]) {
    for (const envVar of envVars) {
      if (this.context.hasVariable(envVar.key)) {
        const symbolTableVar: SymbolTableVariable = this.context.getVariable(
          envVar.key,
        )!;
        if (compareVarPriority(symbolTableVar.origin, "environment") < 0) {
          this.context.setRawVariable(envVar.key, envVar.value, "environment");
        }
      } else {
        this.context.setRawVariable(envVar.key, envVar.value, "environment");
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
