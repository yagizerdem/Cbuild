import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.globber import resolve_glob_pattern
from cbuild_compiler.ir import FunctionIR


class WildcardRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        wildcard_value = function_ir.args[0]  # argument must be present checked in parser/compilation steps
        expanded_wildcard = self._value_expansion_engine.expand(wildcard_value)
        glob_resolutions: list[str] = []
        for pattern in re.split(r"\s+", expanded_wildcard):
            if pattern.strip() == "":
                continue
            resolutions = resolve_glob_pattern(pattern)
            glob_resolutions.extend(resolutions)
        return " ".join(glob_resolutions)
