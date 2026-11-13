from antlr4 import CommonTokenStream, InputStream
from antlr4.error.ErrorListener import ErrorListener

from cbuild_compiler.cbuild_compiler import CBuildCompiler
from cbuild_compiler.ir import IR
from cbuild_parser.cbuildLexer import cbuildLexer
from cbuild_parser.cbuildParser import cbuildParser


class SyntaxErrorCollector(ErrorListener):
    def __init__(self) -> None:
        super().__init__()
        self.errors: list[str] = []

    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):  # noqa: N802
        self.errors.append(f"line {line}:{column} {msg}")


def compile(build_file: str) -> list[IR]:
    lexer = cbuildLexer(InputStream(build_file))
    lexer_errors = SyntaxErrorCollector()

    lexer.removeErrorListeners()
    lexer.addErrorListener(lexer_errors)

    token_stream = CommonTokenStream(lexer)
    parser = cbuildParser(token_stream)
    parser_errors = SyntaxErrorCollector()

    parser.removeErrorListeners()
    parser.addErrorListener(parser_errors)

    root = parser.cbuildfile()
    errors = [*lexer_errors.errors, *parser_errors.errors]

    if len(errors) > 0:
        raise Exception("Build file could not be parsed:\n" + "\n".join(errors))

    compiler = CBuildCompiler()
    compiled_program: list[IR] = compiler.compile(root)

    return compiled_program
