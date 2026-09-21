import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR, ValueIR } from "@src/compiler/ir.js";

export default class ValueRunner {
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
    const identifier = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim();
    const variable = this.context.getVariableRecursive(identifier);

    if (variable === undefined) {
      return "";
    }

    if (!variable.isDeferred()) {
      return variable.getRawValue() ?? "";
    }

    return this.serialize(variable.value);
  }

  private serialize(value: ValueIR): string {
    return value.parts
      .map((part) => {
        if (part.kind === "text") {
          return part.lexeme;
        }

        if (part.kind === "variable-reference") {
          return `$(${this.serialize(part.nameExpr)})`;
        }

        const args = part.function.args
          .map((argument) => this.serialize(argument))
          .join(",");

        return `$(${part.function.name}${part.function.args.length > 0 ? `,${args}` : ""})`;
      })
      .join("");
  }
}
