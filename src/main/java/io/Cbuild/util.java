package io.Cbuild;

import org.javatuples.Pair;
import org.stringtemplate.v4.ST;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.*;
import java.util.stream.Stream;

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



    public static boolean fileExist(String pathSegment, String rootDir) {
        Path fileSystemEntryPath = Path.of(getAbsolutePath(pathSegment, rootDir));
        return Files.exists(fileSystemEntryPath);
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


    public static Optional<Path> findFileCaseInsensitive(
            String directory,
            String fileName
    ) {
        Path dir = Path.of(directory);

        if (!Files.isDirectory(dir)) {
            return Optional.empty();
        }

        try (Stream<Path> entries = Files.list(dir)) {
            return entries
                    .filter(Files::isRegularFile)
                    .filter(path ->
                            path.getFileName()
                                    .toString()
                                    .equalsIgnoreCase(fileName)
                    )
                    .findFirst();
        } catch (IOException e) {
            return Optional.empty();
        }
    }

    public static boolean fileExistsCaseInsensitive(
            String directory,
            String fileName
    ) {
        return findFileCaseInsensitive(directory, fileName).isPresent();
    }


    public static Pair<Boolean, String> buildFileExists(String directory) {

        List<String> DEFAULT_BUILD_FILE_NAMES = List.of(
                "CBuildFile",
                "BuildFile",
                "Build_File"
        );

        Path root = Path.of(directory);

        if (!Files.isDirectory(root)) {
            return new Pair<>(false, null);
        }

        for (String candidate : DEFAULT_BUILD_FILE_NAMES) {
            Optional<Path> matchedFile =
                    findFileCaseInsensitive(directory, candidate);

            if (matchedFile.isPresent()) {
                return new Pair<>(
                        true,
                        matchedFile.get().toAbsolutePath().normalize().toString()
                );
            }
        }

        return new Pair<>(false, null);
    }

}
