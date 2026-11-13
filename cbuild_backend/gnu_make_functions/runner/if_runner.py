from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class IfRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        condition = self._value_expansion_engine.expand(function_ir.args[0])

        if condition != "":
            return self._value_expansion_engine.expand(function_ir.args[1])

        return (
            self._value_expansion_engine.expand(function_ir.args[2])
            if len(function_ir.args) == 3
            else ""
        )
