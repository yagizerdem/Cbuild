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
import { cbuildParser } from "@parser/cbuildParser.js";
import { CBuildCompiler } from "@src/compiler/cbuild-compiler.js";
import { IR } from "@src/compiler/ir.js";

class SyntaxErrorCollector implements ANTLRErrorListener {
  public readonly errors: string[] = [];

  syntaxError<S extends Token, T extends ATNSimulator>(
    recognizer: Recognizer<T>,
    offendingSymbol: S | null,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | null,
  ): void {
    this.errors.push(`line ${line}:${charPositionInLine} ${msg}`);
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

export function compile(buildFile: string): IR[] {
  const charStream = CharStream.fromString(buildFile);
  const lexer = new cbuildLexer(charStream);
  const lexerErrors = new SyntaxErrorCollector();

  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrors);

  const tokenStream = new CommonTokenStream(lexer);
  const parser = new cbuildParser(tokenStream);
  const parserErrors = new SyntaxErrorCollector();

  parser.removeErrorListeners();
  parser.addErrorListener(parserErrors);

  const root = parser.cbuildfile();
  const errors = [...lexerErrors.errors, ...parserErrors.errors];

  if (errors.length > 0) {
    throw new Error(`Build file could not be parsed:\n${errors.join("\n")}`);
  }

  const compiler = new CBuildCompiler();
  const compiledProgram: IR[] = compiler.compile(root);

  return compiledProgram;
}
