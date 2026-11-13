import asyncio
import os
import re
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.evaluator.core.type import BuildFileEvaluationState
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.model import BaseModel
from cbuild_compiler.ir import Include, IncludeIR
from core.frontend import frontend
from type.buildfile_meta import BuildFileMeta
from type.cbuild_exception import CbuildException, ErrorType, MachineCode
from util.file_util import file_exist_by_absolute_path, resolve_and_get_absolute_path


def _read_text(file_path: str) -> str:
    with open(file_path, encoding="utf-8") as file:
        return file.read()


class IncludeIREvaluator:
    def __init__(
        self,
        context: Env,
        ir: IncludeIR,
        evaluation_state: BuildFileEvaluationState,
    ) -> None:
        self._context: Final = context
        self._ir: Final = ir
        self._evaluation_state: Final = evaluation_state
        self._value_expansion_engine: Final = ValueExpansionEngine(context)

    async def execute_async(self) -> list[BaseModel]:
        # Imported here to avoid a circular import: BuildFileEvaluator imports
        # this module.
        from cbuild_backend.evaluator.core.buildfile_evaluator import (
            BuildFileEvaluator,
        )

        include: Include = self._ir.include
        silent = include == "-include" or include == "sinclude"

        expanded_file_paths = self._value_expansion_engine.expand(
            self._ir.includepath,
        )

        file_paths = [
            path for path in re.split(r"\s+", expanded_file_paths.strip()) if path
        ]

        models: list[BaseModel] = []
        loop_up_dests = [os.getcwd()]
        for included_dest in self._context.cli_options.include_dir:
            loop_up_dests.append(
                resolve_and_get_absolute_path(os.getcwd(), included_dest)
            )

        for file_path in file_paths:
            resolved_build_file_paths: list[str] = [
                resolve_and_get_absolute_path(dest, file_path)
                for dest in loop_up_dests
            ]
            resolved_build_file_path = next(
                (
                    path
                    for path in resolved_build_file_paths
                    if file_exist_by_absolute_path(path)
                ),
                None,
            )

            if not resolved_build_file_path:
                if silent:
                    continue

                raise CbuildException(
                    column=self._ir.col,
                    row=self._ir.row,
                    error_type=ErrorType.PROCESS,
                    machine_code=MachineCode.INCLUDE_FILE_NOT_FOUND,
                    message=f"Include file not found: {resolved_build_file_path}",
                )

            # check circular include
            if resolved_build_file_path in self._evaluation_state.include_guard:
                raise CbuildException(
                    column=self._ir.col,
                    row=self._ir.row,
                    error_type=ErrorType.PROCESS,
                    machine_code=MachineCode.CIRCULAR_INCLUDE,
                    message=f"Circular include detected: {resolved_build_file_path}",
                )

            build_file_content = await asyncio.to_thread(
                _read_text, resolved_build_file_path
            )

            build_file = BuildFileMeta(
                absolute_path=resolved_build_file_path,
                raw_content=build_file_content,
                size=(await asyncio.to_thread(os.stat, resolved_build_file_path)).st_size,
                relative_path=os.path.relpath(resolved_build_file_path, os.getcwd()),
                name=os.path.basename(resolved_build_file_path),
            )

            ir = frontend(build_file)

            try:
                self._evaluation_state.include_guard.append(resolved_build_file_path)
                build_file_evaluator = BuildFileEvaluator(
                    self._context,
                    ir,
                    self._evaluation_state,
                )
                resolved_models = await build_file_evaluator.evaluate_async()
                models.extend(resolved_models)
            finally:
                self._evaluation_state.include_guard = [
                    path
                    for path in self._evaluation_state.include_guard
                    if path != resolved_build_file_path
                ]

        return models
