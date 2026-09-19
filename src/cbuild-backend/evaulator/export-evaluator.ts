import { Env, VariableOrigin } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { ExportIR } from "@src/compiler/ir.js";

export default class ExportIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: ExportIR;
  constructor(context: Env, ir: ExportIR) {
    this.context = context;
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute() {
    const identifier = this.valueExpansionEngine.expand(this.ir.identifier);
    if (this.ir.prefix === "export") {
      this.context.setVariableExported(identifier, true);
    } else if (this.ir.prefix === "unexport") {
      this.context.setVariableExported(identifier, false);
    }
  }
}
