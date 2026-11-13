import os
import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class AbspathRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        path_ir = function_ir.args[0]  # argument must be present checked in parser/compilation steps
        expanded_path = self._value_expansion_engine.expand(path_ir)
        path_values = [value for value in re.split(r"\s+", expanded_path.strip()) if value]

        resolved_paths: list[str] = []
        for path_value in path_values:
            resolved_path = os.path.abspath(path_value)  # resolve by cwd
            resolved_paths.append(resolved_path)

        return " ".join(resolved_paths)
