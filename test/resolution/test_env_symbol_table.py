import unittest
from unittest import mock

from cbuild_backend.core import CliVar, Core, EnvVar
from cbuild_backend.env import SymbolTableVariable, VariableOrigin, compare_var_priority
from test.resolution.helpers import environment, expand, value


class SymbolTableStorageAndScopeTest(unittest.TestCase):
    """symbol table storage and scope"""

    def test_new_tables_are_empty_and_independent(self) -> None:
        first = environment()
        second = environment()
        first.set_raw_variable("A", "first")
        self.assertEqual(first.variable_count, 1)
        self.assertEqual(second.variable_count, 0)
        self.assertEqual(list(second.variable_entries()), [])

    def test_replacement_changes_one_entry_without_increasing_the_symbol_count(
        self,
    ) -> None:
        env = environment()
        env.set_raw_variable("A", "old")
        env.set_raw_variable("B", "second")
        env.set_raw_variable("A", "new", "override", True)
        self.assertEqual(env.variable_count, 2)
        self.assertEqual([name for name, _ in env.variable_entries()], ["A", "B"])
        variable = env.require_variable("A")
        self.assertEqual(variable.origin, "override")
        self.assertEqual(variable.flavor, "raw")
        self.assertEqual(variable.is_exported, True)
        self.assertEqual(env.require_raw_variable("A"), "new")

    def test_stores_ordinary_symbol_without_prototype_collisions(self) -> None:
        for name in [
            "toString",
            "constructor",
            "__proto__",
            "hasOwnProperty",
            "0",
            "A-B",
            "é",
        ]:
            with self.subTest(name=name):
                env = environment()
                env.set_raw_variable(name, "stored")
                self.assertEqual(env.require_raw_variable(name), "stored")
                self.assertEqual(env.variable_count, 1)

    def test_variable_names_are_case_sensitive(self) -> None:
        env = environment()
        env.set_raw_variable("FLAGS", "upper")
        env.set_raw_variable("flags", "lower")
        self.assertEqual(expand("$(FLAGS)|$(flags)", env), "upper|lower")

    def test_raw_values_stay_literal_while_deferred_values_resolve_references(
        self,
    ) -> None:
        env = environment()
        env.set_raw_variable("BASE", "resolved")
        env.set_raw_variable("RAW", "$(BASE)")
        env.set_deferred_variable("DEFERRED", value("$(BASE)"))
        self.assertEqual(expand("$(RAW)|$(DEFERRED)", env), "$(BASE)|resolved")
        self.assertIsNone(env.get_raw_variable("DEFERRED"))
        with self.assertRaisesRegex(Exception, "Variable has no raw value"):
            env.require_raw_variable("DEFERRED")

    def test_empty_values_differ_from_missing_symbols(self) -> None:
        env = environment()
        env.set_raw_variable("EMPTY", "")
        self.assertEqual(env.has_variable("EMPTY"), True)
        self.assertEqual(env.get_raw_variable_or_default("EMPTY", "fallback"), "")
        self.assertEqual(
            env.get_raw_variable_or_default("MISSING", "fallback"), "fallback"
        )

    def test_local_lookup_and_recursive_lookup_have_different_scope(self) -> None:
        parent = environment()
        parent.set_raw_variable("A", "parent")
        child = environment({}, parent)
        grandchild = environment({}, child)
        self.assertEqual(child.has_variable("A"), False)
        self.assertIsNone(child.get_variable("A"))
        self.assertEqual(grandchild.has_variable_recursive("A"), True)
        self.assertIs(
            grandchild.require_variable_recursive("A"), parent.require_variable("A")
        )
        self.assertEqual(child.variable_count, 0)

    def test_local_shadowing_and_deletion_reveal_an_unchanged_parent_symbol(
        self,
    ) -> None:
        parent = environment()
        parent.set_raw_variable("A", "parent")
        child = environment({}, parent)
        child.set_raw_variable("A", "child")
        self.assertEqual(expand("$(A)", child), "child")
        self.assertEqual(expand("$(A)", parent), "parent")
        self.assertEqual(child.delete_variable("A"), True)
        self.assertEqual(expand("$(A)", child), "parent")

    def test_empty_local_value_shadows_nonempty_parent(self) -> None:
        parent = environment()
        parent.set_raw_variable("A", "parent")
        child = environment({}, parent)
        child.set_raw_variable("A", "")
        self.assertEqual(expand("$(A)", child), "")

    def test_isolated_positional_scope_blocks_inherited_digits_but_allows_named_symbols(
        self,
    ) -> None:
        parent = environment()
        parent.set_raw_variable("1", "parent-arg")
        parent.set_raw_variable("12", "parent-arg12")
        parent.set_raw_variable("NAMED", "parent-name")
        child = environment({}, parent)
        child.islate_positional_variables = True
        self.assertEqual(expand("$(1)|$(12)|$(NAMED)", child), "||parent-name")
        self.assertEqual(child.has_variable_recursive("1"), False)
        child.set_raw_variable("1", "local-arg")
        self.assertEqual(expand("$(1)", child), "local-arg")

    def test_define_rejects_duplicates_while_define_if_absent_preserves_them(
        self,
    ) -> None:
        env = environment()
        first = SymbolTableVariable.raw_variable("first")
        env.define_variable("A", first)
        with self.assertRaisesRegex(Exception, "already exists"):
            env.define_variable("A", SymbolTableVariable.raw_variable("second"))
        self.assertEqual(
            env.define_variable_if_absent(
                "A", SymbolTableVariable.raw_variable("second")
            ),
            False,
        )
        self.assertIs(env.require_variable("A"), first)
        self.assertEqual(env.define_variable_if_absent("B", first), True)

    def test_get_or_create_invokes_the_factory_only_for_missing_local_entries(
        self,
    ) -> None:
        env = environment()
        factory = mock.Mock(
            side_effect=lambda: SymbolTableVariable.raw_variable("created")
        )
        first = env.get_or_create_variable("A", factory)
        self.assertIs(env.get_or_create_variable("A", factory), first)
        self.assertEqual(factory.call_count, 1)

    def test_replace_and_update_return_the_documented_symbols(self) -> None:
        env = environment()
        old = SymbolTableVariable.raw_variable("old")
        next = SymbolTableVariable.raw_variable("next")
        env.set_variable("A", old)
        self.assertIs(env.replace_variable("A", next), old)
        self.assertEqual(
            env.update_variable(
                "A",
                lambda current: SymbolTableVariable.raw_variable(
                    f"{current.get_raw_value()}!"
                ),
            ).get_raw_value(),
            "next!",
        )
        self.assertEqual(env.variable_count, 1)

    def test_delete_remove_clear_affect_only_the_local_table(self) -> None:
        parent = environment()
        parent.set_raw_variable("PARENT", "retained")
        env = environment({}, parent)
        env.set_raw_variable("A", "a")
        env.set_raw_variable("B", "b")
        self.assertEqual(env.remove_variable("A").get_raw_value(), "a")
        self.assertEqual(env.delete_variable("A"), False)
        env.clear_variables()
        self.assertEqual(env.variable_count, 0)
        self.assertEqual(parent.variable_count, 1)

    def test_export_selection_returns_only_local_exported_symbols(self) -> None:
        parent = environment()
        parent.set_raw_variable("PARENT", "p", "file", True)
        env = environment({}, parent)
        env.set_raw_variable("A", "a", "file", True)
        env.set_raw_variable("B", "b")
        self.assertEqual(list(env.get_exported_variables().keys()), ["A"])
        env.set_variable_exported("B", True)
        env.set_variable_exported("A", False)
        self.assertEqual(list(env.get_exported_variables().keys()), ["B"])

    def test_rejects_a_missing_symbol_without_inserting_it(self) -> None:
        for method in [
            "require_variable",
            "require_variable_recursive",
            "remove_variable",
        ]:
            with self.subTest(method=method):
                env = environment()
                with self.assertRaisesRegex(Exception, "Undefined variable"):
                    getattr(env, method)("MISSING")
                self.assertEqual(env.variable_count, 0)

    def test_empty_names_are_rejected_without_mutating_the_table(self) -> None:
        env = environment()
        with self.assertRaises(TypeError):
            env.set_raw_variable("", "value")
        self.assertEqual(env.variable_count, 0)

    def test_merging_tables_replaces_collisions_and_keeps_unrelated_entries(
        self,
    ) -> None:
        left = environment()
        right = environment()
        left.set_raw_variable("A", "left")
        left.set_raw_variable("B", "retained")
        right.set_raw_variable("A", "right", "command-line")
        right.set_raw_variable("C", "added")
        left.merge(right)
        self.assertEqual(expand("$(A)|$(B)|$(C)", left), "right|retained|added")
        self.assertEqual(left.require_variable("A").origin, "command-line")


class OriginPriorityAndInputMergingTest(unittest.TestCase):
    """origin priority and input merging"""

    ordered: list[VariableOrigin] = [
        "automatic",
        "default",
        "environment",
        "file",
        "environment-overridden",
        "command-line",
        "override",
    ]

    def test_origin_compares_correctly_against_every_origin(self) -> None:
        for index, origin in enumerate(self.ordered):
            with self.subTest(origin=origin):
                for other in range(len(self.ordered)):
                    self.assertEqual(
                        compare_var_priority(origin, self.ordered[other]),
                        (index > other) - (index < other),
                    )

    def test_cli_merge_respects_existing_origin(self) -> None:
        for origin in self.ordered:
            with self.subTest(origin=origin):
                env = environment()
                env.set_raw_variable("A", "existing", origin)
                Core(env).merge_cli_vars(
                    [CliVar(key="A", value="cli"), CliVar(key="NEW", value="created")]
                )
                protected_origin = origin == "command-line" or origin == "override"
                self.assertEqual(
                    env.require_raw_variable("A"),
                    "existing" if protected_origin else "cli",
                )
                self.assertEqual(
                    env.require_variable("A").origin,
                    origin if protected_origin else "command-line",
                )
                self.assertEqual(env.require_raw_variable("NEW"), "created")

    def test_environment_merge_respects_file_and_override_origins(self) -> None:
        for environment_overrides in [False, True]:
            with self.subTest(environment_overrides=environment_overrides):
                env = environment({"environment_overrides": environment_overrides})
                env.set_raw_variable("FILE", "file", "file")
                env.set_raw_variable("OVERRIDE", "override", "override")
                Core(env).merge_env_vars(
                    [
                        EnvVar(key="FILE", value="env"),
                        EnvVar(key="OVERRIDE", value="env"),
                    ]
                )
                self.assertEqual(
                    env.require_raw_variable("FILE"),
                    "env" if environment_overrides else "file",
                )
                self.assertEqual(env.require_raw_variable("OVERRIDE"), "override")


if __name__ == "__main__":
    unittest.main()
