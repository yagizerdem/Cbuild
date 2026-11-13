from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class AndRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        last_expanded = ""
        for arg in function_ir.args:
            expanded = self._value_expansion_engine.expand(arg)
            if expanded == "":
                return ""
            last_expanded = expanded
        return last_expanded
