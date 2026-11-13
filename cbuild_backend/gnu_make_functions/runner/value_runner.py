from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR, ValueIR, ValuePart


class ValueRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        identifier = self._value_expansion_engine.expand(function_ir.args[0]).strip()
        variable = self._context.get_variable_recursive(identifier)

        if variable is None:
            return ""

        if not variable.is_deferred():
            return variable.get_raw_value() or ""

        return self._serialize(variable.value)

    def _serialize(self, value: ValueIR) -> str:
        def serialize_part(part: ValuePart) -> str:
            if part.kind == "text":
                return part.lexeme

            if part.kind == "variable-reference":
                paren = part.paren_type if part.paren_type is not None else "("

                return f"${paren}{self._serialize(part.name_expr)}{')' if paren == '(' else '}'}"

            args = ",".join(self._serialize(argument) for argument in part.function.args)

            return f"$({part.function.name}{f',{args}' if len(part.function.args) > 0 else ''})"

        return "".join(serialize_part(part) for part in value.parts)
