import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class IfRunner {
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
    const condition = this.valueExpansionEngine.expand(functionIr.args[0]);

    if (condition !== "") {
      return this.valueExpansionEngine.expand(functionIr.args[1]);
    }

    return functionIr.args.length === 3
      ? this.valueExpansionEngine.expand(functionIr.args[2])
      : "";
  }
}
