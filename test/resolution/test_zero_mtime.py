import unittest
from unittest import mock

from cbuild_backend.execution.preq_resolution import out_of_date
from cbuild_backend.execution.preq_resolution.out_of_date import OutOfDateChecker
from cbuild_backend.execution.preq_resolution.type import (
    PathOrigin,
    PreqResolution,
    TargetResolution,
)
from test.resolution.support import cleanup, environment, fixture

cases = [
    {
        "label": "equal zero timestamps are current",
        "target_time": 0,
        "preq_time": 0,
        "stale": False,
    },
    {
        "label": "zero prerequisite is older than a positive target",
        "target_time": 1,
        "preq_time": 0,
        "stale": False,
    },
    {
        "label": "positive prerequisite is newer than a zero target",
        "target_time": 0,
        "preq_time": 1,
        "stale": True,
    },
    {
        "label": "equal positive timestamps are current (control)",
        "target_time": 1,
        "preq_time": 1,
        "stale": False,
    },
    {
        "label": "unknown target timestamp is stale",
        "target_time": None,
        "preq_time": 0,
        "stale": True,
    },
    {
        "label": "unknown prerequisite timestamp is stale",
        "target_time": 1,
        "preq_time": None,
        "stale": True,
    },
]


# The Python backend is synchronous, so the TypeScript sync/async matrix
# collapses into a single run of the same contracts.
class NanosecondFreshnessContractsTest(unittest.TestCase):
    """nanosecond freshness contracts"""

    def tearDown(self) -> None:
        cleanup()

    def test_cases(self) -> None:
        for case in cases:
            with self.subTest(case["label"]):
                target_time = case["target_time"]
                preq_time = case["preq_time"]
                stale = case["stale"]
                disk = fixture()
                target_path = disk.write("app.o")
                preq_path = disk.write("app.c")
                timestamps: dict[str, int | None] = {
                    target_path: target_time,
                    preq_path: preq_time,
                }
                # Keep existence checks real; inject only exact nanosecond timestamps.
                timestamp = mock.patch.object(
                    out_of_date,
                    "get_modified_time_ns",
                    side_effect=lambda name: timestamps.get(name),
                ).start()
                resolved_target = TargetResolution(
                    target_name="app.o",
                    vpath_rules=[],
                    origin=PathOrigin(type="absolute", absolute_path=target_path),
                )
                prerequisite = PreqResolution(
                    preq_name="app.c",
                    vpath_rules=[],
                    origin=PathOrigin(type="absolute", absolute_path=preq_path),
                )
                checker = OutOfDateChecker(environment())
                preqs = [prerequisite]
                direct = checker.is_out_of_date(resolved_target, prerequisite)
                result = checker.resolve_out_of_date(resolved_target, preqs)
                self.assertEqual(direct, stale)
                self.assertEqual(result.is_target_out_of_date, stale)
                self.assertEqual(
                    result.out_of_date_preqs, [prerequisite] if stale else []
                )
                self.assertIs(result.resolved_target, resolved_target)
                self.assertIs(result.resolved_preqs, preqs)
                timestamp.assert_any_call(target_path)
                if target_time is not None and target_time != 0:
                    timestamp.assert_any_call(preq_path)
                mock.patch.stopall()

    def test_existing_target_with_zero_timestamp_and_no_prerequisites_is_current(
        self,
    ) -> None:
        disk = fixture()
        absolute_path = disk.write("leaf")
        mock.patch.object(out_of_date, "get_modified_time_ns", return_value=0).start()
        resolved = TargetResolution(
            target_name="leaf",
            vpath_rules=[],
            origin=PathOrigin(type="absolute", absolute_path=absolute_path),
        )
        checker = OutOfDateChecker(environment())
        self.assertEqual(checker.is_out_of_date(resolved, []), False)


if __name__ == "__main__":
    unittest.main()
