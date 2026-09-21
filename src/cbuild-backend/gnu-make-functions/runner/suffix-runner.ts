import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class SuffixRunner {
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
    const names = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    return names
      .map((name) => {
        const slashIndex = name.lastIndexOf("/");
        const dotIndex = name.lastIndexOf(".");

        if (dotIndex <= slashIndex) {
          return "";
        }

        return name.slice(dotIndex);
      })
      .filter(Boolean)
      .join(" ");
  }
}
