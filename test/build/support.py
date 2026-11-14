import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import unittest
from dataclasses import dataclass
from typing import Any, TypedDict

_test_root = os.path.dirname(os.path.abspath(__file__))
_repo_root = os.path.abspath(os.path.join(_test_root, "..", ".."))
_fixtures: set[str] = set()
_cli_entry: str | None = None


@dataclass
class ProcessResult:
    code: int | None
    stdout: str
    stderr: str


class Event(TypedDict):
    event: str
    action: str
    target: str
    args: list[str]
    cwd: str
    pid: int


def _checked(root: str, filename: str) -> str:
    absolute = os.path.abspath(os.path.join(root, filename))
    relative = os.path.relpath(absolute, root)
    if (
        relative == ".."
        or relative.startswith(f"..{os.sep}")
        or os.path.isabs(relative)
    ):
        raise Exception("Path escapes test/build fixture")
    return absolute


def _execute(
    args: list[str],
    cwd: str,
    env: dict[str, str | None] | None = None,
    timeout: float = 15,
) -> ProcessResult:
    merged: dict[str, str | None] = {**os.environ, **(env or {})}
    try:
        completed = subprocess.run(
            [sys.executable, *args],
            cwd=cwd,
            env={key: value for key, value in merged.items() if value is not None},
            stdin=subprocess.DEVNULL,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
            timeout=timeout,
        )
    except subprocess.TimeoutExpired as error:
        raise Exception(
            f"Child process timed out: {args[0]}\n{error.stdout}\n{error.stderr}"
        ) from error
    return ProcessResult(completed.returncode, completed.stdout, completed.stderr)


def prepare_runtime() -> None:
    # Python runs main.py from the source tree directly; there is nothing to
    # compile, so only check once that the CLI can start.
    global _cli_entry
    if _cli_entry is not None:
        return
    entry = os.path.join(_repo_root, "main.py")
    if not os.path.exists(entry):
        raise Exception("CLI entry is missing")
    smoke = _execute([entry, "--version"], _test_root)
    if smoke.code != 0 or "CBuild" not in smoke.stdout:
        raise Exception(f"CLI cannot start\n{smoke.stdout}\n{smoke.stderr}")
    _cli_entry = entry


def _remove_created_directory(root: str, prefix: str) -> None:
    absolute = _checked(_test_root, root)
    if not os.path.basename(absolute).startswith(prefix):
        raise Exception("Refusing to remove a non-test directory")
    shutil.rmtree(absolute, ignore_errors=True)


def cleanup_fixtures() -> None:
    for root in list(_fixtures):
        _remove_created_directory(root, ".fixture-")
        _fixtures.discard(root)


OLD = int(time.time()) - 10000
MODES = [
    {"name": "sequential", "flags": ["--sequential"]},
    {"name": "parallel scheduler, one job", "flags": ["-j", "1"]},
    {"name": "parallel scheduler, three jobs", "flags": ["-j", "3"]},
]
HEADER = "PYTHON = $(CBUILD_E2E_PYTHON)\n"


def command(args: str) -> str:
    return f'"$(PYTHON)" actions.py {args}'


class Fixture:
    def __init__(self, root: str) -> None:
        self.root = root

    def path(self, name: str) -> str:
        return _checked(self.root, name)

    def write(self, name: str, content: str, time: int | None = None) -> None:
        filename = self.path(name)
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        with open(filename, "w", encoding="utf-8", newline="") as file:
            file.write(content)
        if time is not None:
            os.utime(filename, (time, time))

    def buildfile(self, source: str, name: str = "CBuildfile") -> None:
        self.write(name, HEADER + source)

    def read(self, name: str) -> str:
        with open(self.path(name), encoding="utf-8", newline="") as file:
            return file.read()

    def exists(self, name: str) -> bool:
        return os.path.exists(self.path(name))

    def remove(self, name: str) -> None:
        os.remove(self.path(name))

    def time(self, name: str, value: int) -> None:
        os.utime(self.path(name), (value, value))

    def mtime(self, name: str) -> int:
        return os.stat(self.path(name)).st_mtime_ns

    def events(self) -> list[Event]:
        if not self.exists("execution.jsonl"):
            return []
        return [
            json.loads(line)
            for line in self.read("execution.jsonl").strip().split("\n")
            if line
        ]

    def completed(self) -> list[str]:
        return [event["target"] for event in self.events() if event["event"] == "end"]

    def run(
        self,
        flags: list[str] | None = None,
        args: list[str] | None = None,
        cwd: str | None = None,
        env: dict[str, str | None] | None = None,
    ) -> ProcessResult:
        if _cli_entry is None:
            raise Exception("prepare_runtime must complete before a build")
        return _execute(
            [_cli_entry, *(["--sequential"] if flags is None else flags), *(args or [])],
            cwd if cwd is not None else self.root,
            {
                "DEV_MODE": None,
                "CBUILD_E2E_EXPORTED": None,
                "CBUILD_E2E_PRIVATE": None,
                "CBUILD_E2E_PYTHON": sys.executable,
                **(env or {}),
            },
        )

    def run_python(self, name: str) -> ProcessResult:
        return _execute([self.path(name)], self.root)


def fixture() -> Fixture:
    root = tempfile.mkdtemp(prefix=".fixture-", dir=_test_root)
    _fixtures.add(root)
    shutil.copyfile(
        os.path.join(_test_root, "actions.py"), _checked(root, "actions.py")
    )
    return Fixture(root)


class BuildTestCase(unittest.TestCase):
    """Shared runtime preparation and fixture cleanup for the build suites."""

    @classmethod
    def setUpClass(cls) -> None:
        prepare_runtime()

    def tearDown(self) -> None:
        cleanup_fixtures()

    def successful(self, result: ProcessResult) -> None:
        if result.code != 0:
            self.fail(
                f"cbuild exited {result.code}\nstdout:\n{result.stdout}\nstderr:\n{result.stderr}"
            )

    def index(self, events: list[Event], kind: str, target: str) -> int:
        return next(
            (
                index
                for index, event in enumerate(events)
                if event["event"] == kind and event["target"] == target
            ),
            -1,
        )


def parse(content: str) -> Any:
    return json.loads(content)
