package io.Cbuild;

import picocli.CommandLine;

import java.util.*;
import java.util.concurrent.Callable;

public class cli {


    public static final class CliParseResult {

        private final boolean success;
        private final Diagnostic.DiagnosticResult diagnosticResult;
        private final CLI_OPTIONS options;

        private CliParseResult(
                boolean success,
                Diagnostic.DiagnosticResult diagnosticResult,
                CLI_OPTIONS options
        ) {
            this.success = success;
            this.diagnosticResult = Objects.requireNonNull(
                    diagnosticResult,
                    "diagnostic cannot be null"
            );
            this.options = options;
        }

        public static CliParseResult success(
                CLI_OPTIONS options,
                Diagnostic.DiagnosticResult diagnosticResult
        ) {
            return new CliParseResult(
                    true,
                    diagnosticResult,
                    options
            );
        }

        public static CliParseResult success(CLI_OPTIONS options) {
            return new CliParseResult(
                    true,
                    Diagnostic.DiagnosticResult.empty(),
                    options
            );
        }

        public static CliParseResult failure(
                Diagnostic.DiagnosticResult diagnosticResult
        ) {
            return new CliParseResult(
                    false,
                    diagnosticResult,
                    null
            );
        }

        public boolean isSuccess() {
            return success;
        }

        public Diagnostic.DiagnosticResult getDiagnostic() {
            return diagnosticResult;
        }

        public CLI_OPTIONS getOptions() {
            return options;
        }
    }

    public static final class CliExecutionResult {

        private final boolean success;
        private final int exitCode;
        private final Diagnostic.DiagnosticResult diagnosticResult;
        private final CLI_OPTIONS options;

        private CliExecutionResult(
                boolean success,
                int exitCode,
                Diagnostic.DiagnosticResult diagnosticResult,
                CLI_OPTIONS options
        ) {
            this.success = success;
            this.exitCode = exitCode;
            this.diagnosticResult = Objects.requireNonNull(
                    diagnosticResult,
                    "diagnostic cannot be null"
            );
            this.options = options;
        }

        public static CliExecutionResult success(
                Diagnostic.DiagnosticResult diagnosticResult,
                CLI_OPTIONS options
        ) {
            return new CliExecutionResult(
                    true,
                    0,
                    diagnosticResult,
                    options
            );
        }

        public static CliExecutionResult success(CLI_OPTIONS options) {
            return new CliExecutionResult(
                    true,
                    0,
                    Diagnostic.DiagnosticResult.empty(),
                    options
            );
        }

        public static CliExecutionResult failure(
                int exitCode,
                Diagnostic.DiagnosticResult diagnosticResult,
                CLI_OPTIONS options
        ) {
            return new CliExecutionResult(
                    false,
                    exitCode,
                    diagnosticResult,
                    options
            );
        }

        public static CliExecutionResult failure(
                int exitCode,
                Exception exception
        ) {
            Objects.requireNonNull(
                    exception,
                    "exception cannot be null"
            );

            String message = exception.getMessage();

            if (message == null || message.isBlank()) {
                message = exception.getClass().getSimpleName();
            }

            Diagnostic.DiagnosticResult diagnosticResult = Diagnostic.DiagnosticResult.of(
                    new Diagnostic.CliDiagnostic(
                            message,
                            Diagnostic.Severity.ERROR
                    )
            );

            return failure(exitCode, diagnosticResult, null);
        }

        public boolean isSuccess() {
            return success;
        }

        public int getExitCode() {
            return exitCode;
        }

        public Diagnostic.DiagnosticResult getDiagnostic() {
            return diagnosticResult;
        }

        public CLI_OPTIONS getOptions() {
            return this.options;
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

    public CliParseResult parse() {
        boolean minimalApiMode = isMinimalApiMode(this.args);

        String[] parsedArgs = minimalApiMode
                ? removeMinimalApiFlag(this.args)
                : this.args;

        CLI_OPTIONS options = minimalApiMode
                ? new CLI_OPTIONS.MinimalApi()
                : new CLI_OPTIONS.cBuildApi();

        CommandLine commandLine = new CommandLine(options);

        commandLine.getCommandSpec()
                .parser()
                .collectErrors(true);

        CommandLine.ParseResult parseResult =
                commandLine.parseArgs(parsedArgs);

        List<Exception> parseErrors = parseResult.errors();

        if (!parseErrors.isEmpty()) {
            Diagnostic.DiagnosticResult diagnostics =
                    Diagnostic.DiagnosticResult.from(parseErrors);

            return CliParseResult.failure(diagnostics);
        }

        return CliParseResult.success(options);
    }

    public CliExecutionResult execute() {
        boolean minimalApiMode = isMinimalApiMode(this.args);

        String[] executionArgs = minimalApiMode
                ? removeMinimalApiFlag(this.args)
                : this.args;

        CLI_OPTIONS options = minimalApiMode
                ? new CLI_OPTIONS.MinimalApi()
                : new CLI_OPTIONS.cBuildApi();

        CommandLine commandLine = new CommandLine(options);

        List<Diagnostic> diagnostics =
                new ArrayList<>();

        commandLine.setParameterExceptionHandler((exception, args) -> {
            diagnostics.add(
                    new Diagnostic.CliDiagnostic(
                            getExceptionMessage(exception),
                            Diagnostic.Severity.ERROR
                    )
            );

            return CommandLine.ExitCode.USAGE;
        });

        commandLine.setExecutionExceptionHandler(
                (exception, cmd, parseResult) -> {
                    diagnostics.add(
                            new Diagnostic.CliDiagnostic(
                                    getExceptionMessage(exception),
                                    Diagnostic.Severity.ERROR
                            )
                    );

                    return CommandLine.ExitCode.SOFTWARE;
                }
        );

        int exitCode = commandLine.execute(executionArgs);

        Diagnostic.DiagnosticResult diagnosticResult =
                new Diagnostic.DiagnosticResult(diagnostics);



        if (exitCode != CommandLine.ExitCode.OK) {
            return CliExecutionResult.failure(
                    exitCode,
                    diagnosticResult,
                    null
            );
        }

        return CliExecutionResult.success(options);
    }

    private static String getExceptionMessage(Exception exception) {
        String message = exception.getMessage();

        if (message == null || message.isBlank()) {
            return exception.getClass().getSimpleName();
        }

        return message;
    }

    public static class CLI_OPTIONS {

        public static class MinimalApi extends CLI_OPTIONS implements Callable<Void> {

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

            @Override
            public Void call() throws Exception {
                // check parallel job count
                List<Diagnostic> diagnostics = new ArrayList<>();

                if (this.parallelJobCount <= 0) {
                    diagnostics.add(
                            new Diagnostic.CliDiagnostic(
                                    "Job count must be greater than zero. Falling back to 1.",
                                    Diagnostic.Severity.WARNING
                            )
                    );

                    this.parallelJobCount = 1;
                }

                if (this.parallelJobCount > 0 && this.buildSequential) {
                    diagnostics.add(
                            new Diagnostic.CliDiagnostic(
                                    "The sequential build option cannot be used together with the parallel jobs option. Sequential mode will be used.",
                                    Diagnostic.Severity.WARNING
                            )
                    );

                    this.parallelJobCount = -1;
                }


                new CliParseResult(true, new Diagnostic.DiagnosticResult(diagnostics), this);
                return null;
            }
        }

        public static class cBuildApi extends CLI_OPTIONS {

        }

    }

}
