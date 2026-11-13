import errno
import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class FileRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        operation = self._value_expansion_engine.expand(function_ir.args[0]).strip()

        if operation.startswith(">>"):
            filename = operation[2:].strip()

            if len(filename) == 0:
                raise CbuildException(
                    error_type=ErrorType.SEMANTIC,
                    machine_code=MachineCode.FUNCTION_RUNTIME_ERROR,
                    message=f"file: invalid operation '{operation}'",
                    row=function_ir.row,
                    column=function_ir.col,
                )

            text = (
                self._value_expansion_engine.expand(function_ir.args[1])
                if len(function_ir.args) == 2
                else ""
            )

            with open(filename, "a", encoding="utf-8", newline="") as file:
                file.write(f"{text}\n")

            return ""

        if operation.startswith(">"):
            filename = operation[1:].strip()

            if len(filename) == 0:
                raise CbuildException(
                    error_type=ErrorType.SEMANTIC,
                    machine_code=MachineCode.FUNCTION_RUNTIME_ERROR,
                    message=f"file: invalid operation '{operation}'",
                    row=function_ir.row,
                    column=function_ir.col,
                )

            text = (
                self._value_expansion_engine.expand(function_ir.args[1])
                if len(function_ir.args) == 2
                else ""
            )

            with open(filename, "w", encoding="utf-8", newline="") as file:
                file.write(f"{text}\n")

            return ""

        if operation.startswith("<"):
            filename = operation[1:].strip()

            if len(filename) == 0:
                raise CbuildException(
                    error_type=ErrorType.SEMANTIC,
                    machine_code=MachineCode.FUNCTION_RUNTIME_ERROR,
                    message=f"file: invalid operation '{operation}'",
                    row=function_ir.row,
                    column=function_ir.col,
                )

            try:
                with open(filename, encoding="utf-8", newline="") as file:
                    return re.sub(r"\n$", "", file.read(), count=1)
            except Exception as error:
                if isinstance(error, OSError) and error.errno == errno.ENOENT:
                    return ""

                raise error

        raise CbuildException(
            error_type=ErrorType.SEMANTIC,
            machine_code=MachineCode.FUNCTION_RUNTIME_ERROR,
            message=f"file: invalid operation '{operation}'",
            row=function_ir.row,
            column=function_ir.col,
        )
