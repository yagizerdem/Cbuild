import os
import shutil
import tempfile
from dataclasses import dataclass, replace
from typing import Any, cast
from unittest import mock

from cbuild_backend.env import Env
from cbuild_backend.evaluator.core.buildfile_evaluator import BuildFileEvaluator
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.execution.auto_variable import AutomaticVariableEnv
from cbuild_backend.execution.preq_resolution.out_of_date import OutOfDateChecker
from cbuild_backend.execution.preq_resolution.preq_resolver import resolve_preqs
from cbuild_backend.execution.preq_resolution.target_resolver import resolve_target
from cbuild_backend.execution.preq_resolution.type import (
    OutOfDateResolution,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.execution.type import Pair
from cbuild_backend.expansion import RecipeExpansionEngine, ValueExpansionEngine
from cbuild_backend.implicit_rule_resolver import ImplicitRuleResolver
from cbuild_backend.model import BaseModel, ImplicitPatterRule, NormalRule
from cbuild_backend.normalize_models import NormalizeModels
from cbuild_compiler.ir import IR, NormalRuleIR, RecipeIR, ValueIR
from test.util.cli_options import empty_cli_options
from test.util.compile import compile


def environment(
    options: dict[str, Any] | None = None,
    parent: Env | None = None,
) -> Env:
    cli_options = empty_cli_options()
    for key, option in {
        "old_file": [],
        "assume_old": [],
        "new_file": [],
        "assume_new": [],
        "what_if": [],
        "include_dir": [],
        **(options or {}),
    }.items():
        setattr(cli_options, key, option)
    env = Env(cli_options)
    env.enclosing = parent
    return env


@dataclass
class Evaluation:
    env: Env
    state: BuildFileEvaluationState
    irs: list[IR]
    models: list[BaseModel]
    rules: list[NormalRule]
    patterns: list[ImplicitPatterRule]


def evaluate(
    source: str,
    env: Env | None = None,
    state: BuildFileEvaluationState | None = None,
) -> Evaluation:
    if env is None:
        env = environment()
    if state is None:
        state = BuildFileEvaluationState(
            vpaths=[], resolved_models=[], include_guard=[]
        )
    irs = compile(source if source.endswith("\n") else f"{source}\n")
    models = BuildFileEvaluator(env, irs, state).evaluate()
    rules = [model for model in models if isinstance(model, NormalRule)]
    patterns = [model for model in models if isinstance(model, ImplicitPatterRule)]
    return Evaluation(env, state, irs, models, rules, patterns)


def normalized(source: str, env: Env | None = None) -> Evaluation:
    result = evaluate(source, env)
    return replace(result, rules=NormalizeModels(result.rules).normalize())


def recipe(expression: str) -> RecipeIR:
    [ir] = compile(f"probe:\n\t{expression}\n")
    if not isinstance(ir, NormalRuleIR):
        raise Exception("Fixture must compile to a normal rule")
    return ir.recipes[0]


def value(expression: str) -> ValueIR:
    ir = recipe(expression)
    if ir.recipe.kind != "command":
        raise Exception("Expected a command recipe")
    return ir.recipe.command


def expand(expression: str, env: Env) -> str:
    return ValueExpansionEngine(env).expand(value(expression))


def commands(rule: NormalRule, env: Env) -> list[str]:
    return [
        cast(str, ir.exec(RecipeExpansionEngine(env)))
        for ir in rule.evaluated_recipe_irs
    ]


def target(rules: list[NormalRule], name: str) -> NormalRule:
    rule = next((candidate for candidate in rules if candidate.target == name), None)
    if rule is None:
        raise Exception(f"Test fixture missing target: {name}")
    return rule


@dataclass
class ImplicitResolution(Evaluation):
    original: list[NormalRule]


def implicit(source: str, cwd: str, env: Env | None = None) -> ImplicitResolution:
    result = normalized(source, env)
    return ImplicitResolution(
        result.env,
        result.state,
        result.irs,
        result.models,
        rules=ImplicitRuleResolver(result.rules, result.patterns, cwd).resolve(),
        patterns=result.patterns,
        original=result.rules,
    )


@dataclass
class Automatic:
    scope: Env
    age: OutOfDateResolution
    preqs: Pair[list[PreqResolution], list[PreqResolution]]
    resolved_target: TargetResolution


def automatic(rules: list[NormalRule], rule: NormalRule, env: Env) -> Automatic:
    resolved_target = resolve_target(rules, rule, env)
    preqs = resolve_preqs(rules, rule, env)
    age = OutOfDateChecker(env).resolve_out_of_date(resolved_target, preqs.first)
    scope = AutomaticVariableEnv(
        rule,
        env,
        resolved_target,
        preqs.first,
        preqs.second,
        age,
    ).generate(env.target_envs.get(rule.target))
    return Automatic(scope, age, preqs, resolved_target)


_test_root = os.path.dirname(os.path.abspath(__file__))
_created: set[str] = set()


def _within(root: str, candidate: str) -> str:
    relative = os.path.relpath(candidate, root)
    if (
        relative == ".."
        or relative.startswith(f"..{os.sep}")
        or os.path.isabs(relative)
    ):
        raise Exception("Fixture path must remain in test/resolution")
    return candidate


_original_cwd: str | None = None


def _remember_cwd() -> None:
    global _original_cwd
    if _original_cwd is None:
        _original_cwd = os.getcwd()


def _restore_cwd() -> None:
    global _original_cwd
    if _original_cwd is not None:
        os.chdir(_original_cwd)
        _original_cwd = None


class Fixture:
    def __init__(self, root: str) -> None:
        self.root = root

    def path(self, name: str) -> str:
        return _within(self.root, os.path.abspath(os.path.join(self.root, name)))

    def write(
        self,
        name: str,
        contents: str = "fixture",
        mtime: int | None = None,
    ) -> str:
        absolute = self.path(name)
        os.makedirs(os.path.dirname(absolute), exist_ok=True)
        with open(absolute, "w", encoding="utf-8") as file:
            file.write(contents)
        if mtime is not None:
            os.utime(absolute, (mtime, mtime))
        return absolute

    def cwd(self) -> None:
        # Unlike Vitest workers, Python can chdir; cleanup restores the real cwd.
        _remember_cwd()
        os.chdir(self.root)


def fixture() -> Fixture:
    root = tempfile.mkdtemp(prefix=".case-fixture-", dir=_test_root)
    _created.add(root)
    return Fixture(root)


def cleanup() -> None:
    mock.patch.stopall()
    _restore_cwd()
    for root in list(_created):
        checked = _within(_test_root, os.path.abspath(root))
        if not os.path.basename(checked).startswith(".case-fixture-"):
            raise Exception("Refusing to delete a non-fixture directory")
        shutil.rmtree(checked, ignore_errors=True)
        _created.discard(root)


OLD = 1_700_000_000
NOW = OLD + 100
NEW = NOW + 100
