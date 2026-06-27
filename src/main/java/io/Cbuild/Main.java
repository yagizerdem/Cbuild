package io.Cbuild;

public class Main {
    public static void main(String[] args) {

        Common.Chunk chunk = new Common.Chunk();

        int idx = chunk.addConstant(new Common.Value());
        chunk.writeChunk(Common.OpCodeType.OP_CONSTANT.opcode(), 10);
        chunk.writeChunk((byte) idx, 10);
        chunk.writeChunk(Common.OpCodeType.OP_RETURN.opcode(), 10);

        Common.disassembleChunk(chunk, "===test===");

    }
}