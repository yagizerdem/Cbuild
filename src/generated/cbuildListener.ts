// Generated from cbuild.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { CbuildfileContext } from "./cbuildParser";
import { StatementsContext } from "./cbuildParser";
import { ConditionalContext } from "./cbuildParser";
import { Conditional_in_recipeContext } from "./cbuildParser";
import { Statements_optContext } from "./cbuildParser";
import { StatementContext } from "./cbuildParser";
import { DefineContext } from "./cbuildParser";
import { DefinitionContext } from "./cbuildParser";
import { IncludeContext } from "./cbuildParser";
import { ExportContext } from "./cbuildParser";
import { VpathContext } from "./cbuildParser";
import { Vpath_argsContext } from "./cbuildParser";
import { AssignmentContext } from "./cbuildParser";
import { Assignment_prefixContext } from "./cbuildParser";
import { If_eq_kwContext } from "./cbuildParser";
import { If_def_kwContext } from "./cbuildParser";
import { Include_kwContext } from "./cbuildParser";
import { ConditionContext } from "./cbuildParser";
import { Expressions_optContext } from "./cbuildParser";
import { ExpressionsContext } from "./cbuildParser";
import { Exprs_nestedContext } from "./cbuildParser";
import { Exprs_in_assignContext } from "./cbuildParser";
import { Exprs_in_recipeContext } from "./cbuildParser";
import { Exprs_in_defContext } from "./cbuildParser";
import { First_expr_in_defContext } from "./cbuildParser";
import { ExpressionContext } from "./cbuildParser";
import { Expression_atomContext } from "./cbuildParser";
import { Expr_nestedContext } from "./cbuildParser";
import { Expr_nested_atomContext } from "./cbuildParser";
import { Expr_in_assignContext } from "./cbuildParser";
import { Expr_in_assign_atomContext } from "./cbuildParser";
import { Expr_in_recipeContext } from "./cbuildParser";
import { Expr_in_recipe_atomContext } from "./cbuildParser";
import { FunctionContext } from "./cbuildParser";
import { Function_nameContext } from "./cbuildParser";
import { Function_name_atomContext } from "./cbuildParser";
import { ArgumentsContext } from "./cbuildParser";
import { ArgumentContext } from "./cbuildParser";
import { RuleContext } from "./cbuildParser";
import { Static_pattern_ruleContext } from "./cbuildParser";
import { TargetContext } from "./cbuildParser";
import { PatternContext } from "./cbuildParser";
import { PrerequisitesContext } from "./cbuildParser";
import { OrderonlyprerequisitesContext } from "./cbuildParser";
import { TargetsContext } from "./cbuildParser";
import { RecipesContext } from "./cbuildParser";
import { Recipes_optContext } from "./cbuildParser";
import { RecipeContext } from "./cbuildParser";
import { SpecifiersContext } from "./cbuildParser";
import { IdentifierContext } from "./cbuildParser";
import { Identifier_atomContext } from "./cbuildParser";
import { BrContext } from "./cbuildParser";
import { CharContext } from "./cbuildParser";
import { Char_nestedContext } from "./cbuildParser";
import { Char_in_assignContext } from "./cbuildParser";
import { Char_in_defContext } from "./cbuildParser";
import { Char_in_recipeContext } from "./cbuildParser";
import { TextContext } from "./cbuildParser";
import { Text_nestedContext } from "./cbuildParser";
import { Text_in_assignContext } from "./cbuildParser";
import { Text_in_recipeContext } from "./cbuildParser";
import { KeywordsContext } from "./cbuildParser";
import { ColonContext } from "./cbuildParser";
import { Comment_optContext } from "./cbuildParser";
import { WsContext } from "./cbuildParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `cbuildParser`.
 */
export interface cbuildListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `cbuildParser.cbuildfile`.
	 * @param ctx the parse tree
	 */
	enterCbuildfile?: (ctx: CbuildfileContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.cbuildfile`.
	 * @param ctx the parse tree
	 */
	exitCbuildfile?: (ctx: CbuildfileContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.statements`.
	 * @param ctx the parse tree
	 */
	enterStatements?: (ctx: StatementsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.statements`.
	 * @param ctx the parse tree
	 */
	exitStatements?: (ctx: StatementsContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.conditional`.
	 * @param ctx the parse tree
	 */
	enterConditional?: (ctx: ConditionalContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.conditional`.
	 * @param ctx the parse tree
	 */
	exitConditional?: (ctx: ConditionalContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.conditional_in_recipe`.
	 * @param ctx the parse tree
	 */
	enterConditional_in_recipe?: (ctx: Conditional_in_recipeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.conditional_in_recipe`.
	 * @param ctx the parse tree
	 */
	exitConditional_in_recipe?: (ctx: Conditional_in_recipeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.statements_opt`.
	 * @param ctx the parse tree
	 */
	enterStatements_opt?: (ctx: Statements_optContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.statements_opt`.
	 * @param ctx the parse tree
	 */
	exitStatements_opt?: (ctx: Statements_optContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.define`.
	 * @param ctx the parse tree
	 */
	enterDefine?: (ctx: DefineContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.define`.
	 * @param ctx the parse tree
	 */
	exitDefine?: (ctx: DefineContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.definition`.
	 * @param ctx the parse tree
	 */
	enterDefinition?: (ctx: DefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.definition`.
	 * @param ctx the parse tree
	 */
	exitDefinition?: (ctx: DefinitionContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.include`.
	 * @param ctx the parse tree
	 */
	enterInclude?: (ctx: IncludeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.include`.
	 * @param ctx the parse tree
	 */
	exitInclude?: (ctx: IncludeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.export`.
	 * @param ctx the parse tree
	 */
	enterExport?: (ctx: ExportContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.export`.
	 * @param ctx the parse tree
	 */
	exitExport?: (ctx: ExportContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.vpath`.
	 * @param ctx the parse tree
	 */
	enterVpath?: (ctx: VpathContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.vpath`.
	 * @param ctx the parse tree
	 */
	exitVpath?: (ctx: VpathContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.vpath_args`.
	 * @param ctx the parse tree
	 */
	enterVpath_args?: (ctx: Vpath_argsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.vpath_args`.
	 * @param ctx the parse tree
	 */
	exitVpath_args?: (ctx: Vpath_argsContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.assignment`.
	 * @param ctx the parse tree
	 */
	enterAssignment?: (ctx: AssignmentContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.assignment`.
	 * @param ctx the parse tree
	 */
	exitAssignment?: (ctx: AssignmentContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.assignment_prefix`.
	 * @param ctx the parse tree
	 */
	enterAssignment_prefix?: (ctx: Assignment_prefixContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.assignment_prefix`.
	 * @param ctx the parse tree
	 */
	exitAssignment_prefix?: (ctx: Assignment_prefixContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.if_eq_kw`.
	 * @param ctx the parse tree
	 */
	enterIf_eq_kw?: (ctx: If_eq_kwContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.if_eq_kw`.
	 * @param ctx the parse tree
	 */
	exitIf_eq_kw?: (ctx: If_eq_kwContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.if_def_kw`.
	 * @param ctx the parse tree
	 */
	enterIf_def_kw?: (ctx: If_def_kwContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.if_def_kw`.
	 * @param ctx the parse tree
	 */
	exitIf_def_kw?: (ctx: If_def_kwContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.include_kw`.
	 * @param ctx the parse tree
	 */
	enterInclude_kw?: (ctx: Include_kwContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.include_kw`.
	 * @param ctx the parse tree
	 */
	exitInclude_kw?: (ctx: Include_kwContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expressions_opt`.
	 * @param ctx the parse tree
	 */
	enterExpressions_opt?: (ctx: Expressions_optContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expressions_opt`.
	 * @param ctx the parse tree
	 */
	exitExpressions_opt?: (ctx: Expressions_optContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expressions`.
	 * @param ctx the parse tree
	 */
	enterExpressions?: (ctx: ExpressionsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expressions`.
	 * @param ctx the parse tree
	 */
	exitExpressions?: (ctx: ExpressionsContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.exprs_nested`.
	 * @param ctx the parse tree
	 */
	enterExprs_nested?: (ctx: Exprs_nestedContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.exprs_nested`.
	 * @param ctx the parse tree
	 */
	exitExprs_nested?: (ctx: Exprs_nestedContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.exprs_in_assign`.
	 * @param ctx the parse tree
	 */
	enterExprs_in_assign?: (ctx: Exprs_in_assignContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.exprs_in_assign`.
	 * @param ctx the parse tree
	 */
	exitExprs_in_assign?: (ctx: Exprs_in_assignContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.exprs_in_recipe`.
	 * @param ctx the parse tree
	 */
	enterExprs_in_recipe?: (ctx: Exprs_in_recipeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.exprs_in_recipe`.
	 * @param ctx the parse tree
	 */
	exitExprs_in_recipe?: (ctx: Exprs_in_recipeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.exprs_in_def`.
	 * @param ctx the parse tree
	 */
	enterExprs_in_def?: (ctx: Exprs_in_defContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.exprs_in_def`.
	 * @param ctx the parse tree
	 */
	exitExprs_in_def?: (ctx: Exprs_in_defContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.first_expr_in_def`.
	 * @param ctx the parse tree
	 */
	enterFirst_expr_in_def?: (ctx: First_expr_in_defContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.first_expr_in_def`.
	 * @param ctx the parse tree
	 */
	exitFirst_expr_in_def?: (ctx: First_expr_in_defContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expression_atom`.
	 * @param ctx the parse tree
	 */
	enterExpression_atom?: (ctx: Expression_atomContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expression_atom`.
	 * @param ctx the parse tree
	 */
	exitExpression_atom?: (ctx: Expression_atomContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expr_nested`.
	 * @param ctx the parse tree
	 */
	enterExpr_nested?: (ctx: Expr_nestedContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expr_nested`.
	 * @param ctx the parse tree
	 */
	exitExpr_nested?: (ctx: Expr_nestedContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expr_nested_atom`.
	 * @param ctx the parse tree
	 */
	enterExpr_nested_atom?: (ctx: Expr_nested_atomContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expr_nested_atom`.
	 * @param ctx the parse tree
	 */
	exitExpr_nested_atom?: (ctx: Expr_nested_atomContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expr_in_assign`.
	 * @param ctx the parse tree
	 */
	enterExpr_in_assign?: (ctx: Expr_in_assignContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expr_in_assign`.
	 * @param ctx the parse tree
	 */
	exitExpr_in_assign?: (ctx: Expr_in_assignContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expr_in_assign_atom`.
	 * @param ctx the parse tree
	 */
	enterExpr_in_assign_atom?: (ctx: Expr_in_assign_atomContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expr_in_assign_atom`.
	 * @param ctx the parse tree
	 */
	exitExpr_in_assign_atom?: (ctx: Expr_in_assign_atomContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expr_in_recipe`.
	 * @param ctx the parse tree
	 */
	enterExpr_in_recipe?: (ctx: Expr_in_recipeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expr_in_recipe`.
	 * @param ctx the parse tree
	 */
	exitExpr_in_recipe?: (ctx: Expr_in_recipeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.expr_in_recipe_atom`.
	 * @param ctx the parse tree
	 */
	enterExpr_in_recipe_atom?: (ctx: Expr_in_recipe_atomContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.expr_in_recipe_atom`.
	 * @param ctx the parse tree
	 */
	exitExpr_in_recipe_atom?: (ctx: Expr_in_recipe_atomContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.function`.
	 * @param ctx the parse tree
	 */
	enterFunction?: (ctx: FunctionContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.function`.
	 * @param ctx the parse tree
	 */
	exitFunction?: (ctx: FunctionContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.function_name`.
	 * @param ctx the parse tree
	 */
	enterFunction_name?: (ctx: Function_nameContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.function_name`.
	 * @param ctx the parse tree
	 */
	exitFunction_name?: (ctx: Function_nameContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.function_name_atom`.
	 * @param ctx the parse tree
	 */
	enterFunction_name_atom?: (ctx: Function_name_atomContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.function_name_atom`.
	 * @param ctx the parse tree
	 */
	exitFunction_name_atom?: (ctx: Function_name_atomContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.arguments`.
	 * @param ctx the parse tree
	 */
	enterArguments?: (ctx: ArgumentsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.arguments`.
	 * @param ctx the parse tree
	 */
	exitArguments?: (ctx: ArgumentsContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.argument`.
	 * @param ctx the parse tree
	 */
	enterArgument?: (ctx: ArgumentContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.argument`.
	 * @param ctx the parse tree
	 */
	exitArgument?: (ctx: ArgumentContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.rule`.
	 * @param ctx the parse tree
	 */
	enterRule?: (ctx: RuleContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.rule`.
	 * @param ctx the parse tree
	 */
	exitRule?: (ctx: RuleContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.static_pattern_rule`.
	 * @param ctx the parse tree
	 */
	enterStatic_pattern_rule?: (ctx: Static_pattern_ruleContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.static_pattern_rule`.
	 * @param ctx the parse tree
	 */
	exitStatic_pattern_rule?: (ctx: Static_pattern_ruleContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.target`.
	 * @param ctx the parse tree
	 */
	enterTarget?: (ctx: TargetContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.target`.
	 * @param ctx the parse tree
	 */
	exitTarget?: (ctx: TargetContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.pattern`.
	 * @param ctx the parse tree
	 */
	enterPattern?: (ctx: PatternContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.pattern`.
	 * @param ctx the parse tree
	 */
	exitPattern?: (ctx: PatternContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.prerequisites`.
	 * @param ctx the parse tree
	 */
	enterPrerequisites?: (ctx: PrerequisitesContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.prerequisites`.
	 * @param ctx the parse tree
	 */
	exitPrerequisites?: (ctx: PrerequisitesContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.orderonlyprerequisites`.
	 * @param ctx the parse tree
	 */
	enterOrderonlyprerequisites?: (ctx: OrderonlyprerequisitesContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.orderonlyprerequisites`.
	 * @param ctx the parse tree
	 */
	exitOrderonlyprerequisites?: (ctx: OrderonlyprerequisitesContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.targets`.
	 * @param ctx the parse tree
	 */
	enterTargets?: (ctx: TargetsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.targets`.
	 * @param ctx the parse tree
	 */
	exitTargets?: (ctx: TargetsContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.recipes`.
	 * @param ctx the parse tree
	 */
	enterRecipes?: (ctx: RecipesContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.recipes`.
	 * @param ctx the parse tree
	 */
	exitRecipes?: (ctx: RecipesContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.recipes_opt`.
	 * @param ctx the parse tree
	 */
	enterRecipes_opt?: (ctx: Recipes_optContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.recipes_opt`.
	 * @param ctx the parse tree
	 */
	exitRecipes_opt?: (ctx: Recipes_optContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.recipe`.
	 * @param ctx the parse tree
	 */
	enterRecipe?: (ctx: RecipeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.recipe`.
	 * @param ctx the parse tree
	 */
	exitRecipe?: (ctx: RecipeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.specifiers`.
	 * @param ctx the parse tree
	 */
	enterSpecifiers?: (ctx: SpecifiersContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.specifiers`.
	 * @param ctx the parse tree
	 */
	exitSpecifiers?: (ctx: SpecifiersContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.identifier_atom`.
	 * @param ctx the parse tree
	 */
	enterIdentifier_atom?: (ctx: Identifier_atomContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.identifier_atom`.
	 * @param ctx the parse tree
	 */
	exitIdentifier_atom?: (ctx: Identifier_atomContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.br`.
	 * @param ctx the parse tree
	 */
	enterBr?: (ctx: BrContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.br`.
	 * @param ctx the parse tree
	 */
	exitBr?: (ctx: BrContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.char`.
	 * @param ctx the parse tree
	 */
	enterChar?: (ctx: CharContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.char`.
	 * @param ctx the parse tree
	 */
	exitChar?: (ctx: CharContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.char_nested`.
	 * @param ctx the parse tree
	 */
	enterChar_nested?: (ctx: Char_nestedContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.char_nested`.
	 * @param ctx the parse tree
	 */
	exitChar_nested?: (ctx: Char_nestedContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.char_in_assign`.
	 * @param ctx the parse tree
	 */
	enterChar_in_assign?: (ctx: Char_in_assignContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.char_in_assign`.
	 * @param ctx the parse tree
	 */
	exitChar_in_assign?: (ctx: Char_in_assignContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.char_in_def`.
	 * @param ctx the parse tree
	 */
	enterChar_in_def?: (ctx: Char_in_defContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.char_in_def`.
	 * @param ctx the parse tree
	 */
	exitChar_in_def?: (ctx: Char_in_defContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.char_in_recipe`.
	 * @param ctx the parse tree
	 */
	enterChar_in_recipe?: (ctx: Char_in_recipeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.char_in_recipe`.
	 * @param ctx the parse tree
	 */
	exitChar_in_recipe?: (ctx: Char_in_recipeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.text`.
	 * @param ctx the parse tree
	 */
	enterText?: (ctx: TextContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.text`.
	 * @param ctx the parse tree
	 */
	exitText?: (ctx: TextContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.text_nested`.
	 * @param ctx the parse tree
	 */
	enterText_nested?: (ctx: Text_nestedContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.text_nested`.
	 * @param ctx the parse tree
	 */
	exitText_nested?: (ctx: Text_nestedContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.text_in_assign`.
	 * @param ctx the parse tree
	 */
	enterText_in_assign?: (ctx: Text_in_assignContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.text_in_assign`.
	 * @param ctx the parse tree
	 */
	exitText_in_assign?: (ctx: Text_in_assignContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.text_in_recipe`.
	 * @param ctx the parse tree
	 */
	enterText_in_recipe?: (ctx: Text_in_recipeContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.text_in_recipe`.
	 * @param ctx the parse tree
	 */
	exitText_in_recipe?: (ctx: Text_in_recipeContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.keywords`.
	 * @param ctx the parse tree
	 */
	enterKeywords?: (ctx: KeywordsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.keywords`.
	 * @param ctx the parse tree
	 */
	exitKeywords?: (ctx: KeywordsContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.colon`.
	 * @param ctx the parse tree
	 */
	enterColon?: (ctx: ColonContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.colon`.
	 * @param ctx the parse tree
	 */
	exitColon?: (ctx: ColonContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.comment_opt`.
	 * @param ctx the parse tree
	 */
	enterComment_opt?: (ctx: Comment_optContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.comment_opt`.
	 * @param ctx the parse tree
	 */
	exitComment_opt?: (ctx: Comment_optContext) => void;

	/**
	 * Enter a parse tree produced by `cbuildParser.ws`.
	 * @param ctx the parse tree
	 */
	enterWs?: (ctx: WsContext) => void;
	/**
	 * Exit a parse tree produced by `cbuildParser.ws`.
	 * @param ctx the parse tree
	 */
	exitWs?: (ctx: WsContext) => void;
}

