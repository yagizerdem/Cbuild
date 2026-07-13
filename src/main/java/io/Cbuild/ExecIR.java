package io.Cbuild;

public class ExecIR {

    public static abstract class AbstractExecIR {
        public abstract <T> T exec(cBuildIR.ValueIR ir);

        public abstract <T> T exec(cBuildIR.VarRefPart ir);

        public abstract  <T> T exec(cBuildIR.TextPart ir);

        public abstract <T> T exec(cBuildIR.AssignmentIR ir);

        public abstract  <T> T exec(cBuildIR.FunctionIR ir);

        public abstract <T>  T exec(cBuildIR.ConditionalIR ir);

        public abstract <T> T exec(cBuildIR.NormalRuleIR ir);

        public abstract <T> T exec(cBuildIR.StaticPatternRuleIR ir);

        public abstract  <T> T exec(cBuildIR.TargetRuleIR ir);

        public abstract <T> T exec(cBuildIR.VpathIR ir);

        public abstract <T> T exec(cBuildIR.YsharpHookIR ir);

        public abstract <T> T exec(cBuildIR.RecipeIR ir);

        public abstract <T> T exec(cBuildIR.DefineIR ir);
    }

    public static class BaseExecIR extends AbstractExecIR {

        public <T> T exec(cBuildIR.ValueIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.VarRefPart ir) {
            return null;
        }

        public <T> T exec(cBuildIR.TextPart ir) {
            return null;
        }

        public <T> T exec(cBuildIR.AssignmentIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.FunctionIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.ConditionalIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.NormalRuleIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.StaticPatternRuleIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.TargetRuleIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.VpathIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.YsharpHookIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.RecipeIR ir) {
            return null;
        }

        public <T> T exec(cBuildIR.DefineIR ir) {
            return null;
        }
    }
}
