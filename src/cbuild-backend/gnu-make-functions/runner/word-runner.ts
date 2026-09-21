import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class WordRunner {
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
    const index = Number.parseInt(
      this.valueExpansionEngine.expand(functionIr.args[0]).trim(),
      10,
    );

    if (!Number.isInteger(index) || index < 1) {
      return "";
    }

    const words = this.valueExpansionEngine
      .expand(functionIr.args[1])
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return words[index - 1] ?? "";
  }
}
