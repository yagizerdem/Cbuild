import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR


class DirRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def _dir(self, file_name: str) -> str:
        last_slash = file_name.rfind("/")

        if last_slash == -1:
            return "./"

        return file_name[: last_slash + 1]

    def run(self, function_ir: FunctionIR) -> str:
        if len(function_ir.args) == 0:
            return ""

        expanded_arg = self._value_expansion_engine.expand(
            function_ir.args[0],
        )

        names = re.split(r"\s+", expanded_arg.strip())

        if len(names) == 1 and names[0] == "":
            return ""

        return " ".join(self._dir(name) for name in names)
