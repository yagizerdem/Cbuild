import json
import re
import time as _time
import unittest

from test.build.rebuild_cases import (
    CliFreshnessControlsTest,
    IncrementalRebuildsOneJobTest,
    IncrementalRebuildsSequentialTest,
    IncrementalRebuildsThreeJobsTest,
)
from test.build.shell_cases import (
    NonExecutingModesAndPreExecutionErrorsTest,
    RealShellExecutionAndProcessBoundariesTest,
)
from test.build.support import OLD, BuildTestCase, command, fixture


class _RealCliBuildPipeline:
    # Holder keeps the shared base out of unittest discovery.
    class Base(BuildTestCase):
        """real CLI build pipeline"""

        flags: list[str]

        def test_reads_a_disk_buildfile_and_builds_a_dependency_chain_in_order(
            self,
        ) -> None:
            disk = fixture()
            disk.write("input.txt", "hello 世界\n", OLD)
            disk.buildfile(
                f"final.txt: middle.txt\n\t{command('copy "$@" "$<"')}\n"
                + f"middle.txt: input.txt\n\t{command('upper "$@" "$<"')}\n",
            )
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("middle.txt"), "HELLO 世界\n")
            self.assertEqual(disk.read("final.txt"), "HELLO 世界\n")
            self.assertEqual(disk.completed(), ["middle.txt", "final.txt"])
            self.assertEqual(
                [[event["event"], event["target"]] for event in disk.events()],
                [
                    ["start", "middle.txt"],
                    ["end", "middle.txt"],
                    ["start", "final.txt"],
                    ["end", "final.txt"],
                ],
            )
            self.assertEqual(
                all(event["cwd"] == disk.root for event in disk.events()), True
            )
            times = [disk.mtime("middle.txt"), disk.mtime("final.txt")]
            for _ in range(3):
                self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed(), ["middle.txt", "final.txt"])
            self.assertEqual(
                [disk.mtime("middle.txt"), disk.mtime("final.txt")], times
            )
            self.assertEqual(disk.read("final.txt"), "HELLO 世界\n")

        def test_a_diamond_builds_its_shared_input_once_and_waits_for_both_branches(
            self,
        ) -> None:
            disk = fixture()
            disk.write("seed.txt", "seed", OLD)
            disk.buildfile(
                f"bundle.txt: left.txt right.txt\n\t{command('join "$@" left.txt right.txt')}\n"
                + f"left.txt: shared.txt\n\t{command('copy "$@" "$<"')}\n"
                + f"right.txt: shared.txt\n\t{command('upper "$@" "$<"')}\n"
                + f"shared.txt: seed.txt\n\t{command('copy "$@" "$<"')}\n",
            )
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("bundle.txt"), "seed|SEED")
            events = disk.events()
            self.assertEqual(
                len([name for name in disk.completed() if name == "shared.txt"]), 1
            )
            for name in ["left.txt", "right.txt"]:
                self.assertLess(
                    self.index(events, "end", "shared.txt"),
                    self.index(events, "start", name),
                )
                self.assertLess(
                    self.index(events, "end", name),
                    self.index(events, "start", "bundle.txt"),
                )
            self.assertEqual(len(disk.completed()), 4)

        def test_included_assignments_conditionals_and_an_implicit_recipe_produce_real_files(
            self,
        ) -> None:
            disk = fixture()
            disk.write("app.src", "source-v1", OLD)
            disk.write(
                "rules.mk",
                "MODE = release\n"
                + f"%.obj: %.src\nifeq ($(MODE),release)\n\t{command('upper "$@" "$<"')}\nelse\n"
                + f"\t{command('write "$@" incorrect-debug-branch')}\nendif\n",
            )
            disk.buildfile(
                "include rules.mk\n"
                + f"result.txt: app.obj\n\t{command('copy "$@" "$<"')}\n",
            )
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("app.obj"), "SOURCE-V1")
            self.assertEqual(disk.read("result.txt"), "SOURCE-V1")
            self.assertEqual(disk.completed(), ["app.obj", "result.txt"])
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed(), ["app.obj", "result.txt"])

        def test_order_only_prerequisites_finish_before_recipe_and_never_enter_the_normal_input_list(
            self,
        ) -> None:
            disk = fixture()
            disk.write("input.txt", "input", OLD)
            disk.buildfile(
                f"result.json: input.txt input.txt | prepare.stamp\n\t{command('inspect "$@" "$<" "$^" "$+" "$|" "$?"')}\n"
                + f"prepare.stamp:\n\t{command('write "$@" ready')}\n",
            )
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed(), ["prepare.stamp", "result.json"])
            self.assertEqual(
                json.loads(disk.read("result.json"))["args"],
                [
                    "input.txt",
                    "input.txt",
                    "input.txt input.txt",
                    "prepare.stamp",
                    "input.txt",
                ],
            )
            time = disk.mtime("result.json")
            disk.time("prepare.stamp", int(_time.time()) + 100)
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed(), ["prepare.stamp", "result.json"])
            self.assertEqual(disk.mtime("result.json"), time)

        def test_a_failed_recipe_stops_later_recipe_lines_and_blocks_consumers(
            self,
        ) -> None:
            disk = fixture()
            disk.buildfile(
                f"final.txt: failed.txt\n\t{command('write "$@" must-not-run')}\n"
                + f"failed.txt:\n\t{command('fail "$@" 7')}\n\t{command('write "$@" must-not-run')}\n",
            )
            result = disk.run(self.flags)
            self.assertNotEqual(result.code, 0)
            self.assertRegex(result.stderr, re.compile(r"failed|7", re.IGNORECASE))
            self.assertEqual(disk.exists("final.txt"), False)
            self.assertEqual(disk.exists("failed.txt"), False)
            self.assertEqual(
                [[event["event"], event["target"]] for event in disk.events()],
                [["start", "failed.txt"], ["failure", "failed.txt"]],
            )
            # Repair a failed recipe and rerun a fresh CLI process using the same files.
            disk.buildfile(
                f"final.txt: failed.txt\n\t{command('copy "$@" "$<"')}\n"
                + f"failed.txt:\n\t{command('write "$@" recovered')}\n",
            )
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("final.txt"), "recovered")
            self.assertEqual(disk.completed(), ["failed.txt", "final.txt"])


class RealCliBuildPipelineSequentialTest(_RealCliBuildPipeline.Base):
    """real CLI build pipeline: sequential"""

    flags = ["--sequential"]


class RealCliBuildPipelineOneJobTest(_RealCliBuildPipeline.Base):
    """real CLI build pipeline: parallel scheduler, one job"""

    flags = ["-j", "1"]


class RealCliBuildPipelineThreeJobsTest(_RealCliBuildPipeline.Base):
    """real CLI build pipeline: parallel scheduler, three jobs"""

    flags = ["-j", "3"]


class CliEntryPathsAndRunnableArtifactsTest(BuildTestCase):
    """CLI entry, paths and runnable artifacts"""

    def test_f_and_c_read_a_custom_buildfile_and_execute_inside_a_directory_with_spaces(
        self,
    ) -> None:
        disk = fixture()
        disk.write("project with spaces/input.txt", "quoted-content", OLD)
        disk.write("project with spaces/actions.py", disk.read("actions.py"))
        disk.buildfile(
            f"output.txt: input.txt\n\t{command('copy "$@" "$<"')}\n",
            "project with spaces/custom.mk",
        )
        self.successful(
            disk.run(
                [
                    "--sequential",
                    "-C",
                    "project with spaces",
                    "-f",
                    "custom.mk",
                ]
            )
        )
        self.assertEqual(disk.read("project with spaces/output.txt"), "quoted-content")
        event = json.loads(
            disk.read("project with spaces/execution.jsonl").split("\n")[0]
        )
        self.assertEqual(event["cwd"], disk.path("project with spaces"))
        self.assertEqual(disk.exists("output.txt"), False)

    def test_builds_a_python_artifact_then_runs_it_through_a_real_redirected_shell_command(
        self,
    ) -> None:
        disk = fixture()
        disk.write(
            "program.src",
            'import sys\nsys.stdout.write("built-program:42")\n',
            OLD,
        )
        disk.buildfile(
            'result.txt: program.py\n\t"$(PYTHON)" program.py > result.txt\n'
            + f"\t{command('inspect execution-proof.json "$@"')}\n"
            + f"program.py: program.src\n\t{command('copy "$@" "$<"')}\n",
        )
        self.successful(disk.run())
        self.assertEqual(disk.read("program.py"), disk.read("program.src"))
        self.assertEqual(disk.read("result.txt"), "built-program:42")
        self.assertEqual(disk.completed(), ["program.py", "execution-proof.json"])
        standalone = disk.run_python("program.py")
        self.successful(standalone)
        self.assertEqual(standalone.stdout, "built-program:42")
        self.successful(disk.run())
        self.assertEqual(disk.completed(), ["program.py", "execution-proof.json"])

    def test_unreachable_targets_do_not_execute_when_building_the_default_goal(
        self,
    ) -> None:
        disk = fixture()
        disk.buildfile(
            f"wanted.txt:\n\t{command('write "$@" wanted')}\n"
            + f"unrelated.txt:\n\t{command('write "$@" must-not-run')}\n",
        )
        self.successful(disk.run(["-j", "3"]))
        self.assertEqual(disk.read("wanted.txt"), "wanted")
        self.assertEqual(disk.exists("unrelated.txt"), False)
        self.assertEqual(disk.completed(), ["wanted.txt"])


if __name__ == "__main__":
    unittest.main()
