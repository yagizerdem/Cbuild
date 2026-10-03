import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { TargetRuleIR } from "@src/compiler/ir.js";
import { TargetRuleEvaluationState } from "@cbuild-backend/evaluator/core/type.js";
import AssignmentIREvaluator from "@cbuild-backend/evaluator/assignment-evaluator.js";

export default class TargetRuleIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: TargetRuleIR;
  constructor(context: Env, ir: TargetRuleIR) {
    this.context = context; // root context
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public async execute(): Promise<TargetRuleEvaluationState[]> {
    const targetEvaluationStates: TargetRuleEvaluationState[] = [];

    if (this.ir.assignment) {
      for (const targetValue of this.ir.targets) {
        const targetName = this.valueExpansionEngine.expand(targetValue);

        const targetRuleContext =
          this.context.targetEnvs[targetName] ??
          new Env(this.context.cliOptions);

        targetRuleContext.enclosing = this.context;

        const assignmentEvaluator = new AssignmentIREvaluator(
          targetRuleContext,
          this.ir.assignment,
        );

        await assignmentEvaluator.evaluate();

        targetEvaluationStates.push({
          evaluatedContext: targetRuleContext,
          evaluatedTargetRuleIR: this.ir,
          targetRawName: targetName,
        });
      }
    }

    return targetEvaluationStates;
  }
}
