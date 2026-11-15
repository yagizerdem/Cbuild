# Generated from cbuild.g4 by ANTLR 4.13.2
from antlr4 import *
if "." in __name__:
    from .cbuildParser import cbuildParser
else:
    from cbuildParser import cbuildParser

# This class defines a complete generic visitor for a parse tree produced by cbuildParser.

class cbuildVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by cbuildParser#cbuildfile.
    def visitCbuildfile(self, ctx:cbuildParser.CbuildfileContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#statements.
    def visitStatements(self, ctx:cbuildParser.StatementsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#conditional.
    def visitConditional(self, ctx:cbuildParser.ConditionalContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#conditional_in_recipe.
    def visitConditional_in_recipe(self, ctx:cbuildParser.Conditional_in_recipeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#statements_opt.
    def visitStatements_opt(self, ctx:cbuildParser.Statements_optContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#statement.
    def visitStatement(self, ctx:cbuildParser.StatementContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#define.
    def visitDefine(self, ctx:cbuildParser.DefineContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#define_body.
    def visitDefine_body(self, ctx:cbuildParser.Define_bodyContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#definition.
    def visitDefinition(self, ctx:cbuildParser.DefinitionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#include.
    def visitInclude(self, ctx:cbuildParser.IncludeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#export.
    def visitExport(self, ctx:cbuildParser.ExportContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#vpath.
    def visitVpath(self, ctx:cbuildParser.VpathContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#vpath_args.
    def visitVpath_args(self, ctx:cbuildParser.Vpath_argsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#assignment.
    def visitAssignment(self, ctx:cbuildParser.AssignmentContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#assignment_prefix.
    def visitAssignment_prefix(self, ctx:cbuildParser.Assignment_prefixContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#if_eq_kw.
    def visitIf_eq_kw(self, ctx:cbuildParser.If_eq_kwContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#if_def_kw.
    def visitIf_def_kw(self, ctx:cbuildParser.If_def_kwContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#include_kw.
    def visitInclude_kw(self, ctx:cbuildParser.Include_kwContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#condition.
    def visitCondition(self, ctx:cbuildParser.ConditionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#quoted.
    def visitQuoted(self, ctx:cbuildParser.QuotedContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#dq_atom.
    def visitDq_atom(self, ctx:cbuildParser.Dq_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#sq_atom.
    def visitSq_atom(self, ctx:cbuildParser.Sq_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#quoted_atom.
    def visitQuoted_atom(self, ctx:cbuildParser.Quoted_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expressions_opt.
    def visitExpressions_opt(self, ctx:cbuildParser.Expressions_optContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expressions.
    def visitExpressions(self, ctx:cbuildParser.ExpressionsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#exprs_nested.
    def visitExprs_nested(self, ctx:cbuildParser.Exprs_nestedContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#exprs_in_assign.
    def visitExprs_in_assign(self, ctx:cbuildParser.Exprs_in_assignContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#exprs_in_recipe.
    def visitExprs_in_recipe(self, ctx:cbuildParser.Exprs_in_recipeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#exprs_in_def.
    def visitExprs_in_def(self, ctx:cbuildParser.Exprs_in_defContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#first_expr_in_def.
    def visitFirst_expr_in_def(self, ctx:cbuildParser.First_expr_in_defContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expression.
    def visitExpression(self, ctx:cbuildParser.ExpressionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expression_atom.
    def visitExpression_atom(self, ctx:cbuildParser.Expression_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expr_nested.
    def visitExpr_nested(self, ctx:cbuildParser.Expr_nestedContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expr_nested_atom.
    def visitExpr_nested_atom(self, ctx:cbuildParser.Expr_nested_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expr_in_assign.
    def visitExpr_in_assign(self, ctx:cbuildParser.Expr_in_assignContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expr_in_assign_atom.
    def visitExpr_in_assign_atom(self, ctx:cbuildParser.Expr_in_assign_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expr_in_recipe.
    def visitExpr_in_recipe(self, ctx:cbuildParser.Expr_in_recipeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#expr_in_recipe_atom.
    def visitExpr_in_recipe_atom(self, ctx:cbuildParser.Expr_in_recipe_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#function.
    def visitFunction(self, ctx:cbuildParser.FunctionContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#function_name.
    def visitFunction_name(self, ctx:cbuildParser.Function_nameContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#function_name_atom.
    def visitFunction_name_atom(self, ctx:cbuildParser.Function_name_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#arguments.
    def visitArguments(self, ctx:cbuildParser.ArgumentsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#argument.
    def visitArgument(self, ctx:cbuildParser.ArgumentContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#rule.
    def visitRule(self, ctx:cbuildParser.RuleContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#static_pattern_rule.
    def visitStatic_pattern_rule(self, ctx:cbuildParser.Static_pattern_ruleContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#target.
    def visitTarget(self, ctx:cbuildParser.TargetContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#pattern.
    def visitPattern(self, ctx:cbuildParser.PatternContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#prerequisites.
    def visitPrerequisites(self, ctx:cbuildParser.PrerequisitesContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#orderonlyprerequisites.
    def visitOrderonlyprerequisites(self, ctx:cbuildParser.OrderonlyprerequisitesContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#targets.
    def visitTargets(self, ctx:cbuildParser.TargetsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#recipes.
    def visitRecipes(self, ctx:cbuildParser.RecipesContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#recipes_opt.
    def visitRecipes_opt(self, ctx:cbuildParser.Recipes_optContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#recipe.
    def visitRecipe(self, ctx:cbuildParser.RecipeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#empty_recipe_line.
    def visitEmpty_recipe_line(self, ctx:cbuildParser.Empty_recipe_lineContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#undefine.
    def visitUndefine(self, ctx:cbuildParser.UndefineContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#specifiers.
    def visitSpecifiers(self, ctx:cbuildParser.SpecifiersContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#identifier.
    def visitIdentifier(self, ctx:cbuildParser.IdentifierContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#identifier_atom.
    def visitIdentifier_atom(self, ctx:cbuildParser.Identifier_atomContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#br.
    def visitBr(self, ctx:cbuildParser.BrContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#char.
    def visitChar(self, ctx:cbuildParser.CharContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#plain_char.
    def visitPlain_char(self, ctx:cbuildParser.Plain_charContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#char_nested.
    def visitChar_nested(self, ctx:cbuildParser.Char_nestedContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#char_in_assign.
    def visitChar_in_assign(self, ctx:cbuildParser.Char_in_assignContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#char_in_def.
    def visitChar_in_def(self, ctx:cbuildParser.Char_in_defContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#char_in_recipe.
    def visitChar_in_recipe(self, ctx:cbuildParser.Char_in_recipeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#text.
    def visitText(self, ctx:cbuildParser.TextContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#text_nested.
    def visitText_nested(self, ctx:cbuildParser.Text_nestedContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#text_in_assign.
    def visitText_in_assign(self, ctx:cbuildParser.Text_in_assignContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#text_in_recipe.
    def visitText_in_recipe(self, ctx:cbuildParser.Text_in_recipeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#keywords.
    def visitKeywords(self, ctx:cbuildParser.KeywordsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#colon.
    def visitColon(self, ctx:cbuildParser.ColonContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#comment_opt.
    def visitComment_opt(self, ctx:cbuildParser.Comment_optContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#ws.
    def visitWs(self, ctx:cbuildParser.WsContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#hook.
    def visitHook(self, ctx:cbuildParser.HookContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by cbuildParser#hook_program.
    def visitHook_program(self, ctx:cbuildParser.Hook_programContext):
        return self.visitChildren(ctx)



del cbuildParser