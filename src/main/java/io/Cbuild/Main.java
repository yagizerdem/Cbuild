package io.Cbuild;

import ysharp.treewalk.evaluator.Interpreter;

public class Main {
    public static void main(String[] args) {

        Interpreter ySharpInterpreter = new Interpreter();
        ySharpInterpreter.cwd = System.getProperty("user.dir");
        try {
            ySharpRegistery.register(ySharpInterpreter);
        }catch (Exception ex) {
            System.err.println(ex.getMessage());
            System.exit(1);
        }

        String program =
                "var a = 10; println a; ";


        ySharpExecutor.exec(ySharpInterpreter, program);



//        Common.Chunk chunk = new Common.Chunk();
//
//        int idx = chunk.addConstant(new Common.Value());
//        chunk.writeChunk(Common.OpCodeType.OP_CONSTANT.opcode(), 10);
//        chunk.writeChunk((byte) idx, 10);
//        chunk.writeChunk(Common.OpCodeType.OP_RETURN.opcode(), 10);
//
//        Common.disassembleChunk(chunk, "===test===");





    }
}