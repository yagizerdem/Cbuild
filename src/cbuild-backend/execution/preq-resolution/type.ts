import { VpathRule } from "@src/cbuild-backend/model.js";

export type PreqType =
  | "cwd"
  | "absolute"
  | "vpath"
  | "target-rule" // does not has file but has target rule
  | "not-found";

export type PreqResolution = {
  preqName: string;
  vpathRules: VpathRule[];
} & (
  | {
      origin: {
        type: "target-rule" | "not-found";
      };
    }
  | {
      origin: {
        type: Exclude<PreqType, "target-rule" | "not-found">;
        absolutePath: string;
      };
    }
);

export type TargetType = "cwd" | "absolute" | "vpath" | "not-found";

export type TargetResolution = {
  targetName: string;
  vpathRules: VpathRule[];
} & (
  | {
      origin: {
        type: "not-found";
      };
    }
  | {
      origin: {
        type: Exclude<TargetType, "not-found">;
        absolutePath: string;
      };
    }
);
