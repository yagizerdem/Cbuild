import json
import re

from test.build.support import MODES, OLD, BuildTestCase, command, fixture


class RealShellExecutionAndProcessBoundariesTest(BuildTestCase):
    """real shell execution and process boundaries"""

    def test_preserves_the_order_of_multiple_commands_in_one_recipe(self) -> None:
        for mode in MODES:
            with self.subTest(mode["name"]):
                disk = fixture()
                disk.buildfile(
                    f"output.txt:\n\t{command('write "$@" first')}\n"
                    + f"\t{command('append "$@" -second')}\n\t{command('append "$@" -third')}\n",
                )
                self.successful(disk.run(mode["flags"]))
                self.assertEqual(disk.read("output.txt"), "first-second-third")
                self.assertEqual(
                    [[event["event"], event["action"]] for event in disk.events()],
                    [
                        ["start", "write"],
                        ["end", "write"],
                        ["start", "append"],
                        ["end", "append"],
                        ["start", "append"],
                        ["end", "append"],
                    ],
                )
                self.successful(disk.run(mode["flags"]))
                self.assertEqual(len(disk.completed()), 3)
                self.assertEqual(disk.read("output.txt"), "first-second-third")

    def test_shell_and_executes_the_second_command_only_after_the_first_succeeds(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(
            f"output.txt:\n\t{command('write first.txt first')} && {command('copy "$@" first.txt')}\n",
        )
        self.successful(disk.run())
        self.assertEqual(disk.read("output.txt"), "first")
        self.assertEqual(disk.completed(), ["first.txt", "output.txt"])
        events = disk.events()
        self.assertEqual((events[1]["event"], events[1]["target"]), ("end", "first.txt"))
        self.assertEqual(
            (events[2]["event"], events[2]["target"]), ("start", "output.txt")
        )

    def test_shell_and_skips_the_second_command_when_the_first_fails(self) -> None:
        disk = fixture()
        disk.buildfile(
            f"output.txt:\n\t{command('fail failed-step 13')} && {command('write "$@" forbidden')}\n",
        )
        result = disk.run()
        self.assertNotEqual(result.code, 0)
        self.assertEqual(disk.exists("output.txt"), False)
        self.assertEqual(
            [event["target"] for event in disk.events()],
            ["failed-step", "failed-step"],
        )

    def test_quotes_preserve_spaces_and_unicode_inside_recipe_arguments(self) -> None:
        disk = fixture()
        disk.buildfile(
            f"output.txt:\n\t{command('write "$@" "hello world — merhaba 世界"')}\n",
        )
        self.successful(disk.run())
        self.assertEqual(disk.read("output.txt"), "hello world — merhaba 世界")
        self.assertEqual(disk.events()[0]["args"], ["hello world — merhaba 世界"])

    def test_exported_variables_reach_the_child_process_and_private_build_variables_do_not(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(
            "BASE = expanded\nexport CBUILD_E2E_EXPORTED = $(BASE)-value\n"
            + "CBUILD_E2E_PRIVATE = must-not-export\n"
            + f"output.json:\n\t{command('inspect "$@"')}\n",
        )
        self.successful(disk.run())
        self.assertEqual(
            json.loads(disk.read("output.json")),
            {
                "args": [],
                "cwd": disk.root,
                "exported": "expanded-value",
                "private": None,
            },
        )
        self.assertEqual(disk.completed(), ["output.json"])

    def test_captured_stdout_and_stderr_are_forwarded_while_the_artifact_is_produced(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(f"output.txt:\n\t{command('stream "$@"')}\n")
        result = disk.run()
        self.successful(result)
        self.assertIn("STDOUT_SENTINEL", result.stdout)
        self.assertIn("STDERR_SENTINEL", result.stderr)
        self.assertEqual(disk.read("output.txt"), "stream-complete")
        self.assertEqual(disk.completed(), ["output.txt"])

    def test_j_2_actually_overlaps_independent_jobs_and_waits_before_consuming_their_outputs(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(
            f"bundle.txt: left.txt right.txt\n\t{command('join "$@" left.txt right.txt')}\n"
            + f"left.txt:\n\t{command('overlap "$@" right.txt')}\n"
            + f"right.txt:\n\t{command('overlap "$@" left.txt')}\n",
        )
        self.successful(disk.run(["-j", "2"]))
        self.assertEqual(disk.read("bundle.txt"), "left.txt|right.txt")
        events = disk.events()
        self.assertLess(
            self.index(events, "start", "left.txt"),
            self.index(events, "end", "right.txt"),
        )
        self.assertLess(
            self.index(events, "start", "right.txt"),
            self.index(events, "end", "left.txt"),
        )
        self.assertLess(
            self.index(events, "end", "left.txt"),
            self.index(events, "start", "bundle.txt"),
        )
        self.assertLess(
            self.index(events, "end", "right.txt"),
            self.index(events, "start", "bundle.txt"),
        )
        self.assertEqual(len(disk.completed()), 3)

    def test_keep_going_finishes_an_independent_branch_blocks_failed_consumers_and_returns_failure(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(
            f"all.txt: bad.txt good.txt\n\t{command('join "$@" bad.txt good.txt')}\n"
            + f"good.txt:\n\t{command('write "$@" independent-success')}\n"
            + f"bad.txt:\n\t{command('fail "$@" 7')}\n",
        )
        result = disk.run(["-j", "1", "--keep-going"])
        self.assertNotEqual(result.code, 0)
        self.assertEqual(disk.read("good.txt"), "independent-success")
        self.assertEqual(disk.exists("bad.txt"), False)
        self.assertEqual(disk.exists("all.txt"), False)
        self.assertEqual(disk.completed(), ["good.txt"])
        self.assertEqual(
            [
                event["target"]
                for event in disk.events()
                if event["event"] == "failure"
            ],
            ["bad.txt"],
        )

    def test_ignore_errors_continues_to_the_next_recipe_line_after_a_nonzero_shell_exit(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(
            f"output.txt:\n\t{command('fail ignored-step 7')}\n\t{command('write "$@" recovered')}\n",
        )
        result = disk.run(["--sequential", "--ignore-errors"])
        # Soft expectations: keep checking after the first mismatch.
        with self.subTest("exit code"):
            self.assertEqual(result.code, 0, result.stderr)
        with self.subTest("output exists"):
            self.assertEqual(disk.exists("output.txt"), True)
        if disk.exists("output.txt"):
            self.assertEqual(disk.read("output.txt"), "recovered")
        self.assertEqual(disk.completed(), ["output.txt"])


class NonExecutingModesAndPreExecutionErrorsTest(BuildTestCase):
    """non-executing modes and pre-execution errors"""

    def test_prints_recipes_without_creating_files_or_starting_recipe_programs(
        self,
    ) -> None:
        for flag in ["--dry-run", "--just-print", "--recon"]:
            with self.subTest(flag=flag):
                disk = fixture()
                disk.write("source.txt", "source", OLD)
                disk.buildfile(
                    f"output.txt: source.txt\n\t{command('copy "$@" "$<"')}\n",
                )
                result = disk.run(["--sequential", flag])
                self.successful(result)
                self.assertIn("actions.py", result.stdout)
                self.assertEqual(disk.exists("output.txt"), False)
                self.assertEqual(disk.events(), [])

    def test_question_reports_stale_current_status_without_executing_any_recipe(
        self,
    ) -> None:
        disk = fixture()
        disk.write("source.txt", "source", OLD)
        disk.buildfile(f"output.txt: source.txt\n\t{command('copy "$@" "$<"')}\n")
        stale = disk.run(["--sequential", "--question"])
        self.assertEqual(stale.code, 1)
        self.assertEqual(disk.exists("output.txt"), False)
        self.assertEqual(disk.events(), [])
        disk.write("output.txt", "source", OLD + 20)
        current = disk.run(["--sequential", "--question"])
        self.assertEqual(current.code, 0)
        self.assertEqual(disk.events(), [])
        self.assertEqual(disk.read("output.txt"), "source")

    def test_fails_before_recipe_execution(self) -> None:
        for case in [
            {
                "label": "missing prerequisite",
                "diagnostic": r"No rule to make target.*missing\.txt",
                "source": f"output.txt: missing.txt\n\t{command('write "$@" forbidden')}\n",
            },
            {
                "label": "dependency cycle",
                "diagnostic": r"circular|cycle",
                "source": f"output.txt: other.txt\n\t{command('write "$@" forbidden')}\nother.txt: output.txt\n",
            },
            {
                "label": "mandatory missing include",
                "diagnostic": r"include file not found",
                "source": f"include missing.mk\noutput.txt:\n\t{command('write "$@" forbidden')}\n",
            },
            {
                "label": "compile error",
                "diagnostic": r"missing separator|syntax|mismatched|extraneous",
                "source": "this is not a valid rule or assignment\n",
            },
        ]:
            with self.subTest(case["label"]):
                disk = fixture()
                disk.buildfile(case["source"])
                result = disk.run()
                self.assertNotEqual(result.code, 0)
                self.assertRegex(
                    result.stderr, re.compile(case["diagnostic"], re.IGNORECASE)
                )
                self.assertEqual(disk.exists("output.txt"), False)
                self.assertEqual(disk.events(), [])

    def test_a_missing_buildfile_returns_failure_without_executing_any_command(
        self,
    ) -> None:
        disk = fixture()
        result = disk.run()
        self.assertNotEqual(result.code, 0)
        self.assertRegex(
            result.stderr, re.compile(r"no makefile|no targets", re.IGNORECASE)
        )
        self.assertEqual(disk.events(), [])
