import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { FunctionIR } from "@src/compiler/ir.js";

export default class EvalRunner {
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

  public run(functionIr: FunctionIR) {
    throw CbuildException.from({
      column: functionIr.col,
      row: functionIr.row,
      errorType: ErrorType.PROCESS,
      machineCode: MachineCode.UNSUPPORTED,
      message: `cbuild:${functionIr.row}: eval function is not supported`,
    });
  }
}
