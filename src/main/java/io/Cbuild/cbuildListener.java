package io.Cbuild;// Generated from cbuild.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link cbuildParser}.
 */
public interface cbuildListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link cbuildParser#cbuildfile}.
	 * @param ctx the parse tree
	 */
	void enterCbuildfile(cbuildParser.CbuildfileContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#cbuildfile}.
	 * @param ctx the parse tree
	 */
	void exitCbuildfile(cbuildParser.CbuildfileContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#statements}.
	 * @param ctx the parse tree
	 */
	void enterStatements(cbuildParser.StatementsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#statements}.
	 * @param ctx the parse tree
	 */
	void exitStatements(cbuildParser.StatementsContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#conditional}.
	 * @param ctx the parse tree
	 */
	void enterConditional(cbuildParser.ConditionalContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#conditional}.
	 * @param ctx the parse tree
	 */
	void exitConditional(cbuildParser.ConditionalContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#conditional_in_recipe}.
	 * @param ctx the parse tree
	 */
	void enterConditional_in_recipe(cbuildParser.Conditional_in_recipeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#conditional_in_recipe}.
	 * @param ctx the parse tree
	 */
	void exitConditional_in_recipe(cbuildParser.Conditional_in_recipeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#statements_opt}.
	 * @param ctx the parse tree
	 */
	void enterStatements_opt(cbuildParser.Statements_optContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#statements_opt}.
	 * @param ctx the parse tree
	 */
	void exitStatements_opt(cbuildParser.Statements_optContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#statement}.
	 * @param ctx the parse tree
	 */
	void enterStatement(cbuildParser.StatementContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#statement}.
	 * @param ctx the parse tree
	 */
	void exitStatement(cbuildParser.StatementContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#define}.
	 * @param ctx the parse tree
	 */
	void enterDefine(cbuildParser.DefineContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#define}.
	 * @param ctx the parse tree
	 */
	void exitDefine(cbuildParser.DefineContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#definition}.
	 * @param ctx the parse tree
	 */
	void enterDefinition(cbuildParser.DefinitionContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#definition}.
	 * @param ctx the parse tree
	 */
	void exitDefinition(cbuildParser.DefinitionContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#include}.
	 * @param ctx the parse tree
	 */
	void enterInclude(cbuildParser.IncludeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#include}.
	 * @param ctx the parse tree
	 */
	void exitInclude(cbuildParser.IncludeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#export}.
	 * @param ctx the parse tree
	 */
	void enterExport(cbuildParser.ExportContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#export}.
	 * @param ctx the parse tree
	 */
	void exitExport(cbuildParser.ExportContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#vpath}.
	 * @param ctx the parse tree
	 */
	void enterVpath(cbuildParser.VpathContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#vpath}.
	 * @param ctx the parse tree
	 */
	void exitVpath(cbuildParser.VpathContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#vpath_args}.
	 * @param ctx the parse tree
	 */
	void enterVpath_args(cbuildParser.Vpath_argsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#vpath_args}.
	 * @param ctx the parse tree
	 */
	void exitVpath_args(cbuildParser.Vpath_argsContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(cbuildParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(cbuildParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#assignment_prefix}.
	 * @param ctx the parse tree
	 */
	void enterAssignment_prefix(cbuildParser.Assignment_prefixContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#assignment_prefix}.
	 * @param ctx the parse tree
	 */
	void exitAssignment_prefix(cbuildParser.Assignment_prefixContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#if_eq_kw}.
	 * @param ctx the parse tree
	 */
	void enterIf_eq_kw(cbuildParser.If_eq_kwContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#if_eq_kw}.
	 * @param ctx the parse tree
	 */
	void exitIf_eq_kw(cbuildParser.If_eq_kwContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#if_def_kw}.
	 * @param ctx the parse tree
	 */
	void enterIf_def_kw(cbuildParser.If_def_kwContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#if_def_kw}.
	 * @param ctx the parse tree
	 */
	void exitIf_def_kw(cbuildParser.If_def_kwContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#include_kw}.
	 * @param ctx the parse tree
	 */
	void enterInclude_kw(cbuildParser.Include_kwContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#include_kw}.
	 * @param ctx the parse tree
	 */
	void exitInclude_kw(cbuildParser.Include_kwContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#condition}.
	 * @param ctx the parse tree
	 */
	void enterCondition(cbuildParser.ConditionContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#condition}.
	 * @param ctx the parse tree
	 */
	void exitCondition(cbuildParser.ConditionContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expressions_opt}.
	 * @param ctx the parse tree
	 */
	void enterExpressions_opt(cbuildParser.Expressions_optContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expressions_opt}.
	 * @param ctx the parse tree
	 */
	void exitExpressions_opt(cbuildParser.Expressions_optContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expressions}.
	 * @param ctx the parse tree
	 */
	void enterExpressions(cbuildParser.ExpressionsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expressions}.
	 * @param ctx the parse tree
	 */
	void exitExpressions(cbuildParser.ExpressionsContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#exprs_nested}.
	 * @param ctx the parse tree
	 */
	void enterExprs_nested(cbuildParser.Exprs_nestedContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#exprs_nested}.
	 * @param ctx the parse tree
	 */
	void exitExprs_nested(cbuildParser.Exprs_nestedContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#exprs_in_assign}.
	 * @param ctx the parse tree
	 */
	void enterExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#exprs_in_assign}.
	 * @param ctx the parse tree
	 */
	void exitExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#exprs_in_recipe}.
	 * @param ctx the parse tree
	 */
	void enterExprs_in_recipe(cbuildParser.Exprs_in_recipeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#exprs_in_recipe}.
	 * @param ctx the parse tree
	 */
	void exitExprs_in_recipe(cbuildParser.Exprs_in_recipeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#exprs_in_def}.
	 * @param ctx the parse tree
	 */
	void enterExprs_in_def(cbuildParser.Exprs_in_defContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#exprs_in_def}.
	 * @param ctx the parse tree
	 */
	void exitExprs_in_def(cbuildParser.Exprs_in_defContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#first_expr_in_def}.
	 * @param ctx the parse tree
	 */
	void enterFirst_expr_in_def(cbuildParser.First_expr_in_defContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#first_expr_in_def}.
	 * @param ctx the parse tree
	 */
	void exitFirst_expr_in_def(cbuildParser.First_expr_in_defContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(cbuildParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(cbuildParser.ExpressionContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expression_atom}.
	 * @param ctx the parse tree
	 */
	void enterExpression_atom(cbuildParser.Expression_atomContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expression_atom}.
	 * @param ctx the parse tree
	 */
	void exitExpression_atom(cbuildParser.Expression_atomContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expr_nested}.
	 * @param ctx the parse tree
	 */
	void enterExpr_nested(cbuildParser.Expr_nestedContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expr_nested}.
	 * @param ctx the parse tree
	 */
	void exitExpr_nested(cbuildParser.Expr_nestedContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expr_nested_atom}.
	 * @param ctx the parse tree
	 */
	void enterExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expr_nested_atom}.
	 * @param ctx the parse tree
	 */
	void exitExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expr_in_assign}.
	 * @param ctx the parse tree
	 */
	void enterExpr_in_assign(cbuildParser.Expr_in_assignContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expr_in_assign}.
	 * @param ctx the parse tree
	 */
	void exitExpr_in_assign(cbuildParser.Expr_in_assignContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expr_in_assign_atom}.
	 * @param ctx the parse tree
	 */
	void enterExpr_in_assign_atom(cbuildParser.Expr_in_assign_atomContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expr_in_assign_atom}.
	 * @param ctx the parse tree
	 */
	void exitExpr_in_assign_atom(cbuildParser.Expr_in_assign_atomContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expr_in_recipe}.
	 * @param ctx the parse tree
	 */
	void enterExpr_in_recipe(cbuildParser.Expr_in_recipeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expr_in_recipe}.
	 * @param ctx the parse tree
	 */
	void exitExpr_in_recipe(cbuildParser.Expr_in_recipeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#expr_in_recipe_atom}.
	 * @param ctx the parse tree
	 */
	void enterExpr_in_recipe_atom(cbuildParser.Expr_in_recipe_atomContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#expr_in_recipe_atom}.
	 * @param ctx the parse tree
	 */
	void exitExpr_in_recipe_atom(cbuildParser.Expr_in_recipe_atomContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#function}.
	 * @param ctx the parse tree
	 */
	void enterFunction(cbuildParser.FunctionContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#function}.
	 * @param ctx the parse tree
	 */
	void exitFunction(cbuildParser.FunctionContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#function_name}.
	 * @param ctx the parse tree
	 */
	void enterFunction_name(cbuildParser.Function_nameContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#function_name}.
	 * @param ctx the parse tree
	 */
	void exitFunction_name(cbuildParser.Function_nameContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#function_name_atom}.
	 * @param ctx the parse tree
	 */
	void enterFunction_name_atom(cbuildParser.Function_name_atomContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#function_name_atom}.
	 * @param ctx the parse tree
	 */
	void exitFunction_name_atom(cbuildParser.Function_name_atomContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#arguments}.
	 * @param ctx the parse tree
	 */
	void enterArguments(cbuildParser.ArgumentsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#arguments}.
	 * @param ctx the parse tree
	 */
	void exitArguments(cbuildParser.ArgumentsContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#argument}.
	 * @param ctx the parse tree
	 */
	void enterArgument(cbuildParser.ArgumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#argument}.
	 * @param ctx the parse tree
	 */
	void exitArgument(cbuildParser.ArgumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#rule}.
	 * @param ctx the parse tree
	 */
	void enterRule(cbuildParser.RuleContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#rule}.
	 * @param ctx the parse tree
	 */
	void exitRule(cbuildParser.RuleContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#static_pattern_rule}.
	 * @param ctx the parse tree
	 */
	void enterStatic_pattern_rule(cbuildParser.Static_pattern_ruleContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#static_pattern_rule}.
	 * @param ctx the parse tree
	 */
	void exitStatic_pattern_rule(cbuildParser.Static_pattern_ruleContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#target}.
	 * @param ctx the parse tree
	 */
	void enterTarget(cbuildParser.TargetContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#target}.
	 * @param ctx the parse tree
	 */
	void exitTarget(cbuildParser.TargetContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#pattern}.
	 * @param ctx the parse tree
	 */
	void enterPattern(cbuildParser.PatternContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#pattern}.
	 * @param ctx the parse tree
	 */
	void exitPattern(cbuildParser.PatternContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#prerequisites}.
	 * @param ctx the parse tree
	 */
	void enterPrerequisites(cbuildParser.PrerequisitesContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#prerequisites}.
	 * @param ctx the parse tree
	 */
	void exitPrerequisites(cbuildParser.PrerequisitesContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#targets}.
	 * @param ctx the parse tree
	 */
	void enterTargets(cbuildParser.TargetsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#targets}.
	 * @param ctx the parse tree
	 */
	void exitTargets(cbuildParser.TargetsContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#recipes}.
	 * @param ctx the parse tree
	 */
	void enterRecipes(cbuildParser.RecipesContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#recipes}.
	 * @param ctx the parse tree
	 */
	void exitRecipes(cbuildParser.RecipesContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#recipes_opt}.
	 * @param ctx the parse tree
	 */
	void enterRecipes_opt(cbuildParser.Recipes_optContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#recipes_opt}.
	 * @param ctx the parse tree
	 */
	void exitRecipes_opt(cbuildParser.Recipes_optContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#recipe}.
	 * @param ctx the parse tree
	 */
	void enterRecipe(cbuildParser.RecipeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#recipe}.
	 * @param ctx the parse tree
	 */
	void exitRecipe(cbuildParser.RecipeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#specifiers}.
	 * @param ctx the parse tree
	 */
	void enterSpecifiers(cbuildParser.SpecifiersContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#specifiers}.
	 * @param ctx the parse tree
	 */
	void exitSpecifiers(cbuildParser.SpecifiersContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#identifier}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier(cbuildParser.IdentifierContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#identifier}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier(cbuildParser.IdentifierContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#identifier_atom}.
	 * @param ctx the parse tree
	 */
	void enterIdentifier_atom(cbuildParser.Identifier_atomContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#identifier_atom}.
	 * @param ctx the parse tree
	 */
	void exitIdentifier_atom(cbuildParser.Identifier_atomContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#br}.
	 * @param ctx the parse tree
	 */
	void enterBr(cbuildParser.BrContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#br}.
	 * @param ctx the parse tree
	 */
	void exitBr(cbuildParser.BrContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#char}.
	 * @param ctx the parse tree
	 */
	void enterChar(cbuildParser.CharContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#char}.
	 * @param ctx the parse tree
	 */
	void exitChar(cbuildParser.CharContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#char_nested}.
	 * @param ctx the parse tree
	 */
	void enterChar_nested(cbuildParser.Char_nestedContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#char_nested}.
	 * @param ctx the parse tree
	 */
	void exitChar_nested(cbuildParser.Char_nestedContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#char_in_assign}.
	 * @param ctx the parse tree
	 */
	void enterChar_in_assign(cbuildParser.Char_in_assignContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#char_in_assign}.
	 * @param ctx the parse tree
	 */
	void exitChar_in_assign(cbuildParser.Char_in_assignContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#char_in_def}.
	 * @param ctx the parse tree
	 */
	void enterChar_in_def(cbuildParser.Char_in_defContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#char_in_def}.
	 * @param ctx the parse tree
	 */
	void exitChar_in_def(cbuildParser.Char_in_defContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#char_in_recipe}.
	 * @param ctx the parse tree
	 */
	void enterChar_in_recipe(cbuildParser.Char_in_recipeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#char_in_recipe}.
	 * @param ctx the parse tree
	 */
	void exitChar_in_recipe(cbuildParser.Char_in_recipeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#text}.
	 * @param ctx the parse tree
	 */
	void enterText(cbuildParser.TextContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#text}.
	 * @param ctx the parse tree
	 */
	void exitText(cbuildParser.TextContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#text_nested}.
	 * @param ctx the parse tree
	 */
	void enterText_nested(cbuildParser.Text_nestedContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#text_nested}.
	 * @param ctx the parse tree
	 */
	void exitText_nested(cbuildParser.Text_nestedContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#text_in_assign}.
	 * @param ctx the parse tree
	 */
	void enterText_in_assign(cbuildParser.Text_in_assignContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#text_in_assign}.
	 * @param ctx the parse tree
	 */
	void exitText_in_assign(cbuildParser.Text_in_assignContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#text_in_recipe}.
	 * @param ctx the parse tree
	 */
	void enterText_in_recipe(cbuildParser.Text_in_recipeContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#text_in_recipe}.
	 * @param ctx the parse tree
	 */
	void exitText_in_recipe(cbuildParser.Text_in_recipeContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#keywords}.
	 * @param ctx the parse tree
	 */
	void enterKeywords(cbuildParser.KeywordsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#keywords}.
	 * @param ctx the parse tree
	 */
	void exitKeywords(cbuildParser.KeywordsContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#colon}.
	 * @param ctx the parse tree
	 */
	void enterColon(cbuildParser.ColonContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#colon}.
	 * @param ctx the parse tree
	 */
	void exitColon(cbuildParser.ColonContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#comment_opt}.
	 * @param ctx the parse tree
	 */
	void enterComment_opt(cbuildParser.Comment_optContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#comment_opt}.
	 * @param ctx the parse tree
	 */
	void exitComment_opt(cbuildParser.Comment_optContext ctx);
	/**
	 * Enter a parse tree produced by {@link cbuildParser#ws}.
	 * @param ctx the parse tree
	 */
	void enterWs(cbuildParser.WsContext ctx);
	/**
	 * Exit a parse tree produced by {@link cbuildParser#ws}.
	 * @param ctx the parse tree
	 */
	void exitWs(cbuildParser.WsContext ctx);
}