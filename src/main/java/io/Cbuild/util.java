package io.Cbuild;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.attribute.FileTime;
import java.time.Instant;
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

    public static String getAbsolutePath(String pathSegment, String rootDir) {
        String absolutePath = Path.of(rootDir).resolve(pathSegment).toString();
        return absolutePath;
    }

    public static String getAbsolutePath(String pathSegment) {
        String cwd = System.getProperty("user.dir");
        return getAbsolutePath(pathSegment, cwd);
    }


    public static boolean fileExist(String pathSegment, String rootDir) {
        Path fileSystemEntryPath = Path.of(getAbsolutePath(pathSegment, rootDir));
        return Files.exists(fileSystemEntryPath);
    }

    public static boolean fileExist(String pathSegment) {
        String cwd = System.getProperty("user.dir");
        return fileExist(pathSegment, cwd);
    }

    public static Instant getLastModifiedDate(String path) {
        try {
            return Files.getLastModifiedTime(Path.of(path)).toInstant();
        } catch (IOException ex) {
            throw new cbuildException(
                    cbuildException.ErrorType.PROCESS,
                    "Failed to get last modified time for path: " + path
            );
        }
    }

}
