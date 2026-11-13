from typing import Final, NoReturn

from cbuild_backend.env import Env
from cbuild_backend.evaluator.assignment_evaluator import AssignmentIREvaluator
from cbuild_backend.evaluator.conditional_evaluator import ConditionalIREvaluator
from cbuild_backend.evaluator.core.model_resolver import ModelResolver
from cbuild_backend.evaluator.core.type import (
    BuildFileEvaluationState,
    TargetRuleEvaluationState,
)
from cbuild_backend.evaluator.export_evaluator import ExportIREvaluator
from cbuild_backend.evaluator.include_evaluator import IncludeIREvaluator
from cbuild_backend.evaluator.staticpattern_evaluator import StaticPatternIREvaluator
from cbuild_backend.evaluator.targetrule_evaluator import TargetRuleIREvaluator
from cbuild_backend.evaluator.undefine_evaluator import UndefineIREvaluator
from cbuild_backend.evaluator.vpath_evaluator import VpathIREvaluator
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.interpreter.interpreter import Interpreter
from cbuild_backend.model import BaseModel
from cbuild_backend.semantic import allowed_ir
from cbuild_compiler.ir import (
    IR,
    AssignmentIR,
    ConditionalIR,
    DefineIR,
    ExportIR,
    HookIR,
    IncludeIR,
    NormalRuleIR,
    StaticPatternRuleIR,
    TargetRuleIR,
    UndefineIR,
    VpathIR,
)


def unsupported(ir: IR) -> NoReturn:
    # programmatic error should never send invalid irtype to cbuild backend
    raise Exception("Unsupported IR type")


class BuildFileEvaluator:
    def __init__(
        self,
        context: Env,
        irs: list[IR],
        evaluation_state: BuildFileEvaluationState,
    ) -> None:
        self._context: Final = context
        self._irs: Final = irs
        self._evaluation_state = evaluation_state

    def evaluate(self) -> list[BaseModel]:
        for ir in self._irs:
            value_expansion_engine = ValueExpansionEngine(self._context)

            if isinstance(ir, AssignmentIR):
                assignment_ir_evaluator = AssignmentIREvaluator(
                    self._context,
                    ir,
                )
                assignment_ir_evaluator.evaluate()
            elif isinstance(ir, UndefineIR):
                undefine_ir_evaluator = UndefineIREvaluator(self._context, ir)
                undefine_ir_evaluator.execute()
            elif isinstance(ir, ExportIR):
                export_ir_evaluator = ExportIREvaluator(self._context, ir)
                export_ir_evaluator.execute()
            elif isinstance(ir, HookIR):
                interpreter = Interpreter()
                interpreter.init(self._context)
                interpreter.run(ir.hook_program)
            elif isinstance(ir, ConditionalIR):
                condional_ir_evaluator = ConditionalIREvaluator(
                    self._context,
                    ir,
                )
                active_branch: list[IR] = condional_ir_evaluator.execute()
                # recursively evaluate the active branch
                evaluator = BuildFileEvaluator(
                    self._context,
                    active_branch,
                    self._evaluation_state,
                )
                evaluator.evaluate()
            elif isinstance(ir, DefineIR):
                expanded_value: str = (
                    ir.value.exec(value_expansion_engine)
                    if ir.value is not None
                    else None
                ) or ""
                identifier: str = (
                    ir.name.exec(value_expansion_engine) if ir.name is not None else None
                ) or ""
                self._context.set_raw_variable(identifier, expanded_value)
            elif isinstance(ir, NormalRuleIR):
                model_resolver = ModelResolver(
                    self._context,
                    self._evaluation_state,
                )
                resolution_result: list[BaseModel] = model_resolver.exec(ir)
                self._evaluation_state.resolved_models.extend(resolution_result)
            elif isinstance(ir, VpathIR):
                vpath_ir_evaluator = VpathIREvaluator(
                    self._context,
                    ir,
                    self._evaluation_state,
                )

                vpath_ir_evaluator.execute()
            elif isinstance(ir, IncludeIR):
                include_ir_evaluator = IncludeIREvaluator(
                    self._context,
                    ir,
                    self._evaluation_state,
                )
                include_ir_evaluator.execute()
            elif isinstance(ir, StaticPatternRuleIR):
                static_pattern_rule_ir_evaluator = StaticPatternIREvaluator(
                    self._context,
                    ir,
                )
                static_resolution_result = static_pattern_rule_ir_evaluator.execute()
                self._evaluation_state.resolved_models.extend(static_resolution_result)
            elif isinstance(ir, TargetRuleIR):
                target_rule_ir_evaluator = TargetRuleIREvaluator(
                    self._context,
                    ir,
                )

                evaluation_states: list[TargetRuleEvaluationState] = (
                    target_rule_ir_evaluator.execute()
                )

                for evaluation_state in evaluation_states:
                    target_context: Env = evaluation_state.evaluated_context
                    self._context.target_envs[evaluation_state.target_raw_name] = (
                        target_context
                    )
            elif not allowed_ir(ir):
                unsupported(ir)
            else:
                unsupported(ir)

        return self._evaluation_state.resolved_models
