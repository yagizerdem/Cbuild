import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class JoinRunner {
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
    const list1 = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const list2 = this.valueExpansionEngine
      .expand(functionIr.args[1])
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const joined: string[] = [];

    for (let index = 0; index < Math.max(list1.length, list2.length); index++) {
      joined.push(`${list1[index] ?? ""}${list2[index] ?? ""}`);
    }

    return joined.join(" ");
  }
}
