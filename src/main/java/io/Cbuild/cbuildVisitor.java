package io.Cbuild;// Generated from cbuild.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link cbuildParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface cbuildVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link cbuildParser#cbuildfile}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCbuildfile(cbuildParser.CbuildfileContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#statements}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStatements(cbuildParser.StatementsContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#conditional}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitConditional(cbuildParser.ConditionalContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#conditional_in_recipe}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitConditional_in_recipe(cbuildParser.Conditional_in_recipeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#statements_opt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStatements_opt(cbuildParser.Statements_optContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#statement}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitStatement(cbuildParser.StatementContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#define}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefine(cbuildParser.DefineContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#definition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDefinition(cbuildParser.DefinitionContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#include}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitInclude(cbuildParser.IncludeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#export}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExport(cbuildParser.ExportContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#assignment}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssignment(cbuildParser.AssignmentContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#assignment_prefix}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAssignment_prefix(cbuildParser.Assignment_prefixContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#if_eq_kw}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIf_eq_kw(cbuildParser.If_eq_kwContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#if_def_kw}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIf_def_kw(cbuildParser.If_def_kwContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#condition}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCondition(cbuildParser.ConditionContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expressions_opt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressions_opt(cbuildParser.Expressions_optContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expressions}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpressions(cbuildParser.ExpressionsContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#exprs_nested}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExprs_nested(cbuildParser.Exprs_nestedContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#exprs_in_assign}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExprs_in_assign(cbuildParser.Exprs_in_assignContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#exprs_in_recipe}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExprs_in_recipe(cbuildParser.Exprs_in_recipeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#exprs_in_def}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExprs_in_def(cbuildParser.Exprs_in_defContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#first_expr_in_def}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFirst_expr_in_def(cbuildParser.First_expr_in_defContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expression}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpression(cbuildParser.ExpressionContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expression_atom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpression_atom(cbuildParser.Expression_atomContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expr_nested}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpr_nested(cbuildParser.Expr_nestedContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expr_nested_atom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpr_nested_atom(cbuildParser.Expr_nested_atomContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expr_in_assign}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpr_in_assign(cbuildParser.Expr_in_assignContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expr_in_assign_atom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpr_in_assign_atom(cbuildParser.Expr_in_assign_atomContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expr_in_recipe}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpr_in_recipe(cbuildParser.Expr_in_recipeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#expr_in_recipe_atom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitExpr_in_recipe_atom(cbuildParser.Expr_in_recipe_atomContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#function}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunction(cbuildParser.FunctionContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#function_name}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunction_name(cbuildParser.Function_nameContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#function_name_atom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitFunction_name_atom(cbuildParser.Function_name_atomContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#arguments}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArguments(cbuildParser.ArgumentsContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#argument}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitArgument(cbuildParser.ArgumentContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#rule}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRule(cbuildParser.RuleContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#target}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTarget(cbuildParser.TargetContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#pattern}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPattern(cbuildParser.PatternContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#prerequisites}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitPrerequisites(cbuildParser.PrerequisitesContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#targets}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTargets(cbuildParser.TargetsContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#recipes}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRecipes(cbuildParser.RecipesContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#recipes_opt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRecipes_opt(cbuildParser.Recipes_optContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#recipe}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRecipe(cbuildParser.RecipeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#specifiers}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitSpecifiers(cbuildParser.SpecifiersContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#identifier}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIdentifier(cbuildParser.IdentifierContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#identifier_atom}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitIdentifier_atom(cbuildParser.Identifier_atomContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#br}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitBr(cbuildParser.BrContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#char}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitChar(cbuildParser.CharContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#char_nested}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitChar_nested(cbuildParser.Char_nestedContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#char_in_assign}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitChar_in_assign(cbuildParser.Char_in_assignContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#char_in_def}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitChar_in_def(cbuildParser.Char_in_defContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#char_in_recipe}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitChar_in_recipe(cbuildParser.Char_in_recipeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#text}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitText(cbuildParser.TextContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#text_nested}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitText_nested(cbuildParser.Text_nestedContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#text_in_assign}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitText_in_assign(cbuildParser.Text_in_assignContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#text_in_recipe}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitText_in_recipe(cbuildParser.Text_in_recipeContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#keywords}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitKeywords(cbuildParser.KeywordsContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#colon}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitColon(cbuildParser.ColonContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#comment_opt}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitComment_opt(cbuildParser.Comment_optContext ctx);
	/**
	 * Visit a parse tree produced by {@link cbuildParser#ws}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitWs(cbuildParser.WsContext ctx);
}