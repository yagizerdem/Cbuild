import { LuaEngine, LuaFactory } from "wasmoon";
import registerStdio from "@cbuild-backend/interpreter/natives/stdio.js";
import registerMath from "@cbuild-backend/interpreter/natives/math.js";

const factory = new LuaFactory();

export class Interpreter {
  private lua: LuaEngine | null = null;

  async runAsync(code: string) {
    try {
      this.lua = await factory.createEngine({
        openStandardLibs: false,
        functionTimeout: 10_000, // 10 seconds timeout for Lua functions
      });

      registerStdio(this.lua);
      registerMath(this.lua);

      await this.lua.doString(code);
    } catch (error) {
      throw error;
    } finally {
      if (this.lua) {
        this.lua.global.close();
        this.lua = null;
      }
    }
  }
}

const globalInterpreter = new Interpreter();
export default globalInterpreter;
