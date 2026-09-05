import { ValueIR } from "@compiler/ir.js";

export class Settings {
  public readonly buildSequential: boolean;
  public readonly parallelJobCount: number;
  public readonly cwd: string;
  public readonly isMinimalApi: boolean;
  public readonly silent: boolean;

  public constructor(
    buildSequential: boolean,
    parallelJobCount: number,
    cwd: string,
    isMinimalApi: boolean,
    silent: boolean,
  ) {
    this.buildSequential = buildSequential;
    this.parallelJobCount = parallelJobCount;
    this.cwd = cwd;
    this.isMinimalApi = isMinimalApi;
    this.silent = silent;
  }
}

export class SymbolTableVariable {
  public readonly rawValue: string | null;
  public readonly deferredValue: ValueIR | null;

  public constructor(rawValue: string | null, deferredValue: ValueIR | null) {
    this.rawValue = rawValue;
    this.deferredValue = deferredValue;
  }

  public static rawVariable(rawValue: string): SymbolTableVariable {
    return new SymbolTableVariable(rawValue, null);
  }

  public static deferredVariable(deferredValue: ValueIR): SymbolTableVariable {
    return new SymbolTableVariable(null, deferredValue);
  }

  public getRawValue(): string | null {
    return this.rawValue;
  }

  public getDeferredValue(): ValueIR | null {
    return this.deferredValue;
  }

  public isDeferred(): boolean {
    return this.deferredValue !== null;
  }

  public toString(): string {
    return this.rawValue ?? JSON.stringify(this.deferredValue);
  }
}

export class Env {
  private readonly symbolTable = new Map<string, SymbolTableVariable>();

  public constructor(public setting: Settings) {}

  public get variableCount(): number {
    return this.symbolTable.size;
  }

  public hasVariable(name: string): boolean {
    return this.symbolTable.has(name);
  }

  public getVariable(name: string): SymbolTableVariable | undefined {
    return this.symbolTable.get(name);
  }

  public requireVariable(name: string): SymbolTableVariable {
    const variable = this.getVariable(name);

    if (variable === undefined) {
      throw new Error(`Undefined variable: ${name}`);
    }

    return variable;
  }

  public getVariableOrDefault(
    name: string,
    defaultValue: SymbolTableVariable,
  ): SymbolTableVariable {
    return this.getVariable(name) ?? defaultValue;
  }

  public getOrCreateVariable(
    name: string,
    factory: () => SymbolTableVariable,
  ): SymbolTableVariable {
    const existing = this.getVariable(name);

    if (existing !== undefined) {
      return existing;
    }

    const variable = factory();
    this.setVariable(name, variable);
    return variable;
  }

  public setVariable(name: string, variable: SymbolTableVariable): void {
    this.validateEntry(name, variable);
    this.symbolTable.set(name, variable);
  }

  public defineVariable(name: string, variable: SymbolTableVariable): void {
    this.validateEntry(name, variable);

    if (this.hasVariable(name)) {
      throw new Error(`Variable already exists: ${name}`);
    }

    this.symbolTable.set(name, variable);
  }

  public defineVariableIfAbsent(
    name: string,
    variable: SymbolTableVariable,
  ): boolean {
    this.validateEntry(name, variable);

    if (this.hasVariable(name)) {
      return false;
    }

    this.symbolTable.set(name, variable);
    return true;
  }

  public replaceVariable(
    name: string,
    variable: SymbolTableVariable,
  ): SymbolTableVariable {
    this.validateEntry(name, variable);

    const previous = this.requireVariable(name);
    this.symbolTable.set(name, variable);

    return previous;
  }

  public updateVariable(
    name: string,
    updater: (current: SymbolTableVariable) => SymbolTableVariable,
  ): SymbolTableVariable {
    const current = this.requireVariable(name);
    const next = updater(current);

    this.setVariable(name, next);
    return next;
  }

  public deleteVariable(name: string): boolean {
    return this.symbolTable.delete(name);
  }

  public removeVariable(name: string): SymbolTableVariable {
    const removed = this.requireVariable(name);
    this.symbolTable.delete(name);
    return removed;
  }

  public clearVariables(): void {
    this.symbolTable.clear();
  }

  public getRawVariable(name: string): string | null | undefined {
    return this.getVariable(name)?.getRawValue();
  }

  public requireRawVariable(name: string): string {
    const value = this.requireVariable(name).getRawValue();

    if (value === null) {
      throw new Error(`Variable has no raw value: ${name}`);
    }

    return value;
  }

  public getRawVariableOrDefault(name: string, defaultValue: string): string {
    return this.getRawVariable(name) ?? defaultValue;
  }

  public getDeferredVariable(name: string): ValueIR | null | undefined {
    return this.getVariable(name)?.getDeferredValue();
  }

  public requireDeferredVariable(name: string): ValueIR {
    const value = this.requireVariable(name).getDeferredValue();

    if (value === null) {
      throw new Error(`Variable has no deferred value: ${name}`);
    }

    return value;
  }

  public setRawVariable(name: string, value: string): void {
    if (value == null) {
      throw new TypeError(`Raw value cannot be null or undefined: ${name}`);
    }

    this.setVariable(name, SymbolTableVariable.rawVariable(value));
  }

  public setDeferredVariable(name: string, value: ValueIR): void {
    if (value == null) {
      throw new TypeError(
        `Deferred value cannot be null or undefined: ${name}`,
      );
    }

    this.setVariable(name, SymbolTableVariable.deferredVariable(value));
  }

  public variableNames(): IterableIterator<string> {
    return this.symbolTable.keys();
  }

  public variableEntries(): IterableIterator<[string, SymbolTableVariable]> {
    return this.symbolTable.entries();
  }

  public printSymbolTable(): void {
    console.log("=== Symbol Table ===");

    if (this.variableCount === 0) {
      console.log("(empty)");
    } else {
      for (const [name, variable] of this.variableEntries()) {
        console.log(`${name} -> ${variable}`);
      }
    }

    console.log("====================");
  }

  private validateEntry(name: string, variable: SymbolTableVariable): void {
    if (typeof name !== "string" || name.length === 0) {
      throw new TypeError("Variable name must be a non-empty string");
    }

    if (variable == null) {
      throw new TypeError(`Variable cannot be null or undefined: ${name}`);
    }
  }
}
