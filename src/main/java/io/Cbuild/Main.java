package io.Cbuild;

import io.Cbuild.minimal_api.minimalApi;

public class Main {
    public static void main(String[] args) {

        String cliArgs =  " --sequential --minimal -f buildFile --jobs 10 app app2 ";

        cli cli_ = new cli(cliArgs.split(" "));
        cli.CliParseResponse  response = cli_.parse();

        System.out.println(response.getOptions());

    }
}