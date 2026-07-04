package io.Cbuild;

import io.Cbuild.gnu_make_functions.make_function_dispatcher;

import java.util.ArrayList;
import java.util.List;

public class cBuildCompiler extends cbuildBaseVisitor<Object> {

    private final make_function_dispatcher dispatcher;

    public List<cBuildIR.IR> cBuildIR;

    public cBuildCompiler() {
        this.dispatcher = new make_function_dispatcher();
        this.cBuildIR = new ArrayList<>();
    }

    public List<cBuildIR.IR> compile(cbuildParser.CbuildfileContext cbuildfileContext) {
        this.cBuildIR = new ArrayList<>(); // clear
        cbuildfileContext.accept(this);
        return this.cBuildIR;
    }

    @Override
    public Object visitAssignment(cbuildParser.AssignmentContext ctx) {
        if(ctx.pattern() != null) {
            String identifier = (String) ctx.pattern().accept(this);
            ctx.exprs_in_assign().accept(this);
        }
        else {
            ctx.assignment_prefix().accept(this);
            ctx.exprs_in_assign().accept(this);
        }

        return super.visitAssignment(ctx);
    }

    @Override
    public Object visitAssignment_prefix(cbuildParser.Assignment_prefixContext ctx) {
        return super.visitAssignment_prefix(ctx);
    }

    @Override
    public Object visitPattern(cbuildParser.PatternContext ctx) {
        if(ctx.identifier() != null && !ctx.identifier().isEmpty()) {
            StringBuilder identifier = new StringBuilder();
            for(cbuildParser.IdentifierContext identifierContext : ctx.identifier()) {
                identifier.append((String) identifierContext.accept(this));
            }
            return identifier.toString();
        }
        if(ctx.function() != null && !ctx.function().isEmpty()) {
            for(cbuildParser.FunctionContext functionContext : ctx.function()) {
                functionContext.accept(this);
            }
        }
        return "";
    }

    @Override
    public Object visitExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx) {
        return super.visitExprs_in_assign(ctx);
    }

    @Override
    public Object visitExpr_in_assign(cbuildParser.Expr_in_assignContext ctx) {
        return super.visitExpr_in_assign(ctx);
    }

    @Override
    public Object visitExpr_in_assign_atom(cbuildParser.Expr_in_assign_atomContext ctx) {
        return super.visitExpr_in_assign_atom(ctx);
    }

    @Override
    public Object visitText_in_assign(cbuildParser.Text_in_assignContext ctx) {
        return super.visitText_in_assign(ctx);
    }

    @Override
    public Object visitChar_in_assign(cbuildParser.Char_in_assignContext ctx) {
        return super.visitChar_in_assign(ctx);
    }

    @Override
    public Object visitExpression(cbuildParser.ExpressionContext ctx) {
        return super.visitExpression(ctx);
    }

    @Override
    public Object visitExpression_atom(cbuildParser.Expression_atomContext ctx) {
        return super.visitExpression_atom(ctx);
    }

    @Override
    public Object visitExpr_nested(cbuildParser.Expr_nestedContext ctx) {
        return super.visitExpr_nested(ctx);
    }

    @Override
    public Object visitExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx) {
        return super.visitExpr_nested_atom(ctx);
    }

    @Override
    public Object visitFunction(cbuildParser.FunctionContext ctx) {
        String name = ctx.function_name().getText();
        if(dispatcher.has(name)) {
            make_function_dispatcher.MakeFunctionHandler handler = dispatcher.getHandler(name);
            cBuildIR.FunctionIR functionIR = handler.compile(ctx);
            cBuildIR.FunctionCallPart callee = new cBuildIR.FunctionCallPart(functionIR);
            return callee;
        }

        cBuildIR.ValueIR value = new cBuildIR.ValueIR();
        value.parts.add(new cBuildIR.TextPart(ctx.function_name().getText()));
        cBuildIR.VarRefPart ref = new cBuildIR.VarRefPart(value);
        return ref;
    }

    @Override
    public Object visitFunction_name(cbuildParser.Function_nameContext ctx) {
        return super.visitFunction_name(ctx);
    }

    @Override
    public Object visitFunction_name_atom(cbuildParser.Function_name_atomContext ctx) {
        return super.visitFunction_name_atom(ctx);
    }

    @Override
    public Object visitArguments(cbuildParser.ArgumentsContext ctx) {
        return super.visitArguments(ctx);
    }

    @Override
    public Object visitArgument(cbuildParser.ArgumentContext ctx) {
        return super.visitArgument(ctx);
    }

    @Override
    public Object visitIdentifier(cbuildParser.IdentifierContext ctx) {
        return ctx.getText();
    }

    @Override
    public Object visitIdentifier_atom(cbuildParser.Identifier_atomContext ctx) {
        return ctx.getText();
    }

}
