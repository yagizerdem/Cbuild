import {
  ATNConfigSet,
  BitSet,
  CharStream,
  CommonTokenStream,
  DFA,
  Parser,
} from "antlr4ng";
import {
  ANTLRErrorListener,
  ATNSimulator,
  RecognitionException,
  Recognizer,
  Token,
} from "antlr4ng";
import { cbuildLexer } from "@parser/cbuildLexer.js";
import { CbuildfileContext, cbuildParser } from "@parser/cbuildParser.js";
import { CBuildCompiler } from "@compiler/cbuild-compiler.js";
import { IR } from "@compiler/ir.js";
import { pCharBufferToString, preprocess } from "@src/preprocessor.js";
import {
  CbuildException,
  ErrorType,
  MachineCode,
} from "@src/cbuild-exception.js";

let BUILD_FILE_NAME = "buildfile";

export function setBuildFileName(name: string): void {
  BUILD_FILE_NAME = name;
}

function formatFatalMessage(row: number, message: string): string {
  return `${BUILD_FILE_NAME}:${row}: *** ${message}`;
}

function sourceLineAt(source: string, row: number): string {
  return source.split(/\r?\n/)[row - 1] ?? "";
}

function hasActiveRuleBefore(source: string, row: number): boolean {
  const lines = source.split(/\r?\n/);

  for (let index = row - 2; index >= 0; index--) {
    const line = lines[index];
    const trimmed = line.trim();

    if (trimmed.length === 0 || trimmed.startsWith("#")) {
      continue;
    }

    if (line.startsWith("\t")) {
      continue;
    }

    const colonIndex = line.indexOf(":");
    const equalsIndex = line.indexOf("=");

    return colonIndex >= 0 && (equalsIndex === -1 || colonIndex < equalsIndex);
  }

  return false;
}

function hasUnterminatedVariableReference(source: string): boolean {
  const expectedClosers: string[] = [];

  for (let index = 0; index < source.length; index++) {
    if (source[index] === "$" && source[index + 1] === "$") {
      index++;
      continue;
    }

    if (source[index] === "$" && source[index + 1] === "(") {
      expectedClosers.push(")");
      index++;
      continue;
    }

    if (source[index] === "$" && source[index + 1] === "{") {
      expectedClosers.push("}");
      index++;
      continue;
    }

    if (source[index] === expectedClosers.at(-1)) {
      expectedClosers.pop();
    }
  }

  return expectedClosers.length > 0;
}

function gnuMakeSyntaxMessage(
  source: string,
  row: number,
  antlrMessage: string,
  offendingSymbol: Token | null,
): string {
  const line = sourceLineAt(source, row);
  const diagnostic = `${antlrMessage} ${offendingSymbol?.text ?? ""}`;

  if (
    /unterminated variable reference/i.test(diagnostic) ||
    hasUnterminatedVariableReference(line)
  ) {
    return "Unterminated variable reference. Stop.";
  }

  if (line.trimStart().startsWith(";")) {
    return "missing rule before commands. Stop.";
  }

  if (/^ {8}\S/.test(line)) {
    return "missing separator (did you mean TAB instead of 8 spaces?). Stop.";
  }

  if (line.startsWith("\t") && !hasActiveRuleBefore(source, row)) {
    return "recipe commences before first target.  Stop.";
  }

  return "missing separator. Stop.";
}

function extractLocation(error: unknown): { row: number; column: number } {
  if (error instanceof CbuildException) {
    return {
      row: error.row > 0 ? error.row : 1,
      column: error.column >= 0 ? error.column : 0,
    };
  }

  if (error instanceof Error) {
    const location = error.message.match(/(?:at|line)\s+(\d+):(\d+)/i);

    if (location !== null) {
      return {
        row: Number.parseInt(location[1], 10),
        column: Number.parseInt(location[2], 10),
      };
    }
  }

  return { row: 1, column: 0 };
}

function extractFunctionName(message: string): string | null {
  const match = message.match(
    /(?:function\s+'([^']+)'|buildFile:\s*([^:]+):)/i,
  );

  return match?.[1] ?? match?.[2]?.trim() ?? null;
}

function normalizeFrontendError(
  error: unknown,
  defaultErrorType: ErrorType,
): CbuildException {
  if (
    error instanceof CbuildException &&
    error.message.startsWith(`${BUILD_FILE_NAME}:`) &&
    error.message.includes("***")
  ) {
    return error;
  }

  const { row, column } = extractLocation(error);
  const originalMessage =
    error instanceof Error ? error.message : String(error);
  const functionName = extractFunctionName(originalMessage);
  let message = "missing separator. Stop.";

  if (
    error instanceof CbuildException &&
    error.machineCode === MachineCode.FUNCTION_COMPILATION_ERROR &&
    functionName !== null
  ) {
    message = `insufficient arguments to function '${functionName}'. Stop.`;
  } else if (/unterminated variable reference/i.test(originalMessage)) {
    message = "Unterminated variable reference. Stop.";
  } else if (/missing target pattern/i.test(originalMessage)) {
    message = "missing target pattern. Stop.";
  } else if (/multiple target patterns/i.test(originalMessage)) {
    message = "multiple target patterns. Stop.";
  } else if (/target pattern contains no ['`]?%/i.test(originalMessage)) {
    message = "target pattern contains no `%'. Stop.";
  }

  return CbuildException.from({
    message: formatFatalMessage(row, message),
    errorType:
      error instanceof CbuildException ? error.errorType : defaultErrorType,
    machineCode:
      error instanceof CbuildException
        ? error.machineCode
        : MachineCode.COMPILATION_ERROR,
    row,
    column,
  });
}

class SyntaxErrorCollector implements ANTLRErrorListener {
  public readonly errors: CbuildException[] = [];

  public constructor(private readonly source: string) {}

  syntaxError<S extends Token, T extends ATNSimulator>(
    recognizer: Recognizer<T>,
    offendingSymbol: S | null,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | null,
  ): void {
    this.errors.push(
      CbuildException.from({
        message: formatFatalMessage(
          line,
          gnuMakeSyntaxMessage(this.source, line, msg, offendingSymbol),
        ),
        errorType: ErrorType.SYNTAX,
        machineCode: MachineCode.COMPILATION_ERROR,
        row: line,
        column: charPositionInLine + 1,
      }),
    );
  }

  reportAmbiguity(
    recognizer: Parser,
    dfa: DFA,
    startIndex: number,
    stopIndex: number,
    exact: boolean,
    ambigAlts: BitSet | undefined,
    configs: ATNConfigSet,
  ): void {}

  reportAttemptingFullContext(
    recognizer: Parser,
    dfa: DFA,
    startIndex: number,
    stopIndex: number,
    conflictingAlts: BitSet | undefined,
    configs: ATNConfigSet,
  ): void {}

  reportContextSensitivity(
    recognizer: Parser,
    dfa: DFA,
    startIndex: number,
    stopIndex: number,
    prediction: number,
    configs: ATNConfigSet,
  ): void {}
}

export function parseBuildFile(buildFile: string): CbuildfileContext {
  try {
    const charStream = CharStream.fromString(buildFile);
    const lexer = new cbuildLexer(charStream);
    const lexerErrors = new SyntaxErrorCollector(buildFile);

    lexer.removeErrorListeners();
    lexer.addErrorListener(lexerErrors);

    const tokenStream = new CommonTokenStream(lexer);
    const parser = new cbuildParser(tokenStream);
    const parserErrors = new SyntaxErrorCollector(buildFile);

    parser.removeErrorListeners();
    parser.addErrorListener(parserErrors);

    const root = parser.cbuildfile();
    const errors = [...lexerErrors.errors, ...parserErrors.errors];

    if (errors.length > 0) {
      throw errors[0];
    }

    return root;
  } catch (error: unknown) {
    throw normalizeFrontendError(error, ErrorType.SYNTAX);
  }
}

export function compile(context: CbuildfileContext): IR[] {
  try {
    const compiler = new CBuildCompiler();
    return compiler.compile(context);
  } catch (error: unknown) {
    throw normalizeFrontendError(error, ErrorType.SEMANTIC);
  }
}

export function frontend(buildFile: string): IR[] {
  try {
    const pCharBuffer = preprocess(buildFile);
    const preprocessedProgram = pCharBufferToString(pCharBuffer);
    const context = parseBuildFile(preprocessedProgram);
    return compile(context);
  } catch (error: unknown) {
    throw normalizeFrontendError(error, ErrorType.SYNTAX);
  }
}
