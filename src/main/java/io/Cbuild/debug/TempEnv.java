package io.Cbuild.debug;

import io.Cbuild.Env;

import java.nio.charset.StandardCharsets;

public class TempEnv {

    public static Env createTempEnv() {
        Env env = new Env();

        Env.FileMetaData fileMetaData = new Env.FileMetaData();

        String content = """
            CC = gcc
            CFLAGS = -Wall -O2

            app: main.o util.o
            \t$(CC) $(CFLAGS) -o app main.o util.o

            main.o: main.c
            \t$(CC) $(CFLAGS) -c main.c

            util.o: util.c
            \t$(CC) $(CFLAGS) -c util.c
            """;

        fileMetaData.fileName = "BuildFile";
        fileMetaData.extension = "";
        fileMetaData.fileAbsolutePath =
                "/tmp/cbuild-test-project/BuildFile";

        fileMetaData.fileContent = content;
        fileMetaData.fileSize = content.getBytes(StandardCharsets.UTF_8).length;

        env.fileMetaData = fileMetaData;

        io.Cbuild.Env.Settings settings = new Env.Settings();
        settings.silent = false;
        settings.isMinimalApi = true;
        settings.parallelJobCount = 1;
        settings.buildSequential = false;

        env.setting = settings;

        return env;
    }
}
