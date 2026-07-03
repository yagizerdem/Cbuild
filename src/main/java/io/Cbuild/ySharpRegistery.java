package io.Cbuild;

import io.Cbuild.ySharpNatives.fsModule;
import io.Cbuild.ySharpNatives.mathModule;
import io.Cbuild.ySharpNatives.processModule;
import ysharp.treewalk.evaluator.Interpreter;


public class ySharpRegistery {

    public static void register(Interpreter interpreter) throws Exception {

        // fs module
        fsModule.Register(interpreter);
        processModule.Register(interpreter);
        mathModule.Register(interpreter);
    }
}