from typing import Final

from cbuild_backend.depq_graph import topological_sort
from cbuild_backend.env import Env
from cbuild_backend.execution.build import Build
from cbuild_backend.model import NormalRule


class SequentialSchedular:
    def __init__(self, context: Env, rules: list[NormalRule]) -> None:
        self._context: Final = context
        self._explicit_rules: Final = rules

    # sequuential build

    def sequential_schedule(self, target_rule: NormalRule) -> None:
        build = Build(self._context, self._explicit_rules)

        # should not have circular dependencies to sort
        sorted_rules = topological_sort(self._explicit_rules, target_rule)

        for i in range(len(sorted_rules)):
            current: NormalRule = sorted_rules[i]
            build.build_target(current)
