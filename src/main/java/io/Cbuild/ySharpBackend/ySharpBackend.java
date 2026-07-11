package io.Cbuild.ySharpBackend;

import io.Cbuild.cBuildIR;

import javax.imageio.event.IIOReadProgressListener;
import java.util.List;

public class ySharpBackend {

    public boolean isCompatible(List<cBuildIR.IR> instructions) {
        return true;
    }

    private boolean isCompatibleRecursive(List<cBuildIR.IR> instructions) {
        for(cBuildIR.IR ir : instructions) {
            if(!allowedIR(ir)) return false;

            if(ir instanceof cBuildIR.AssignmentIR assignmentIR) {
                if(!allowedParts(assignmentIR.left.parts)) return false;
                if(!allowedParts(assignmentIR.right.parts)) return false;
                if(!(assignmentIR.prefix.getPrefix() == null || assignmentIR.prefix.getPrefix().isBlank())) {
                    return false;
                }
            }

            if(ir instanceof cBuildIR.NormalRuleIR normalRuleIR) {
                if (!normalRuleIR.orderonlyprerequisites.isEmpty()) {
                    return false;
                }

                for (var value : normalRuleIR.targets) {
                    if (!allowedParts(value.parts)) {
                        return false;
                    }
                }

                for (var value : normalRuleIR.prerequisites) {
                    if (!allowedParts(value.parts)) {
                        return false;
                    }
                }

                for (var recipe : normalRuleIR.recipes) {
                    if (recipe.conditional != null) {
                        return false;
                    }
                }

            }
        }

        return true;
    }

    private boolean allowedIR(cBuildIR.IR ir) {
        return ir instanceof cBuildIR.AssignmentIR
                || ir instanceof cBuildIR.YsharpHookIR
                || ir instanceof  cBuildIR.NormalRuleIR;
    }

    private boolean allowedParts(List<cBuildIR.ValuePart> parts) {
        for(cBuildIR.ValuePart part : parts) {
            if(part instanceof cBuildIR.FunctionCallPart) return false;
        }
        return true;
    }

}
