import { ValueIR, ValuePart } from "@compiler/ir.js";
import { Tbackend } from "@src/type/tBackend.js";

export class Settings {
  public readonly buildSequential: boolean;
  public readonly parallelJobCount: number;
  public readonly cwd: string;
  public readonly backend: Tbackend;
  public readonly silent: boolean;

  public constructor(
    buildSequential: boolean,
    parallelJobCount: number,
    cwd: string,
    backend: Tbackend,
    silent: boolean,
  ) {
    this.buildSequential = buildSequential;
    this.parallelJobCount = parallelJobCount;
    this.cwd = cwd;
    this.backend = backend;
    this.silent = silent;
  }

  // public get defaultSettings(): Settings {
  //   return new
  // }
}

export type VariableFlavor = "raw" | "recursive";
export type VariableOrigin =
  | "default"
  | "environment"
  | "environment-overridden"
  | "file"
  | "command-line"
  | "override"
  | "automatic";

export const variableOriginPriorityMap: Record<VariableOrigin, number> = {
  default: 2,
  environment: 3,
  file: 4,
  "environment-overridden": 5,
  "command-line": 6,
  override: 7,
  automatic: 1,
};

export class SymbolTableVariable {
  public value: ValueIR;
  public readonly flavor: VariableFlavor;
  public origin: VariableOrigin;

  public constructor(
    value: ValueIR,
    flavor: VariableFlavor,
    origin: VariableOrigin = "file",
  ) {
    this.value = value;
    this.flavor = flavor;
    this.origin = origin;
  }

  public static rawVariable(
    rawValue: string,
    origin: VariableOrigin = "file",
  ): SymbolTableVariable {
    return new SymbolTableVariable(
      new ValueIR([{ kind: "text", lexeme: rawValue }]),
      "raw",
      origin,
    );
  }

  public static deferredVariable(
    deferredValue: ValueIR,
    origin: VariableOrigin = "file",
  ): SymbolTableVariable {
    return new SymbolTableVariable(deferredValue, "recursive", origin);
  }

  public getRawValue(): string | null {
    let rawValue = "";
    for (const part of this.value.parts) {
      if (part.kind === "text") {
        rawValue += part.lexeme;
      }
    }
    return rawValue;
  }

  public getDeferredValue(): ValueIR {
    return this.value;
  }

  public isDeferred(): boolean {
    return this.flavor === "recursive";
  }

  public appendValues(
    value: ValueIR | ValuePart | ValuePart[],
  ): SymbolTableVariable {
    this.value = new ValueIR([
      ...(this.value as ValueIR).parts,
      ...(value instanceof ValueIR
        ? value.parts
        : Array.isArray(value)
          ? value
          : [value]),
    ]);
    return this;
  }

  public toString(): string {
    return this.value?.toString() ?? JSON.stringify(this.value);
  }
}

export class Env {
  private readonly symbolTable = new Map<string, SymbolTableVariable>();
  public readonly settings: Settings;

  public constructor(setting: Settings) {
    this.settings = setting;
  }

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

  public setRawVariable(
    name: string,
    value: string,
    origin: VariableOrigin = "file",
  ): void {
    if (value == null) {
      throw new TypeError(`Raw value cannot be null or undefined: ${name}`);
    }

    this.setVariable(name, SymbolTableVariable.rawVariable(value, origin));
  }

  public setDeferredVariable(
    name: string,
    value: ValueIR,
    origin: VariableOrigin = "file",
  ): void {
    if (value == null) {
      throw new TypeError(
        `Deferred value cannot be null or undefined: ${name}`,
      );
    }

    this.setVariable(name, SymbolTableVariable.deferredVariable(value, origin));
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

  public getVariablePriority(variable: SymbolTableVariable | string): number {
    let symbolTableEntry =
      variable instanceof SymbolTableVariable
        ? variable
        : (this.getVariable(variable) ?? undefined);
    if (!symbolTableEntry) return -1;

    return variableOriginPriorityMap[symbolTableEntry.origin] ?? -1;
  }

  public setVariableOrigin(
    variable: SymbolTableVariable | string,
    origin: VariableOrigin,
  ): void {
    let symbolTableEntry =
      variable instanceof SymbolTableVariable
        ? variable
        : (this.getVariable(variable) ?? undefined);
    if (!symbolTableEntry) return;

    symbolTableEntry.origin = origin;
  }
}

export function compareVarPriority(
  origin1: VariableOrigin,
  origin2: VariableOrigin,
): number {
  const result =
    (variableOriginPriorityMap[origin1] ?? 0) -
    (variableOriginPriorityMap[origin2] ?? 0);
  return result > 0 ? 1 : result == 0 ? 0 : -1;
}
