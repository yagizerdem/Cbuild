from typing import TYPE_CHECKING, override

from cbuild_compiler.ir import FunctionIR, ValueIR
from cbuild_parser.cbuildParser import cbuildParser
from gnu_make_functions.compiler.compile_fn import compile_fn
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

if TYPE_CHECKING:
    from gnu_make_functions.type import MakeFunction


class compile_call(compile_fn):
    @override
    def compile(
        self,
        ctx: cbuildParser.FunctionContext,
        func: MakeFunction,
    ) -> FunctionIR:
        ir = super().compile(ctx, func)

        return ir
