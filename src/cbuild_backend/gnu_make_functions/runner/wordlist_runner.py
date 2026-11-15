import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

# Number.MAX_SAFE_INTEGER
_MAX_SAFE_INTEGER = 2**53 - 1


class WordListRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def _parse_index(self, ir: FunctionIR, value: str, name: str) -> int:
        trimmed = value.strip()

        if not re.fullmatch(r"\d+", trimmed):
            raise CbuildException(
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.FUNCTION_RUNTIME_ERROR,
                message=f"wordlist: {name} argument '{trimmed}' is not a valid positive integer",
                column=ir.col,
                row=ir.row,
            )

        index = int(trimmed)

        if index > _MAX_SAFE_INTEGER or index < 1:
            raise CbuildException(
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.FUNCTION_RUNTIME_ERROR,
                message=f"wordlist: {name} argument '{trimmed}' is not a valid positive integer",
                column=ir.col,
                row=ir.row,
            )

        return index

    def run(self, function_ir: FunctionIR) -> str:
        start = self._parse_index(
            function_ir,
            self._value_expansion_engine.expand(function_ir.args[0]),
            "start",
        )

        end = self._parse_index(
            function_ir,
            self._value_expansion_engine.expand(function_ir.args[1]),
            "end",
        )

        if start > end:
            return ""

        expanded = self._value_expansion_engine.expand(function_ir.args[2])

        words = re.split(r"\s+", expanded.strip()) if expanded.strip() else []

        return " ".join(words[start - 1 : end])
