package io.Cbuild.ySharpNatives;

import ysharp.treewalk.evaluator.Interpreter;
import ysharp.treewalk.evaluator.Native.function.core.GlobalNatives.*;
import ysharp.treewalk.evaluator.Variable;

public class globals {

    public static void Register(Interpreter interpreter) {

        StrFn strFn = new StrFn();
        interpreter.global.define("__str",
                new Variable(new Variable.Variant(strFn), true, strFn.getType()));

        IntFn intFn = new IntFn();
        interpreter.global.define("__int",
                new Variable(new Variable.Variant(intFn), true, intFn.getType()));

        DoubleFn doubleFn = new DoubleFn();
        interpreter.global.define("__double",
                new Variable(new Variable.Variant(doubleFn), true, doubleFn.getType()));

        BoolFn boolFn = new BoolFn();
        interpreter.global.define("__bool",
                new Variable(new Variable.Variant(boolFn), true, boolFn.getType()));

        LenFn lenFn = new LenFn();
        interpreter.global.define("__len",
                new Variable(new Variable.Variant(lenFn), true, lenFn.getType()));

        AnyFn anyFn = new AnyFn();
        interpreter.global.define("__any",
                new Variable(new Variable.Variant(anyFn), true, anyFn.getType()));

        AllFn allFn = new AllFn();
        interpreter.global.define("__all",
                new Variable(new Variable.Variant(allFn), true, allFn.getType()));

        MinFn minFn = new MinFn();
        interpreter.global.define("__min",
                new Variable(new Variable.Variant(minFn), true, minFn.getType()));

        MaxFn maxFn = new MaxFn();
        interpreter.global.define("__max",
                new Variable(new Variable.Variant(maxFn), true, maxFn.getType()));

        SumFn sumFn = new SumFn();
        interpreter.global.define("__sum",
                new Variable(new Variable.Variant(sumFn), true, sumFn.getType()));
    }

}
