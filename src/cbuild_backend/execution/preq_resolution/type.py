from dataclasses import dataclass
from typing import Literal

from cbuild_backend.model import VpathRule

type PreqType = Literal[
    "cwd",
    "absolute",
    "vpath",
    "target-rule",  # does not has file but has target rule
    "not-found",
]


@dataclass
class NoPathOrigin[K: str]:
    type: K


@dataclass
class PathOrigin[K: str]:
    type: K
    absolute_path: str


@dataclass
class PreqResolution:
    preq_name: str
    vpath_rules: list[VpathRule]
    origin: (
        NoPathOrigin[Literal["target-rule", "not-found"]]
        | PathOrigin[Literal["cwd", "absolute", "vpath"]]
    )


type TargetType = Literal["cwd", "absolute", "vpath", "not-found"]


@dataclass
class TargetResolution:
    target_name: str
    vpath_rules: list[VpathRule]
    origin: NoPathOrigin[Literal["not-found"]] | PathOrigin[
        Literal["cwd", "absolute", "vpath"]
    ]


@dataclass
class OutOfDateResolution:
    resolved_target: TargetResolution
    resolved_preqs: list[PreqResolution]
    is_target_out_of_date: bool
    out_of_date_preqs: list[PreqResolution]
