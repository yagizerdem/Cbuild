package ysharpBackend;

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
        ySharpBackend backend = expand("""
base := core
literal := plain text
combined := prefix-$(base)-suffix
repeated := $(base)/$(base)/$(base)
""");

        assertRawValue(backend, "base", "core");
        assertRawValue(backend, "literal", "plain text");
        assertRawValue(backend, "combined", "prefix-core-suffix");
        assertRawValue(backend, "repeated", "core/core/core");
    }

    @Test
    public void recursiveAssignmentResolvesBasicReferencesWhenUsed() {
        ySharpBackend backend = expand("""
name = world
greeting = hello $(name)
punctuation = !
result := $(greeting)$(punctuation)
""");

        assertRawValue(backend, "name", "world");
        assertRawValue(backend, "greeting", "hello world");
        assertRawValue(backend, "punctuation", "!");
        assertRawValue(backend, "result", "hello world!");
    }

    @Test
    public void undefinedReferencesExpandToEmptyStringForBothAssignmentTypes() {
        ySharpBackend backend = expand("""
simple := before$(missing)after
recursive = left$(unknown)right
resolved := $(recursive)
""");

        assertRawValue(backend, "simple", "beforeafter");
        assertRawValue(backend, "recursive", "leftright");
        assertRawValue(backend, "resolved", "leftright");
    }

    @Test
    public void simpleAssignmentCapturesValueWhileRecursiveAssignmentUsesLatestValue() {
        ySharpBackend backend = expand("""
mode := debug
simple_snapshot := $(mode)
recursive_value = $(mode)
mode := release
recursive_result := $(recursive_value)
""");

        assertRawValue(backend, "mode", "release");
        assertRawValue(backend, "simple_snapshot", "debug");
        assertRawValue(backend, "recursive_value", "release");
        assertRawValue(backend, "recursive_result", "release");
    }

    @Test
    public void recursiveAssignmentSupportsForwardReferences() {
        ySharpBackend backend = expand("""
artifact = $(name)-$(version)-$(arch)
name := compiler
version := 2.1
arch := arm64
result := $(artifact)
""");

        assertRawValue(backend, "artifact", "compiler-2.1-arm64");
        assertRawValue(backend, "result", "compiler-2.1-arm64");
    }

    @Test
    public void nestedVariableNamesSelectConfigurationValues() {
        ySharpBackend backend = expand("""
env := prod
arch := arm64
profile.prod := release
tool.arm64 := clang
flags.release.clang := -O3 -DNDEBUG

selected_profile := $(profile.$(env))
selected_tool := $(tool.$(arch))
result := $(flags.$(selected_profile).$(selected_tool))
""");

        assertRawValue(backend, "selected_profile", "release");
        assertRawValue(backend, "selected_tool", "clang");
        assertRawValue(backend, "result", "-O3 -DNDEBUG");
    }

    @Test
    public void mixedAssignmentsResolveNestedDeferredSelectors() {
        ySharpBackend backend = expand("""
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

        assertRawValue(backend, "environment", "prod");
        assertRawValue(backend, "architecture", "arm64");
        assertRawValue(backend, "selected_profile", "release");
        assertRawValue(backend, "selected_compiler", "clang");
        assertRawValue(backend, "command", "clang -O3 -DNDEBUG");
        assertRawValue(backend, "result", "clang -O3 -DNDEBUG");
    }

    @Test
    public void deeplyNestedVariableNameCanResolveThroughMultipleLevels() {
        ySharpBackend backend = expand("""
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

        assertRawValue(backend, "selected_region", "eu");
        assertRawValue(backend, "selected_cluster", "primary");
        assertRawValue(backend, "selected_node", "node-07");
        assertRawValue(backend, "endpoint", "https://10.0.0.7/api");
        assertRawValue(backend, "result", "https://10.0.0.7/api");
    }

    @Test
    public void nestedSelectorsCanBuildSeveralPartsOfOneVariableName() {
        ySharpBackend backend = expand("""
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

        assertRawValue(backend, "selected_toolchain", "clang-18");
        assertRawValue(backend, "selected_prefix", "/opt/llvm");
        assertRawValue(backend, "compiler", "/opt/llvm/bin/clang");
        assertRawValue(backend, "result", "/opt/llvm/bin/clang");
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
        ySharpBackend backend = expand("""
mode = active
dep_active = $(mode)
result := $(dep_$(mode))
""");
        assertRawValue(backend, "result", "active");

    }

    @Test
    public void complexNestedDynamicIdentifierResolutionSuccess() {
        ySharpBackend backend = expand("""
suf := key
var_$(suf) := target_value
final_var = $(var_$(suf))
result := $(final_var)
""");

        backend.printSymbolTable();

        assertRawValue(backend, "result", "target_value");
    }

    @Test
    public void recursiveAssignmentObservesValueDefinedAfterAssignment() {
        ySharpBackend backend = expand("""
value_ = $(later)
later := resolved
result := $(value_)
""");

        assertRawValue(backend, "value_", "resolved");
        assertRawValue(backend, "result", "resolved");
    }

    @Test
    public void recursiveAssignmentObservesLatestReassignedValue() {
        ySharpBackend backend = expand("""
state := first
recursive = $(state)
state := second
result := $(recursive)
""");

        assertRawValue(backend, "recursive", "second");
        assertRawValue(backend, "result", "second");
    }

    @Test
    public void simpleAssignmentDoesNotObserveLaterReassignment() {
        ySharpBackend backend = expand("""
state := first
snapshot := $(state)
state := second
result := $(snapshot)
""");

        assertRawValue(backend, "snapshot", "first");
        assertRawValue(backend, "result", "first");
    }


    @Test
    public void recursiveChainResolvesThroughMultipleVariables() {
        ySharpBackend backend = expand("""
a = $(b)
b = $(c)
c = $(d)
d := final
result := $(a)
""");

        assertRawValue(backend, "a", "final");
        assertRawValue(backend, "b", "final");
        assertRawValue(backend, "c", "final");
        assertRawValue(backend, "result", "final");
    }

    @Test
    public void multipleReferencesToSameRecursiveVariableResolveConsistently() {
        ySharpBackend backend = expand("""
value_ = content
result := $(value_)-$(value_)-$(value_)
""");

        assertRawValue(backend, "result", "content-content-content");
    }

    @Test
    public void undefinedVariableBetweenDefinedVariablesExpandsToEmptyString() {
        ySharpBackend backend = expand("""
left := alpha
right := omega
result := $(left)$(missing)$(right)
""");

        assertRawValue(backend, "result", "alphaomega");
    }

    @Test
    public void completelyUndefinedVariableExpandsToEmptyString() {
        ySharpBackend backend = expand("""
result := $(does_not_exist)
""");

        assertRawValue(backend, "result", "");
    }

    @Test
    public void recursiveEmptyVariableCanBeReferenced() {
        ySharpBackend backend = expand("""
empty =
result := before$(empty)after
""");

        assertRawValue(backend, "empty", "");
        assertRawValue(backend, "result", "beforeafter");
    }

    @Test
    public void variableValueContainingSpacesIsPreserved() {
        ySharpBackend backend = expand("""
message := hello from ysharp backend
result := prefix $(message) suffix
""");

        assertRawValue(backend, "message", "hello from ysharp backend");
        assertRawValue(backend, "result", "prefix hello from ysharp backend suffix");
    }

    @Test
    public void unicodeVariableNameCanBeResolved() {
        ySharpBackend backend = expand("""
şehir := izmir
sonuç := $(şehir)
""");

        assertRawValue(backend, "şehir", "izmir");
        assertRawValue(backend, "sonuç", "izmir");
    }

    @Test
    public void unicodeVariableValueIsPreserved() {
        ySharpBackend backend = expand("""
message := çığ şükrü ğözü
result := $(message)
""");

        assertRawValue(backend, "result", "çığ şükrü ğözü");
    }

    @Test
    public void variableNamesWithDotsResolveNormally() {
        ySharpBackend backend = expand("""
config.database.host := localhost
config.database.port := 5432
connection := $(config.database.host):$(config.database.port)
""");

        assertRawValue(backend, "connection", "localhost:5432");
    }

    @Test
    public void dynamicVariableIdentifierCanUseTwoSelectors() {
        ySharpBackend backend = expand("""
platform := linux
architecture := x64
compiler.linux.x64 := gcc
result := $(compiler.$(platform).$(architecture))
""");

        assertRawValue(backend, "result", "gcc");
    }

    @Test
    public void dynamicVariableIdentifierCanContainLiteralPrefixAndSuffix() {
        ySharpBackend backend = expand("""
mode := release
config.release.value := optimized
result := $(config.$(mode).value)
""");

        assertRawValue(backend, "result", "optimized");
    }

    @Test
    public void dynamicVariableIdentifierCanResolveFromRecursiveSelector() {
        ySharpBackend backend = expand("""
environment = production
url.production := https://example.com
result := $(url.$(environment))
""");

        assertRawValue(backend, "result", "https://example.com");
    }

    @Test
    public void dynamicVariableIdentifierUsesLatestSelectorValue() {
        ySharpBackend backend = expand("""
environment := development
url.development := localhost
url.production := example.com
selected = $(url.$(environment))
environment := production
result := $(selected)
""");

        assertRawValue(backend, "selected", "example.com");
        assertRawValue(backend, "result", "example.com");
    }

    @Test
    public void simpleDynamicVariableIdentifierCapturesCurrentSelectorValue() {
        ySharpBackend backend = expand("""
environment := development
url.development := localhost
url.production := example.com
selected := $(url.$(environment))
environment := production
result := $(selected)
""");

        assertRawValue(backend, "selected", "localhost");
        assertRawValue(backend, "result", "localhost");
    }

    @Test
    public void dynamicIdentifierWithUndefinedSelectorResolvesToMatchingLiteralName() {
        ySharpBackend backend = expand("""
config. := fallback
result := $(config.$(missing))
""");

        assertRawValue(backend, "result", "fallback");
    }

    @Test
    public void nestedDynamicIdentifierCanResolveSelectorFromAnotherDynamicIdentifier() {
        ySharpBackend backend = expand("""
environment := prod
region.prod := eu
server.eu := api-01
result := $(server.$(region.$(environment)))
""");

        assertRawValue(backend, "result", "api-01");
    }

    @Test
    public void nestedDynamicIdentifierCanResolveSeveralNestedLevelsInline() {
        ySharpBackend backend = expand("""
stage := prod
region.prod := eu
cluster.eu := primary
host.primary := server-01
result := $(host.$(cluster.$(region.$(stage))))
""");

        assertRawValue(backend, "result", "server-01");
    }

    @Test
    public void dynamicAssignmentNameCanBeReferencedLater() {
        ySharpBackend backend = expand("""
suffix_ := debug
build.$(suffix_) := enabled
result := $(build.debug)
""");

        assertRawValue(backend, "build.debug", "enabled");
        assertRawValue(backend, "result", "enabled");
    }

    @Test
    public void dynamicAssignmentNameCanContainMultipleExpandedParts() {
        ySharpBackend backend = expand("""
os := linux
arch := arm64
tool.$(os).$(arch) := clang
result := $(tool.linux.arm64)
""");

        assertRawValue(backend, "tool.linux.arm64", "clang");
        assertRawValue(backend, "result", "clang");
    }

    @Test
    public void dynamicAssignmentNameCanUseRecursiveSelector() {
        ySharpBackend backend = expand("""
selector = active
state.$(selector) := running
result := $(state.active)
""");

        assertRawValue(backend, "state.active", "running");
        assertRawValue(backend, "result", "running");
    }

    @Test
    public void valueCanContainDollarCharacterWithoutVariableReference() {
        ySharpBackend backend = expand("""
currency := dollar
result := price-$(currency)
""");

        assertRawValue(backend, "result", "price-dollar");
    }

    @Test
    public void escapedDollarIsPreservedAsLiteralDollar() {
        ySharpBackend backend = expand("""
result := price-$$100
""");

        assertRawValue(backend, "result", "price-$100");
    }

    @Test
    public void reassignmentReplacesPreviousSimpleValue() {
        ySharpBackend backend = expand("""
value := first
value := second
value := third
""");

        assertRawValue(backend, "value", "third");
    }


    @Test
    public void recursiveAssignmentCanBeReplacedBySimpleAssignment() {
        ySharpBackend backend = expand("""
dependency := old
value_ = $(dependency)
value_:= fixed
dependency := new
result := $(value_)
""");

        assertRawValue(backend, "value_", "fixed");
        assertRawValue(backend, "result", "fixed");
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
        ySharpBackend backend = expand("""
a = $(b)
b = $(a)

safe := valid
result := $(safe)
""");

        assertRawValue(backend, "safe", "valid");
        assertRawValue(backend, "result", "valid");
    }


    private ySharpBackend expand(String cBuildProgram) {
        List<cBuildIR.IR> ir = utils.generateIR(cBuildProgram);
        ySharpBackend backend = new ySharpBackend();
        backend.expand(ir);
        return backend;
    }

    private void assertRawValue(ySharpBackend backend, String variableName, String expectedValue) {
        Assertions.assertTrue(backend.hasVariable(variableName), "Missing variable: " + variableName);
        Assertions.assertFalse(backend.getVariable(variableName).isDeferred(),
                "Variable was not expanded: " + variableName);
        Assertions.assertEquals(expectedValue, backend.getVariable(variableName).getRawValue());
    }
}
