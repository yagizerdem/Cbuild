# Generated from cbuild.g4 by ANTLR 4.13.2
from antlr4 import *
if "." in __name__:
    from .cbuildParser import cbuildParser
else:
    from cbuildParser import cbuildParser

# This class defines a complete listener for a parse tree produced by cbuildParser.
class cbuildListener(ParseTreeListener):

    # Enter a parse tree produced by cbuildParser#cbuildfile.
    def enterCbuildfile(self, ctx:cbuildParser.CbuildfileContext):
        pass

    # Exit a parse tree produced by cbuildParser#cbuildfile.
    def exitCbuildfile(self, ctx:cbuildParser.CbuildfileContext):
        pass


    # Enter a parse tree produced by cbuildParser#statements.
    def enterStatements(self, ctx:cbuildParser.StatementsContext):
        pass

    # Exit a parse tree produced by cbuildParser#statements.
    def exitStatements(self, ctx:cbuildParser.StatementsContext):
        pass


    # Enter a parse tree produced by cbuildParser#conditional.
    def enterConditional(self, ctx:cbuildParser.ConditionalContext):
        pass

    # Exit a parse tree produced by cbuildParser#conditional.
    def exitConditional(self, ctx:cbuildParser.ConditionalContext):
        pass


    # Enter a parse tree produced by cbuildParser#conditional_in_recipe.
    def enterConditional_in_recipe(self, ctx:cbuildParser.Conditional_in_recipeContext):
        pass

    # Exit a parse tree produced by cbuildParser#conditional_in_recipe.
    def exitConditional_in_recipe(self, ctx:cbuildParser.Conditional_in_recipeContext):
        pass


    # Enter a parse tree produced by cbuildParser#statements_opt.
    def enterStatements_opt(self, ctx:cbuildParser.Statements_optContext):
        pass

    # Exit a parse tree produced by cbuildParser#statements_opt.
    def exitStatements_opt(self, ctx:cbuildParser.Statements_optContext):
        pass


    # Enter a parse tree produced by cbuildParser#statement.
    def enterStatement(self, ctx:cbuildParser.StatementContext):
        pass

    # Exit a parse tree produced by cbuildParser#statement.
    def exitStatement(self, ctx:cbuildParser.StatementContext):
        pass


    # Enter a parse tree produced by cbuildParser#define.
    def enterDefine(self, ctx:cbuildParser.DefineContext):
        pass

    # Exit a parse tree produced by cbuildParser#define.
    def exitDefine(self, ctx:cbuildParser.DefineContext):
        pass


    # Enter a parse tree produced by cbuildParser#define_body.
    def enterDefine_body(self, ctx:cbuildParser.Define_bodyContext):
        pass

    # Exit a parse tree produced by cbuildParser#define_body.
    def exitDefine_body(self, ctx:cbuildParser.Define_bodyContext):
        pass


    # Enter a parse tree produced by cbuildParser#definition.
    def enterDefinition(self, ctx:cbuildParser.DefinitionContext):
        pass

    # Exit a parse tree produced by cbuildParser#definition.
    def exitDefinition(self, ctx:cbuildParser.DefinitionContext):
        pass


    # Enter a parse tree produced by cbuildParser#include.
    def enterInclude(self, ctx:cbuildParser.IncludeContext):
        pass

    # Exit a parse tree produced by cbuildParser#include.
    def exitInclude(self, ctx:cbuildParser.IncludeContext):
        pass


    # Enter a parse tree produced by cbuildParser#export.
    def enterExport(self, ctx:cbuildParser.ExportContext):
        pass

    # Exit a parse tree produced by cbuildParser#export.
    def exitExport(self, ctx:cbuildParser.ExportContext):
        pass


    # Enter a parse tree produced by cbuildParser#vpath.
    def enterVpath(self, ctx:cbuildParser.VpathContext):
        pass

    # Exit a parse tree produced by cbuildParser#vpath.
    def exitVpath(self, ctx:cbuildParser.VpathContext):
        pass


    # Enter a parse tree produced by cbuildParser#vpath_args.
    def enterVpath_args(self, ctx:cbuildParser.Vpath_argsContext):
        pass

    # Exit a parse tree produced by cbuildParser#vpath_args.
    def exitVpath_args(self, ctx:cbuildParser.Vpath_argsContext):
        pass


    # Enter a parse tree produced by cbuildParser#assignment.
    def enterAssignment(self, ctx:cbuildParser.AssignmentContext):
        pass

    # Exit a parse tree produced by cbuildParser#assignment.
    def exitAssignment(self, ctx:cbuildParser.AssignmentContext):
        pass


    # Enter a parse tree produced by cbuildParser#assignment_prefix.
    def enterAssignment_prefix(self, ctx:cbuildParser.Assignment_prefixContext):
        pass

    # Exit a parse tree produced by cbuildParser#assignment_prefix.
    def exitAssignment_prefix(self, ctx:cbuildParser.Assignment_prefixContext):
        pass


    # Enter a parse tree produced by cbuildParser#if_eq_kw.
    def enterIf_eq_kw(self, ctx:cbuildParser.If_eq_kwContext):
        pass

    # Exit a parse tree produced by cbuildParser#if_eq_kw.
    def exitIf_eq_kw(self, ctx:cbuildParser.If_eq_kwContext):
        pass


    # Enter a parse tree produced by cbuildParser#if_def_kw.
    def enterIf_def_kw(self, ctx:cbuildParser.If_def_kwContext):
        pass

    # Exit a parse tree produced by cbuildParser#if_def_kw.
    def exitIf_def_kw(self, ctx:cbuildParser.If_def_kwContext):
        pass


    # Enter a parse tree produced by cbuildParser#include_kw.
    def enterInclude_kw(self, ctx:cbuildParser.Include_kwContext):
        pass

    # Exit a parse tree produced by cbuildParser#include_kw.
    def exitInclude_kw(self, ctx:cbuildParser.Include_kwContext):
        pass


    # Enter a parse tree produced by cbuildParser#condition.
    def enterCondition(self, ctx:cbuildParser.ConditionContext):
        pass

    # Exit a parse tree produced by cbuildParser#condition.
    def exitCondition(self, ctx:cbuildParser.ConditionContext):
        pass


    # Enter a parse tree produced by cbuildParser#expressions_opt.
    def enterExpressions_opt(self, ctx:cbuildParser.Expressions_optContext):
        pass

    # Exit a parse tree produced by cbuildParser#expressions_opt.
    def exitExpressions_opt(self, ctx:cbuildParser.Expressions_optContext):
        pass


    # Enter a parse tree produced by cbuildParser#expressions.
    def enterExpressions(self, ctx:cbuildParser.ExpressionsContext):
        pass

    # Exit a parse tree produced by cbuildParser#expressions.
    def exitExpressions(self, ctx:cbuildParser.ExpressionsContext):
        pass


    # Enter a parse tree produced by cbuildParser#exprs_nested.
    def enterExprs_nested(self, ctx:cbuildParser.Exprs_nestedContext):
        pass

    # Exit a parse tree produced by cbuildParser#exprs_nested.
    def exitExprs_nested(self, ctx:cbuildParser.Exprs_nestedContext):
        pass


    # Enter a parse tree produced by cbuildParser#exprs_in_assign.
    def enterExprs_in_assign(self, ctx:cbuildParser.Exprs_in_assignContext):
        pass

    # Exit a parse tree produced by cbuildParser#exprs_in_assign.
    def exitExprs_in_assign(self, ctx:cbuildParser.Exprs_in_assignContext):
        pass


    # Enter a parse tree produced by cbuildParser#exprs_in_recipe.
    def enterExprs_in_recipe(self, ctx:cbuildParser.Exprs_in_recipeContext):
        pass

    # Exit a parse tree produced by cbuildParser#exprs_in_recipe.
    def exitExprs_in_recipe(self, ctx:cbuildParser.Exprs_in_recipeContext):
        pass


    # Enter a parse tree produced by cbuildParser#exprs_in_def.
    def enterExprs_in_def(self, ctx:cbuildParser.Exprs_in_defContext):
        pass

    # Exit a parse tree produced by cbuildParser#exprs_in_def.
    def exitExprs_in_def(self, ctx:cbuildParser.Exprs_in_defContext):
        pass


    # Enter a parse tree produced by cbuildParser#first_expr_in_def.
    def enterFirst_expr_in_def(self, ctx:cbuildParser.First_expr_in_defContext):
        pass

    # Exit a parse tree produced by cbuildParser#first_expr_in_def.
    def exitFirst_expr_in_def(self, ctx:cbuildParser.First_expr_in_defContext):
        pass


    # Enter a parse tree produced by cbuildParser#expression.
    def enterExpression(self, ctx:cbuildParser.ExpressionContext):
        pass

    # Exit a parse tree produced by cbuildParser#expression.
    def exitExpression(self, ctx:cbuildParser.ExpressionContext):
        pass


    # Enter a parse tree produced by cbuildParser#expression_atom.
    def enterExpression_atom(self, ctx:cbuildParser.Expression_atomContext):
        pass

    # Exit a parse tree produced by cbuildParser#expression_atom.
    def exitExpression_atom(self, ctx:cbuildParser.Expression_atomContext):
        pass


    # Enter a parse tree produced by cbuildParser#expr_nested.
    def enterExpr_nested(self, ctx:cbuildParser.Expr_nestedContext):
        pass

    # Exit a parse tree produced by cbuildParser#expr_nested.
    def exitExpr_nested(self, ctx:cbuildParser.Expr_nestedContext):
        pass


    # Enter a parse tree produced by cbuildParser#expr_nested_atom.
    def enterExpr_nested_atom(self, ctx:cbuildParser.Expr_nested_atomContext):
        pass

    # Exit a parse tree produced by cbuildParser#expr_nested_atom.
    def exitExpr_nested_atom(self, ctx:cbuildParser.Expr_nested_atomContext):
        pass


    # Enter a parse tree produced by cbuildParser#expr_in_assign.
    def enterExpr_in_assign(self, ctx:cbuildParser.Expr_in_assignContext):
        pass

    # Exit a parse tree produced by cbuildParser#expr_in_assign.
    def exitExpr_in_assign(self, ctx:cbuildParser.Expr_in_assignContext):
        pass


    # Enter a parse tree produced by cbuildParser#expr_in_assign_atom.
    def enterExpr_in_assign_atom(self, ctx:cbuildParser.Expr_in_assign_atomContext):
        pass

    # Exit a parse tree produced by cbuildParser#expr_in_assign_atom.
    def exitExpr_in_assign_atom(self, ctx:cbuildParser.Expr_in_assign_atomContext):
        pass


    # Enter a parse tree produced by cbuildParser#expr_in_recipe.
    def enterExpr_in_recipe(self, ctx:cbuildParser.Expr_in_recipeContext):
        pass

    # Exit a parse tree produced by cbuildParser#expr_in_recipe.
    def exitExpr_in_recipe(self, ctx:cbuildParser.Expr_in_recipeContext):
        pass


    # Enter a parse tree produced by cbuildParser#expr_in_recipe_atom.
    def enterExpr_in_recipe_atom(self, ctx:cbuildParser.Expr_in_recipe_atomContext):
        pass

    # Exit a parse tree produced by cbuildParser#expr_in_recipe_atom.
    def exitExpr_in_recipe_atom(self, ctx:cbuildParser.Expr_in_recipe_atomContext):
        pass


    # Enter a parse tree produced by cbuildParser#function.
    def enterFunction(self, ctx:cbuildParser.FunctionContext):
        pass

    # Exit a parse tree produced by cbuildParser#function.
    def exitFunction(self, ctx:cbuildParser.FunctionContext):
        pass


    # Enter a parse tree produced by cbuildParser#function_name.
    def enterFunction_name(self, ctx:cbuildParser.Function_nameContext):
        pass

    # Exit a parse tree produced by cbuildParser#function_name.
    def exitFunction_name(self, ctx:cbuildParser.Function_nameContext):
        pass


    # Enter a parse tree produced by cbuildParser#function_name_atom.
    def enterFunction_name_atom(self, ctx:cbuildParser.Function_name_atomContext):
        pass

    # Exit a parse tree produced by cbuildParser#function_name_atom.
    def exitFunction_name_atom(self, ctx:cbuildParser.Function_name_atomContext):
        pass


    # Enter a parse tree produced by cbuildParser#arguments.
    def enterArguments(self, ctx:cbuildParser.ArgumentsContext):
        pass

    # Exit a parse tree produced by cbuildParser#arguments.
    def exitArguments(self, ctx:cbuildParser.ArgumentsContext):
        pass


    # Enter a parse tree produced by cbuildParser#argument.
    def enterArgument(self, ctx:cbuildParser.ArgumentContext):
        pass

    # Exit a parse tree produced by cbuildParser#argument.
    def exitArgument(self, ctx:cbuildParser.ArgumentContext):
        pass


    # Enter a parse tree produced by cbuildParser#rule.
    def enterRule(self, ctx:cbuildParser.RuleContext):
        pass

    # Exit a parse tree produced by cbuildParser#rule.
    def exitRule(self, ctx:cbuildParser.RuleContext):
        pass


    # Enter a parse tree produced by cbuildParser#static_pattern_rule.
    def enterStatic_pattern_rule(self, ctx:cbuildParser.Static_pattern_ruleContext):
        pass

    # Exit a parse tree produced by cbuildParser#static_pattern_rule.
    def exitStatic_pattern_rule(self, ctx:cbuildParser.Static_pattern_ruleContext):
        pass


    # Enter a parse tree produced by cbuildParser#target.
    def enterTarget(self, ctx:cbuildParser.TargetContext):
        pass

    # Exit a parse tree produced by cbuildParser#target.
    def exitTarget(self, ctx:cbuildParser.TargetContext):
        pass


    # Enter a parse tree produced by cbuildParser#pattern.
    def enterPattern(self, ctx:cbuildParser.PatternContext):
        pass

    # Exit a parse tree produced by cbuildParser#pattern.
    def exitPattern(self, ctx:cbuildParser.PatternContext):
        pass


    # Enter a parse tree produced by cbuildParser#prerequisites.
    def enterPrerequisites(self, ctx:cbuildParser.PrerequisitesContext):
        pass

    # Exit a parse tree produced by cbuildParser#prerequisites.
    def exitPrerequisites(self, ctx:cbuildParser.PrerequisitesContext):
        pass


    # Enter a parse tree produced by cbuildParser#orderonlyprerequisites.
    def enterOrderonlyprerequisites(self, ctx:cbuildParser.OrderonlyprerequisitesContext):
        pass

    # Exit a parse tree produced by cbuildParser#orderonlyprerequisites.
    def exitOrderonlyprerequisites(self, ctx:cbuildParser.OrderonlyprerequisitesContext):
        pass


    # Enter a parse tree produced by cbuildParser#targets.
    def enterTargets(self, ctx:cbuildParser.TargetsContext):
        pass

    # Exit a parse tree produced by cbuildParser#targets.
    def exitTargets(self, ctx:cbuildParser.TargetsContext):
        pass


    # Enter a parse tree produced by cbuildParser#recipes.
    def enterRecipes(self, ctx:cbuildParser.RecipesContext):
        pass

    # Exit a parse tree produced by cbuildParser#recipes.
    def exitRecipes(self, ctx:cbuildParser.RecipesContext):
        pass


    # Enter a parse tree produced by cbuildParser#recipes_opt.
    def enterRecipes_opt(self, ctx:cbuildParser.Recipes_optContext):
        pass

    # Exit a parse tree produced by cbuildParser#recipes_opt.
    def exitRecipes_opt(self, ctx:cbuildParser.Recipes_optContext):
        pass


    # Enter a parse tree produced by cbuildParser#recipe.
    def enterRecipe(self, ctx:cbuildParser.RecipeContext):
        pass

    # Exit a parse tree produced by cbuildParser#recipe.
    def exitRecipe(self, ctx:cbuildParser.RecipeContext):
        pass


    # Enter a parse tree produced by cbuildParser#empty_recipe_line.
    def enterEmpty_recipe_line(self, ctx:cbuildParser.Empty_recipe_lineContext):
        pass

    # Exit a parse tree produced by cbuildParser#empty_recipe_line.
    def exitEmpty_recipe_line(self, ctx:cbuildParser.Empty_recipe_lineContext):
        pass


    # Enter a parse tree produced by cbuildParser#undefine.
    def enterUndefine(self, ctx:cbuildParser.UndefineContext):
        pass

    # Exit a parse tree produced by cbuildParser#undefine.
    def exitUndefine(self, ctx:cbuildParser.UndefineContext):
        pass


    # Enter a parse tree produced by cbuildParser#specifiers.
    def enterSpecifiers(self, ctx:cbuildParser.SpecifiersContext):
        pass

    # Exit a parse tree produced by cbuildParser#specifiers.
    def exitSpecifiers(self, ctx:cbuildParser.SpecifiersContext):
        pass


    # Enter a parse tree produced by cbuildParser#identifier.
    def enterIdentifier(self, ctx:cbuildParser.IdentifierContext):
        pass

    # Exit a parse tree produced by cbuildParser#identifier.
    def exitIdentifier(self, ctx:cbuildParser.IdentifierContext):
        pass


    # Enter a parse tree produced by cbuildParser#identifier_atom.
    def enterIdentifier_atom(self, ctx:cbuildParser.Identifier_atomContext):
        pass

    # Exit a parse tree produced by cbuildParser#identifier_atom.
    def exitIdentifier_atom(self, ctx:cbuildParser.Identifier_atomContext):
        pass


    # Enter a parse tree produced by cbuildParser#br.
    def enterBr(self, ctx:cbuildParser.BrContext):
        pass

    # Exit a parse tree produced by cbuildParser#br.
    def exitBr(self, ctx:cbuildParser.BrContext):
        pass


    # Enter a parse tree produced by cbuildParser#char.
    def enterChar(self, ctx:cbuildParser.CharContext):
        pass

    # Exit a parse tree produced by cbuildParser#char.
    def exitChar(self, ctx:cbuildParser.CharContext):
        pass


    # Enter a parse tree produced by cbuildParser#char_nested.
    def enterChar_nested(self, ctx:cbuildParser.Char_nestedContext):
        pass

    # Exit a parse tree produced by cbuildParser#char_nested.
    def exitChar_nested(self, ctx:cbuildParser.Char_nestedContext):
        pass


    # Enter a parse tree produced by cbuildParser#char_in_assign.
    def enterChar_in_assign(self, ctx:cbuildParser.Char_in_assignContext):
        pass

    # Exit a parse tree produced by cbuildParser#char_in_assign.
    def exitChar_in_assign(self, ctx:cbuildParser.Char_in_assignContext):
        pass


    # Enter a parse tree produced by cbuildParser#char_in_def.
    def enterChar_in_def(self, ctx:cbuildParser.Char_in_defContext):
        pass

    # Exit a parse tree produced by cbuildParser#char_in_def.
    def exitChar_in_def(self, ctx:cbuildParser.Char_in_defContext):
        pass


    # Enter a parse tree produced by cbuildParser#char_in_recipe.
    def enterChar_in_recipe(self, ctx:cbuildParser.Char_in_recipeContext):
        pass

    # Exit a parse tree produced by cbuildParser#char_in_recipe.
    def exitChar_in_recipe(self, ctx:cbuildParser.Char_in_recipeContext):
        pass


    # Enter a parse tree produced by cbuildParser#text.
    def enterText(self, ctx:cbuildParser.TextContext):
        pass

    # Exit a parse tree produced by cbuildParser#text.
    def exitText(self, ctx:cbuildParser.TextContext):
        pass


    # Enter a parse tree produced by cbuildParser#text_nested.
    def enterText_nested(self, ctx:cbuildParser.Text_nestedContext):
        pass

    # Exit a parse tree produced by cbuildParser#text_nested.
    def exitText_nested(self, ctx:cbuildParser.Text_nestedContext):
        pass


    # Enter a parse tree produced by cbuildParser#text_in_assign.
    def enterText_in_assign(self, ctx:cbuildParser.Text_in_assignContext):
        pass

    # Exit a parse tree produced by cbuildParser#text_in_assign.
    def exitText_in_assign(self, ctx:cbuildParser.Text_in_assignContext):
        pass


    # Enter a parse tree produced by cbuildParser#text_in_recipe.
    def enterText_in_recipe(self, ctx:cbuildParser.Text_in_recipeContext):
        pass

    # Exit a parse tree produced by cbuildParser#text_in_recipe.
    def exitText_in_recipe(self, ctx:cbuildParser.Text_in_recipeContext):
        pass


    # Enter a parse tree produced by cbuildParser#keywords.
    def enterKeywords(self, ctx:cbuildParser.KeywordsContext):
        pass

    # Exit a parse tree produced by cbuildParser#keywords.
    def exitKeywords(self, ctx:cbuildParser.KeywordsContext):
        pass


    # Enter a parse tree produced by cbuildParser#colon.
    def enterColon(self, ctx:cbuildParser.ColonContext):
        pass

    # Exit a parse tree produced by cbuildParser#colon.
    def exitColon(self, ctx:cbuildParser.ColonContext):
        pass


    # Enter a parse tree produced by cbuildParser#comment_opt.
    def enterComment_opt(self, ctx:cbuildParser.Comment_optContext):
        pass

    # Exit a parse tree produced by cbuildParser#comment_opt.
    def exitComment_opt(self, ctx:cbuildParser.Comment_optContext):
        pass


    # Enter a parse tree produced by cbuildParser#ws.
    def enterWs(self, ctx:cbuildParser.WsContext):
        pass

    # Exit a parse tree produced by cbuildParser#ws.
    def exitWs(self, ctx:cbuildParser.WsContext):
        pass


    # Enter a parse tree produced by cbuildParser#hook.
    def enterHook(self, ctx:cbuildParser.HookContext):
        pass

    # Exit a parse tree produced by cbuildParser#hook.
    def exitHook(self, ctx:cbuildParser.HookContext):
        pass


    # Enter a parse tree produced by cbuildParser#hook_program.
    def enterHook_program(self, ctx:cbuildParser.Hook_programContext):
        pass

    # Exit a parse tree produced by cbuildParser#hook_program.
    def exitHook_program(self, ctx:cbuildParser.Hook_programContext):
        pass



del cbuildParser