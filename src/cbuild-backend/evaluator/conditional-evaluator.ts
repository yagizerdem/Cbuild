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

    if (this.ir.kind == "ifeq") {
      if (expandedLeftCondition === expandedRightCondition) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    if (this.ir.kind == "ifneq") {
      if (expandedLeftCondition !== expandedRightCondition) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    if (this.ir.kind == "ifdef") {
      if (this.isDefined(expandedLeftCondition)) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    if (this.ir.kind == "ifndef") {
      if (!this.isDefined(expandedLeftCondition)) {
        return this.ir.thenBranch;
      } else {
        return this.ir.elseBranch;
      }
    }

    return [];
  }

  private isDefined(identifier: string): boolean {
    const symbolTableVar = this.context.getVariableRecursive(identifier);
    if (!symbolTableVar) {
      return false;
    }
    if (symbolTableVar.isDeferred()) {
      if (symbolTableVar.value.parts.length == 0) return false;
      // should be at least one defferd part or non-empty raw value
      for (const part of symbolTableVar.value.parts) {
        if (
          part.kind === "variable-reference" ||
          part.kind === "function-call" ||
          (part.kind === "text" && part.lexeme.length > 0)
        ) {
          return true;
        }
      }

      return false;
    }
    return (symbolTableVar.getRawValue() ?? "").length > 0;
  }
}
