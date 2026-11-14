from typing import Final, Literal

from cbuild_backend.env import Env, VariableOrigin
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_compiler.ir import DefineIR, AssignmentIR, AssignmentType
from cbuild_backend.evaluator.assignment_evaluator import AssignmentIREvaluator


class DefineIREvaluator:
    def __init__(self, context: Env, ir: DefineIR) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> None:
        # Determine the assignment type, defaulting to RECURSIVE if not specified
        normalized_assignment_type : AssignmentType = AssignmentType.RECURSIVE if self._ir.assignment_type == None else  self._ir.assignment_type
        assignmentIR  = AssignmentIR(normalized_assignment_type)
        assignmentIR.left = self._ir.name
        assignmentIR.right = self._ir.value
        assignmentIR.prefix = self._ir.specifiers
        assignmetIREvaluator = AssignmentIREvaluator(self._context, assignmentIR)
        assignmetIREvaluator.execute()
