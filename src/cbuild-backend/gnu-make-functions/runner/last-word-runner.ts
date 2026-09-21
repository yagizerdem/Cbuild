import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class LastWordRunner {
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
    const value = this.valueExpansionEngine.expand(functionIr.args[0]).trim();

    if (value.length === 0) {
      return "";
    }

    const words = value.split(/\s+/);
    return words[words.length - 1];
  }
}
