import errno
import getpass
import os
import signal
import socket
import sys
import sysconfig
from types import MappingProxyType
from typing import TYPE_CHECKING, Any, overload

from cbuild_backend.os import get_os_info

if TYPE_CHECKING:
    from cbuild_backend.interpreter.interpreter import LuaEngine

EOL = os.linesep
DEV_NULL = os.devnull
CONSTANTS = MappingProxyType(
    {
        "signals": {member.name: int(member) for member in signal.Signals},
        "errno": {name: code for code, name in errno.errorcode.items()},
        # Same values as Node's os.constants.priority.
        "priority": {
            "PRIORITY_LOW": 19,
            "PRIORITY_BELOW_NORMAL": 10,
            "PRIORITY_NORMAL": 0,
            "PRIORITY_ABOVE_NORMAL": -7,
            "PRIORITY_HIGH": -14,
            "PRIORITY_HIGHEST": -20,
        },
    }
)


def available_parallelism() -> int:
    return get_os_info()["cpu"]["available_parallelism"]


def arch() -> str:
    return sysconfig.get_platform().rsplit("-", 1)[-1]


def cpus() -> list[dict[str, Any]]:
    # The standard library cannot read per-core speed or times; Node's shape is kept.
    info = get_os_info()["cpu"]
    return [
        {
            "model": info["model"],
            "speed": 0,
            "times": {"user": 0, "nice": 0, "sys": 0, "idle": 0, "irq": 0},
        }
        for _ in range(info["logical_core_count"])
    ]


def endianness() -> str:
    return "LE" if sys.byteorder == "little" else "BE"


def freemem() -> int | None:
    return get_os_info()["memory"]["free_bytes"]


def homedir() -> str:
    return get_os_info()["directories"]["home"]


def hostname() -> str:
    return get_os_info()["hostname"]


def loadavg() -> list[float]:
    return get_os_info()["load_average"]


def machine() -> str:
    return get_os_info()["architecture"]["machine"]


def network_interfaces() -> dict[str, list[dict[str, Any]]]:
    # The standard library only exposes interface names, not their addresses.
    return {name: [] for _, name in socket.if_nameindex()}


def platform() -> str:
    return get_os_info()["platform"]


def release() -> str:
    return get_os_info()["release"]


def tmpdir() -> str:
    return get_os_info()["directories"]["temp"]


def totalmem() -> int:
    return get_os_info()["memory"]["total_bytes"]


def type() -> str:
    return get_os_info()["type"]


def uptime() -> float:
    return get_os_info()["uptime_seconds"]


def version() -> str:
    return get_os_info()["version"]


def get_priority(pid: int | None = None) -> int:
    if not hasattr(os, "getpriority"):
        raise OSError("getPriority is not supported on this platform")
    return os.getpriority(os.PRIO_PROCESS, pid or 0)


@overload
def set_priority(pid_or_priority: int) -> None: ...


@overload
def set_priority(pid_or_priority: int, priority: int) -> None: ...


def set_priority(pid_or_priority: int, priority: int | None = None) -> None:
    if not hasattr(os, "setpriority"):
        raise OSError("setPriority is not supported on this platform")
    if priority is None:
        os.setpriority(os.PRIO_PROCESS, 0, pid_or_priority)
    else:
        os.setpriority(os.PRIO_PROCESS, pid_or_priority, priority)


def user_info(options: dict[str, Any] | None = None) -> dict[str, Any]:
    if hasattr(os, "getuid"):
        import pwd

        entry = pwd.getpwuid(os.getuid())
        return {
            "uid": entry.pw_uid,
            "gid": entry.pw_gid,
            "username": entry.pw_name,
            "homedir": entry.pw_dir,
            "shell": entry.pw_shell,
        }
    # Node reports -1 and a null shell on Windows.
    return {
        "uid": -1,
        "gid": -1,
        "username": getpass.getuser(),
        "homedir": os.path.expanduser("~"),
        "shell": None,
    }


def register(engine: LuaEngine) -> None:
    os_module = MappingProxyType(
        {
            "availableParallelism": available_parallelism,
            "arch": arch,
            "cpus": cpus,
            "endianness": endianness,
            "freemem": freemem,
            "homedir": homedir,
            "hostname": hostname,
            "loadavg": loadavg,
            "machine": machine,
            "networkInterfaces": network_interfaces,
            "platform": platform,
            "release": release,
            "tmpdir": tmpdir,
            "totalmem": totalmem,
            "type": type,
            "uptime": uptime,
            "version": version,
            "getPriority": get_priority,
            "setPriority": set_priority,
            "userInfo": user_info,
            "EOL": EOL,
            "devNull": DEV_NULL,
            "constants": CONSTANTS,
        }
    )

    # os namespace
    engine.global_.set("os", {**os_module})
