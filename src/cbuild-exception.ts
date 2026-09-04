export enum ErrorType {
  SYNTAX,
  SEMANTIC,
  PROCESS,
}

export class cbuildException extends Error {
  private readonly errorType: ErrorType;
  private readonly fileName: string | null;
  private readonly line: number;
  private readonly column: number;
  private readonly rawMessage: string;

  public constructor(errorType: ErrorType, message: string);

  public constructor(
    errorType: ErrorType,
    message: string,
    fileName: string,
    line: number,
    column: number,
  );

  public constructor(
    errorType: ErrorType,
    message: string,
    line: number,
    column: number,
  );

  public constructor(
    errorType: ErrorType,
    message: string,
    fileNameOrLine?: string | number,
    lineOrColumn = -1,
    column = -1,
  ) {
    super(message);

    this.name = "CbuildException";
    this.errorType = errorType;
    this.rawMessage = message;

    if (typeof fileNameOrLine === "string") {
      this.fileName = fileNameOrLine;
      this.line = lineOrColumn;
      this.column = column;
    } else if (typeof fileNameOrLine === "number") {
      this.fileName = null;
      this.line = fileNameOrLine;
      this.column = lineOrColumn;
    } else {
      this.fileName = null;
      this.line = -1;
      this.column = -1;
    }

    this.message = this.getFormattedMessage();

    Object.setPrototypeOf(this, cbuildException.prototype);
  }

  public getErrorType(): ErrorType {
    return this.errorType;
  }

  public getFileName(): string | null {
    return this.fileName;
  }

  public getLine(): number {
    return this.line;
  }

  public getColumn(): number {
    return this.column;
  }

  public getMessage(): string {
    return this.getFormattedMessage();
  }

  public getFormattedMessage(): string {
    const severity = ErrorType[this.errorType].toLowerCase();

    if (!this.hasSourceLocation()) {
      return `${severity} error: ${this.rawMessage}`;
    }

    return (
      `${this.fileName}:${this.line}:${this.column}: ` +
      `${severity} error: ${this.rawMessage}`
    );
  }

  public getRawMessage(): string {
    return this.rawMessage;
  }

  private hasSourceLocation(): boolean {
    return this.fileName !== null && this.line >= 0 && this.column >= 0;
  }
}
