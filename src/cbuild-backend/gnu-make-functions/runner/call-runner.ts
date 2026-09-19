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
    if (functionIr.args.length === 0) return "";
    const baseIdentifier = functionIr.args.at(0)!; // exprsssion before expansion
    const expandedBaseIdentifier =
      this.valueExpansionEngine.expand(baseIdentifier);

    // should expand this expression with new environment
    const baseExpression = this.context.getVariableRecursive(
      expandedBaseIdentifier,
    )?.value;

    if (!baseExpression) return "";

    const envVars: string[] = [];
    for (let i = 1; i < functionIr.args.length; i++) {
      const arg = functionIr.args.at(i);
      if (arg) {
        envVars.push(this.valueExpansionEngine.expand(arg));
      }
    }
    const env: Env = new Env(this.context.settings);
    for (let i = 0; i < envVars.length; i++) {
      env.setRawVariable((i + 1).toString(), envVars.at(i)!, "file", false);
    }
    env.enclosing = this.context;

    // create new expansion engine with active lookups
    const valueExpansionEngine = new ValueExpansionEngine(
      env,
      this.activeLookups,
    );

    const result = valueExpansionEngine.expand(baseExpression);
    return result;
  }
}
