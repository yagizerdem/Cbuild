import { AbstractParseTreeVisitor, ParseTree } from "antlr4ng";
import { cbuildVisitor } from "@parser/cbuildVisitor.js";
import {
  ArgumentContext,
  ArgumentsContext,
  Assignment_prefixContext,
  AssignmentContext,
  Char_in_assignContext,
  Char_in_defContext,
  CbuildfileContext,
  ConditionContext,
  Conditional_in_recipeContext,
  ConditionalContext,
  DefineContext,
  DefinitionContext,
  Expr_in_assign_atomContext,
  Expr_in_assignContext,
  Expr_in_recipe_atomContext,
  Expr_in_recipeContext,
  Expr_nested_atomContext,
  Expr_nestedContext,
  Expression_atomContext,
  ExpressionContext,
  Expressions_optContext,
  ExpressionsContext,
  Exprs_in_assignContext,
  Exprs_in_defContext,
  Exprs_in_recipeContext,
  First_expr_in_defContext,
  Function_name_atomContext,
  Function_nameContext,
  FunctionContext,
  IdentifierContext,
  OrderonlyprerequisitesContext,
  PatternContext,
  PrerequisitesContext,
  RecipeContext,
  Recipes_optContext,
  RecipesContext,
  RuleContext,
  Statements_optContext,
  StatementContext,
  StatementsContext,
  Static_pattern_ruleContext,
  TargetsContext,
  Text_in_recipeContext,
  Vpath_argsContext,
  VpathContext,
  WsContext,
  IncludeContext,
  Exprs_nestedContext,
} from "@parser/cbuildParser.js";
import {
  AssignmentIR,
  AssignmentPrefix,
  AssignmentType,
  ConditionalIR,
  Condition,
  DefineIR,
  FunctionIR,
  IR,
  NormalRuleIR,
  RecipeIR,
  RuleSeparator,
  StaticPatternRuleIR,
  TargetRuleIR,
  ValueIR,
  ValuePart,
  VpathIR,
  assignmentPrefixFromSymbol,
  assignmentTypeFromSymbol,
  conditionKindFromKeyword,
  functionCallPart,
  ruleSeparatorFromSymbol,
  textPart,
  varRefPart,
  IncludeIR,
  Include,
} from "@compiler/ir.js";
import {
  make_function_dispatcher,
  MakeFunctionHandler,
} from "@src/gnu-make-functions/make_function_dispatcher.js";

type AssignmentPrefixPair = [AssignmentPrefix, ValuePart[]];

export class CBuildCompiler
  extends AbstractParseTreeVisitor<unknown>
  implements cbuildVisitor<unknown>
{
  public compiled_program: IR[];
  private readonly dispatcher;

  public constructor() {
    super();
    this.compiled_program = [];
    this.dispatcher = new make_function_dispatcher();
  }

  protected defaultResult(): unknown {
    return undefined;
  }

  public compile(cbuildfileContext: CbuildfileContext): IR[] {
    this.compiled_program = []; // clear
    this.compiled_program = cbuildfileContext.accept(this) as IR[];
    return this.compiled_program;
  }

  public visitCbuildfile(ctx: CbuildfileContext): unknown {
    if (ctx.statements() == null) {
      return [] as IR[];
    }

    return ctx.statements()!.accept(this);
  }

  public visitStatements(ctx: StatementsContext): unknown {
    const statements: IR[] = [];
    for (const stmt_ctx of ctx.statement()) {
      const ir = stmt_ctx.accept(this) as IR;
      if (ir == null) continue;
      statements.push(ir);
    }
    return statements;
  }

  public visitStatement(ctx: StatementContext): unknown {
    if (ctx.assignment() != null) {
      return ctx.assignment()!.accept(this);
    } else if (ctx.conditional() != null) {
      return ctx.conditional()!.accept(this);
    } else if (ctx.rule() != null) {
      return ctx.rule()!.accept(this);
    } else if (ctx.function() != null) {
      const callee = ctx.function()!.accept(this) as ValuePart;
      const value = new ValueIR([callee]);
      return value;
    } else if (ctx.define() != null) {
      const defineIR = ctx.define()!.accept(this) as DefineIR;
      return defineIR;
    } else if (ctx.vpath() != null) {
      const vpathIR = ctx.vpath()!.accept(this) as VpathIR;
      return vpathIR;
    } else if (ctx.include() != null) {
      const includeIR = ctx.include()!.accept(this) as IncludeIR;
      return includeIR;
    } else if (ctx.COMMENT() != null) {
      return null; // ignore comments
    }

    throw new Error(
      "Unsupported statement at line " +
        ctx.start?.line +
        ", column " +
        ctx.start?.column +
        ": `" +
        ctx.getText() +
        "`",
    );
  }

  public visitAssignment(ctx: AssignmentContext): unknown {
    const assignmentIR = new AssignmentIR();

    assignmentIR.type = assignmentTypeFromSymbol(
      ctx.ASSIGN_OP().getText().trim(),
    );

    if (ctx.pattern() != null && !ctx.pattern()!.isEmpty()) {
      // left value
      const left_parts = ctx.pattern()!.accept(this) as ValuePart[];
      const left_valueIR = new ValueIR(left_parts);

      let right_valueIR = new ValueIR([]);
      if (ctx.exprs_in_assign() != null) {
        const right_parts = ctx.exprs_in_assign()!.accept(this) as ValuePart[];
        right_valueIR = new ValueIR(right_parts);
      }

      assignmentIR.left = left_valueIR;
      assignmentIR.right = right_valueIR;
    } else {
      const pair = ctx
        .assignment_prefix()!
        .accept(this) as AssignmentPrefixPair;

      const left_parts = pair[1];
      const left_valueIR = new ValueIR(left_parts);

      let right_valueIR = new ValueIR([textPart("")]);
      if (ctx.exprs_in_assign() != null) {
        const right_parts = ctx.exprs_in_assign()!.accept(this) as ValuePart[];
        right_valueIR = new ValueIR(right_parts);
      }

      assignmentIR.left = left_valueIR;
      assignmentIR.right = right_valueIR;

      const specifier = pair[0];
      assignmentIR.prefix = specifier;
    }

    return assignmentIR;
  }

  public visitAssignment_prefix(ctx: Assignment_prefixContext): unknown {
    const specifier = ctx.specifiers().getText().trim();
    const prefix = assignmentPrefixFromSymbol(specifier);
    const parts = ctx.pattern().accept(this) as ValuePart[];
    const pair: AssignmentPrefixPair = [prefix, parts];
    return pair;
  }

  public visitPattern(ctx: PatternContext): unknown {
    const parts: ValuePart[] = [];

    for (const ast_node of ctx.children ?? []) {
      const part = ast_node.accept(this);
      this.collectValueParts(parts, part);
    }

    return parts;
  }

  public visitExprs_in_assign(ctx: Exprs_in_assignContext): unknown {
    const parts: ValuePart[] = [];
    for (let i = 0; i < (ctx.children?.length ?? 0); i++) {
      const ast_node = ctx.children![i];
      if (i === 0 && ast_node.getText().trim().length === 0) continue; // skip first WS
      const part_s = ast_node.accept(this);
      this.collectValueParts(parts, part_s);
    }

    return parts;
  }

  public visitExpr_in_assign(ctx: Expr_in_assignContext): unknown {
    const parts: ValuePart[] = [];
    for (const atom_ctx of ctx.expr_in_assign_atom()) {
      if (atom_ctx.function() != null && !atom_ctx.function()!.isEmpty) {
        const atom = atom_ctx.function()!.accept(this);
        if (this.isValuePart(atom)) {
          parts.push(atom);
        }
      } else if (
        atom_ctx.text_in_assign() != null &&
        !atom_ctx.text_in_assign()!.isEmpty
      ) {
        let lexeme = "";
        for (const char_ctx of atom_ctx.text_in_assign()!.char_in_assign()) {
          lexeme += char_ctx.accept(this) as string;
        }
        const text_part = textPart(lexeme);
        parts.push(text_part);
      }
    }
    return parts;
  }

  public visitChar_in_assign(ctx: Char_in_assignContext): unknown {
    if (ctx.getText() === "$$") {
      return "$";
    }

    return ctx.getText();
  }

  public visitFunction(ctx: FunctionContext): ValuePart {
    if (ctx.VAR() != null) {
      return this.compileVarRef(ctx);
    }

    const name = ctx.function_name()!.getText();
    if (this.dispatcher.has(name)) {
      const handler: MakeFunctionHandler = this.dispatcher.getHandler(name);
      const functionIr: FunctionIR = handler.compile(ctx);
      const calee: ValuePart = functionCallPart(functionIr);
      return calee;
    }

    const parts: ValuePart[] = [];

    for (let i = 0; i < ctx.getChildCount(); i++) {
      const child = ctx.getChild(i) as ParseTree;
      const result = child.accept(this);
      this.collectValueParts(parts, result);
    }

    return varRefPart(new ValueIR(parts));
  }

  public visitFunction_name(ctx: Function_nameContext): ValuePart[] {
    const parts: ValuePart[] = [];
    for (const atom_ctx of ctx.function_name_atom()) {
      const result = atom_ctx.accept(this);
      this.collectValueParts(parts, result);
    }

    return parts;
  }

  public visitFunction_name_atom(ctx: Function_name_atomContext): ValuePart {
    if (ctx.CHARS() != null) {
      return textPart(ctx.CHARS()!.getText());
    }
    if (ctx.function() != null) {
      return ctx.function()!.accept(this) as ValuePart;
    }
    return textPart("");
  }

  public visitArguments(ctx: ArgumentsContext): ValuePart[] {
    const parts: ValuePart[] = [];
    for (const args_ctx of ctx.argument()) {
      const result = args_ctx.accept(this);
      this.collectValueParts(parts, result);
    }

    return parts;
  }

  public visitArgument(ctx: ArgumentContext): ValuePart[] {
    const parts: ValuePart[] = [];
    const result = ctx.expressions().accept(this);
    this.collectValueParts(parts, result);
    return parts;
  }

  private compileVarRef(ctx: FunctionContext): ValuePart {
    const raw = ctx.VAR()!.getText();
    const part = textPart(raw);
    const value = new ValueIR([part]);
    return varRefPart(value);
  }

  public visitConditional(ctx: ConditionalContext): ConditionalIR {
    const conditionalIR = new ConditionalIR();

    if (ctx.if_eq_kw() != null) {
      conditionalIR.kind = conditionKindFromKeyword(ctx.if_eq_kw()!.getText());
      conditionalIR.condition = ctx.condition()!.accept(this) as Condition;
    } else if (ctx.if_def_kw() != null) {
      conditionalIR.kind = conditionKindFromKeyword(ctx.if_def_kw()!.getText());

      const condition: Condition = {};
      const result = ctx.identifier()!.accept(this);
      const parts: ValuePart[] = [];
      this.collectValueParts(parts, result);

      condition.left = new ValueIR(parts);
      condition.right = undefined;

      conditionalIR.condition = condition;
    }

    if (ctx.statements_opt(0) != null) {
      const thenResult = ctx.statements_opt(0)!.accept(this);

      if (Array.isArray(thenResult)) {
        for (const obj of thenResult) {
          if (this.isIR(obj)) {
            conditionalIR.thenBranch.push(obj);
          }
        }
      }
    }

    if (ctx.statements_opt().length > 1 && ctx.statements_opt(1) != null) {
      const elseResult = ctx.statements_opt(1)!.accept(this);

      if (Array.isArray(elseResult)) {
        for (const obj of elseResult) {
          if (this.isIR(obj)) {
            conditionalIR.elseBranch.push(obj);
          }
        }
      }
    } else if (ctx.conditional() != null) {
      const elseConditional = ctx.conditional()!.accept(this);

      if (this.isIR(elseConditional)) {
        conditionalIR.elseBranch.push(elseConditional);
      }
    }

    return conditionalIR;
  }

  public visitCondition(ctx: ConditionContext): Condition {
    const condition: Condition = {};

    if (ctx.expressions_opt().length === 2) {
      if (ctx.expressions_opt(0)?.expressions() != null) {
        const leftParts = ctx.expressions_opt(0)!.accept(this) as ValuePart[];
        condition.left = new ValueIR(leftParts);
      } else {
        condition.left = new ValueIR();
      }

      if (ctx.expressions_opt(1)?.expressions() != null) {
        const rightParts = ctx.expressions_opt(1)!.accept(this) as ValuePart[];
        condition.right = new ValueIR(rightParts);
      } else {
        condition.right = new ValueIR();
      }

      return condition;
    }

    const left = this.unquote(ctx.SLIT(0)?.getText() || "");
    const right = this.unquote(ctx.SLIT(1)?.getText() || "");

    condition.left = new ValueIR([textPart(left)]);

    condition.right = new ValueIR([textPart(right)]);

    return condition;
  }

  public visitIdentifier(ctx: IdentifierContext): ValuePart {
    const text_part = textPart(ctx.getText());
    return text_part;
  }

  public visitExpressions_opt(ctx: Expressions_optContext): ValuePart[] {
    if (ctx.expressions() == null) {
      return [] as ValuePart[];
    }

    return ctx.expressions()!.accept(this) as ValuePart[];
  }

  public visitExpressions(ctx: ExpressionsContext): ValuePart[] {
    const parts: ValuePart[] = [];

    for (const astNode of ctx.children ?? []) {
      const part = astNode.accept(this);

      this.collectValueParts(parts, part);
    }

    return parts;
  }

  public visitExpression(ctx: ExpressionContext): unknown {
    const parts: ValuePart[] = [];

    for (const astNode of ctx.children ?? []) {
      const part = astNode.accept(this);

      this.collectValueParts(parts, part);
    }

    return parts;
  }

  public visitExpression_atom(ctx: Expression_atomContext): unknown {
    if (ctx.text() != null) {
      return textPart(ctx.text()!.getText());
    }

    if (ctx.function() != null) {
      return ctx.function()!.accept(this);
    }

    if (ctx.exprs_nested() != null) {
      const parts = ctx.exprs_nested()!.accept(this) as ValuePart[];

      return varRefPart(new ValueIR(parts));
    }

    return undefined;
  }

  public visitExpr_nested(ctx: Expr_nestedContext): unknown {
    const parts: ValuePart[] = [];

    for (const astNode of ctx.children ?? []) {
      const part = astNode.accept(this);

      this.collectValueParts(parts, part);
    }

    return parts;
  }

  public visitExpr_nested_atom(ctx: Expr_nested_atomContext): unknown {
    if (ctx.text_nested() != null) {
      return textPart(ctx.text_nested()!.getText());
    }

    if (ctx.function() != null) {
      return ctx.function()!.accept(this);
    }

    if (ctx.exprs_nested() != null) {
      const parts = ctx.exprs_nested()!.accept(this) as ValuePart[];

      return varRefPart(new ValueIR(parts));
    }

    return undefined;
  }

  public visitExprs_nested(ctx: Exprs_nestedContext): ValuePart[] {
    const parts: ValuePart[] = [];

    for (const child of ctx.children ?? []) {
      this.collectValueParts(parts, child.accept(this));
    }

    return parts;
  }

  public visitStatements_opt(ctx: Statements_optContext): unknown {
    if (ctx.statements() != null) {
      return ctx.statements().accept(this);
    }

    return [];
  }

  public visitRule(ctx: RuleContext): unknown {
    if (ctx.static_pattern_rule() != null) {
      return ctx.static_pattern_rule()!.accept(this);
    }

    const targetsIR = ctx.targets()!.accept(this) as ValueIR[];

    const ruleSeparator = ruleSeparatorFromSymbol(
      ctx.colon()!.getText().trim(),
    );

    if (ctx.assignment() == null) {
      const prerequisitesIR = ctx.prerequisites()!.accept(this) as ValueIR[];
      let recipeIRS: RecipeIR[] = [];
      let orderonlyprerequisitesIR: ValueIR[] = [];
      if (ctx.orderonlyprerequisites() != null) {
        orderonlyprerequisitesIR = ctx
          .orderonlyprerequisites()!
          .accept(this) as ValueIR[];
      }

      if (ctx.recipes() != null) {
        recipeIRS = ctx.recipes()!.accept(this) as RecipeIR[];
      }
      const ruleIR = new NormalRuleIR({
        targets: targetsIR,
        prerequisites: prerequisitesIR,
        orderOnlyPrerequisites: orderonlyprerequisitesIR,
        separator: ruleSeparator,
        recipes: recipeIRS,
      });

      return ruleIR;
    } else {
      const assignmentIR = ctx.assignment()!.accept(this) as AssignmentIR;

      const ruleIR = new TargetRuleIR({
        targets: targetsIR,
        separator: ruleSeparator,
        assignment: assignmentIR,
      });

      return ruleIR;
    }
  }

  public visitTargets(ctx: TargetsContext): unknown {
    const targetsIR: ValueIR[] = [];
    for (const target_ctx of ctx.target()) {
      const parts = target_ctx.pattern().accept(this) as ValuePart[];
      const targetValueIR = new ValueIR(parts);
      targetsIR.push(targetValueIR);
    }

    return targetsIR;
  }

  public visitPrerequisites(ctx: PrerequisitesContext): unknown {
    if (ctx.targets() != null) {
      return ctx.targets()!.accept(this);
    }
    return [] as ValueIR[];
  }

  public visitOrderonlyprerequisites(
    ctx: OrderonlyprerequisitesContext,
  ): unknown {
    if (ctx.targets() == null) {
      return [] as ValueIR[];
    }

    return ctx.targets()!.accept(this);
  }

  public visitRecipes(ctx: RecipesContext): unknown {
    const recipes: RecipeIR[] = [];

    for (const recipeCtx of ctx.recipe()) {
      const result = recipeCtx.accept(this);

      if (result instanceof RecipeIR) {
        recipes.push(result);
      }
    }

    return recipes;
  }

  public visitRecipes_opt(ctx: Recipes_optContext): unknown {
    if (ctx.recipes() != null) {
      return ctx.recipes()!.accept(this);
    }

    return [] as RecipeIR[];
  }

  public visitRecipe(ctx: RecipeContext): unknown {
    if (ctx.exprs_in_recipe() != null) {
      const parts = ctx.exprs_in_recipe()!.accept(this) as ValuePart[];

      const recipeIR = RecipeIR.command(new ValueIR(parts));

      return recipeIR;
    }

    if (ctx.COMMENT() != null) {
      return undefined;
    }

    if (ctx.conditional_in_recipe() != null) {
      return ctx.conditional_in_recipe()!.accept(this);
    }

    return undefined;
  }

  public visitExprs_in_recipe(ctx: Exprs_in_recipeContext): unknown {
    const parts: ValuePart[] = [];

    for (const astNode of ctx.children ?? []) {
      const result = astNode.accept(this);

      this.collectValueParts(parts, result);
    }

    return parts;
  }

  public visitExpr_in_recipe(ctx: Expr_in_recipeContext): unknown {
    const parts: ValuePart[] = [];

    for (const atomCtx of ctx.expr_in_recipe_atom()) {
      const result = atomCtx.accept(this);

      this.collectValueParts(parts, result);
    }

    return parts;
  }

  public visitExpr_in_recipe_atom(ctx: Expr_in_recipe_atomContext): unknown {
    if (ctx.text_in_recipe() != null) {
      return textPart(ctx.text_in_recipe()!.getText());
    }

    if (ctx.function() != null) {
      return ctx.function()!.accept(this);
    }

    return undefined;
  }

  public visitText_in_recipe(ctx: Text_in_recipeContext): unknown {
    return textPart(ctx.getText());
  }

  public visitConditional_in_recipe(
    ctx: Conditional_in_recipeContext,
  ): unknown {
    const conditionalIR = new ConditionalIR();

    if (ctx.if_eq_kw() != null) {
      conditionalIR.kind = conditionKindFromKeyword(ctx.if_eq_kw()!.getText());
      conditionalIR.condition = ctx.condition()!.accept(this) as Condition;
    } else if (ctx.if_def_kw() != null) {
      conditionalIR.kind = conditionKindFromKeyword(ctx.if_def_kw()!.getText());

      const condition: Condition = {};

      const result = ctx.identifier()!.accept(this);
      const parts: ValuePart[] = [];

      this.collectValueParts(parts, result);

      condition.left = new ValueIR(parts);
      condition.right = undefined;

      conditionalIR.condition = condition;
    }

    if (ctx.recipes_opt(0) != null) {
      const thenResult = ctx.recipes_opt(0)!.accept(this);

      if (Array.isArray(thenResult)) {
        for (const obj of thenResult) {
          if (obj instanceof RecipeIR) {
            conditionalIR.thenBranch.push(obj);
          }
        }
      }
    }

    if (ctx.recipes_opt().length > 1 && ctx.recipes_opt(1) != null) {
      const elseResult = ctx.recipes_opt(1)!.accept(this);

      if (Array.isArray(elseResult)) {
        for (const obj of elseResult) {
          if (obj instanceof RecipeIR) {
            conditionalIR.elseBranch.push(obj);
          }
        }
      }
    } else if (ctx.conditional_in_recipe() != null) {
      const elseConditional = ctx.conditional_in_recipe()!.accept(this);

      if (this.isIR(elseConditional)) {
        conditionalIR.elseBranch.push(elseConditional);
      }
    }

    return conditionalIR;
  }

  public visitStatic_pattern_rule(ctx: Static_pattern_ruleContext): unknown {
    const targetsIR = ctx.targets().accept(this) as ValueIR[];

    const ruleSeparator = ruleSeparatorFromSymbol(
      ctx.colon(0)?.getText().trim() || "",
    );

    const targetPatternParts = ctx.pattern().accept(this) as ValuePart[];

    const targetPatternIR = new ValueIR(targetPatternParts);

    let prerequisitesIR: ValueIR[] = [];
    let orderonlyprerequisitesIR: ValueIR[] = [];

    if (ctx.prerequisites() != null) {
      prerequisitesIR = ctx.prerequisites().accept(this) as ValueIR[];
    }

    if (ctx.orderonlyprerequisites() != null) {
      orderonlyprerequisitesIR = ctx
        .orderonlyprerequisites()!
        .accept(this) as ValueIR[];
    }

    let recipeIRS: RecipeIR[] = [];

    if (ctx.recipes() != null) {
      recipeIRS = ctx.recipes()!.accept(this) as RecipeIR[];
    }

    return new StaticPatternRuleIR({
      targets: targetsIR,
      separator: ruleSeparator,
      targetPattern: targetPatternIR,
      prerequisites: prerequisitesIR,
      orderOnlyPrerequisites: orderonlyprerequisitesIR,
      recipes: recipeIRS,
    });
  }

  public visitDefine(ctx: DefineContext): unknown {
    const defineIR = new DefineIR();

    if (ctx.specifiers() != null) {
      const specifier = ctx.specifiers()!.getText().trim();
      defineIR.specifiers = assignmentPrefixFromSymbol(specifier);
    }

    const parts = ctx.pattern().accept(this) as ValuePart[];
    defineIR.name = new ValueIR(parts);

    if (ctx.ASSIGN_OP() != null) {
      defineIR.assignmentType = assignmentTypeFromSymbol(
        ctx.ASSIGN_OP()!.getText().trim(),
      );
    }

    const valueParts = ctx.definition().accept(this) as ValuePart[];
    defineIR.value = new ValueIR(valueParts);

    return defineIR;
  }

  public visitDefinition(ctx: DefinitionContext): unknown {
    if (ctx.exprs_in_def() == null) {
      return [] as ValuePart[];
    }

    return ctx.exprs_in_def()!.accept(this);
  }

  public visitExprs_in_def(ctx: Exprs_in_defContext): unknown {
    const parts: ValuePart[] = [];

    if (ctx.br().length > 0 && ctx.first_expr_in_def().length === 0) {
      return parts;
    }

    for (const astNode of ctx.children ?? []) {
      if (astNode.constructor.name === "BrContext") {
        const text = textPart("\n");
        parts.push(text);
      } else {
        const result = astNode.accept(this);

        this.collectValueParts(parts, result);
      }
    }

    return parts;
  }

  public visitFirst_expr_in_def(ctx: First_expr_in_defContext): unknown {
    const parts: ValuePart[] = [];

    for (const astNode of ctx.children ?? []) {
      const result = astNode.accept(this);

      this.collectValueParts(parts, result);
    }

    return parts;
  }

  public visitChar_in_def(ctx: Char_in_defContext): unknown {
    return textPart(ctx.getText());
  }

  public visitVpath(ctx: VpathContext): VpathIR {
    if (ctx.vpath_args() == null) {
      return VpathIR.clearAll();
    }

    return ctx.vpath_args()!.accept(this) as VpathIR;
  }

  public visitVpath_args(ctx: Vpath_argsContext): VpathIR {
    const arg = new ValueIR(ctx.pattern().accept(this) as ValuePart[]);

    if (ctx.expressions() == null) {
      return VpathIR.clearPattern(arg);
    }

    const directoryParts = ctx.expressions()!.accept(this) as ValuePart[];
    const directories = this.splitValuesAtWhitespace(directoryParts);

    return VpathIR.setPattern(arg, directories);
  }

  public visitWs(ctx: WsContext): ValuePart {
    const part = textPart(ctx.getText());
    return part;
  }

  public visitInclude(ctx: IncludeContext): IncludeIR {
    const parts = ctx.expressions()!.accept(this) as ValuePart[];

    if (ctx.include_kw().DASH_INCLUDE() != null)
      return IncludeIR.dashInclude(new ValueIR(parts));
    else if (ctx.include_kw().INCLUDE() != null)
      return IncludeIR.include(new ValueIR(parts));
    else if (ctx.include_kw().SINCLUDE() != null)
      return IncludeIR.sinclude(new ValueIR(parts));

    throw new Error("Unknown include type");
  }

  // utility

  private collectValueParts(destination: ValuePart[], result: unknown): void {
    if (result == null) {
      return;
    }

    if (this.isValuePart(result)) {
      destination.push(result);
      return;
    }

    if (Array.isArray(result)) {
      for (const item of result) {
        this.collectValueParts(destination, item);
      }
    }
  }

  private isValuePart(value: unknown): value is ValuePart {
    if (typeof value !== "object" || value == null || !("kind" in value)) {
      return false;
    }

    return (
      value.kind === "text" ||
      value.kind === "variable-reference" ||
      value.kind === "function-call"
    );
  }

  private isIR(value: unknown): value is IR {
    return (
      typeof value === "object" &&
      value != null &&
      "exec" in value &&
      typeof value.exec === "function"
    );
  }

  private unquote(value: string): string {
    if (value.length >= 2) {
      const first = value[0];
      const last = value[value.length - 1];
      if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
        return value.slice(1, -1);
      }
    }

    return value;
  }

  private splitValuesAtWhitespace(parts: ValuePart[]): ValueIR[] {
    const values: ValueIR[] = [];
    let current: ValuePart[] = [];

    for (const part of parts) {
      if (part.kind !== "text" || !/^\s+$/.test(part.lexeme)) {
        current.push(part);
        continue;
      }

      if (current.length > 0) {
        values.push(new ValueIR(current));
        current = [];
      }
    }

    if (current.length > 0) {
      values.push(new ValueIR(current));
    }

    return values;
  }
}

export { CBuildCompiler as cBuildCompiler };
