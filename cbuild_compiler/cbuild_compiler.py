import re
from typing import Any, Final, TypeIs, cast

from cbuild_compiler.ir import (
    IR,
    AssignmentIR,
    AssignmentPrefix,
    Condition,
    ConditionalIR,
    ConditionKind,
    DefineIR,
    ExportIR,
    ExportSpecifier,
    FunctionIR,
    GlobalExportIR,
    GlobalUnexportIR,
    HookIR,
    IncludeIR,
    NormalRuleIR,
    RecipeIR,
    StaticPatternRuleIR,
    TargetRuleIR,
    TextPart,
    UndefineIR,
    UndefineSpecifier,
    ValueIR,
    ValuePart,
    VpathIR,
    assignment_prefix_from_symbol,
    assignment_type_from_symbol,
    condition_kind_from_keyword,
    function_call_part,
    rule_separator_from_symbol,
    text_part,
    var_ref_part,
)
from cbuild_parser.cbuildParser import cbuildParser
from cbuild_parser.cbuildVisitor import cbuildVisitor
from gnu_make_functions.make_function_dispatcher import make_function_dispatcher
from gnu_make_functions.type import MakeFunctionHandler

type AssignmentPrefixPair = tuple[AssignmentPrefix, list[ValuePart]]


class CBuildCompiler(cbuildVisitor):
    def __init__(self) -> None:
        super().__init__()
        self.compiled_program: list[IR] = []
        self._dispatcher: Final = make_function_dispatcher()

    def defaultResult(self) -> Any:
        return None

    def compile(self, cbuildfile_context: cbuildParser.CbuildfileContext) -> list[IR]:
        self.compiled_program = []  # clear
        self.compiled_program = cast(list[IR], cbuildfile_context.accept(self))
        return self.compiled_program

    def visitCbuildfile(self, ctx: cbuildParser.CbuildfileContext) -> Any:
        if ctx.statements() is None:
            return cast(list[IR], [])

        return ctx.statements().accept(self)

    def visitStatements(self, ctx: cbuildParser.StatementsContext) -> Any:
        statements: list[IR] = []
        for stmt_ctx in ctx.statement():
            ir = cast(IR, stmt_ctx.accept(self))
            if ir is None:
                continue
            statements.append(ir)
        return statements

    def visitStatement(self, ctx: cbuildParser.StatementContext) -> Any:
        if ctx.assignment() is not None:
            return ctx.assignment().accept(self)
        elif ctx.conditional() is not None:
            return ctx.conditional().accept(self)
        elif ctx.rule_() is not None:
            return ctx.rule_().accept(self)
        elif ctx.function() is not None:
            callee = cast(ValuePart, ctx.function().accept(self))
            value = ValueIR([callee])
            return value
        elif ctx.define() is not None:
            define_ir = cast(DefineIR, ctx.define().accept(self))
            return define_ir
        elif ctx.vpath() is not None:
            vpath_ir = cast(VpathIR, ctx.vpath().accept(self))
            return vpath_ir
        elif ctx.include() is not None:
            include_ir = cast(IncludeIR, ctx.include().accept(self))
            return include_ir
        elif ctx.COMMENT() is not None:
            return None  # ignore comments
        elif ctx.hook() is not None:
            hook_ir = cast(HookIR, ctx.hook().accept(self))
            return hook_ir
        elif ctx.undefine() is not None:
            undefine_ir = cast(UndefineIR, ctx.undefine().accept(self))
            return undefine_ir
        elif ctx.export() is not None:
            export_ir = cast(ExportIR, ctx.export().accept(self))
            return export_ir

        # should never reach here if all statement types are handled in parser correctly
        raise Exception(
            f"Unsupported statement at line {ctx.start.line if ctx.start is not None else None}, column {ctx.start.column if ctx.start is not None else None}: `{ctx.getText()}`"
        )

    def visitAssignment(self, ctx: cbuildParser.AssignmentContext) -> Any:
        assignment_type = assignment_type_from_symbol(
            ctx.ASSIGN_OP().getText().strip(),
        )

        assignment_ir = AssignmentIR(assignment_type)

        if ctx.pattern() is not None and not ctx.pattern().isEmpty():
            # left value
            left_parts = cast(list[ValuePart], ctx.pattern().accept(self))
            left_value_ir = ValueIR(left_parts)

            right_value_ir = ValueIR([])
            if ctx.exprs_in_assign() is not None:
                right_parts = cast(list[ValuePart], ctx.exprs_in_assign().accept(self))
                right_value_ir = ValueIR(right_parts)

            assignment_ir.left = left_value_ir
            assignment_ir.right = right_value_ir
        else:
            pair = cast(
                AssignmentPrefixPair,
                ctx.assignment_prefix().accept(self),
            )

            left_parts = pair[1]
            left_value_ir = ValueIR(left_parts)

            right_value_ir = ValueIR([text_part("")])
            if ctx.exprs_in_assign() is not None:
                right_parts = cast(list[ValuePart], ctx.exprs_in_assign().accept(self))
                right_value_ir = ValueIR(right_parts)

            assignment_ir.left = left_value_ir
            assignment_ir.right = right_value_ir

            specifier = pair[0]
            assignment_ir.prefix = specifier

        return assignment_ir

    def visitAssignment_prefix(
        self,
        ctx: cbuildParser.Assignment_prefixContext,
    ) -> AssignmentPrefixPair:
        specifier = ctx.specifiers().getText().strip()
        prefix = assignment_prefix_from_symbol(specifier)
        parts = cast(list[ValuePart], ctx.pattern().accept(self))
        pair: AssignmentPrefixPair = (prefix, parts)
        return pair

    def visitPattern(self, ctx: cbuildParser.PatternContext) -> list[ValuePart]:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            part = ast_node.accept(self)
            self._collect_value_parts(parts, part)

        return parts

    def visitExprs_in_assign(self, ctx: cbuildParser.Exprs_in_assignContext) -> Any:
        parts: list[ValuePart] = []
        for i in range(len(ctx.children or [])):
            ast_node = ctx.children[i]
            if i == 0 and len(ast_node.getText().strip()) == 0:
                continue  # skip first WS
            part_s = ast_node.accept(self)
            self._collect_value_parts(parts, part_s)

        return parts

    def visitExpr_in_assign(self, ctx: cbuildParser.Expr_in_assignContext) -> Any:
        parts: list[ValuePart] = []
        for atom_ctx in ctx.expr_in_assign_atom():
            if atom_ctx.function() is not None and not atom_ctx.function().isEmpty():
                atom = atom_ctx.function().accept(self)
                if self._is_value_part(atom):
                    parts.append(atom)
            elif (
                atom_ctx.text_in_assign() is not None
                and not atom_ctx.text_in_assign().isEmpty()
            ):
                lexeme = ""
                for char_ctx in atom_ctx.text_in_assign().char_in_assign():
                    lexeme += cast(str, char_ctx.accept(self))
                text_part_ = text_part(lexeme)
                parts.append(text_part_)
        return parts

    def visitChar_in_assign(self, ctx: cbuildParser.Char_in_assignContext) -> str:
        if ctx.char_nested() is not None and not ctx.char_nested().isEmpty():
            return cast(str, ctx.char_nested().accept(self))

        return ctx.getText()

    def visitChar_nested(self, ctx: cbuildParser.Char_nestedContext) -> str:
        if ctx.char() is not None and not ctx.char().isEmpty():
            return cast(str, ctx.char().accept(self))

        return ctx.getText()

    def visitFunction(self, ctx: cbuildParser.FunctionContext) -> ValuePart:
        if ctx.VAR() is not None:
            return self._compile_var_ref(ctx)

        name = ctx.function_name().getText()
        raw = ctx.getText()
        slice = raw[raw.find(name) + len(name) : -1]
        has_ws_after_fn_name = re.match(r"\s", slice) is not None

        parts: list[ValuePart] = self.visitFunction_name(ctx.function_name())

        if self._dispatcher.has(name):
            handler: MakeFunctionHandler = self._dispatcher.get_handler(name)
            if handler.arity() != 0 and not has_ws_after_fn_name:
                paren_type = "(" if ctx.DOLLAR_LPAREN() is not None else "{"
                return var_ref_part(ValueIR(parts), paren_type)
            else:
                function_ir: FunctionIR = handler.compile(ctx)
                calee: ValuePart = function_call_part(function_ir)
                return calee

        paren_type = "(" if ctx.DOLLAR_LPAREN() is not None else "{"
        return var_ref_part(ValueIR(parts), paren_type)

    def visitFunction_name(self, ctx: cbuildParser.Function_nameContext) -> list[ValuePart]:
        parts: list[ValuePart] = []
        for atom_ctx in ctx.function_name_atom():
            if atom_ctx.function() is not None:
                parts.append(self.visitFunction(atom_ctx.function()))
            else:
                parts.append(text_part(atom_ctx.getText()))

        return parts

    def visitFunction_name_atom(self, ctx: cbuildParser.Function_name_atomContext) -> ValuePart:
        if ctx.CHARS() is not None:
            return text_part(ctx.CHARS().getText())
        if ctx.function() is not None:
            return cast(ValuePart, ctx.function().accept(self))
        return text_part("")

    def visitArguments(self, ctx: cbuildParser.ArgumentsContext) -> list[ValuePart]:
        parts: list[ValuePart] = []
        for args_ctx in ctx.argument():
            result = args_ctx.accept(self)
            self._collect_value_parts(parts, result)

        return parts

    def visitArgument(self, ctx: cbuildParser.ArgumentContext) -> list[ValuePart]:
        parts: list[ValuePart] = []
        result = ctx.expressions().accept(self)
        self._collect_value_parts(parts, result)
        return parts

    def _compile_var_ref(self, ctx: cbuildParser.FunctionContext) -> ValuePart:
        raw = ctx.VAR().getText()
        name = raw[1:]
        part = text_part(name)
        value = ValueIR([part])
        paren_type = "(" if ctx.DOLLAR_LPAREN() is not None else "{"
        return var_ref_part(value, paren_type)

    def visitConditional(self, ctx: cbuildParser.ConditionalContext) -> ConditionalIR:
        kind: ConditionKind | None = None
        condition: Condition | None = None

        if ctx.if_eq_kw() is not None:
            kind = condition_kind_from_keyword(ctx.if_eq_kw().getText())
            if ctx.condition() is not None:
                condition = cast(Condition, ctx.condition().accept(self))

            # should not have both a condition and an ifdef name this is most likely unreachable
            if ctx.pattern() is not None:
                left_side_conditional = ValueIR(
                    self.visitPattern(ctx.pattern()),
                )
                condition = Condition(left=left_side_conditional, right=None)
        elif ctx.if_def_kw() is not None:
            kind = condition_kind_from_keyword(ctx.if_def_kw().getText())
            # should not have conditional in ifdef_kw most likely unreachable
            if ctx.condition() is not None:
                condition = cast(Condition, ctx.condition().accept(self))

            if ctx.pattern() is not None:
                left_side_conditional = ValueIR(
                    self.visitPattern(ctx.pattern()),
                )
                condition = Condition(left=left_side_conditional, right=None)

        conditional_ir = ConditionalIR(cast(ConditionKind, kind), cast(Condition, condition))

        if ctx.statements_opt(0) is not None:
            then_result = ctx.statements_opt(0).accept(self)

            if isinstance(then_result, list):
                for obj in then_result:
                    if self._is_ir(obj):
                        conditional_ir.then_branch.append(obj)

        if len(ctx.statements_opt()) > 1 and ctx.statements_opt(1) is not None:
            else_result = ctx.statements_opt(1).accept(self)

            if isinstance(else_result, list):
                for obj in else_result:
                    if self._is_ir(obj):
                        conditional_ir.else_branch.append(obj)
        elif ctx.conditional() is not None:
            else_conditional = ctx.conditional().accept(self)

            if self._is_ir(else_conditional):
                conditional_ir.else_branch.append(else_conditional)

        return conditional_ir

    def visitCondition(self, ctx: cbuildParser.ConditionContext) -> Condition:
        condition: Condition | None = None

        if len(ctx.expressions_opt()) == 2:
            if (
                ctx.expressions_opt(0) is not None
                and ctx.expressions_opt(0).expressions() is not None
            ):
                left_parts = cast(list[ValuePart], ctx.expressions_opt(0).accept(self))
                condition = Condition(left=ValueIR(left_parts), right=None)
            else:
                condition = Condition(left=ValueIR(), right=None)

            if (
                ctx.expressions_opt(1) is not None
                and ctx.expressions_opt(1).expressions() is not None
            ):
                right_parts = cast(list[ValuePart], ctx.expressions_opt(1).accept(self))
                condition.right = ValueIR(right_parts)
            else:
                condition.right = ValueIR()

            return condition

        raise Exception("Invalid condition context")

    def visitIdentifier(self, ctx: cbuildParser.IdentifierContext) -> ValuePart:
        text_part_ = text_part(ctx.getText())
        return text_part_

    def visitExpressions_opt(self, ctx: cbuildParser.Expressions_optContext) -> list[ValuePart]:
        if ctx.expressions() is None:
            return cast(list[ValuePart], [])

        return cast(list[ValuePart], ctx.expressions().accept(self))

    def visitExpressions(self, ctx: cbuildParser.ExpressionsContext) -> list[ValuePart]:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            part = ast_node.accept(self)

            self._collect_value_parts(parts, part)

        return parts

    def visitExpression(self, ctx: cbuildParser.ExpressionContext) -> Any:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            part = ast_node.accept(self)

            self._collect_value_parts(parts, part)

        return parts

    def visitExpression_atom(self, ctx: cbuildParser.Expression_atomContext) -> Any:
        if ctx.text() is not None:
            return text_part(ctx.text().getText())

        if ctx.function() is not None:
            return ctx.function().accept(self)

        if ctx.exprs_nested() is not None:
            parts = cast(list[ValuePart], ctx.exprs_nested().accept(self))

            return var_ref_part(ValueIR(parts))

        return None

    def visitExpr_nested(self, ctx: cbuildParser.Expr_nestedContext) -> Any:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            part = ast_node.accept(self)

            self._collect_value_parts(parts, part)

        return parts

    def visitExpr_nested_atom(self, ctx: cbuildParser.Expr_nested_atomContext) -> Any:
        if ctx.text_nested() is not None:
            return text_part(ctx.text_nested().getText())

        if ctx.function() is not None:
            return ctx.function().accept(self)

        if ctx.exprs_nested() is not None:
            parts = cast(list[ValuePart], ctx.exprs_nested().accept(self))

            return var_ref_part(ValueIR(parts))

        return None

    def visitExprs_nested(self, ctx: cbuildParser.Exprs_nestedContext) -> list[ValuePart]:
        parts: list[ValuePart] = []

        for child in ctx.children or []:
            self._collect_value_parts(parts, child.accept(self))

        return parts

    def visitStatements_opt(self, ctx: cbuildParser.Statements_optContext) -> Any:
        if ctx.statements() is not None:
            return ctx.statements().accept(self)

        return []

    def visitRule(self, ctx: cbuildParser.RuleContext) -> Any:
        if ctx.static_pattern_rule() is not None:
            return ctx.static_pattern_rule().accept(self)

        targets_ir = cast(list[ValueIR], ctx.targets().accept(self))

        rule_separator = rule_separator_from_symbol(
            ctx.colon().getText().strip(),
        )

        if ctx.assignment() is None:
            prerequisites_ir = cast(list[ValueIR], ctx.prerequisites().accept(self))
            recipe_irs: list[RecipeIR] = []
            orderonlyprerequisites_ir: list[ValueIR] = []
            if ctx.orderonlyprerequisites() is not None:
                orderonlyprerequisites_ir = cast(
                    list[ValueIR],
                    ctx.orderonlyprerequisites().accept(self),
                )

            if ctx.recipes() is not None:
                recipe_irs = cast(list[RecipeIR], ctx.recipes().accept(self))
            rule_ir = NormalRuleIR(
                {
                    "targets": targets_ir,
                    "prerequisites": prerequisites_ir,
                    "order_only_prerequisites": orderonlyprerequisites_ir,
                    "separator": rule_separator,
                    "recipes": recipe_irs,
                }
            )

            return rule_ir
        else:
            assignment_ir = cast(AssignmentIR, ctx.assignment().accept(self))

            rule_ir = TargetRuleIR(
                {
                    "targets": targets_ir,
                    "separator": rule_separator,
                    "assignment": assignment_ir,
                }
            )

            return rule_ir

    def visitTargets(self, ctx: cbuildParser.TargetsContext) -> Any:
        targets_ir: list[ValueIR] = []
        for target_ctx in ctx.target():
            parts = cast(list[ValuePart], target_ctx.pattern().accept(self))
            target_value_ir = ValueIR(parts)
            targets_ir.append(target_value_ir)

        return targets_ir

    def visitPrerequisites(self, ctx: cbuildParser.PrerequisitesContext) -> Any:
        if ctx.targets() is not None:
            return ctx.targets().accept(self)
        return cast(list[ValueIR], [])

    def visitOrderonlyprerequisites(
        self,
        ctx: cbuildParser.OrderonlyprerequisitesContext,
    ) -> Any:
        if ctx.targets() is None:
            return cast(list[ValueIR], [])

        return ctx.targets().accept(self)

    def visitRecipes(self, ctx: cbuildParser.RecipesContext) -> list[RecipeIR]:
        recipes: list[RecipeIR] = []

        for recipe_ctx in ctx.recipe():
            result = recipe_ctx.accept(self)

            if isinstance(result, RecipeIR):
                recipes.append(result)

        return recipes

    def visitRecipes_opt(self, ctx: cbuildParser.Recipes_optContext) -> Any:
        if ctx.recipes() is not None:
            return ctx.recipes().accept(self)

        return cast(list[RecipeIR], [])

    def visitRecipe(self, ctx: cbuildParser.RecipeContext) -> Any:
        if ctx.exprs_in_recipe() is not None:
            parts = cast(list[ValuePart], ctx.exprs_in_recipe().accept(self))

            recipe_ir = RecipeIR.command(ValueIR(parts))

            return recipe_ir

        if ctx.COMMENT() is not None:
            return None

        if ctx.conditional_in_recipe() is not None:
            conditional_ir = self.visitConditional_in_recipe(
                ctx.conditional_in_recipe(),
            )
            return RecipeIR.conditional(conditional_ir)

        return None

    def visitExprs_in_recipe(self, ctx: cbuildParser.Exprs_in_recipeContext) -> Any:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            result = ast_node.accept(self)

            self._collect_value_parts(parts, result)

        return parts

    def visitExpr_in_recipe(self, ctx: cbuildParser.Expr_in_recipeContext) -> Any:
        parts: list[ValuePart] = []

        for atom_ctx in ctx.expr_in_recipe_atom():
            result = atom_ctx.accept(self)

            self._collect_value_parts(parts, result)

        return parts

    def visitExpr_in_recipe_atom(self, ctx: cbuildParser.Expr_in_recipe_atomContext) -> ValuePart:
        if ctx.text_in_recipe() is not None:
            return self.visitText_in_recipe(ctx.text_in_recipe())
        elif ctx.function() is not None:
            return self.visitFunction(ctx.function())

        raise Exception("Unhandled condition in visitExpr_in_recipe_atom")

    def visitText_in_recipe(self, ctx: cbuildParser.Text_in_recipeContext) -> ValuePart:
        text = ""

        for char_ctx in ctx.char_in_recipe():
            text += self.visitChar_in_recipe(char_ctx)

        return text_part(text)

    def visitChar_in_recipe(self, ctx: cbuildParser.Char_in_recipeContext) -> str:
        if ctx.char_in_assign() is not None:
            return self.visitChar_in_assign(ctx.char_in_assign())
        if ctx.COMMENT() is not None:
            return ctx.COMMENT().getText()
        if ctx.PIPE() is not None:
            return ctx.PIPE().getText()

        raise Exception("Unhandled condition in visitChar_in_recipe")

    def visitConditional_in_recipe(
        self,
        ctx: cbuildParser.Conditional_in_recipeContext,
    ) -> ConditionalIR:
        kind: ConditionKind | None = None
        condition: Condition | None = None

        if ctx.if_eq_kw() is not None:
            kind = condition_kind_from_keyword(ctx.if_eq_kw().getText())

            if ctx.condition() is not None:
                condition = self.visitCondition(ctx.condition())

            if ctx.pattern() is not None:
                left_side_value = ValueIR(
                    cast(list[ValuePart], ctx.pattern().accept(self)),
                )
                condition = Condition(left=left_side_value, right=None)
        elif ctx.if_def_kw() is not None:
            kind = condition_kind_from_keyword(ctx.if_def_kw().getText())

            if ctx.condition() is not None:
                condition = self.visitCondition(ctx.condition())

            if ctx.pattern() is not None:
                left_side_value = ValueIR(
                    cast(list[ValuePart], ctx.pattern().accept(self)),
                )
                condition = Condition(left=left_side_value, right=None)

        conditional_ir = ConditionalIR(cast(ConditionKind, kind), cast(Condition, condition))

        if ctx.recipes_opt(0) is not None:
            then_result = ctx.recipes_opt(0).accept(self)

            if isinstance(then_result, list):
                for obj in then_result:
                    if isinstance(obj, RecipeIR):
                        conditional_ir.then_branch.append(obj)

        if len(ctx.recipes_opt()) > 1 and ctx.recipes_opt(1) is not None:
            else_result = ctx.recipes_opt(1).accept(self)

            if isinstance(else_result, list):
                for obj in else_result:
                    if isinstance(obj, RecipeIR):
                        conditional_ir.else_branch.append(obj)
        elif ctx.conditional_in_recipe() is not None:
            else_conditional = ctx.conditional_in_recipe().accept(self)

            if self._is_ir(else_conditional):
                conditional_ir.else_branch.append(else_conditional)

        return conditional_ir

    def visitStatic_pattern_rule(self, ctx: cbuildParser.Static_pattern_ruleContext) -> Any:
        targets_ir = cast(list[ValueIR], ctx.targets().accept(self))

        rule_separator = rule_separator_from_symbol(
            (ctx.colon(0).getText().strip() if ctx.colon(0) is not None else None) or "",
        )

        target_pattern_parts = cast(list[ValuePart], ctx.pattern().accept(self))

        target_pattern_ir = ValueIR(target_pattern_parts)

        prerequisites_ir: list[ValueIR] = []
        orderonlyprerequisites_ir: list[ValueIR] = []

        if ctx.prerequisites() is not None:
            prerequisites_ir = cast(list[ValueIR], ctx.prerequisites().accept(self))

        if ctx.orderonlyprerequisites() is not None:
            orderonlyprerequisites_ir = cast(
                list[ValueIR],
                ctx.orderonlyprerequisites().accept(self),
            )

        recipe_irs: list[RecipeIR] = []

        if ctx.recipes() is not None:
            recipe_irs = cast(list[RecipeIR], ctx.recipes().accept(self))

        return StaticPatternRuleIR(
            {
                "targets": targets_ir,
                "separator": rule_separator,
                "target_pattern": target_pattern_ir,
                "prerequisites": prerequisites_ir,
                "order_only_prerequisites": orderonlyprerequisites_ir,
                "recipes": recipe_irs,
            }
        )

    def visitDefine(self, ctx: cbuildParser.DefineContext) -> Any:
        define_ir = DefineIR()

        if ctx.specifiers() is not None:
            specifier = ctx.specifiers().getText().strip()
            define_ir.specifiers = assignment_prefix_from_symbol(specifier)

        parts = cast(list[ValuePart], ctx.pattern().accept(self))
        define_ir.name = ValueIR(parts)

        if ctx.ASSIGN_OP() is not None:
            define_ir.assignment_type = assignment_type_from_symbol(
                ctx.ASSIGN_OP().getText().strip(),
            )

        body: ValueIR = self.visitDefine_body(ctx.define_body())
        define_ir.value = body

        return define_ir

    def visitDefine_body(self, ctx: cbuildParser.Define_bodyContext) -> ValueIR:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            if type(ast_node).__name__ == "DefineContext":
                parts.append(TextPart(lexeme=ast_node.getText()))
            else:
                result = ast_node.accept(self)
                self._collect_value_parts(parts, result)

        return ValueIR(parts)

    def visitDefinition(self, ctx: cbuildParser.DefinitionContext) -> list[ValuePart]:
        if ctx.exprs_in_def() is None:
            return cast(list[ValuePart], [])

        return self.visitExprs_in_def(ctx.exprs_in_def())

    def visitExprs_in_def(self, ctx: cbuildParser.Exprs_in_defContext) -> list[ValuePart]:
        parts: list[ValuePart] = []

        if len(ctx.br()) > 0 and len(ctx.first_expr_in_def()) == 0:
            return parts

        for ast_node in ctx.children or []:
            if type(ast_node).__name__ == "BrContext":
                text = text_part("\n")
                parts.append(text)
            else:
                result = ast_node.accept(self)

                self._collect_value_parts(parts, result)

        return parts

    def visitFirst_expr_in_def(self, ctx: cbuildParser.First_expr_in_defContext) -> list[ValuePart]:
        parts: list[ValuePart] = []

        for ast_node in ctx.children or []:
            result = ast_node.accept(self)

            self._collect_value_parts(parts, result)

        return parts

    def visitChar_in_def(self, ctx: cbuildParser.Char_in_defContext) -> ValuePart:
        if ctx.char() is not None and ctx.char().getText() is not None:
            return text_part(cast(str, ctx.char().accept(self)))

        return text_part(ctx.getText())

    def visitChar(self, ctx: cbuildParser.CharContext) -> str:
        if (
            ctx.DOUBLE_DOLLAR() is not None
            and len(ctx.DOUBLE_DOLLAR().getText()) > 0
        ):
            return "$"

        return ctx.getText()

    def visitVpath(self, ctx: cbuildParser.VpathContext) -> VpathIR:
        if ctx.vpath_args() is None:
            return VpathIR.clear_all()

        return cast(VpathIR, ctx.vpath_args().accept(self))

    def visitVpath_args(self, ctx: cbuildParser.Vpath_argsContext) -> VpathIR:
        arg = ValueIR(cast(list[ValuePart], ctx.pattern().accept(self)))

        if ctx.expressions() is None:
            return VpathIR.clear_pattern(arg)

        directory_parts = cast(list[ValuePart], ctx.expressions().accept(self))
        directories = self._split_values_at_whitespace(directory_parts)

        return VpathIR.set_pattern(arg, directories)

    def visitWs(self, ctx: cbuildParser.WsContext) -> ValuePart:
        part = text_part(ctx.getText())
        return part

    def visitInclude(self, ctx: cbuildParser.IncludeContext) -> IncludeIR:
        parts = cast(list[ValuePart], ctx.expressions().accept(self))

        if ctx.include_kw().DASH_INCLUDE() is not None:
            return IncludeIR.dash_include(ValueIR(parts))
        elif ctx.include_kw().INCLUDE() is not None:
            return IncludeIR.include_(ValueIR(parts))
        elif ctx.include_kw().SINCLUDE() is not None:
            return IncludeIR.sinclude(ValueIR(parts))

        raise Exception("Unknown include type")

    def visitHook(self, ctx: cbuildParser.HookContext) -> HookIR:
        program: str = ctx.hook_program().getText().strip()
        hook_ir = HookIR(program)
        return hook_ir

    def visitUndefine(self, ctx: cbuildParser.UndefineContext) -> UndefineIR:
        identifier = ValueIR(self.visitPattern(ctx.pattern()))
        prefix: UndefineSpecifier = (
            "override undefine"
            if ctx.OVERRIDE() is not None and ctx.UNDEFINE() is not None
            else "undefine"
        )
        return UndefineIR(identifier, prefix)

    def visitExport(
        self,
        ctx: cbuildParser.ExportContext,
    ) -> ExportIR | GlobalExportIR | GlobalUnexportIR:
        if ctx.assignment_prefix() is not None:
            pair: AssignmentPrefixPair = self.visitAssignment_prefix(
                ctx.assignment_prefix(),
            )
            prefix: AssignmentPrefix = pair[0]
            value: ValueIR = ValueIR(pair[1])
            if prefix == "export" or prefix == "unexport":
                return ExportIR(value, cast(ExportSpecifier, prefix))
            raise Exception("Unknown assignment prefix")
        elif ctx.EXPORT() is not None:
            return GlobalExportIR()
        elif ctx.UNEXPORT() is not None:
            return GlobalUnexportIR()

        raise Exception("Unknown export type")

    # utility

    def _collect_value_parts(self, destination: list[ValuePart], result: object) -> None:
        if result is None:
            return

        if self._is_value_part(result):
            destination.append(result)
            return

        if isinstance(result, list):
            for item in result:
                self._collect_value_parts(destination, item)

    def _is_value_part(self, value: object) -> TypeIs[ValuePart]:
        if value is None or not hasattr(value, "kind"):
            return False

        return (
            getattr(value, "kind") == "text"
            or getattr(value, "kind") == "variable-reference"
            or getattr(value, "kind") == "function-call"
        )

    def _is_ir(self, value: object) -> TypeIs[IR]:
        return (
            value is not None
            and hasattr(value, "exec")
            and callable(getattr(value, "exec"))
        )

    def _unquote(self, value: str) -> str:
        if len(value) >= 2:
            first = value[0]
            last = value[len(value) - 1]
            if (first == '"' and last == '"') or (first == "'" and last == "'"):
                return value[1:-1]

        return value

    def _split_values_at_whitespace(self, parts: list[ValuePart]) -> list[ValueIR]:
        values: list[ValueIR] = []
        current: list[ValuePart] = []

        for part in parts:
            if part.kind != "text" or re.fullmatch(r"\s+", part.lexeme) is None:
                current.append(part)
                continue

            if len(current) > 0:
                values.append(ValueIR(current))
                current = []

        if len(current) > 0:
            values.append(ValueIR(current))

        return values


cBuildCompiler = CBuildCompiler  # noqa: N816
