package io.Cbuild;

import io.Cbuild.minimal_api.minimalApi;

public class Main {
    public static void main(String[] args) {

        String cliArgs =  " --sequential --minimal -f buildFile --jobs 10 app app2 ";

        cli cli_ = new cli(cliArgs.split(" "));
        cli.CliExecutionResult  response = cli_.execute();

        // System.out.println(response.getDiagnostic().getDiagnostics());

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
        context.fileMetaData.fileName = "Cbuild";

   try {
       minimalApi.run(program, context);
   }catch (cbuildException ex) {
       System.out.println(ex.getMessage());
   }

    }
}