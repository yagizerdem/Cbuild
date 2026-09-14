import { LuaEngine, LuaFactory } from "wasmoon";
import registerStdio from "@cbuild-backend/interpreter/natives/stdio.js";
import registerMath from "@cbuild-backend/interpreter/natives/math.js";
import registerContext from "@cbuild-backend/interpreter/natives/context.js";
import registerFs from "@cbuild-backend/interpreter/natives/fs.js";
import registerString from "@cbuild-backend/interpreter/natives/string.js";
import registerOs from "@cbuild-backend/interpreter/natives/os.js";
import { Env } from "@cbuild-backend/env.js";

const factory = new LuaFactory();

export default class Interpreter {
  private lua: LuaEngine | null = null;
  private context: Env | null = null;

  init(context: Env) {
    this.context = context;
  }

  async runAsync(code: string) {
    if (this.context === null) {
      // programmatic error. the interpreter must be initialized with a context before running code.
      throw new Error("Interpreter context is not initialized.");
    }

    try {
      this.lua = await factory.createEngine({
        openStandardLibs: false,
        functionTimeout: 10_000, // 10 seconds timeout for Lua functions
      });

      registerStdio(this.lua);
      registerMath(this.lua);
      registerContext(this.lua, this.context);
      registerFs(this.lua);
      registerString(this.lua);
      registerOs(this.lua);
      registerOs(this.lua);

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
