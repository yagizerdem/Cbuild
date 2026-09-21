import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class SubstRunner {
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
    const from = this.valueExpansionEngine.expand(functionIr.args[0]);
    const to = this.valueExpansionEngine.expand(functionIr.args[1]);
    const text = this.valueExpansionEngine.expand(functionIr.args[2]);

    if (from.length === 0) {
      return text;
    }

    return text.replaceAll(from, to);
  }
}
