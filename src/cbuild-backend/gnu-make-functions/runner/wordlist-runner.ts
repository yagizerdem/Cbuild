import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import { FunctionIR } from "@src/compiler/ir.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";

export default class WordListRunner {
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

  private parseIndex(ir: FunctionIR, value: string, name: string): number {
    const trimmed = value.trim();

    if (!/^\d+$/.test(trimmed)) {
      throw CbuildException.from({
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
        message: `wordlist: ${name} argument '${trimmed}' is not a valid positive integer`,
        column: ir.col,
        row: ir.row,
      });
    }

    const index = Number(trimmed);

    if (!Number.isSafeInteger(index) || index < 1) {
      throw CbuildException.from({
        errorType: ErrorType.PROCESS,
        machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
        message: `wordlist: ${name} argument '${trimmed}' is not a valid positive integer`,
        column: ir.col,
        row: ir.row,
      });
    }

    return index;
  }

  public run(functionIr: FunctionIR): string {
    const start = this.parseIndex(
      functionIr,
      this.valueExpansionEngine.expand(functionIr.args[0]),
      "start",
    );

    const end = this.parseIndex(
      functionIr,
      this.valueExpansionEngine.expand(functionIr.args[1]),
      "end",
    );

    if (start > end) {
      return "";
    }

    const expanded = this.valueExpansionEngine.expand(functionIr.args[2]);

    const words = expanded.trim() ? expanded.trim().split(/\s+/) : [];

    return words.slice(start - 1, end).join(" ");
  }
}
