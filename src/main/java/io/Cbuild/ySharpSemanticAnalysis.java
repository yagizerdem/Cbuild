package io.Cbuild;

import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.Variable;
import ysharp.treewalk.parser.Expr;
import ysharp.treewalk.parser.Parser;
import ysharp.treewalk.parser.Stmt;

import java.util.Map;

public class ySharpSemanticAnalysis implements Expr.Visitor<Variable.Variant>,
        Stmt.Visitor {

    public static void restrictFeatures(Parser.Program program) {
        ySharpSemanticAnalysis analysis = new ySharpSemanticAnalysis();

        if (!program.useDeclaration.isEmpty()) {
            throw new YsharpException(
                    YsharpException.YsharpErrorType.SEMANTIC,
                    -1,
                    "Use declarations are not supported in Cbuild."
            );
        }

        for (Stmt stmt : program.program) {
            stmt.accept(analysis);
        }
    }

    // expr visitor

    @Override
    public Variable.Variant visitBinaryExpr(Expr.BinaryExpr expr) {
        expr.left.accept(this);
        expr.right.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitUnaryExpr(Expr.UnaryExpr expr) {
        expr.expr.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitPipeExpr(Expr.PipeExpr expr) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Pipe expressions are not supported by Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    @Override
    public Variable.Variant visitTernaryExpr(Expr.TernaryExpr expr) {
        expr.condition.accept(this);
        expr.thenBranch.accept(this);
        expr.elseBranch.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitPostfixExpr(Expr.PostfixExpr expr) {
        expr.operand.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitAssignmentExpr(Expr.AssignmentExpr expr) {
        expr.target.accept(this);
        expr.value.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitLogicalExpr(Expr.LogicalExpr expr) {
        expr.left.accept(this);
        expr.right.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitGroupingExpr(Expr.GroupingExpr expr) {
        expr.expression.accept(this);
        return null;
    }

    @Override
    public Variable.Variant visitGetExpr(Expr.GetExpr expr) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Property access expressions are not supported in Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    @Override
    public Variable.Variant visitSetExpr(Expr.SetExpr expr) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Property assignment expressions are not supported in Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    @Override
    public Variable.Variant visitCallExpr(Expr.CallExpr expr) {
        expr.callee.accept(this);
        for(Expr arg : expr.arguments) {
            arg.accept(this);
        }
        return null;
    }

    @Override
    public Variable.Variant visitLiteralExpr(Expr.LiteralExpr expr) {
        return null;
    }

    @Override
    public Variable.Variant visitVariableExpr(Expr.VariableExpr expr) {
        return null;
    }

    @Override
    public Variable.Variant visitArrayInitializerExpr(Expr.ArrayInitializerExpr expr) {
        for (Expr elem : expr.elements) {
            elem.accept(this);
        }
        return null;
    }

    @Override
    public Variable.Variant visitMapInitializerExpr(Expr.MapInitializerExpr expr) {
        for (Expr.MapInitializerExpr.Entry entry : expr.entries) {
            entry.value.accept(this);
        }
        return null;
    }

    @Override
    public Variable.Variant visitLambdaExpr(Expr.LambdaExpr expr) {
        if(expr.expr != null) {
            expr.expr.accept(this);
        }

        expr.body.accept(this);

        return null;
    }

    @Override
    public Variable.Variant visitNexExpr(Expr.NewExpr expr) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Object instantiation expressions are not supported in Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    @Override
    public Variable.Variant visitSuperCallExpr(Expr.SuperCallExpr expr) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Super constructor calls are not supported in Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    @Override
    public Variable.Variant visitRangeExpr(Expr.RangeExpr expr) {
        expr.start.accept(this);
        expr.end.accept(this);
        return null;
    }

    // stmt visitor

    @Override
    public void visitPrintStmt(Stmt.PrintStmt stmt) {
        stmt.expr.accept(this);
    }

    @Override
    public void visitPrintlnStmt(Stmt.PrintlnStmt stmt) {
        stmt.expr.accept(this);
    }

    @Override
    public void visitBlockStmt(Stmt.BlockStmt stmt) {
        for(Stmt s : stmt.stmtList) {
            s.accept(this);
        }
    }

    @Override
    public void visitIfStmt(Stmt.IfStmt stmt) {
        stmt.condition.accept(this);
        for(Stmt.IfStmt.ElifStmt s : stmt.elifStmtList) {
            s.condition.accept(this);
            s.then.accept(this);
        }
        if(stmt.else_ != null) {
            stmt.else_.accept(this);
        }
    }

    @Override
    public void visitWhileStmt(Stmt.WhileStmt stmt) {
        stmt.condition.accept(this);
        stmt.stmt.accept(this);
    }

    @Override
    public void visitExprStmt(Stmt.ExprStmt stmt) {
        stmt.expr.accept(this);
    }

    @Override
    public void visitForStmt(Stmt.ForStmt stmt) {
        if(stmt.initializer != null) stmt.initializer.accept(this);
        if(stmt.condition != null) stmt.condition.accept(this);
        if(stmt.increment != null) stmt.increment.accept(this);

        if(stmt.body != null) stmt.body.accept(this);
    }

    @Override
    public void visitForInStmt(Stmt.ForInStmt stmt) {
        if(stmt.declaration != null) stmt.declaration.initializer.accept(this);
        if(stmt.iterable != null) stmt.iterable.accept(this);

        if(stmt.body != null) stmt.body.accept(this);
    }

    @Override
    public void visitForEachStmt(Stmt.ForEachStmt stmt) {
        if(stmt.declaration != null) stmt.declaration.initializer.accept(this);
        if(stmt.iterable != null) stmt.iterable.accept(this);

        if(stmt.body != null) stmt.body.accept(this);
    }

    @Override
    public void visitBreakStmt(Stmt.BreakStmt stmt) {
    }

    @Override
    public void visitContinueStmt(Stmt.ContinueStmt stmt) {
    }

    @Override
    public void visitReturnStmt(Stmt.ReturnStmt stmt) {
    }

    @Override
    public void visitSwitchStmt(Stmt.SwitchStmt stmt) {
        stmt.condition.accept(this);
        for(Stmt.SwitchStmt.CaseClause case_ : stmt.cases) {
            case_.matchExpr.accept(this);
            case_.block.accept(this);
        }
    }

    @Override
    public void visitThrowStmt(Stmt.ThrowStmt stmt) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Throw statements are not supported in Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    @Override
    public void visitTryStmt(Stmt.TryStmt stmt) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Try-catch statements are not supported in Cbuild. See the documentation for the list of supported Ysharp features."
        );
    }

    // declaration visitor

    @Override
    public void visitVarDeclaration(Stmt.VarDeclaration stmt) {
    }

    @Override
    public void visitLetDeclaration(Stmt.LetDeclaration stmt) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Let declarations are not supported in Cbuild. Use 'var' or 'const' instead."
        );
    }

    @Override
    public void visitFunctionDeclaration(Stmt.FunctionDeclaration stmt) {
    }

    @Override
    public void visitConstDeclaration(Stmt.ConstDeclaration stmt) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Const declarations are not supported in Cbuild. Use 'var' instead."
        );
    }

    @Override
    public void visitClassDeclaration(Stmt.ClassDeclaration stmt) {
        throw new YsharpException(
                YsharpException.YsharpErrorType.SEMANTIC,
                -1,
                "Class declarations are not supported in Cbuild."
        );
    }
}