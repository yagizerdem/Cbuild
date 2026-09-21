import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class ForeachRunner {
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
    const variableName = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim();
    const words = this.valueExpansionEngine
      .expand(functionIr.args[1])
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const previousVariable = this.context.getVariable(variableName);
    const expandedText: string[] = [];

    try {
      for (const word of words) {
        this.context.setRawVariable(variableName, word);
        expandedText.push(this.valueExpansionEngine.expand(functionIr.args[2]));
      }
    } finally {
      if (previousVariable) {
        this.context.setVariable(variableName, previousVariable);
      } else {
        this.context.deleteVariable(variableName);
      }
    }

    return expandedText.join(" ");
  }
}
