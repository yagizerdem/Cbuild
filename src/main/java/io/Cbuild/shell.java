package io.Cbuild;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.stream.Collectors;

public class shell {

    public static enum OS {
        WINDOWS, LINUX, MAC, SOLARIS
    };

    public static class ExecutionResult {
        public boolean isSuccess;
        public String stdOut;
        public String stdErr;
        public int exitCode;
        public String exceptionMessage;

        public ExecutionResult() {
            this(false, "", "", -1, "");
        }

        public ExecutionResult(boolean isSuccess) {
            this(
                    isSuccess,
                    "",
                    "",
                    isSuccess ? 0 : -1,
                    ""
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                int exitCode
        ) {
            this(
                    isSuccess,
                    "",
                    "",
                    exitCode,
                    ""
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                String stdOut
        ) {
            this(
                    isSuccess,
                    stdOut,
                    "",
                    isSuccess ? 0 : -1,
                    ""
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                String stdOut,
                String stdErr
        ) {
            this(
                    isSuccess,
                    stdOut,
                    stdErr,
                    isSuccess ? 0 : -1,
                    ""
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                String stdOut,
                String stdErr,
                int exitCode
        ) {
            this(
                    isSuccess,
                    stdOut,
                    stdErr,
                    exitCode,
                    ""
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                String stdOut,
                String stdErr,
                String exceptionMessage
        ) {
            this(
                    isSuccess,
                    stdOut,
                    stdErr,
                    isSuccess ? 0 : -1,
                    exceptionMessage
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                int exitCode,
                String exceptionMessage
        ) {
            this(
                    isSuccess,
                    "",
                    "",
                    exitCode,
                    exceptionMessage
            );
        }

        public ExecutionResult(
                boolean isSuccess,
                String stdOut,
                String stdErr,
                int exitCode,
                String exceptionMessage
        ) {
            this.isSuccess = isSuccess;
            this.stdOut = stdOut == null ? "" : stdOut;
            this.stdErr = stdErr == null ? "" : stdErr;
            this.exitCode = exitCode;
            this.exceptionMessage =
                    exceptionMessage == null ? "" : exceptionMessage;
        }

        @Override
        public String toString() {
            return """
            ExecutionResult {
              isSuccess=%s,
              exitCode=%d,
              stdOut=
            %s
              stdErr=
            %s
              exceptionMessage='%s'
            }
            """.formatted(
                    isSuccess,
                    exitCode,
                    indent(stdOut),
                    indent(stdErr),
                    exceptionMessage
            ).strip();
        }

        private static String indent(String value) {
            if (value == null || value.isEmpty()) {
                return "    <empty>";
            }

            return value.lines()
                    .map(line -> "    " + line)
                    .collect(Collectors.joining(System.lineSeparator()));
        }
    }

    private static OS os = null;

    public void runCommand(String command , String cwd) {
        boolean windows =  isWindows();

        List<String> shellCommand = windows
                ? List.of("cmd.exe", "/c", command)
                : List.of("sh", "-c", command);

        try {
            ProcessBuilder builder = new ProcessBuilder(shellCommand)
                    .inheritIO();

            builder.directory(Path.of(cwd).toFile());

            Process process = builder.start();
            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new cbuildException(
                        cbuildException.ErrorType.PROCESS,
                        """
                        Command: %s
                        Exit code: %d
                        """.formatted(
                                command,
                                exitCode
                        ).strip()
                );
            }
        } catch (IOException exception) {
            throw new cbuildException(
                    cbuildException.ErrorType.PROCESS,
                    """
                    Failed to start process for target.
                    Command: %s
                    Shell: %s
                    Cause: %s
                    """.formatted(
                            command,
                            String.join(" ", shellCommand.subList(0, shellCommand.size() - 1)),
                            exception.getMessage()
                    ).strip()
            );
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();

            throw new cbuildException(
                    cbuildException.ErrorType.PROCESS,
                    """
                    Command execution was interrupted for target.
                    Command: %s
                    """.formatted(
                            command
                    ).strip()
            );
        }
    }

    public ExecutionResult runCommandCaptured(String command, String cwd) {
        boolean windows = isWindows();

        List<String> shellCommand = windows
                ? List.of("cmd.exe", "/c", command)
                : List.of("sh", "-c", command);

        try {
            ProcessBuilder builder = new ProcessBuilder(shellCommand);

            builder.directory(Path.of(cwd).toFile());

            Process process = builder.start();

            try (ExecutorService executor =
                         Executors.newVirtualThreadPerTaskExecutor()) {

                Future<String> stdOutFuture = executor.submit(
                        () -> new String(
                                process.getInputStream().readAllBytes(),
                                StandardCharsets.UTF_8
                        )
                );

                Future<String> stdErrFuture = executor.submit(
                        () -> new String(
                                process.getErrorStream().readAllBytes(),
                                StandardCharsets.UTF_8
                        )
                );

                int exitCode = process.waitFor();

                String stdOut;
                String stdErr;

                try {
                    stdOut = stdOutFuture.get();
                    stdErr = stdErrFuture.get();
                } catch (ExecutionException exception) {
                    Throwable cause = exception.getCause();

                    return new ExecutionResult(
                            false,
                            "",
                            "",
                            exitCode,
                            cause == null
                                    ? exception.getMessage()
                                    : cause.getMessage()
                    );
                }

                return new ExecutionResult(
                        exitCode == 0,
                        stdOut,
                        stdErr,
                        exitCode,
                        ""
                );
            }

        } catch (IOException exception) {
            return new ExecutionResult(
                    false,
                    "",
                    "",
                    -1,
                    exception.getMessage()
            );

        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();

            return new ExecutionResult(
                    false,
                    "",
                    "",
                    -1,
                    exception.getMessage()
            );
        }
    }


    public static OS getOS() {
        if (os == null) {
            String operSys = System.getProperty("os.name").toLowerCase();
            if (operSys.contains("win")) {
                os = OS.WINDOWS;
            } else if (operSys.contains("nix") || operSys.contains("nux")
                    || operSys.contains("aix")) {
                os = OS.LINUX;
            } else if (operSys.contains("mac")) {
                os = OS.MAC;
            } else if (operSys.contains("sunos")) {
                os = OS.SOLARIS;
            }
        }
        return os;
    }

    public boolean isWindows() {
        return  getOS() == OS.WINDOWS;
    }

    public boolean isLinux() {
        return  getOS() == OS.LINUX;
    }

    public boolean isMac() {
        return  getOS() == OS.MAC;
    }
}
