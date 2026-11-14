import unittest

from test.resolution.support import (
    cleanup,
    environment,
    evaluate,
    evaluation_state,
    fixture,
)
from type.cbuild_exception import CbuildException, MachineCode


class IncludeGuardCleanupAndRetriesTest(unittest.TestCase):
    """include guard cleanup and retries using the identical state"""

    def tearDown(self) -> None:
        cleanup()

    def test_propagates_evaluation_errors_cleans_the_guard_and_permits_retry(
        self,
    ) -> None:
        for directive in ["include", "-include", "sinclude"]:
            with self.subTest(directive=directive):
                disk = fixture()
                disk.cwd()
                disk.write("part.mk", "BROKEN := $(error evaluation-failed)\n")
                env = environment()
                state = evaluation_state()
                outer = disk.path("outer.mk")
                state.include_guard.append(outer)
                source = f"{directive} part.mk\n"
                with self.assertRaises(CbuildException) as context:
                    evaluate(source, env, state)
                self.assertEqual(context.exception.machine_code, MachineCode.ERROR_FN)
                self.assertEqual(state.include_guard, [outer])
                # Repair only a file created by this test. Reuse both state and environment.
                disk.write("part.mk", "RECOVERED := yes\nrecovered:\n")
                retried = evaluate(source, env, state)
                self.assertIs(retried.state, state)
                self.assertIs(retried.env, env)
                self.assertEqual(state.include_guard, [outer])
                self.assertEqual(env.require_raw_variable("RECOVERED"), "yes")
                self.assertEqual(
                    [rule.target for rule in retried.rules], ["recovered"]
                )

    def test_nested_evaluator_errors_unwind_every_active_include_before_retry(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("a.mk", "include b.mk\nafter-a:\n")
        disk.write("b.mk", "include c.mk\nafter-b:\n")
        disk.write("c.mk", "FAIL := $(error nested-failure)\n")
        env = environment()
        state = evaluation_state()
        with self.assertRaises(CbuildException) as context:
            evaluate("include a.mk\n", env, state)
        self.assertEqual(context.exception.machine_code, MachineCode.ERROR_FN)
        self.assertEqual(state.include_guard, [])
        disk.write("c.mk", "leaf:\n")
        retried = evaluate("include a.mk\n", env, state)
        self.assertIs(retried.state, state)
        self.assertEqual(
            [rule.target for rule in retried.rules], ["leaf", "after-b", "after-a"]
        )
        self.assertEqual(len({rule.uuid for rule in retried.rules}), 3)
        self.assertEqual(state.include_guard, [])

    def test_a_rejected_circular_include_can_be_repaired_and_retried_on_the_same_state(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("a.mk", "include b.mk\n")
        disk.write("b.mk", "include a.mk\n")
        env = environment()
        state = evaluation_state()
        with self.assertRaises(CbuildException) as context:
            evaluate("include a.mk\n", env, state)
        self.assertEqual(
            context.exception.machine_code, MachineCode.CIRCULAR_INCLUDE
        )
        self.assertEqual(state.include_guard, [])
        disk.write("b.mk", "repaired:\n")
        retried = evaluate("include a.mk\n", env, state)
        self.assertIs(retried.state, state)
        self.assertEqual([rule.target for rule in retried.rules], ["repaired"])
        self.assertEqual(state.include_guard, [])


if __name__ == "__main__":
    unittest.main()
