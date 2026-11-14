import unittest

from test.resolution.helpers import (
    cleanup_fixtures,
    commands,
    environment,
    evaluate,
    expand,
    fixture,
    target,
)


# These assert intended resolution contracts. Do not weaken assertions to match
# a defect, or mark them skipped/expected-to-fail merely to make the suite green.
class ResolutionEdgeCaseRegressionContractsTest(unittest.TestCase):
    """resolution edge-case regression contracts"""

    def tearDown(self) -> None:
        cleanup_fixtures()

    def test_inactive_conditional_branches_do_not_assign_or_resolve_rules_and_active_rules_appear_once(
        self,
    ) -> None:
        result = evaluate(
            "MODE = debug\nifeq ($(MODE),debug)\nCHOSEN := yes\nselected: $(CHOSEN)\nelse\nBAD := $(error inactive)\nwrong: missing\nendif\n",
        )
        self.assertEqual(result.env.has_variable("BAD"), False)
        self.assertEqual([rule.target for rule in result.rules], ["selected"])
        self.assertEqual(result.rules[0].prerequisites, ["yes"])

    def test_firstword_preserves_the_word_boundary_when_compiled_in_an_assignment(
        self,
    ) -> None:
        env = evaluate("RESULT := $(firstword a b)\n").env
        self.assertEqual(env.require_raw_variable("RESULT"), "a")
        self.assertEqual(expand("$(RESULT)", env), "a")

    def test_append_to_a_simple_variable_immediately_expands_its_rhs(self) -> None:
        env = evaluate(
            "BASE = old\nLIST := initial\nLIST += $(BASE)\nBASE = new\n",
        ).env
        self.assertEqual(env.require_variable("LIST").flavor, "raw")
        self.assertEqual(expand("$(LIST)", env), "initial old")
        self.assertEqual(env.require_raw_variable("LIST"), "initial old")

    def test_multi_word_target_specific_assignment_creates_one_environment_per_target(
        self,
    ) -> None:
        env = evaluate(
            "TARGETS = one two\n$(TARGETS): FLAGS = local\none two:\n",
        ).env
        self.assertEqual(sorted(env.target_envs.keys()), ["one", "two"])
        self.assertEqual(expand("$(FLAGS)", env.target_envs["one"]), "local")
        self.assertEqual(expand("$(FLAGS)", env.target_envs["two"]), "local")

    def test_multi_word_static_targets_and_inputs_split_after_variable_expansion(
        self,
    ) -> None:
        rules = evaluate(
            "OBJECTS = a.o b.o\nINPUTS = %.c common.h\n$(OBJECTS): %.o: $(INPUTS)\n",
        ).rules
        self.assertEqual(
            [[rule.target, rule.prerequisites] for rule in rules],
            [
                ["a.o", ["a.c", "common.h"]],
                ["b.o", ["b.c", "common.h"]],
            ],
        )

    def test_later_vpath_declarations_do_not_retroactively_change_an_earlier_rule(
        self,
    ) -> None:
        # Contract: a rule captures the evaluation state's vpaths at its position,
        # as implicit pattern models already do. See README for this scope assumption.
        rules = evaluate(
            "first: a.c\nvpath %.c sources\nsecond: a.c\n",
        ).rules
        self.assertEqual(target(rules, "first").vpath_rules, [])
        self.assertEqual(
            [rule.pattern for rule in target(rules, "second").vpath_rules], ["%.c"]
        )

    def test_conditional_assignment_respects_a_defined_symbol_in_the_enclosing_scope(
        self,
    ) -> None:
        parent = environment()
        parent.set_raw_variable("FLAGS", "parent")
        env = environment({}, parent)
        evaluate("FLAGS ?= fallback\n", env)
        self.assertEqual(env.has_variable("FLAGS"), False)
        self.assertEqual(expand("$(FLAGS)", env), "parent")

    def test_included_rules_appear_once_and_following_assignments_remain_visible(
        self,
    ) -> None:
        disk = fixture()
        disk.use_as_cwd()
        disk.write(
            "part.mk",
            "VALUE = included\nincluded: $(VALUE)\n\techo $(VALUE)\n",
        )
        result = evaluate(
            "before:\ninclude part.mk\nVALUE = after\nafter: $(VALUE)\n",
        )
        self.assertEqual(
            [rule.target for rule in result.rules], ["before", "included", "after"]
        )
        self.assertEqual(target(result.rules, "included").prerequisites, ["included"])
        self.assertEqual(
            commands(target(result.rules, "included"), result.env), ["echo after"]
        )


if __name__ == "__main__":
    unittest.main()
