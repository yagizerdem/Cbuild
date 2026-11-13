import os
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.execution.preq_resolution.type import (
    OutOfDateResolution,
    PathOrigin,
    PreqResolution,
    TargetResolution,
)
from type.cbuild_exception import CbuildException, ErrorType, MachineCode
from util.file_util import (
    file_exist_by_absolute_path,
    get_modified_time_ns,
    resolve_and_get_absolute_path,
)


class OutOfDateChecker:
    def __init__(self, context: Env) -> None:
        self._context: Final = context

    def _preq_absolute_path(
        self, target: TargetResolution, preq: PreqResolution
    ) -> str:
        if isinstance(preq.origin, PathOrigin) and preq.origin.type == "cwd":
            return preq.origin.absolute_path
        elif isinstance(preq.origin, PathOrigin) and preq.origin.type == "vpath":
            return preq.origin.absolute_path
        elif isinstance(preq.origin, PathOrigin) and preq.origin.type == "absolute":
            return preq.origin.absolute_path
        else:
            raise CbuildException(
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.DEPQ_NOT_FOUND,
                message=f"cbuild: No rule to make target '{preq.preq_name}', needed by '{target.target_name}'. Stop.",
                column=-1,
                row=-1,
            )

    def is_out_of_date(
        self,
        target: TargetResolution,
        preq_resolutions: PreqResolution | list[PreqResolution],
    ) -> bool:
        if not isinstance(preq_resolutions, list):
            return self.is_out_of_date(target, [preq_resolutions])

        if not isinstance(target.origin, PathOrigin):
            return True
        target_absolute_path: str = target.origin.absolute_path

        if not file_exist_by_absolute_path(target_absolute_path):
            return True

        last_modified_date_of_target: int | None = get_modified_time_ns(
            target_absolute_path
        )

        if last_modified_date_of_target is None:
            return True

        old_files_from_cli: list[str] = [
            *self._context.cli_options.old_file,
            *self._context.cli_options.assume_old,
        ]

        new_files_from_cli: list[str] = [
            *self._context.cli_options.new_file,
            *self._context.cli_options.assume_new,
            *self._context.cli_options.what_if,
        ]

        for preq in preq_resolutions:
            if preq.origin.type == "target-rule":
                return True
            preq_absolute_path = self._preq_absolute_path(target, preq)

            exist: bool = file_exist_by_absolute_path(preq_absolute_path)
            if not exist:
                raise CbuildException(
                    error_type=ErrorType.PROCESS,
                    machine_code=MachineCode.DEPQ_NOT_FOUND,
                    message=f"cbuild: No rule to make target '{preq.preq_name}', needed by '{target.target_name}'. Stop.",
                    column=-1,
                    row=-1,
                )

            is_very_old_file = any(
                resolve_and_get_absolute_path(os.getcwd(), old_file)
                == preq_absolute_path
                for old_file in old_files_from_cli
            )

            if is_very_old_file:
                continue

            last_modified_date_of_preq: int | None = get_modified_time_ns(
                preq_absolute_path
            )

            if last_modified_date_of_preq is None:
                return True
            if last_modified_date_of_preq > last_modified_date_of_target:
                return True

            # chedk if file is assumed as new file or not
            for new_file in new_files_from_cli:
                abs_path_of_new_file = resolve_and_get_absolute_path(
                    os.getcwd(),
                    new_file,
                )

                if abs_path_of_new_file == preq_absolute_path:
                    return True

        return False

    def resolve_out_of_date(
        self,
        target_resolution: TargetResolution,
        preq_resolutions: list[PreqResolution],
    ) -> OutOfDateResolution:
        is_target_out_of_date = False

        if target_resolution.origin.type == "not-found":
            is_target_out_of_date = True

        if isinstance(target_resolution.origin, PathOrigin):
            abs_path = target_resolution.origin.absolute_path
            if not file_exist_by_absolute_path(abs_path):
                is_target_out_of_date = True

        out_of_date_preqs: list[PreqResolution] = []
        for i in range(len(preq_resolutions)):
            preq = preq_resolutions[i]
            is_preq_out_of_date = self.is_out_of_date(target_resolution, [preq])
            if is_preq_out_of_date:
                is_target_out_of_date = True
                out_of_date_preqs.append(preq)

        return OutOfDateResolution(
            is_target_out_of_date=is_target_out_of_date,
            resolved_preqs=preq_resolutions,
            resolved_target=target_resolution,
            out_of_date_preqs=out_of_date_preqs,
        )
