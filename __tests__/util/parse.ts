import { CharStreams, CommonTokenStream } from "antlr4ts";
import { ANTLRErrorListener } from "antlr4ts/ANTLRErrorListener";
import { ATNSimulator } from "antlr4ts/atn/ATNSimulator";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { Recognizer } from "antlr4ts/Recognizer";
import { Token } from "antlr4ts/Token";
import { cbuildLexer } from "@parser/cbuildLexer";
import { CbuildfileContext, cbuildParser } from "@parser/cbuildParser";

class SyntaxErrorCollector<TSymbol> implements ANTLRErrorListener<TSymbol> {
  public readonly errors: string[] = [];

  public syntaxError<T extends TSymbol>(
    _recognizer: Recognizer<T, ATNSimulator>,
    _offendingSymbol: T | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    _error: RecognitionException | undefined,
  ): void {
    this.errors.push(`line ${line}:${charPositionInLine} ${msg}`);
  }
}

export function runBuildFile(buildFile: string): CbuildfileContext {
  const charStream = CharStreams.fromString(buildFile);
  const lexer = new cbuildLexer(charStream);
  const lexerErrors = new SyntaxErrorCollector<number>();

  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrors);

  const tokenStream = new CommonTokenStream(lexer);
  const parser = new cbuildParser(tokenStream);
  const parserErrors = new SyntaxErrorCollector<Token>();

  parser.removeErrorListeners();
  parser.addErrorListener(parserErrors);

  const root = parser.cbuildfile();
  const errors = [...lexerErrors.errors, ...parserErrors.errors];

  if (errors.length > 0) {
    throw new Error(`Build file could not be parsed:\n${errors.join("\n")}`);
  }

  return root;
}
