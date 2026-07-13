package ysharpBackend;

import io.Cbuild.Env;
import io.Cbuild.Expansion;
import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildException;
import io.Cbuild.ySharpBackend.ySharpBackend;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import util.utils;

import java.util.List;

public class VariableExpansionTest {

    @Test
    public void simpleAssignmentStoresLiteralAndExpandedValues() {
        Env context = expand("""
base := core
literal := plain text
combined := prefix-$(base)-suffix
repeated := $(base)/$(base)/$(base)
""");

        assertRawValue(context, "base", "core");
        assertRawValue(context, "literal", "plain text");
        assertRawValue(context, "combined", "prefix-core-suffix");
        assertRawValue(context, "repeated", "core/core/core");
    }

    @Test
    public void recursiveAssignmentResolvesBasicReferencesWhenUsed() {
        io.Cbuild.Env context = expand("""
name = world
greeting = hello $(name)
punctuation = !
result := $(greeting)$(punctuation)
""");

        assertRawValue(context, "name", "world");
        assertRawValue(context, "greeting", "hello world");
        assertRawValue(context, "punctuation", "!");
        assertRawValue(context, "result", "hello world!");
    }

    @Test
    public void undefinedReferencesExpandToEmptyStringForBothAssignmentTypes() {
        io.Cbuild.Env context = expand("""
simple := before$(missing)after
recursive = left$(unknown)right
resolved := $(recursive)
""");

        assertRawValue(context, "simple", "beforeafter");
        assertRawValue(context, "recursive", "leftright");
        assertRawValue(context, "resolved", "leftright");
    }

    @Test
    public void simpleAssignmentCapturesValueWhileRecursiveAssignmentUsesLatestValue() {
        io.Cbuild.Env context = expand("""
mode := debug
simple_snapshot := $(mode)
recursive_value = $(mode)
mode := release
recursive_result := $(recursive_value)
""");

        assertRawValue(context, "mode", "release");
        assertRawValue(context, "simple_snapshot", "debug");
        assertRawValue(context, "recursive_value", "release");
        assertRawValue(context, "recursive_result", "release");
    }

    @Test
    public void recursiveAssignmentSupportsForwardReferences() {
        io.Cbuild.Env context = expand("""
artifact = $(name)-$(version)-$(arch)
name := compiler
version := 2.1
arch := arm64
result := $(artifact)
""");

        assertRawValue(context, "artifact", "compiler-2.1-arm64");
        assertRawValue(context, "result", "compiler-2.1-arm64");
    }

    @Test
    public void nestedVariableNamesSelectConfigurationValues() {
        io.Cbuild.Env context = expand("""
env := prod
arch := arm64
profile.prod := release
tool.arm64 := clang
flags.release.clang := -O3 -DNDEBUG

selected_profile := $(profile.$(env))
selected_tool := $(tool.$(arch))
result := $(flags.$(selected_profile).$(selected_tool))
""");

        assertRawValue(context, "selected_profile", "release");
        assertRawValue(context, "selected_tool", "clang");
        assertRawValue(context, "result", "-O3 -DNDEBUG");
    }

    @Test
    public void mixedAssignmentsResolveNestedDeferredSelectors() {
        io.Cbuild.Env context = expand("""
environment = prod
architecture = arm64
profile.prod = release
compiler.arm64 = clang
optimization.release.clang = -O3
defines.prod = -DNDEBUG

selected_profile = $(profile.$(environment))
selected_compiler = $(compiler.$(architecture))
command = $(selected_compiler) $(optimization.$(selected_profile).$(selected_compiler)) $(defines.$(environment))
result := $(command)
""");

        assertRawValue(context, "environment", "prod");
        assertRawValue(context, "architecture", "arm64");
        assertRawValue(context, "selected_profile", "release");
        assertRawValue(context, "selected_compiler", "clang");
        assertRawValue(context, "command", "clang -O3 -DNDEBUG");
        assertRawValue(context, "result", "clang -O3 -DNDEBUG");
    }

    @Test
    public void deeplyNestedVariableNameCanResolveThroughMultipleLevels() {
        io.Cbuild.Env context = expand("""
stage := production
region.production := eu
cluster.eu := primary
node.primary := node-07
address.node-07 := 10.0.0.7

selected_region = $(region.$(stage))
selected_cluster = $(cluster.$(selected_region))
selected_node = $(node.$(selected_cluster))
endpoint = https://$(address.$(selected_node))/api
result := $(endpoint)
""");

        assertRawValue(context, "selected_region", "eu");
        assertRawValue(context, "selected_cluster", "primary");
        assertRawValue(context, "selected_node", "node-07");
        assertRawValue(context, "endpoint", "https://10.0.0.7/api");
        assertRawValue(context, "result", "https://10.0.0.7/api");
    }

    @Test
    public void nestedSelectorsCanBuildSeveralPartsOfOneVariableName() {
        io.Cbuild.Env context = expand("""
os := linux
arch = arm64
mode := release
toolchain.linux.arm64.release = clang-18
prefix.clang-18 := /opt/llvm
binary./opt/llvm.clang-18 = /opt/llvm/bin/clang

selected_toolchain = $(toolchain.$(os).$(arch).$(mode))
selected_prefix = $(prefix.$(selected_toolchain))
compiler = $(binary.$(selected_prefix).$(selected_toolchain))
result := $(compiler)
""");

        assertRawValue(context, "selected_toolchain", "clang-18");
        assertRawValue(context, "selected_prefix", "/opt/llvm");
        assertRawValue(context, "compiler", "/opt/llvm/bin/clang");
        assertRawValue(context, "result", "/opt/llvm/bin/clang");
    }


    @Test
    public void circularBasic1() {

        Assertions.assertThrows(cbuildException.class, () -> expand("""
a = $(b)
b = $(a)

k := $(b)
"""));

    }

    @Test
    public void circularBasic2() {

        Assertions.assertThrows(cbuildException.class, () -> expand("""
a = $(b)
b = $(a)

k := $(a)
"""));

    }
    @Test
    public void circularInDynamicIdentifierSelfResolution() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
a = $($(a))
k := $(a)
"""));
    }

    @Test
    public void circularInDynamicIdentifierIndirect() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
x = $(foo.$(y))
y = $(bar.$(x))
k := $(x)
"""));
    }

    @Test
    public void circularDeepChainWithMixedAssignments() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
a = $(b)
b = $(c)
c = $(d)
d = $(a)
k := $(a)
"""));
    }

    @Test
    public void circularSelfReferenceDeferred() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
döngü = $(döngü)
k := $(döngü)
"""));
    }

    @Test
    public void circularDynamicTargetWithLiteralFallback() {
        io.Cbuild.Env context = expand("""
mode = active
dep_active = $(mode)
result := $(dep_$(mode))
""");
        assertRawValue(context, "result", "active");

    }

    @Test
    public void complexNestedDynamicIdentifierResolutionSuccess() {
        io.Cbuild.Env context = expand("""
suf := key
var_$(suf) := target_value
final_var = $(var_$(suf))
result := $(final_var)
""");

        assertRawValue(context, "result", "target_value");
    }

    @Test
    public void recursiveAssignmentObservesValueDefinedAfterAssignment() {
        io.Cbuild.Env context = expand("""
value_ = $(later)
later := resolved
result := $(value_)
""");

        assertRawValue(context, "value_", "resolved");
        assertRawValue(context, "result", "resolved");
    }

    @Test
    public void recursiveAssignmentObservesLatestReassignedValue() {
        io.Cbuild.Env context = expand("""
state := first
recursive = $(state)
state := second
result := $(recursive)
""");

        assertRawValue(context, "recursive", "second");
        assertRawValue(context, "result", "second");
    }

    @Test
    public void simpleAssignmentDoesNotObserveLaterReassignment() {
        io.Cbuild.Env context = expand("""
state := first
snapshot := $(state)
state := second
result := $(snapshot)
""");

        assertRawValue(context, "snapshot", "first");
        assertRawValue(context, "result", "first");
    }


    @Test
    public void recursiveChainResolvesThroughMultipleVariables() {
        io.Cbuild.Env context = expand("""
a = $(b)
b = $(c)
c = $(d)
d := final
result := $(a)
""");

        assertRawValue(context, "a", "final");
        assertRawValue(context, "b", "final");
        assertRawValue(context, "c", "final");
        assertRawValue(context, "result", "final");
    }

    @Test
    public void multipleReferencesToSameRecursiveVariableResolveConsistently() {
        io.Cbuild.Env context = expand("""
value_ = content
result := $(value_)-$(value_)-$(value_)
""");

        assertRawValue(context, "result", "content-content-content");
    }

    @Test
    public void undefinedVariableBetweenDefinedVariablesExpandsToEmptyString() {
        io.Cbuild.Env context = expand("""
left := alpha
right := omega
result := $(left)$(missing)$(right)
""");

        assertRawValue(context, "result", "alphaomega");
    }

    @Test
    public void completelyUndefinedVariableExpandsToEmptyString() {
        io.Cbuild.Env context = expand("""
result := $(does_not_exist)
""");

        assertRawValue(context, "result", "");
    }

    @Test
    public void recursiveEmptyVariableCanBeReferenced() {
        io.Cbuild.Env context = expand("""
empty =
result := before$(empty)after
""");

        assertRawValue(context, "empty", "");
        assertRawValue(context, "result", "beforeafter");
    }

    @Test
    public void variableValueContainingSpacesIsPreserved() {
        io.Cbuild.Env context = expand("""
message := hello from ysharp backend
result := prefix $(message) suffix
""");

        assertRawValue(context, "message", "hello from ysharp backend");
        assertRawValue(context, "result", "prefix hello from ysharp backend suffix");
    }

    @Test
    public void unicodeVariableNameCanBeResolved() {
        io.Cbuild.Env context = expand("""
şehir := izmir
sonuç := $(şehir)
""");

        assertRawValue(context, "şehir", "izmir");
        assertRawValue(context, "sonuç", "izmir");
    }

    @Test
    public void unicodeVariableValueIsPreserved() {
        io.Cbuild.Env context = expand("""
message := çığ şükrü ğözü
result := $(message)
""");

        assertRawValue(context, "result", "çığ şükrü ğözü");
    }

    @Test
    public void variableNamesWithDotsResolveNormally() {
        io.Cbuild.Env context = expand("""
config.database.host := localhost
config.database.port := 5432
connection := $(config.database.host):$(config.database.port)
""");

        assertRawValue(context, "connection", "localhost:5432");
    }

    @Test
    public void dynamicVariableIdentifierCanUseTwoSelectors() {
        io.Cbuild.Env context = expand("""
platform := linux
architecture := x64
compiler.linux.x64 := gcc
result := $(compiler.$(platform).$(architecture))
""");

        assertRawValue(context, "result", "gcc");
    }

    @Test
    public void dynamicVariableIdentifierCanContainLiteralPrefixAndSuffix() {
        io.Cbuild.Env context = expand("""
mode := release
config.release.value := optimized
result := $(config.$(mode).value)
""");

        assertRawValue(context, "result", "optimized");
    }

    @Test
    public void dynamicVariableIdentifierCanResolveFromRecursiveSelector() {
        io.Cbuild.Env context = expand("""
environment = production
url.production := https://example.com
result := $(url.$(environment))
""");

        assertRawValue(context, "result", "https://example.com");
    }

    @Test
    public void dynamicVariableIdentifierUsesLatestSelectorValue() {
        io.Cbuild.Env context = expand("""
environment := development
url.development := localhost
url.production := example.com
selected = $(url.$(environment))
environment := production
result := $(selected)
""");

        assertRawValue(context, "selected", "example.com");
        assertRawValue(context, "result", "example.com");
    }

    @Test
    public void simpleDynamicVariableIdentifierCapturesCurrentSelectorValue() {
        io.Cbuild.Env context = expand("""
environment := development
url.development := localhost
url.production := example.com
selected := $(url.$(environment))
environment := production
result := $(selected)
""");

        assertRawValue(context, "selected", "localhost");
        assertRawValue(context, "result", "localhost");
    }

    @Test
    public void dynamicIdentifierWithUndefinedSelectorResolvesToMatchingLiteralName() {
        io.Cbuild.Env context = expand("""
config. := fallback
result := $(config.$(missing))
""");

        assertRawValue(context, "result", "fallback");
    }

    @Test
    public void nestedDynamicIdentifierCanResolveSelectorFromAnotherDynamicIdentifier() {
        io.Cbuild.Env context = expand("""
environment := prod
region.prod := eu
server.eu := api-01
result := $(server.$(region.$(environment)))
""");

        assertRawValue(context, "result", "api-01");
    }

    @Test
    public void nestedDynamicIdentifierCanResolveSeveralNestedLevelsInline() {
        io.Cbuild.Env context = expand("""
stage := prod
region.prod := eu
cluster.eu := primary
host.primary := server-01
result := $(host.$(cluster.$(region.$(stage))))
""");

        assertRawValue(context, "result", "server-01");
    }

    @Test
    public void dynamicAssignmentNameCanBeReferencedLater() {
        io.Cbuild.Env context = expand("""
suffix_ := debug
build.$(suffix_) := enabled
result := $(build.debug)
""");

        assertRawValue(context, "build.debug", "enabled");
        assertRawValue(context, "result", "enabled");
    }

    @Test
    public void dynamicAssignmentNameCanContainMultipleExpandedParts() {
        io.Cbuild.Env context = expand("""
os := linux
arch := arm64
tool.$(os).$(arch) := clang
result := $(tool.linux.arm64)
""");

        assertRawValue(context, "tool.linux.arm64", "clang");
        assertRawValue(context, "result", "clang");
    }

    @Test
    public void dynamicAssignmentNameCanUseRecursiveSelector() {
        io.Cbuild.Env context = expand("""
selector = active
state.$(selector) := running
result := $(state.active)
""");

        assertRawValue(context, "state.active", "running");
        assertRawValue(context, "result", "running");
    }

    @Test
    public void valueCanContainDollarCharacterWithoutVariableReference() {
        io.Cbuild.Env context = expand("""
currency := dollar
result := price-$(currency)
""");

        assertRawValue(context, "result", "price-dollar");
    }

    @Test
    public void escapedDollarIsPreservedAsLiteralDollar() {
        io.Cbuild.Env context = expand("""
result := price-$$100
""");

        assertRawValue(context, "result", "price-$100");
    }

    @Test
    public void reassignmentReplacesPreviousSimpleValue() {
        io.Cbuild.Env context = expand("""
value := first
value := second
value := third
""");

        assertRawValue(context, "value", "third");
    }


    @Test
    public void recursiveAssignmentCanBeReplacedBySimpleAssignment() {
        io.Cbuild.Env context = expand("""
dependency := old
value_ = $(dependency)
value_:= fixed
dependency := new
result := $(value_)
""");

        assertRawValue(context, "value_", "fixed");
        assertRawValue(context, "result", "fixed");
    }

    @Test
    public void recursiveVariableCanReferenceItselfAfterPreviouslyHavingSimpleValue() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
value := initial
value = $(value)
result := $(value)
"""));
    }

    @Test
    public void directCircularReferenceThrowsWhenExpanded() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
value = $(value)
result := $(value)
"""));
    }

    @Test
    public void twoNodeCircularReferenceThrowsWhenExpanded() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
first = $(second)
second = $(first)
result := $(first)
"""));
    }

    @Test
    public void threeNodeCircularReferenceThrowsWhenExpanded() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
first = $(second)
second = $(third)
third = $(first)
result := $(first)
"""));
    }

    @Test
    public void circularReferenceHiddenInsideLiteralTextThrows() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
a = prefix-$(b)-suffix
b = before-$(a)-after
result := $(a)
"""));
    }

    @Test
    public void circularReferenceThroughDynamicVariableNameThrows() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
selector = $(target)
target = $(selector)
value := $(config.$(selector))
"""));
    }

    @Test
    public void dynamicIdentifierThatResolvesBackToCurrentVariableThrows() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
selector := self
value = $(value.$(selector))
value.self = $(value)
result := $(value)
"""));
    }

    @Test
    public void circularReferenceReachedThroughNonCircularPrefixThrows() {
        Assertions.assertThrows(cbuildException.class, () -> expand("""
root = start-$(middle)
middle = center-$(end)
end = finish-$(middle)
result := $(root)
"""));
    }

    @Test
    public void unusedCircularVariablesDoNotPreventIndependentExpansion() {
        Env context = expand("""
a = $(b)
b = $(a)

safe := valid
result := $(safe)
""");

        assertRawValue(context, "safe", "valid");
        assertRawValue(context, "result", "valid");
    }


    private Env expand(String cBuildProgram) {
        Env context = new Env();
        List<cBuildIR.IR> ir = utils.generateIR(cBuildProgram);
        ySharpBackend backend = new ySharpBackend();
        Expansion expansion = new Expansion();
        expansion.expand(ir, context);
        return context;
    }

    private void assertRawValue(Env context, String variableName, String expectedValue) {
        Assertions.assertTrue(context.hasVariable(variableName), "Missing variable: " + variableName);
        Assertions.assertFalse(context.getVariable(variableName).isDeferred(),
                "Variable was not expanded: " + variableName);
        Assertions.assertEquals(expectedValue, context.getVariable(variableName).getRawValue());
    }
}
