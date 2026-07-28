package io.Cbuild;

public class RecursiveVariableExpansionException extends cbuildException {

    public RecursiveVariableExpansionException(String variableName) {
        super(
                ErrorType.SEMANTIC,
                "Recursive variable '%s' references itself (eventually). Stop."
                        .formatted(variableName)
        );
    }

    public RecursiveVariableExpansionException(
            String variableName,
            String fileName,
            int line,
            int column
    ) {
        super(
                ErrorType.SEMANTIC,
                "Recursive variable '%s' references itself (eventually). Stop."
                        .formatted(variableName),
                fileName,
                line,
                column
        );
    }
}