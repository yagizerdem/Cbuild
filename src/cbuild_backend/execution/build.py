import os
import re
import sys
from dataclasses import dataclass
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.execution.auto_variable import AutomaticVariableEnv
from cbuild_backend.execution.create_process_env import create_process_env
from cbuild_backend.execution.preq_resolution.out_of_date import OutOfDateChecker
from cbuild_backend.execution.preq_resolution.preq_resolver import resolve_preqs
from cbuild_backend.execution.preq_resolution.target_resolver import resolve_target
from cbuild_backend.execution.preq_resolution.type import (
    OutOfDateResolution,
    PathOrigin,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.execution.type import Pair
from cbuild_backend.expansion import RecipeExpansionEngine, ValueExpansionEngine
from cbuild_backend.model import NormalRule
from cbuild_backend.process import ProcessResult, ProcessRunner, default_shell
from cbuild_compiler.ir import RecipeIR
from type.cbuild_exception import CbuildException, ErrorType, MachineCode
from util.file_util import resolve_and_get_absolute_path, touch_file_sync


@dataclass
class _Resolution:
    target_resolution: TargetResolution
    preq_resolutions: Pair[list[PreqResolution], list[PreqResolution]]
    is_phony_target: bool
    out_of_date_resolution: OutOfDateResolution


class Build:
    def __init__(self, context: Env, explicit_rules: list[NormalRule]) -> None:
        self._context: Final = context
        self._explicit_rules: Final = explicit_rules

    def build_target(self, rule: NormalRule) -> None:
        # resolution
        resolution = self._resolution(rule)
        target_resolution = resolution.target_resolution
        preq_resolutions = resolution.preq_resolutions
        is_phony_target = resolution.is_phony_target
        out_of_date_resolution = resolution.out_of_date_resolution

        # phony targets do not need to be checked for out-of-date status
        if not is_phony_target:
            if not out_of_date_resolution.is_target_out_of_date:
                return

        # if touch cli option is enabled do not need to exexute shell commands.
        if self._context.cli_options.touch:
            self._touch(target_resolution)
            return

        # build required
        if self._context.cli_options.question:
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.REBUILD_REQUIRED,
                message=f"cbuild: Rebuild required for target {rule.target}",
                exit_code=1,
            )

        execution_env = self._prepare_execution_env(
            preq_resolutions=preq_resolutions.first,
            order_only_preq_resolutions=preq_resolutions.second,
            target_resolution=target_resolution,
            out_of_date_resolution=out_of_date_resolution,
            rule=rule,
        )

        if len(rule.evaluated_recipe_irs) > 0:
            # execute user defined recipes
            self._execute_rule_recipes_sequentially(
                rule,
                rule.evaluated_recipe_irs,
                execution_env,
            )
        else:
            # execute default recipes if exist
            self._execute_rule_recipes_sequentially(
                rule,
                self._context.default_recipes,
                execution_env,
            )

    # first resolution phase is required
    def _resolution(self, rule: NormalRule) -> _Resolution:
        target_resolution: TargetResolution = resolve_target(
            self._explicit_rules,
            rule,
            self._context,
        )

        preq_resolutions = resolve_preqs(
            self._explicit_rules,
            rule,
            self._context,
        )

        # check is target is phony
        is_phony_target = rule.target in self._context.phony_targets

        # resolve out of date
        out_of_date_checker = OutOfDateChecker(self._context)
        out_of_date_resolution = out_of_date_checker.resolve_out_of_date(
            target_resolution,
            preq_resolutions.first,
        )

        return _Resolution(
            target_resolution=target_resolution,
            preq_resolutions=preq_resolutions,
            is_phony_target=is_phony_target,
            out_of_date_resolution=out_of_date_resolution,
        )

    def _touch(self, target_resolution: TargetResolution) -> None:
        if not isinstance(target_resolution.origin, PathOrigin):
            target_abs_path = resolve_and_get_absolute_path(
                os.getcwd(),
                target_resolution.target_name,
            )
            touch_file_sync(target_abs_path)
        else:
            touch_file_sync(target_resolution.origin.absolute_path)

    def _execute_rule_recipes_sequentially(
        self,
        rule: NormalRule,
        recipes: list[RecipeIR] | list[str],
        execution_env: Env,
    ) -> None:
        recipe_expansion_engine = RecipeExpansionEngine(execution_env)
        for recipe in recipes:
            # expand recipe before executing
            command: str = (
                recipe.exec(recipe_expansion_engine)
                if isinstance(recipe, RecipeIR)
                else recipe
            )

            # a multi-line expansion (e.g. a define) runs each line as its own command
            for line in command.split("\n"):
                line = line.strip()
                if not line:
                    continue

                start_with_at_symbol = line.startswith("@")
                normalize_command = line[1:].strip() if start_with_at_symbol else line

                if not (
                    self._context.cli_options.dry_run
                    or self._context.cli_options.just_print
                    or self._context.cli_options.recon
                ):
                    result: ProcessResult = self._run_command(normalize_command)

                    if not (
                        self._context.cli_options.silent
                        or self._context.cli_options.quiet
                        or start_with_at_symbol
                    ):
                        print(f"{normalize_command}")

                    self._handle_process_result(rule, result)
                else:
                    # just print the command that would be executed in a dry run
                    print(f"{normalize_command}")

    def _prepare_execution_env(
        self,
        *,
        rule: NormalRule,
        target_resolution: TargetResolution,
        preq_resolutions: list[PreqResolution],
        order_only_preq_resolutions: list[PreqResolution],
        out_of_date_resolution: OutOfDateResolution,
    ) -> Env:
        automatic_variable_env = AutomaticVariableEnv(
            rule,
            self._context,
            target_resolution,
            preq_resolutions,  # normal preq resolutions
            order_only_preq_resolutions,  # order-only preq resolutions
            out_of_date_resolution,
            rule.rule_ir.build_file_meta,
        )

        # add target only env to enclosing of automatic vars env creat chain of env
        automatic_env = automatic_variable_env.generate(
            self._context.target_envs.get(rule.target),
        )

        return automatic_env

    def _handle_process_result(self, src_rule: NormalRule, result: ProcessResult) -> None:
        if result.stdout:
            sys.stdout.write(result.stdout)

        if result.stderr:
            sys.stderr.write(result.stderr)

        if result.exit_code is None or result.exit_code != 0:
            if not self._context.cli_options.ignore_errors:
                raise CbuildException(
                    column=-1,
                    row=-1,
                    error_type=ErrorType.PROCESS,
                    machine_code=MachineCode.SHELL_COMMAND_FAILED,
                    message=f"cbuild: *** [{src_rule.target}] Error {result.exit_code}",
                )

    def _run_command(self, command: str) -> ProcessResult:
        value_expansion_engine = ValueExpansionEngine(self._context)
        process_runner = ProcessRunner()

        # determine the shell executable and its arguments
        shell_var = self._context.get_variable("SHELL")
        shell_path: str | None = None
        if shell_var is not None:
            shell_path = value_expansion_engine.expand(shell_var.value)

        shell_flags_var = self._context.get_variable(".SHELLFLAGS")
        shell_args: list[str] | None = None
        if shell_flags_var:
            shell_args = [
                arg
                for arg in re.split(
                    r"\s+", value_expansion_engine.expand(shell_flags_var.value)
                )
                if arg
            ]
        #

        # send variables that marked as exported to child processes
        process_env = create_process_env(self._context, value_expansion_engine)

        result = (
            process_runner.run(
                command,
                {
                    "shell": {
                        "executable": shell_path,
                        "args": shell_args if shell_args is not None else [],
                    },
                    "cwd": os.getcwd(),
                    "env": process_env,
                    "output": "capture",
                    "ignore_errors": bool(self._context.cli_options.ignore_errors),
                },
            )
            if shell_path is not None
            else process_runner.run(
                command,
                {
                    "cwd": os.getcwd(),
                    "env": process_env,
                    "output": "capture",
                    "shell": (
                        {
                            **default_shell(),
                            "args": shell_args if shell_args is not None else [],
                        }
                        if shell_args is not None
                        else default_shell()
                    ),
                    "ignore_errors": bool(self._context.cli_options.ignore_errors),
                },
            )
        )

        return result
