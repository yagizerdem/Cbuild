package io.Cbuild;

import io.Cbuild.ySharpNatives.*;
import ysharp.treewalk.evaluator.Interpreter;


public class ySharpRegistery {

    public static void register(Interpreter interpreter) throws Exception {

        fsModule.Register(interpreter);
        processModule.Register(interpreter);
        mathModule.Register(interpreter);
        randomModule.Register(interpreter);
        envModule.Register(interpreter);
        globals.Register(interpreter);
    }
}