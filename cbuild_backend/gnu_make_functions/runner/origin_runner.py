from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class OriginRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        identifier = self._value_expansion_engine.expand(function_ir.args[0]).strip()
        variable = self._context.get_variable_recursive(identifier)

        if variable is None:
            return "undefined"

        # normalize the origin value for display purposes
        match variable.origin:
            case "environment-overridden":
                return "environment override"
            case "command-line":
                return "command line"
            case _:
                return variable.origin
