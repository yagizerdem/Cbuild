import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.evaluator.assignment_evaluator import AssignmentIREvaluator
from cbuild_backend.evaluator.core.type import TargetRuleEvaluationState
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import TargetRuleIR


class TargetRuleIREvaluator:
    def __init__(self, context: Env, ir: TargetRuleIR) -> None:
        self._context: Final = context  # root context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> list[TargetRuleEvaluationState]:
        target_evaluation_states: list[TargetRuleEvaluationState] = []

        if self._ir.assignment:
            for target_value in self._ir.targets:
                target_names: list[str] = [
                    name
                    for name in re.split(
                        r"\s+", self._value_expansion_engine.expand(target_value)
                    )
                    if name
                ]

                for target_name in target_names:
                    target_rule_context = self._context.target_envs.get(
                        target_name
                    ) or Env(self._context.cli_options)

                    target_rule_context.enclosing = self._context

                    assignment_evaluator = AssignmentIREvaluator(
                        target_rule_context,
                        self._ir.assignment,
                    )

                    assignment_evaluator.execute()

                    target_evaluation_states.append(
                        TargetRuleEvaluationState(
                            evaluated_context=target_rule_context,
                            evaluated_target_rule_ir=self._ir,
                            target_raw_name=target_name,
                        )
                    )

        return target_evaluation_states
