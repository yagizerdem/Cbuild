import copy
import re
from typing import Literal, cast

from preprocessor.cursor import Cursor


def _consume_pchar(
    program: str,
    state: Cursor.CursorState,
    context: Context,
) -> Cursor.Pchar[Context]:
    ch = Cursor.peek(program, state)

    pch: Cursor.Pchar[Context] = Cursor.Pchar(ch)
    pch.row = state.row
    pch.col = state.col
    pch.meta = context

    Cursor.advance(program, state)

    if Cursor.stop_set(ch, Cursor.CharMask.NEWLINE):
        state.row += 1
        state.col = 0
    else:
        state.col += 1

    return pch


def _consume_hook(
    program: str,
    state: Cursor.CursorState,
) -> list[Cursor.Pchar[Context]]:
    result: list[Cursor.Pchar[Context]] = []
    start_row = state.row
    start_col = state.col

    depth = 0
    opened = False
    quote: str | None = None
    escaped = False

    while Cursor.peek(program, state) != Cursor.END:
        ch = Cursor.peek(program, state)
        result.append(_consume_pchar(program, state, "HOOK"))

        if quote is not None:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == quote:
                quote = None

            continue

        if ch == '"' or ch == "'":
            quote = ch
            continue

        if ch == "{":
            opened = True
            depth += 1
        elif ch == "}" and opened:
            depth -= 1

            if depth == 0:
                return result

    raise Exception(f"Unclosed hook block at {start_row}:{start_col + 1}")


type Context = Literal["HOOK", "NORMAL"]


def map_to_pchar(program: str) -> list[Cursor.Pchar[Context]]:
    state = Cursor.CursorState()

    state.row = 1
    state.col = 0

    result: list[Cursor.Pchar[Context]] = []
    hook_pattern = re.compile(r"^hook[ \t]*\{")

    offset = 0
    at_statement_start = True

    while Cursor.peek(program, state) != Cursor.END:
        ch = Cursor.peek(program, state)

        if at_statement_start and hook_pattern.search(program[offset:]):
            hook = _consume_hook(program, state)
            result.extend(hook)

            offset += len(hook)
            at_statement_start = False
            continue

        result.append(_consume_pchar(program, state, "NORMAL"))
        offset += 1

        if Cursor.stop_set(ch, Cursor.CharMask.NEWLINE):
            at_statement_start = True
        elif ch != " " and ch != "\t":
            at_statement_start = False

    return result


def _deep_copy_pchar[Context](
    pch: Cursor.Pchar[Context],
) -> Cursor.Pchar[Context]:
    return copy.deepcopy(pch)


def merge_continuation(
    pchars: list[Cursor.Pchar[Context]],
) -> list[Cursor.Pchar[Context]]:
    result: list[Cursor.Pchar[Context]] = []
    state = Cursor.CursorState()
    state.processed_row = 1  # antlr line  number starts with 1
    state.processed_col = 0  # antlr column number starts with 0

    while Cursor.peek_char(pchars, state.current) != Cursor.END:
        pch: Cursor.Pchar[Context] = cast(
            "Cursor.Pchar[Context]",
            Cursor.peek(
                pchars,
                state.current,
            ),
        )
        if (
            Cursor.stop_set(pch, Cursor.CharMask.BACK_SLASH)
            and Cursor.stop_set(
                Cursor.peek_next(pchars, state.current),
                Cursor.CharMask.NEWLINE,
            )
            and pch.meta == "NORMAL"
        ):
            state.current += 2  # consume contiunation and merge lines
            state.processed_col = 0  # reset column after merging lines
            state.processed_row += 1  # increment row after merging lines
            continue

        deep_copy = _deep_copy_pchar(pch)
        deep_copy.processed_col = state.processed_col
        deep_copy.processed_row = state.processed_row
        result.append(cast("Cursor.Pchar[Context]", deep_copy))

        if Cursor.stop_set(pch, Cursor.CharMask.NEWLINE):
            state.processed_col = 0
            state.processed_row += 1
        else:
            state.processed_col += 1
        state.current += 1

    return result


def preprocess(program: str) -> list[Cursor.Pchar[Context]]:
    if not program.endswith("\n"):
        program += "\n"

    if not program.strip().endswith(Cursor.END):
        program += Cursor.END

    mapped = map_to_pchar(program)
    result = merge_continuation(mapped)

    if len(result) > 0 and result[len(result) - 1].c == Cursor.END:
        result.pop()
    return result


def p_char_buffer_to_string(pchars: list[Cursor.Pchar[Context]]) -> str:
    return "".join([pch.c for pch in pchars])
