import unittest

from cbuild_backend.execution.preq_resolution.out_of_date import OutOfDateChecker
from test.resolution.case_support import (
    NEW,
    NOW,
    OLD,
    automatic,
    cleanup,
    evaluate,
    expand,
    fixture,
)


# The Python backend is synchronous, so the TypeScript sync/async matrix
# collapses into a single run of the same contracts.
class FreshnessContractsTest(unittest.TestCase):
    """F01-F11 freshness contracts"""

    def tearDown(self) -> None:
        cleanup()

    def _setup(self, source: str, files: dict[str, int]):
        disk = fixture()
        disk.cwd()
        for name, timestamp in files.items():
            disk.write(name, name, timestamp)
        result = evaluate(source)
        rules, env = result.rules, result.env
        rule = rules[0]
        resolution = automatic(rules, rule, env)
        resolved_target, preqs = resolution.resolved_target, resolution.preqs

        def resolve():
            checker = OutOfDateChecker(env)
            return checker.resolve_out_of_date(resolved_target, preqs.first)

        return disk, env, rule, rules, preqs, resolved_target, resolve

    def test_f01_newer_order_only_prerequisite_is_resolved_without_marking_target_stale(
        self,
    ) -> None:
        _, _, _, _, preqs, _, resolve = self._setup(
            "target: source | stamp\n", {"target": NOW, "source": OLD, "stamp": NEW}
        )
        self.assertEqual([preq.preq_name for preq in preqs.second], ["stamp"])
        result = resolve()
        self.assertEqual(result.is_target_out_of_date, False)
        self.assertEqual(result.out_of_date_preqs, [])

    def test_f02_newer_normal_prerequisite_marks_target_stale(self) -> None:
        resolve = self._setup("target: source\n", {"target": NOW, "source": NEW})[6]
        self.assertEqual(resolve().is_target_out_of_date, True)

    def test_f03_f04_stale_duplicate_order_is_preserved_in_age_data_and_deduplicated_in_question_mark_variable(
        self,
    ) -> None:
        _, env, rule, rules, _, _, resolve = self._setup(
            "target: old a b a b\n", {"target": NOW, "old": OLD, "a": NEW, "b": NEW}
        )
        result = resolve()
        self.assertEqual(
            [preq.preq_name for preq in result.resolved_preqs],
            ["old", "a", "b", "a", "b"],
        )
        self.assertEqual(
            [preq.preq_name for preq in result.out_of_date_preqs],
            ["a", "b", "a", "b"],
        )
        self.assertEqual(expand("$(?)", automatic(rules, rule, env).scope), "a b")

    def test_f05_missing_target_plus_existing_prerequisite_is_stale(self) -> None:
        result = self._setup("missing: source\n", {"source": OLD})[6]()
        self.assertEqual(result.is_target_out_of_date, True)
        self.assertEqual(
            [preq.preq_name for preq in result.out_of_date_preqs], ["source"]
        )

    def test_f06_missing_target_with_no_prerequisite_is_stale(self) -> None:
        result = self._setup("missing:\n", {})[6]()
        self.assertEqual(result.is_target_out_of_date, True)
        self.assertEqual(result.out_of_date_preqs, [])

    def test_f07_existing_target_with_no_prerequisite_is_up_to_date(self) -> None:
        result = self._setup("target:\n", {"target": NOW})[6]()
        self.assertEqual(result.is_target_out_of_date, False)
        self.assertEqual(result.out_of_date_preqs, [])

    def test_f08_equal_timestamp_is_not_stale(self) -> None:
        result = self._setup("target: source\n", {"target": NOW, "source": NOW})[6]()
        self.assertEqual(result.is_target_out_of_date, False)

    def test_f09_old_flag_wins_over_new_flag_for_the_same_file(self) -> None:
        for old_flag in ["old_file", "assume_old"]:
            for new_flag in ["new_file", "assume_new", "what_if"]:
                with self.subTest(f"F09 {old_flag} wins over {new_flag}"):
                    _, env, _, _, _, _, resolve = self._setup(
                        "target: source\n", {"target": NOW, "source": NEW}
                    )
                    setattr(env.cli_options, old_flag, ["source"])
                    setattr(env.cli_options, new_flag, ["source"])
                    result = resolve()
                    self.assertEqual(result.is_target_out_of_date, False)
                    self.assertEqual(result.out_of_date_preqs, [])

    def test_f10_vpath_prerequisite_timestamp_determines_freshness(self) -> None:
        for mtime in [OLD, NEW]:
            with self.subTest(mtime=mtime):
                _, _, _, _, preqs, _, resolve = self._setup(
                    "vpath %.c sources\ntarget: input.c\n",
                    {"target": NOW, "sources/input.c": mtime},
                )
                self.assertEqual(preqs.first[0].origin.type, "vpath")
                self.assertEqual(resolve().is_target_out_of_date, mtime == NEW)

    def test_f11_target_resolved_from_vpath_uses_that_targets_timestamp(
        self,
    ) -> None:
        for mtime in [OLD, NEW]:
            with self.subTest(mtime=mtime):
                _, _, _, _, _, resolved_target, resolve = self._setup(
                    "vpath %.o objects\napp.o: source\n",
                    {"objects/app.o": mtime, "source": NOW},
                )
                self.assertEqual(resolved_target.origin.type, "vpath")
                self.assertEqual(resolve().is_target_out_of_date, mtime == OLD)


if __name__ == "__main__":
    unittest.main()
