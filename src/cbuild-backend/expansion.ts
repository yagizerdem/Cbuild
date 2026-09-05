import {
  AssignmentIR,
  AssignmentType,
  Executor,
  IR,
  RecipeIR,
  ValueIR,
  ValuePart,
} from "@compiler/ir.js";
import { Env, SymbolTableVariable } from "@src/cbuild-backend/env.js";

type VarRefPart = Extract<ValuePart, { kind: "variable-reference" }>;

export class RecursiveVariableExpansionException extends Error {
  public constructor(public readonly identifier: string) {
    super(`Recursive variable expansion: ${identifier}`);
    this.name = "RecursiveVariableExpansionException";
  }
}

// Adapter for the current IR executor interface; unhandled nodes return null.
export class BaseExpansionEngine implements Executor {
  public exec<T>(ir: IR | ValuePart): T {
    return null as T;
  }
}

export class ExpansionEngine extends BaseExpansionEngine {
  private readonly valueExpansionEngine: ValueExpansionEngine;
  private readonly context: Env;

  public constructor(context: Env) {
    super();
    this.valueExpansionEngine = new ValueExpansionEngine(context);
    this.context = context;
  }

  public expand<T>(ir: AssignmentIR | ValueIR | ValuePart | RecipeIR): T {
    if (ir instanceof AssignmentIR) {
      const identifier = ir.left!.exec<string>(this.valueExpansionEngine);
      if (ir.type == AssignmentType.SIMPLE) {
        const value = ir.right!.exec<string>(this.valueExpansionEngine);
        this.context.setRawVariable(identifier, value);
      }
      if (ir.type == AssignmentType.RECURSIVE) {
        this.context.setDeferredVariable(identifier, ir.right!);
      }
    }

    if (ir instanceof RecipeIR) {
      return ir.exec<T>(new RecipeExpansionEngine(this.context));
    }

    if (ir instanceof ValueIR) {
      return this.valueExpansionEngine.expand(ir) as T;
    }

    // expand value parts
    if (
      "kind" in ir &&
      (ir.kind === "variable-reference" || ir.kind === "text")
    ) {
      return this.valueExpansionEngine.expand(ir as VarRefPart) as T;
    }

    throw new Error("Unsupported IR node for expansion");
  }

  public override exec<T>(ir: IR): T {
    return this.expand(ir);
  }
}

export class ValueExpansionEngine extends BaseExpansionEngine {
  private readonly context: Env;
  private readonly activeLookups: Set<string>;

  public constructor(context: Env) {
    super();
    this.context = context;
    this.activeLookups = new Set<string>();
  }

  public clearActiveLookups(): void {
    this.activeLookups.clear();
  }

  public expand(ir: ValueIR | ValuePart): string {
    if (ir instanceof ValueIR) {
      return this.expandValueToString(ir, this.activeLookups);
    }
    if ("kind" in ir && ir.kind === "variable-reference") {
      return this.expandVarRefToString(ir, this.activeLookups);
    }
    if ("kind" in ir && ir.kind === "text") {
      return ir.lexeme;
    }

    throw new Error("Unsupported IR node or ValuePart for cbuild backend");
  }

  public override exec<T>(ir: ValueIR): T {
    return this.expandValueToString(ir, this.activeLookups) as T;
  }

  private expandValueToString(ir: ValueIR, activeLookups: Set<string>): string {
    let builder = "";
    for (const part of ir.parts) {
      if (part.kind === "variable-reference") {
        const refPart = part;
        builder += this.expandVarRefToString(refPart, activeLookups);
      }
      if (part.kind === "text") {
        const textPart = part;
        builder += textPart.lexeme;
      }
    }
    return builder.toString();
  }

  private expandVarRefToString(
    varRef: VarRefPart,
    activeLookups: Set<string>,
  ): string {
    let builder = "";
    for (const part of varRef.nameExpr.parts) {
      if (part.kind === "variable-reference") {
        const refPart = part;
        builder += this.expandVarRefToString(refPart, activeLookups);
      }
      if (part.kind === "text") {
        const textPart = part;
        builder += textPart.lexeme;
      }
    }
    const identifier = builder.toString();

    if (activeLookups.has(identifier)) {
      throw new RecursiveVariableExpansionException(identifier);
    }

    if (this.context.hasVariable(identifier)) {
      const variable = this.context.requireVariable(identifier);
      if (variable.isDeferred()) {
        const valueIR = variable.getDeferredValue()!;
        activeLookups.add(identifier);
        const rawValue = this.exec<string>(valueIR);
        activeLookups.delete(identifier);
        this.context.replaceVariable(
          identifier,
          new SymbolTableVariable(rawValue, valueIR),
        );
        return rawValue;
      }

      return this.context.requireVariable(identifier).getRawValue()!;
    }
    return "";
  }
}

export class RecipeExpansionEngine extends BaseExpansionEngine {
  private readonly context: Env;

  public constructor(context: Env) {
    super();
    this.context = context;
  }

  public override exec<T>(ir: RecipeIR): T {
    if (!(ir instanceof RecipeIR) || ir.recipe.kind !== "command") {
      throw new Error(
        "RecipeIR only support command recipes for cbuild backend",
      );
    }

    const valueExpansionEngine = new ValueExpansionEngine(this.context);
    const expandedShellCommand = valueExpansionEngine.exec<string>(
      ir.recipe.command,
    );
    return expandedShellCommand as T;
  }
}

export class Expansion {
  public expand(instructions: IR | IR[], context: Env): void {
    const expansionEngine = new ExpansionEngine(context);

    if (!Array.isArray(instructions)) {
      instructions.exec(expansionEngine);
      return;
    }

    for (const ir of instructions) {
      ir.exec(expansionEngine);
    }
  }

  public expandValue(ir: ValueIR, context: Env): string {
    const expansionEngine = new ValueExpansionEngine(context);
    return ir.exec<string>(expansionEngine);
  }
}

export function expandValue(ir: ValueIR, context: Env): string {
  const expansionEngine = new ValueExpansionEngine(context);
  return ir.exec<string>(expansionEngine);
}

export function expandRecipe(ir: RecipeIR, context: Env): string {
  const expansionEngine = new RecipeExpansionEngine(context);
  return ir.exec<string>(expansionEngine);
}
