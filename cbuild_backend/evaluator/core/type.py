from dataclasses import dataclass

from cbuild_backend.env import Env
from cbuild_backend.model import BaseModel, VpathRule
from cbuild_compiler.ir import TargetRuleIR


@dataclass
class BuildFileEvaluationState:
    vpaths: list[VpathRule]
    resolved_models: list[BaseModel]
    include_guard: list[str]  # store absolute paths of current included Buildfiles to prevent circular inclusion


@dataclass
class TargetRuleEvaluationState:
    evaluated_target_rule_ir: TargetRuleIR
    target_raw_name: str
    evaluated_context: Env
