import ctypes
import os
import platform
import socket
import sys
import sysconfig
import tempfile
import time
from typing import Any

PLATFORM_NAMES = {
    "darwin": "macOS",
    "win32": "Windows",
    "linux": "Linux",
    "freebsd": "FreeBSD",
    "openbsd": "OpenBSD",
    "netbsd": "NetBSD",
    "aix": "AIX",
    "sunos": "SunOS",
    "android": "Android",
}


class _MemoryStatusEx(ctypes.Structure):
    _fields_ = [
        ("dwLength", ctypes.c_ulong),
        ("dwMemoryLoad", ctypes.c_ulong),
        ("ullTotalPhys", ctypes.c_ulonglong),
        ("ullAvailPhys", ctypes.c_ulonglong),
        ("ullTotalPageFile", ctypes.c_ulonglong),
        ("ullAvailPageFile", ctypes.c_ulonglong),
        ("ullTotalVirtual", ctypes.c_ulonglong),
        ("ullAvailVirtual", ctypes.c_ulonglong),
        ("ullAvailExtendedVirtual", ctypes.c_ulonglong),
    ]


def _platform() -> str:
    # Mirrors Node's os.platform(): Python appends version numbers on some
    # systems (e.g. "freebsd14", "sunos5"), Node does not.
    if sys.platform == "win32":
        return "win32"
    return sys.platform.rstrip("0123456789")


def _load_average() -> list[float]:
    # Node returns [0, 0, 0] on Windows.
    if sys.platform == "win32":
        return [0.0, 0.0, 0.0]
    return list(os.getloadavg())


def _memory() -> tuple[int, int | None]:
    if sys.platform == "win32":
        status = _MemoryStatusEx()
        status.dwLength = ctypes.sizeof(_MemoryStatusEx)
        ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(status))
        return status.ullTotalPhys, status.ullAvailPhys

    page_size = os.sysconf("SC_PAGE_SIZE")
    total_bytes = os.sysconf("SC_PHYS_PAGES") * page_size
    free_bytes = (
        os.sysconf("SC_AVPHYS_PAGES") * page_size
        if "SC_AVPHYS_PAGES" in os.sysconf_names
        else None
    )
    return total_bytes, free_bytes


def _uptime() -> float:
    if sys.platform == "win32":
        get_tick_count_64 = ctypes.windll.kernel32.GetTickCount64
        get_tick_count_64.restype = ctypes.c_ulonglong
        return get_tick_count_64() / 1000
    if hasattr(time, "CLOCK_BOOTTIME"):
        return time.clock_gettime(time.CLOCK_BOOTTIME)
    return time.monotonic()


def get_os_info() -> dict[str, Any]:
    platform_name = _platform()
    total_bytes, free_bytes = _memory()

    return {
        "name": PLATFORM_NAMES.get(platform_name, platform_name),
        "platform": platform_name,
        "type": platform.system(),
        "release": platform.release(),
        "version": platform.version(),
        "hostname": socket.gethostname(),
        "load_average": _load_average(),
        "architecture": {
            "machine": platform.machine(),
            "python": sysconfig.get_platform().rsplit("-", 1)[-1],
        },
        "cpu": {
            "model": platform.processor() or None,
            "logical_core_count": os.cpu_count() or 0,
            "available_parallelism": os.process_cpu_count() or 1,
        },
        "memory": {
            "total_bytes": total_bytes,
            "free_bytes": free_bytes,
        },
        "uptime_seconds": _uptime(),
        "directories": {
            "home": os.path.expanduser("~"),
            "temp": tempfile.gettempdir(),
        },
        "is_windows": platform_name == "win32",
        "is_mac_os": platform_name == "darwin",
        "is_linux": platform_name == "linux",
    }
