from __future__ import annotations

import sys
from enum import IntEnum
from typing import ClassVar, cast, overload


class Cursor:
    class CursorState:
        def __init__(self, current: int = 0, row: int = 0, col: int = 0) -> None:
            self.current = current
            self.row = row
            self.col = col
            self.processed_row = 0
            self.processed_col = 0

    class Floc:
        def __init__(self, line: int = 0) -> None:
            self.line = line

    class CharMask:
        END = 1 << 0
        BLANK = 1 << 1
        NEWLINE = 1 << 2
        DOLLAR = 1 << 3
        SEMI = 1 << 4
        EQUALS = 1 << 5
        COLON = 1 << 6
        PERCENT = 1 << 7
        PIPE = 1 << 8
        DOT = 1 << 9
        COMMA = 1 << 10
        ESCAPE = 1 << 11
        PLUS = 1 << 12
        MINUS = 1 << 13
        ASTERISK = 1 << 14
        SLASH = 1 << 15
        DOUBLE_QUOTE = 1 << 16
        SINGLE_QUOTE = 1 << 17
        LEFT_BRACKET = 1 << 18
        RIGHT_BRACKET = 1 << 19
        LEFT_PAREN = 1 << 20
        RIGHT_PAREN = 1 << 21
        LEFT_CURLY_BRACE = 1 << 22
        RIGHT_CURLY_BRACE = 1 << 23
        UNDER_SCORE = 1 << 24
        HASH = 1 << 25
        GREATER = 1 << 26
        LESS = 1 << 27
        BANG = 1 << 28
        AMPERSAND = 1 << 29
        CARET = 1 << 30
        QUESTION = 1 << 31
        TILDE = 1 << 32
        BACK_TICK = 1 << 33
        BACK_SLASH = 1 << 34

    class Pchar[T]:
        class Context(IntEnum):
            YSHARP_HOOK = 0
            LUA_HOOK = 1
            CBUILD_HOOK = 2
            NORMAL = 3

        class EscapeType(IntEnum):
            BACK_SLASH = 0
            DOLLAR = 1

        @overload
        def __init__(self, row_or_c: str) -> None: ...
        @overload
        def __init__(self, row_or_c: str, col_or_escaped: bool) -> None: ...
        @overload
        def __init__(self, row_or_c: int, col_or_escaped: int, c: str) -> None: ...
        @overload
        def __init__(
            self, row_or_c: int, col_or_escaped: int, c: str, is_escaped: bool
        ) -> None: ...
        @overload
        def __init__(
            self,
            row_or_c: int,
            col_or_escaped: int,
            c: str,
            is_escaped: bool,
            escape_type: Cursor.Pchar.EscapeType,
            context: Cursor.Pchar.Context,
        ) -> None: ...
        def __init__(
            self,
            row_or_c: int | str,
            col_or_escaped: int | bool = 0,
            c: str = "\0",
            is_escaped: bool = False,
            escape_type: Cursor.Pchar.EscapeType | None = None,
            context: Cursor.Pchar.Context | None = None,
            meta: T | None = None,
        ) -> None:
            self.row: int  # src row
            self.col: int  # src col
            self.c: str
            self.is_escaped: bool
            if isinstance(row_or_c, str):
                self.row = 0
                self.col = 0
                self.c = row_or_c
                self.is_escaped = (
                    col_or_escaped if isinstance(col_or_escaped, bool) else False
                )
            else:
                self.row = row_or_c
                self.col = col_or_escaped
                self.c = c
                self.is_escaped = is_escaped
            self.processed_row = self.row
            self.processed_col = self.col
            self.escape_type = escape_type
            self.context = context
            self.meta = meta

        def __str__(self) -> str:
            escape_type = self.escape_type.name if self.escape_type is not None else None
            context = self.context.name if self.context is not None else None
            return f"row={self.row}, col={self.col}, processedRow={self.processed_row}, processedCol={self.processed_col}, c='{self.c}', isEscaped={self.is_escaped}, escapeType={escape_type}, context={context}"

    END: ClassVar[str] = "\0"

    _STOPCHAR_MAP: ClassVar[dict[str, int]] = {
        "\0": CharMask.END,

        " ": CharMask.BLANK,
        "\t": CharMask.BLANK,

        "\n": CharMask.NEWLINE,
        "\r": CharMask.NEWLINE,

        "$": CharMask.ESCAPE | CharMask.DOLLAR,
        ";": CharMask.SEMI,
        "=": CharMask.EQUALS,
        ":": CharMask.COLON,
        "%": CharMask.PERCENT,
        "|": CharMask.PIPE,
        ".": CharMask.DOT,
        ",": CharMask.COMMA,
        "\\": CharMask.ESCAPE | CharMask.BACK_SLASH,
        "+": CharMask.PLUS,
        "-": CharMask.MINUS,
        "*": CharMask.ASTERISK,
        "/": CharMask.SLASH,
        '"': CharMask.DOUBLE_QUOTE,
        "'": CharMask.SINGLE_QUOTE,

        "[": CharMask.LEFT_BRACKET,
        "]": CharMask.RIGHT_BRACKET,
        "(": CharMask.LEFT_PAREN,
        ")": CharMask.RIGHT_PAREN,
        "{": CharMask.LEFT_CURLY_BRACE,
        "}": CharMask.RIGHT_CURLY_BRACE,

        "_": CharMask.UNDER_SCORE,
        "#": CharMask.HASH,
        ">": CharMask.GREATER,
        "<": CharMask.LESS,
        "!": CharMask.BANG,
        "&": CharMask.AMPERSAND,
        "^": CharMask.CARET,
        "?": CharMask.QUESTION,
        "~": CharMask.TILDE,
        "`": CharMask.BACK_TICK,
    }

    EXPR_STOP: ClassVar[int] = (
        CharMask.END
        | CharMask.BLANK
        | CharMask.NEWLINE
        | CharMask.DOLLAR
        | CharMask.LEFT_PAREN
        | CharMask.RIGHT_PAREN
        | CharMask.LEFT_CURLY_BRACE
        | CharMask.RIGHT_CURLY_BRACE
        | CharMask.COLON
        | CharMask.COMMA
        | CharMask.EQUALS
        | CharMask.HASH
        | CharMask.PIPE
    )

    RECIPE_STOP: ClassVar[int] = CharMask.END | CharMask.NEWLINE | CharMask.DOLLAR

    ASSIGNMENT_LHS_STOP: ClassVar[int] = (
        CharMask.END
        | CharMask.BLANK
        | CharMask.NEWLINE
        | CharMask.EQUALS
        | CharMask.COLON
        | CharMask.PLUS
        | CharMask.QUESTION
        | CharMask.BANG
    )

    COMMENT_START: ClassVar[int] = CharMask.HASH

    _EOF_PCHAR: ClassVar[Cursor.Pchar] = Pchar(END)

    @staticmethod
    def get_stopchar_mask(key: str) -> int:
        return Cursor._STOPCHAR_MAP.get(key, 0)

    @staticmethod
    def mask_or(a: int, b: int) -> int:
        return a | b

    @staticmethod
    def any_set(v: int, mask: int) -> bool:
        return (v & mask) != 0

    @staticmethod
    def none_set(v: int, mask: int) -> bool:
        return not Cursor.any_set(v, mask)

    @staticmethod
    def mask_of(*masks: int) -> int:
        result = 0
        for mask in masks:
            result |= mask
        return result

    @staticmethod
    def stop_set(c_or_p: str | Cursor.Pchar, mask: int) -> bool:
        c = c_or_p if isinstance(c_or_p, str) else c_or_p.c
        return Cursor.any_set(Cursor.get_stopchar_mask(c), mask)

    @staticmethod
    def is_blank(c_or_p: str | Cursor.Pchar) -> bool:
        c = c_or_p if isinstance(c_or_p, str) else c_or_p.c
        return Cursor.stop_set(c, Cursor.CharMask.BLANK)

    @staticmethod
    def is_space(c_or_p: str | Cursor.Pchar) -> bool:
        c = c_or_p if isinstance(c_or_p, str) else c_or_p.c
        return Cursor.stop_set(
            c,
            Cursor.mask_or(Cursor.CharMask.NEWLINE, Cursor.CharMask.BLANK),
        )

    @overload
    @staticmethod
    def peek(text_or_buf: str, cursor_or_current: Cursor.CursorState) -> str: ...
    @overload
    @staticmethod
    def peek(
        text_or_buf: list[Cursor.Pchar], cursor_or_current: int
    ) -> Cursor.Pchar: ...
    @staticmethod
    def peek(
        text_or_buf: str | list[Cursor.Pchar],
        cursor_or_current: Cursor.CursorState | int,
    ) -> str | Cursor.Pchar:
        if isinstance(text_or_buf, str):
            cursor = cast(Cursor.CursorState, cursor_or_current)
            if cursor.current >= len(text_or_buf):
                return Cursor.END
            return text_or_buf[cursor.current]
        current = cast(int, cursor_or_current)
        if current >= len(text_or_buf):
            return Cursor._EOF_PCHAR
        return text_or_buf[current]

    @overload
    @staticmethod
    def advance(text_or_buf: str, cursor: Cursor.CursorState) -> str: ...
    @overload
    @staticmethod
    def advance(
        text_or_buf: list[Cursor.Pchar], cursor: Cursor.CursorState
    ) -> Cursor.Pchar: ...
    @staticmethod
    def advance(
        text_or_buf: str | list[Cursor.Pchar],
        cursor: Cursor.CursorState,
    ) -> str | Cursor.Pchar:
        if isinstance(text_or_buf, str):
            if cursor.current >= len(text_or_buf):
                return Cursor.END
            ch = text_or_buf[cursor.current]
            cursor.current += 1
            return ch
        p = Cursor.peek(text_or_buf, cursor.current)
        if cursor.current < len(text_or_buf):
            cursor.current += 1
        return p

    @overload
    @staticmethod
    def peek_next(
        text_or_buf: str, cursor_or_current: Cursor.CursorState
    ) -> str: ...
    @overload
    @staticmethod
    def peek_next(
        text_or_buf: list[Cursor.Pchar], cursor_or_current: int
    ) -> Cursor.Pchar: ...
    @staticmethod
    def peek_next(
        text_or_buf: str | list[Cursor.Pchar],
        cursor_or_current: Cursor.CursorState | int,
    ) -> str | Cursor.Pchar:
        if isinstance(text_or_buf, str):
            cursor = cast(Cursor.CursorState, cursor_or_current)
            if cursor.current + 1 >= len(text_or_buf):
                return Cursor.END
            return text_or_buf[cursor.current + 1]
        current = cast(int, cursor_or_current)
        if current + 1 >= len(text_or_buf):
            return Cursor._EOF_PCHAR
        return text_or_buf[current + 1]

    @staticmethod
    def match(
        text_or_buf: str | list[Cursor.Pchar],
        cursor: Cursor.CursorState,
        expected: str,
    ) -> bool:
        if isinstance(text_or_buf, str):
            if cursor.current >= len(text_or_buf):
                return False
            if text_or_buf[cursor.current] == expected:
                cursor.current += 1
                return True
            return False
        if Cursor.peek(text_or_buf, cursor.current).c == expected:
            cursor.current += 1
            return True
        return False

    @staticmethod
    def consume_blank(
        text_or_buf: str | list[Cursor.Pchar],
        cursor: Cursor.CursorState,
    ) -> None:
        if isinstance(text_or_buf, str):
            while Cursor.is_blank(Cursor.peek(text_or_buf, cursor)):
                cursor.current += 1
        else:
            while Cursor.is_blank(Cursor.peek(text_or_buf, cursor.current)):
                cursor.current += 1

    @staticmethod
    def consume_space(
        text_or_buf: str | list[Cursor.Pchar],
        cursor: Cursor.CursorState,
    ) -> None:
        if isinstance(text_or_buf, str):
            while Cursor.is_space(Cursor.peek(text_or_buf, cursor)):
                cursor.current += 1
        else:
            while Cursor.is_space(Cursor.peek(text_or_buf, cursor.current)):
                cursor.current += 1

    @overload
    @staticmethod
    def prev(
        buf_or_text: list[Cursor.Pchar], current_or_cursor: int
    ) -> Cursor.Pchar: ...
    @overload
    @staticmethod
    def prev(
        buf_or_text: list[Cursor.Pchar], current_or_cursor: Cursor.CursorState
    ) -> Cursor.Pchar: ...
    @overload
    @staticmethod
    def prev(buf_or_text: str, current_or_cursor: Cursor.CursorState) -> str: ...
    @staticmethod
    def prev(
        buf_or_text: list[Cursor.Pchar] | str,
        current_or_cursor: int | Cursor.CursorState,
    ) -> Cursor.Pchar | str:
        if isinstance(buf_or_text, str):
            cursor = cast(Cursor.CursorState, current_or_cursor)
            if cursor.current - 1 < 0:
                return Cursor.END
            return buf_or_text[cursor.current - 1]
        current = (
            current_or_cursor
            if isinstance(current_or_cursor, int)
            else current_or_cursor.current
        )
        if current - 1 < 0:
            return Cursor._EOF_PCHAR
        return buf_or_text[current - 1]

    @staticmethod
    def prev_char(buf: list[Cursor.Pchar], current: int) -> str:
        return Cursor.prev(buf, current).c

    @staticmethod
    def peek_char(buf: list[Cursor.Pchar], current: int) -> str:
        return Cursor.peek(buf, current).c

    @staticmethod
    def peek_next_char(buf: list[Cursor.Pchar], current: int) -> str:
        return Cursor.peek_next(buf, current).c

    @staticmethod
    def advance_char(buf: list[Cursor.Pchar], cursor: Cursor.CursorState) -> str:
        return Cursor.advance(buf, cursor).c

    @staticmethod
    def merge_p_buffer(
        buf1: list[Cursor.Pchar], buf2: list[Cursor.Pchar]
    ) -> list[Cursor.Pchar]:
        if len(buf1) == 0:
            return [*buf2]
        if len(buf2) == 0:
            return [*buf1]
        return [*buf1, *buf2]

    @staticmethod
    def to_p_buffer(string: str, line: int) -> list[Cursor.Pchar]:
        buf: list[Cursor.Pchar] = []
        for i in range(len(string)):
            buf.append(Cursor.Pchar(line, i + 1, string[i]))
        return buf

    @staticmethod
    def p_buffer_to_string(buf: list[Cursor.Pchar]) -> str:
        result = ""
        for p in buf:
            result += p.c
        return result

    @staticmethod
    def print_p_buffer(buf: list[Cursor.Pchar]) -> None:
        for p in buf:
            sys.stdout.write(p.c)

    @staticmethod
    def is_escaped(
        text_or_buf: str | list[Cursor.Pchar],
        char_index: int,
        escape_character: str,
    ) -> bool:
        i = char_index - 1
        counter = 0
        while i >= 0 and (
            text_or_buf[i] if isinstance(text_or_buf, str) else text_or_buf[i].c
        ) == escape_character:
            i -= 1
            counter += 1
        return counter % 2 == 1

    @staticmethod
    def is_escaped_backslash(
        text_or_buf: str | list[Cursor.Pchar], char_index: int
    ) -> bool:
        if isinstance(text_or_buf, str):
            return Cursor.is_escaped(text_or_buf, char_index, "\\")
        return Cursor.is_escaped(text_or_buf, char_index, "\\")
