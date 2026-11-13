import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class ForeachRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        variable_name = self._value_expansion_engine.expand(function_ir.args[0]).strip()
        words = [
            word
            for word in re.split(
                r"\s+", self._value_expansion_engine.expand(function_ir.args[1]).strip()
            )
            if word
        ]
        previous_variable = self._context.get_variable(variable_name)
        expanded_text: list[str] = []

        try:
            for word in words:
                self._context.set_raw_variable(variable_name, word)
                expanded_text.append(
                    self._value_expansion_engine.expand(function_ir.args[2])
                )
        finally:
            if previous_variable:
                self._context.set_variable(variable_name, previous_variable)
            else:
                self._context.delete_variable(variable_name)

        return " ".join(expanded_text)
