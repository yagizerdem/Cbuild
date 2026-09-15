import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class BasenameRunner {
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
    const baseNamesValue = functionIr.args.at(0)!; // argument must be present checked in parser/compilation steps
    const expandedBaseNames = this.valueExpansionEngine.expand(baseNamesValue);
    const baseNames = expandedBaseNames.split(/\s+/).filter(Boolean);

    return baseNames
      .map((name) => {
        const slashIndex = name.lastIndexOf("/");
        const dotIndex = name.lastIndexOf(".");

        if (dotIndex > slashIndex) {
          return name.slice(0, dotIndex);
        }
        return name;
      })
      .join(" ");
  }
}
