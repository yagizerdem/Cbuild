package minimalApi.build.win._001;

import org.junit.jupiter.api.Test;

import  io.Cbuild.minimal_api.*;

import java.nio.file.Path;

public class buildTest {

    String cwd;

    buildTest() {
        this.cwd = Path.of("src\\test\\java\\minimalApi\\build\\win\\_001").toString();
    }

    @Test
    public void fileAlreadyCreated() {
        String cBuildProgram = """
app.txt : # commands does not executed since app.txt should be already there
\t echo "app.txt already exist"
                """;

        minimalApi.run(cBuildProgram, cwd);

    }


    @Test
    public void fileNotCreated() {
        String cBuildProgram = """
update.md : 
\t echo content of update.md file > update.md
                """;


        minimalApi.run(cBuildProgram, cwd);

    }

}
