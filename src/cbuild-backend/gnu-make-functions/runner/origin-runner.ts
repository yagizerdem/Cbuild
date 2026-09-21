import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class OriginRunner {
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
    const variable = this.context.getVariableRecursive(identifier);

    if (variable === undefined) {
      return "undefined";
    }

    // normalize the origin value for display purposes
    switch (variable.origin) {
      case "environment-overridden":
        return "environment override";
      case "command-line":
        return "command line";
      default:
        return variable.origin;
    }
  }
}
