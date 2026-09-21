import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { StemResolver } from "@src/cbuild-backend/stem-resolver.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class FilterRunner {
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
    const patterns = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const words = this.valueExpansionEngine
      .expand(functionIr.args[1])
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    const stemResolver = new StemResolver();

    return words
      .filter((word) => {
        return patterns.some((pattern) => stemResolver.match(pattern, word));
      })
      .join(" ");
  }
}
