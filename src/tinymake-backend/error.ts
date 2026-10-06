export type ErrorType = "process" | "semantic" | "parse";

type TinyMakeErrorInput = {
  errorType: ErrorType;
  message: string;
  row?: number;
  col?: number;
};

export class TinyMakeError extends Error {
  public errorType: ErrorType;
  public row: number;
  public col: number;

  constructor({ errorType, message, row = 0, col = 0 }: TinyMakeErrorInput) {
    super(message);

    this.name = "TinyMakeError";
    this.errorType = errorType;
    this.row = row;
    this.col = col;
  }

  static create(input: TinyMakeErrorInput): TinyMakeError {
    return new TinyMakeError(input);
  }
}
