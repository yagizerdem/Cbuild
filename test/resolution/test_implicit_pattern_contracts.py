import unittest

from cbuild_backend.depq_graph import get_target_subgraph, topological_sort
from test.resolution.case_support import (
    ImplicitResolution,
    automatic,
    cleanup,
    commands,
    environment,
    expand,
    fixture,
    implicit,
    target,
)


class ImplicitCandidateAndChainContractsTest(unittest.TestCase):
    """P01-P12 implicit candidate and chain contracts"""

    def tearDown(self) -> None:
        cleanup()

    def _resolve(self, source: str, files: list[str] | None = None) -> ImplicitResolution:
        disk = fixture()
        disk.cwd()
        for name in files or []:
            disk.write(name)
        return implicit(source, disk.root)

    def test_p01_shorter_stem_is_preferred_among_applicable_candidates(self) -> None:
        result = self._resolve(
            "all: libapp.o\n%.o: %.c\n\techo general\nlib%.o: %.src\n\techo specific\n",
            ["libapp.c", "app.src"],
        )
        self.assertEqual(target(result.rules, "libapp.o").prerequisites, ["app.src"])
        self.assertEqual(
            commands(target(result.rules, "libapp.o"), result.env), ["echo specific"]
        )

    def test_p01_equal_specificity_follows_declaration_order(self) -> None:
        for reverse in [False, True]:
            with self.subTest(reverse=reverse):
                patterns = (
                    "%.o: %.cc\n\techo cc\n%.o: %.c\n\techo c\n"
                    if reverse
                    else "%.o: %.c\n\techo c\n%.o: %.cc\n\techo cc\n"
                )
                result = self._resolve(f"all: app.o\n{patterns}", ["app.c", "app.cc"])
                self.assertEqual(
                    commands(target(result.rules, "app.o"), result.env),
                    ["echo cc" if reverse else "echo c"],
                )

    def test_p02_missing_first_candidate_input_falls_back_to_the_next_candidate(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.missing\n\techo missing\n%.o: %.c\n\techo found\n",
            ["app.c"],
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])

    def test_p03_a_three_level_implicit_chain_commits_every_successful_intermediate(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.asm\n\techo object\n%.asm: %.ir\n\techo assembly\n%.ir: %.src\n\techo ir\n",
            ["app.src"],
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.asm"])
        self.assertEqual(target(rules, "app.asm").prerequisites, ["app.ir"])
        self.assertEqual(target(rules, "app.ir").prerequisites, ["app.src"])
        self.assertEqual(
            [
                rule.target
                for rule in topological_sort(get_target_subgraph(rules, "all"), rules[0])
            ],
            ["app.ir", "app.asm", "app.o", "all"],
        )

    def test_p04_a_cyclic_implicit_candidate_chain_is_rejected_without_partial_models(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.mid\n\techo object\n%.mid: %.last\n\techo middle\n%.last: %.o\n\techo last\n"
        ).rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_p05_explicit_recipe_takes_precedence_over_applicable_implicit_recipes(
        self,
    ) -> None:
        result = self._resolve(
            "app.o: explicit\n\techo explicit\nexplicit:\n%.o: %.c\n\techo implicit\n",
            ["app.c"],
        )
        self.assertEqual(target(result.rules, "app.o").prerequisites, ["explicit"])
        self.assertEqual(
            commands(target(result.rules, "app.o"), result.env), ["echo explicit"]
        )

    def test_p06_recipe_less_explicit_target_gains_recipe_while_preserving_its_inputs_and_uuid(
        self,
    ) -> None:
        result = self._resolve(
            "app.o: config.h | stamp\nconfig.h:\nstamp:\n%.o: %.c\n\techo compile\n",
            ["app.c"],
        )
        rule = target(result.rules, "app.o")
        self.assertEqual(rule.prerequisites, ["app.c", "config.h"])
        self.assertEqual(rule.order_only_prerequisites, ["stamp"])
        self.assertEqual(rule.uuid, target(result.original, "app.o").uuid)
        self.assertEqual(commands(rule, result.env), ["echo compile"])

    def test_p07_implicit_normal_input_beats_explicit_order_only_input(self) -> None:
        rules = self._resolve(
            "app.o: | app.c\n%.o: %.c\n\techo compile\n", ["app.c"]
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])
        self.assertEqual(target(rules, "app.o").order_only_prerequisites, [])

    def test_p08_explicit_normal_input_beats_implicit_order_only_input(self) -> None:
        rules = self._resolve(
            "app.o: cache\ncache:\n%.o: %.c | cache\n\techo compile\n", ["app.c"]
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c", "cache"])
        self.assertEqual(target(rules, "app.o").order_only_prerequisites, [])

    def test_p09_vpath_makes_an_implicit_prerequisite_candidate_applicable(
        self,
    ) -> None:
        rules = self._resolve(
            "vpath %.c sources\nall: app.o\n%.o: %.c\n\techo compile\n",
            ["sources/app.c"],
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])
        self.assertEqual(
            [rule.pattern for rule in target(rules, "app.o").vpath_rules], ["%.c"]
        )

    def test_p10_a_stem_containing_slashes_is_substituted_without_losing_its_directory(
        self,
    ) -> None:
        rules = self._resolve(
            "all: build/nested/app.o\nbuild/%.o: source/%.c\n\techo compile\n",
            ["source/nested/app.c"],
        ).rules
        self.assertEqual(target(rules, "build/nested/app.o").stem, "nested/app")
        self.assertEqual(
            target(rules, "build/nested/app.o").prerequisites, ["source/nested/app.c"]
        )

    def test_slash_free_pattern_restores_the_target_directory_to_prerequisite_substitution(
        self,
    ) -> None:
        rules = self._resolve(
            "all: nested/app.o\n%.o: %.c\n\techo compile\n", ["nested/app.c"]
        ).rules
        self.assertEqual(target(rules, "nested/app.o").prerequisites, ["nested/app.c"])

    def test_p11_escaped_percent_is_literal_while_a_later_percent_provides_the_stem(
        self,
    ) -> None:
        disk = fixture()
        disk.cwd()
        disk.write("app.c")
        env = environment()
        # Supply the escaped pattern through a variable, so this exercises pattern
        # expansion -> model classification -> implicit search, not lexer escaping.
        env.set_raw_variable("PATTERN", r"literal\%-%.o")
        rules = implicit(
            "all: literal%-app.o\n$(PATTERN): %.c\n\techo escaped\n", disk.root, env
        ).rules
        self.assertEqual(target(rules, "literal%-app.o").stem, "app")
        self.assertEqual(target(rules, "literal%-app.o").prerequisites, ["app.c"])

    def test_p12_current_limitation_implicit_star_automatic_variable_is_unsupported(
        self,
    ) -> None:
        result = self._resolve("all: app.o\n%.o: %.c\n\techo compile\n", ["app.c"])
        rule = target(result.rules, "app.o")
        self.assertEqual(rule.stem, "app")
        scope = automatic(result.rules, rule, result.env).scope
        self.assertEqual(scope.has_variable("*"), False)
        self.assertEqual(expand("$(*)", scope), "")


if __name__ == "__main__":
    unittest.main()
