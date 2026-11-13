import os
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.execution.preq_resolution.type import (
    NoPathOrigin,
    PathOrigin,
    PreqResolution,
)
from cbuild_backend.execution.type import Pair
from cbuild_backend.model import NormalRule, VpathRule
from cbuild_backend.stem_resolver import StemResolver
from type.cbuild_exception import CbuildException, ErrorType, MachineCode
from util.file_util import file_exist_by_absolute_path, resolve_and_get_absolute_path


class PreqResolver:
    def __init__(
        self, normal_rules: list[NormalRule], vpath_rules: list[VpathRule]
    ) -> None:
        self._normal_rules: Final = normal_rules
        self._vpath_rules: Final = vpath_rules

    def resolve(self, preq_name: str) -> PreqResolution:
        is_absolute = os.path.isabs(preq_name)

        if is_absolute:
            if file_exist_by_absolute_path(preq_name):
                return PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=self._vpath_rules,
                    origin=PathOrigin(
                        type="absolute",
                        absolute_path=preq_name,
                    ),
                )
            else:
                return PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=self._vpath_rules,
                    origin=NoPathOrigin(
                        type="not-found",
                    ),
                )

        # relative paths

        # 1 check by cwd
        resolved_absolute_path = resolve_and_get_absolute_path(
            os.getcwd(),
            preq_name,
        )

        if file_exist_by_absolute_path(resolved_absolute_path):
            return PreqResolution(
                preq_name=preq_name,
                vpath_rules=self._vpath_rules,
                origin=PathOrigin(
                    type="cwd",
                    absolute_path=resolved_absolute_path,
                ),
            )

        vpath_stem_resolver = StemResolver()
        # check by vpath rules
        for vpath_rule in self._vpath_rules:
            if not vpath_stem_resolver.match(vpath_rule.pattern, preq_name):
                continue
            for vpath_base_dir in vpath_rule.dirs:
                resolved_absolute_path_by_vpath = resolve_and_get_absolute_path(
                    vpath_base_dir,
                    preq_name,
                )

                if file_exist_by_absolute_path(resolved_absolute_path_by_vpath):
                    return PreqResolution(
                        preq_name=preq_name,
                        vpath_rules=self._vpath_rules,
                        origin=PathOrigin(
                            type="vpath",
                            absolute_path=resolved_absolute_path_by_vpath,
                        ),
                    )

        # chekc for target-rule names
        # does not exist in file system but mathes a target-rule pattern

        for normal_rule in self._normal_rules:
            if normal_rule.target == preq_name:
                return PreqResolution(
                    preq_name=preq_name,
                    vpath_rules=self._vpath_rules,
                    origin=NoPathOrigin(
                        type="target-rule",
                    ),
                )

        return PreqResolution(
            preq_name=preq_name,
            vpath_rules=self._vpath_rules,
            origin=NoPathOrigin(
                type="not-found",
            ),
        )


def resolve_preqs(
    explicit_rules: list[NormalRule],
    rule: NormalRule,
    context: Env,
) -> Pair[list[PreqResolution], list[PreqResolution]]:
    preq_resolver = PreqResolver(explicit_rules, rule.vpath_rules or [])

    preq_resolutions = [preq_resolver.resolve(preq) for preq in rule.prerequisites]

    order_only_preq_resolutions = [
        preq_resolver.resolve(preq) for preq in rule.order_only_prerequisites
    ]

    not_found = next(
        (
            resolution
            for resolution in [*preq_resolutions, *order_only_preq_resolutions]
            if resolution.origin.type == "not-found"
        ),
        None,
    )

    if not_found:
        raise CbuildException(
            error_type=ErrorType.PROCESS,
            machine_code=MachineCode.DEPQ_NOT_FOUND,
            message=f"cbuild: No rule to make target '{not_found.preq_name}', needed by '{rule.target}'. Stop.",
            column=-1,
            row=-1,
        )

    return Pair(
        first=preq_resolutions,
        second=order_only_preq_resolutions,
    )
