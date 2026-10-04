import { topologicalSort } from "@cbuild-backend/depq-graph.js";
import { NormalRule } from "@cbuild-backend/model.js";
import { Build } from "@cbuild-backend/execution/build.js";
import type { Env } from "@cbuild-backend/env.js";

export default class SequentialSchedular {
  private readonly context: Env;
  private readonly explicitRules: NormalRule[];

  public constructor(context: Env, rules: NormalRule[]) {
    this.context = context;
    this.explicitRules = rules;
  }
  // sequuential build

  public async sequentialScheduleAsync(targetRule: NormalRule): Promise<void> {
    const build = new Build(this.context, this.explicitRules);

    // should not have circular dependencies to sort
    const sortedRules = topologicalSort(this.explicitRules, targetRule);

    for (let i = 0; i < sortedRules.length; i++) {
      const current: NormalRule = sortedRules[i]!;
      await build.buildTargetAsync(current);
    }
  }
}
