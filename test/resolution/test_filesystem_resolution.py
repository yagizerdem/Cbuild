import unittest
from typing import Literal

from cbuild_backend.execution.preq_resolution.preq_resolver import (
    PreqResolver,
    resolve_preqs,
)
from cbuild_backend.execution.preq_resolution.target_resolver import (
    TargetResolver,
    resolve_target,
)
from cbuild_backend.execution.preq_resolution.type import (
    NoPathOrigin,
    PathOrigin,
    PreqResolution,
    TargetResolution,
)
from cbuild_backend.execution.type import Pair
from cbuild_backend.model import VpathRule
from test.resolution.helpers import cleanup_fixtures, evaluate, fixture, target
from type.cbuild_exception import CbuildException, ErrorType, MachineCode


class _DiskLookup:
    # Holder keeps the shared base out of unittest discovery.
    class Base(unittest.TestCase):
        """disk lookup"""

        kind: Literal["target", "prerequisite"]

        def tearDown(self) -> None:
            cleanup_fixtures()

        def resolver(
            self, vpaths: list[VpathRule] | None = None
        ) -> TargetResolver | PreqResolver:
            if vpaths is None:
                vpaths = []
            return (
                TargetResolver([], vpaths)
                if self.kind == "target"
                else PreqResolver([], vpaths)
            )

        def test_existing_absolute_path_resolves_with_its_original_name(
            self,
        ) -> None:
            disk = fixture()
            absolute = disk.write("nested/input.txt")
            result = self.resolver().resolve(absolute)
            self.assertEqual(
                result.origin, PathOrigin(type="absolute", absolute_path=absolute)
            )
            self.assertEqual(
                result.target_name
                if isinstance(result, TargetResolution)
                else result.preq_name
                if isinstance(result, PreqResolution)
                else None,
                absolute,
            )

        def test_missing_absolute_path_does_not_fall_back_to_vpath(self) -> None:
            disk = fixture()
            self.assertEqual(
                self.resolver([VpathRule("%", [disk.root])])
                .resolve(disk.path("missing"))
                .origin,
                NoPathOrigin(type="not-found"),
            )

        def test_existing_relative_path_resolves_from_cwd(self) -> None:
            disk = fixture()
            disk.use_as_cwd()
            absolute = disk.write("nested/input.txt")
            self.assertEqual(
                self.resolver().resolve("nested/input.txt").origin,
                PathOrigin(type="cwd", absolute_path=absolute),
            )

        def test_cwd_takes_precedence_over_matching_vpath_files(self) -> None:
            disk = fixture()
            disk.use_as_cwd()
            local = disk.write("input.c")
            disk.write("sources/input.c")
            self.assertEqual(
                self.resolver([VpathRule("%.c", [disk.path("sources")])])
                .resolve("input.c")
                .origin,
                PathOrigin(type="cwd", absolute_path=local),
            )

        def test_matching_vpath_selects_the_first_directory_containing_the_file(
            self,
        ) -> None:
            disk = fixture()
            disk.use_as_cwd()
            found = disk.write("second/input.c")
            disk.write("third/input.c")
            vpaths = [
                VpathRule(
                    "%.c",
                    [disk.path("first"), disk.path("second"), disk.path("third")],
                )
            ]
            result = self.resolver(vpaths).resolve("input.c")
            self.assertEqual(
                result.origin, PathOrigin(type="vpath", absolute_path=found)
            )
            self.assertIs(result.vpath_rules, vpaths)

        def test_nonmatching_vpath_patterns_are_skipped_even_when_the_file_exists_there(
            self,
        ) -> None:
            disk = fixture()
            disk.use_as_cwd()
            disk.write("wrong/input.c")
            found = disk.write("correct/input.c")
            self.assertEqual(
                self.resolver(
                    [
                        VpathRule("%.h", [disk.path("wrong")]),
                        VpathRule("%.c", [disk.path("correct")]),
                    ]
                )
                .resolve("input.c")
                .origin,
                PathOrigin(type="vpath", absolute_path=found),
            )

        def test_vpath_declarations_are_searched_in_declaration_order(self) -> None:
            disk = fixture()
            disk.use_as_cwd()
            first = disk.write("first/input.c")
            disk.write("second/input.c")
            self.assertEqual(
                self.resolver(
                    [
                        VpathRule("%", [disk.path("first")]),
                        VpathRule("%.c", [disk.path("second")]),
                    ]
                )
                .resolve("input.c")
                .origin,
                PathOrigin(type="vpath", absolute_path=first),
            )

        def test_missing_relative_input_reports_not_found(self) -> None:
            disk = fixture()
            disk.use_as_cwd()
            self.assertEqual(
                self.resolver().resolve("missing.c").origin,
                NoPathOrigin(type="not-found"),
            )

        def test_paths_containing_spaces_and_unicode_resolve_without_word_splitting(
            self,
        ) -> None:
            disk = fixture()
            disk.use_as_cwd()
            absolute = disk.write("space dir/öğe.c")
            self.assertEqual(
                self.resolver().resolve("space dir/öğe.c").origin,
                PathOrigin(type="cwd", absolute_path=absolute),
            )

        def test_relative_dot_segments_are_normalized_in_the_absolute_result(
            self,
        ) -> None:
            disk = fixture()
            disk.use_as_cwd()
            absolute = disk.write("nested/input.c")
            self.assertEqual(
                self.resolver().resolve("./nested/../nested/input.c").origin,
                PathOrigin(type="cwd", absolute_path=absolute),
            )


class TargetDiskLookupTest(_DiskLookup.Base):
    """target disk lookup"""

    kind = "target"


class PrerequisiteDiskLookupTest(_DiskLookup.Base):
    """prerequisite disk lookup"""

    kind = "prerequisite"


class RuleInputsAndLookupWrappersTest(unittest.TestCase):
    """rule inputs and lookup wrappers"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_a_missing_file_with_an_exact_declared_target_is_a_target_rule_prerequisite(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        rules = evaluate("all: generated\ngenerated:\n").rules
        self.assertEqual(
            PreqResolver(rules, []).resolve("generated").origin,
            NoPathOrigin(type="target-rule"),
        )
        self.assertEqual(
            TargetResolver(rules, []).resolve("generated").origin,
            NoPathOrigin(type="not-found"),
        )

    def test_an_existing_file_takes_precedence_over_a_declared_prerequisite_target(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        absolute = disk.write("generated")
        rules = evaluate("generated:\n").rules
        self.assertEqual(
            PreqResolver(rules, []).resolve("generated").origin,
            PathOrigin(type="cwd", absolute_path=absolute),
        )

    def test_literal_target_lookup_does_not_treat_percent_characters_as_implicit_patterns(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        rules = evaluate("all:\n").rules
        self.assertEqual(
            PreqResolver(rules, []).resolve("app.o").origin.type, "not-found"
        )

    def test_resolve_preqs_preserves_normal_order_only_order_duplicates_and_distinct_origins(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("local.c")
        disk.write("sources/remote.c")
        result = evaluate(
            "vpath %.c sources\nall: local.c remote.c generated local.c | cache stamp cache\ngenerated:\ncache:\nstamp:\n"
        )
        preqs = resolve_preqs(result.rules, target(result.rules, "all"), result.env)
        self.assertEqual(
            [[preq.preq_name, preq.origin.type] for preq in preqs.first],
            [
                ["local.c", "cwd"],
                ["remote.c", "vpath"],
                ["generated", "target-rule"],
                ["local.c", "cwd"],
            ],
        )
        self.assertEqual(
            [preq.preq_name for preq in preqs.second], ["cache", "stamp", "cache"]
        )
        self.assertEqual(
            all(preq.origin.type == "target-rule" for preq in preqs.second), True
        )

    def test_resolve_preqs_rejects_missing_normal_or_order_only_prerequisites(
        self,
    ) -> None:
        for source in ["all: missing\n", "all: | missing\n"]:
            with self.subTest(source=source):
                disk = fixture()
                disk.use_as_cwd()
                result = evaluate(source)
                with self.assertRaises(CbuildException) as context:
                    resolve_preqs(result.rules, result.rules[0], result.env)
                self.assertEqual(context.exception.error_type, ErrorType.PROCESS)
                self.assertEqual(
                    context.exception.machine_code, MachineCode.DEPQ_NOT_FOUND
                )
                self.assertIn(
                    "'missing', needed by 'all'", context.exception.message
                )

    def test_resolve_preqs_returns_separate_empty_lists_for_a_leaf_rule(
        self,
    ) -> None:
        result = evaluate("leaf:\n")
        self.assertEqual(
            resolve_preqs(result.rules, result.rules[0], result.env),
            Pair(first=[], second=[]),
        )

    def test_resolve_target_uses_the_rules_captured_vpath_configuration(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        absolute = disk.write("objects/app.o")
        result = evaluate("vpath %.o objects\napp.o:\n")
        self.assertEqual(
            resolve_target(result.rules, result.rules[0], result.env).origin,
            PathOrigin(type="vpath", absolute_path=absolute),
        )

    def test_clearing_a_vpath_pattern_removes_it_only_from_subsequent_rule_resolution(
        self,
    ) -> None:
        rules = evaluate(
            "vpath %.c sources\nfirst: a.c\nvpath %.c\nsecond: a.c\n"
        ).rules
        self.assertEqual([rule.pattern for rule in rules[0].vpath_rules], ["%.c"])
        self.assertEqual(rules[1].vpath_rules, [])

    def test_clear_all_resets_vpath_configuration(self) -> None:
        rules = evaluate(
            "vpath %.c sources\nvpath %.h headers\nvpath\nall:\n"
        ).rules
        self.assertEqual(rules[0].vpath_rules, [])


if __name__ == "__main__":
    unittest.main()
