package io.Cbuild;

public class cbuildException extends RuntimeException {

    public enum ErrorType {
        SYNTAX,
        SEMANTIC,
        PROCESS
    }

    private final ErrorType errorType;
    private final String fileName;
    private final int line;
    private final int column;

    public cbuildException(ErrorType errorType, String message) {
        super(message);
        this.errorType = errorType;
        this.fileName = null;
        this.line = -1;
        this.column = -1;
    }

    public cbuildException(ErrorType errorType, String message, String fileName, int line, int column) {
        super(message);
        this.errorType = errorType;
        this.fileName = fileName;
        this.line = line;
        this.column = column;
    }

    public cbuildException(ErrorType errorType, String message, int line, int column) {
        super(message);
        this.errorType = errorType;
        this.fileName = null;
        this.line = line;
        this.column = column;
    }

    public ErrorType getErrorType() {
        return errorType;
    }

    public String getFileName() {
        return fileName;
    }

    public int getLine() {
        return line;
    }

    public int getColumn() {
        return column;
    }

    @Override
    public String getMessage() {
        String type = errorType.name().toLowerCase();

        if (fileName == null || line < 0 || column < 0) {
            return type + " error: " + super.getMessage();
        }

        return fileName + ":" + line + ":" + column + ": " + type + " error: " + super.getMessage();
    }
}