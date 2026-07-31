package io.Cbuild.ySharpNatives;

import io.Cbuild.Env;
import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.*;

import java.util.List;
import java.util.Map;

public class envModule {

    public static class SetFn extends Function.NativeFunction implements Callable {

        private final Env cBuildContext;

        public SetFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public int arity() {
            return 2;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.get(0), getFnName(), 1);
            String value = requireString(arguments.get(1), getFnName(), 2);

            cBuildContext.appendRawVariable(key, value);

            return new Variable.Variant(new yString.yStringInstance(value));
        }

        @Override
        public String getFnName() {
            return "set";
        }
    }

    public static class GetFn extends Function.NativeFunction implements Callable {

        private final Env cBuildContext;

        public GetFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.getFirst(), getFnName(), 1);
            String data = this.cBuildContext.getRawVariable(key);

            return new Variable.Variant(data);
        }

        @Override
        public String getFnName() {
            return "get";
        }
    }

    public static class SizeFn extends Function.NativeFunction implements Callable {

        private final Env cBuildContext;

        public SizeFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            return new Variable.Variant((int) this.cBuildContext.symbolTable.size());
        }

        @Override
        public String getFnName() {
            return "size";
        }
    }

    public static class HasFn extends Function.NativeFunction implements Callable {

        private final Env cBuildContext;

        public HasFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.getFirst(), getFnName(), 1);

            boolean flag = this.cBuildContext.hasVariable(key);

            return new Variable.Variant(flag);
        }

        @Override
        public String getFnName() {
            return "has";
        }
    }

    public static class RemoveFn extends Function.NativeFunction implements Callable {

        private final Env cBuildContext;

        public RemoveFn(Env cBuildContext) {
            this.cBuildContext = cBuildContext;
        }

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String key = requireString(arguments.getFirst(), getFnName(), 1);

            Env.SymbolTableVariable var = this.cBuildContext.deleteVariable(key);

            return new Variable.Variant(true);
        }

        @Override
        public String getFnName() {
            return "remove";
        }
    }

    public static class yEnvClass extends yClass.SealedClassObject {


        private yEnvClass(Env cBuildContext) {
            this.prototype = yClass.ClassPrototype;

            RegisterNativeFn(new SetFn(cBuildContext));
            RegisterNativeFn(new GetFn(cBuildContext));
            RegisterNativeFn(new HasFn(cBuildContext));
            RegisterNativeFn(new RemoveFn(cBuildContext));
            RegisterNativeFn(new SizeFn(cBuildContext));
        }

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            throw new YsharpException(
                    YsharpException.YsharpErrorType.PROCESS,
                    -1,
                    "Cannot create instance of static class '" + getClassName() + "'."
            );
        }

        @Override
        public String getClassName() {
            return "env";
        }

        @Override
        public String getType() {
            return "_env_";
        }

        @Override
        public String toString() {
            return "env_module";
        }
    }

    public static void Register(Interpreter interpreter, Env cBuildContext) throws Exception {

        yEnvClass envModule = new yEnvClass(cBuildContext);

        Variable.Variant variant = new Variable.Variant(envModule);
        Variable var = new Variable(
                variant,
                true,
                envModule.getType()
        );

        interpreter.defineGlobal(envModule.getClassName(), var);
    }
}