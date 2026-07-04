package io.Cbuild;

import java.util.List;

public class Model {

    public interface LineItem {}

    public static class Target {
        String name;
        boolean phony;
    }

    public static class Prerequisite implements LineItem {
        String name;
        boolean orderOnly;
    }

    public static class RecipeLine implements LineItem {
        String rawText;
        boolean silent;       // @
        boolean ignoreError;  // -
        boolean alwaysRun;    // +
    }

    public static class RuleDecl implements LineItem {
        List<Target> targets;
        List<Prerequisite> prerequisites;
        List<RecipeLine> recipe;
        // SourceLocation location;
    }
}
