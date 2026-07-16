package io.Cbuild;

import io.Cbuild.ySharpBackend.ySharpBackend;
import org.stringtemplate.v4.ST;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Expansion {

    public static class BaseExpansionEngine extends ExecIR.BaseExecIR { }

    public static class ySharpExpansionEngine extends Expansion.BaseExpansionEngine {

        private final ySharpValueExpansionEngine valueExpansionEngine;
        private final Env context;

        public ySharpExpansionEngine(Env context) {
            this.valueExpansionEngine = new ySharpValueExpansionEngine(context);
            this.context = context;
        }

        @Override
        public <T> T exec(cBuildIR.AssignmentIR ir) {
            String identifier = ir.left.exec(this.valueExpansionEngine);
            if(ir.type == cBuildIR.AssignmentType.SIMPLE) {
                String value = ir.right.exec(this.valueExpansionEngine);
                context.putRawVariable(identifier, value);
            }
            if(ir.type == cBuildIR.AssignmentType.RECURSIVE) {
                context.putDeferredVariable(identifier, ir.right);
            }

            return null;
        }
    }

    public static class ySharpValueExpansionEngine extends Expansion.BaseExpansionEngine {

        private final Env context;

        private final Set<String> activeLookups;

        public ySharpValueExpansionEngine(Env context) {
            this.context = context;
            this.activeLookups = new HashSet<>();
        }

        public void clearActiveLookups() {
            this.activeLookups.clear();
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> T exec(cBuildIR.ValueIR ir) {
            return (T) expandValueToString(ir, activeLookups);
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> T exec(cBuildIR.VarRefPart varRef) {
            return (T) expandVarRefToString(varRef, activeLookups);
        }

        @Override
        @SuppressWarnings("unchecked")
        public <T> T exec(cBuildIR.TextPart part) {
            return (T) part.lexeme;
        }

        private String expandValueToString(cBuildIR.ValueIR ir, Set<String> activeLookups) {
            StringBuilder builder = new StringBuilder();
            for(cBuildIR.ValuePart part : ir.parts) {
                if(part instanceof cBuildIR.VarRefPart refPart) {
                    builder.append(expandVarRefToString(refPart, activeLookups));
                }
                if(part instanceof cBuildIR.TextPart textPart) {
                    builder.append(textPart.lexeme);
                }
            }
            return builder.toString();
        }

        private String expandVarRefToString(cBuildIR.VarRefPart varRef, Set<String> activeLookups) {
            StringBuilder builder = new StringBuilder();
            for(cBuildIR.ValuePart part : varRef.nameExpr.parts) {
                if(part instanceof cBuildIR.VarRefPart refPart) {
                    builder.append(expandVarRefToString(refPart, activeLookups));
                }
                if(part instanceof cBuildIR.TextPart textPart) {
                    builder.append(textPart.lexeme);
                }
            }
            String identifier = builder.toString();

            if (activeLookups.contains(identifier)) {
                throw new cbuildException(
                        cbuildException.ErrorType.SEMANTIC,
                        "Recursive variable '" + identifier
                                + "' references itself (eventually)."
                );
            }

            if(context.symbolTable.containsKey(identifier)) {
                Env.SymbolTableVariable var = context.symbolTable.get(identifier);
                if(var.isDeferred()) {
                    cBuildIR.ValueIR valueIR =  var.getDeferredValue();
                    activeLookups.add(identifier);
                    String rawValue = exec(valueIR);
                    activeLookups.remove(identifier);
                    context.overrideVariable(identifier, Env.SymbolTableVariable.deferredVariable(valueIR, rawValue));
                    return rawValue;
                }

                return context.symbolTable.get(identifier).getRawValue();
            }
            return "";
        }
    }

    public static class ySharpRecipeExpansionEngine extends Expansion.BaseExpansionEngine {

        private final Env context;
        public ySharpRecipeExpansionEngine(Env context) {
            this.context = context;
        }

        @Override
        public String exec(cBuildIR.RecipeIR ir) {
            ySharpValueExpansionEngine valueExpansionEngine
                    = new ySharpValueExpansionEngine(this.context);
            String expandedShellCommand = valueExpansionEngine.exec( ir.command);
            return expandedShellCommand;
        }
    }

    public String expandValue(cBuildIR.ValueIR ir, Env context) {
        ySharpValueExpansionEngine engine = new Expansion.ySharpValueExpansionEngine(context);
        return ir.exec(engine);
    }

    public void expand(List<cBuildIR.IR> instructions, Env context) {
        ySharpExpansionEngine expansionEngine = new ySharpExpansionEngine(context);
        for(cBuildIR.IR ir : instructions) {
            ir.exec(expansionEngine);
        }
    }

    public void expand(cBuildIR.IR instruction, Env context) {
        ySharpExpansionEngine expansionEngine = new ySharpExpansionEngine(context);
        instruction.exec(expansionEngine);
    }
}
