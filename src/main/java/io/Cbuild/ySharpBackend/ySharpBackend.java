package io.Cbuild.ySharpBackend;

import io.Cbuild.*;

import java.time.Instant;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

public class ySharpBackend {

    private final Env globalContext;

    public ySharpBackend() {
        this.globalContext = new Env();
    }

    public ySharpBackend(Env context) {
        this.globalContext = context;
    }

    public Env getGlobalContext() {
        return this.globalContext;
    }

    public void validateCompatibility(List<cBuildIR.IR> instructions) {
        for (cBuildIR.IR ir : instructions) {
            validateIR(ir);
        }
    }

    public boolean isCompatible(List<cBuildIR.IR> instructions) {
        try {
            validateCompatibility(instructions);
            return true;
        } catch (cbuildException exception) {
            return false;
        }
    }

    private void validateIR(cBuildIR.IR ir) {
        if (!allowedIR(ir)) {
            throw incompatible(
                    ir,
                    "Unsupported IR type for ySharp backend: "
                            + ir.getClass().getSimpleName()
            );
        }

        if (ir instanceof cBuildIR.AssignmentIR assignmentIR) {
            validateAssignment(assignmentIR);
            return;
        }

        if (ir instanceof cBuildIR.NormalRuleIR normalRuleIR) {
            validateNormalRule(normalRuleIR);
        }
    }

    private void validateAssignment(cBuildIR.AssignmentIR assignmentIR) {
        validateParts(
                assignmentIR.left.parts,
                assignmentIR,
                "Assignment left-hand side"
        );

        validateParts(
                assignmentIR.right.parts,
                assignmentIR,
                "Assignment right-hand side"
        );

        if (assignmentIR.prefix != null) {
            String prefix = assignmentIR.prefix.getPrefix();

            if (prefix != null && !prefix.isBlank()) {
                throw incompatible(
                        assignmentIR,
                        "Assignment prefixes are not supported by the ySharp backend: "
                                + prefix
                );
            }
        }
    }

    private void validateNormalRule(cBuildIR.NormalRuleIR normalRuleIR) {
        if (!normalRuleIR.orderonlyprerequisites.isEmpty()) {
            throw incompatible(
                    normalRuleIR,
                    "Order-only prerequisites are not supported by the ySharp backend"
            );
        }

        for (var target : normalRuleIR.targets) {
            validateParts(
                    target.parts,
                    normalRuleIR,
                    "Rule target"
            );
        }

        for (var prerequisite : normalRuleIR.prerequisites) {
            validateParts(
                    prerequisite.parts,
                    normalRuleIR,
                    "Rule prerequisite"
            );
        }

        for (var recipe : normalRuleIR.recipes) {
            if (recipe.conditional != null) {
                throw incompatible(
                        normalRuleIR,
                        "Conditional recipes are not supported by the ySharp backend"
                );
            }
        }
    }

    private void validateParts(
            List<cBuildIR.ValuePart> parts,
            cBuildIR.IR owner,
            String context
    ) {
        for (cBuildIR.ValuePart part : parts) {
            if (part instanceof cBuildIR.FunctionCallPart functionCallPart) {
                throw incompatible(
                        owner,
                        context + " contains an unsupported function call: "
                                + functionCallPart
                );
            }
        }
    }

    private boolean validateAssignmentFlavor(cBuildIR.AssignmentType type) {
        return type == cBuildIR.AssignmentType.RECURSIVE
                || type == cBuildIR.AssignmentType.SIMPLE;
    }

    private boolean allowedIR(cBuildIR.IR ir) {
        return ir instanceof cBuildIR.AssignmentIR
                || ir instanceof cBuildIR.YsharpHookIR
                || ir instanceof cBuildIR.NormalRuleIR;
    }

    private cbuildException incompatible(cBuildIR.IR ir, String message) {

        return new cbuildException(
                cbuildException.ErrorType.SEMANTIC,
                message,
                ir.getRow(),
                ir.getCol()
        );
    }

    public static class yModel {

        public static abstract class yBaseModel {

            public final String uuid;

            public yBaseModel() {
                this.uuid = util.uuid();
            }

            @Override
            public String toString() {
                return "<BaseModel>";
            }
        }

        public static class NormalRule extends yBaseModel {
            public String target;
            public List<String> prerequisites;
            public List<String> shellCommands;
            public List<cBuildIR.RecipeIR> recipeIRS;
            public cBuildIR.NormalRuleIR normalRuleIR;

            public NormalRule() {
                super();
            }

            public NormalRule(String target) {
                super();
                this.target = target;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites,
                    List<String> shellCommands
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
                this.shellCommands = shellCommands;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites,
                    List<String> shellCommands,
                    List<cBuildIR.RecipeIR> recipeIRS
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
                this.shellCommands = shellCommands;
                this.recipeIRS = recipeIRS;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites,
                    List<String> shellCommands,
                    cBuildIR.NormalRuleIR normalRuleIR
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
                this.shellCommands = shellCommands;
                this.normalRuleIR = normalRuleIR;
            }

            public NormalRule(
                    String target,
                    List<String> prerequisites,
                    List<String> shellCommands,
                    List<cBuildIR.RecipeIR> recipeIRS,
                    cBuildIR.NormalRuleIR normalRuleIR
            ) {
                this.target = target;
                this.prerequisites = prerequisites;
                this.shellCommands = shellCommands;
                this.recipeIRS = recipeIRS;
                this.normalRuleIR = normalRuleIR;
            }

            @Override
            public String toString() {
                return """
                NormalRule {
                  target='%s',
                  prerequisites=%s,
                  shellCommands=%s,
                  recipeIRS=%s,
                  normalRuleIR=%s
                }
                """.formatted(
                        target,
                        prerequisites,
                        shellCommands,
                        recipeIRS,
                        normalRuleIR
                );
            }
        }
    }


    public static class yModelBuilder extends ExecIR.BaseExecIR {

        public final List<yModel.yBaseModel> ruleModels;
        public final Env context;

        public yModelBuilder(Env context) {
            this.context = context;
            this.ruleModels = new ArrayList<>();
        }

        public List<yModel.yBaseModel> build(List<cBuildIR.IR> instructions) {
            for(int i = 0; i < instructions.size(); i++) {
                Object response = instructions.get(i).exec(this);
                collectModels(this.ruleModels, response);
            }
            return this.ruleModels;
        }

        public List<yModel.yBaseModel> collectModels(List<yModel.yBaseModel> target, Object resources) {
            if(resources instanceof List<?> list) {
                for(var item : list) {
                    if(item instanceof yModel.yBaseModel model) {
                        target.add(model);
                    }
                }
            }
            if(resources instanceof yModel.yBaseModel model) {
                target.add(model);
            }
            return target;
        }

        @Override
        public List<yModel.yBaseModel> exec(cBuildIR.NormalRuleIR ir) {
            List<yModel.yBaseModel> rules = new ArrayList<>();
            Expansion expansion = new Expansion();
            List<String> targets = new ArrayList<>();
            List<String> preq = new ArrayList<>();
            for(cBuildIR.ValueIR valueIR : ir.targets) {
                String expansionResult = expansion.expandValue(valueIR, context);
                targets.addAll(Arrays.stream(expansionResult.split("\\s+"))
                        .filter(x ->  !x.trim().isBlank()).toList());
            }

            for(cBuildIR.ValueIR valueIR : ir.prerequisites) {
                String expansionResult = expansion.expandValue(valueIR, context);
                preq.addAll(Arrays.stream(expansionResult.split("\\s+"))
                        .filter(x ->  !x.trim().isBlank()).toList());
            }

            for(String target : targets) {
                yModel.NormalRule rule = new yModel.NormalRule();
                rule.target = target;
                rule.prerequisites = new ArrayList<>(preq);
                rule.normalRuleIR = ir;
                rule.recipeIRS = new ArrayList<>(ir.recipes);
                rules.add(rule);
            }

            return rules;
        }

        @Override
        public Void exec(cBuildIR.AssignmentIR ir) {
            Expansion.ySharpExpansionEngine expansionEngine =
                    new Expansion.ySharpExpansionEngine(this.context);
            ir.exec(expansionEngine);
            return null;
        }

//        @Override
//        public <T> T exec(cBuildIR.RecipeIR ir) {
//            return super.exec(ir);
//        }
    }

    public List<yModel.yBaseModel> build(List<cBuildIR.IR> instructions) {
        yModelBuilder builder = new yModelBuilder(this.globalContext);
        List<yModel.yBaseModel> models = builder.build(instructions);
        return models;
    }

    public List<yModel.yBaseModel> build(List<cBuildIR.IR> instructions, Env context) {
        yModelBuilder builder = new yModelBuilder(context);
        List<yModel.yBaseModel> models = builder.build(instructions);
        return models;
    }

    public void printModel(yModel.yBaseModel model) {
        System.out.println(model.toString());
    }

    public void printModel(List<? extends yModel.yBaseModel> models) {
        models.forEach(model -> {
            System.out.println(model.toString());
        });
    }

    public void printModel(yModel.NormalRule rule) {
        System.out.println(rule.toString());
    }



    public boolean hasCircularDependency(List<yModel.NormalRule> rules) {
        Map<String, List<String>> graph = new HashMap<>();

        for (yModel.NormalRule rule : rules) {
            graph.computeIfAbsent(
                    rule.target,
                    ignored -> new ArrayList<>()
            ).addAll(rule.prerequisites);
        }

        Set<String> visited = new HashSet<>();
        Set<String> activePath = new HashSet<>();

        for (String target : graph.keySet()) {
            if (hasCircularDependencyRecursive(
                    target,
                    graph,
                    visited,
                    activePath
            )) {
                return true;
            }
        }

        return false;
    }

    private boolean hasCircularDependencyRecursive(
            String target,
            Map<String, List<String>> graph,
            Set<String> visited,
            Set<String> activePath
    ) {
        if (activePath.contains(target)) {
            return true;
        }

        if (visited.contains(target)) {
            return false;
        }

        activePath.add(target);

        for (String prerequisite :
                graph.getOrDefault(target, List.of())) {

            if (graph.containsKey(prerequisite)
                    && hasCircularDependencyRecursive(
                    prerequisite,
                    graph,
                    visited,
                    activePath
            )) {
                return true;
            }
        }

        activePath.remove(target);
        visited.add(target);

        return false;
    }

    public List<yModel.NormalRule> getTargetSubgraph(
            List<yModel.NormalRule> rules,
            String activeTarget
    ) {
        List<yModel.NormalRule> subGraph = new ArrayList<>();
        Stack<String> stack = new Stack<>();
        Set<String> visitedTargets = new HashSet<>();

        stack.push(activeTarget);

        while (!stack.isEmpty()) {
            String currentTarget = stack.pop();

            if (!visitedTargets.add(currentTarget)) {
                continue;
            }

            for (yModel.NormalRule rule : rules) {
                if (rule.target.equals(currentTarget)) {
                    subGraph.add(rule);
                    stack.addAll(rule.prerequisites);
                }
            }
        }

        if (hasCircularDependency(subGraph)) {
            throw new cbuildException(
                    cbuildException.ErrorType.SEMANTIC,
                    "Circular dependency detected while resolving target '"
                            + activeTarget
                            + "'."
            );
        }

        return subGraph;
    }

    public List<yModel.NormalRule> getTargetSubgraph(
            List<yModel.NormalRule> rules
    ) {
        return getTargetSubgraph(rules, findDefaultTarget(rules));
    }

    public String findDefaultTarget(List<yModel.NormalRule> rules) {
        if(rules.isEmpty()) return null;
        return rules.getFirst().target;
    }

    public yModel.NormalRule findTarget(List<yModel.NormalRule> rules, String target) {
        for(yModel.NormalRule rule : rules) {
            if(rule.target.equals(target)) return rule;
        }
        throw new cbuildException(cbuildException.ErrorType.PROCESS, "Target not found: " + target);
    }

    public List<yModel.NormalRule> findTargetList(List<yModel.NormalRule> rules, String target) {
        List<yModel.NormalRule> targetRules =
                rules.stream().filter(r -> r.target.equals(target))
                .toList();

        if(targetRules.isEmpty())  throw new cbuildException(cbuildException.ErrorType.PROCESS, "Target not found: " + target);
        return targetRules;
    }

    public yModel.NormalRule findRuleByUUID(List<yModel.NormalRule> rules, String uuid) {
        for(yModel.NormalRule rule : rules) {
            if(rule.uuid.equals(uuid)) return rule;
        }
        throw new RuntimeException(String.format("rule with uuid %s not found", uuid));
    }

    // preserve order of targets
    public List<String> findTopLevelTargets(
            List<yModel.NormalRule> rules
    ) {
        Set<String> prerequisiteTargets = rules.stream()
                .flatMap(rule -> rule.prerequisites.stream())
                .collect(Collectors.toSet());

        return rules.stream()
                .map(rule -> rule.target)
                .distinct()
                .filter(target -> !prerequisiteTargets.contains(target))
                .toList();
    }


    public List<List<yModel.NormalRule>> getAllSubgraphs(
            List<yModel.NormalRule> rules
    ) {
        List<List<yModel.NormalRule>> subGraphs = new ArrayList<>();
        List<String> topLevelTargets = findTopLevelTargets(rules);
        topLevelTargets.forEach(target -> {
            subGraphs.add(getTargetSubgraph(rules, target));
        });
        return subGraphs;
    }

    public List<yModel.NormalRule> topologicalSort(
            List<yModel.NormalRule> graph,
            yModel.NormalRule startNode
    ) {
        Map<String, List<yModel.NormalRule>> rulesByTarget =
                new LinkedHashMap<>();

        for (yModel.NormalRule rule : graph) {
            rulesByTarget
                    .computeIfAbsent(
                            rule.target,
                            ignored -> new ArrayList<>()
                    )
                    .add(rule);
        }

        List<yModel.NormalRule> sorted = new ArrayList<>();
        Set<String> visitingTargets = new HashSet<>();
        Set<String> visitedTargets = new HashSet<>();

        topologicalSort(
                startNode.target,
                rulesByTarget,
                visitingTargets,
                visitedTargets,
                sorted
        );

        sorted = sorted.reversed();
        return sorted;
    }

    private void topologicalSort(
            String target,
            Map<String, List<yModel.NormalRule>> rulesByTarget,
            Set<String> visitingTargets,
            Set<String> visitedTargets,
            List<yModel.NormalRule> sorted
    ) {
        if (visitedTargets.contains(target)) {
            return;
        }

        if (!visitingTargets.add(target)) {
            throw new cbuildException(
                    cbuildException.ErrorType.SEMANTIC,
                    "Circular dependency detected while sorting target '"
                            + target
                            + "'."
            );
        }

        List<yModel.NormalRule> targetRules =
                rulesByTarget.getOrDefault(target, List.of());

        for (yModel.NormalRule rule : targetRules) {
            for (String prerequisite : rule.prerequisites) {
                if (rulesByTarget.containsKey(prerequisite)) {
                    topologicalSort(
                            prerequisite,
                            rulesByTarget,
                            visitingTargets,
                            visitedTargets,
                            sorted
                    );
                }
            }
        }

        visitingTargets.remove(target);
        visitedTargets.add(target);
        sorted.addAll(targetRules);
    }

    public boolean isOutOfDate(yModel.NormalRule rule) {
        if(!util.fileExist(rule.target)) return true;

        String targetEntryPath = util.getAbsolutePath(rule.target);
        Instant lastModifiedDateOfTarget = util.getLastModifiedDate(targetEntryPath);

        for(String preq : rule.prerequisites) {
            boolean exist = util.fileExist(preq);
            if(!exist) return true;

            String fileSystemEntryPath = util.getAbsolutePath(preq);
            Instant lastModifiedDateOfPreq = util.getLastModifiedDate(fileSystemEntryPath);

            if(lastModifiedDateOfPreq.isAfter(lastModifiedDateOfTarget)) return true;
        }

        return false;
    }


    public void buildTargetsParallel(List<yModel.NormalRule> rules) {
        int parallelism = Math.max(1, Runtime.getRuntime().availableProcessors());
        buildTargetsParallel(rules, parallelism);
    }

    private Map<String, List<String>> buildTargetDependencyGraph(
            List<yModel.NormalRule> rules
    ) {
        Map<String, List<String>> targetGraph = new LinkedHashMap<>();

        rules.forEach(rule -> targetGraph
                .computeIfAbsent(rule.target, ignored -> new ArrayList<>())
                .addAll(rule.prerequisites)
        );

        return targetGraph;
    }

    private Map<String, List<String>> buildTargetDependencyReverseGraph(
            List<yModel.NormalRule> rules
    ) {
        Set<String> preq = rules.stream()
                .map(r -> r.target)
                .collect(Collectors.toSet());


        Map<String, List<String>> reverseTargetGraph = new LinkedHashMap<>();

        preq.forEach(p -> {
                reverseTargetGraph
                        .computeIfAbsent(p, ignored -> new ArrayList<>())
                        .addAll(rules.stream()
                                .filter(rule -> rule.prerequisites.contains(p))
                                .map(r -> r.target)
                                .collect(Collectors.toSet())
                                .stream()
                                .toList());

            }
        );

        return reverseTargetGraph;
    }

    public void printGraph(Map<String, List<String>> graph) {
        StringBuilder builder = new StringBuilder();
        for(String key : graph.keySet()) {
            builder.append(String.format("%s -> : [ ", key));
            for(int i = 0; i < graph.get(key).size(); i++) {
                builder.append(String.format( i == 0 ?  "%s" :  ", %s", graph.get(key).get(i)));
            }
            builder.append(" ]");
            builder.append("\n");
        }
        System.out.println(builder.toString());
    }

    public void buildTargetsParallel(List<yModel.NormalRule> rules, int parallelism) {
        try {
            // create hash table based graph this makes easier to
            Map<String, List<String>> targetGraph = this.buildTargetDependencyGraph(rules);
            Map<String, List<String>> reverseTargetGraph = this.buildTargetDependencyReverseGraph(rules);

            // holds how many unfinished preq's to build
            Map<String, Integer> depqCounter = new LinkedHashMap<>();
            for(String key : targetGraph.keySet()) {
                depqCounter.put(key, targetGraph.get(key).stream().filter(targetGraph::containsKey).toList().size());
            }

            ExecutorService executorService = Executors.newCachedThreadPool();

            AtomicInteger buildCount = new AtomicInteger(0);
            AtomicInteger activeThreadCount = new AtomicInteger(0);
            /** get targets with all depq compiled, in initial phase
             * this means targets with no depq in graph
             */


            Stack<String> activeTargets = targetGraph.keySet().stream().filter(
                    k -> depqCounter.get(k) == 0
            ).collect(Collectors.toSet())
                    .stream().collect(Collectors.toCollection(Stack::new));
            List<Future<String>> activeThreadsPool = new ArrayList<>();


            Thread schedulerThread = new Thread(() -> {
                try {
                    while (buildCount.get() < targetGraph.size()) {
                        int threadDiff = Math.max(0, parallelism - activeThreadCount.get());
                        if(threadDiff <= 0) {
                            Thread.sleep(200);
                            continue;
                        }
                        for(int i = 0; i < threadDiff; i++) {
                            if(!activeTargets.isEmpty()) {
                                String activeTarget = activeTargets.pop();
                                Future<String> future = buildTargetAsync(executorService, findTarget(rules, activeTarget));
                                activeThreadsPool.add(future);
                                activeThreadCount.getAndIncrement();
                            }
                        }

                        Thread.sleep(200);
                    }
                } catch (InterruptedException ex) {

                }
            });

            Thread completionThread = new Thread(() -> {
                try {
                    while (buildCount.get() < targetGraph.size()) {
                        if(!activeThreadsPool.isEmpty())  {
                            Future<String> future = activeThreadsPool.removeFirst();
                            String uuid = future.get();
                            activeThreadCount.getAndDecrement();
                            buildCount.getAndIncrement();

                            yModel.NormalRule rule = findRuleByUUID(rules, uuid);
                            String target = rule.target;
                            List<String> targetsThatAffectedByBuild = reverseTargetGraph.get(target);
                            for(String t : targetsThatAffectedByBuild) {
                                depqCounter.put(t, depqCounter.get(t) - 1);

                                // check all preqs of target had been built, means 0 depq after decement
                                if(depqCounter.get(t) == 0) {
                                    activeTargets.push(t);
                                }
                            }
                        }
                    }
                } catch (InterruptedException ex) {

                }
                catch (ExecutionException ex) {

                }

            });

            schedulerThread.start();
            completionThread.start();

            schedulerThread.join();
            completionThread.join();

            executorService.close();

        } catch (Exception ex) {

        }


    }


    // sync build
    public void buildTargetsSequential(List<yModel.NormalRule> rules) {
        buildTargetsSequential(rules, findDefaultTarget(rules));
    }

    public void buildTargetsSequential(List<yModel.NormalRule> rules, String startNode) {
        buildTargetsSequential(rules, findTarget(rules, startNode));
    }

    public void buildTargetsSequential(List<yModel.NormalRule> rules, yModel.NormalRule startNode) {
        // hasCircularDependency(rules)
        rules = topologicalSort(rules, startNode);

        Expansion.ySharpRecipeExpansionEngine recipeExpansionEngine =
                new Expansion.ySharpRecipeExpansionEngine(this.globalContext);

        shell sh = new shell();

        for(int i = 0; i < rules.size(); i++) {
            yModel.NormalRule current = rules.get(i);

            if(!isOutOfDate(current)) continue;

            for(cBuildIR.RecipeIR recipeIR : current.recipeIRS) {
                // expand recipe before executing
                String expandedRecipe = recipeIR.exec(recipeExpansionEngine);
                shell.ExecutionResult result = sh.runCommandCaptured(expandedRecipe);
                if(result.isSuccess) {
                    System.out.println(expandedRecipe);
                    String normalizedStdout = result.stdOut.trim();
                    if(normalizedStdout.endsWith("\n")) normalizedStdout = normalizedStdout.substring(0, normalizedStdout.length() -1);
                    System.out.println(normalizedStdout);
                }
            }

        }
    }


    // async build

    public Future<String> buildTargetAsync(ExecutorService executorService, yModel.NormalRule rule) {
        CompletableFuture<String> completableFuture = new CompletableFuture<>();
        if(!isOutOfDate(rule)) {
            completableFuture.complete(rule.uuid);
            return completableFuture;
        }


        Expansion.ySharpRecipeExpansionEngine recipeExpansionEngine =
                new Expansion.ySharpRecipeExpansionEngine(this.globalContext);

        shell sh = new shell();

        executorService.submit(() -> {
            for(cBuildIR.RecipeIR recipeIR : rule.recipeIRS) {
                // expand recipe before executing
                String expandedRecipe = recipeIR.exec(recipeExpansionEngine);
                shell.ExecutionResult result = sh.runCommandCaptured(expandedRecipe);
                if(result.isSuccess) {
                    System.out.println(expandedRecipe);
                    String normalizedStdout = result.stdOut.trim();
                    if(normalizedStdout.endsWith("\n")) normalizedStdout = normalizedStdout.substring(0, normalizedStdout.length() -1);
                    System.out.println(normalizedStdout);
                }
            }
            completableFuture.complete(rule.uuid);
        });


        return completableFuture;
    }

}