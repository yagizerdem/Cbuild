from test.build.support import OLD, BuildTestCase, command, fixture


class _IncrementalRebuilds:
    # Holder keeps the shared base out of unittest discovery.
    class Base(BuildTestCase):
        """incremental rebuilds"""

        flags: list[str]

        def test_only_the_changed_branch_and_its_consumer_rebuild_repeated_unchanged_builds_do_nothing(
            self,
        ) -> None:
            disk = fixture()
            disk.write("left.src", "left-v1", OLD)
            disk.write("right.src", "right-v1", OLD)
            disk.buildfile(
                f"bundle.txt: left.txt right.txt\n\t{command('join "$@" left.txt right.txt')}\n"
                + f"left.txt: left.src\n\t{command('upper "$@" "$<"')}\n"
                + f"right.txt: right.src\n\t{command('upper "$@" "$<"')}\n",
            )
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("bundle.txt"), "LEFT-V1|RIGHT-V1")
            disk.time("left.txt", OLD + 20)
            disk.time("right.txt", OLD + 20)
            disk.time("bundle.txt", OLD + 40)
            untouched_time = disk.mtime("right.txt")
            baseline = len(disk.completed())
            disk.write("left.src", "left-v2", OLD + 60)
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed()[baseline:], ["left.txt", "bundle.txt"])
            self.assertEqual(disk.read("bundle.txt"), "LEFT-V2|RIGHT-V1")
            self.assertEqual(disk.mtime("right.txt"), untouched_time)
            for _ in range(3):
                self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed()[baseline:], ["left.txt", "bundle.txt"])
            self.assertEqual(disk.read("bundle.txt"), "LEFT-V2|RIGHT-V1")

        def test_deleting_an_intermediate_rebuilds_it_before_rebuilding_its_consumer(
            self,
        ) -> None:
            disk = fixture()
            disk.write("source.txt", "source", OLD)
            disk.buildfile(
                f"final.txt: mid.txt\n\t{command('copy "$@" "$<"')}\n"
                + f"mid.txt: source.txt\n\t{command('upper "$@" "$<"')}\n",
            )
            self.successful(disk.run(self.flags))
            disk.time("final.txt", OLD + 20)
            disk.remove("mid.txt")
            baseline = len(disk.completed())
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed()[baseline:], ["mid.txt", "final.txt"])
            self.assertEqual(disk.read("mid.txt"), "SOURCE")
            self.assertEqual(disk.read("final.txt"), "SOURCE")

        def test_deleting_only_the_final_artifact_reruns_only_its_recipe(
            self,
        ) -> None:
            disk = fixture()
            disk.write("source.txt", "data", OLD)
            disk.buildfile(
                f"final.txt: mid.txt\n\t{command('copy "$@" "$<"')}\n"
                + f"mid.txt: source.txt\n\t{command('upper "$@" "$<"')}\n",
            )
            self.successful(disk.run(self.flags))
            time = disk.mtime("mid.txt")
            disk.remove("final.txt")
            baseline = len(disk.completed())
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed()[baseline:], ["final.txt"])
            self.assertEqual(disk.mtime("mid.txt"), time)
            self.assertEqual(disk.read("final.txt"), "DATA")

        def test_equal_timestamps_skip_the_recipe_a_strictly_newer_input_rebuilds_an_older_input_does_not(
            self,
        ) -> None:
            disk = fixture()
            disk.write("source.txt", "equal", OLD)
            disk.write("output.txt", "equal", OLD)
            disk.buildfile(f"output.txt: source.txt\n\t{command('copy "$@" "$<"')}\n")
            self.assertEqual(disk.mtime("source.txt"), disk.mtime("output.txt"))
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.events(), [])
            disk.write("source.txt", "newer", OLD + 10)
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("output.txt"), "newer")
            self.assertEqual(disk.completed(), ["output.txt"])
            disk.write("source.txt", "older-content", OLD - 10)
            time = disk.mtime("output.txt")
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.read("output.txt"), "newer")
            self.assertEqual(disk.mtime("output.txt"), time)
            self.assertEqual(disk.completed(), ["output.txt"])

        def test_a_missing_order_only_artifact_rebuilds_without_rebuilding_a_current_consumer(
            self,
        ) -> None:
            disk = fixture()
            disk.write("source.txt", "data", OLD)
            disk.buildfile(
                f"output.txt: source.txt | ready.stamp\n\t{command('copy "$@" "$<"')}\n"
                + f"ready.stamp:\n\t{command('write "$@" ready')}\n",
            )
            self.successful(disk.run(self.flags))
            time = disk.mtime("output.txt")
            disk.remove("ready.stamp")
            baseline = len(disk.completed())
            self.successful(disk.run(self.flags))
            self.assertEqual(disk.completed()[baseline:], ["ready.stamp"])
            self.assertEqual(disk.mtime("output.txt"), time)
            self.assertEqual(disk.read("output.txt"), "data")
            self.assertEqual(disk.read("ready.stamp"), "ready")


class IncrementalRebuildsSequentialTest(_IncrementalRebuilds.Base):
    """incremental rebuilds: sequential"""

    flags = ["--sequential"]


class IncrementalRebuildsOneJobTest(_IncrementalRebuilds.Base):
    """incremental rebuilds: parallel scheduler, one job"""

    flags = ["-j", "1"]


class IncrementalRebuildsThreeJobsTest(_IncrementalRebuilds.Base):
    """incremental rebuilds: parallel scheduler, three jobs"""

    flags = ["-j", "3"]


class CliFreshnessControlsTest(BuildTestCase):
    """CLI freshness controls"""

    def test_what_if_rebuilds_without_modifying_the_input_file(self) -> None:
        disk = fixture()
        disk.write("source.txt", "source", OLD)
        disk.write("output.txt", "obsolete", OLD + 20)
        disk.buildfile(f"output.txt: source.txt\n\t{command('copy "$@" "$<"')}\n")
        input_time = disk.mtime("source.txt")
        self.successful(disk.run(["--sequential", "--what-if", "source.txt"]))
        self.assertEqual(disk.read("output.txt"), "source")
        self.assertEqual(disk.mtime("source.txt"), input_time)
        self.assertEqual(disk.completed(), ["output.txt"])

    def test_old_file_prevents_a_newer_input_from_triggering_a_rebuild(self) -> None:
        disk = fixture()
        disk.write("source.txt", "new", OLD + 20)
        disk.write("output.txt", "kept", OLD)
        disk.buildfile(f"output.txt: source.txt\n\t{command('copy "$@" "$<"')}\n")
        self.successful(disk.run(["--sequential", "--old-file", "source.txt"]))
        self.assertEqual(disk.read("output.txt"), "kept")
        self.assertEqual(disk.events(), [])

    def test_touch_creates_the_target_without_executing_its_recipe_or_truncating_it_later(
        self,
    ) -> None:
        disk = fixture()
        disk.write("source.txt", "source", OLD)
        disk.buildfile(f"output.txt: source.txt\n\t{command('copy "$@" "$<"')}\n")
        self.successful(disk.run(["--sequential", "--touch"]))
        self.assertEqual(disk.read("output.txt"), "")
        self.assertEqual(disk.events(), [])
        disk.write("output.txt", "preserve", OLD)
        time = disk.mtime("output.txt")
        disk.time("source.txt", OLD + 20)
        self.successful(disk.run(["--sequential", "--touch"]))
        self.assertEqual(disk.read("output.txt"), "preserve")
        self.assertGreater(disk.mtime("output.txt"), time)
        self.assertEqual(disk.events(), [])
