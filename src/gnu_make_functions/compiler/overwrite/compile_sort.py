from typing import TYPE_CHECKING, override

from cbuild_compiler.ir import FunctionIR
from cbuild_parser.cbuildParser import cbuildParser
from gnu_make_functions.compiler.compile_fn import compile_fn
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

if TYPE_CHECKING:
    from gnu_make_functions.type import MakeFunction


class compile_sort(compile_fn):
    @override
    def compile(
        self,
        ctx: cbuildParser.FunctionContext,
        func: MakeFunction,
    ) -> FunctionIR:
        ir = super().compile(ctx, func)

        if len(ir.args) != 1:
            raise CbuildException(
                column=ctx.start.column if ctx.start is not None else 0,
                row=ctx.start.line if ctx.start is not None else 0,
                error_type=ErrorType.SEMANTIC,
                machine_code=MachineCode.FUNCTION_COMPILATION_ERROR,
                message="buildFile: sort: expected exactly 1 argument: list",
            )

        return ir
