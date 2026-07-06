package io.Cbuild;

import io.Cbuild.gnu_make_functions.make_function_dispatcher;
import org.antlr.v4.runtime.tree.ParseTree;
import org.javatuples.Pair;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.RecursiveTask;

public class cBuildCompiler extends cbuildBaseVisitor<Object> {

    private final make_function_dispatcher dispatcher;

    public List<cBuildIR.IR> compiled_program;

    public cBuildCompiler() {
        this.dispatcher = new make_function_dispatcher();
        this.compiled_program = new ArrayList<>();
    }

    public List<cBuildIR.IR> compile(cbuildParser.CbuildfileContext cbuildfileContext) {
        this.compiled_program = new ArrayList<>(); // clear
        this.compiled_program = (List<cBuildIR.IR>) cbuildfileContext.accept(this);
        return this.compiled_program;
    }

    @Override
    public Object visitCbuildfile(cbuildParser.CbuildfileContext ctx) {
        if (ctx.statements() == null) {
            return new ArrayList<cBuildIR.IR>();
        }

        return ctx.statements().accept(this);
    }

    @Override
    public Object visitStatements(cbuildParser.StatementsContext ctx) {
        List<cBuildIR.IR> statements = new ArrayList<>();
        for(cbuildParser.StatementContext stmt_ctx : ctx.statement()) {
           cBuildIR.IR ir = (cBuildIR.IR) stmt_ctx.accept(this);
            statements.add(ir);
        }
        return statements;
    }

    @Override
    public Object visitStatement(cbuildParser.StatementContext ctx) {
        if(ctx.assignment() != null) {
            return ctx.assignment().accept(this);
        }
        else if(ctx.conditional() != null) {
            return ctx.conditional().accept(this);
        }
        return null;
    }

    @Override
    public Object visitAssignment(cbuildParser.AssignmentContext ctx) {
        cBuildIR.AssignmentIR assignmentIR = new cBuildIR.AssignmentIR();

        if(ctx.pattern() != null && !ctx.pattern().isEmpty()) {
            // left value
            List<cBuildIR.ValuePart> left_parts = (List<cBuildIR.ValuePart>) ctx.pattern().accept(this);
            cBuildIR.ValueIR left_valueIR = new cBuildIR.ValueIR(left_parts);

            cBuildIR.ValueIR right_valueIR = new cBuildIR.ValueIR(List.of(new cBuildIR.TextPart("")));
            if(ctx.exprs_in_assign() != null) {
                List<cBuildIR.ValuePart> right_parts = (List<cBuildIR.ValuePart>) ctx.exprs_in_assign().accept(this);
                right_valueIR = new cBuildIR.ValueIR(right_parts);
            }

            assignmentIR.left = left_valueIR;
            assignmentIR.right = right_valueIR;
        }
        else {
            Pair<cBuildIR.AssignmentPrefix, List<cBuildIR.ValuePart>> pair=
                    (Pair<cBuildIR.AssignmentPrefix, List<cBuildIR.ValuePart>>)ctx.assignment_prefix().accept(this);

            List<cBuildIR.ValuePart> left_parts = pair.getValue1();
            cBuildIR.ValueIR left_valueIR = new cBuildIR.ValueIR(left_parts);


            cBuildIR.ValueIR right_valueIR = new cBuildIR.ValueIR(List.of(new cBuildIR.TextPart("")));
            if(ctx.exprs_in_assign() != null) {
                List<cBuildIR.ValuePart> right_parts = (List<cBuildIR.ValuePart>) ctx.exprs_in_assign().accept(this);
                right_valueIR = new cBuildIR.ValueIR(right_parts);
            }

            assignmentIR.left = left_valueIR;
            assignmentIR.right = right_valueIR;

            cBuildIR.AssignmentPrefix specifier = pair.getValue0();
            assignmentIR.prefix = specifier;
        }

        return assignmentIR;
    }

    @Override
    public Object visitAssignment_prefix(cbuildParser.Assignment_prefixContext ctx) {
        String specifier = ctx.specifiers().getText().trim();
        cBuildIR.AssignmentPrefix prefix = cBuildIR.AssignmentPrefix.mapToEnum(specifier);
        List<cBuildIR.ValuePart> parts = (List<cBuildIR.ValuePart>) ctx.pattern().accept(this);
        Pair<cBuildIR.AssignmentPrefix, List<cBuildIR.ValuePart>> pair =
                new Pair<cBuildIR.AssignmentPrefix, List<cBuildIR.ValuePart>>(prefix, parts);
        return pair;
    }

    @Override
    public Object visitPattern(cbuildParser.PatternContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for(ParseTree ast_node : ctx.children) {
            Object part = ast_node.accept(this);
            if(part instanceof cBuildIR.FunctionCallPart callee) {
                parts.add(callee);
            }
            else if(part instanceof cBuildIR.TextPart textPart) {
                parts.add(textPart);
            }

        }

        return parts;
    }

    @Override
    public Object visitExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        for(ParseTree ast_node : ctx.children) {
            Object part_s = ast_node.accept(this);
            if (part_s instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if(part_s instanceof cBuildIR.ValuePart part) {
                parts.add(part);
            }
        }
        return parts;
    }

    @Override
    public Object visitExpr_in_assign(cbuildParser.Expr_in_assignContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        for(cbuildParser.Expr_in_assign_atomContext atom_ctx : ctx.expr_in_assign_atom()) {
            if(atom_ctx.function() != null && !atom_ctx.function().isEmpty()) {
                cBuildIR.FunctionCallPart callee = (cBuildIR.FunctionCallPart)atom_ctx.function().accept(this);
                parts.add(callee);
            }
            else if(atom_ctx.text_in_assign() != null && !atom_ctx.text_in_assign().isEmpty()) {
                String lexeme = atom_ctx.text_in_assign().getText();
                cBuildIR.TextPart text_part = new cBuildIR.TextPart(lexeme);
                parts.add(text_part);
            }
        }
        return parts;
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
    public Object visitConditional(cbuildParser.ConditionalContext ctx) {
        cBuildIR.ConditionalIR conditionalIR = new cBuildIR.ConditionalIR();

        if (ctx.if_eq_kw() != null) {
            conditionalIR.kind = cBuildIR.ConditionKind.fromKeyword( ctx.if_eq_kw().getText());
            conditionalIR.condition = (cBuildIR.Condition) ctx.condition().accept(this);
        }
        else if (ctx.if_def_kw() != null) {
            conditionalIR.kind = cBuildIR.ConditionKind.fromKeyword( ctx.if_eq_kw().getText());

            cBuildIR.Condition condition = new cBuildIR.Condition();
            List<cBuildIR.ValuePart> parts =
                    (List<cBuildIR.ValuePart>) ctx.identifier().accept(this);

            condition.left = new cBuildIR.ValueIR(parts);
            condition.right = null;

            conditionalIR.condition = condition;
        }

        if (ctx.statements_opt(0) != null) {
            Object thenResult = ctx.statements_opt(0).accept(this);

            if (thenResult instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.IR ir) {
                        conditionalIR.thenBranch.add(ir);
                    }
                }
            }
        }

        if (ctx.statements_opt().size() > 1 && ctx.statements_opt(1) != null) {
            Object elseResult = ctx.statements_opt(1).accept(this);

            if (elseResult instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.IR ir) {
                        conditionalIR.elseBranch.add(ir);
                    }
                }
            }
        }
        else if (ctx.conditional() != null) {
            Object elseConditional = ctx.conditional().accept(this);

            if (elseConditional instanceof cBuildIR.IR ir) {
                conditionalIR.elseBranch.add(ir);
            }
        }

        return conditionalIR;
    }


    @Override
    public Object visitCondition(cbuildParser.ConditionContext ctx) {
        cBuildIR.Condition condition = new cBuildIR.Condition();

        if (ctx.expressions_opt().size() == 2) {
            if (ctx.expressions_opt(0).expressions() != null) {
                List<cBuildIR.ValuePart> leftParts =
                        (List<cBuildIR.ValuePart>) ctx.expressions_opt(0).accept(this);
                condition.left = new cBuildIR.ValueIR(leftParts);
            }
            else {
                condition.left = new cBuildIR.ValueIR();
            }

            if (ctx.expressions_opt(1).expressions() != null) {
                List<cBuildIR.ValuePart> rightParts =
                        (List<cBuildIR.ValuePart>) ctx.expressions_opt(1).accept(this);
                condition.right = new cBuildIR.ValueIR(rightParts);
            }
            else {
                condition.right = new cBuildIR.ValueIR();
            }

            return condition;
        }

        String left = Common.unquote(ctx.SLIT(0).getText());
        String right = Common.unquote(ctx.SLIT(1).getText());

        condition.left = new cBuildIR.ValueIR(
                List.of(new cBuildIR.TextPart(left))
        );

        condition.right = new cBuildIR.ValueIR(
                List.of(new cBuildIR.TextPart(right))
        );

        return condition;
    }

    @Override
    public Object visitIdentifier(cbuildParser.IdentifierContext ctx) {
        io.Cbuild.cBuildIR.TextPart textPart = new cBuildIR.TextPart(ctx.getText());
        return textPart;
    }


    @Override
    public Object visitExpressions_opt(cbuildParser.Expressions_optContext ctx) {
        if (ctx.expressions() == null) {
            return new ArrayList<cBuildIR.ValuePart>();
        }

        return ctx.expressions().accept(this);
    }

    @Override
    public Object visitExpressions(cbuildParser.ExpressionsContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (ParseTree astNode : ctx.children) {
            Object part = astNode.accept(this);

            if (part instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if (part instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
        }

        return parts;
    }

    @Override
    public Object visitExpression(cbuildParser.ExpressionContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (ParseTree astNode : ctx.children) {
            Object part = astNode.accept(this);

            if (part instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if (part instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
        }

        return parts;
    }

    @Override
    public Object visitExpression_atom(cbuildParser.Expression_atomContext ctx) {
        if (ctx.text() != null) {
            return new cBuildIR.TextPart(ctx.text().getText());
        }

        if (ctx.function() != null) {
            return ctx.function().accept(this);
        }

        if (ctx.exprs_nested() != null) {
            List<cBuildIR.ValuePart> parts =
                    (List<cBuildIR.ValuePart>) ctx.exprs_nested().accept(this);

            return new cBuildIR.VarRefPart(new cBuildIR.ValueIR(parts));
        }

        return null;
    }

    @Override
    public Object visitExpr_nested(cbuildParser.Expr_nestedContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (ParseTree astNode : ctx.children) {
            Object part = astNode.accept(this);

            if (part instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if (part instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
        }

        return parts;
    }

    @Override
    public Object visitExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx) {
        if (ctx.text_nested() != null) {
            return new cBuildIR.TextPart(ctx.text_nested().getText());
        }

        if (ctx.function() != null) {
            return ctx.function().accept(this);
        }

        if (ctx.exprs_nested() != null) {
            List<cBuildIR.ValuePart> parts =
                    (List<cBuildIR.ValuePart>) ctx.exprs_nested().accept(this);

            return new cBuildIR.VarRefPart(new cBuildIR.ValueIR(parts));
        }

        return null;
    }

    @Override
    public Object visitStatements_opt(cbuildParser.Statements_optContext ctx) {
        if(ctx.statements() != null) {
            return ctx.statements().accept(this);
        }

        return new ArrayList<>();
    }



    @Override
    public Object visitWs(cbuildParser.WsContext ctx) {
        cBuildIR.TextPart part = new cBuildIR.TextPart(ctx.getText());
        return part;
    }
}
