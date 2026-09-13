export enum ErrorType {
  SYNTAX,
  SEMANTIC,
  PROCESS,
}

export enum MachineCode {
  // compilation
  COMPILATION_ERROR,
  FUNCTION_COMPILATION_ERROR,

  // semantic
  UNSUPPORTED_IR,

  // process
  FILE_NOT_FOUND,
  DEPQ_NOT_FOUND,

  // depq graph
  NO_TARGET_FOUND,
  CIRCULAR_DEPQ,

  // command
  SHELL_COMMAND_FAILED,
  SHELL_COMMAND_ABORTED,
  INVALID_SHELL_PATH,
}

export interface CbuildExceptionOptions {
  message: string;
  errorType: ErrorType;
  machineCode: MachineCode;
  row: number;
  column: number;
}

export class CbuildException extends Error {
  public constructor(
    message: string,
    public readonly errorType: ErrorType,
    public readonly machineCode: MachineCode,
    public readonly row: number,
    public readonly column: number,
  ) {
    super(message);
    this.name = "CbuildException";

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public static from({
    message,
    errorType,
    machineCode,
    row,
    column,
  }: CbuildExceptionOptions): CbuildException {
    return new CbuildException(message, errorType, machineCode, row, column);
  }
}
