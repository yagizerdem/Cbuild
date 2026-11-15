from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class SubstRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        from_ = self._value_expansion_engine.expand(function_ir.args[0])
        to = self._value_expansion_engine.expand(function_ir.args[1])
        text = self._value_expansion_engine.expand(function_ir.args[2])

        if len(from_) == 0:
            return text

        return text.replace(from_, to)
