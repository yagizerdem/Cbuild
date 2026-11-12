from __future__ import annotations

import asyncio
import errno
import os
import stat
from collections.abc import Sequence
from datetime import datetime
from typing import Literal, NotRequired, TypedDict


def resolve_and_get_absolute_path(
    base_dir: str,
    relative_path: str,
) -> str:
    absolute_path = os.path.abspath(os.path.join(base_dir, relative_path))
    return absolute_path


async def file_exist_by_absolute_path_async(
    absolute_path: str,
) -> bool:
    return await asyncio.to_thread(os.access, absolute_path, os.F_OK)


def file_exist_by_absolute_path(absolute_path: str) -> bool:
    return os.path.exists(absolute_path)


async def get_modified_date_async(
    file_absolute_path: str,
) -> datetime | None:
    try:
        stats = await asyncio.to_thread(os.stat, file_absolute_path)
        return datetime.fromtimestamp(stats.st_mtime)
    except Exception:
        return None


def _is_missing_path(error: BaseException) -> bool:
    return isinstance(error, OSError) and (
        error.errno == errno.ENOENT or error.errno == errno.ENOTDIR
    )


async def get_file_stats_async(
    file_path: str,
) -> os.stat_result | None:
    try:
        return await asyncio.to_thread(os.stat, file_path)
    except Exception as error:
        if _is_missing_path(error):
            return None
        raise


def get_file_stats(file_path: str) -> os.stat_result | None:
    try:
        return os.stat(file_path)
    except Exception as error:
        if _is_missing_path(error):
            return None

        raise


def get_modified_time_ns(file_path: str) -> int | None:
    stats = get_file_stats(file_path)
    return stats.st_mtime_ns if stats is not None else None


async def get_modified_time_ns_async(
    file_path: str,
) -> int | None:
    stats = await get_file_stats_async(file_path)
    return stats.st_mtime_ns if stats is not None else None


async def is_file_async(file_path: str) -> bool:
    stats = await get_file_stats_async(file_path)
    return stat.S_ISREG(stats.st_mode) if stats is not None else False


async def is_directory_async(file_path: str) -> bool:
    stats = await get_file_stats_async(file_path)
    return stat.S_ISDIR(stats.st_mode) if stats is not None else False


class RebuildOptions(TypedDict):
    base_dir: NotRequired[str]
    phony: NotRequired[bool]
    prerequisites: Sequence[str]
    """Pass only normal prerequisites; order-only prerequisites do not affect age."""
    phony_prerequisites: NotRequired[Sequence[str]]


class RebuildStatus(TypedDict):
    needs_rebuild: bool
    reason: Literal[
        "phony-target",
        "missing-target",
        "phony-prerequisite",
        "missing-prerequisite",
        "newer-prerequisite",
        "up-to-date",
    ]
    prerequisite: NotRequired[str]


async def get_rebuild_status_async(
    target: str,
    options: RebuildOptions,
) -> RebuildStatus:
    """Check after prerequisite builds complete. A missing prerequisite still needs
    rule resolution by the build scheduler; this helper cannot decide buildability.
    """
    if options.get("phony"):
        return {"needs_rebuild": True, "reason": "phony-target"}
    base_dir = options.get("base_dir", os.getcwd())
    target_time = await get_modified_time_ns_async(
        os.path.abspath(os.path.join(base_dir, target)),
    )
    if target_time is None:
        return {"needs_rebuild": True, "reason": "missing-target"}
    phony = set(options.get("phony_prerequisites", ()))
    for prerequisite in options["prerequisites"]:
        if prerequisite in phony:
            return {
                "needs_rebuild": True,
                "reason": "phony-prerequisite",
                "prerequisite": prerequisite,
            }
        time = await get_modified_time_ns_async(
            os.path.abspath(os.path.join(base_dir, prerequisite)),
        )
        if time is None:
            return {
                "needs_rebuild": True,
                "reason": "missing-prerequisite",
                "prerequisite": prerequisite,
            }
        if time > target_time:
            return {
                "needs_rebuild": True,
                "reason": "newer-prerequisite",
                "prerequisite": prerequisite,
            }
    return {"needs_rebuild": False, "reason": "up-to-date"}


async def ensure_directory_async(directory: str) -> None:
    await asyncio.to_thread(os.makedirs, directory, exist_ok=True)


async def ensure_parent_directory_async(
    file_path: str,
) -> None:
    await ensure_directory_async(os.path.dirname(file_path) or ".")


async def touch_file_async(
    file_path: str,
    time: datetime | None = None,
) -> None:
    """Creates a missing file without truncating existing contents. Parent must exist."""
    if time is None:
        time = datetime.now()
    timestamp = time.timestamp()
    fd = await asyncio.to_thread(
        os.open, file_path, os.O_WRONLY | os.O_APPEND | os.O_CREAT
    )
    try:
        await asyncio.to_thread(os.utime, file_path, (timestamp, timestamp))
    finally:
        await asyncio.to_thread(os.close, fd)


def touch_file_sync(file_path: str, time: datetime | None = None) -> None:
    if time is None:
        time = datetime.now()
    timestamp = time.timestamp()
    fd = os.open(file_path, os.O_WRONLY | os.O_APPEND | os.O_CREAT)

    try:
        os.utime(file_path, (timestamp, timestamp))
    finally:
        os.close(fd)


def _read_bytes(file_path: str) -> bytes:
    with open(file_path, "rb") as file:
        return file.read()


def _write_bytes(file_path: str, content: bytes) -> None:
    with open(file_path, "wb") as file:
        file.write(content)


async def write_file_if_changed_async(
    file_path: str,
    content: str | bytes,
) -> bool:
    """Preserves mtime if generated contents have not changed. Returns true on write.
    Parent must exist. Writes are not atomic; serialize writers for the same path.
    """
    next = content.encode("utf-8") if isinstance(content, str) else bytes(content)
    try:
        if await asyncio.to_thread(_read_bytes, file_path) == next:
            return False
    except Exception as error:
        if not _is_missing_path(error):
            raise
    await asyncio.to_thread(_write_bytes, file_path, next)
    return True


async def remove_file_if_exists_async(
    file_path: str,
) -> bool:
    """Unlinks a file or symlink, never recursively removes a directory."""
    try:
        await asyncio.to_thread(os.unlink, file_path)
        return True
    except Exception as error:
        if _is_missing_path(error):
            return False
        raise


async def find_file_in_directories_async(
    file_name: str,
    directories: Sequence[str],
    base_dir: str | None = None,
) -> str | None:
    """Searches directories in order, useful for prerequisite lookup via VPATH.
    This only performs filesystem lookup, not make pattern/rule resolution.
    """
    if base_dir is None:
        base_dir = os.getcwd()
    if os.path.isabs(file_name):
        return os.path.normpath(file_name) if await is_file_async(file_name) else None
    for directory in directories:
        candidate = os.path.abspath(os.path.join(base_dir, directory, file_name))
        if await is_file_async(candidate):
            return candidate
    return None
