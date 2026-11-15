import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class SuffixRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        names = [
            name
            for name in re.split(
                r"\s+", self._value_expansion_engine.expand(function_ir.args[0]).strip()
            )
            if name
        ]

        def suffix(name: str) -> str:
            slash_index = name.rfind("/")
            dot_index = name.rfind(".")

            if dot_index <= slash_index:
                return ""

            return name[dot_index:]

        return " ".join(value for value in (suffix(name) for name in names) if value)
