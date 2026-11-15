from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import FunctionIR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class EvalRunner:
    def __init__(self, context: Env, active_lookups: set[str]) -> None:
        self._context: Final = context
        self._active_lookups: Final = active_lookups
        self._value_expansion_engine: Final = ValueExpansionEngine(
            context,
            active_lookups,
        )

    def run(self, function_ir: FunctionIR) -> str:
        raise CbuildException(
            column=function_ir.col,
            row=function_ir.row,
            error_type=ErrorType.PROCESS,
            machine_code=MachineCode.UNSUPPORTED,
            message=f"cbuild:{function_ir.row}: eval function is not supported",
        )
