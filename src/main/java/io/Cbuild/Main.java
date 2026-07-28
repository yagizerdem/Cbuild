package io.Cbuild;

import org.javatuples.Pair;
import java.nio.file.Path;

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
        Pair<Boolean, String> pair = resolveBuildFilePath(result);
//        if(!pair.getValue0()) {
//            System.out.println(pair.getValue1());
//            return;
//        }

        String program = """
a=10\\
12\\
14
app: b
\t echo $(a) $(b)
b=$(c)
c=$(b

""";

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

    public static Pair<Boolean, String> resolveBuildFilePath(cli.CliExecutionResult result) {
        return resolveBuildFilePath(result, System.getProperty("user.dir"));
    }

    public static Pair<Boolean, String> resolveBuildFilePath(cli.CliExecutionResult result, String root) {
        cli.CLI_OPTIONS.MinimalApi minimalApi = result.getOptions().toMinimalApi();
        if(minimalApi.buildFile == null  || minimalApi.buildFile.isEmpty()) {
            // check for default build file name
            Pair<Boolean, String> flag_path =  util.buildFileExists(root);
            if(flag_path.getValue0()) {
                return new Pair<>(true, flag_path.getValue1());
            }

            return new Pair<>(false, "cbuild: *** No targets specified and no buildfile found.  Stop.");
        }

        if(util.findFileCaseInsensitive(minimalApi.buildFile, "cwd").isEmpty()) {
            return new Pair<>(false, String.format("cbuild: *** No rule to build target %s.  Stop.", "'" + minimalApi.buildFile + "'"));
        }

        return new Pair<Boolean, String>(true, Path.of(root).resolve(minimalApi.buildFile).toString());
    }
}