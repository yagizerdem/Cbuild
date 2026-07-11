package io.Cbuild;

public class Expansion {

    public static abstract class AbstractBaseExpansionEngine {

            public abstract <T> T expand(cBuildIR.ValueIR ir);

            public abstract <T> T expand(cBuildIR.VarRefPart ir);

            public abstract  <T> T expand(cBuildIR.TextPart ir);

            public abstract <T> T expand(cBuildIR.AssignmentIR ir);

            public abstract  <T> T expand(cBuildIR.FunctionIR ir);

            public abstract <T>  T expand(cBuildIR.ConditionalIR ir);

            public abstract <T> T expand(cBuildIR.NormalRuleIR ir);

            public abstract <T> T expand(cBuildIR.StaticPatternRuleIR ir);

            public abstract  <T> T expand(cBuildIR.TargetRuleIR ir);

            public abstract <T> T expand(cBuildIR.VpathIR ir);

            public abstract <T> T expand(cBuildIR.YsharpHookIR ir);

            public abstract <T> T expand(cBuildIR.RecipeIR ir);

            public abstract <T> T expand(cBuildIR.DefineIR ir);
        }

    public static class BaseExpansionEngine extends AbstractBaseExpansionEngine {

        @Override
        public <T> T expand(cBuildIR.ValueIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.VarRefPart ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.TextPart ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.AssignmentIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.FunctionIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.ConditionalIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.NormalRuleIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.StaticPatternRuleIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.TargetRuleIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.VpathIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.YsharpHookIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.RecipeIR ir) {
            return null;
        }

        @Override
        public <T> T expand(cBuildIR.DefineIR ir) {
            return null;
        }
    }

    public static class ExpansionResult {

    }
}
