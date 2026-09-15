import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class AddsuffixRunner {
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
    const suffixIr = functionIr.args.at(0)!; // argument must be present checked in parser/compilation steps
    const valueIr = functionIr.args.at(1)!; // argument must be present checked in parser/compilation steps

    // handle expansion
    const expandedSuffix = this.valueExpansionEngine.expand(suffixIr);
    const expandedValue = this.valueExpansionEngine.expand(valueIr);

    const values = expandedValue.split(/\s+/).filter(Boolean);

    return values.map((value) => value + expandedSuffix).join(" ");
  }
}
