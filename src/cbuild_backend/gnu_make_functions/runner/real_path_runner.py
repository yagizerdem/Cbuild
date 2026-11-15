import os
import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class RealPathRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        expanded_names = self._value_expansion_engine.expand(function_ir.args[0])
        names = [name for name in re.split(r"\s+", expanded_names.strip()) if name]
        resolved_paths: list[str] = []

        for name in names:
            try:
                resolved_paths.append(
                    os.path.realpath(
                        os.path.abspath(os.path.join(os.getcwd(), name)), strict=True
                    )
                )
            except Exception:
                # GNU Make's realpath returns an empty result for an unresolved name.
                pass

        return " ".join(resolved_paths)
