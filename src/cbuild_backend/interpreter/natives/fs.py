import base64
import os
import shutil
import stat as stat_module
import tempfile
from types import MappingProxyType
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from cbuild_backend.interpreter.interpreter import LuaEngine

# Node BufferEncoding names mapped to Python codecs.
_ENCODINGS = {
    "utf8": "utf-8",
    "utf-8": "utf-8",
    "ascii": "ascii",
    "latin1": "latin-1",
    "binary": "latin-1",
    "utf16le": "utf-16-le",
    "utf-16le": "utf-16-le",
    "ucs2": "utf-16-le",
    "ucs-2": "utf-16-le",
}


def _decode(data: bytes, encoding: str) -> str:
    if encoding == "base64":
        return base64.b64encode(data).decode("ascii")
    if encoding == "hex":
        return data.hex()
    return data.decode(_ENCODINGS[encoding.lower()], errors="replace")


def _encode(data: str, encoding: str) -> bytes:
    if encoding == "base64":
        return base64.b64decode(data)
    if encoding == "hex":
        return bytes.fromhex(data)
    return data.encode(_ENCODINGS[encoding.lower()])


def _stats(result: os.stat_result) -> dict[str, Any]:
    # Same field names as Node's fs.Stats.
    return {
        "dev": result.st_dev,
        "ino": result.st_ino,
        "mode": result.st_mode,
        "nlink": result.st_nlink,
        "uid": result.st_uid,
        "gid": result.st_gid,
        "rdev": getattr(result, "st_rdev", 0),
        "size": result.st_size,
        "blksize": getattr(result, "st_blksize", None),
        "blocks": getattr(result, "st_blocks", None),
        "atimeMs": result.st_atime_ns / 1_000_000,
        "mtimeMs": result.st_mtime_ns / 1_000_000,
        "ctimeMs": result.st_ctime_ns / 1_000_000,
        "birthtimeMs": getattr(result, "st_birthtime", result.st_ctime) * 1000,
    }


def exists(path: str) -> bool:
    return os.path.exists(path)


def read_file(path: str, encoding: str = "utf8") -> str:
    with open(path, "rb") as file:
        return _decode(file.read(), encoding)


def write_file(
    path: str,
    data: str,
    encoding: str = "utf8",
) -> None:
    with open(path, "wb") as file:
        file.write(_encode(data, encoding))


def append_file(
    path: str,
    data: str,
    encoding: str = "utf8",
) -> None:
    with open(path, "ab") as file:
        file.write(_encode(data, encoding))


def readdir(path: str) -> list[str]:
    return os.listdir(path)


def mkdir(path: str, recursive: bool = False) -> str | None:
    if not recursive:
        os.mkdir(path)
        return None

    # Node returns the first directory created, or undefined if none was.
    first_created: str | None = None
    current = os.path.abspath(path)
    while not os.path.exists(current):
        first_created = current
        parent = os.path.dirname(current)
        if parent == current:
            break
        current = parent
    os.makedirs(path, exist_ok=True)
    return first_created


def mkdtemp(prefix: str) -> str:
    directory = os.path.dirname(prefix)
    created = tempfile.mkdtemp(prefix=os.path.basename(prefix), dir=directory or ".")
    return os.path.join(directory, os.path.basename(created))


def rmdir(path: str) -> None:
    os.rmdir(path)


def rm(path: str, recursive: bool = False, force: bool = False) -> None:
    try:
        if os.path.isdir(path) and not os.path.islink(path):
            if not recursive:
                raise IsADirectoryError(f"Path is a directory: {path}")
            shutil.rmtree(path)
        else:
            os.remove(path)
    except FileNotFoundError:
        if not force:
            raise


def unlink(path: str) -> None:
    os.unlink(path)


def rename(old_path: str, new_path: str) -> None:
    os.replace(old_path, new_path)


def copy_file(source: str, destination: str) -> None:
    shutil.copyfile(source, destination)


def stat(path: str) -> dict[str, Any]:
    return _stats(os.stat(path))


def lstat(path: str) -> dict[str, Any]:
    return _stats(os.lstat(path))


def is_file(path: str) -> bool:
    return stat_module.S_ISREG(os.stat(path).st_mode)


def is_directory(path: str) -> bool:
    return stat_module.S_ISDIR(os.stat(path).st_mode)


def realpath(path: str) -> str:
    return os.path.realpath(path, strict=True)


def readlink(path: str) -> str:
    return os.readlink(path)


def truncate(path: str, length: int = 0) -> None:
    os.truncate(path, length)


def chmod(path: str, mode: int) -> None:
    os.chmod(path, mode)


def register(engine: LuaEngine) -> None:
    fs_module = MappingProxyType(
        {
            "exists": exists,
            "readFile": read_file,
            "writeFile": write_file,
            "appendFile": append_file,
            "readdir": readdir,
            "mkdir": mkdir,
            "mkdtemp": mkdtemp,
            "rmdir": rmdir,
            "rm": rm,
            "unlink": unlink,
            "rename": rename,
            "copyFile": copy_file,
            "stat": stat,
            "lstat": lstat,
            "isFile": is_file,
            "isDirectory": is_directory,
            "realpath": realpath,
            "readlink": readlink,
            "truncate": truncate,
            "chmod": chmod,
        }
    )

    # fs namespace
    engine.global_.set("fs", {**fs_module})
