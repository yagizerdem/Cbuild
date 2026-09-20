import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { StaticPatternRuleIR } from "@src/compiler/ir.js";
import { StemResolver } from "@cbuild-backend/stem-resolver.js";
import { NormalRule } from "@cbuild-backend/model.js";

export default class StaticPatternIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: StaticPatternRuleIR;
  constructor(context: Env, ir: StaticPatternRuleIR) {
    this.context = context;
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute(): NormalRule[] {
    const stemResolver = new StemResolver();
    const targets: string[] = [];
    const preqPatterns: string[] = [];
    const ruleModels: NormalRule[] = [];

    // rule format
    // targets(n) : pattern-rule(1) : preq-patterns(m) \n recipes(k)

    for (const target of this.ir.targets) {
      targets.push(this.valueExpansionEngine.expand(target));
    }

    // shoud have only 1 target pattern
    const targetPattern = this.valueExpansionEngine.expand(
      this.ir.targetPattern!,
    );

    for (const preqPattern of this.ir.prerequisites) {
      preqPatterns.push(this.valueExpansionEngine.expand(preqPattern));
    }

    for (const target of targets) {
      const resolvedPreqs: string[] = [];
      if (stemResolver.match(targetPattern, target)) {
        const stem = stemResolver.resolveStem(targetPattern, target);
        for (const preqPattern of preqPatterns) {
          if (stem == null) {
            resolvedPreqs.push(preqPattern);
          } else {
            const resolvedPreq = stemResolver.replaceStem(preqPattern, stem);
            resolvedPreqs.push(resolvedPreq);
          }
        }
        ruleModels.push(
          new NormalRule({
            prerequisites: resolvedPreqs,
            ruleIR: this.ir,
            target: target,
            recipeIRS: this.ir.recipes,
            shellCommands: [],
          }),
        );
      }
    }

    return ruleModels;
  }
}
