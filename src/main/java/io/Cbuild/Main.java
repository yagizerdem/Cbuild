package io.Cbuild;

import io.Cbuild.lua.LuaGlobals;
import org.javatuples.Pair;
import java.nio.file.Path;
import org.luaj.vm2.Globals;


public class Main {
    public static void main(String[] args) {

        try {
            Globals globals = LuaGlobals.getGlobalsCached();
            io.Cbuild.lua.luaNatives.globals.register(globals);
            io.Cbuild.lua.luaNatives.mathModule.register(globals);
            io.Cbuild.lua.luaNatives.fsModule.register(globals);
            io.Cbuild.lua.luaNatives.randomModule.register(globals);
            io.Cbuild.lua.luaNatives.processModule.register(globals);


            String cliArgs =  " --minimal -f fucker --jobs 100 --silent app app2 app3";

            cli cli_ = new cli(cliArgs.split(" "));
            cli.CliExecutionResult response = cli_.execute();

            if(!response.getDiagnostic().diagnostics.isEmpty()) {
                response.getDiagnostic().diagnostics.forEach(d -> {
                    System.out.println(d.getSeverity().toString().toLowerCase() + " : " + d.getMessage());
                });
            }

            if(!response.isSuccess()) {
                return;
            }

            if(response.getOptions().getIsMinimalApi()) {
                runMinimalApi(response);
            }
        }catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    public static void runMinimalApi(cli.CliExecutionResult result) {

        cli.CLI_OPTIONS.MinimalApi cliOptions = result.getOptions().toMinimalApi();
        Pair<Boolean, String> pair = resolveBuildFilePath(result);
//        if(!pair.getValue0()) {
//            System.out.println(pair.getValue1());
//            return;
//        }

        String program = """


ysharp {

    for var i = 0; i < 10;  i++ do
        println i;
    end
    
    env.set("k", "300");
    env.set("name", "yagiz");
    env.set("l_name", "erdem");
    println env.size();
}

a=10\\
12\\
14
app: b
\t echo $(a) $(b)
\t echo $(k)

ysharp {
    println 100 >> 2;
}

b=$(c)
c=$(a)

""";

        Env context = new Env();
        context.setting = Env.Settings.toSettings(cliOptions);
        context.fileMetaData = new Env.FileMetaData();
        context.fileMetaData.fileContent = program;
        context.fileMetaData.fileName = cliOptions.buildFile;

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