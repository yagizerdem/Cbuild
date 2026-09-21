import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class NotDirRunner {
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

  private notDir(fileName: string): string {
    const lastSlash = fileName.lastIndexOf("/");

    if (lastSlash === -1) {
      return fileName;
    }

    return fileName.slice(lastSlash + 1);
  }

  public run(functionIr: FunctionIR): string {
    const expandedNames = this.valueExpansionEngine.expand(functionIr.args[0]);
    const names = expandedNames.trim().split(/\s+/);

    if (names.length === 1 && names[0] === "") {
      return "";
    }

    return names.map((name) => this.notDir(name)).join(" ");
  }
}
