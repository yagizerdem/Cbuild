import unittest

from core.frontend import compile, parse_build_file
from preprocessor.preprocessor import p_char_buffer_to_string, preprocess


class CompileFrontendTest(unittest.TestCase):
    def test_simple_hello_world(self) -> None:
        build_file = """\
hello:
\t echo "Hello, World"
"""

        processed = p_char_buffer_to_string(preprocess(build_file))
        ir = compile(parse_build_file(processed))


if __name__ == "__main__":
    unittest.main()
