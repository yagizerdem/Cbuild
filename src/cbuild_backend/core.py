import os
import sys
from dataclasses import dataclass
from typing import Final, Literal, NoReturn, TypedDict, cast

from cbuild_backend.built_in import (
    get_built_in_implicit_rules,
    register_built_in_implicit_variables,
)
from cbuild_backend.database_printer import DatabasePrinter
from cbuild_backend.depq_graph import (
    find_default_target_name,
    find_target_rule,
    get_target_subgraph,
    has_circular_dependency,
)
from cbuild_backend.env import Env, SymbolTableVariable, VariableOrigin, compare_var_priority
from cbuild_backend.evaluator.core.buildfile_evaluator import BuildFileEvaluator
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.execution.schedular.parallel_scheduler import ParallelScheduler
from cbuild_backend.execution.schedular.sequential_schedular import SequentialSchedular
from cbuild_backend.implicit_rule_resolver import ImplicitRuleResolver
from cbuild_backend.model import BaseModel, ImplicitPatterRule, NormalRule, VpathRule
from cbuild_backend.normalize_models import NormalizeModels
from cbuild_backend.semantic import is_compatible
from cbuild_compiler.ir import IR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


@dataclass
class CliVar:
    key: str
    value: str


@dataclass
class EnvVar:
    key: str
    value: str


class RunnerOptions(TypedDict, total=False):
    context: Env
    cli_vars: list[CliVar]
    env_vars: list[EnvVar]
    default_target_name: str


def _no_context() -> NoReturn:
    raise Exception("No context available")


class Core:
    def __init__(self, context: Env) -> None:
        self._context: Final = context

    def run(
        self, rules: list[IR], options: RunnerOptions | None = None
    ) -> None:
        options = options or {}
        current_context = (
            options.get("context")
            or self._context
            or _no_context()
        )

        is_compatible(rules)

        if self._context.cli_options.builtin_variables:
            register_built_in_implicit_variables(self._context)

        self.merge_env_vars(options.get("env_vars") or [])
        self.merge_cli_vars(options.get("cli_vars") or [])

        evaluation_state = BuildFileEvaluationState(
            resolved_models=[],
            vpaths=[],
            include_guard=[],
        )
        evaluator = BuildFileEvaluator(
            current_context,
            rules,
            evaluation_state,
        )
        resolved_models = evaluator.evaluate()

        if (
            self._context.cli_options.builtin_rules
            and self._context.cli_options.builtin_variables
        ):
            resolved_models.extend(get_built_in_implicit_rules())

        # contains relation only needed for build
        explicit_rules = self.collect_normal_rule_models(resolved_models)
        patterns = self.collect_implicit_pattern_rule_models(resolved_models)

        # add seperate resolutino step and normalize rules
        normalization = NormalizeModels(explicit_rules)
        normalized_explicit_rules = normalization.normalize()

        if self._context.cli_options.print_data_base:
            database_printer = DatabasePrinter()
            vpaths: list[VpathRule] = []
            for rule in normalized_explicit_rules:
                if rule.vpath_rules:
                    for vpath_rule in rule.vpath_rules:
                        vpaths.append(vpath_rule)
            database_printer.print(
                {
                    "context": self._context,
                    "explicit_rules": normalized_explicit_rules,
                    "implicit_rules": patterns,
                    "vpaths": vpaths,
                }
            )

            sys.exit(0)

        default_target_name = options.get("default_target_name")
        target_name = (
            default_target_name
            if default_target_name is not None
            else find_default_target_name(normalized_explicit_rules)
        )
        if not target_name:
            raise CbuildException(
                error_type=ErrorType.SEMANTIC,
                machine_code=MachineCode.NO_TARGET_FOUND,
                message="No target found",
                row=-1,
                column=-1,
            )

        resolution = ImplicitRuleResolver(
            normalized_explicit_rules,
            patterns,
            os.getcwd(),
        ).resolve()

        # contains only the rules relevant to the target
        rules_sub_graph = get_target_subgraph(resolution, target_name)
        flag = has_circular_dependency(rules_sub_graph)
        if flag:
            raise CbuildException(
                error_type=ErrorType.SEMANTIC,
                machine_code=MachineCode.CIRCULAR_DEPQ,
                message="Circular dependency detected",
                row=-1,
                column=-1,
            )

        if current_context.cli_options.sequential:
            sequential_schedular = SequentialSchedular(current_context, rules_sub_graph)
            sequential_schedular.sequential_schedule(
                find_target_rule(rules_sub_graph, target_name),
            )
        else:
            parallel_schedular = ParallelScheduler(current_context, rules_sub_graph)
            parallel_schedular.parallel_schedule()

    def collect_normal_rule_models(self, base_modesl: list[BaseModel]) -> list[NormalRule]:
        return [model for model in base_modesl if isinstance(model, NormalRule)]

    def collect_implicit_pattern_rule_models(
        self,
        base_modesl: list[BaseModel],
    ) -> list[ImplicitPatterRule]:
        return [model for model in base_modesl if isinstance(model, ImplicitPatterRule)]

    def merge_env_vars(self, env_vars: list[EnvVar]) -> None:
        env_origin: Literal["environment", "environment-overridden"] = (
            "environment-overridden"
            if self._context.cli_options.environment_overrides
            else "environment"
        )

        for env_var in env_vars:
            if self._context.has_variable(env_var.key):
                symbol_table_var: SymbolTableVariable = cast(
                    SymbolTableVariable,
                    self._context.get_variable(env_var.key),
                )
                if compare_var_priority(symbol_table_var.origin, env_origin) < 0:
                    self._context.set_raw_variable(env_var.key, env_var.value, env_origin)
            else:
                self._context.set_raw_variable(env_var.key, env_var.value, env_origin)

    def merge_cli_vars(self, cli_vars: list[CliVar]) -> None:
        for cli_var in cli_vars:
            if self._context.has_variable(cli_var.key):
                symbol_table_var: SymbolTableVariable = cast(
                    SymbolTableVariable,
                    self._context.get_variable(cli_var.key),
                )
                command_line: VariableOrigin = "command-line"
                if compare_var_priority(symbol_table_var.origin, command_line) < 0:
                    self._context.set_raw_variable(
                        cli_var.key, cli_var.value, command_line
                    )
            else:
                self._context.set_raw_variable(cli_var.key, cli_var.value, "command-line")
