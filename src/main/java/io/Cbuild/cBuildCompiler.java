package io.Cbuild;

public class cBuildCompiler extends cbuildBaseVisitor<Void> {



    @Override
    public Void visitAssignment(cbuildParser.AssignmentContext ctx) {
        if(ctx.pattern() != null) {
            ctx.pattern().accept(this);
            ctx.exprs_in_assign().accept(this);
        }
        else {
            ctx.assignment_prefix().accept(this);
            ctx.exprs_in_assign().accept(this);
        }

        return super.visitAssignment(ctx);
    }

    @Override
    public Void visitAssignment_prefix(cbuildParser.Assignment_prefixContext ctx) {
        return super.visitAssignment_prefix(ctx);
    }

    @Override
    public Void visitPattern(cbuildParser.PatternContext ctx) {
        if(ctx.identifier() != null) {
            String identifier = "";
            for(cbuildParser.IdentifierContext identifierContext : ctx.identifier()) {
                identifierContext.accept(this);
            }
        }
        return super.visitPattern(ctx);
    }

    @Override
    public Void visitExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx) {
        return super.visitExprs_in_assign(ctx);
    }

    @Override
    public Void visitExpr_in_assign(cbuildParser.Expr_in_assignContext ctx) {
        return super.visitExpr_in_assign(ctx);
    }

    @Override
    public Void visitExpr_in_assign_atom(cbuildParser.Expr_in_assign_atomContext ctx) {
        return super.visitExpr_in_assign_atom(ctx);
    }

    @Override
    public Void visitText_in_assign(cbuildParser.Text_in_assignContext ctx) {
        return super.visitText_in_assign(ctx);
    }

    @Override
    public Void visitChar_in_assign(cbuildParser.Char_in_assignContext ctx) {
        return super.visitChar_in_assign(ctx);
    }

    @Override
    public Void visitExpression(cbuildParser.ExpressionContext ctx) {
        return super.visitExpression(ctx);
    }

    @Override
    public Void visitExpression_atom(cbuildParser.Expression_atomContext ctx) {
        return super.visitExpression_atom(ctx);
    }

    @Override
    public Void visitExpr_nested(cbuildParser.Expr_nestedContext ctx) {
        return super.visitExpr_nested(ctx);
    }

    @Override
    public Void visitExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx) {
        return super.visitExpr_nested_atom(ctx);
    }

    @Override
    public Void visitFunction(cbuildParser.FunctionContext ctx) {
        return super.visitFunction(ctx);
    }

    @Override
    public Void visitFunction_name(cbuildParser.Function_nameContext ctx) {
        return super.visitFunction_name(ctx);
    }

    @Override
    public Void visitFunction_name_atom(cbuildParser.Function_name_atomContext ctx) {
        return super.visitFunction_name_atom(ctx);
    }

    @Override
    public Void visitArguments(cbuildParser.ArgumentsContext ctx) {
        return super.visitArguments(ctx);
    }

    @Override
    public Void visitArgument(cbuildParser.ArgumentContext ctx) {
        return super.visitArgument(ctx);
    }

    @Override
    public Void visitIdentifier(cbuildParser.IdentifierContext ctx) {
        if(!ctx.isEmpty()) {

        }
        return super.visitIdentifier(ctx);
    }

    @Override
    public Void visitIdentifier_atom(cbuildParser.Identifier_atomContext ctx) {
        return super.visitIdentifier_atom(ctx);
    }

}
