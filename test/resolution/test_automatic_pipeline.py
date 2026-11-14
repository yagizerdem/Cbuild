import os
import unittest

from cbuild_backend.depq_graph import get_target_subgraph, topological_sort
from cbuild_backend.execution.auto_variable import AutomaticVariableEnv
from cbuild_backend.execution.create_process_env import create_process_env
from cbuild_backend.execution.preq_resolution.out_of_date import OutOfDateChecker
from cbuild_backend.execution.preq_resolution.preq_resolver import resolve_preqs
from cbuild_backend.execution.preq_resolution.target_resolver import resolve_target
from cbuild_backend.expansion import ValueExpansionEngine
from cbuild_backend.implicit_rule_resolver import ImplicitRuleResolver
from test.resolution.helpers import (
    cleanup_fixtures,
    commands,
    evaluate,
    expand,
    fixture,
    normalized,
    target,
)


class AutomaticVariablesFromResolvedNamesTest(unittest.TestCase):
    """automatic variables from actual resolved names and timestamps"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def _setup(self):
        disk = fixture()
        disk.use_as_cwd()
        disk.write("obj/app.o", "object", 1_700_000_100)
        disk.write("src/a.c", "old", 1_700_000_000)
        disk.write("lib/b.c", "new", 1_700_000_200)
        disk.write("src/c.c", "new", 1_700_000_200)
        disk.directory("cache")
        disk.write("stamp")
        result = normalized(
            "TOOL = compiler\nobj/app.o: src/a.c lib/b.c src/a.c src/c.c lib/b.c | cache stamp cache\n\t$(TOOL) $(@) $(<) $(^) $(+) $(?) $(|)\n"
        )
        rules, env = result.rules, result.env
        rule = rules[0]
        resolved_target = resolve_target(rules, rule, env)
        preqs = resolve_preqs(rules, rule, env)
        age = OutOfDateChecker(env).resolve_out_of_date(resolved_target, preqs.first)
        automatic = AutomaticVariableEnv(
            rule, env, resolved_target, preqs.first, preqs.second, age
        ).generate()
        return rule, env, automatic, age

    def test_automatic_variable_resolves(self) -> None:
        for name, expected in [
            ("@", "obj/app.o"),
            ("<", "src/a.c"),
            ("^", "src/a.c lib/b.c src/c.c"),
            ("+", "src/a.c lib/b.c src/a.c src/c.c lib/b.c"),
            ("?", "lib/b.c src/c.c"),
            ("|", "cache stamp"),
            ("%", ""),
            ("@D", "obj"),
            ("@F", "app.o"),
            ("<D", "src"),
            ("<F", "a.c"),
            ("^D", "src lib src"),
            ("^F", "a.c b.c c.c"),
            ("+D", "src lib src src lib"),
            ("+F", "a.c b.c a.c c.c b.c"),
            ("?D", "lib src"),
            ("?F", "b.c c.c"),
        ]:
            with self.subTest(f"$({name}) resolves to {expected}"):
                _, env, automatic, _ = self._setup()
                self.assertEqual(expand(f"$({name})", automatic), expected)
                self.assertEqual(expand(f"${{{name}}}", automatic), expected)
                variable = automatic.require_variable(name)
                self.assertEqual(variable.origin, "automatic")
                self.assertEqual(variable.flavor, "raw")
                self.assertEqual(variable.is_exported, False)
                self.assertEqual(env.has_variable(name), False)

    def test_recipe_expansion_combines_automatic_variables_with_inherited_file_variables(
        self,
    ) -> None:
        rule, _, automatic, _ = self._setup()
        self.assertEqual(
            commands(rule, automatic),
            [
                "compiler obj/app.o src/a.c src/a.c lib/b.c src/c.c src/a.c lib/b.c src/a.c src/c.c lib/b.c lib/b.c src/c.c cache stamp"
            ],
        )

    def test_leaf_rules_use_empty_prerequisite_variables_and_dot_for_the_target_directory(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        result = normalized("leaf:\n")
        rules, env = result.rules, result.env
        rule = rules[0]
        automatic = AutomaticVariableEnv(
            rule, env, resolve_target(rules, rule, env), [], [], None
        ).generate()
        self.assertEqual(
            expand("$(@)|$(@D)|$(@F)|$(<)|$(<D)|$(<F)|$(^)|$(+)|$(?)|$(|)", automatic),
            "leaf|.|leaf|||||||",
        )

    def test_automatic_symbols_shadow_parent_entries_without_overwriting_them(
        self,
    ) -> None:
        _, env, automatic, _ = self._setup()
        env.set_raw_variable("@", "global")
        self.assertEqual(expand("$(@)", automatic), "obj/app.o")
        self.assertEqual(env.require_raw_variable("@"), "global")

    def test_an_explicit_target_environment_is_used_as_the_parent_of_automatic_scope(
        self,
    ) -> None:
        rule, env, _, _ = self._setup()
        evaluate("obj/app.o: TOOL = local-compiler\n", env)
        preqs = resolve_preqs([rule], rule, env)
        automatic = AutomaticVariableEnv(
            rule,
            env,
            resolve_target([rule], rule, env),
            preqs.first,
            preqs.second,
            None,
        ).generate(env.target_envs.get(rule.target))
        self.assertEqual(expand("$(TOOL)|$(@)", automatic), "local-compiler|obj/app.o")
        self.assertEqual(expand("$(TOOL)", env), "compiler")


class CompleteResolutionPipelineTest(unittest.TestCase):
    """complete resolution pipeline without executing recipes"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_assignment_expansion_normalization_implicit_graph_file_lookup_age_recipe(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("src/a.c", "a", 1_700_000_000)
        disk.write("src/b.c", "b", 1_700_000_200)
        disk.write("obj/a.o", "a-object", 1_700_000_100)
        disk.directory("cache")
        source = "\n".join(
            [
                "NAMES = b a b",
                "OBJECTS := $(addprefix obj/,$(addsuffix .o,$(sort $(NAMES))))",
                "FLAGS = global",
                "all: $(OBJECTS)",
                "obj/b.o: FLAGS = local",
                "obj/%.o: src/%.c | cache",
                "\tcompiler $(FLAGS) $(<) -o $(@)",
                "",
            ]
        )
        result = normalized(source)
        env, explicit, patterns = result.env, result.rules, result.patterns
        self.assertEqual(expand("$(OBJECTS)", env), "obj/a.o obj/b.o")
        rules = ImplicitRuleResolver(explicit, patterns, disk.root).resolve()
        graph = get_target_subgraph(rules, "all")
        self.assertEqual(
            sorted(rule.target for rule in graph), ["all", "obj/a.o", "obj/b.o"]
        )
        self.assertEqual(
            [rule.target for rule in topological_sort(graph, target(graph, "all"))],
            ["obj/a.o", "obj/b.o", "all"],
        )
        for name in ["obj/a.o", "obj/b.o"]:
            rule = target(rules, name)
            resolved_target = resolve_target(rules, rule, env)
            preqs = resolve_preqs(rules, rule, env)
            age = OutOfDateChecker(env).resolve_out_of_date(
                resolved_target, preqs.first
            )
            self.assertEqual(preqs.first[0].origin.type, "cwd")
            self.assertEqual(preqs.second[0].preq_name, "cache")
            self.assertEqual(age.is_target_out_of_date, name == "obj/b.o")
            automatic = AutomaticVariableEnv(
                rule, env, resolved_target, preqs.first, preqs.second, age
            ).generate(env.target_envs.get(name))
            letter = "a" if name == "obj/a.o" else "b"
            self.assertEqual(
                commands(rule, automatic),
                [
                    f"compiler {'global' if letter == 'a' else 'local'} src/{letter}.c -o obj/{letter}.o"
                ],
            )
        self.assertEqual(env.require_raw_variable("OBJECTS"), "obj/a.o obj/b.o")
        self.assertEqual(env.has_variable("@"), False)

    def test_newer_order_only_files_resolve_but_do_not_affect_age_when_checking_normal_inputs(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write("target", "target", 1_700_000_100)
        disk.write("source", "source", 1_700_000_000)
        disk.write("stamp", "stamp", 1_700_000_200)
        result = normalized("target: source | stamp\n")
        rules, env = result.rules, result.env
        rule = rules[0]
        preqs = resolve_preqs(rules, rule, env)
        self.assertEqual(preqs.second[0].origin.type, "cwd")
        age = OutOfDateChecker(env).resolve_out_of_date(
            resolve_target(rules, rule, env), preqs.first
        )
        self.assertEqual(age.is_target_out_of_date, False)
        self.assertEqual(age.out_of_date_preqs, [])

    def test_exported_recursive_symbols_use_their_latest_expansion_in_process_environment(
        self,
    ) -> None:
        env = evaluate(
            "BASE = before\nexport CBUILD_RESOLUTION_EXPORTED = $(BASE)\nBASE = after\nPRIVATE = hidden\n"
        ).env
        process_env = create_process_env(env, ValueExpansionEngine(env))
        self.assertEqual(process_env["CBUILD_RESOLUTION_EXPORTED"], "after")
        for key, environment_value in os.environ.items():
            self.assertEqual(process_env[key], environment_value)
        self.assertEqual(env.require_variable("PRIVATE").is_exported, False)


if __name__ == "__main__":
    unittest.main()
