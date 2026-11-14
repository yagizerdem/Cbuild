from collections.abc import Callable, Mapping
from typing import Any

from cbuild_backend.env import Env
from cbuild_backend.interpreter.natives.context import register as register_context
from cbuild_backend.interpreter.natives.fs import register as register_fs
from cbuild_backend.interpreter.natives.math import register as register_math
from cbuild_backend.interpreter.natives.os import register as register_os
from cbuild_backend.interpreter.natives.stdio import register as register_stdio
from cbuild_backend.interpreter.natives.string import register as register_string


class LuaGlobal:
    """Lua global table access that converts values between Python and Lua."""

    def __init__(self, lua: Any) -> None:
        self.lua = lua

    def set(self, name: str, value: Any) -> None:
        self.lua.globals()[name] = self.to_lua(value)

    def get(self, name: str) -> Any:
        return self.from_lua(self.lua.globals()[name])

    def set_metatable(self, value: Any, metatable: Mapping[str, Any]) -> None:
        # debug.setmetatable also works for non-table values such as strings.
        self.lua.globals()["debug"]["setmetatable"](
            self.to_lua(value), self.to_lua(metatable)
        )

    def to_lua(self, value: Any) -> Any:
        import lupa

        if lupa.lua_type(value) is not None:
            return value
        if isinstance(value, Mapping):
            table = self.lua.table()
            for key, item in value.items():
                table[key] = self.to_lua(item)
            return table
        if isinstance(value, (list, tuple)):
            table = self.lua.table()
            for index, item in enumerate(value):
                table[index + 1] = self.to_lua(item)
            return table
        if callable(value) and not isinstance(value, type):
            return self._wrap_function(value)
        return value

    def from_lua(self, value: Any) -> Any:
        import lupa

        if lupa.lua_type(value) != "table":
            return value
        keys = list(value.keys())
        if keys == list(range(1, len(keys) + 1)):
            return [self.from_lua(value[key]) for key in keys]
        return {key: self.from_lua(item) for key, item in value.items()}

    def _wrap_function(self, function: Callable[..., Any]) -> Callable[..., Any]:
        def wrapper(*args: Any) -> Any:
            return self.to_lua(function(*[self.from_lua(arg) for arg in args]))

        return wrapper

    def close(self) -> None:
        self.lua = None


class LuaEngine:
    """Lua runtime backed by lupa."""

    def __init__(self) -> None:
        # lupa is imported lazily so buildfiles without hooks do not need it.
        import lupa

        self.global_ = LuaGlobal(lupa.LuaRuntime(unpack_returned_tuples=True))

    def do_string(self, code: str) -> Any:
        return self.global_.lua.execute(code)


class Interpreter:
    def __init__(self) -> None:
        self._lua: LuaEngine | None = None
        self._context: Env | None = None

    def init(self, context: Env) -> None:
        self._context = context

    def run(self, code: str) -> None:
        if self._context is None:
            # programmatic error. the interpreter must be initialized with a context before running code.
            raise Exception("Interpreter context is not initialized.")

        try:
            self._lua = LuaEngine()

            register_stdio(self._lua)
            register_math(self._lua)
            register_context(self._lua, self._context)
            register_fs(self._lua)
            register_string(self._lua)
            register_os(self._lua)
            register_os(self._lua)

            self._lua.do_string(code)
        except Exception as error:
            raise error
        finally:
            if self._lua:
                self._lua.global_.close()
                self._lua = None
