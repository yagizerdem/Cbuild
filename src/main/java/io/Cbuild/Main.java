package io.Cbuild;

import io.Cbuild.minimal_api.minimalApi;
import org.stringtemplate.v4.ST;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {
    public static void main(String[] args) {

        String cliArgs =  " --sequential --minimal -f fucker --jobs 10 app app2 app3";

        cli cli_ = new cli(cliArgs.split(" "));
        cli.CliExecutionResult response = cli_.execute();
        if(response.getOptions().getIsMinimalApi()) {
            runMinimalApi(response);
        }
    }

    public static void runMinimalApi(cli.CliExecutionResult result) {

        cli.CLI_OPTIONS.MinimalApi minimalApi = result.getOptions().toMinimalApi();
        if(minimalApi.buildFile == null  || minimalApi.buildFile.isEmpty()) {
            System.out.println("cbuild: *** No targets specified and no makefile found.  Stop.");
            System.exit(0);
        }

        if(!isFileExistInDir(minimalApi.buildFile, "cwd")) {
            System.out.println(String.format("make: *** No rule to make target %s.  Stop.", "'" + minimalApi.buildFile) + "'");
            System.exit(0);
        }


        String program = """
a=10\\
12\\
14
app:
\t echo $(a)
                """.trim();

        Env context = new Env();

        context.fileMetaData = new Env.FileMetaData();
        context.fileMetaData.fileContent = program;
        context.fileMetaData.fileName = result.getOptions().toMinimalApi().buildFile;

        try {
            io.Cbuild.minimal_api.minimalApi.run(program, context);
        }catch (cbuildException ex) {
            System.out.println(ex.getRawMessage());
        }
    }

    public static boolean isFileExistInDir(String fileName, String dir) {
        Path path = Paths.get(Path.of(dir).resolve(fileName).toString());
        return Files.exists(path);
    }
}