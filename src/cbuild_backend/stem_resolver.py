from dataclasses import dataclass

from preprocessor.cursor import Cursor


@dataclass
class _ParsedStemPattern:
    prefix: str
    suffix: str
    has_stem: bool


def _parse_pattern(pattern: str) -> _ParsedStemPattern:
    state = Cursor.CursorState()

    prefix = ""
    suffix = ""
    has_stem = False

    def append(value: str) -> None:
        nonlocal prefix, suffix
        if has_stem:
            suffix += value
        else:
            prefix += value

    while not Cursor.stop_set(Cursor.peek(pattern, state), Cursor.CharMask.END):
        current = Cursor.peek(pattern, state)

        if Cursor.stop_set(current, Cursor.CharMask.BACK_SLASH):
            backslash_count = 0

            while Cursor.stop_set(
                Cursor.peek(pattern, state), Cursor.CharMask.BACK_SLASH
            ):
                Cursor.advance(pattern, state)
                backslash_count += 1

            next = Cursor.peek(pattern, state)

            if not Cursor.stop_set(next, Cursor.CharMask.PERCENT):
                append("\\" * backslash_count)
                continue

            append("\\" * (backslash_count // 2))

            if backslash_count % 2 == 1:
                Cursor.advance(pattern, state)
                append("%")
                continue

            Cursor.advance(pattern, state)

            if not has_stem:
                has_stem = True
            else:
                suffix += "%"

            continue

        if Cursor.stop_set(current, Cursor.CharMask.PERCENT):
            Cursor.advance(pattern, state)

            if not has_stem:
                has_stem = True
            else:
                suffix += "%"

            continue

        append(Cursor.advance(pattern, state))

    return _ParsedStemPattern(
        prefix=prefix,
        suffix=suffix,
        has_stem=has_stem,
    )


class StemResolver:
    def resolve_stem(self, pattern: str, candidate: str) -> str | None:
        parsed = _parse_pattern(pattern)

        if not parsed.has_stem:
            return "" if parsed.prefix == candidate else None

        if not candidate.startswith(parsed.prefix):
            return None

        if not candidate.endswith(parsed.suffix):
            return None

        stem_length = len(candidate) - len(parsed.prefix) - len(parsed.suffix)

        if stem_length < 0:
            return None

        return candidate[len(parsed.prefix) : len(parsed.prefix) + stem_length]

    def has_stem(self, pattern: str) -> bool:
        return _parse_pattern(pattern).has_stem

    def match(self, pattern: str, candidate: str) -> bool:
        return self.resolve_stem(pattern, candidate) is not None

    def replace_stem(self, pattern: str, stem: str) -> str:
        if not self.has_stem(pattern):
            return pattern

        parsed = _parse_pattern(pattern)
        return parsed.prefix + stem + parsed.suffix
