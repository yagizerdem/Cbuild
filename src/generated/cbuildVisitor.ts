// Generated from cbuild.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { CbuildfileContext } from "./cbuildParser.js";
import { StatementsContext } from "./cbuildParser.js";
import { ConditionalContext } from "./cbuildParser.js";
import { Conditional_in_recipeContext } from "./cbuildParser.js";
import { Statements_optContext } from "./cbuildParser.js";
import { StatementContext } from "./cbuildParser.js";
import { DefineContext } from "./cbuildParser.js";
import { DefinitionContext } from "./cbuildParser.js";
import { IncludeContext } from "./cbuildParser.js";
import { ExportContext } from "./cbuildParser.js";
import { VpathContext } from "./cbuildParser.js";
import { Vpath_argsContext } from "./cbuildParser.js";
import { AssignmentContext } from "./cbuildParser.js";
import { Assignment_prefixContext } from "./cbuildParser.js";
import { If_eq_kwContext } from "./cbuildParser.js";
import { If_def_kwContext } from "./cbuildParser.js";
import { Include_kwContext } from "./cbuildParser.js";
import { ConditionContext } from "./cbuildParser.js";
import { Expressions_optContext } from "./cbuildParser.js";
import { ExpressionsContext } from "./cbuildParser.js";
import { Exprs_nestedContext } from "./cbuildParser.js";
import { Exprs_in_assignContext } from "./cbuildParser.js";
import { Exprs_in_recipeContext } from "./cbuildParser.js";
import { Exprs_in_defContext } from "./cbuildParser.js";
import { First_expr_in_defContext } from "./cbuildParser.js";
import { ExpressionContext } from "./cbuildParser.js";
import { Expression_atomContext } from "./cbuildParser.js";
import { Expr_nestedContext } from "./cbuildParser.js";
import { Expr_nested_atomContext } from "./cbuildParser.js";
import { Expr_in_assignContext } from "./cbuildParser.js";
import { Expr_in_assign_atomContext } from "./cbuildParser.js";
import { Expr_in_recipeContext } from "./cbuildParser.js";
import { Expr_in_recipe_atomContext } from "./cbuildParser.js";
import { FunctionContext } from "./cbuildParser.js";
import { Function_nameContext } from "./cbuildParser.js";
import { Function_name_atomContext } from "./cbuildParser.js";
import { ArgumentsContext } from "./cbuildParser.js";
import { ArgumentContext } from "./cbuildParser.js";
import { RuleContext } from "./cbuildParser.js";
import { Static_pattern_ruleContext } from "./cbuildParser.js";
import { TargetContext } from "./cbuildParser.js";
import { PatternContext } from "./cbuildParser.js";
import { PrerequisitesContext } from "./cbuildParser.js";
import { OrderonlyprerequisitesContext } from "./cbuildParser.js";
import { TargetsContext } from "./cbuildParser.js";
import { RecipesContext } from "./cbuildParser.js";
import { Recipes_optContext } from "./cbuildParser.js";
import { RecipeContext } from "./cbuildParser.js";
import { SpecifiersContext } from "./cbuildParser.js";
import { IdentifierContext } from "./cbuildParser.js";
import { Identifier_atomContext } from "./cbuildParser.js";
import { BrContext } from "./cbuildParser.js";
import { CharContext } from "./cbuildParser.js";
import { Char_nestedContext } from "./cbuildParser.js";
import { Char_in_assignContext } from "./cbuildParser.js";
import { Char_in_defContext } from "./cbuildParser.js";
import { Char_in_recipeContext } from "./cbuildParser.js";
import { TextContext } from "./cbuildParser.js";
import { Text_nestedContext } from "./cbuildParser.js";
import { Text_in_assignContext } from "./cbuildParser.js";
import { Text_in_recipeContext } from "./cbuildParser.js";
import { KeywordsContext } from "./cbuildParser.js";
import { ColonContext } from "./cbuildParser.js";
import { Comment_optContext } from "./cbuildParser.js";
import { WsContext } from "./cbuildParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `cbuildParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class cbuildVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `cbuildParser.cbuildfile`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCbuildfile?: (ctx: CbuildfileContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.statements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatements?: (ctx: StatementsContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.conditional`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional?: (ctx: ConditionalContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.conditional_in_recipe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConditional_in_recipe?: (ctx: Conditional_in_recipeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.statements_opt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatements_opt?: (ctx: Statements_optContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.define`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefine?: (ctx: DefineContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefinition?: (ctx: DefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.include`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInclude?: (ctx: IncludeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.export`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExport?: (ctx: ExportContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.vpath`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVpath?: (ctx: VpathContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.vpath_args`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVpath_args?: (ctx: Vpath_argsContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.assignment`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment?: (ctx: AssignmentContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.assignment_prefix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignment_prefix?: (ctx: Assignment_prefixContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.if_eq_kw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_eq_kw?: (ctx: If_eq_kwContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.if_def_kw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIf_def_kw?: (ctx: If_def_kwContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.include_kw`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInclude_kw?: (ctx: Include_kwContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.condition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondition?: (ctx: ConditionContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expressions_opt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressions_opt?: (ctx: Expressions_optContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expressions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressions?: (ctx: ExpressionsContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.exprs_nested`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprs_nested?: (ctx: Exprs_nestedContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.exprs_in_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprs_in_assign?: (ctx: Exprs_in_assignContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.exprs_in_recipe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprs_in_recipe?: (ctx: Exprs_in_recipeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.exprs_in_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExprs_in_def?: (ctx: Exprs_in_defContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.first_expr_in_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFirst_expr_in_def?: (ctx: First_expr_in_defContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expression_atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression_atom?: (ctx: Expression_atomContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expr_nested`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_nested?: (ctx: Expr_nestedContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expr_nested_atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_nested_atom?: (ctx: Expr_nested_atomContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expr_in_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_in_assign?: (ctx: Expr_in_assignContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expr_in_assign_atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_in_assign_atom?: (ctx: Expr_in_assign_atomContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expr_in_recipe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_in_recipe?: (ctx: Expr_in_recipeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.expr_in_recipe_atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpr_in_recipe_atom?: (ctx: Expr_in_recipe_atomContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.function_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_name?: (ctx: Function_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.function_name_atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction_name_atom?: (ctx: Function_name_atomContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.arguments`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArguments?: (ctx: ArgumentsContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.argument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArgument?: (ctx: ArgumentContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.rule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRule?: (ctx: RuleContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.static_pattern_rule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatic_pattern_rule?: (ctx: Static_pattern_ruleContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.target`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTarget?: (ctx: TargetContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.pattern`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPattern?: (ctx: PatternContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.prerequisites`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPrerequisites?: (ctx: PrerequisitesContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.orderonlyprerequisites`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrderonlyprerequisites?: (ctx: OrderonlyprerequisitesContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.targets`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTargets?: (ctx: TargetsContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.recipes`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecipes?: (ctx: RecipesContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.recipes_opt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecipes_opt?: (ctx: Recipes_optContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.recipe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRecipe?: (ctx: RecipeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.specifiers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSpecifiers?: (ctx: SpecifiersContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.identifier_atom`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier_atom?: (ctx: Identifier_atomContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.br`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBr?: (ctx: BrContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.char`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChar?: (ctx: CharContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.char_nested`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChar_nested?: (ctx: Char_nestedContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.char_in_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChar_in_assign?: (ctx: Char_in_assignContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.char_in_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChar_in_def?: (ctx: Char_in_defContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.char_in_recipe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChar_in_recipe?: (ctx: Char_in_recipeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.text`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitText?: (ctx: TextContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.text_nested`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitText_nested?: (ctx: Text_nestedContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.text_in_assign`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitText_in_assign?: (ctx: Text_in_assignContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.text_in_recipe`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitText_in_recipe?: (ctx: Text_in_recipeContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.keywords`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeywords?: (ctx: KeywordsContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.colon`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColon?: (ctx: ColonContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.comment_opt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComment_opt?: (ctx: Comment_optContext) => Result;
	/**
	 * Visit a parse tree produced by `cbuildParser.ws`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWs?: (ctx: WsContext) => Result;
}

