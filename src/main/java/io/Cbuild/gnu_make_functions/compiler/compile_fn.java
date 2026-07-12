package io.Cbuild.gnu_make_functions.compiler;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildBaseVisitor;
import io.Cbuild.cbuildException;
import io.Cbuild.cbuildParser;
import io.Cbuild.gnu_make_functions.make_function_dispatcher;
import io.Cbuild.gnu_make_functions.type;
import org.antlr.v4.runtime.tree.ParseTree;


public class compile_fn extends cbuildBaseVisitor<cBuildIR.ValueIR > implements I_compiler_base {


    private final make_function_dispatcher dispatcher;

    public compile_fn() {
        this.dispatcher = new make_function_dispatcher();
    }

    @Override
    public cBuildIR.FunctionIR compile(cbuildParser.FunctionContext ctx, type.MakeFunction function) {
        int given =  ctx.arguments() == null ? 0 : ctx.arguments().argument().size();
        int expected = function.arity();

        if (given != expected) {
            throw new cbuildException(
                    cbuildException.ErrorType.SEMANTIC,
                    "function '" + function.getFnName() + "' expects " +
                            expected + " argument(s), but got " + given,
                    ctx.start.getLine(),
                    ctx.start.getCharPositionInLine() + 1
            );
        }

        cBuildIR.FunctionIR fn = new cBuildIR.FunctionIR(function.getFnName());

        for (cbuildParser.ArgumentContext argCtx : ctx.arguments().argument()) {
            fn.args.add(visitArgument(argCtx));
        }

        return fn;
    }

    @Override
    public cBuildIR.ValueIR visitArgument(cbuildParser.ArgumentContext ctx) {
        return visitExpressions(ctx.expressions());
    }

    @Override
    public cBuildIR.ValueIR visitExpressions(cbuildParser.ExpressionsContext ctx) {
        cBuildIR.ValueIR value = new cBuildIR.ValueIR();

        for (ParseTree ast_node : ctx.children) {
            cBuildIR.ValueIR partValue = ast_node.accept(this);
            value.parts.addAll(partValue.parts);
        }

        return value;
    }

    @Override
    public cBuildIR.ValueIR visitExpression(cbuildParser.ExpressionContext ctx) {
        cBuildIR.ValueIR value = new cBuildIR.ValueIR();

        for (cbuildParser.Expression_atomContext atomCtx : ctx.expression_atom()) {
            cBuildIR.ValueIR atomValue = visitExpression_atom(atomCtx);
            value.parts.addAll(atomValue.parts);
        }

        return value;
    }

    @Override
    public cBuildIR.ValueIR visitExpression_atom(cbuildParser.Expression_atomContext ctx) {
        cBuildIR.ValueIR value = new cBuildIR.ValueIR();

        if (ctx.text() != null) {
            value.parts.add(new cBuildIR.TextPart(ctx.text().getText()));
            return value;
        }

        if (ctx.exprs_nested() != null) {
            cBuildIR.ValueIR nameExpr = visitExprs_nested(ctx.exprs_nested());
            value.parts.add(new cBuildIR.VarRefPart(nameExpr));
            return value;
        }

        if (ctx.function() != null) {
            if(this.dispatcher.has(ctx.function().function_name().getText())) {
                make_function_dispatcher.MakeFunctionHandler handler =
                        this.dispatcher.getHandler(ctx.function().function_name().getText());
                cBuildIR.FunctionIR functionIR = (cBuildIR.FunctionIR ) handler.compile(ctx.function());
                value.parts.add(new cBuildIR.FunctionCallPart(functionIR));
            }
            else {
                cBuildIR.ValueIR varName = new cBuildIR.ValueIR();
                varName.parts.add(new cBuildIR.TextPart(ctx.function().function_name().getText()));
                value.parts.add(new cBuildIR.VarRefPart(varName));
            }

            return value;
        }

        return value;
    }

    @Override
    public cBuildIR.ValueIR visitExprs_nested(cbuildParser.Exprs_nestedContext ctx) {
        cBuildIR.ValueIR value = new cBuildIR.ValueIR();

        for (cbuildParser.Expr_nestedContext nestedCtx : ctx.expr_nested()) {
            cBuildIR.ValueIR nestedValue = visitExpr_nested(nestedCtx);
            value.parts.addAll(nestedValue.parts);
        }

        return value;
    }

    @Override
    public cBuildIR.ValueIR visitExpr_nested(cbuildParser.Expr_nestedContext ctx) {
        cBuildIR.ValueIR value = new cBuildIR.ValueIR();

        for (cbuildParser.Expr_nested_atomContext atomCtx : ctx.expr_nested_atom()) {
            cBuildIR.ValueIR atomValue = visitExpr_nested_atom(atomCtx);
            value.parts.addAll(atomValue.parts);
        }

        return value;
    }

    @Override
    public cBuildIR.ValueIR visitExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx) {
        cBuildIR.ValueIR value = new cBuildIR.ValueIR();

        if (ctx.text_nested() != null) {
            value.parts.add(new cBuildIR.TextPart(ctx.text_nested().getText()));
            return value;
        }

        if (ctx.exprs_nested() != null) {
            cBuildIR.ValueIR nameExpr = visitExprs_nested(ctx.exprs_nested());
            value.parts.add(new cBuildIR.VarRefPart(nameExpr));
            return value;
        }

        if (ctx.function() != null) {

            if(this.dispatcher.has(ctx.function().function_name().getText())) {
                make_function_dispatcher.MakeFunctionHandler handler =
                        this.dispatcher.getHandler(ctx.function().function_name().getText());
                cBuildIR.FunctionIR functionIR = (cBuildIR.FunctionIR ) handler.compile(ctx.function());
                value.parts.add(new cBuildIR.FunctionCallPart(functionIR));
            }
            else {
                cBuildIR.ValueIR varName = new cBuildIR.ValueIR();
                varName.parts.add(new cBuildIR.TextPart(ctx.function().function_name().getText()));
                value.parts.add(new cBuildIR.VarRefPart(varName));
            }

            return value;
        }

        return value;
    }

    @Override
    public cBuildIR.ValueIR visitWs(cbuildParser.WsContext ctx) {
        cBuildIR.TextPart part = new cBuildIR.TextPart(ctx.getText());
        cBuildIR.ValueIR val = new cBuildIR.ValueIR();
        val.parts.add(part);
        return val;
    }

}