from typing import TYPE_CHECKING, override

from cbuild_compiler.ir import FunctionIR
from cbuild_parser.cbuildParser import cbuildParser
from gnu_make_functions.compiler.compile_fn import compile_fn
from gnu_make_functions.compiler.util import util

if TYPE_CHECKING:
    from gnu_make_functions.type import MakeFunction


class compile_and(compile_fn):
    @override
    def compile(
        self,
        ctx: cbuildParser.FunctionContext,
        func: MakeFunction,
    ) -> FunctionIR:
        ir = super().compile(ctx, func)
        util.clean_ws(ir)

        return ir
