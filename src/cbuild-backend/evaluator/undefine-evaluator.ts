import { Env, VariableOrigin } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { UndefineIR, UndefineSpecifier } from "@src/compiler/ir.js";

export default class UndefineIREvaluator {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly ir: UndefineIR;
  constructor(context: Env, ir: UndefineIR) {
    this.context = context;
    this.ir = ir;
    this.valueExpansionEngine = new ValueExpansionEngine(context);
  }

  public execute() {
    const identifier = this.valueExpansionEngine.expand(this.ir.identifier);
    this.undefineVariable(identifier, this.ir.prefix);
  }

  private undefineVariable(identifier: string, prefix: UndefineSpecifier) {
    if (!this.context.hasVariable(identifier)) return;

    const symbolTableVar = this.context.getVariable(identifier)!;
    if (prefix === "override undefine") {
      this.context.removeVariable(identifier);
    }

    if (
      prefix === "undefine" &&
      this.canUndefineVariable(symbolTableVar.origin, "undefine")
    ) {
      this.context.removeVariable(identifier);
    }
  }

  private canUndefineVariable(
    origin: VariableOrigin,
    prefix: "undefine" | "override undefine",
  ): boolean {
    if (prefix === "override undefine") return true;

    // only allow undefine for non-command-line and non-override origins
    return origin !== "command-line" && origin !== "override";
  }
}
