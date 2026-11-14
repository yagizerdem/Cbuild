import unittest

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


class AutomaticValuesAndScopePrecedenceTest(unittest.TestCase):
    """A01-A15 automatic values and scope precedence"""

    def tearDown(self) -> None:
        cleanup()

    def _setup(self):
        disk = fixture()
        disk.cwd()
        disk.write("build/app.o", "target", NOW)
        disk.write("src/a.c", "old", OLD)
        disk.write("other/a.c", "new", NEW)
        disk.write("lib/b.c", "new", NEW)
        disk.write("stamp", "new-order-only", NEW)
        disk.write("cache", "cache", NEW)
        result = evaluate(
            "build/app.o: src/a.c other/a.c src/a.c lib/b.c other/a.c | stamp cache stamp\n"
        )
        rule = result.rules[0]
        return disk, result.env, result.rules, rule, automatic(result.rules, rule, result.env)

    def test_automatic_variable_preserves_the_correct_name_order_projection(
        self,
    ) -> None:
        for _id, name, expected in [
            ("A01", "@", "build/app.o"),
            ("A02", "@F", "app.o"),
            ("A03", "@D", "build"),
            ("A05", "<", "src/a.c"),
            ("A06", "^", "src/a.c other/a.c lib/b.c"),
            ("A07", "+", "src/a.c other/a.c src/a.c lib/b.c other/a.c"),
            ("A08", "?", "other/a.c lib/b.c"),
            ("A09", "|", "stamp cache"),
            ("A10", "^D", "src other lib"),
            ("A10/A11", "^F", "a.c a.c b.c"),
            ("A10", "+D", "src other src lib other"),
            ("A10", "+F", "a.c a.c a.c b.c a.c"),
            ("A10", "?D", "other lib"),
            ("A10", "?F", "a.c b.c"),
            ("A10", "<D", "src"),
            ("A10", "<F", "a.c"),
            ("A14", "%", ""),
        ]:
            with self.subTest(f"{_id} $({name})"):
                scope = self._setup()[4].scope
                self.assertEqual(expand(f"$({name})", scope), expected)
                self.assertEqual(expand(f"${{{name}}}", scope), expected)
                variable = scope.require_variable(name)
                self.assertEqual(variable.flavor, "raw")
                self.assertEqual(variable.origin, "automatic")
                self.assertEqual(variable.is_exported, False)

    def test_a04_target_without_a_directory_has_dot_as_at_d(self) -> None:
        disk = fixture()
        disk.cwd()
        result = evaluate("leaf:\n")
        self.assertEqual(
            expand(
                "$(@)|$(@D)|$(@F)",
                automatic(result.rules, result.rules[0], result.env).scope,
            ),
            "leaf|.|leaf",
        )

    def test_a11_stale_inputs_with_the_same_basename_preserve_duplicate_basenames_in_question_f(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("target", "target", NOW)
        disk.write("one/same.c", "one", NEW)
        disk.write("two/same.c", "two", NEW)
        result = evaluate("target: one/same.c two/same.c one/same.c\n")
        scope = automatic(result.rules, result.rules[0], result.env).scope
        self.assertEqual(expand("$(^F)|$(?F)", scope), "same.c same.c|same.c same.c")
        self.assertEqual(
            expand("$(^)|$(?)", scope),
            "one/same.c two/same.c|one/same.c two/same.c",
        )

    def test_a12_automatic_scope_shadows_parent_symbols_without_replacing_or_mutating_them(
        self,
    ) -> None:
        _, env, rules, rule, _ = self._setup()
        names = ["@", "<", "^", "+", "?", "|", "@D", "@F"]
        for name in names:
            env.set_raw_variable(name, f"parent-{name}", "command-line", True)
        before = [env.require_variable(name) for name in names]
        scope = automatic(rules, rule, env).scope
        self.assertEqual(expand("$(@)|$(<)", scope), "build/app.o|src/a.c")
        for index, name in enumerate(names):
            self.assertIs(env.require_variable(name), before[index])
            self.assertEqual(env.require_raw_variable(name), f"parent-{name}")
            self.assertEqual(scope.require_variable(name).origin, "automatic")

    def test_a13_automatic_target_specific_global_lookup_precedence(self) -> None:
        _, env, rules, rule, _ = self._setup()
        env.set_raw_variable("FLAGS", "global")
        env.set_raw_variable("SHARED", "shared")
        evaluate("build/app.o: FLAGS = local\n", env)
        env.target_envs[rule.target].set_raw_variable("@", "target-local")
        scope = automatic(rules, rule, env).scope
        self.assertIs(scope.enclosing, env.target_envs[rule.target])
        self.assertEqual(
            expand("$(@)|$(FLAGS)|$(SHARED)", scope), "build/app.o|local|shared"
        )
        self.assertEqual(
            env.target_envs[rule.target].require_raw_variable("@"), "target-local"
        )
        self.assertEqual(env.require_raw_variable("FLAGS"), "global")

    def test_a15_star_is_an_explicit_unsupported_limitation_in_a_fresh_automatic_environment(
        self,
    ) -> None:
        scope = self._setup()[4].scope
        self.assertEqual(scope.has_variable("*"), False)
        self.assertEqual(expand("$(*)", scope), "")


if __name__ == "__main__":
    unittest.main()
