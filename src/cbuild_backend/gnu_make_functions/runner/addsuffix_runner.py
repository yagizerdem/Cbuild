import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class AddsuffixRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        suffix_ir = function_ir.args[0]  # argument must be present checked in parser/compilation steps
        value_ir = function_ir.args[1]  # argument must be present checked in parser/compilation steps

        # handle expansion
        expanded_suffix = self._value_expansion_engine.expand(suffix_ir)
        expanded_value = self._value_expansion_engine.expand(value_ir)

        values = [value for value in re.split(r"\s+", expanded_value) if value]

        return " ".join(value + expanded_suffix for value in values)
