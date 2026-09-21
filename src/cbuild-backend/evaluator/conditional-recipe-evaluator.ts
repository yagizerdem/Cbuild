import { Env, VariableOrigin } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { ConditionalIR, IR, RecipeIR } from "@src/compiler/ir.js";
import ConditionalIREvaluator from "./conditional-evaluator.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";

export default class ConditionalRecipeEvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: RecipeIR;
  constructor(context: Env, ir: RecipeIR) {
    this.context = context;
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute(): RecipeIR[] {
    if (this.ir.recipe.kind !== "conditional")
      throw new Error("Expected a conditional recipe.");

    const conditionalIREvaluator = new ConditionalIREvaluator(
      this.context,
      this.ir.recipe.conditional,
    );
    const resolvedRecipes: RecipeIR[] = [];

    const resolvedIrs: IR[] = conditionalIREvaluator.execute();
    for (const resolvedIr of resolvedIrs) {
      if (resolvedIr instanceof RecipeIR) {
        if (resolvedIr.recipe.kind == "conditional") {
          const nestedResolvedRecipes = new ConditionalRecipeEvaluator(
            this.context,
            resolvedIr,
          ).execute();
          resolvedRecipes.push(...nestedResolvedRecipes);
        } else {
          resolvedRecipes.push(resolvedIr);
        }
      } else {
        throw CbuildException.from({
          column: this.ir.col,
          row: this.ir.row,
          errorType: ErrorType.PROCESS,
          machineCode: MachineCode.UNSUPPORTED_IR,
          message:
            "Unexpected IR type encountered in conditional recipe evaluation.",
        });
      }
    }
    return resolvedRecipes;
  }
}
