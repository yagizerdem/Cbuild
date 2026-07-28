package io.Cbuild;

import ysharp.treewalk.lexer.Token;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class Diagnostic {

    // base diagnostic props
    private Severity severity;
    private String message;

    public Severity getSeverity() {
        return severity;
    }

    public String getMessage() {
        return message;
    }

    public Diagnostic() {}

    public Diagnostic(String message, Severity severity) {
        this.message = message;
        this.severity = severity;
    }


    public enum Severity {
        INFO,
        WARNING,
        ERROR
    }


    public static final class DiagnosticResult {
        public List<Diagnostic> diagnostics = new ArrayList<>();

        public DiagnosticResult() {}

        public DiagnosticResult(List<Diagnostic> diagnostics) {
            this.diagnostics = diagnostics;
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

        public static Diagnostic.DiagnosticResult empty() {
            return new Diagnostic.DiagnosticResult(List.of());
        }

        public static Diagnostic.DiagnosticResult of(Diagnostic diagnostic) {
            return new Diagnostic.DiagnosticResult(List.of(diagnostic));
        }

        public static Diagnostic.DiagnosticResult from(List<Exception> exceptions) {
            List<Diagnostic> diagnostics = new ArrayList<>();
            for(Exception ex : exceptions) {
                diagnostics.add(new Diagnostic(ex.getMessage(), Severity.ERROR));
            }
            return new Diagnostic.DiagnosticResult(diagnostics);
        }

        @Override
        public String toString() {
            StringBuilder builder = new StringBuilder();
            for(int i = 0; i < this.diagnostics.size(); i++) {
                builder.append(this.diagnostics.get(i));
                builder.append("\n");
            }
            return builder.toString();
        }
    }

    public static final class CliDiagnostic extends Diagnostic {

        public CliDiagnostic() {
            super();
        }


        public CliDiagnostic(String message, Severity severity) {
            super(message, severity);
        }

        @Override
        public String toString() {
            return this.getSeverity() + ": " + this.getMessage();
        }

    }


    public static final class ParseDiagnostic extends Diagnostic {

        private final String fileName;
        private final int line;
        private final int charPositionInLine;
        private final String offendingToken;
        private final int offendingTokenType;
        private final List<String> ruleStack;
        private final List<String> expectedTokens;
        private final String sourceLine;

        public ParseDiagnostic(
                String fileName,
                int line,
                int charPositionInLine,
                String offendingToken,
                int offendingTokenType,
                List<String> ruleStack,
                List<String> expectedTokens,
                String message,
                String sourceLine
        ) {
            super(Objects.requireNonNull(message, "message cannot be null"), Severity.ERROR);
            this.fileName = Objects.requireNonNull(fileName, "fileName cannot be null");
            this.line = line;
            this.charPositionInLine = charPositionInLine;
            this.offendingToken = Objects.requireNonNull(
                    offendingToken,
                    "offendingToken cannot be null"
            );
            this.offendingTokenType = offendingTokenType;
            this.ruleStack = List.copyOf(
                    Objects.requireNonNull(ruleStack, "ruleStack cannot be null")
            );
            this.expectedTokens = List.copyOf(
                    Objects.requireNonNull(expectedTokens, "expectedTokens cannot be null")
            );
            this.sourceLine = Objects.requireNonNull(sourceLine, "sourceLine cannot be null");
        }

        public String getFileName() {
            return fileName;
        }

        public int getLine() {
            return line;
        }

        public int getCharPositionInLine() {
            return charPositionInLine;
        }

        public String getOffendingToken() {
            return offendingToken;
        }

        public int getOffendingTokenType() {
            return offendingTokenType;
        }

        public List<String> getRuleStack() {
            return ruleStack;
        }

        public List<String> getExpectedTokens() {
            return expectedTokens;
        }

        public String getSourceLine() {
            return sourceLine;
        }

        @Override
        public String toString() {
            return fileName + ":" + line + ":" + charPositionInLine
                    + ": " + getSeverity().name().toLowerCase()
                    + ": " + getMessage();
        }
    }

}