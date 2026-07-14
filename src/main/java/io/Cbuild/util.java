package io.Cbuild;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class util {

    public static String uuid() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public static <T> Set<T> difference(final Set<T> setOne, final Set<T> setTwo) {
        Set<T> result = new HashSet<>(setOne);
        result.removeIf(setTwo::contains);
        return result;
    }
}
