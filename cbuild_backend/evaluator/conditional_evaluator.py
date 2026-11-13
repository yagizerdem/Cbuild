from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import IR, ConditionalIR


class ConditionalIREvaluator:
    def __init__(self, context: Env, ir: ConditionalIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> list[IR]:
        # identififer names
        expanded_left_condition: str = (
            self._ir.condition.left.exec(self._value_expansion_engine)
            if self._ir.condition is not None and self._ir.condition.left is not None
            else None
        ) or ""
        expanded_right_condition: str | None = (
            self._ir.condition.right.exec(self._value_expansion_engine)
            if self._ir.condition is not None and self._ir.condition.right is not None
            else None
        )

        if self._ir.kind == "ifeq":
            if expanded_left_condition == expanded_right_condition:
                return self._ir.then_branch
            else:
                return self._ir.else_branch

        if self._ir.kind == "ifneq":
            if expanded_left_condition != expanded_right_condition:
                return self._ir.then_branch
            else:
                return self._ir.else_branch

        if self._ir.kind == "ifdef":
            if self._is_defined(expanded_left_condition):
                return self._ir.then_branch
            else:
                return self._ir.else_branch

        if self._ir.kind == "ifndef":
            if not self._is_defined(expanded_left_condition):
                return self._ir.then_branch
            else:
                return self._ir.else_branch

        return []

    def _is_defined(self, identifier: str) -> bool:
        symbol_table_var = self._context.get_variable_recursive(identifier)
        if not symbol_table_var:
            return False
        if symbol_table_var.is_deferred():
            if len(symbol_table_var.value.parts) == 0:
                return False
            # should be at least one defferd part or non-empty raw value
            for part in symbol_table_var.value.parts:
                if (
                    part.kind == "variable-reference"
                    or part.kind == "function-call"
                    or (part.kind == "text" and len(part.lexeme) > 0)
                ):
                    return True

            return False
        return len(symbol_table_var.get_raw_value() or "") > 0
