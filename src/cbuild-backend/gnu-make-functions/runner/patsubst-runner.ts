import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { StemResolver } from "@src/cbuild-backend/stem-resolver.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class PatsubstRunner {
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
    const pattern = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim();
    const replacement = this.valueExpansionEngine
      .expand(functionIr.args[1])
      .trim();
    const words = this.valueExpansionEngine
      .expand(functionIr.args[2])
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const stemResolver = new StemResolver();

    return words
      .map((word) => {
        const stem = stemResolver.resolveStem(pattern, word);

        if (stem === null) {
          return word;
        }

        return stemResolver.replaceStem(replacement, stem);
      })
      .join(" ");
  }
}
