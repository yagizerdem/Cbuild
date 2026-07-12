package ysharpBackend;

import io.Cbuild.cBuildIR;
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
