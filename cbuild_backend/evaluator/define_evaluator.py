from typing import Final, Literal

from cbuild_backend.env import Env, VariableOrigin
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import DefineIR, AssignmentIR
from cbuild_backend.evaluator.assignment_evaluator import AssignmentIREvaluator


class DefineIREvaluator:
    def __init__(self, context: Env, ir: DefineIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> None:
        assignmentIR  = AssignmentIR()
        assignmentIR.left = self._ir.name
        assignmentIR.right = self._ir.value
        assignmentIR.prefix = self._ir.prefix
        assignmentIR.type = self._ir.assignment_type
        assignmetIREvaluator = AssignmentIREvaluator(self._context, assignmentIR)
        assignmetIREvaluator.evaluate()
