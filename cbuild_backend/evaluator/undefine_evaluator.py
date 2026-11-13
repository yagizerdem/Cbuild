from typing import Final, Literal

from cbuild_backend.env import Env, VariableOrigin
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import UndefineIR, UndefineSpecifier


class UndefineIREvaluator:
    def __init__(self, context: Env, ir: UndefineIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> None:
        identifier = self._value_expansion_engine.expand(self._ir.identifier)
        self._undefine_variable(identifier, self._ir.prefix)

    def _undefine_variable(self, identifier: str, prefix: UndefineSpecifier) -> None:
        symbol_table_var = self._context.get_variable(identifier)
        if symbol_table_var is None:
            return

        if prefix == "override undefine":
            self._context.remove_variable(identifier)

        if prefix == "undefine" and self._can_undefine_variable(
            symbol_table_var.origin, "undefine"
        ):
            self._context.remove_variable(identifier)

    def _can_undefine_variable(
        self,
        origin: VariableOrigin,
        prefix: Literal["undefine", "override undefine"],
    ) -> bool:
        if prefix == "override undefine":
            return True

        # only allow undefine for non-command-line and non-override origins
        return origin != "command-line" and origin != "override"
