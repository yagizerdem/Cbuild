from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.evaluator.conditional_evaluator import ConditionalIREvaluator
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import IR, RecipeIR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class ConditionalRecipeEvaluator:
    def __init__(self, context: Env, ir: RecipeIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> list[RecipeIR]:
        if self._ir.recipe.kind != "conditional":
            raise Exception("Expected a conditional recipe.")

        conditional_ir_evaluator = ConditionalIREvaluator(
            self._context,
            self._ir.recipe.conditional,
        )
        resolved_recipes: list[RecipeIR] = []

        resolved_irs: list[IR] = conditional_ir_evaluator.execute()
        for resolved_ir in resolved_irs:
            if isinstance(resolved_ir, RecipeIR):
                if resolved_ir.recipe.kind == "conditional":
                    nested_resolved_recipes = ConditionalRecipeEvaluator(
                        self._context,
                        resolved_ir,
                    ).execute()
                    resolved_recipes.extend(nested_resolved_recipes)
                else:
                    resolved_recipes.append(resolved_ir)
            else:
                raise CbuildException(
                    column=self._ir.col,
                    row=self._ir.row,
                    error_type=ErrorType.PROCESS,
                    machine_code=MachineCode.UNSUPPORTED_IR,
                    message="Unexpected IR type encountered in conditional recipe evaluation.",
                )
        return resolved_recipes
