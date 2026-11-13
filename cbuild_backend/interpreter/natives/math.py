import math as _math
from collections.abc import Callable
from types import MappingProxyType
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from cbuild_backend.interpreter.interpreter import LuaEngine

# Number.MAX_SAFE_INTEGER
_MAX_SAFE_INTEGER = 2**53 - 1


def _ieee(operation: Callable[..., float]) -> Callable[..., float]:
    # JavaScript Math returns NaN/Infinity where Python's math raises.
    def wrapper(*args: float) -> float:
        try:
            return operation(*args)
        except ValueError:
            return _math.nan
        except OverflowError:
            return _math.inf

    return wrapper


def _is_number(value: Any) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _is_integer(value: Any) -> bool:
    return _is_number(value) and _math.isfinite(value) and float(value).is_integer()


def _js_round(value: float) -> float:
    # Math.round: halfway values round towards +Infinity.
    return _math.floor(value + 0.5)


def _js_sign(value: float) -> float:
    return float((value > 0) - (value < 0)) if value != 0 else value


def _finite(value: float, name: str) -> float:
    """Native math uses finite doubles, not Lua's 64-bit integers."""
    if not _is_number(value) or not _math.isfinite(value):
        raise TypeError(f"{name}: expected a finite number")
    return value


def _result(value: float, name: str) -> float:
    if not _math.isfinite(value):
        raise ValueError(f"{name}: result is outside the finite real-number domain")
    return value


def _unary(name: str, operation: Callable[[float], float]) -> Callable[[float], float]:
    return lambda value: _result(_ieee(operation)(_finite(value, name)), name)


def _values_checked(values: tuple[float, ...], name: str, required: bool = True) -> None:
    if required and len(values) == 0:
        raise ValueError(f"{name}: expected at least one number")
    for value in values:
        _finite(value, name)


abs = _unary("abs", lambda value: _math.fabs(value))
floor = _unary("floor", _math.floor)
ceil = _unary("ceil", _math.ceil)
trunc = _unary("trunc", _math.trunc)
sign = _unary("sign", _js_sign)
sqrt = _unary("sqrt", _math.sqrt)
cbrt = _unary("cbrt", _math.cbrt)
exp = _unary("exp", _math.exp)
sin = _unary("sin", _math.sin)
cos = _unary("cos", _math.cos)
tan = _unary("tan", _math.tan)
asin = _unary("asin", _math.asin)
acos = _unary("acos", _math.acos)
deg = _unary("deg", lambda value: value * (180 / _math.pi))
rad = _unary("rad", lambda value: value * (_math.pi / 180))


def atan(y: float, x: float = 1) -> float:
    """Lua-style atan(y [, x]); angles are in radians."""
    return _math.atan2(_finite(y, "atan"), _finite(x, "atan"))


def pow(base: float, exponent: float) -> float:
    return _result(
        _ieee(_math.pow)(_finite(base, "pow"), _finite(exponent, "pow")), "pow"
    )


def log(value: float, base: float = _math.e) -> float:
    """Natural logarithm by default; the optional base must be positive and != 1."""
    _finite(value, "log")
    _finite(base, "log")
    if value <= 0 or base <= 0 or base == 1:
        raise ValueError("log: value and base must be positive; base must not be 1")
    return _result(_math.log(value) / _math.log(base), "log")


def min(*values: float) -> float:
    _values_checked(values, "min")
    result = values[0]
    for value in values[1:]:
        result = value if value < result else result
    return result


def max(*values: float) -> float:
    _values_checked(values, "max")
    result = values[0]
    for value in values[1:]:
        result = value if value > result else result
    return result


def sum(*values: float) -> float:
    """Compensated summation reduces cancellation error. The empty sum is zero."""
    _values_checked(values, "sum", False)
    total: float = 0
    correction: float = 0
    for value in values:
        next = _result(total + value, "sum")
        correction += (
            (total - next) + value
            if _math.fabs(total) >= _math.fabs(value)
            else (value - next) + total
        )
        total = next
    return _result(total + correction, "sum")


def mean(*values: float) -> float:
    _values_checked(values, "mean")
    return sum(*[value / len(values) for value in values])


def round(value: float, digits: float = 0) -> float:
    """Round to 0-15 decimal places; halfway values round away from zero."""
    _finite(value, "round")
    if not _is_integer(digits) or digits < 0 or digits > 15:
        raise ValueError("round: digits must be an integer between 0 and 15")
    factor = 10**digits
    scaled = _math.fabs(value) * factor
    # Scaling cannot improve precision beyond the safe integer range.
    if scaled >= _MAX_SAFE_INTEGER:
        return value
    return _js_sign(value) * _js_round(scaled) / factor


def clamp(value: float, lower: float, upper: float) -> float:
    _finite(value, "clamp")
    _finite(lower, "clamp")
    _finite(upper, "clamp")
    if lower > upper:
        raise ValueError("clamp: lower must not exceed upper")
    # Math.min(upper, Math.max(lower, value)); min/max are shadowed in this module.
    bounded = lower if value < lower else value
    return upper if upper < bounded else bounded


def lerp(start: float, end: float, t: float) -> float:
    """Linear interpolation; t outside [0, 1] extrapolates."""
    _finite(start, "lerp")
    _finite(end, "lerp")
    _finite(t, "lerp")
    if t == 0:
        return start
    if t == 1:
        return end
    return _result((1 - t) * start + t * end, "lerp")


def fmod(value: float, divisor: float) -> float:
    """Remainder with the dividend's sign, matching Lua math.fmod."""
    _finite(value, "fmod")
    _finite(divisor, "fmod")
    if divisor == 0:
        raise ValueError("fmod: divisor must not be zero")
    return _math.fmod(value, divisor)


# Arguments to aggregates are variadic numbers: math.sum(1, 2, 3).
MATH = MappingProxyType(
    {
        "pi": _math.pi,
        "e": _math.e,
        "abs": abs,
        "floor": floor,
        "ceil": ceil,
        "trunc": trunc,
        "sign": sign,
        "round": round,
        "min": min,
        "max": max,
        "sum": sum,
        "mean": mean,
        "pow": pow,
        "sqrt": sqrt,
        "cbrt": cbrt,
        "exp": exp,
        "log": log,
        "sin": sin,
        "cos": cos,
        "tan": tan,
        "asin": asin,
        "acos": acos,
        "atan": atan,
        "deg": deg,
        "rad": rad,
        "clamp": clamp,
        "lerp": lerp,
        "fmod": fmod,
    }
)


def register(engine: LuaEngine) -> None:
    """Installs a fresh math table in engines without standard libraries."""
    engine.global_.set("math", {**MATH})
