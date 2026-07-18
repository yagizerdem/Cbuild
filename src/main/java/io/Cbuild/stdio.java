package io.Cbuild;

public class stdio {
    private final Object lock = new Object();

    public stdio() {}

    public void printShellCommand(String command) {
        synchronized (lock) {
            System.out.println(command);
        }
    }

    public void printBuildOutput(String command, String stdout) {
        String output = stdout == null || stdout.isBlank()
                ? command
                : command + System.lineSeparator() + stdout.stripTrailing();

        synchronized (lock) {
            System.out.println(output);
        }
    }

}
