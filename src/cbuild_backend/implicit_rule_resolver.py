import os
from dataclasses import dataclass, field
from typing import Final, cast

from cbuild_backend.model import ImplicitPatterRule, NormalRule, VpathRule
from cbuild_backend.stem_resolver import StemResolver
from cbuild_compiler.ir import RuleSeparator
from util.file_util import file_exist_by_absolute_path, resolve_and_get_absolute_path


@dataclass(eq=False)
class _Candidate:
    rule: ImplicitPatterRule
    stem: str
    directory: str
    prerequisites: list[str]
    order_only_prerequisites: list[str]


@dataclass(eq=False)
class _ResolutionPlan:
    candidate: _Candidate
    dependencies: dict[str, _ResolutionPlan] = field(default_factory=dict)


class ImplicitRuleResolver:
    def __init__(
        self,
        rules: list[NormalRule],
        patterns: list[ImplicitPatterRule],
        cwd: str | None = None,
    ) -> None:
        self._rules: Final = [*rules]
        self._patterns: Final = patterns
        self._stem_resolver: Final = StemResolver()
        self._cwd: Final = cwd if cwd is not None else os.getcwd()
        self._rules_by_target: Final[dict[str, list[NormalRule]]] = {}
        for rule in rules:
            entries = self._rules_by_target.get(rule.target, [])
            entries.append(rule)
            self._rules_by_target[rule.target] = entries

    def resolve(self) -> list[NormalRule]:
        # Keep original order (and the default goal), including recipe-less rules.
        resolved = [*self._rules]
        visited: set[str] = set()
        for rule in self._rules:
            self._resolve_target(rule.target, resolved, visited)

        return resolved

    def _resolve_target(
        self,
        target: str,
        resolved: list[NormalRule],
        visited: set[str],
        selected_plan: _ResolutionPlan | None = None,
    ) -> None:
        if target in visited:
            return
        visited.add(target)

        explicit = self._rules_by_target.get(target, [])
        # Each double-colon entry is independent; normal rules arrive normalized.
        entries: list[NormalRule | None] = [*explicit] if len(explicit) else [None]
        for rule in entries:
            has_recipe = rule is not None and (
                len(rule.recipe_irs) > 0 or len(rule.evaluated_recipe_irs) > 0
            )
            plan = (
                None
                if has_recipe
                else selected_plan
                if selected_plan is not None
                else self._find_plan(target, set(), set(), False, rule)
            )
            result = rule
            if plan:
                result = self._create_rule(target, plan.candidate, rule)
                if rule:
                    resolved[resolved.index(rule)] = result
                else:
                    resolved.append(result)

                # Only commit dependencies of the successful candidate. Failed searches
                # must not leave generated rules behind in the build graph.
                for name, dependency in plan.dependencies.items():
                    self._resolve_target(name, resolved, visited, dependency)
            if not result:
                continue
            for name in [*result.prerequisites, *result.order_only_prerequisites]:
                # Terminal pattern rules do not start implicit searches for their inputs.
                if (
                    plan
                    and self._is_terminal(plan.candidate.rule)
                    and name not in self._rules_by_target
                    and not (
                        rule is not None
                        and (
                            name in rule.prerequisites
                            or name in rule.order_only_prerequisites
                        )
                    )
                ):
                    continue
                self._resolve_target(name, resolved, visited)

    def _find_plan(
        self,
        target: str,
        active_targets: set[str],
        active_patterns: set[ImplicitPatterRule],
        recursive: bool = False,
        explicit: NormalRule | None = None,
    ) -> _ResolutionPlan | None:
        if target in active_targets:
            return None
        next_targets = {*active_targets, target}
        candidates = [
            candidate
            for candidate in self._find_candidates(target, recursive)
            if candidate.rule not in active_patterns
        ]
        ordered: list[_Candidate] = []
        while len(candidates):
            most_specific = cast(
                _Candidate, self._most_spesific_candidate(candidates)
            )
            ordered.append(most_specific)
            candidates.pop(candidates.index(most_specific))

        # GNU make first tries every candidate without chaining, then allows
        # intermediate implicit rules. A shorter stem wins within each pass.
        for chaining in [False, True]:
            for candidate in ordered:
                if chaining and self._is_terminal(candidate.rule):
                    continue
                dependencies: dict[str, _ResolutionPlan] = {}
                next_patterns = {*active_patterns, candidate.rule}
                vpaths = [
                    *(explicit.vpath_rules if explicit is not None else []),
                    *candidate.rule.vpath_rules,
                ]

                def is_applicable(name: str) -> bool:
                    if self._is_direct_input(name, vpaths, explicit):
                        return True
                    if not chaining:
                        return False
                    dependency = self._find_plan(
                        name, next_targets, next_patterns, True
                    )
                    if not dependency:
                        return False
                    dependencies[name] = dependency
                    return True

                applicable = all(
                    is_applicable(name)
                    for name in [
                        *candidate.prerequisites,
                        *candidate.order_only_prerequisites,
                    ]
                )
                if applicable:
                    return _ResolutionPlan(candidate, dependencies)
        return None

    def _create_rule(
        self,
        target: str,
        candidate: _Candidate,
        explicit: NormalRule | None = None,
    ) -> NormalRule:
        pattern_rule = candidate.rule
        # The implicit source must come first for the existing $< implementation.
        prerequisites = [
            *candidate.prerequisites,
            *(explicit.prerequisites if explicit is not None else []),
        ]
        order_only_prerequisites = [
            name
            for name in [
                *candidate.order_only_prerequisites,
                *(explicit.order_only_prerequisites if explicit is not None else []),
            ]
            if name not in prerequisites
        ]
        new_rule = NormalRule(
            {
                "target": target,
                "prerequisites": prerequisites,
                "order_only_prerequisites": order_only_prerequisites,
                "evaluated_recipe_irs": [*pattern_rule.evaluated_recipe_irs],
                "recipe_irs": [*pattern_rule.recipe_irs],
                "shell_commands": [],
                "rule_ir": pattern_rule.rule_ir,
                "rule_seperator": (
                    explicit.rule_seperator
                    if explicit is not None
                    else RuleSeparator.SINGLE_COLON
                ),
                "vpath_rules": list(
                    dict.fromkeys(
                        [
                            *(explicit.vpath_rules if explicit is not None else []),
                            *pattern_rule.vpath_rules,
                        ]
                    )
                ),
                "stem": candidate.directory + candidate.stem,
            }
        )
        # Keep a real NormalRule instance and preserve an existing rule's identity.
        if explicit:
            new_rule.uuid = explicit.uuid
        return new_rule

    def _is_direct_input(
        self,
        name: str,
        vpaths: list[VpathRule],
        explicit: NormalRule | None = None,
    ) -> bool:
        if (
            name in self._rules_by_target
            or (explicit is not None and name in explicit.prerequisites)
            or (explicit is not None and name in explicit.order_only_prerequisites)
        ):
            return True
        if file_exist_by_absolute_path(resolve_and_get_absolute_path(self._cwd, name)):
            return True
        return any(
            self._stem_resolver.match(vpath.pattern, name)
            and any(
                file_exist_by_absolute_path(
                    resolve_and_get_absolute_path(
                        resolve_and_get_absolute_path(self._cwd, directory),
                        name,
                    )
                )
                for directory in vpath.dirs
            )
            for vpath in vpaths
        )

    def _is_terminal(self, rule: ImplicitPatterRule) -> bool:
        return rule.rule_ir.separator == "::" or rule.rule_ir.separator == "&::"

    def _find_candidates(self, target: str, recursive: bool = False) -> list[_Candidate]:
        candidates: list[_Candidate] = []
        last_slash = target.rfind("/")
        specific_match = False
        for pattern in self._patterns:
            if not self._stem_resolver.has_stem(pattern.target_pattern):
                continue
            directory = (
                "" if "/" in pattern.target_pattern else target[: last_slash + 1]
            )
            target_name = target[last_slash + 1 :] if directory else target
            if self._stem_resolver.match(pattern.target_pattern, target_name):
                stem = self._stem_resolver.resolve_stem(
                    pattern.target_pattern,
                    target_name,
                )
                if stem is not None and len(stem) > 0:
                    if pattern.target_pattern != "%":
                        specific_match = True
                    if (
                        len(pattern.recipe_irs) == 0
                        and len(pattern.evaluated_recipe_irs) == 0
                    ):
                        continue

                    def replace(name: str, stem: str = stem, directory: str = directory) -> str:
                        return (
                            directory + self._stem_resolver.replace_stem(name, stem)
                            if self._stem_resolver.has_stem(name)
                            else name
                        )

                    candidates.append(
                        _Candidate(
                            rule=pattern,
                            stem=stem,
                            directory=directory,
                            prerequisites=[replace(p) for p in pattern.prerequisites],
                            order_only_prerequisites=[
                                replace(p) for p in pattern.order_only_prerequisites
                            ],
                        )
                    )
        return [
            candidate
            for candidate in candidates
            if candidate.rule.target_pattern != "%"
            or self._is_terminal(candidate.rule)
            or not (specific_match or recursive)
        ]

    def _most_spesific_candidate(
        self, candidates: list[_Candidate]
    ) -> _Candidate | None:
        if len(candidates) == 0:
            return None
        most_specific = candidates[0]
        for candidate in candidates:
            if len(candidate.directory) + len(candidate.stem) < len(
                most_specific.directory
            ) + len(most_specific.stem):
                most_specific = candidate
        return most_specific
