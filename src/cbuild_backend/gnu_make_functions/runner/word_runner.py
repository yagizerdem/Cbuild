import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class WordRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        match = re.match(
            r"[+-]?\d+", self._value_expansion_engine.expand(function_ir.args[0]).strip()
        )
        index = int(match.group()) if match else None

        if index is None or index < 1:
            return ""

        words = [
            word
            for word in re.split(
                r"\s+", self._value_expansion_engine.expand(function_ir.args[1]).strip()
            )
            if word
        ]

        return words[index - 1] if index - 1 < len(words) else ""
