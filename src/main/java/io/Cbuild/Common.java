package io.Cbuild;

public class Common {

    public static String unquote(String quoted) {
        if(quoted.length() < 2) return quoted;
        if(quoted.charAt(0) != '\'' || quoted.charAt(quoted.length() -1) != '\'') return quoted;
        return quoted.substring(1, quoted.length() -1);
    }
}
