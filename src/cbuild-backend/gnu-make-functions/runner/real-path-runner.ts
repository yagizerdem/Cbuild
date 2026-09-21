import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { realpathSync } from "node:fs";
import path from "node:path";
import { FunctionIR } from "@src/compiler/ir.js";

export default class RealPathRunner {
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
    const expandedNames = this.valueExpansionEngine.expand(functionIr.args[0]);
    const names = expandedNames.trim().split(/\s+/).filter(Boolean);
    const resolvedPaths: string[] = [];

    for (const name of names) {
      try {
        resolvedPaths.push(realpathSync(path.resolve(process.cwd(), name)));
      } catch {
        // GNU Make's realpath returns an empty result for an unresolved name.
      }
    }

    return resolvedPaths.join(" ");
  }
}
