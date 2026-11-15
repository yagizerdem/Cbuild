import sys
from typing import Any, Final, cast

from cbuild_backend.env import Env, SymbolTableVariable
from cbuild_compiler.ir import (
    IR,
    Executor,
    RecipeIR,
    TextPart,
    ValueIR,
    ValuePart,
    VariableReferencePart,
)
from gnu_make_functions.make_function_dispatcher import make_function_dispatcher

type VarRefPart = VariableReferencePart


class RecursiveVariableExpansionException(Exception):
    def __init__(self, identifier: str) -> None:
        super().__init__(f"Recursive variable expansion: {identifier}")
        self.identifier: Final = identifier


# Adapter for the current IR executor interface; unhandled nodes return null.
class BaseExpansionEngine(Executor):
    def exec[T](self, ir: IR | ValuePart) -> T:
        return cast(T, None)


class ExpansionEngine(BaseExpansionEngine):
    def __init__(self, context: Env) -> None:
        super().__init__()

        self._context: Final = context

    def expand[T](self, ir: ValueIR | ValuePart | RecipeIR) -> T:
        value_expansion_engine = ValueExpansionEngine(self._context)

        if isinstance(ir, RecipeIR):
            return ir.exec(RecipeExpansionEngine(self._context))

        if isinstance(ir, ValueIR):
            return cast(T, value_expansion_engine.expand(ir))

        # expand value parts
        if hasattr(ir, "kind") and (
            ir.kind == "variable-reference" or ir.kind == "text"
        ):
            return cast(T, value_expansion_engine.expand(ir))

        raise Exception("Unsupported IR node for expansion")

    def exec[T](self, ir: IR | ValuePart) -> T:
        if isinstance(ir, (ValueIR, RecipeIR)):
            return self.expand(ir)
        raise Exception("Unsupported IR node for expansion")


class ValueExpansionEngine(BaseExpansionEngine):
    def __init__(
        self,
        context: Env,
        active_lookups: set[str] | None = None,
        recursive_fallback: bool = True,
    ) -> None:
        super().__init__()
        self._context: Final = context
        self._active_lookups: Final = (
            active_lookups if active_lookups is not None else set[str]()
        )
        self._make_fn_dispatcher: Final = make_function_dispatcher()
        self._recursive_fallback: Final = recursive_fallback

    def clear_active_lookups(self) -> None:
        self._active_lookups.clear()

    def expand(self, ir: ValueIR | ValuePart) -> str:
        if isinstance(ir, ValueIR):
            return self._expand_value_to_string(ir, self._active_lookups)
        if hasattr(ir, "kind") and ir.kind == "variable-reference":
            return self._expand_var_ref_to_string(
                cast(VarRefPart, ir), self._active_lookups
            )
        if hasattr(ir, "kind") and ir.kind == "text":
            return cast(TextPart, ir).lexeme

        raise Exception("Unsupported IR node or ValuePart for cbuild backend")

    def exec[T](self, ir: Any) -> T:
        return cast(T, self._expand_value_to_string(ir, self._active_lookups))

    def _expand_value_to_string(self, ir: ValueIR, active_lookups: set[str]) -> str:
        # Imported here to avoid a circular import: the function runners
        # import ValueExpansionEngine from this module.
        from cbuild_backend.gnu_make_functions.fn_runner import CbuildFnRunner

        builder = ""
        for part in ir.parts:
            if part.kind == "variable-reference":
                ref_part = part
                builder += self._expand_var_ref_to_string(ref_part, active_lookups)
            elif part.kind == "function-call":
                fn_expansion_engine = CbuildFnRunner(
                    self._context,
                    active_lookups,
                )
                fn_type = self._make_fn_dispatcher.get_handler(part.function.name)
                resolved_expansion_function = fn_type.resolve_runner(
                    fn_expansion_engine
                )
                builder += resolved_expansion_function(part.function)  # this resolved function expands fn-ir based on the function type
            elif part.kind == "text":
                text_part = part
                builder += text_part.lexeme
        return builder

    def _expand_var_ref_to_string(
        self,
        var_ref: VarRefPart,
        active_lookups: set[str],
    ) -> str:
        # Imported here to avoid a circular import: the function runners
        # import ValueExpansionEngine from this module.
        from cbuild_backend.gnu_make_functions.fn_runner import CbuildFnRunner

        builder = ""
        for part in var_ref.name_expr.parts:
            if part.kind == "variable-reference":
                ref_part = part
                builder += self._expand_var_ref_to_string(ref_part, active_lookups)
            elif part.kind == "function-call":
                fn_expansion_engine = CbuildFnRunner(
                    self._context,
                    active_lookups,
                )
                fn_type = self._make_fn_dispatcher.get_handler(part.function.name)
                resolved_expansion_function = fn_type.resolve_runner(
                    fn_expansion_engine
                )
                builder += resolved_expansion_function(part.function)  # this resolved function expands fn-ir based on the function type
            elif part.kind == "text":
                text_part = part
                builder += text_part.lexeme
        identifier = builder

        if identifier in active_lookups:
            raise RecursiveVariableExpansionException(identifier)

        if (
            self._context.has_variable_recursive(identifier)
            if self._recursive_fallback
            else self._context.has_variable(identifier)
        ):
            variable = (
                self._context.require_variable_recursive(identifier)
                if self._recursive_fallback
                else cast(SymbolTableVariable, self._context.get_variable(identifier))
            )
            if variable.is_deferred():
                value_ir = variable.get_deferred_value()
                active_lookups.add(identifier)
                try:
                    raw_value: str = self.exec(value_ir)
                    return raw_value
                finally:
                    active_lookups.discard(identifier)
                # do not replace with the expanded value in the symbol table
                # shoudl reevaluate in each recursive variable call

                # self._context.replace_variable(
                #     identifier,
                #     SymbolTableVariable(raw_value, value_ir),
                # )

            return cast(
                str,
                self._context.require_variable_recursive(identifier).get_raw_value()
                if self._recursive_fallback
                else cast(
                    SymbolTableVariable, self._context.get_variable(identifier)
                ).get_raw_value(),
            )

        if self._context.cli_options.warn_undefined_variables:
            print(f"cbuild: warning: undefined variable '{identifier}'", file=sys.stderr)

        return ""


class RecipeExpansionEngine(BaseExpansionEngine):
    def __init__(self, context: Env) -> None:
        super().__init__()
        self._context: Final = context

    def exec[T](self, ir: Any) -> T:
        recipe_ir = cast(RecipeIR, ir)
        if recipe_ir.recipe.kind != "command":
            raise Exception("Only RecipeIR kind command can be expanded.")

        value_expansion_engine = ValueExpansionEngine(self._context)
        expanded_shell_command: str = value_expansion_engine.exec(
            recipe_ir.recipe.command,
        )
        return cast(T, expanded_shell_command)


class Expansion:
    def expand(self, instructions: IR | list[IR], context: Env) -> None:
        expansion_engine = ExpansionEngine(context)

        if not isinstance(instructions, list):
            instructions.exec(expansion_engine)
            return

        for ir in instructions:
            ir.exec(expansion_engine)

    def expand_value(self, ir: ValueIR, context: Env) -> str:
        expansion_engine = ValueExpansionEngine(context)
        return ir.exec(expansion_engine)


def expand_value(ir: ValueIR, context: Env) -> str:
    expansion_engine = ValueExpansionEngine(context)
    return ir.exec(expansion_engine)


def expand_recipe(ir: RecipeIR, context: Env) -> str:
    expansion_engine = RecipeExpansionEngine(context)
    return ir.exec(expansion_engine)
