import { BaseModel, NormalRule } from "@cbuild-backend/model.js";

import { Env } from "@cbuild-backend/env.js";
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
}
