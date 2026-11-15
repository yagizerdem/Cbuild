import locale
import math
import re
import unicodedata
from types import MappingProxyType
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from cbuild_backend.interpreter.interpreter import LuaEngine

# JavaScript RegExp flags that have a Python `re` counterpart.
_REGEX_FLAGS = {"i": re.IGNORECASE, "m": re.MULTILINE, "s": re.DOTALL}


def _compile(pattern: str, flags: str) -> re.Pattern[str]:
    compiled_flags = 0
    for flag in flags:
        if flag in _REGEX_FLAGS:
            compiled_flags |= _REGEX_FLAGS[flag]
        elif flag not in "gudyv":
            raise SyntaxError(f"Invalid flags supplied to RegExp constructor '{flags}'")
    # Named groups use the same (?<name>...) syntax in JavaScript and Python 3.12+.
    return re.compile(pattern, compiled_flags)


def _clamp_position(position: int | None, length: int, default: int) -> int:
    if position is None or (isinstance(position, float) and math.isnan(position)):
        return default
    return int(min(max(position, 0), length))


def _expand_replacement(replacement: str, match: re.Match[str]) -> str:
    """Applies JavaScript replacement patterns ($$, $&, $`, $', $n, $<name>)."""
    value = match.string
    result = ""
    index = 0
    while index < len(replacement):
        char = replacement[index]
        if char != "$" or index + 1 >= len(replacement):
            result += char
            index += 1
            continue
        nxt = replacement[index + 1]
        if nxt == "$":
            result += "$"
            index += 2
        elif nxt == "&":
            result += match.group(0)
            index += 2
        elif nxt == "`":
            result += value[: match.start()]
            index += 2
        elif nxt == "'":
            result += value[match.end() :]
            index += 2
        elif nxt == "<" and match.re.groupindex:
            close = replacement.find(">", index + 2)
            if close == -1:
                result += "$<"
                index += 2
            else:
                name = replacement[index + 2 : close]
                result += (match.group(name) or "") if name in match.re.groupindex else ""
                index = close + 1
        elif nxt.isdigit():
            two = replacement[index + 1 : index + 3]
            if len(two) == 2 and two.isdigit() and 0 < int(two) <= match.re.groups:
                result += match.group(int(two)) or ""
                index += 3
            elif 0 < int(nxt) <= match.re.groups:
                result += match.group(int(nxt)) or ""
                index += 2
            else:
                result += "$" + nxt
                index += 2
        else:
            result += "$"
            index += 1
    return result


def _match_array(match: re.Match[str]) -> list[str | None]:
    return [match.group(0), *match.groups()]


def length(value: str) -> int:
    return len(value)


def at(value: str, index: int) -> str | None:
    index = int(index)
    if index < -len(value) or index >= len(value):
        return None
    return value[index]


def char_at(value: str, index: int) -> str:
    index = int(index)
    return value[index] if 0 <= index < len(value) else ""


def char_code_at(value: str, index: int) -> float:
    index = int(index)
    return ord(value[index]) if 0 <= index < len(value) else math.nan


def code_point_at(value: str, index: int) -> int | None:
    index = int(index)
    return ord(value[index]) if 0 <= index < len(value) else None


def concat(value: str, *values: str) -> str:
    return value + "".join(str(item) for item in values)


def includes(value: str, search: str, position: int | None = None) -> bool:
    return search in value[_clamp_position(position, len(value), 0) :]


def index_of(value: str, search: str, position: int | None = None) -> int:
    return value.find(search, _clamp_position(position, len(value), 0))


def last_index_of(value: str, search: str, position: int | None = None) -> int:
    start = _clamp_position(position, len(value), len(value))
    return value.rfind(search, 0, start + len(search))


def starts_with(value: str, search: str, position: int | None = None) -> bool:
    return value.startswith(search, _clamp_position(position, len(value), 0))


def ends_with(value: str, search: str, position: int | None = None) -> bool:
    return value[: _clamp_position(position, len(value), len(value))].endswith(search)


def slice(value: str, start: int, end: int | None = None) -> str:
    return value[int(start) : None if end is None else int(end)]


def substring(value: str, start: int, length: int | None = None) -> str:
    begin = _clamp_position(start, len(value), 0)
    finish = _clamp_position(length, len(value), len(value))
    if begin > finish:
        begin, finish = finish, begin
    return value[begin:finish]


def _pad(value: str, length: int, fill: str | None) -> str:
    fill = " " if fill is None else fill
    missing = int(length) - len(value)
    if missing <= 0 or fill == "":
        return ""
    return (fill * (missing // len(fill) + 1))[:missing]


def pad_start(value: str, length: int, fill: str | None = None) -> str:
    return _pad(value, length, fill) + value


def pad_end(value: str, length: int, fill: str | None = None) -> str:
    return value + _pad(value, length, fill)


def repeat(value: str, count: int) -> str:
    if count < 0 or math.isinf(count):
        raise ValueError(f"Invalid count value: {count}")
    return value * int(count)


def trim(value: str) -> str:
    return value.strip()


def trim_start(value: str) -> str:
    return value.lstrip()


def trim_end(value: str) -> str:
    return value.rstrip()


def to_lower_case(value: str) -> str:
    return value.lower()


def to_upper_case(value: str) -> str:
    return value.upper()


def to_string(value: str) -> str:
    return str(value)


def value_of(value: str) -> str:
    return value


def is_well_formed(value: str) -> bool:
    return not any("\ud800" <= char <= "\udfff" for char in value)


def to_well_formed(value: str) -> str:
    return "".join("�" if "\ud800" <= char <= "\udfff" else char for char in value)


def to_locale_lower_case(value: str, locales: str | None = None) -> str:
    return value.lower()


def to_locale_upper_case(value: str, locales: str | None = None) -> str:
    return value.upper()


def locale_compare(
    value: str,
    other: str,
    locales: str | None = None,
    options: dict[str, Any] | None = None,
) -> int:
    result = locale.strcoll(value, other)
    return 1 if result > 0 else -1 if result < 0 else 0


def normalize(value: str, form: str | None = None) -> str:
    form = "NFC" if form is None else form
    if form not in ("NFC", "NFD", "NFKC", "NFKD"):
        raise ValueError("The normalization form should be one of NFC, NFD, NFKC, NFKD.")
    return unicodedata.normalize(form, value)


def split(value: str, separator: str | None = None, limit: int | None = None) -> list[str]:
    if separator is None:
        return [value]
    parts = list(value) if separator == "" else value.split(separator)
    return parts if limit is None else parts[: int(limit)]


def replace(
    value: str,
    search: str,
    replacement: str,
    flags: str | None = None,
) -> str:
    pattern = re.compile(re.escape(search)) if flags is None else _compile(search, flags)
    count = 0 if flags is not None and "g" in flags else 1
    return pattern.sub(lambda match: _expand_replacement(replacement, match), value, count)


def replace_all(
    value: str,
    search: str,
    replacement: str,
    flags: str | None = None,
) -> str:
    if flags is not None and "g" not in flags:
        raise TypeError("replaceAll must be called with a global RegExp")
    pattern = re.compile(re.escape(search)) if flags is None else _compile(search, flags)
    return pattern.sub(lambda match: _expand_replacement(replacement, match), value)


def match(value: str, pattern: str, flags: str = "") -> list[str | None] | None:
    compiled = _compile(pattern, flags)
    if "g" in flags:
        matches: list[str | None] = [found.group(0) for found in compiled.finditer(value)]
        return matches or None
    found = compiled.search(value)
    return _match_array(found) if found else None


def match_all(value: str, pattern: str, flags: str = "g") -> list[list[str | None]]:
    if "g" not in flags:
        raise TypeError("String.prototype.matchAll called with a non-global RegExp argument")
    return [_match_array(found) for found in _compile(pattern, flags).finditer(value)]


def search(value: str, pattern: str, flags: str = "") -> int:
    found = _compile(pattern, flags).search(value)
    return found.start() if found else -1


def from_char_code(*codes: int) -> str:
    units = b"".join((int(code) & 0xFFFF).to_bytes(2, "little") for code in codes)
    return units.decode("utf-16-le", errors="surrogatepass")


def from_code_point(*codes: int) -> str:
    for code in codes:
        if not float(code).is_integer() or code < 0 or code > 0x10FFFF:
            raise ValueError(f"Invalid code point {code}")
    return "".join(chr(int(code)) for code in codes)


def raw(segments: list[str], *substitutions: str) -> str:
    result = ""
    for index, segment in enumerate(segments):
        result += str(segment)
        if index + 1 < len(segments) and index < len(substitutions):
            result += str(substitutions[index])
    return result


def code_points(value: str) -> list[str]:
    return list(value)


def register(engine: LuaEngine) -> None:
    # string namespace
    # contains instnace and static methods for string manipulation
    engine.global_.set(
        "string",
        MappingProxyType(
            {
                "length": length,
                "at": at,
                "charAt": char_at,
                "charCodeAt": char_code_at,
                "codePointAt": code_point_at,
                "concat": concat,
                "includes": includes,
                "indexOf": index_of,
                "lastIndexOf": last_index_of,
                "startsWith": starts_with,
                "endsWith": ends_with,
                "slice": slice,
                "substring": substring,
                "padStart": pad_start,
                "padEnd": pad_end,
                "repeat": repeat,
                "trim": trim,
                "trimStart": trim_start,
                "trimEnd": trim_end,
                "toLowerCase": to_lower_case,
                "toUpperCase": to_upper_case,
                "toString": to_string,
                "valueOf": value_of,
                "isWellFormed": is_well_formed,
                "toWellFormed": to_well_formed,
                "toLocaleLowerCase": to_locale_lower_case,
                "toLocaleUpperCase": to_locale_upper_case,
                "localeCompare": locale_compare,
                "normalize": normalize,
                "split": split,
                "replace": replace,
                "replaceAll": replace_all,
                "match": match,
                "matchAll": match_all,
                "search": search,
                "fromCharCode": from_char_code,
                "fromCodePoint": from_code_point,
                "raw": raw,
                "codePoints": code_points,
            }
        ),
    )

    # Bind the string table as the __index of the Lua string metatable so
    # string methods can be called with method syntax, e.g. ("abc"):trim().
    global_ = engine.global_
    global_.set_metatable("", {"__index": global_.lua.globals()["string"]})
