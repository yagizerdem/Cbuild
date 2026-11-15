from typing import TYPE_CHECKING, override

from cbuild_compiler.ir import FunctionIR
from cbuild_parser.cbuildParser import cbuildParser
from gnu_make_functions.compiler.compile_fn import compile_fn
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

if TYPE_CHECKING:
    from gnu_make_functions.type import MakeFunction


class compile_wordlist(compile_fn):
    @override
    def compile(
        self,
        ctx: cbuildParser.FunctionContext,
        func: MakeFunction,
    ) -> FunctionIR:
        ir = super().compile(ctx, func)

        if len(ir.args[0].parts) != 1:
            raise CbuildException(
                error_type=ErrorType.SEMANTIC,
                message=(
                    "buildFile: wordlist: expected exactly one expression as the first argument"
                ),
                row=ctx.start.line if ctx.start is not None else 0,
                column=(ctx.start.column if ctx.start is not None else 0) + 1,
                machine_code=MachineCode.FUNCTION_COMPILATION_ERROR,
            )

        if len(ir.args) != 3:
            raise CbuildException(
                error_type=ErrorType.SEMANTIC,
                message="buildFile: wordlist: expected exactly 3 arguments: start, end, text",
                row=ctx.start.line if ctx.start is not None else 0,
                column=(ctx.start.column if ctx.start is not None else 0) + 1,
                machine_code=MachineCode.FUNCTION_COMPILATION_ERROR,
            )

        return ir
