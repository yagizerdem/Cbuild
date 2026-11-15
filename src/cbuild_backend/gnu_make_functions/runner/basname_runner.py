import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class BasenameRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        base_names_value = function_ir.args[0]  # argument must be present checked in parser/compilation steps
        expanded_base_names = self._value_expansion_engine.expand(base_names_value)
        base_names = [name for name in re.split(r"\s+", expanded_base_names) if name]

        def base_name(name: str) -> str:
            slash_index = name.rfind("/")
            dot_index = name.rfind(".")

            if dot_index > slash_index:
                return name[:dot_index]
            return name

        return " ".join(base_name(name) for name in base_names)
