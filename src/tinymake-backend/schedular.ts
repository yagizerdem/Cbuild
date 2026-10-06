import { EvaluatedRule } from "@tinymake-backend/evaluator.js";
import { DeqpGraph, createDepqGraph } from "@tinymake-backend/graph.js";

interface SchedularOptions {
  rules: EvaluatedRule[];
  depqGraph?: DeqpGraph;
}

export class Schedular {
  private readonly rules: EvaluatedRule[];
  private readonly depqGrpah: DeqpGraph;
  constructor(options: SchedularOptions) {
    this.rules = options.rules;
    this.depqGrpah = options.depqGraph ?? createDepqGraph(options.rules);
  }

  public async schedule() {}
}
