import os
from typing import Final

from cbuild_backend.env import Env
from cbuild_backend.execution.preq_resolution.type import (
    NoPathOrigin,
    PathOrigin,
    TargetResolution,
)
from cbuild_backend.model import NormalRule, VpathRule
from cbuild_backend.stem_resolver import StemResolver
from util.file_util import file_exist_by_absolute_path, resolve_and_get_absolute_path


class TargetResolver:
    def __init__(
        self, normal_rules: list[NormalRule], vpath_rules: list[VpathRule]
    ) -> None:
        self._normal_rules: Final = normal_rules
        self._vpath_rules: Final = vpath_rules

    def resolve(self, target_name: str) -> TargetResolution:
        is_absolute = os.path.isabs(target_name)

        if is_absolute:
            if file_exist_by_absolute_path(target_name):
                return TargetResolution(
                    target_name=target_name,
                    vpath_rules=self._vpath_rules,
                    origin=PathOrigin(
                        type="absolute",
                        absolute_path=target_name,
                    ),
                )
            else:
                return TargetResolution(
                    target_name=target_name,
                    vpath_rules=self._vpath_rules,
                    origin=NoPathOrigin(
                        type="not-found",
                    ),
                )

        # relative paths

        # 1 check by cwd
        resolved_absolute_path = resolve_and_get_absolute_path(
            os.getcwd(),
            target_name,
        )

        if file_exist_by_absolute_path(resolved_absolute_path):
            return TargetResolution(
                target_name=target_name,
                vpath_rules=self._vpath_rules,
                origin=PathOrigin(
                    type="cwd",
                    absolute_path=resolved_absolute_path,
                ),
            )

        vpath_stem_resolver = StemResolver()
        # check by vpath rules
        for vpath_rule in self._vpath_rules:
            if not vpath_stem_resolver.match(vpath_rule.pattern, target_name):
                continue
            for vpath_base_dir in vpath_rule.dirs:
                resolved_absolute_path_by_vpath = resolve_and_get_absolute_path(
                    vpath_base_dir,
                    target_name,
                )

                if file_exist_by_absolute_path(resolved_absolute_path_by_vpath):
                    return TargetResolution(
                        target_name=target_name,
                        vpath_rules=self._vpath_rules,
                        origin=PathOrigin(
                            type="vpath",
                            absolute_path=resolved_absolute_path_by_vpath,
                        ),
                    )

        return TargetResolution(
            target_name=target_name,
            vpath_rules=self._vpath_rules,
            origin=NoPathOrigin(
                type="not-found",
            ),
        )


def resolve_target(
    explicit_rules: list[NormalRule],
    rule: NormalRule,
    context: Env,
) -> TargetResolution:
    target_resolver = TargetResolver(
        explicit_rules,
        rule.vpath_rules or [],
    )

    target_resolution = target_resolver.resolve(rule.target)

    return target_resolution
