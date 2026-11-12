from __future__ import annotations

from antlr4 import CommonTokenStream, InputStream
from antlr4.error.ErrorListener import ErrorListener

from cbuild_parser.cbuildLexer import cbuildLexer
from cbuild_parser.cbuildParser import cbuildParser
from preprocessor.preprocessor import p_char_buffer_to_string, preprocess


class SyntaxErrorCollector(ErrorListener):
    def __init__(self) -> None:
        super().__init__()
        self.errors: list[str] = []

    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):  # noqa: N802
        self.errors.append(f"line {line}:{column} {msg}")


def run_build_file(build_file: str) -> cbuildParser.CbuildfileContext:
    """Preprocess and parse a build file, raising on any lexer or parser error."""
    program = p_char_buffer_to_string(preprocess(build_file))

    errors = SyntaxErrorCollector()

    lexer = cbuildLexer(InputStream(program))
    lexer.removeErrorListeners()
    lexer.addErrorListener(errors)

    parser = cbuildParser(CommonTokenStream(lexer))
    parser.removeErrorListeners()
    parser.addErrorListener(errors)

    tree = parser.cbuildfile()

    if errors.errors:
        raise AssertionError("Syntax errors:\n" + "\n".join(errors.errors))

    return tree
