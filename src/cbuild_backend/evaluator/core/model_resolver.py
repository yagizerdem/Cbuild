import re
from collections.abc import Sequence
from typing import Any, Final, cast

from cbuild_backend.env import Env
from cbuild_backend.evaluator.conditional_recipe_evaluator import (
    ConditionalRecipeEvaluator as ConditionalRecipeIREvaluator,
)
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.model import BaseModel, ImplicitPatterRule, NormalRule
from cbuild_backend.stem_resolver import StemResolver
from cbuild_compiler.ir import IR, Executor, NormalRuleIR, RecipeIR, ValueIR


def filter_model_resolver_pass_ir(irs: list[IR]) -> list[IR]:
    result: list[IR] = []
    for ir in irs:
        if isinstance(ir, NormalRuleIR):
            result.append(ir)

    return result


class ModelResolver(Executor):
    def __init__(
        self, context: Env, evaluation_state: BuildFileEvaluationState
    ) -> None:
        self.rule_models: Final[list[BaseModel]] = []
        self.context: Final = context
        self.evaluation_state: Final = evaluation_state

    def build(self, instructions: Sequence[IR]) -> list[BaseModel]:
        for instruction in instructions:
            self.collect_models(
                self.rule_models,
                self.exec(instruction),
            )
        return self.rule_models

    def collect_models(self, target: list[BaseModel], resources: Any) -> list[BaseModel]:
        if isinstance(resources, list):
            for item in resources:
                if isinstance(item, BaseModel):
                    target.append(item)
        elif isinstance(resources, BaseModel):
            target.append(resources)
        return target

    def exec[T](self, ir: Any) -> T:
        return cast(T, self._resolve_normal_rule(ir))

    def _resolve_normal_rule(self, ir: NormalRuleIR) -> list[BaseModel]:
        expansion = ValueExpansionEngine(self.context)

        def expand_words(values: Sequence[ValueIR]) -> list[str]:
            return [
                word
                for value in values
                for word in re.split(r"\s+", expansion.expand(value))
                if word
            ]

        targets = expand_words(ir.targets)
        prerequisites = expand_words(ir.prerequisites)
        order_only_prerequisites = expand_words(ir.order_only_prerequisites or [])
        stem_resolver = StemResolver()

        # resolve recipes
        recipe_ir_resolutions: list[RecipeIR] = []
        for recipe_ir in ir.recipes:
            if recipe_ir.recipe.kind == "conditional":
                conditional_recipe_ir_evaluator = ConditionalRecipeIREvaluator(
                    self.context,
                    recipe_ir,
                )
                active_recipe_irs: list[RecipeIR] = (
                    conditional_recipe_ir_evaluator.execute()
                )
                recipe_ir_resolutions.extend(active_recipe_irs)
            else:
                recipe_ir_resolutions.append(recipe_ir)

        resolved_models: list[BaseModel] = []

        for target in targets:
            if self._is_special_target(target):
                self._resolve_special_target_dispatcher(target, ir)
            else:
                resolved_models.append(
                    ImplicitPatterRule(
                        {
                            "target_pattern": target,
                            "prerequisites": [*prerequisites],
                            "order_only_prerequisites": [*order_only_prerequisites],
                            "recipe_irs": [*ir.recipes],
                            "evaluated_recipe_irs": [*recipe_ir_resolutions],
                            "rule_ir": ir,
                            "vpath_rules": [*self.evaluation_state.vpaths],
                        }
                    )
                    if stem_resolver.has_stem(target)
                    else NormalRule(
                        {
                            "target": target,
                            "prerequisites": [*prerequisites],
                            "order_only_prerequisites": [*order_only_prerequisites],
                            "rule_ir": ir,
                            "recipe_irs": [*ir.recipes],
                            "evaluated_recipe_irs": [*recipe_ir_resolutions],
                            "shell_commands": [],  # do not use raw shell commands, expand from recipeIR before execution
                            "vpath_rules": [*(self.evaluation_state.vpaths or [])],
                            "rule_seperator": ir.separator,
                        }
                    ),
                )

        return resolved_models

    def _is_special_target(self, target: str) -> bool:
        return target == ".PHONY" or target == ".DEFAULT"

    def _resolve_special_target_dispatcher(self, target: str, ir: NormalRuleIR) -> None:
        if target == ".PHONY":
            self._resolve_phony_target(ir)
        elif target == ".DEFAULT":
            self._resolve_default_target(ir)

    # mutate the env and add phony targets
    def _resolve_phony_target(self, ir: NormalRuleIR) -> None:
        expansion = ValueExpansionEngine(self.context)
        for preq in ir.prerequisites:
            resolution = expansion.expand(preq)
            self.context.phony_targets.add(resolution)
        for preq in ir.order_only_prerequisites:
            resolution = expansion.expand(preq)
            self.context.phony_targets.add(resolution)

    # mutate the env and add default targets
    def _resolve_default_target(self, ir: NormalRuleIR) -> None:
        self.context.default_recipes = ir.recipes
