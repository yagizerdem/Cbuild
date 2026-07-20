package minimalApi.build.win._002;

import io.Cbuild.minimal_api.minimalApi;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;

public class buildTest {

    String cwd;

    String cBuildFile;

    buildTest() {
        this.cwd = Path.of("src\\test\\java\\minimalApi\\build\\win\\_002").toString();
        this.cBuildFile = """
CC=gcc
TARGET=runme
CFLAGS=-O3
LFLAGS=-lm

all: runme

runme: main.o functions.o
\t $(CC) $(LFLAGS) main.o functions.o -o runme

main.o: main.c
\t $(CC) $(CFLAGS) -c main.c -o main.o

functions.o: functions.c
\t $(CC) $(CFLAGS) -c functions.c -o functions.o

purge: clean
\t del /Q runme.exe

clean:
\t del /Q *.o
""";

    }

    @Test
    public void compileTinyCprogram() {
        minimalApi.run(this.cBuildFile, cwd);
    }

    @Test
    public void cleanTinyCprogram() {
        minimalApi.run(this.cBuildFile, cwd, "clean");
    }

    @Test
    public void pugeTinyCprogram() {
        minimalApi.run(this.cBuildFile, cwd, "purge");
    }

}
