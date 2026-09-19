import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class DirRunner {
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

  private dir(fileName: string): string {
    const lastSlash = fileName.lastIndexOf("/");

    if (lastSlash === -1) {
      return "./";
    }

    return fileName.slice(0, lastSlash + 1);
  }

  public run(functionIr: FunctionIR): string {
    if (functionIr.args.length === 0) return "";

    const expandedArg = this.valueExpansionEngine.expand(
      functionIr.args.at(0)!,
    );

    const names = expandedArg.trim().split(/\s+/);

    if (names.length === 1 && names[0] === "") {
      return "";
    }

    return names.map((name) => this.dir(name)).join(" ");
  }
}
