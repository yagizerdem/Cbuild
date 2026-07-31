package io.Cbuild;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.List;
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

    // uses default shell
    public void runCommand(
            String command,
            String cwd,
            String... shellExecutablePath
    ) {
        List<String> shellCommand =
                createShellCommand(command, shellExecutablePath);

        try {
            Process process = new ProcessBuilder(shellCommand)
                    .directory(Path.of(cwd).toFile())
                    .inheritIO()
                    .start();

            int exitCode = process.waitFor();

            if (exitCode != 0) {
                throw new cbuildException(
                        cbuildException.ErrorType.PROCESS,
                        "Command exited with code %d: %s"
                                .formatted(exitCode, command)
                );
            }
        } catch (IOException exception) {
            throw new cbuildException(
                    cbuildException.ErrorType.PROCESS,
                    "Failed to execute command using %s: %s"
                            .formatted(
                                    shellCommand.getFirst(),
                                    exception.getMessage()
                            )
            );
        } catch (InterruptedException exception) {
            Thread.currentThread().interrupt();

            throw new cbuildException(
                    cbuildException.ErrorType.PROCESS,
                    "Command execution was interrupted: " + command
            );
        }
    }

    private List<String> createShellCommand(
            String command,
            String... shellExecutablePath
    ) {
        if (shellExecutablePath.length > 1) {
            throw new IllegalArgumentException(
                    "Only one shell executable may be provided."
            );
        }

        if (shellExecutablePath.length == 0) {
            return createDefaultShellCommand(command);
        }

        String shellPath = shellExecutablePath[0];

        if (shellPath == null || shellPath.isBlank()) {
            throw new IllegalArgumentException(
                    "Shell executable path must not be blank."
            );
        }

        return createCommandForShell(shellPath, command);
    }

    private List<String> createDefaultShellCommand(String command) {
        return switch (getOS()) {
            case WINDOWS ->
                    List.of(
                            "cmd.exe",
                            "/d",
                            "/s",
                            "/c",
                            command
                    );

            case LINUX, MAC, SOLARIS ->
                    List.of(
                            "/bin/sh",
                            "-c",
                            command
                    );
        };
    }

    private List<String> createCommandForShell(
            String shellPath,
            String command
    ) {
        String shellName = Path.of(shellPath)
                .getFileName()
                .toString()
                .toLowerCase();

        return switch (shellName) {
            case "cmd", "cmd.exe" ->
                    List.of(
                            shellPath,
                            "/d",
                            "/s",
                            "/c",
                            command
                    );

            case "powershell", "powershell.exe", "pwsh", "pwsh.exe" ->
                    List.of(
                            shellPath,
                            "-NoProfile",
                            "-NonInteractive",
                            "-Command",
                            command
                    );

            default ->
                    List.of(
                            shellPath,
                            "-c",
                            command
                    );
        };
    }

    public ExecutionResult runCommandCaptured(String command, String cwd, String... shellExecutablePath) {
        List<String> shellCommand =
                createShellCommand(command, shellExecutablePath);

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
        if (os != null) {
            return os;
        }

        String operatingSystem = System.getProperty("os.name")
                .toLowerCase();

        if (operatingSystem.contains("win")) {
            os = OS.WINDOWS;
        } else if (
                operatingSystem.contains("nix")
                        || operatingSystem.contains("nux")
                        || operatingSystem.contains("aix")
        ) {
            os = OS.LINUX;
        } else if (
                operatingSystem.contains("mac")
                        || operatingSystem.contains("darwin")
        ) {
            os = OS.MAC;
        } else if (
                operatingSystem.contains("sunos")
                        || operatingSystem.contains("solaris")
        ) {
            os = OS.SOLARIS;
        } else {
            throw new UnsupportedOperationException(
                    "Unsupported operating system: "
                            + System.getProperty("os.name")
            );
        }

        return os;
    }

    public boolean isWindows() {
        return getOS() == OS.WINDOWS;
    }

    public boolean isLinux() {
        return getOS() == OS.LINUX;
    }

    public boolean isMac() {
        return getOS() == OS.MAC;
    }

    public boolean isSolaris() {
        return getOS() == OS.SOLARIS;
    }

}
