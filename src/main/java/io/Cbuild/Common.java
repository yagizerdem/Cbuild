package io.Cbuild;

public class Common {

    public static enum OpCodeType {
        OP_CONSTANT(0),
        OP_RETURN(1),
        OP_ADD(2),
        OP_SUBTRACT(3),
        OP_MULTIPLY(4),
        OP_DIVIDE(5);

        private final byte opcode;

        OpCodeType(int opcode) {
            this.opcode = (byte) opcode;
        }

        public byte opcode() {
            return opcode;
        }
    }

    public static class Value {

        @Override
        public String toString() {
            return super.toString();
        }
    }

    public static class Chunk {
        private int count;
        private int capacity;
        private byte[] code = new byte[0];
        private int[] lines = new int[0];
        private ValueArray constants = new ValueArray();

        public Chunk() {}

        public void ensureCapacity() {
            if (code.length == count) {
                int newCapacity = Math.max(1, code.length) * 2;
                byte[] newCode = new byte[newCapacity];
                int[] newLines = new int[newCapacity];
                for (int i = 0; i < code.length; i++) {
                    newCode[i] = code[i];
                    newLines[i] = lines[i];
                }
                code = newCode;
                lines = newLines;
                capacity = newCapacity;
            }
        }

        public void writeChunk(byte value, int line) {
            ensureCapacity();
            code[count] = value;
            lines[count] = line;
            count++;
        }

        public int addConstant(Value value) {
            constants.writeValueArray(value);
            return constants.count - 1;
        }

        public byte getCode(int index) {
            return code[index];
        }

        public int getLine(int index) {
            return lines[index];
        }

        public Value getConstant(int index) {
            return constants.get(index);
        }

        public int getCapacity() {
            return capacity;
        }

        public int getCount() {
            return count;
        }
    }

    public static class ValueArray {
        int count;
        int capacity;
        Value[] values = new Value[0];

        public void ensureCapacity() {
            if (values.length == count) {
                Value[] newValues = new Value[Math.max(1, values.length) * 2];
                for (int i = 0; i < values.length; i++) {
                    newValues[i] = values[i];
                }
                values = newValues;
                capacity = values.length;
            }
        }

        public void writeValueArray(Value value) {
            ensureCapacity();
            values[count] = value;
            count++;
        }

        public Value get(int index) {
            return values[index];
        }
    }

    public static void disassembleChunk(Chunk chunk, String name) {
        System.out.println(name);

        for (int offset = 0; offset < chunk.count;) {
            offset = disassembleInstruction(chunk, offset);
        }
    }

    public static int disassembleInstruction(Chunk chunk, int offset) {
        System.out.printf("%04d ", offset);

        if (offset > 0 &&
                chunk.lines[offset] == chunk.lines[offset - 1]) {
            System.out.print("   | ");
        } else {
            System.out.printf("%4d ", chunk.lines[offset]);
        }

        byte instruction = chunk.code[offset];

        if(instruction == OpCodeType.OP_RETURN.opcode()) {
            return simpleInstruction("OP_RETURN", offset);
        }
        else if(instruction == OpCodeType.OP_CONSTANT.opcode()) {
            return constantInstruction("OP_CONSTANT", chunk, offset);
        }
        // default unknown
        else  {
            System.out.printf("Unknown opcode %d\n", instruction);
            return offset + 1;
        }
    }

    public static int simpleInstruction(String name, int offset) {
        System.out.printf("%s\n", name);
        return offset + 1;
    }

    public static int constantInstruction(String name, Chunk chunk, int offset) {
        int idx = chunk.getCode(offset + 1) & 0xff;
        Value value = chunk.getConstant(idx);
        System.out.printf("%-16s %4d '%s'%n", name, idx, value);
        return offset + 2;
    }

}
