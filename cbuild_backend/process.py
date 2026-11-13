import asyncio
import os
import re
import signal as signal_module
import subprocess
import sys
from collections.abc import Callable, Mapping, Sequence
from dataclasses import dataclass
from typing import Any, Literal, NotRequired, TypedDict, cast

from cbuild_backend.os import get_os_info
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class ShellOptions(TypedDict):
    # Executable path only, without arguments.
    executable: str
    # Arguments placed before the complete, unmodified command string.
    args: Sequence[str]


class ProcessOptions(TypedDict, total=False):
    shell: ShellOptions
    cwd: str
    # Overrides inherited environment variables; None removes a variable.
    env: Mapping[str, str | None]
    output: Literal["inherit", "capture"]
    signal: asyncio.Event
    # Accept nonzero exit codes; launch errors and cancellation still reject.
    ignore_errors: bool


@dataclass
class ProcessResult:
    command: str
    exit_code: int | None
    signal: str | None
    # Empty when output is inherited. Capture mode buffers output in memory.
    stdout: str
    stderr: str


class RecipeOptions(ProcessOptions, total=False):
    silent: bool
    echo: Callable[[str], None]


# Explicit shell configuration also supports bash, PowerShell and custom shells.
def default_shell() -> ShellOptions:
    info = get_os_info()
    return (
        {
            "executable": os.environ.get("ComSpec") or "cmd.exe",
            "args": ["/d", "/s", "/c"],
        }
        if info["is_windows"]
        else {"executable": "/bin/sh", "args": ["-c"]}
    )


def _merge_env(*envs: Mapping[str, str | None] | None) -> dict[str, str]:
    merged: dict[str, str | None] = {}
    for env in envs:
        if env:
            merged.update(env)
    return {key: value for key, value in merged.items() if value is not None}


def _is_standard_cmd(shell: ShellOptions) -> bool:
    # Node handles the special quoting required by cmd.exe via shell mode.
    is_cmd = sys.platform == "win32" and bool(
        re.search(r"(?:^|[\\/])cmd(?:\.exe)?$", shell["executable"], re.IGNORECASE)
    )
    return is_cmd and " ".join(shell["args"]).lower() == "/d /s /c"


def _spawn_args(shell: ShellOptions, command: str) -> str | list[str]:
    if _is_standard_cmd(shell):
        # Same command line Node builds for `shell: cmd.exe` on Windows.
        return (
            f'{subprocess.list2cmdline([shell["executable"]])} /d /s /c "{command}"'
        )
    return [shell["executable"], *shell["args"], command]


def _windows_hide() -> dict[str, Any]:
    if sys.platform != "win32":
        return {}
    startupinfo = subprocess.STARTUPINFO()
    startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW
    startupinfo.wShowWindow = subprocess.SW_HIDE
    return {"startupinfo": startupinfo}


def _signal_name(return_code: int | None) -> str | None:
    if return_code is None or return_code >= 0 or sys.platform == "win32":
        return None
    try:
        return signal_module.Signals(-return_code).name
    except ValueError:
        return None


def _exit_code(return_code: int | None) -> int | None:
    return None if _signal_name(return_code) is not None else return_code


def _decode(data: bytes | None) -> str:
    return data.decode("utf-8", errors="replace") if data else ""


class ProcessRunner:
    def __init__(self, options: ProcessOptions | None = None) -> None:
        options = options or {}
        shell = options.get("shell") or default_shell()
        self._defaults: ProcessOptions = cast(
            ProcessOptions,
            {
                **options,
                "env": {**(options.get("env") or {})},
                "shell": {"executable": shell["executable"], "args": [*shell["args"]]},
            },
        )

    # Runs an already-expanded command. No variable expansion or prefix parsing.
    async def run_async(
        self,
        command: str,
        options: ProcessOptions | None = None,
    ) -> ProcessResult:
        options = options or {}
        settings = cast(ProcessOptions, {**self._defaults, **options})
        shell = settings.get("shell") or default_shell()
        abort_signal = settings.get("signal")
        if abort_signal is not None and abort_signal.is_set():
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_ABORTED,
                message="cbuild: Command cancelled before launch. Stop.",
            )
        if not shell["executable"].strip():
            raise TypeError("Shell executable must not be empty")
        capture = settings.get("output") == "capture"
        env = _merge_env(os.environ, self._defaults.get("env"), options.get("env"))

        failure: Exception | None = None
        stdout = b""
        stderr = b""
        try:
            child = subprocess.Popen(
                _spawn_args(shell, command),
                shell=False,
                cwd=settings.get("cwd"),
                env=env,
                stdin=subprocess.DEVNULL if capture else None,
                stdout=subprocess.PIPE if capture else None,
                stderr=subprocess.PIPE if capture else None,
                **_windows_hide(),
            )
        except Exception:
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_FAILED,
                message=f"cbuild: Could not start shell: {shell['executable']}. Stop. \n {{stdout: {_decode(stdout)}, stderr: {_decode(stderr)}}}",
            )

        communicate = asyncio.ensure_future(asyncio.to_thread(child.communicate))
        try:
            if abort_signal is not None:
                aborted = asyncio.ensure_future(abort_signal.wait())
                done, _ = await asyncio.wait(
                    {communicate, aborted},
                    return_when=asyncio.FIRST_COMPLETED,
                )
                if aborted in done and communicate not in done:
                    child.kill()
                    failure = Exception("The operation was aborted")
                aborted.cancel()
            stdout, stderr = await communicate
        except Exception as error:
            failure = error

        exit_code = _exit_code(child.returncode)
        signal = _signal_name(child.returncode)
        result = ProcessResult(
            command=command,
            exit_code=exit_code,
            signal=signal,
            stdout=_decode(stdout),
            stderr=_decode(stderr),
        )
        if failure:
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_FAILED,
                message=f"cbuild: Command could not complete: {command}: {failure}. Stop.",
            )
        elif signal is not None or (
            exit_code != 0 and not settings.get("ignore_errors")
        ):
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_FAILED,
                message=f"cbuild: Command failed ({signal if signal is not None else exit_code}): {command}. Stop. \n {{stdout: {result.stdout}, stderr: {result.stderr}}}",
            )
        return result

    def run_sync(
        self, command: str, options: ProcessOptions | None = None
    ) -> ProcessResult:
        options = options or {}
        settings = cast(ProcessOptions, {**self._defaults, **options})
        shell = settings.get("shell") or default_shell()

        abort_signal = settings.get("signal")
        if abort_signal is not None and abort_signal.is_set():
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_ABORTED,
                message="cbuild: Command cancelled before launch. Stop.",
            )

        if not shell["executable"].strip():
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.INVALID_SHELL_PATH,
                message="cbuild: Shell executable must not be empty. Stop.",
            )

        capture = settings.get("output") == "capture"
        env = _merge_env(os.environ, self._defaults.get("env"), options.get("env"))

        try:
            child = subprocess.run(
                _spawn_args(shell, command),
                shell=False,
                cwd=settings.get("cwd"),
                env=env,
                stdin=subprocess.DEVNULL if capture else None,
                stdout=subprocess.PIPE if capture else None,
                stderr=subprocess.PIPE if capture else None,
                **_windows_hide(),
            )
        except Exception:
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_FAILED,
                message=f"cbuild: Could not start shell: {shell['executable']}. Stop.",
            )

        exit_code = _exit_code(child.returncode)
        signal = _signal_name(child.returncode)
        result = ProcessResult(
            command=command,
            exit_code=exit_code,
            signal=signal,
            stdout=_decode(child.stdout),
            stderr=_decode(child.stderr),
        )

        if signal is not None or (
            exit_code != 0 and not settings.get("ignore_errors")
        ):
            raise CbuildException(
                column=-1,
                row=-1,
                error_type=ErrorType.PROCESS,
                machine_code=MachineCode.SHELL_COMMAND_FAILED,
                message=f"cbuild: Command failed ({signal if signal is not None else exit_code}): {command}. Stop. \n {{stdout: {result.stdout}, stderr: {result.stderr}}}",
            )

        return result
