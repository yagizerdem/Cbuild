import math as _math
import sys
import unittest

from cbuild_backend.interpreter.interpreter import LuaEngine
from cbuild_backend.interpreter.natives import math
from cbuild_backend.interpreter.natives.math import register as register_math

_MAX_VALUE = sys.float_info.max


class NativeMathTest(unittest.TestCase):
    def test_aggregates_handle_empty_inputs_cancellation_and_large_means(
        self,
    ) -> None:
        self.assertEqual(math.sum(), 0)
        self.assertEqual(math.sum(1e16, 1, -1e16), 1)
        self.assertEqual(math.mean(_MAX_VALUE, _MAX_VALUE), _MAX_VALUE)
        with self.assertRaises(Exception):
            math.min()
        with self.assertRaises(Exception):
            math.max()
        with self.assertRaises(Exception):
            math.mean()

    def test_invalid_types_domains_and_overflow_produce_explicit_errors(
        self,
    ) -> None:
        # JavaScript RangeError maps to ValueError in the Python natives.
        with self.assertRaises(TypeError):
            math.abs("2")  # type: ignore[arg-type]
        with self.assertRaises(TypeError):
            math.sum(1, _math.nan)
        with self.assertRaises(ValueError):
            math.sqrt(-1)
        with self.assertRaises(ValueError):
            math.pow(10, 1000)
        with self.assertRaises(ValueError):
            math.log(1, 1)
        with self.assertRaises(ValueError):
            math.fmod(1, 0)
        with self.assertRaises(ValueError):
            math.clamp(1, 2, 0)
        with self.assertRaises(ValueError):
            math.round(1, 1.5)

    def test_rounding_signed_remainder_and_interpolation_have_explicit_semantics(
        self,
    ) -> None:
        self.assertEqual(math.round(-1.5), -2)
        self.assertEqual(math.round(1.25, 1), 1.3)
        self.assertEqual(math.fmod(-7, 3), -1)
        self.assertEqual(math.lerp(-_MAX_VALUE, _MAX_VALUE, 0.5), 0)
        self.assertEqual(math.lerp(10, 20, 2), 30)
        self.assertEqual(math.clamp(20, 0, 10), 10)

    def test_native_math_works_through_lua_with_standard_libraries_disabled(
        self,
    ) -> None:
        engine = LuaEngine()
        try:
            register_math(engine)
            self.assertEqual(
                engine.do_string("return math.sum(1, 2, math.pow(3, 2))"), 12
            )
            self.assertEqual(
                engine.do_string("return math.min(3, -1, 2) + math.max(3, -1, 2)"), 2
            )
            self.assertAlmostEqual(
                engine.do_string("return math.sin(math.rad(90))"), 1
            )
            self.assertAlmostEqual(engine.do_string("return math.log(8, 2)"), 3)
            self.assertAlmostEqual(
                engine.do_string("return math.atan(1, 0)"), _math.pi / 2
            )
            with self.assertRaises(Exception):
                engine.do_string('return math.sum(1, "2")')
            with self.assertRaises(Exception):
                engine.do_string("return math.sqrt(-1)")
        finally:
            engine.global_.close()


if __name__ == "__main__":
    unittest.main()
