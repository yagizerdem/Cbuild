package io.Cbuild;

import picocli.CommandLine;

import java.util.*;

public class cli {


    public static final class CliParseResponse {

        private final boolean successful;
        private final List<Exception> exceptions;
        private final CLI_OPTIONS options;

        private CliParseResponse(
                boolean successful,
                CLI_OPTIONS options,
                List<? extends Exception> exceptions
        ) {
            this.successful = successful;
            this.options = options;
            this.exceptions = Collections.unmodifiableList(
                    new ArrayList<>(
                            Objects.requireNonNull(
                                    exceptions,
                                    "exceptions cannot be null"
                            )
                    )
            );

            if (successful && options == null) {
                throw new IllegalArgumentException(
                        "A successful parse response must contain parsed options"
                );
            }

            if (successful && !this.exceptions.isEmpty()) {
                throw new IllegalArgumentException(
                        "A successful parse response cannot contain exceptions"
                );
            }

            if (!successful && this.exceptions.isEmpty()) {
                throw new IllegalArgumentException(
                        "A failed parse response must contain at least one exception"
                );
            }
        }

        public static CliParseResponse success(CLI_OPTIONS options) {
            return new CliParseResponse(
                    true,
                    Objects.requireNonNull(options, "options cannot be null"),
                    List.of()
            );
        }

        public static CliParseResponse failure(Exception exception) {
            return new CliParseResponse(
                    false,
                    null,
                    List.of(
                            Objects.requireNonNull(
                                    exception,
                                    "exception cannot be null"
                            )
                    )
            );
        }

        public static CliParseResponse failure(
                List<? extends Exception> exceptions
        ) {
            return new CliParseResponse(
                    false,
                    null,
                    exceptions
            );
        }

        public boolean isSuccessful() {
            return successful;
        }

        public boolean hasErrors() {
            return !exceptions.isEmpty();
        }

        public boolean hasOptions() {
            return options != null;
        }

        public CLI_OPTIONS getOptions() {
            return options;
        }

        public <T extends CLI_OPTIONS> boolean hasOptionsType(
                Class<T> optionsType
        ) {
            Objects.requireNonNull(optionsType, "optionsType cannot be null");
            return optionsType.isInstance(options);
        }

        public <T extends CLI_OPTIONS> T getOptionsAs(
                Class<T> optionsType
        ) {
            Objects.requireNonNull(optionsType, "optionsType cannot be null");

            if (!optionsType.isInstance(options)) {
                throw new IllegalStateException(
                        "Parsed options are not of type " +
                                optionsType.getSimpleName()
                );
            }

            return optionsType.cast(options);
        }

        public List<Exception> getExceptions() {
            return exceptions;
        }

        @Override
        public String toString() {
            return
                    "successful=" + successful + "\n" +
                    "options=" + options + "\n" +
                    "exceptions=" + exceptions + "\n"
                    ;
        }
    }

    private String[] args;

    public cli(String[] args) {
        this.args = args;
    }

    public boolean isMinimalApiMode (String[] args){
        for(int i =0; i< args.length; i++) {
            if(args[i].equals("--minimal")) {
                return true;
            }
        }
        return false;
    }

    public String[] removeMinimalApiFlag(String[] args) {
        return Arrays.stream(args)
                .filter(arg -> !arg.equals("--minimal"))
                .toArray(String[]::new);
    }

    public CliParseResponse parse() {
        boolean isMinimalApi = isMinimalApiMode(this.args);
        if(isMinimalApi) {
            this.args = removeMinimalApiFlag(this.args);
        }
        CommandLine commandLine;
        CLI_OPTIONS options;

        if(isMinimalApi) {
            options = new cli.CLI_OPTIONS.MinimalApi();
            commandLine = new CommandLine(options);
        }else {
            options = new cli.CLI_OPTIONS.cBuildApi();
            commandLine = new CommandLine(options);
        }

        commandLine.getCommandSpec().parser().collectErrors(true);
        CommandLine.ParseResult parseResult = commandLine.parseArgs(args);
        List<Exception> parseErrors = parseResult.errors();

        if(!parseErrors.isEmpty()) {
            return CliParseResponse.failure(parseErrors);
        }

        return CliParseResponse.success(options);
    }

    public static class CLI_OPTIONS {


        public static class MinimalApi extends CLI_OPTIONS {

            @CommandLine.Option(
                    names = "--sequential",
                    description = "build targets sequentially instead of in parallel"
            )
            boolean buildSequential;

            @CommandLine.Option(
                    names = { "-j", "--jobs" },
                    paramLabel = "COUNT",
                    description = "number of build jobs to run in parallel"
            )
            int parallelJobCount = 1;

            @CommandLine.Option(
                    names = { "-f", "--file" },
                    paramLabel = "BUILD_FILE",
                    description = "path to the build configuration file"
            )
            String buildFile;

            @CommandLine.Parameters(
                    paramLabel = "TARGET...",
                    description = "build targets to execute"
            )
            String[] targets;

            @CommandLine.Option(
                    names = { "-h", "--help" },
                    usageHelp = true,
                    description = "show this help message and exit"
            )
            boolean helpRequested;

            @Override
            public String toString() {
                return
                        "buildSequential=" + buildSequential + "\n" +
                        "parallelJobCount=" + parallelJobCount + "\n" +
                        "buildFile='" + buildFile + '\'' + "\n" +
                        "targets=" + Arrays.toString(targets) + "\n" +
                        "helpRequested=" + helpRequested
                        ;
            }
        }

        public static class cBuildApi extends CLI_OPTIONS {

        }

    }

}
