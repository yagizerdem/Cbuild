import unittest
from dataclasses import dataclass

from cbuild_backend.depq_graph import get_target_subgraph, topological_sort
from cbuild_backend.implicit_rule_resolver import ImplicitRuleResolver
from cbuild_backend.model import NormalRule
from cbuild_backend.stem_resolver import StemResolver
from test.resolution.helpers import (
    Evaluation,
    Fixture,
    cleanup_fixtures,
    commands,
    evaluate,
    fixture,
    normalized,
    target,
)


class StemMatchingAndSubstitutionBoundariesTest(unittest.TestCase):
    """stem matching and substitution boundaries"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_pattern_matches_candidate_with_stem(self) -> None:
        for pattern, candidate, expected in [
            ("%.o", "app.o", "app"),
            ("src/%.o", "src/app.o", "app"),
            ("pre%suf", "preMIDsuf", "MID"),
            ("%.o", ".o", ""),
            ("%", "anything", "anything"),
            ("literal", "literal", ""),
            ("literal", "other", None),
            ("pre%suf", "presuf", ""),
            ("pre%suf", "pre", None),
            ("%.o", "app.c", None),
            ("ab%bc", "abc", None),
            ("%.o", "nested/app.o", "nested/app"),
            ("%-%", "one-%", "one"),
            ("\\%.o", "%.o", ""),
            ("\\%.o", "app.o", None),
            ("literal\\%-%", "literal%-name", "name"),
        ]:
            with self.subTest(f"pattern {pattern} matches {candidate} with stem {expected}"):
                resolver = StemResolver()
                self.assertEqual(resolver.resolve_stem(pattern, candidate), expected)
                self.assertEqual(resolver.match(pattern, candidate), expected is not None)

    def test_replaces_the_stem(self) -> None:
        for pattern, stem, expected in [
            ("%.c", "foo", "foo.c"),
            ("src/%.c", "foo", "src/foo.c"),
            ("fixed.h", "foo", "fixed.h"),
            ("%-%", "foo", "foo-%"),
            ("pre%suf", "", "presuf"),
        ]:
            with self.subTest(pattern=pattern):
                self.assertEqual(StemResolver().replace_stem(pattern, stem), expected)


@dataclass
class _Resolution(Evaluation):
    original: list[NormalRule]
    disk: Fixture


class ImplicitSearchUsingRealFilesTest(unittest.TestCase):
    """implicit search using real files and compiled rules"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def _resolve(self, source: str, files: list[str] | None = None) -> _Resolution:
        disk = fixture()
        for name in files or []:
            disk.write(name)
        result = normalized(source)
        rules = ImplicitRuleResolver(result.rules, result.patterns, disk.root).resolve()
        return _Resolution(
            result.env,
            result.irs,
            result.state,
            result.models,
            rules=rules,
            patterns=result.patterns,
            original=result.rules,
            disk=disk,
        )

    def test_creates_a_concrete_rule_with_substituted_inputs_and_copied_recipes(
        self,
    ) -> None:
        result = self._resolve(
            "all: app.o\n%.o: %.c | cache\n\techo compile\ncache:\n", ["app.c"]
        )
        object = target(result.rules, "app.o")
        self.assertEqual(object.prerequisites, ["app.c"])
        self.assertEqual(object.order_only_prerequisites, ["cache"])
        self.assertEqual(object.stem, "app")
        self.assertEqual(commands(object, result.env), ["echo compile"])
        self.assertEqual(result.rules[0].target, "all")

    def test_explicit_recipes_take_precedence_over_implicit_recipes(self) -> None:
        result = self._resolve(
            "all: app.o\napp.o: custom\n\techo explicit\ncustom:\n%.o: %.c\n\techo implicit\n",
            ["app.c"],
        )
        self.assertEqual(target(result.rules, "app.o").prerequisites, ["custom"])
        self.assertEqual(
            commands(target(result.rules, "app.o"), result.env), ["echo explicit"]
        )

    def test_recipe_less_explicit_target_gains_an_implicit_recipe_while_retaining_identity_and_inputs(
        self,
    ) -> None:
        result = self._resolve(
            "app.o: config.h | stamp\n%.o: %.c | cache\n\techo compile\nconfig.h:\nstamp:\ncache:\n",
            ["app.c"],
        )
        object = target(result.rules, "app.o")
        self.assertEqual(object.uuid, target(result.original, "app.o").uuid)
        self.assertEqual(object.prerequisites, ["app.c", "config.h"])
        self.assertEqual(object.order_only_prerequisites, ["cache", "stamp"])
        self.assertEqual(target(result.original, "app.o").recipe_irs, [])

    def test_normal_dependencies_remove_overlapping_implicit_order_only_dependencies(
        self,
    ) -> None:
        rules = self._resolve(
            "app.o: cache\n%.o: %.c | cache\n\techo compile\ncache:\n", ["app.c"]
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c", "cache"])
        self.assertEqual(target(rules, "app.o").order_only_prerequisites, [])

    def test_shorter_stem_pattern_wins_when_both_candidates_apply(self) -> None:
        result = self._resolve(
            "all: libfoo.o\n%.o: %.c\n\techo general\nlib%.o: %.c\n\techo specific\n",
            ["libfoo.c", "foo.c"],
        )
        self.assertEqual(target(result.rules, "libfoo.o").prerequisites, ["foo.c"])
        self.assertEqual(
            commands(target(result.rules, "libfoo.o"), result.env), ["echo specific"]
        )

    def test_equally_specific_applicable_candidates_preserve_declaration_order(
        self,
    ) -> None:
        result = self._resolve(
            "all: app.o\n%.o: %.c\n\techo first\n%.o: %.cc\n\techo second\n",
            ["app.c", "app.cc"],
        )
        self.assertEqual(
            commands(target(result.rules, "app.o"), result.env), ["echo first"]
        )

    def test_inapplicable_first_candidate_falls_back_to_a_later_candidate(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.missing\n\techo unavailable\n%.o: %.c\n\techo fallback\n",
            ["app.c"],
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])

    def test_directly_applicable_candidate_wins_before_a_more_specific_chained_candidate(
        self,
    ) -> None:
        result = self._resolve(
            "all: libfoo.o\nlib%.o: %.mid\n\techo chained\n%.o: %.c\n\techo direct\n%.mid: %.src\n\techo intermediate\n",
            ["foo.src", "libfoo.c"],
        )
        self.assertEqual(
            commands(target(result.rules, "libfoo.o"), result.env), ["echo direct"]
        )
        self.assertEqual(any(rule.target == "foo.mid" for rule in result.rules), False)

    def test_chained_patterns_add_intermediates_in_a_valid_dependency_graph(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.mid\n\techo object\n%.mid: %.src\n\techo intermediate\n",
            ["app.src"],
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.mid"])
        self.assertEqual(target(rules, "app.mid").prerequisites, ["app.src"])
        self.assertEqual(
            [
                rule.target
                for rule in topological_sort(get_target_subgraph(rules, "all"), rules[0])
            ],
            ["app.mid", "app.o", "all"],
        )

    def test_failed_candidate_does_not_leave_partial_intermediates_behind(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.mid %.missing\n\techo bad\n%.mid: %.src\n\techo intermediate\n%.o: %.c\n\techo good\n",
            ["app.src", "app.c"],
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])
        self.assertEqual(any(rule.target == "app.mid" for rule in rules), False)

    def test_shared_implicit_prerequisite_is_generated_once(self) -> None:
        rules = self._resolve(
            "all: left right\nleft: app.o\nright: app.o\n%.o: %.c\n\techo compile\n",
            ["app.c"],
        ).rules
        self.assertEqual(len([rule for rule in rules if rule.target == "app.o"]), 1)

    def test_missing_inputs_leave_the_target_unresolved_without_inventing_rules(
        self,
    ) -> None:
        rules = self._resolve("all: app.o\n%.o: %.missing\n\techo compile\n").rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_order_only_inputs_must_also_be_buildable_for_candidate_selection(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.c | missing\n\techo compile\n", ["app.c"]
        ).rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_explicit_prerequisite_rules_count_as_buildable_inputs_without_disk_files(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\napp.c:\n\techo generate\n%.o: %.c\n\techo compile\n"
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])

    def test_terminal_double_colon_pattern_does_not_chain_implicit_inputs(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o:: %.mid\n\techo terminal\n%.mid: %.src\n\techo intermediate\n",
            ["app.src"],
        ).rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_terminal_double_colon_pattern_accepts_inputs_already_on_disk(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o:: %.c\n\techo terminal\n", ["app.c"]
        ).rules
        self.assertEqual(target(rules, "app.o").prerequisites, ["app.c"])

    def test_implicit_cycles_terminate_without_generating_partial_graph_nodes(
        self,
    ) -> None:
        rules = self._resolve(
            "all: app.o\n%.o: %.mid\n\techo object\n%.mid: %.o\n\techo middle\n"
        ).rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_patterns_without_a_recipe_are_not_candidates(self) -> None:
        rules = self._resolve("all: app.o\n%.o: %.c\n", ["app.c"]).rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_an_empty_stem_is_not_eligible_for_implicit_rule_generation(
        self,
    ) -> None:
        rules = self._resolve("all: .o\n%.o: %.c\n\techo compile\n", [".c"]).rules
        self.assertEqual([rule.target for rule in rules], ["all"])

    def test_slash_free_target_pattern_restores_the_directory_on_substituted_prerequisites(
        self,
    ) -> None:
        rules = self._resolve(
            "all: obj/app.o\n%.o: %.c common.h\n\techo compile\n",
            ["obj/app.c", "common.h"],
        ).rules
        self.assertEqual(
            target(rules, "obj/app.o").prerequisites, ["obj/app.c", "common.h"]
        )
        self.assertEqual(target(rules, "obj/app.o").stem, "obj/app")

    def test_pattern_with_a_slash_matches_the_complete_target_path(self) -> None:
        rules = self._resolve(
            "all: obj/app.o\nobj/%.o: src/%.c\n\techo compile\n", ["src/app.c"]
        ).rules
        self.assertEqual(target(rules, "obj/app.o").prerequisites, ["src/app.c"])
        self.assertEqual(target(rules, "obj/app.o").stem, "app")

    def test_vpath_files_make_an_otherwise_missing_implicit_input_applicable(
        self,
    ) -> None:
        disk = fixture()
        disk.write("sources/app.c")
        result = normalized("vpath %.c sources\nall: app.o\n%.o: %.c\n\techo compile\n")
        resolved = ImplicitRuleResolver(result.rules, result.patterns, disk.root).resolve()
        self.assertEqual(target(resolved, "app.o").prerequisites, ["app.c"])
        self.assertEqual(target(resolved, "app.o").vpath_rules[0].pattern, "%.c")

    def test_specific_target_patterns_suppress_a_nonterminal_match_anything_rule(
        self,
    ) -> None:
        result = self._resolve(
            "all: app.o\n%: fallback\n\techo anything\n%.o: %.c\n\techo specific\nfallback:\n\techo fallback\n",
            ["app.c"],
        )
        self.assertEqual(
            commands(target(result.rules, "app.o"), result.env), ["echo specific"]
        )


class StaticPatternResolutionTest(unittest.TestCase):
    """static pattern resolution"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_separate_literal_targets_receive_separate_substituted_prerequisites(
        self,
    ) -> None:
        rules = evaluate(
            "a.o b.o: %.o: src/%.c common.h | cache/%.stamp\n\techo compile\n"
        ).rules
        self.assertEqual(
            [
                [rule.target, rule.prerequisites, rule.order_only_prerequisites]
                for rule in rules
            ],
            [
                ["a.o", ["src/a.c", "common.h"], ["cache/a.stamp"]],
                ["b.o", ["src/b.c", "common.h"], ["cache/b.stamp"]],
            ],
        )

    def test_only_matching_targets_become_static_pattern_models(self) -> None:
        rules = evaluate("a.o README: %.o: %.c\n").rules
        self.assertEqual([rule.target for rule in rules], ["a.o"])

    def test_expanded_static_pattern_and_prerequisite_pattern_use_assigned_values(
        self,
    ) -> None:
        rules = evaluate(
            "PATTERN = %.o\nSOURCE = src/%.c\nfile.o: $(PATTERN): $(SOURCE)\n"
        ).rules
        self.assertEqual(rules[0].prerequisites, ["src/file.c"])


if __name__ == "__main__":
    unittest.main()
