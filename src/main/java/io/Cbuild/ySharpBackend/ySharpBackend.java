package io.Cbuild.ySharpBackend;

import io.Cbuild.cBuildIR;
import io.Cbuild.cbuildException;
import org.stringtemplate.v4.ST;

import java.util.Hashtable;
import java.util.List;

public class ySharpBackend {

    public static Hashtable<String, String> symbolTable = new Hashtable<>();

    public void validateCompatibility(List<cBuildIR.IR> instructions) {
        for (cBuildIR.IR ir : instructions) {
            validateIR(ir);
        }
    }

    public boolean isCompatible(List<cBuildIR.IR> instructions) {
        try {
            validateCompatibility(instructions);
            return true;
        } catch (cbuildException exception) {
            return false;
        }
    }

    private void validateIR(cBuildIR.IR ir) {
        if (!allowedIR(ir)) {
            throw incompatible(
                    ir,
                    "Unsupported IR type for ySharp backend: "
                            + ir.getClass().getSimpleName()
            );
        }

        if (ir instanceof cBuildIR.AssignmentIR assignmentIR) {
            validateAssignment(assignmentIR);
            return;
        }

        if (ir instanceof cBuildIR.NormalRuleIR normalRuleIR) {
            validateNormalRule(normalRuleIR);
        }
    }

    private void validateAssignment(cBuildIR.AssignmentIR assignmentIR) {
        validateParts(
                assignmentIR.left.parts,
                assignmentIR,
                "Assignment left-hand side"
        );

        validateParts(
                assignmentIR.right.parts,
                assignmentIR,
                "Assignment right-hand side"
        );

        String prefix = assignmentIR.prefix.getPrefix();

        if (prefix != null && !prefix.isBlank()) {
            throw incompatible(
                    assignmentIR,
                    "Assignment prefixes are not supported by the ySharp backend: "
                            + prefix
            );
        }
    }

    private void validateNormalRule(cBuildIR.NormalRuleIR normalRuleIR) {
        if (!normalRuleIR.orderonlyprerequisites.isEmpty()) {
            throw incompatible(
                    normalRuleIR,
                    "Order-only prerequisites are not supported by the ySharp backend"
            );
        }

        for (var target : normalRuleIR.targets) {
            validateParts(
                    target.parts,
                    normalRuleIR,
                    "Rule target"
            );
        }

        for (var prerequisite : normalRuleIR.prerequisites) {
            validateParts(
                    prerequisite.parts,
                    normalRuleIR,
                    "Rule prerequisite"
            );
        }

        for (var recipe : normalRuleIR.recipes) {
            if (recipe.conditional != null) {
                throw incompatible(
                        normalRuleIR,
                        "Conditional recipes are not supported by the ySharp backend"
                );
            }
        }
    }

    private void validateParts(
            List<cBuildIR.ValuePart> parts,
            cBuildIR.IR owner,
            String context
    ) {
        for (cBuildIR.ValuePart part : parts) {
            if (part instanceof cBuildIR.FunctionCallPart functionCallPart) {
                throw incompatible(
                        owner,
                        context + " contains an unsupported function call: "
                                + functionCallPart
                );
            }
        }
    }

    private boolean allowedIR(cBuildIR.IR ir) {
        return ir instanceof cBuildIR.AssignmentIR
                || ir instanceof cBuildIR.YsharpHookIR
                || ir instanceof cBuildIR.NormalRuleIR;
    }

    private cbuildException incompatible(cBuildIR.IR ir, String message) {

        return new cbuildException(
                cbuildException.ErrorType.SEMANTIC,
                message,
                ir.getRow(),
                ir.getCol()
        );
    }


    public String expand(cBuildIR.ValueIR ir) {
        StringBuilder builder = new StringBuilder();
        for(cBuildIR.ValuePart part : ir.parts) {
            if(part instanceof cBuildIR.VarRefPart refPart) {
                builder.append(expand(refPart));
            }
            if(part instanceof cBuildIR.TextPart textPart) {
                builder.append(expand(textPart));
            }
        }
        return builder.toString();
    }

    public String expand(cBuildIR.VarRefPart varRef) {
        StringBuilder builder = new StringBuilder();
        for(cBuildIR.ValuePart part : varRef.nameExpr.parts) {
            if(part instanceof cBuildIR.VarRefPart refPart) {
                builder.append(expand(refPart));
            }
            if(part instanceof cBuildIR.TextPart textPart) {
                builder.append(expand(textPart));
            }
        }
        return symbolTable.getOrDefault(builder.toString(), "");
    }

    public String expand(cBuildIR.TextPart part) {
        return part.lexeme;
    }

}