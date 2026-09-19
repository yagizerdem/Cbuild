import { ConditionalIR, IR } from "@src/compiler/ir.js";
import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";

export default class ConditionalIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: ConditionalIR;
  constructor(context: Env, ir: ConditionalIR) {
    this.context = context;
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute(): IR[] {
    // identififer names
    const expandedLeftCondition =
      this.ir.condition?.left?.exec<string>(this.valueExpansionEngine) ?? "";
    const expandedRightCondition =
      this.ir.condition?.right?.exec<string>(this.valueExpansionEngine) ??
      undefined;
    // if right condition is undefined it must be ifdef kw

    let leftValue = "";
    if (this.context.hasVariable(expandedLeftCondition)) {
      const symbolTableVar = this.context.getVariable(expandedLeftCondition);
      if (symbolTableVar?.isDeferred() && symbolTableVar.value) {
        leftValue = this.valueExpansionEngine.exec(symbolTableVar.value);
      } else {
        leftValue = this.context.getRawVariable(expandedLeftCondition) ?? "";
      }
    }

    let rightValue = "";
    if (
      expandedRightCondition &&
      this.context.hasVariable(expandedRightCondition)
    ) {
      const symbolTableVar = this.context.getVariable(expandedRightCondition);
      if (symbolTableVar?.isDeferred() && symbolTableVar.value) {
        rightValue = this.valueExpansionEngine.exec(symbolTableVar.value);
      } else {
        rightValue = this.context.getRawVariable(expandedRightCondition) ?? "";
      }
    }

    if (this.ir.kind == "ifeq") {
      if (leftValue === rightValue) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    if (this.ir.kind == "ifneq") {
      if (leftValue !== rightValue) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    if (this.ir.kind == "ifdef") {
      if (leftValue) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    if (this.ir.kind == "ifndef") {
      if (!leftValue) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    return [];
  }
}
