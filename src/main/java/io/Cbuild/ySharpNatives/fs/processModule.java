package io.Cbuild.ySharpNatives.fs;

import ysharp.treewalk.YsharpException;
import ysharp.treewalk.evaluator.*;

import java.util.List;

public class processModule {

    public static class CwdFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());
            String cwd = System.getProperty("user.dir");
            return new Variable.Variant(new yString.yStringInstance(cwd));
        }

        @Override
        public String getFnName() {
            return "cwd";
        }
    }

    public static class ExecFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return -1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            if (arguments.isEmpty() || arguments.size() > 2) {
                throw new YsharpException(
                        YsharpException.YsharpErrorType.PROCESS,
                        -1,
                        "Expected exec(command) or exec(command, cwd)."
                );
            }

            String command = requireString(arguments.getFirst(), getFnName(), 1);

            String cwd = null;
            if (arguments.size() == 2) {
                cwd = requireString(arguments.get(1), getFnName(), 2);
            }

            try {
                String os = System.getProperty("os.name").toLowerCase();

                ProcessBuilder builder = os.contains("win")
                        ? new ProcessBuilder("cmd.exe", "/c", command)
                        : new ProcessBuilder("sh", "-c", command);

                if (cwd != null) {
                    builder.directory(new java.io.File(cwd));
                }

                Process process = builder
                        .inheritIO()
                        .start();

                int exitCode = process.waitFor();

                return new Variable.Variant(exitCode);

            } catch (Exception e) {
                throw new YsharpException(
                        YsharpException.YsharpErrorType.PROCESS,
                        -1,
                        "Cannot execute command '" + command + "'."
                );
            }
        }

        @Override
        public String getFnName() {
            return "exec";
        }
    }

    public static class ExitFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 1;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            int exitCode = requireInt(arguments.getFirst(), getFnName(), 1);

            System.exit(exitCode);
            // unreachable but required return type for interface template
            return new Variable.Variant(null);
        }

        @Override
        public String getFnName() {
            return "exit";
        }
    }

    public static class PidFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            return new Variable.Variant((double) ProcessHandle.current().pid());
        }

        @Override
        public String getFnName() {
            return "pid";
        }
    }

    public static class OsFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            return new Variable.Variant(
                    new yString.yStringInstance(System.getProperty("os.name"))
            );
        }

        @Override
        public String getFnName() {
            return "os";
        }
    }

    public static class ArchFn extends Function.NativeFunction implements Callable {

        @Override
        public int arity() {
            return 0;
        }

        @Override
        public Variable.Variant call(Interpreter interpreter,
                                     List<Variable.Variant> arguments)
                throws YsharpException {

            requireArity(arguments, arity(), getFnName());

            String arch = System.getProperty("os.arch");

            return new Variable.Variant(
                    new yString.yStringInstance(arch)
            );
        }

        @Override
        public String getFnName() {
            return "arch";
        }
    }

    public static class yProcessClass extends yClass.SealedClassObject {

        private yProcessClass(){
            this.prototype =  yClass.ClassPrototype;

            RegisterNativeFn(new CwdFn());
            RegisterNativeFn(new ExecFn());
            RegisterNativeFn(new ExitFn());
            RegisterNativeFn(new PidFn());
            RegisterNativeFn(new OsFn());
            RegisterNativeFn(new ArchFn());
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
            return "process";
        }

        @Override
        public String getType() {
            return "_process_";
        }
    }

    public static void Register(Interpreter interpreter) throws Exception {

        processModule.yProcessClass processModule = new processModule.yProcessClass();

        Variable.Variant variant = new Variable.Variant(processModule);
        Variable var = new Variable(variant,
                true,
                processModule.getType());


        interpreter.defineGlobal(processModule .getClassName(), var);
    }
}
