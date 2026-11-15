from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import ExportIR


class ExportIREvaluator:
    def __init__(self, context: Env, ir: ExportIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> None:
        identifier = self._value_expansion_engine.expand(self._ir.identifier)
        if self._ir.prefix == "export":
            self._context.set_variable_exported(identifier, True)
        elif self._ir.prefix == "unexport":
            self._context.set_variable_exported(identifier, False)
