import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";
import path from "node:path";

export default class AbspathRunner {
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
    const pathIr = functionIr.args.at(0)!; // argument must be present checked in parser/compilation steps
    const expandedPath = this.valueExpansionEngine.expand(pathIr);
    const pathValues = expandedPath.trim().split(/\s+/).filter(Boolean);

    const resolvedPaths = [];
    for (const pathValue of pathValues) {
      const resolvedPath = path.resolve(pathValue); // resolve by cwd
      resolvedPaths.push(resolvedPath);
    }

    return resolvedPaths.join(" ");
  }
}
