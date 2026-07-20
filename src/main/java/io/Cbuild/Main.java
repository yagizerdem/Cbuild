package io.Cbuild;

import io.Cbuild.minimal_api.minimalApi;

public class Main {
    public static void main(String[] args) {
        String cBuildProgram = """
a : 
\t echo hit     
                """;


        minimalApi.run(cBuildProgram);
    }
}