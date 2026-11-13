import re
from typing import Final, cast

from cbuild_backend.env import (
    VARIABLE_ORIGIN_PRIORITY_MAP,
    Env,
    SymbolTableVariable,
    VariableOrigin,
)
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.process import ProcessRunner
from cbuild_compiler.ir import (
    AssignmentIR,
    AssignmentPrefix,
    AssignmentType,
    TextPart,
    ValueIR,
    text_part,
)


class AssignmentIREvaluator:
    def __init__(self, context: Env, assignment_ir: AssignmentIR) -> None:
        self._context: Final = context
        self._value_expansion_engine: Final = ValueExpansionEngine(self._context)
        self._assignment_ir: Final = assignment_ir

    def evaluate(self) -> None:
        identifier: str = cast(ValueIR, self._assignment_ir.left).exec(
            self._value_expansion_engine,
        )

        prefix: AssignmentPrefix | None = self._assignment_ir.prefix

        if self._assignment_ir.type == AssignmentType.SIMPLE:
            value: str = cast(ValueIR, self._assignment_ir.right).exec(
                self._value_expansion_engine,
            )

            self._set_raw_variable(
                identifier,
                value,
                self._should_export(identifier, prefix),
            )
        elif self._assignment_ir.type == AssignmentType.POSIX_SIMPLE:
            value = cast(ValueIR, self._assignment_ir.right).exec(
                self._value_expansion_engine,
            )
            self._set_raw_variable(
                identifier,
                value,
                self._should_export(identifier, prefix),
            )
        elif self._assignment_ir.type == AssignmentType.CONDITIONAL:
            if not self._context.has_variable_recursive(identifier):
                self._set_deferred_variable(
                    identifier,
                    self._assignment_ir.right
                    if self._assignment_ir.right is not None
                    else ValueIR([TextPart("")]),
                    self._should_export(identifier, prefix),
                )
        elif self._assignment_ir.type == AssignmentType.APPEND:
            right = (
                self._assignment_ir.right
                if self._assignment_ir.right is not None
                else ValueIR([TextPart("")])
            )
            self._append_variable(identifier, right)

            self._context.set_variable_exported(
                identifier,
                self._should_export(identifier, prefix),
            )
        elif self._assignment_ir.type == AssignmentType.IMMEDIATE_ESCAPED:
            value = (
                self._assignment_ir.right.exec(self._value_expansion_engine)
                if self._assignment_ir.right is not None
                else None
            ) or ""
            self._set_deferred_variable(
                identifier,
                ValueIR([TextPart(value)]),
                self._should_export(identifier, prefix),
            )
        elif self._assignment_ir.type == AssignmentType.SHELL:
            command: str = (
                self._assignment_ir.right.exec(self._value_expansion_engine)
                if self._assignment_ir.right is not None
                else None
            ) or ""

            runner = ProcessRunner()
            result = runner.run(
                command,
                {
                    "output": "capture",
                },
            )

            value = re.sub(
                r"\n",
                " ",
                re.sub(r"\n+$", "", result.stdout.replace("\r\n", "\n")),
            )

            self._set_deferred_variable(
                identifier,
                ValueIR([TextPart(value)]),
                self._should_export(identifier, prefix),
            )
        elif self._assignment_ir.type == AssignmentType.RECURSIVE:
            self._set_deferred_variable(
                identifier,
                cast(ValueIR, self._assignment_ir.right),
                self._should_export(identifier, prefix),
            )

    def _set_raw_variable(
        self,
        identifier: str,
        value: str,
        is_exported: bool = False,
    ) -> None:
        has_variable = self._context.has_variable(identifier)
        prefix: AssignmentPrefix | None = self._assignment_ir.prefix
        variable_priority = (
            self._context.get_variable_priority(identifier) if has_variable else -1
        )
        prefix_priority = self._get_prefix_priority(prefix)

        if not has_variable:
            self._context.set_raw_variable(
                identifier,
                value,
                self._assignment_prefix_to_variable_origin(prefix),
                is_exported,
            )
            return

        if prefix_priority >= variable_priority:
            self._context.set_raw_variable(
                identifier,
                value,
                self._assignment_prefix_to_variable_origin(prefix),
                is_exported,
            )

    def _set_deferred_variable(
        self,
        identifier: str,
        value: ValueIR,
        is_exported: bool = False,
    ) -> None:
        has_variable = self._context.has_variable(identifier)
        prefix: AssignmentPrefix | None = self._assignment_ir.prefix
        variable_priority = (
            self._context.get_variable_priority(identifier) if has_variable else -1
        )
        prefix_priority = self._get_prefix_priority(prefix)

        if not has_variable:
            self._context.set_deferred_variable(
                identifier,
                value,
                self._assignment_prefix_to_variable_origin(prefix),
                is_exported,
            )
            return

        if prefix_priority >= variable_priority:
            self._context.set_deferred_variable(
                identifier,
                value,
                self._assignment_prefix_to_variable_origin(prefix),
                is_exported,
            )

    def _append_variable(self, identifier: str, right: ValueIR) -> None:
        has_variable = self._context.has_variable(identifier)
        prefix: AssignmentPrefix | None = self._assignment_ir.prefix
        variable_priority = (
            self._context.get_variable_priority(identifier) if has_variable else -1
        )
        prefix_priority = self._get_prefix_priority(prefix)

        if not has_variable:
            self._context.set_deferred_variable(
                identifier,
                right,
                self._assignment_prefix_to_variable_origin(prefix),
                self._should_export(identifier, prefix),
            )
            return

        if prefix_priority >= variable_priority:
            variable = cast(SymbolTableVariable, self._context.get_variable(identifier))
            if variable.is_deferred():
                cast(
                    SymbolTableVariable, self._context.get_variable(identifier)
                ).append_values(ValueIR([TextPart(" ")]))
                cast(
                    SymbolTableVariable, self._context.get_variable(identifier)
                ).append_values(right)
            else:
                cast(
                    SymbolTableVariable, self._context.get_variable(identifier)
                ).append_values(ValueIR([TextPart(" ")]))

                expanded_rvalue = self._value_expansion_engine.expand(right)

                cast(
                    SymbolTableVariable, self._context.get_variable(identifier)
                ).append_values(text_part(expanded_rvalue))

            self._context.set_variable_origin(
                cast(SymbolTableVariable, self._context.get_variable(identifier)),
                self._assignment_prefix_to_variable_origin(prefix),
            )

    def _assignment_prefix_to_variable_origin(
        self,
        prefix: AssignmentPrefix | None,
    ) -> VariableOrigin:
        match prefix:
            case "export override" | "override":
                return "override"
            case _:
                return "file"

    def _get_prefix_priority(self, prefix: AssignmentPrefix | None) -> int:
        match prefix:
            case "export override" | "override":
                return VARIABLE_ORIGIN_PRIORITY_MAP["override"]
            case _:
                return VARIABLE_ORIGIN_PRIORITY_MAP["file"]

    def _should_export(
        self,
        identifier: str,
        prefix: AssignmentPrefix | None,
    ) -> bool:
        if prefix == "unexport":
            return False

        if prefix == "export override" or prefix == "export" or prefix == "override export":
            return True

        if (
            self._context.has_variable(identifier)
            and cast(SymbolTableVariable, self._context.get_variable(identifier)).is_exported
        ):
            return True

        if prefix is None:
            return False

        return False
