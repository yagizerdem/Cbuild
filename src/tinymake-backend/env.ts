import { ValueNode } from "@tinymake-backend/node-types.js";

type TinyMakeSymboltableVar = {
  identifier: string;
  value:
    | {
        kind: "deffered";
        value: ValueNode;
      }
    | {
        kind: "raw";
        value: string;
      };
};

export class TinyMakeEnv {
  private readonly symbolTable: Record<string, TinyMakeSymboltableVar> = {};
  constructor() {
    this.symbolTable = {};
  }
  public enclosing: TinyMakeEnv | undefined;

  public hasVariable(identifier: string) {
    if (this.symbolTable[identifier]) {
      return this;
    }
  }

  public hasVariableRecursive(identifier: string) {
    if (this.hasVariable(identifier)) {
      return true;
    } else {
      this.enclosing?.hasVariableRecursive(identifier);
    }
    return false;
  }

  public defineVariable(identifier: string, overwrite = false) {
    if (this.symbolTable[identifier] && !overwrite) {
      throw Error(`Symbol table variable: ${identifier} already defined`);
    }

    this.symbolTable[identifier] = {
      identifier: identifier,
      value: {
        kind: "raw",
        value: "",
      },
    };
  }

  public setVariable(
    TinyMakeSymboltableVar: TinyMakeSymboltableVar,
  ): TinyMakeSymboltableVar {
    this.symbolTable[TinyMakeSymboltableVar.identifier] =
      TinyMakeSymboltableVar;
    return TinyMakeSymboltableVar;
  }

  public getVariable(identifier: string): TinyMakeSymboltableVar | undefined {
    return this.symbolTable[identifier];
  }

  public getVariableOrDefault<T>(
    identifier: string,
    defaultValue: T,
  ): TinyMakeSymboltableVar | T {
    if (this.hasVariable(identifier)) {
      return this.getVariable(identifier) as TinyMakeSymboltableVar;
    }
    return defaultValue;
  }

  public getVariableRecursiveOrDefault<T>(
    identifier: string,
    defaultValue: T,
  ): TinyMakeSymboltableVar | T {
    if (this.hasVariableRecursive(identifier)) {
      return this.getVariableRecursive(identifier) as TinyMakeSymboltableVar;
    }
    return defaultValue;
  }

  public getVariableRecursive(
    identifier: string,
  ): TinyMakeSymboltableVar | undefined {
    if (this.hasVariable(identifier)) {
      return this.symbolTable[identifier];
    } else {
      return this.enclosing?.getVariableRecursive(identifier);
    }
  }

  public requireVariable(identifier: string): TinyMakeSymboltableVar {
    const TinyMakeSymboltableVar = this.getVariable(identifier);
    if (!TinyMakeSymboltableVar) {
      throw new Error("symbol table variable not found");
    }
    return TinyMakeSymboltableVar;
  }

  public requireVariableRecursive(identifier: string): TinyMakeSymboltableVar {
    const TinyMakeSymboltableVar = this.getVariableRecursive(identifier);
    if (!TinyMakeSymboltableVar) {
      throw new Error("symbol table variable not found");
    }
    return TinyMakeSymboltableVar;
  }
}
