import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.evaluator.conditional_recipe_evaluator import (
    ConditionalRecipeEvaluator as ConditionalRecipeIREvaluator,
)
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.model import NormalRule
from cbuild_backend.stem_resolver import StemResolver
from cbuild_compiler.ir import RecipeIR, StaticPatternRuleIR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class StaticPatternIREvaluator:
    def __init__(self, context: Env, ir: StaticPatternRuleIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> list[NormalRule]:
        stem_resolver = StemResolver()
        targets: list[str] = []
        preq_patterns: list[str] = []
        order_only_preq_patterns: list[str] = []
        rule_models: list[NormalRule] = []

        # rule format
        # targets(n) : pattern-rule(1) : preq-patterns(m) \n recipes(k)

        for target in self._ir.targets:
            targets.extend(
                word
                for word in re.split(r"\s+", self._value_expansion_engine.expand(target))
                if word
            )

        # shoud have only 1 target pattern
        target_pattern = self._value_expansion_engine.expand(
            self._ir.target_pattern,
        )

        for preq_pattern in self._ir.prerequisites:
            preq_patterns.extend(
                word
                for word in re.split(
                    r"\s+", self._value_expansion_engine.expand(preq_pattern)
                )
                if word
            )

        for order_only_preq_pattern in self._ir.order_only_prerequisites:
            order_only_preq_patterns.extend(
                word
                for word in re.split(
                    r"\s+", self._value_expansion_engine.expand(order_only_preq_pattern)
                )
                if word
            )

        for target in targets:
            resolved_preqs: list[str] = []
            resolved_order_only_preqs: list[str] = []
            if stem_resolver.match(target_pattern, target):
                stem = stem_resolver.resolve_stem(target_pattern, target)
                for preq_pattern in preq_patterns:
                    if stem is None:
                        raise CbuildException(
                            error_type=ErrorType.PROCESS,
                            message="cbuild: *** target pattern contains no '%'.  Stop.",
                            machine_code=MachineCode.STEM_RESOLUTION_FAILED,
                            row=self._ir.row,
                            column=self._ir.col,
                        )
                    else:
                        resolved_preq = stem_resolver.replace_stem(preq_pattern, stem)
                        resolved_preqs.append(resolved_preq)
                for order_only_preq_pattern in order_only_preq_patterns:
                    if stem is None:
                        raise CbuildException(
                            error_type=ErrorType.PROCESS,
                            message="cbuild: *** target pattern contains no '%'.  Stop.",
                            machine_code=MachineCode.STEM_RESOLUTION_FAILED,
                            row=self._ir.row,
                            column=self._ir.col,
                        )
                    else:
                        resolved_order_only_preq = stem_resolver.replace_stem(
                            order_only_preq_pattern,
                            stem,
                        )
                        resolved_order_only_preqs.append(resolved_order_only_preq)

                # resolve recipes
                recipe_ir_resolutions: list[RecipeIR] = []
                for recipe_ir in self._ir.recipes:
                    if recipe_ir.recipe.kind == "conditional":
                        conditional_recipe_ir_evaluator = ConditionalRecipeIREvaluator(
                            self._context, recipe_ir
                        )
                        active_recipe_irs: list[RecipeIR] = (
                            conditional_recipe_ir_evaluator.execute()
                        )
                        recipe_ir_resolutions.extend(active_recipe_irs)
                    else:
                        recipe_ir_resolutions.append(recipe_ir)

                rule_models.append(
                    NormalRule(
                        {
                            "prerequisites": resolved_preqs,
                            "order_only_prerequisites": resolved_order_only_preqs,
                            "rule_ir": self._ir,
                            "target": target,
                            "recipe_irs": [*self._ir.recipes],
                            "evaluated_recipe_irs": [*recipe_ir_resolutions],
                            "shell_commands": [],
                            "rule_seperator": self._ir.separator,
                        }
                    )
                )

        return rule_models
