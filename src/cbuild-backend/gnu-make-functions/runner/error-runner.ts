import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class ErrorRunner {
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
    const errorText = this.valueExpansionEngine.expand(functionIr.args.at(0)!);

    throw CbuildException.from({
      column: functionIr.col,
      row: functionIr.row,
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.ERROR_FN,
      message: errorText,
    });
  }
}
