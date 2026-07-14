package ysharpBackend;

import io.Cbuild.Env;
import io.Cbuild.cBuildIR;
import io.Cbuild.ySharpBackend.ySharpBackend;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import util.utils;

import java.util.List;

public class CircularDependencyTest {

    @Test
    public void detectsTwoNodeCycle() {
        Assertions.assertTrue(hasCycle("""
a: b
b: a
"""));
    }

    @Test
    public void detectsDirectSelfDependency() {
        Assertions.assertTrue(hasCycle("""
app: app
"""));
    }

    @Test
    public void detectsThreeNodeCycle() {
        Assertions.assertTrue(hasCycle("""
a: b
b: c
c: a
"""));
    }

    @Test
    public void detectsCycleInsideLongDependencyChain() {
        Assertions.assertTrue(hasCycle("""
app: compile
compile: objects
objects: generated
generated: schema
schema: objects
"""));
    }

    @Test
    public void detectsCycleWithAdditionalLeafPrerequisites() {
        Assertions.assertTrue(hasCycle("""
app: main.c library
library: library.c headers
headers: common.h library
"""));
    }

    @Test
    public void detectsCycleInDisconnectedComponent() {
        Assertions.assertTrue(hasCycle("""
app: main.c
main.c: main.h
main.h:

first: second
second: third
third: first
"""));
    }

    @Test
    public void detectsCycleRegardlessOfRuleOrder() {
        Assertions.assertTrue(hasCycle("""
c: a
b: c
a: b
"""));
    }

    @Test
    public void detectsCycleCreatedByExpandedVariables() {
        Assertions.assertTrue(hasCycle("""
first := a
second := b

$(first): $(second)
$(second): $(first)
"""));
    }

    @Test
    public void detectsCycleCreatedByRecursiveAssignments() {
        Assertions.assertTrue(hasCycle("""
first = module-a
second = module-b

$(first): $(second)
$(second): $(first)
"""));
    }

    @Test
    public void detectsCycleWhenTargetHasMultiplePrerequisites() {
        Assertions.assertTrue(hasCycle("""
app: config main.c library
config:
main.c:
library: objects
objects: app
"""));
    }

    @Test
    public void emptyGraphHasNoCycle() {
        Assertions.assertFalse(hasCycle(""));
    }

    @Test
    public void assignmentOnlyProgramHasNoCycle() {
        Assertions.assertFalse(hasCycle("""
target := app
sources = main.c util.c
"""));
    }

    @Test
    public void singleRuleWithoutPrerequisitesHasNoCycle() {
        Assertions.assertFalse(hasCycle("""
app:
"""));
    }

    @Test
    public void singleRuleWithExternalPrerequisitesHasNoCycle() {
        Assertions.assertFalse(hasCycle("""
app: main.c main.h external-library
"""));
    }

    @Test
    public void linearDependencyChainHasNoCycle() {
        Assertions.assertFalse(hasCycle("""
app: main.o
main.o: main.c
main.c: main.h
main.h: common.h
common.h:
"""));
    }

    @Test
    public void diamondDependencyGraphHasNoCycle() {
        Assertions.assertFalse(hasCycle("""
app: left right
left: common
right: common
common:
"""));
    }

    @Test
    public void multipleBranchesSharingDependencyHaveNoCycle() {
        Assertions.assertFalse(hasCycle("""
app: parser compiler linker
parser: common generated
compiler: common generated
linker: common
generated: schema
common:
schema:
"""));
    }

    @Test
    public void edgeToPreviouslyVisitedNodeIsNotCycle() {
        Assertions.assertFalse(hasCycle("""
root: left right
left: common
right: left
common:
"""));
    }

    @Test
    public void disconnectedEdgeIntoPreviousComponentIsNotCycle() {
        Assertions.assertFalse(hasCycle("""
a: b
b:

x: a
"""));
    }

    @Test
    public void multipleDisconnectedAcyclicComponentsHaveNoCycle() {
        Assertions.assertFalse(hasCycle("""
app: main
main: source
source:

tests: test-source
test-source: fixtures
fixtures:

docs: readme
readme:
"""));
    }

    @Test
    public void duplicateTargetRulesWithoutBackEdgeHaveNoCycle() {
        Assertions.assertFalse(hasCycle("""
app: main.c
app: util.c
main.c: common.h
util.c: common.h
common.h:
"""));
    }

    @Test
    public void expandedAcyclicGraphHasNoCycle() {
        Assertions.assertFalse(hasCycle("""
target := app
sources := main.c util.c
header = common.h

$(target): $(sources)
main.c: $(header)
util.c: $(header)
common.h:
"""));
    }


    @Test
    public void detectIndependentIsland() {
        Assertions.assertTrue(hasCycle("""
app : main.c main.h

a : b
b : a
"""));
    }


    @Test
    public void detectIndependentIsland2() {
        Assertions.assertFalse(hasCycle("""
app : main.c main.h

a : x
b : y
"""));
    }


    private boolean hasCycle(String cBuildProgram) {
        List<cBuildIR.IR> instructions =
                utils.generateIR(cBuildProgram);

        ySharpBackend backend =
                new ySharpBackend(new Env());

        List<ySharpBackend.yModel.yBaseModel> models =
                utils.generateYsharpGraph(instructions, backend);

        List<ySharpBackend.yModel.NormalRule> rules =
                utils.convertToNormalRule(models);

        return backend.hasCircularDependency(rules);
    }
}