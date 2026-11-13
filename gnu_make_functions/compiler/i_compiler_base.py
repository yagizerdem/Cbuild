from typing import TYPE_CHECKING, Protocol

from cbuild_compiler.ir import FunctionIR
from cbuild_parser.cbuildParser import cbuildParser

if TYPE_CHECKING:
    from gnu_make_functions.type import MakeFunction


class I_compiler_base(Protocol):
    def compile(self, ctx: cbuildParser.FunctionContext, func: MakeFunction) -> FunctionIR: ...
