package io.Cbuild;

import java.util.UUID;

public class util {

    public static String uuid() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
}
