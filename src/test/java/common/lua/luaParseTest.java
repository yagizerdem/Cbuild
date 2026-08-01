package common.lua;

import com.ibm.icu.impl.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import util.utils;
import io.Cbuild.cBuildIR;

import java.util.List;

public class luaParseTest {


    @Test
    public void SimpleLuaHook() {
        String buildFile =
"""
    lua {
        print('unit test')
    }
""";

        List<cBuildIR.IR> ir = utils.generateIR(buildFile);
        Assertions.assertFalse(ir.isEmpty());
        Assertions.assertInstanceOf(cBuildIR.LuaHookIR.class, ir.getFirst());
    }

}
