from typing import TYPE_CHECKING, Final, override

from cbuild_compiler.ir import (
    FunctionIR,
    ValueIR,
    text_part,
    var_ref_part,
)
from cbuild_parser.cbuildParser import cbuildParser
from cbuild_parser.cbuildVisitor import cbuildVisitor
from gnu_make_functions.compiler.i_compiler_base import I_compiler_base
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

# Lazy imports break the import cycle compile_fn -> CBuildCompiler -> dispatcher -> type -> compile_fn
lazy from cbuild_compiler.cbuild_compiler import CBuildCompiler
lazy from gnu_make_functions.make_function_dispatcher import make_function_dispatcher

if TYPE_CHECKING:
    from gnu_make_functions.type import MakeFunction


class compile_fn(cbuildVisitor, I_compiler_base):
    def __init__(self) -> None:
        super().__init__()
        self._dispatcher: Final = make_function_dispatcher()

    def defaultResult(self) -> ValueIR:
        return ValueIR()

    @override
    def compile(self, ctx: cbuildParser.FunctionContext, func: MakeFunction) -> FunctionIR:
        fn = FunctionIR(func.get_fn_name())
        self.check_arity(ctx, func)

        # comma sensitive argument parsing
        fn.args.append(ValueIR())
        arguments_ctx = ctx.arguments()
        for child in (arguments_ctx.children or []) if arguments_ctx is not None else []:
            if isinstance(child, cbuildParser.ArgumentContext):
                fn.args[len(fn.args) - 1] = self.visitArgument(child)
            elif child.getText() == ",":
                fn.args.append(ValueIR())

        return fn

    # def compile_comma_sensitive(
    #     self,
    #     ctx: cbuildParser.FunctionContext,
    #     func: MakeFunction,
    # ) -> FunctionIR:
    #     ir = FunctionIR(func.get_fn_name())
    #     self.check_arity(ctx, func)
    #     arguments_ctx = ctx.arguments()
    #     children = (arguments_ctx.children or []) if arguments_ctx is not None else []
    #     if len(children) == 0:
    #         return ir

    #     # argument() omits empty slots; direct comma children delimit every slot.

    #     return ir

    def visitArgument(self, ctx: cbuildParser.ArgumentContext) -> ValueIR:
        return self.visitExpressions(ctx.expressions())

    def visitExpressions(self, ctx: cbuildParser.ExpressionsContext) -> ValueIR:
        value = ValueIR()

        for ast_node in ctx.children or []:
            part_value = ast_node.accept(self)
            if part_value:
                value.parts.extend(part_value.parts)

        return value

    def visitExpression(self, ctx: cbuildParser.ExpressionContext) -> ValueIR:
        value = ValueIR()

        for atom_ctx in ctx.expression_atom():
            atom_value = self.visitExpression_atom(atom_ctx)
            value.parts.extend(atom_value.parts)

        return value

    def visitExpression_atom(self, ctx: cbuildParser.Expression_atomContext) -> ValueIR:
        value = ValueIR()

        if ctx.text() is not None:
            value.parts.append(text_part(ctx.text().getText()))
            return value

        if ctx.exprs_nested() is not None:
            name_expr = self.visitExprs_nested(ctx.exprs_nested())
            value.parts.append(var_ref_part(name_expr))
            return value

        if (
            ctx.function() is not None
            # and ctx.function().function_name() is not None
            # and not ctx.function().function_name().isEmpty()
        ):
            compiler = CBuildCompiler()
            fn_part = compiler.visitFunction(ctx.function())
            value.parts.append(fn_part)

            # if self._dispatcher.has(ctx.function().function_name().getText()):
            #     handler = self._dispatcher.get_handler(
            #         ctx.function().function_name().getText(),
            #     )
            #     function_ir = handler.compile(ctx.function())
            #     value.parts.append(function_call_part(function_ir))
            # else:
            #     var_name = ValueIR()
            #     var_name.parts.append(
            #         text_part(ctx.function().function_name().getText()),
            #     )
            #     value.parts.append(var_ref_part(var_name))

            return value

        return value

    def visitExprs_nested(self, ctx: cbuildParser.Exprs_nestedContext) -> ValueIR:
        value = ValueIR()

        for nested_ctx in ctx.expr_nested():
            nested_value = self.visitExpr_nested(nested_ctx)
            value.parts.extend(nested_value.parts)

        return value

    def visitExpr_nested(self, ctx: cbuildParser.Expr_nestedContext) -> ValueIR:
        value = ValueIR()

        for atom_ctx in ctx.expr_nested_atom():
            atom_value = self.visitExpr_nested_atom(atom_ctx)
            value.parts.extend(atom_value.parts)

        return value

    def visitExpr_nested_atom(self, ctx: cbuildParser.Expr_nested_atomContext) -> ValueIR:
        value = ValueIR()

        if ctx.text_nested() is not None:
            value.parts.append(text_part(ctx.text_nested().getText()))
            return value

        if ctx.exprs_nested() is not None:
            name_expr = self.visitExprs_nested(ctx.exprs_nested())
            value.parts.append(var_ref_part(name_expr))
            return value

        if ctx.function() is not None:
            compiler = CBuildCompiler()
            fn_part = compiler.visitFunction(ctx.function())
            value.parts.append(fn_part)

            # if self._dispatcher.has(ctx.function().function_name().getText()):
            #     handler = self._dispatcher.get_handler(
            #         ctx.function().function_name().getText(),
            #     )
            #     function_ir = handler.compile(ctx.function())
            #     value.parts.append(function_call_part(function_ir))
            # else:
            #     var_name = ValueIR()
            #     var_name.parts.append(
            #         text_part(ctx.function().function_name().getText()),
            #     )
            #     value.parts.append(var_ref_part(var_name))

            return value

        return value

    def visitWs(self, ctx: cbuildParser.WsContext) -> ValueIR:
        part = text_part(ctx.getText())
        val = ValueIR()
        val.parts.append(part)
        return val

    # def check_arity(self, ctx: cbuildParser.FunctionContext, func: MakeFunction) -> None:
    #     given = 0 if ctx.arguments() is None else len(ctx.arguments().argument())
    #     expected = func.arity()

    #     # variadic functions
    #     if expected == -1:
    #         return

    #     if given != expected:
    #         raise CbuildException(
    #             error_type=ErrorType.SEMANTIC,
    #             message=(
    #                 f"function '{func.get_fn_name()}' expects {expected} argument(s), "
    #                 f"but got {given}"
    #             ),
    #             row=ctx.start.line if ctx.start is not None else 0,
    #             column=(ctx.start.column if ctx.start is not None else 0) + 1,
    #             machine_code=MachineCode.FUNCTION_COMPILATION_ERROR,
    #         )

    # count arguments based on commas in the arugmet list $(subst ) -> 1 arg $(subst a,,banana preserves) -> 3 args
    # comma coutn + 1
    # edge case comma-coutn(0) + 1 = 1 arg
    def check_arity(self, ctx: cbuildParser.FunctionContext, func: MakeFunction) -> None:
        expected = func.arity()
        if expected == -1:
            return
        arguments_ctx = ctx.arguments()
        given = 0
        if arguments_ctx is not None:
            children = arguments_ctx.children or []
            comma_count = len([child for child in children if child.getText() == ","])
            given = comma_count + 1
        if given != expected:
            raise CbuildException(
                error_type=ErrorType.SEMANTIC,
                message=(
                    f"function '{func.get_fn_name()}' expects {expected} argument(s), "
                    f"but got {given}"
                ),
                row=ctx.start.line if ctx.start is not None else 0,
                column=(ctx.start.column if ctx.start is not None else 0) + 1,
                machine_code=MachineCode.FUNCTION_COMPILATION_ERROR,
            )
