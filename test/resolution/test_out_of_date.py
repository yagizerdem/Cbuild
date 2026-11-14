import os
import unittest

from cbuild_backend.execution.preq_resolution.out_of_date import OutOfDateChecker
from cbuild_backend.execution.preq_resolution.preq_resolver import PreqResolver
from cbuild_backend.execution.preq_resolution.target_resolver import TargetResolver
from cbuild_backend.execution.preq_resolution.type import PreqResolution
from test.resolution.helpers import cleanup_fixtures, environment, evaluate, fixture
from type.cbuild_exception import CbuildException, MachineCode

# Whole seconds with a large separation avoid sleeps and filesystem precision races.
OLD = 1_700_000_000
TARGET = OLD + 100
NEW = TARGET + 100


# The Python backend is synchronous, so the TypeScript sync/async matrix
# collapses into a single run of the same contracts.
class OutOfDateTest(unittest.TestCase):
    """out-of-date"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def _setup(self, source_time: int = OLD):
        disk = fixture()
        disk.use_as_cwd()
        disk.write("app.o", "output", TARGET)
        disk.write("app.c", "source", source_time)
        env = environment()
        checker = OutOfDateChecker(env)
        target_resolver = TargetResolver([], [])
        preq_resolver = PreqResolver([], [])
        target = target_resolver.resolve("app.o")
        source = preq_resolver.resolve("app.c")

        def check(preqs: list[PreqResolution] | None = None) -> bool:
            return checker.is_out_of_date(target, [source] if preqs is None else preqs)

        def resolve(preqs: list[PreqResolution] | None = None):
            return checker.resolve_out_of_date(
                target, [source] if preqs is None else preqs
            )

        return disk, env, checker, target, source, target_resolver, preq_resolver, check, resolve

    def test_source_mtime_produces_stale(self) -> None:
        for mtime, expected in [(OLD, False), (TARGET, False), (NEW, True)]:
            with self.subTest(f"source mtime {mtime} produces stale={expected}"):
                check = self._setup(mtime)[7]
                self.assertEqual(check(), expected)

    def test_an_existing_target_with_no_prerequisites_is_up_to_date(self) -> None:
        setup = self._setup()
        check, resolve = setup[7], setup[8]
        self.assertEqual(check([]), False)
        self.assertEqual(resolve([]).is_target_out_of_date, False)

    def test_a_deleted_target_is_stale_even_after_an_earlier_successful_resolution(
        self,
    ) -> None:
        setup = self._setup()
        disk, check = setup[0], setup[7]
        os.remove(disk.path("app.o"))
        self.assertEqual(check(), True)

    def test_a_missing_target_is_stale_even_when_it_has_no_inputs(self) -> None:
        setup = self._setup()
        checker, target_resolver = setup[2], setup[5]
        target = target_resolver.resolve("missing.o")
        result = checker.resolve_out_of_date(target, [])
        self.assertEqual(result.is_target_out_of_date, True)
        self.assertEqual(result.out_of_date_preqs, [])

    def test_a_prerequisite_disappearing_after_resolution_is_an_error(self) -> None:
        setup = self._setup()
        disk, check = setup[0], setup[7]
        os.remove(disk.path("app.c"))
        with self.assertRaises(CbuildException) as context:
            check()
        self.assertEqual(context.exception.machine_code, MachineCode.DEPQ_NOT_FOUND)

    def test_not_found_prerequisite_origins_reject_against_an_existing_target(
        self,
    ) -> None:
        setup = self._setup()
        check, preq_resolver = setup[7], setup[6]
        with self.assertRaises(CbuildException) as context:
            check([preq_resolver.resolve("missing.c")])
        self.assertEqual(context.exception.machine_code, MachineCode.DEPQ_NOT_FOUND)

    def test_a_prerequisite_with_a_rule_but_no_file_marks_the_target_stale(
        self,
    ) -> None:
        setup = self._setup()
        target, checker = setup[3], setup[2]
        rules = evaluate("generated:\n").rules
        preq = PreqResolver(rules, []).resolve("generated")
        self.assertEqual(checker.is_out_of_date(target, preq), True)

    def test_forces_an_older_prerequisite_to_count_as_new(self) -> None:
        for flag in ["new_file", "assume_new", "what_if"]:
            with self.subTest(flag=flag):
                setup = self._setup()
                env, check = setup[1], setup[7]
                setattr(env.cli_options, flag, ["app.c"])
                self.assertEqual(check(), True)

    def test_suppresses_a_newer_prerequisite(self) -> None:
        for flag in ["old_file", "assume_old"]:
            with self.subTest(flag=flag):
                setup = self._setup(NEW)
                env, check = setup[1], setup[7]
                setattr(env.cli_options, flag, ["app.c"])
                self.assertEqual(check(), False)

    def test_unrelated_cli_file_flags_do_not_change_the_targets_age(self) -> None:
        setup = self._setup()
        env, check = setup[1], setup[7]
        env.cli_options.new_file = ["unrelated.c"]
        self.assertEqual(check(), False)

    def test_assume_old_takes_precedence_when_the_same_input_is_also_assume_new(
        self,
    ) -> None:
        setup = self._setup(NEW)
        env, check = setup[1], setup[7]
        env.cli_options.old_file = ["app.c"]
        env.cli_options.new_file = ["app.c"]
        self.assertEqual(check(), False)

    def test_resolution_returns_only_newer_inputs_and_preserves_duplicate_input_order(
        self,
    ) -> None:
        disk, _, _, target, source, _, preq_resolver, _, resolve = self._setup()
        disk.write("new.c", "new", NEW)
        newer = preq_resolver.resolve("new.c")
        preqs = [source, newer, newer]
        result = resolve(preqs)
        self.assertIs(result.resolved_target, target)
        self.assertIs(result.resolved_preqs, preqs)
        self.assertEqual(result.out_of_date_preqs, [newer, newer])
        self.assertEqual(result.is_target_out_of_date, True)

    def test_missing_target_makes_every_resolved_normal_prerequisite_out_of_date(
        self,
    ) -> None:
        setup = self._setup()
        checker, source, target_resolver = setup[2], setup[4], setup[5]
        target = target_resolver.resolve("missing.o")
        result = checker.resolve_out_of_date(target, [source])
        self.assertEqual(result.out_of_date_preqs, [source])


if __name__ == "__main__":
    unittest.main()
