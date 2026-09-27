import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import {
  RecipeIR,
  RuleSeparator,
  StaticPatternRuleIR,
} from "@src/compiler/ir.js";
import { StemResolver } from "@cbuild-backend/stem-resolver.js";
import { NormalRule } from "@cbuild-backend/model.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import ConditionalRecipeIREvaluator from "@cbuild-backend/evaluator/conditional-recipe-evaluator.js";

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
    const orderOnlyPreqPatterns: string[] = [];
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

    for (const orderOnlyPreqPattern of this.ir.orderOnlyPrerequisites) {
      orderOnlyPreqPatterns.push(
        this.valueExpansionEngine.expand(orderOnlyPreqPattern),
      );
    }

    for (const target of targets) {
      const resolvedPreqs: string[] = [];
      const resolvedOrderOnlyPreqs: string[] = [];
      if (stemResolver.match(targetPattern, target)) {
        const stem = stemResolver.resolveStem(targetPattern, target);
        for (const preqPattern of preqPatterns) {
          if (stem == null) {
            throw CbuildException.from({
              errorType: ErrorType.PROCESS,
              message: "cbuild: *** target pattern contains no '%'.  Stop.",
              machineCode: MachineCode.STEM_RESOLUTION_FAILED,
              row: this.ir.row,
              column: this.ir.col,
            });
          } else {
            const resolvedPreq = stemResolver.replaceStem(preqPattern, stem);
            resolvedPreqs.push(resolvedPreq);
          }
        }
        for (const orderOnlyPreqPattern of orderOnlyPreqPatterns) {
          if (stem == null) {
            throw CbuildException.from({
              errorType: ErrorType.PROCESS,
              message: "cbuild: *** target pattern contains no '%'.  Stop.",
              machineCode: MachineCode.STEM_RESOLUTION_FAILED,
              row: this.ir.row,
              column: this.ir.col,
            });
          } else {
            const resolvedOrderOnlyPreq = stemResolver.replaceStem(
              orderOnlyPreqPattern,
              stem,
            );
            resolvedOrderOnlyPreqs.push(resolvedOrderOnlyPreq);
          }
        }

        // resolve recipes
        const recipeIRresolutions: RecipeIR[] = [];
        for (const recipeIR of this.ir.recipes) {
          if (recipeIR.recipe.kind === "conditional") {
            const conditionalRecipeIREvaluator =
              new ConditionalRecipeIREvaluator(this.context, recipeIR);
            const activeRecipeIRs: RecipeIR[] =
              conditionalRecipeIREvaluator.execute();
            recipeIRresolutions.push(...activeRecipeIRs);
          } else {
            recipeIRresolutions.push(recipeIR);
          }
        }

        ruleModels.push(
          new NormalRule({
            prerequisites: resolvedPreqs,
            orderOnlyPrerequisites: resolvedOrderOnlyPreqs,
            ruleIR: this.ir,
            target: target,
            recipeIRs: [...this.ir.recipes],
            evaluatedRecipeIRs: [...recipeIRresolutions],
            shellCommands: [],
            ruleSeperator: this.ir.separator,
          }),
        );
      }
    }

    return ruleModels;
  }
}
