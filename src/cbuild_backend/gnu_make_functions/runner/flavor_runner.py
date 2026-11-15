from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class FlavorRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        identifier = self._value_expansion_engine.expand(function_ir.args[0]).strip()

        if not self._context.has_variable(identifier):
            return "undefined"

        variable = self._context.get_variable(identifier)
        if variable is None:
            return "undefined"

        if variable.is_deferred():
            return "recursive"

        return "simple"
