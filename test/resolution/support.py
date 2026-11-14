import os
import shutil
import tempfile
from dataclasses import dataclass
from typing import cast
from unittest import mock

from cbuild_backend.env import Env
from cbuild_backend.evaluator.core.buildfile_evaluator import BuildFileEvaluator
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.expansion import RecipeExpansionEngine
from cbuild_backend.implicit_rule_resolver import ImplicitRuleResolver
from cbuild_backend.model import BaseModel, ImplicitPatterRule, NormalRule
from cbuild_backend.normalize_models import NormalizeModels
from test.util.cli_options import empty_cli_options
from test.util.compile import compile


def environment() -> Env:
    cli_options = empty_cli_options()
    cli_options.old_file = []
    cli_options.assume_old = []
    cli_options.new_file = []
    cli_options.assume_new = []
    cli_options.what_if = []
    cli_options.include_dir = []
    cli_options.directory = []
    return Env(cli_options)


def evaluation_state() -> BuildFileEvaluationState:
    return BuildFileEvaluationState(vpaths=[], resolved_models=[], include_guard=[])


@dataclass
class Evaluation:
    env: Env
    state: BuildFileEvaluationState
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
        state = evaluation_state()
    models = BuildFileEvaluator(env, compile(source), state).evaluate()
    return Evaluation(
        env,
        state,
        models,
        rules=[model for model in models if isinstance(model, NormalRule)],
        patterns=[model for model in models if isinstance(model, ImplicitPatterRule)],
    )


@dataclass
class ImplicitResolution(Evaluation):
    original: list[NormalRule]
    resolver: ImplicitRuleResolver


def implicit(source: str, cwd: str, env: Env | None = None) -> ImplicitResolution:
    result = evaluate(source, env)
    original = NormalizeModels(result.rules).normalize()
    resolver = ImplicitRuleResolver(original, result.patterns, cwd)
    return ImplicitResolution(
        result.env,
        result.state,
        result.models,
        rules=resolver.resolve(),
        patterns=result.patterns,
        original=original,
        resolver=resolver,
    )


def commands(rule: NormalRule, env: Env) -> list[str]:
    return [
        cast(str, ir.exec(RecipeExpansionEngine(env)))
        for ir in rule.evaluated_recipe_irs
    ]


def target(rules: list[NormalRule], name: str) -> NormalRule:
    found = next((rule for rule in rules if rule.target == name), None)
    if found is None:
        raise Exception(f"Expected resolved target: {name}")
    return found


_test_root = os.path.dirname(os.path.abspath(__file__))
_fixtures: set[str] = set()


def _within(root: str, candidate: str) -> str:
    relative = os.path.relpath(candidate, root)
    if (
        relative == ".."
        or relative.startswith(f"..{os.sep}")
        or os.path.isabs(relative)
    ):
        raise Exception("Fixture path escapes the new test directory")
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

    def write(self, name: str, content: str = "fixture") -> str:
        filename = self.path(name)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, "w", encoding="utf-8") as file:
            file.write(content)
        return filename

    def cwd(self) -> None:
        # Unlike Vitest workers, Python can chdir; cleanup restores the real cwd.
        _remember_cwd()
        os.chdir(self.root)


def fixture() -> Fixture:
    root = tempfile.mkdtemp(prefix=".fixture-", dir=_test_root)
    _fixtures.add(root)
    return Fixture(root)


def cleanup() -> None:
    mock.patch.stopall()
    _restore_cwd()
    for root in list(_fixtures):
        absolute = _within(_test_root, os.path.abspath(root))
        if not os.path.basename(absolute).startswith(".fixture-"):
            raise Exception("Refusing to remove a non-fixture directory")
        shutil.rmtree(absolute, ignore_errors=True)
        _fixtures.discard(root)
