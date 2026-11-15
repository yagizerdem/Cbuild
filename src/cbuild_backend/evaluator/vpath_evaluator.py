from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.model import VpathRule
from cbuild_compiler.ir import VpathIR


class VpathIREvaluator:
    def __init__(
        self,
        context: Env,
        ir: VpathIR,
        evaluation_state: BuildFileEvaluationState,
    ) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._evaluation_state: Final = evaluation_state
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    def execute(self) -> None:
        vpath = self._ir.vpath
        if vpath.type == "clear-all":
            self._evaluation_state.vpaths = []
        elif vpath.type == "clear-pattern":
            vpath_pattern: str = self._value_expansion_engine.exec(vpath.pattern)

            self._evaluation_state.vpaths = [
                rule
                for rule in self._evaluation_state.vpaths
                if rule.pattern != vpath_pattern
            ]
        elif vpath.type == "set-pattern":
            vpath_pattern = self._value_expansion_engine.exec(vpath.pattern)
            search_dirs: list[str] = [
                self._value_expansion_engine.exec(path) for path in vpath.directories
            ]

            self._evaluation_state.vpaths.append(VpathRule(vpath_pattern, search_dirs))
