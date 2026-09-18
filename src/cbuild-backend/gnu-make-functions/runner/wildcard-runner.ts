import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { resolveGlobPattern } from "@src/cbuild-backend/globber.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class WildcardRunner {
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
    const wildcardValue = functionIr.args.at(0)!; // argument must be present checked in parser/compilation steps
    const expandedWildcard = this.valueExpansionEngine.expand(wildcardValue);
    const matchedFiles = resolveGlobPattern(expandedWildcard);

    return matchedFiles.join(" ");
  }
}
