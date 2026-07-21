package linux.minimalApi.build._002;

import io.Cbuild.minimal_api.minimalApi;
import org.junit.jupiter.api.Test;

import java.nio.file.Path;

public class buildTest {

    String cwd;
    String cBuildFile;

    buildTest() {
        this.cwd = Path.of(
                "src/test/java/linux/minimalApi/build/_002"
        ).toString();

        this.cBuildFile = """
CC=gcc
TARGET=runme
CFLAGS=-O3
LFLAGS=-lm

all: runme

runme: main.o functions.o
\t$(CC) main.o functions.o $(LFLAGS) -o $(TARGET)

main.o: main.c
\t$(CC) $(CFLAGS) -c main.c -o main.o

functions.o: functions.c
\t$(CC) $(CFLAGS) -c functions.c -o functions.o

purge: clean
\trm -f $(TARGET)

clean:
\trm -f *.o
""";
    }

    @Test
    public void compileTinyCProgram() {
        minimalApi.run(this.cBuildFile, cwd);
    }

    @Test
    public void cleanTinyCProgram() {
        minimalApi.run(this.cBuildFile, cwd, "clean");
    }

    @Test
    public void purgeTinyCProgram() {
        minimalApi.run(this.cBuildFile, cwd, "purge");
    }
}