import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class JoinRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        list1 = [
            word
            for word in re.split(
                r"\s+", self._value_expansion_engine.expand(function_ir.args[0]).strip()
            )
            if word
        ]
        list2 = [
            word
            for word in re.split(
                r"\s+", self._value_expansion_engine.expand(function_ir.args[1]).strip()
            )
            if word
        ]
        joined: list[str] = []

        for index in range(max(len(list1), len(list2))):
            joined.append(
                f"{list1[index] if index < len(list1) else ''}"
                f"{list2[index] if index < len(list2) else ''}"
            )

        return " ".join(joined)
