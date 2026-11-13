import re

from antlr4 import CommonTokenStream, InputStream, Parser, Token
from antlr4.atn.ATNConfigSet import ATNConfigSet
from antlr4.atn.ATNSimulator import ATNSimulator
from antlr4.dfa.DFA import DFA
from antlr4.error.ErrorListener import ErrorListener
from antlr4.error.Errors import RecognitionException
from antlr4.Recognizer import Recognizer

from cbuild_compiler.cbuild_compiler import CBuildCompiler
from cbuild_compiler.ir import IR
from cbuild_parser.cbuildLexer import cbuildLexer
from cbuild_parser.cbuildParser import cbuildParser
from preprocessor.preprocessor import p_char_buffer_to_string, preprocess
from type.buildfile_meta import BuildFileMeta
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

BUILD_FILE_NAME = "buildfile"


def set_build_file_name(name: str) -> None:
    global BUILD_FILE_NAME
    BUILD_FILE_NAME = name


def _format_fatal_message(row: int, message: str) -> str:
    return f"{BUILD_FILE_NAME}:{row}: *** {message}"


def _source_line_at(source: str, row: int) -> str:
    lines = re.split(r"\r?\n", source)
    return lines[row - 1] if 0 <= row - 1 < len(lines) else ""


def _has_active_rule_before(source: str, row: int) -> bool:
    lines = re.split(r"\r?\n", source)

    for index in range(row - 2, -1, -1):
        line = lines[index]
        trimmed = line.strip()

        if len(trimmed) == 0 or trimmed.startswith("#"):
            continue

        if line.startswith("\t"):
            continue

        colon_index = line.find(":")
        equals_index = line.find("=")

        return colon_index >= 0 and (equals_index == -1 or colon_index < equals_index)

    return False


def _has_unterminated_variable_reference(source: str) -> bool:
    expected_closers: list[str] = []

    index = 0
    while index < len(source):
        if source[index] == "$" and source[index + 1 : index + 2] == "$":
            index += 2
            continue

        if source[index] == "$" and source[index + 1 : index + 2] == "(":
            expected_closers.append(")")
            index += 2
            continue

        if source[index] == "$" and source[index + 1 : index + 2] == "{":
            expected_closers.append("}")
            index += 2
            continue

        if len(expected_closers) > 0 and source[index] == expected_closers[-1]:
            expected_closers.pop()

        index += 1

    return len(expected_closers) > 0


def _gnu_make_syntax_message(
    source: str,
    row: int,
    antlr_message: str,
    offending_symbol: Token | None,
) -> str:
    line = _source_line_at(source, row)
    offending_text = (
        offending_symbol.text
        if offending_symbol is not None and offending_symbol.text is not None
        else ""
    )
    diagnostic = f"{antlr_message} {offending_text}"

    if re.search(
        r"unterminated variable reference", diagnostic, re.IGNORECASE
    ) or _has_unterminated_variable_reference(line):
        return "Unterminated variable reference. Stop."

    if line.lstrip().startswith(";"):
        return "missing rule before commands. Stop."

    if re.match(r" {8}\S", line):
        return "missing separator (did you mean TAB instead of 8 spaces?). Stop."

    if line.startswith("\t") and not _has_active_rule_before(source, row):
        return "recipe commences before first target.  Stop."

    return "missing separator. Stop."


def _extract_location(error: BaseException) -> tuple[int, int]:
    if isinstance(error, CbuildException):
        return (
            error.row if error.row > 0 else 1,
            error.column if error.column >= 0 else 0,
        )

    location = re.search(r"(?:at|line)\s+(\d+):(\d+)", str(error), re.IGNORECASE)

    if location is not None:
        return (
            int(location.group(1), 10),
            int(location.group(2), 10),
        )

    return (1, 0)


def _extract_function_name(message: str) -> str | None:
    match = re.search(
        r"(?:function\s+'([^']+)'|buildFile:\s*([^:]+):)",
        message,
        re.IGNORECASE,
    )

    if match is None:
        return None
    if match.group(1) is not None:
        return match.group(1)
    if match.group(2) is not None:
        return match.group(2).strip()
    return None


def _normalize_frontend_error(
    error: BaseException,
    default_error_type: ErrorType,
) -> CbuildException:
    if (
        isinstance(error, CbuildException)
        and error.message.startswith(f"{BUILD_FILE_NAME}:")
        and "***" in error.message
    ):
        return error

    row, column = _extract_location(error)
    original_message = str(error)
    function_name = _extract_function_name(original_message)
    message = "missing separator. Stop."

    if (
        isinstance(error, CbuildException)
        and error.machine_code == MachineCode.FUNCTION_COMPILATION_ERROR
        and function_name is not None
    ):
        message = f"insufficient arguments to function '{function_name}'. Stop."
    elif re.search(r"unterminated variable reference", original_message, re.IGNORECASE):
        message = "Unterminated variable reference. Stop."
    elif re.search(r"missing target pattern", original_message, re.IGNORECASE):
        message = "missing target pattern. Stop."
    elif re.search(r"multiple target patterns", original_message, re.IGNORECASE):
        message = "multiple target patterns. Stop."
    elif re.search(r"target pattern contains no ['`]?%", original_message, re.IGNORECASE):
        message = "target pattern contains no `%'. Stop."

    return CbuildException(
        message=_format_fatal_message(row, message),
        error_type=(
            error.error_type if isinstance(error, CbuildException) else default_error_type
        ),
        machine_code=(
            error.machine_code
            if isinstance(error, CbuildException)
            else MachineCode.COMPILATION_ERROR
        ),
        row=row,
        column=column,
    )


class _SyntaxErrorCollector(ErrorListener):
    def __init__(self, source: str) -> None:
        super().__init__()
        self.errors: list[CbuildException] = []
        self._source = source

    def syntaxError(  # noqa: N802
        self,
        recognizer: Recognizer,
        offending_symbol: Token | None,
        line: int,
        char_position_in_line: int,
        msg: str,
        e: RecognitionException | None,
    ) -> None:
        self.errors.append(
            CbuildException(
                message=_format_fatal_message(
                    line,
                    _gnu_make_syntax_message(self._source, line, msg, offending_symbol),
                ),
                error_type=ErrorType.SYNTAX,
                machine_code=MachineCode.COMPILATION_ERROR,
                row=line,
                column=char_position_in_line + 1,
            )
        )

    def reportAmbiguity(  # noqa: N802
        self,
        recognizer: Parser,
        dfa: DFA,
        start_index: int,
        stop_index: int,
        exact: bool,
        ambig_alts: set[int] | None,
        configs: ATNConfigSet,
    ) -> None:
        pass

    def reportAttemptingFullContext(  # noqa: N802
        self,
        recognizer: Parser,
        dfa: DFA,
        start_index: int,
        stop_index: int,
        conflicting_alts: set[int] | None,
        configs: ATNConfigSet,
    ) -> None:
        pass

    def reportContextSensitivity(  # noqa: N802
        self,
        recognizer: Parser,
        dfa: DFA,
        start_index: int,
        stop_index: int,
        prediction: int,
        configs: ATNConfigSet,
    ) -> None:
        pass


def parse_build_file(build_file: str) -> cbuildParser.CbuildfileContext:
    try:
        char_stream = InputStream(build_file)
        lexer = cbuildLexer(char_stream)
        lexer_errors = _SyntaxErrorCollector(build_file)

        lexer.removeErrorListeners()
        lexer.addErrorListener(lexer_errors)

        token_stream = CommonTokenStream(lexer)
        parser = cbuildParser(token_stream)
        parser_errors = _SyntaxErrorCollector(build_file)

        parser.removeErrorListeners()
        parser.addErrorListener(parser_errors)

        root = parser.cbuildfile()
        errors = [*lexer_errors.errors, *parser_errors.errors]

        if len(errors) > 0:
            raise errors[0]

        return root
    except Exception as error:
        raise _normalize_frontend_error(error, ErrorType.SYNTAX)


def compile(context: cbuildParser.CbuildfileContext) -> list[IR]:
    try:
        compiler = CBuildCompiler()
        return compiler.compile(context)
    except Exception as error:
        raise _normalize_frontend_error(error, ErrorType.SEMANTIC)


def frontend(build_file_meta: BuildFileMeta) -> list[IR]:
    try:
        set_build_file_name(build_file_meta.name)
        p_char_buffer = preprocess(build_file_meta.raw_content)
        preprocessed_program = p_char_buffer_to_string(p_char_buffer)
        context = parse_build_file(preprocessed_program)
        irs = compile(context)
        for ir in irs:
            ir.build_file_meta = build_file_meta
        return irs
    except Exception as error:
        raise _normalize_frontend_error(error, ErrorType.SYNTAX)
