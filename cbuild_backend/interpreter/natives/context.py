from types import MappingProxyType
from typing import TYPE_CHECKING, TypedDict

from cbuild_backend.env import Env, SymbolTableVariable
from cbuild_compiler.ir import TextPart, ValueIR

if TYPE_CHECKING:
    from cbuild_backend.interpreter.interpreter import LuaEngine

# Keys stay camelCase because Lua scripts pass them as table fields.
ExportOptions = TypedDict(
    "ExportOptions",
    {"isDeferred": bool, "defineIfAbsent": bool},
    total=False,
)


def _contains(context: Env, identifier: str) -> bool:
    return context.has_variable(identifier)


def _export(
    context: Env,
    identifier: str,
    value: str,
    options: ExportOptions | None = None,
) -> None:
    options = options or {}
    is_deferred = options.get("isDeferred", False)
    define_if_absent = options.get("defineIfAbsent", False)

    entry = (
        SymbolTableVariable(
            ValueIR([TextPart(value)]),
            "recursive",
        )
        if is_deferred
        else SymbolTableVariable(
            ValueIR([TextPart(value)]),
            "raw",
        )
    )

    if define_if_absent:
        context.define_variable_if_absent(identifier, entry)
    else:
        context.define_variable(identifier, entry)


def register(engine: LuaEngine, context: Env) -> None:
    engine.global_.set(
        "context",
        MappingProxyType(
            {
                "contains": _contains,
                "export": _export,
            }
        ),
    )
