import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR, ValueIR } from "@src/compiler/ir.js";

export default class AndRunner {
  private readonly context: Env;
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly activeLookups: Set<string>;

  public constructor(context: Env, activeLookups: Set<string>) {
    this.context = context;
    this.valueExpansionEngine = new ValueExpansionEngine(
      context,
      activeLookups,
    );
    this.activeLookups = activeLookups;
  }

  public run(functionIr: FunctionIR): string {
    let lastExpanded = "";
    for (const arg of functionIr.args) {
      const expanded = this.valueExpansionEngine.expand(arg);
      if (expanded == "") {
        return "";
      }
      lastExpanded = expanded;
    }
    return lastExpanded;
  }
}
