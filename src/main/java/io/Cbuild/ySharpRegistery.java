package io.Cbuild;

import io.Cbuild.ySharpNatives.fs.fsModule;
import io.Cbuild.ySharpNatives.fs.processModule;
import ysharp.treewalk.evaluator.Interpreter;


public class ySharpRegistery {

    public static void register(Interpreter interpreter) throws Exception {

        // fs module
        fsModule.Register(interpreter);
        processModule.Register(interpreter);
    }
}