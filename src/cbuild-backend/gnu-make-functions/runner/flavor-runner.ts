import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class FlavorRunner {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly activeLookups: Set<string>;

  public constructor(context: Env, activeLookups: Set<string>) {
    this.context = context;
    this.activeLookups = activeLookups;

    this.valueExpansionEngine = new ValueExpansionEngine(
      context,
      activeLookups,
    );
  }

  public run(functionIr: FunctionIR): string {
    const identifier = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim();

    if (!this.context.hasVariable(identifier)) {
      return "undefined";
    }

    const variable = this.context.getVariable(identifier);
    if (variable === undefined) {
      return "undefined";
    }

    if (variable.isDeferred()) return "recursive";

    return "simple";
  }
}
