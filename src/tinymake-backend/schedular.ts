import { EvaluatedRule } from "@tinymake-backend/evaluator.js";
import { DeqpGraph } from "@tinymake-backend/graph.js";
import { TinyMakeExpansionEngine } from "@tinymake-backend/expansion.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";

interface TinyMakeSchedularSchedularOptions {
  depqGraph: DeqpGraph;
  context: TinyMakeEnv;
}

export class TinyMakeSchedular {
  private readonly depqGrpah: DeqpGraph;
  private activeTargets = new Set<string>(); //  active rule targets
  private failedTargets = new Set<string>(); // not-builded targets
  private compleatedTargets = new Set<string>(); // builded targets

  private depqCounter: Record<string, number> = {}; // holds target name - remaining depq count
  private activeBuildProcesses: Set<Promise<void>> = new Set();
  private readonly context: TinyMakeEnv;

  constructor(options: TinyMakeSchedularSchedularOptions) {
    this.depqGrpah = options.depqGraph;
    this.context = options.context;

    for (const rule of options.depqGraph.rules) {
      this.depqCounter[rule.target] =
        options.depqGraph.targetDepqMap[rule.target].length;
    }
  }

  private collectTargetsWithNoDepq(): string[] {
    return Object.keys(this.depqCounter).filter(
      (key) => this.depqCounter[key] === 0,
    );
  }

  private async buildTarget(target: string) {
    const rule = this.depqGrpah.targetRuleMap[target];
    for (const recipe of rule.recipes) {
      const expansion = new TinyMakeExpansionEngine(this.context);
      const command = expansion.expand(recipe);

      // execute command
      console.log(`execution : ${command}`);
    }
  }

  public async schedule() {
    while (
      this.compleatedTargets.size + this.failedTargets.size <
      this.depqGrpah.rules.length
    ) {
      if(this.activeBuildProcesses.size  < (this.context.cliOptions.jobs ?? 1) )



    }
  }
}
