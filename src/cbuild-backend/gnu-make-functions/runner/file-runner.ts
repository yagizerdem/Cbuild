import { Env } from "@cbuild-backend/env.js";
import { ValueExpansionEngine } from "@cbuild-backend/expansion.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";
import { FunctionIR } from "@src/compiler/ir.js";
import fs from "node:fs";

export default class FileRunner {
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
    const operation = this.valueExpansionEngine
      .expand(functionIr.args[0])
      .trim();

    if (operation.startsWith(">>")) {
      const filename = operation.slice(2).trim();

      if (filename.length === 0) {
        throw CbuildException.from({
          errorType: ErrorType.SEMANTIC,
          machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
          message: `file: invalid operation '${operation}'`,
          row: functionIr.row,
          column: functionIr.col,
        });
      }

      const text =
        functionIr.args.length === 2
          ? this.valueExpansionEngine.expand(functionIr.args[1])
          : "";

      fs.appendFileSync(filename, `${text}\n`);

      return "";
    }

    if (operation.startsWith(">")) {
      const filename = operation.slice(1).trim();

      if (filename.length === 0) {
        throw CbuildException.from({
          errorType: ErrorType.SEMANTIC,
          machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
          message: `file: invalid operation '${operation}'`,
          row: functionIr.row,
          column: functionIr.col,
        });
      }

      const text =
        functionIr.args.length === 2
          ? this.valueExpansionEngine.expand(functionIr.args[1])
          : "";

      fs.writeFileSync(filename, `${text}\n`);

      return "";
    }

    if (operation.startsWith("<")) {
      const filename = operation.slice(1).trim();

      if (filename.length === 0) {
        throw CbuildException.from({
          errorType: ErrorType.SEMANTIC,
          machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
          message: `file: invalid operation '${operation}'`,
          row: functionIr.row,
          column: functionIr.col,
        });
      }

      try {
        return fs.readFileSync(filename, "utf8").replace(/\n$/, "");
      } catch (error) {
        if (
          error instanceof Error &&
          "code" in error &&
          error.code === "ENOENT"
        ) {
          return "";
        }

        throw error;
      }
    }

    throw CbuildException.from({
      errorType: ErrorType.SEMANTIC,
      machineCode: MachineCode.FUNCTION_RUNTIME_ERROR,
      message: `file: invalid operation '${operation}'`,
      row: functionIr.row,
      column: functionIr.col,
    });
  }
}
