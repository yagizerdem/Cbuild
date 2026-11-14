import json
import os
import sys
import threading
import unittest
from unittest import mock

from cbuild_backend.process import (
    ProcessOptions,
    ProcessResult,
    ProcessRunner,
    ShellOptions,
    default_shell,
)
from type.cbuild_exception import CbuildException, ErrorType, MachineCode

# Python's -c accepts a complete script as one argument on every supported OS.
PYTHON_SHELL: ShellOptions = {"executable": sys.executable, "args": ["-c"]}


class ProcessRunnerTest(unittest.TestCase):
    def _run(
        self,
        command: str,
        options: ProcessOptions | None = None,
        defaults: ProcessOptions | None = None,
    ) -> ProcessResult:
        runner = ProcessRunner(
            {"shell": PYTHON_SHELL, "output": "capture", **(defaults or {})}
        )
        return runner.run(command, options or {})

    def _assert_failure(
        self,
        error: CbuildException,
        machine_code: MachineCode = MachineCode.SHELL_COMMAND_FAILED,
    ) -> None:
        self.assertEqual(error.error_type, ErrorType.PROCESS)
        self.assertEqual(error.machine_code, machine_code)
        self.assertEqual(error.row, -1)
        self.assertEqual(error.column, -1)

    def test_captures_stdout_and_stderr_separately_and_preserves_the_command(
        self,
    ) -> None:
        command = (
            'import sys; sys.stdout.buffer.write("hello 世界".encode()); '
            'sys.stderr.write("warning")'
        )
        self.assertEqual(
            self._run(command),
            ProcessResult(
                command=command,
                exit_code=0,
                signal=None,
                stdout="hello 世界",
                stderr="warning",
            ),
        )

    def test_returns_empty_output_for_a_command_that_writes_nothing(self) -> None:
        result = self._run("")
        self.assertEqual(result.exit_code, 0)
        self.assertEqual(result.stdout, "")
        self.assertEqual(result.stderr, "")

    def test_collects_multiple_output_chunks(self) -> None:
        result = self._run(
            'import sys, time; sys.stdout.write("first"); sys.stdout.flush(); '
            'time.sleep(0.01); sys.stdout.write("second")'
        )
        self.assertEqual(result.stdout, "firstsecond")
        self.assertEqual(result.exit_code, 0)

    def test_rejects_nonzero_exit_codes_with_process_diagnostics(self) -> None:
        with self.assertRaises(CbuildException) as context:
            self._run("raise SystemExit(7)")
        self._assert_failure(context.exception)
        self.assertIn("(7)", context.exception.message)

    def test_returns_captured_output_and_nonzero_status_when_errors_are_ignored(
        self,
    ) -> None:
        result = self._run(
            'import sys; sys.stderr.write("failed"); raise SystemExit(7)',
            {"ignore_errors": True},
        )
        self.assertEqual(result.exit_code, 7)
        self.assertEqual(result.stderr, "failed")

    def test_per_call_options_override_default_error_handling(self) -> None:
        with self.assertRaises(CbuildException) as context:
            self._run(
                "raise SystemExit(7)",
                {"ignore_errors": False},
                {"ignore_errors": True},
            )
        self._assert_failure(context.exception)

    def test_merges_inherited_default_and_per_call_environment_values(self) -> None:
        command = (
            "import json, os; print(json.dumps([os.environ.get(name) for name in "
            '("CBUILD_PROCESS_INHERITED", "CBUILD_PROCESS_DEFAULT", '
            '"CBUILD_PROCESS_OVERRIDE")]))'
        )
        with mock.patch.dict(os.environ, {"CBUILD_PROCESS_INHERITED": "parent"}):
            result = self._run(
                command,
                {"env": {"CBUILD_PROCESS_OVERRIDE": "call"}},
                {
                    "env": {
                        "CBUILD_PROCESS_DEFAULT": "default",
                        "CBUILD_PROCESS_OVERRIDE": "default",
                    }
                },
            )
        self.assertEqual(json.loads(result.stdout), ["parent", "default", "call"])

    def test_none_environment_overrides_remove_inherited_and_default_values(
        self,
    ) -> None:
        with mock.patch.dict(os.environ, {"CBUILD_PROCESS_REMOVED": "parent"}):
            result = self._run(
                'import os, sys; sys.stdout.write(str(os.environ.get("CBUILD_PROCESS_REMOVED")))',
                {"env": {"CBUILD_PROCESS_REMOVED": None}},
                {"env": {"CBUILD_PROCESS_REMOVED": "default"}},
            )
        self.assertEqual(result.stdout, "None")

    def test_uses_the_requested_working_directory(self) -> None:
        cwd = os.path.dirname(os.path.abspath(__file__))
        result = self._run(
            "import os, sys; sys.stdout.write(os.getcwd())",
            {"cwd": cwd},
            {"cwd": os.getcwd()},
        )
        self.assertEqual(result.stdout.lower(), cwd.lower())

    def test_rejects_an_invalid_working_directory_even_when_errors_are_ignored(
        self,
    ) -> None:
        with self.assertRaises(CbuildException) as context:
            self._run(
                "",
                {
                    "cwd": f"{os.getcwd()}/__cbuild_missing_directory__",
                    "ignore_errors": True,
                },
            )
        self._assert_failure(context.exception)

    def test_rejects_missing_executables_even_when_errors_are_ignored(self) -> None:
        with self.assertRaises(CbuildException) as context:
            self._run(
                "",
                {
                    "shell": {"executable": "__cbuild_missing_shell__", "args": []},
                    "ignore_errors": True,
                },
            )
        self._assert_failure(context.exception)

    def test_rejects_cancellation_before_launching_the_command(self) -> None:
        event = threading.Event()
        event.set()
        with self.assertRaises(CbuildException) as context:
            self._run("raise SystemExit(7)", {"signal": event, "ignore_errors": True})
        self.assertEqual(context.exception.error_type, ErrorType.PROCESS)
        self.assertEqual(
            context.exception.machine_code, MachineCode.SHELL_COMMAND_ABORTED
        )

    def test_inherit_mode_does_not_return_captured_output(self) -> None:
        result = self._run("", {"output": "inherit"})
        self.assertEqual(result.stdout, "")
        self.assertEqual(result.stderr, "")
        self.assertEqual(result.exit_code, 0)

    def test_constructor_snapshots_shell_arguments_and_environment_defaults(
        self,
    ) -> None:
        args = ["-c"]
        shell: ShellOptions = {"executable": sys.executable, "args": args}
        env = {"CBUILD_PROCESS_SNAPSHOT": "original"}
        runner = ProcessRunner({"shell": shell, "env": env, "output": "capture"})
        args[0] = "--invalid-option"
        env["CBUILD_PROCESS_SNAPSHOT"] = "changed"
        result = runner.run(
            'import os, sys; sys.stdout.write(os.environ["CBUILD_PROCESS_SNAPSHOT"])'
        )
        self.assertEqual(result.stdout, "original")


class ShellValidationAndDefaultShellTest(unittest.TestCase):
    def test_selects_the_platform_shell(self) -> None:
        if sys.platform == "win32":
            with mock.patch.dict(os.environ, {"ComSpec": "C:\\custom\\cmd.exe"}):
                self.assertEqual(
                    default_shell(),
                    {"executable": "C:\\custom\\cmd.exe", "args": ["/d", "/s", "/c"]},
                )
            with mock.patch.dict(os.environ, {"ComSpec": ""}):
                self.assertEqual(default_shell()["executable"], "cmd.exe")
        else:
            self.assertEqual(
                default_shell(), {"executable": "/bin/sh", "args": ["-c"]}
            )

    def test_executes_a_command_through_the_default_shell(self) -> None:
        runner = ProcessRunner({"output": "capture"})
        self.assertEqual(
            runner.run("echo cbuild-process-test").stdout.strip(),
            "cbuild-process-test",
        )

    def test_rejects_an_empty_executable_with_invalid_shell_path(self) -> None:
        with self.assertRaises(CbuildException) as context:
            ProcessRunner({"shell": {"executable": "  ", "args": []}}).run("")
        self.assertEqual(context.exception.machine_code, MachineCode.INVALID_SHELL_PATH)


if __name__ == "__main__":
    unittest.main()
