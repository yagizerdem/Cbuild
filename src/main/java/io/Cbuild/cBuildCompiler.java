package io.Cbuild;

import io.Cbuild.gnu_make_functions.make_function_dispatcher;
import org.antlr.v4.runtime.RuleContext;
import org.antlr.v4.runtime.tree.ParseTree;
import org.javatuples.Pair;
import org.stringtemplate.v4.ST;

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
        else if(ctx.rule_() != null) {
            return ctx.rule_().accept(this);
        }
        else if(ctx.function() != null) {
            cBuildIR.FunctionCallPart callee = (cBuildIR.FunctionCallPart) ctx.function().accept(this);
            cBuildIR.ValueIR value = new cBuildIR.ValueIR(List.of(callee));
            return value;
        }
        else if(ctx.define() != null) {
            cBuildIR.DefineIR defineIR = (cBuildIR.DefineIR) ctx.define().accept(this);
            return defineIR;
        }
        else if(ctx.vpath() != null) {
            cBuildIR.VpathIR vpathIR = (cBuildIR.VpathIR) ctx.vpath().accept(this);
            return vpathIR;
        }
        else if(ctx.ysharp_hook() != null) {
            cBuildIR.YsharpHookIR ysharpHookIR = (cBuildIR.YsharpHookIR ) ctx.vpath().accept(this);
            return ysharpHookIR;
        }

        throw new IllegalArgumentException(
                "Unsupported statement at line " +
                        ctx.getStart().getLine() +
                        ", column " +
                        ctx.getStart().getCharPositionInLine() +
                        ": `" + ctx.getText() + "`"
        );
    }

    @Override
    public Object visitAssignment(cbuildParser.AssignmentContext ctx) {
        cBuildIR.AssignmentIR assignmentIR = new cBuildIR.AssignmentIR();

        assignmentIR.type = cBuildIR.AssignmentType.fromSymbol(ctx.ASSIGN_OP().getText().trim());

        if(ctx.pattern() != null && !ctx.pattern().isEmpty()) {
            // left value
            List<cBuildIR.ValuePart> left_parts = (List<cBuildIR.ValuePart>) ctx.pattern().accept(this);
            cBuildIR.ValueIR left_valueIR = new cBuildIR.ValueIR(left_parts);

            cBuildIR.ValueIR right_valueIR = new cBuildIR.ValueIR(List.of());
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
        cBuildIR.AssignmentPrefix prefix = cBuildIR.AssignmentPrefix.fromSymbol(specifier);
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
            collectValueParts(parts, part);
        }

        return parts;
    }

    @Override
    public Object visitExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        for(int i = 0; i < ctx.children.size(); i++) {
            org.antlr.v4.runtime.tree.ParseTree ast_node = ctx.children.get(i);
            if(i == 0 && ast_node.getText().isBlank()) continue; // skip first WS
            Object part_s = ast_node.accept(this);
            collectValueParts(parts, part_s);
        }

        return parts;
    }

    @Override
    public Object visitExpr_in_assign(cbuildParser.Expr_in_assignContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        for(cbuildParser.Expr_in_assign_atomContext atom_ctx : ctx.expr_in_assign_atom()) {
            if(atom_ctx.function() != null && !atom_ctx.function().isEmpty()) {
                java.lang.Object atom = atom_ctx.function().accept(this);
                if(atom instanceof cBuildIR.FunctionCallPart callee)  {
                    parts.add(callee);
                }
                else if(atom instanceof cBuildIR.VarRefPart part) {
                    parts.add(part);
                }
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
        if(ctx.VAR() != null) {
            return compileVarRef(ctx);
        }

        String name = ctx.function_name().getText();
        if(dispatcher.has(name)) {
            make_function_dispatcher.MakeFunctionHandler handler = dispatcher.getHandler(name);
            cBuildIR.FunctionIR functionIR = handler.compile(ctx);
            cBuildIR.FunctionCallPart callee = new cBuildIR.FunctionCallPart(functionIR);
            return callee;
        }

        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (int i = 0; i < ctx.getChildCount(); i++) {
            ParseTree child = ctx.getChild(i);
            Object result = child.accept(this);
            collectValueParts(parts, result);

        }


        return new cBuildIR.VarRefPart(
                new cBuildIR.ValueIR(parts)
        );
    }

    @Override
    public Object visitFunction_name(cbuildParser.Function_nameContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        for(cbuildParser.Function_name_atomContext atom_ctx : ctx.function_name_atom()) {
            Object result = atom_ctx.accept(this);
            collectValueParts(parts, result);
        }

        return parts;
    }

    @Override
    public Object visitFunction_name_atom(cbuildParser.Function_name_atomContext ctx) {
        if(ctx.CHARS() != null) {
            return new cBuildIR.TextPart(ctx.CHARS().getText());
        }
        if(ctx.function() != null) {
            return ctx.function().accept(this);
        }
        return new cBuildIR.TextPart("");
    }

    @Override
    public Object visitArguments(cbuildParser.ArgumentsContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        for(cbuildParser.ArgumentContext args_ctx : ctx.argument()) {
            Object result = args_ctx.accept(this);
            collectValueParts(parts, result);
        }

        return parts;
    }

    @Override
    public Object visitArgument(cbuildParser.ArgumentContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();
        Object result = ctx.expressions().accept(this);
        collectValueParts(parts, result);
        return parts;
    }

    private cBuildIR.VarRefPart compileVarRef(cbuildParser.FunctionContext ctx) {
        String raw = ctx.VAR().getText();
        cBuildIR.TextPart part = new cBuildIR.TextPart(raw);
        cBuildIR.ValueIR value = new cBuildIR.ValueIR(List.of(part));
        return new cBuildIR.VarRefPart(value);
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
    public Object visitRule(cbuildParser.RuleContext ctx) {
        if(ctx.static_pattern_rule() != null) {
            return ctx.static_pattern_rule().accept(this);
        }

        List<cBuildIR.ValueIR> targetsIR = (List<cBuildIR.ValueIR>) ctx.targets().accept(this);

        cBuildIR.RuleSeparator ruleSeparator =
                cBuildIR.RuleSeparator.fromSymbol(ctx.colon().getText().trim());

        if(ctx.prerequisites() != null && !ctx.prerequisites().isEmpty()) {
            List<cBuildIR.ValueIR> prerequisitesIR = (List<cBuildIR.ValueIR>) ctx.prerequisites().accept(this);
            List<cBuildIR.RecipeIR> recipeIRS = new ArrayList<>();
            List<cBuildIR.ValueIR> orderonlyprerequisitesIR = new ArrayList<>();
            if(ctx.orderonlyprerequisites() != null) {
                orderonlyprerequisitesIR = (List<cBuildIR.ValueIR>) ctx.orderonlyprerequisites().accept(this);
            }


            if(ctx.recipes() != null) {
                recipeIRS = (List<cBuildIR.RecipeIR>) ctx.recipes().accept(this);
            }
            cBuildIR.NormalRuleIR ruleIR = new cBuildIR.NormalRuleIR(targetsIR,
                    prerequisitesIR,
                    orderonlyprerequisitesIR,
                    ruleSeparator,
                    recipeIRS);

            return ruleIR;
        }
        else {
            cBuildIR.AssignmentIR assignmentIR = (cBuildIR.AssignmentIR) ctx.assignment().accept(this);

            cBuildIR.TargetRuleIR ruleIR = new cBuildIR.TargetRuleIR(targetsIR,
                    ruleSeparator,
                    assignmentIR
                    );

            return ruleIR;
        }

    }

    @Override
    public Object visitTargets(cbuildParser.TargetsContext ctx) {
        List<cBuildIR.ValueIR> targetsIR = new ArrayList<>();
        for(cbuildParser.TargetContext target_ctx : ctx.target()) {
            List<cBuildIR.ValuePart> parts =  (List<cBuildIR.ValuePart>) target_ctx.pattern().accept(this);
            cBuildIR.ValueIR targetValueIR = new cBuildIR.ValueIR(parts);
            targetsIR.add(targetValueIR);
        }

        return targetsIR;
    }

    @Override
    public Object visitPrerequisites(cbuildParser.PrerequisitesContext ctx) {
        if(ctx.targets() != null) {
            return ctx.targets().accept(this);
        }
        return new ArrayList<cBuildIR.ValueIR>();
    }

    @Override
    public Object visitOrderonlyprerequisites(cbuildParser.OrderonlyprerequisitesContext ctx) {
        return ctx.targets().accept(this);
    }

    @Override
    public Object visitRecipes(cbuildParser.RecipesContext ctx) {
        List<cBuildIR.RecipeIR> recipes = new ArrayList<>();

        for (cbuildParser.RecipeContext recipeCtx : ctx.recipe()) {
            Object result = recipeCtx.accept(this);

            if (result instanceof cBuildIR.RecipeIR recipeIR) {
                recipes.add(recipeIR);
            }
        }

        return recipes;
    }

    @Override
    public Object visitRecipe(cbuildParser.RecipeContext ctx) {
        if (ctx.exprs_in_recipe() != null) {
            List<cBuildIR.ValuePart> parts =
                    (List<cBuildIR.ValuePart>) ctx.exprs_in_recipe().accept(this);

            cBuildIR.RecipeIR recipeIR = new cBuildIR.RecipeIR();
            recipeIR.command = new cBuildIR.ValueIR(parts);

            return recipeIR;
        }

        if (ctx.COMMENT() != null) {
            return null;
        }

        if (ctx.conditional_in_recipe() != null) {
            return ctx.conditional_in_recipe().accept(this);
        }

        return null;
    }

    @Override
    public Object visitExprs_in_recipe(cbuildParser.Exprs_in_recipeContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (ParseTree astNode : ctx.children) {
            Object result = astNode.accept(this);

            if (result instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if (result instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
        }

        return parts;
    }

    @Override
    public Object visitExpr_in_recipe(cbuildParser.Expr_in_recipeContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (cbuildParser.Expr_in_recipe_atomContext atomCtx : ctx.expr_in_recipe_atom()) {
            Object result = atomCtx.accept(this);

            if (result instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if (result instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
        }

        return parts;
    }

    @Override
    public Object visitExpr_in_recipe_atom(cbuildParser.Expr_in_recipe_atomContext ctx) {
        if (ctx.text_in_recipe() != null) {
            return new cBuildIR.TextPart(ctx.text_in_recipe().getText());
        }

        if (ctx.function() != null) {
            return ctx.function().accept(this);
        }

        return null;
    }

    @Override
    public Object visitText_in_recipe(cbuildParser.Text_in_recipeContext ctx) {
        return new cBuildIR.TextPart(ctx.getText());
    }

    @Override
    public Object visitConditional_in_recipe(cbuildParser.Conditional_in_recipeContext ctx) {
        cBuildIR.ConditionalIR conditionalIR = new cBuildIR.ConditionalIR();

        if (ctx.if_eq_kw() != null) {
            conditionalIR.kind = cBuildIR.ConditionKind.fromKeyword(ctx.if_eq_kw().getText());
            conditionalIR.condition = (cBuildIR.Condition) ctx.condition().accept(this);
        }
        else if (ctx.if_def_kw() != null) {
            conditionalIR.kind = cBuildIR.ConditionKind.fromKeyword(ctx.if_def_kw().getText());

            cBuildIR.Condition condition = new cBuildIR.Condition();

            Object result = ctx.identifier().accept(this);
            List<cBuildIR.ValuePart> parts = new ArrayList<>();

            if (result instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
            else if (result instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }

            condition.left = new cBuildIR.ValueIR(parts);
            condition.right = null;

            conditionalIR.condition = condition;
        }

        if (ctx.recipes_opt(0) != null) {
            Object thenResult = ctx.recipes_opt(0).accept(this);

            if (thenResult instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.RecipeIR recipeIR) {
                        conditionalIR.thenBranch.add(recipeIR);
                    }
                }
            }
        }

        if (ctx.recipes_opt().size() > 1 && ctx.recipes_opt(1) != null) {
            Object elseResult = ctx.recipes_opt(1).accept(this);

            if (elseResult instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.RecipeIR recipeIR) {
                        conditionalIR.elseBranch.add(recipeIR);
                    }
                }
            }
        }
        else if (ctx.conditional_in_recipe() != null) {
            Object elseConditional = ctx.conditional_in_recipe().accept(this);

            if (elseConditional instanceof cBuildIR.IR ir) {
                conditionalIR.elseBranch.add(ir);
            }
        }

        return conditionalIR;
    }


    @Override
    public Object visitStatic_pattern_rule(cbuildParser.Static_pattern_ruleContext ctx) {
        List<cBuildIR.ValueIR> targetsIR =
                (List<cBuildIR.ValueIR>) ctx.targets().accept(this);

        cBuildIR.RuleSeparator ruleSeparator =
                cBuildIR.RuleSeparator.fromSymbol(ctx.colon(0).getText().trim());

        List<cBuildIR.ValuePart> targetPatternParts =
                (List<cBuildIR.ValuePart>) ctx.pattern().accept(this);

        cBuildIR.ValueIR targetPatternIR = new cBuildIR.ValueIR(targetPatternParts);

        List<cBuildIR.ValueIR> prerequisitesIR = new ArrayList<>();
        List<cBuildIR.ValueIR> orderonlyprerequisitesIR = new ArrayList<>();

        if (ctx.prerequisites() != null) {
            prerequisitesIR =
                    (List<cBuildIR.ValueIR>) ctx.prerequisites().accept(this);
        }


        if (ctx.orderonlyprerequisites() != null) {
            orderonlyprerequisitesIR =
                    (List<cBuildIR.ValueIR>) ctx.orderonlyprerequisites().accept(this);
        }

        List<cBuildIR.RecipeIR> recipeIRS = new ArrayList<>();

        if (ctx.recipes() != null) {
            recipeIRS =
                    (List<cBuildIR.RecipeIR>) ctx.recipes().accept(this);
        }

        return new cBuildIR.StaticPatternRuleIR(
                targetsIR,
                ruleSeparator,
                targetPatternIR,
                prerequisitesIR,
                orderonlyprerequisitesIR,
                recipeIRS
        );
    }

    @Override
    public Object visitDefine(cbuildParser.DefineContext ctx) {
        cBuildIR.DefineIR  defineIR = new cBuildIR.DefineIR();

        if(ctx.specifiers() != null) {
            String specifier = ctx.specifiers().getText().trim();
            defineIR.specifiers = cBuildIR.AssignmentPrefix.fromSymbol(specifier);
        }

        List<cBuildIR.ValuePart> parts =  (List<cBuildIR.ValuePart>) ctx.pattern().accept(this);
        defineIR.name = new cBuildIR.ValueIR(parts);

        if(ctx.ASSIGN_OP() != null) {
            defineIR.assignmentType = cBuildIR.AssignmentType.fromSymbol(ctx.ASSIGN_OP().getText().trim());
        }

        List<cBuildIR.ValuePart> valueParts = (List<cBuildIR.ValuePart>) ctx.definition().accept(this);
        defineIR.value = new cBuildIR.ValueIR(valueParts);

        return defineIR;
    }

    @Override
    public Object visitDefinition(cbuildParser.DefinitionContext ctx) {
        return ctx.exprs_in_def().accept(this);
    }

    @Override
    public Object visitExprs_in_def(cbuildParser.Exprs_in_defContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        if (ctx.br() != null && ctx.first_expr_in_def().isEmpty()) {
            return parts;
        }

        for (ParseTree astNode : ctx.children) {

            if(astNode instanceof  cbuildParser.BrContext) {
                cBuildIR.TextPart text = new cBuildIR.TextPart("\n");
                parts.add(text);
            }
            else {
                Object result = astNode.accept(this);

                if (result instanceof List<?> list) {
                    for (Object obj : list) {
                        if (obj instanceof cBuildIR.ValuePart valuePart) {
                            parts.add(valuePart);
                        }
                    }
                }
                else if (result instanceof cBuildIR.ValuePart valuePart) {
                    parts.add(valuePart);
                }

            }

        }

        return parts;
    }

    @Override
    public Object visitFirst_expr_in_def(cbuildParser.First_expr_in_defContext ctx) {
        List<cBuildIR.ValuePart> parts = new ArrayList<>();

        for (ParseTree astNode : ctx.children) {
            Object result = astNode.accept(this);

            if (result instanceof List<?> list) {
                for (Object obj : list) {
                    if (obj instanceof cBuildIR.ValuePart valuePart) {
                        parts.add(valuePart);
                    }
                }
            }
            else if (result instanceof cBuildIR.ValuePart valuePart) {
                parts.add(valuePart);
            }
        }

        return parts;
    }

    @Override
    public Object visitChar_in_def(cbuildParser.Char_in_defContext ctx) {
        return new cBuildIR.TextPart(ctx.getText());
    }

    @Override
    public Object visitVpath(cbuildParser.VpathContext ctx) {
        if (ctx.vpath_args() == null) {
            return cBuildIR.VpathIR.clearAll();
        }

        return ctx.vpath_args().accept(this);
    }

    @Override
    public Object visitVpath_args(cbuildParser.Vpath_argsContext ctx) {
        cBuildIR.ValueIR arg = new cBuildIR.ValueIR();
                List<cBuildIR.VarRefPart> arg_parts = (List<cBuildIR.VarRefPart>) ctx.pattern().accept(this);
        arg.parts.addAll(arg_parts);

        if (ctx.expressions() == null) {
            return cBuildIR.VpathIR.clearPattern(arg);
        }

        List<cBuildIR.ValueIR> directories =
                (List<cBuildIR.ValueIR>) ctx.expressions().accept(this);

        return cBuildIR.VpathIR.setPattern(arg, directories);
    }

    @Override
    public Object visitWs(cbuildParser.WsContext ctx) {
        cBuildIR.TextPart part = new cBuildIR.TextPart(ctx.getText());
        return part;
    }

    @Override
    public Object visitYsharp_hook(cbuildParser.Ysharp_hookContext ctx) {
        cBuildIR.YsharpHookIR ir = new cBuildIR.YsharpHookIR();
        String program = ctx.ysharp_program().getText();
        ir.program = program;
        return ir;
    }

    // utility

    private static void collectValueParts(
            List<cBuildIR.ValuePart> destination,
            Object result
    ) {
        if (result == null) {
            return;
        }

        if (result instanceof cBuildIR.ValuePart valuePart) {
            destination.add(valuePart);
            return;
        }

        if (result instanceof List<?> list) {
            for (Object item : list) {
                collectValueParts(destination, item);
            }
        }
    }
}


