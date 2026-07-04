package io.Cbuild;

import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

public class Env {

    private static final Env INSTANCE = new Env();

    private final Map<String, String> variables = new HashMap<>();


    private Path workingDirectory;
    private Path projectRoot;

    private Env() {}

    public static Env getInstance() {
        return INSTANCE;
    }

    public Map<String, String> getVariables() {
        return this.variables;
    }

}
