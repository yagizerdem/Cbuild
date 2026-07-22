package io.Cbuild;

import picocli.CommandLine;

import java.util.*;
import java.util.concurrent.Callable;

public class cli {


    public static final class DiagnosticResult {

        public enum Severity {
            INFO,
            WARNING,
            ERROR
        }

        public static final class Diagnostic {

            private final Severity severity;
            private final String message;

            public Diagnostic(Severity severity, String message) {
                this.severity = Objects.requireNonNull(severity);
                this.message = Objects.requireNonNull(message);
            }

            public Severity getSeverity() {
                return severity;
            }

            public String getMessage() {
                return message;
            }

            @Override
            public String toString() {
                return severity + ": " + message;
            }
        }

        private final List<Diagnostic> diagnostics;

        public DiagnosticResult(List<Diagnostic> diagnostics) {
            this.diagnostics = Collections.unmodifiableList(
                    new ArrayList<>(Objects.requireNonNull(diagnostics))
            );
        }

        public boolean hasErrors() {
            return diagnostics.stream()
                    .anyMatch(d -> d.getSeverity() == Severity.ERROR);
        }

        public boolean hasWarnings() {
            return diagnostics.stream()
                    .anyMatch(d -> d.getSeverity() == Severity.WARNING);
        }

        public List<Diagnostic> getDiagnostics() {
            return diagnostics;
        }

        public static DiagnosticResult empty() {
            return new DiagnosticResult(List.of());
        }

        public static DiagnosticResult of(Diagnostic diagnostic) {
            return new DiagnosticResult(List.of(diagnostic));
        }

        public static DiagnosticResult from(List<Exception> exceptions) {
            List<Diagnostic> diagnostics = new ArrayList<>();
            for(Exception ex : exceptions) {
                diagnostics.add(new Diagnostic(Severity.ERROR, ex.getMessage()));
            }
            return new DiagnosticResult(diagnostics);
        }
    }

    public static final class CliParseResult {

        private final boolean success;
        private final DiagnosticResult diagnostic;
        private final CLI_OPTIONS options;

        private CliParseResult(
                boolean success,
                DiagnosticResult diagnostic,
                CLI_OPTIONS options
        ) {
            this.success = success;
            this.diagnostic = Objects.requireNonNull(
                    diagnostic,
                    "diagnostic cannot be null"
            );
            this.options = options;
        }

        public static CliParseResult success(
                CLI_OPTIONS options,
                DiagnosticResult diagnostic
        ) {
            return new CliParseResult(
                    true,
                    diagnostic,
                    options
            );
        }

        public static CliParseResult success(CLI_OPTIONS options) {
            return new CliParseResult(
                    true,
                    DiagnosticResult.empty(),
                    options
            );
        }

        public static CliParseResult failure(
                DiagnosticResult diagnostic
        ) {
            return new CliParseResult(
                    false,
                    diagnostic,
                    null
            );
        }

        public boolean isSuccess() {
            return success;
        }

        public DiagnosticResult getDiagnostic() {
            return diagnostic;
        }

        public CLI_OPTIONS getOptions() {
            return options;
        }
    }

    public static final class CliExecutionResult {

        private final boolean success;
        private final int exitCode;
        private final DiagnosticResult diagnostic;
        private final CLI_OPTIONS options;

        private CliExecutionResult(
                boolean success,
                int exitCode,
                DiagnosticResult diagnostic,
                CLI_OPTIONS options
        ) {
            this.success = success;
            this.exitCode = exitCode;
            this.diagnostic = Objects.requireNonNull(
                    diagnostic,
                    "diagnostic cannot be null"
            );
            this.options = options;
        }

        public static CliExecutionResult success(
                DiagnosticResult diagnostic,
                CLI_OPTIONS options
        ) {
            return new CliExecutionResult(
                    true,
                    0,
                    diagnostic,
                    options
            );
        }

        public static CliExecutionResult success(CLI_OPTIONS options) {
            return new CliExecutionResult(
                    true,
                    0,
                    DiagnosticResult.empty(),
                    options
            );
        }

        public static CliExecutionResult failure(
                int exitCode,
                DiagnosticResult diagnostic,
                CLI_OPTIONS options
        ) {
            return new CliExecutionResult(
                    false,
                    exitCode,
                    diagnostic,
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

            DiagnosticResult diagnostic = DiagnosticResult.of(
                    new DiagnosticResult.Diagnostic(
                            DiagnosticResult.Severity.ERROR,
                            message
                    )
            );

            return failure(exitCode, diagnostic, null);
        }

        public boolean isSuccess() {
            return success;
        }

        public int getExitCode() {
            return exitCode;
        }

        public DiagnosticResult getDiagnostic() {
            return diagnostic;
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
            DiagnosticResult diagnostics =
                    DiagnosticResult.from(parseErrors);

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

        List<DiagnosticResult.Diagnostic> diagnostics =
                new ArrayList<>();

        commandLine.setParameterExceptionHandler((exception, args) -> {
            diagnostics.add(
                    new DiagnosticResult.Diagnostic(
                            DiagnosticResult.Severity.ERROR,
                            getExceptionMessage(exception)
                    )
            );

            return CommandLine.ExitCode.USAGE;
        });

        commandLine.setExecutionExceptionHandler(
                (exception, cmd, parseResult) -> {
                    diagnostics.add(
                            new DiagnosticResult.Diagnostic(
                                    DiagnosticResult.Severity.ERROR,
                                    getExceptionMessage(exception)
                            )
                    );

                    return CommandLine.ExitCode.SOFTWARE;
                }
        );

        int exitCode = commandLine.execute(executionArgs);

        DiagnosticResult diagnosticResult =
                new DiagnosticResult(diagnostics);



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
                List<DiagnosticResult.Diagnostic> diagnostics = new ArrayList<>();

                if (this.parallelJobCount <= 0) {
                    diagnostics.add(
                            new DiagnosticResult.Diagnostic(
                                    DiagnosticResult.Severity.WARNING,
                                    "Job count must be greater than zero. Falling back to 1."
                            )
                    );

                    this.parallelJobCount = 1;
                }

                if (this.parallelJobCount > 0 && this.buildSequential) {
                    diagnostics.add(
                            new DiagnosticResult.Diagnostic(
                                    DiagnosticResult.Severity.WARNING,
                                    "The sequential build option cannot be used together with the parallel jobs option. Sequential mode will be used."
                            )
                    );

                    this.parallelJobCount = -1;
                }


                new CliParseResult(true, new DiagnosticResult(diagnostics), this);
                return null;
            }
        }

        public static class cBuildApi extends CLI_OPTIONS {

        }

    }

}
