import os
import shutil
import tempfile
from dataclasses import dataclass, replace
from typing import Any, cast
from unittest import mock

from cbuild_backend.env import Env
from cbuild_backend.evaluator.core.buildfile_evaluator import BuildFileEvaluator
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.expansion import RecipeExpansionEngine, ValueExpansionEngine
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
    irs: list[IR]
    state: BuildFileEvaluationState
    models: list[BaseModel]
    rules: list[NormalRule]
    patterns: list[ImplicitPatterRule]


# Use the real parser/compiler, rejecting syntax errors rather than manufacturing IR.
def evaluate(source: str, env: Env | None = None) -> Evaluation:
    if env is None:
        env = environment()
    irs = compile(source if source.endswith("\n") else f"{source}\n")
    state = BuildFileEvaluationState(vpaths=[], resolved_models=[], include_guard=[])
    models = BuildFileEvaluator(env, irs, state).evaluate()
    rules = [model for model in models if isinstance(model, NormalRule)]
    patterns = [model for model in models if isinstance(model, ImplicitPatterRule)]
    return Evaluation(env, irs, state, models, rules, patterns)


def normalized(source: str, env: Env | None = None) -> Evaluation:
    result = evaluate(source, env)
    return replace(result, rules=NormalizeModels(result.rules).normalize())


def recipe(expression: str) -> RecipeIR:
    [rule] = compile(f"probe:\n\t{expression}\n")
    if not isinstance(rule, NormalRuleIR):
        raise Exception("Expected normal rule")
    return rule.recipes[0]


def value(expression: str) -> ValueIR:
    ir = recipe(expression)
    if ir.recipe.kind != "command":
        raise Exception("Expected command recipe")
    return ir.recipe.command


def expand(expression: str, env: Env) -> str:
    return ValueExpansionEngine(env).expand(value(expression))


def commands(rule: NormalRule, env: Env) -> list[str]:
    return [
        cast(str, ir.exec(RecipeExpansionEngine(env)))
        for ir in rule.evaluated_recipe_irs
    ]


def target(rules: list[NormalRule], name: str) -> NormalRule:
    found = next((rule for rule in rules if rule.target == name), None)
    if found is None:
        raise Exception(f"Test fixture is missing target {name}")
    return found


_resolution_root = os.path.dirname(os.path.abspath(__file__))
_active_fixtures: set[str] = set()


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
        absolute = os.path.abspath(os.path.join(self.root, name))
        relative = os.path.relpath(absolute, self.root)
        if relative.startswith("..") or os.path.isabs(relative):
            raise Exception("Fixture path escapes test root")
        return absolute

    def write(
        self,
        name: str,
        content: str = "fixture",
        mtime_seconds: int | None = None,
    ) -> str:
        absolute = self.path(name)
        os.makedirs(os.path.dirname(absolute), exist_ok=True)
        with open(absolute, "w", encoding="utf-8") as file:
            file.write(content)
        if mtime_seconds is not None:
            os.utime(absolute, (mtime_seconds, mtime_seconds))
        return absolute

    def directory(self, name: str) -> str:
        absolute = self.path(name)
        os.makedirs(absolute, exist_ok=True)
        return absolute

    def use_as_cwd(self) -> None:
        # Unlike Vitest workers, Python can chdir; cleanup restores the real cwd.
        _remember_cwd()
        os.chdir(self.root)


def fixture() -> Fixture:
    root = tempfile.mkdtemp(prefix=".fixture-", dir=_resolution_root)
    _active_fixtures.add(root)
    return Fixture(root)


def cleanup_fixtures() -> None:
    mock.patch.stopall()
    _restore_cwd()
    for root in list(_active_fixtures):
        relative = os.path.relpath(os.path.abspath(root), _resolution_root)
        if (
            relative.startswith("..")
            or os.path.isabs(relative)
            or not relative.startswith(".fixture-")
        ):
            raise Exception(
                "Refusing to remove a directory outside test/resolution fixtures"
            )
        shutil.rmtree(root, ignore_errors=True)
        _active_fixtures.discard(root)
