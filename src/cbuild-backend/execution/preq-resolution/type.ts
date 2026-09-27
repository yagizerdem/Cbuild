import { VpathRule } from "@src/cbuild-backend/model.js";

export type PreqMeta = {
  outOfDate: boolean;
};

export type PreqType =
  | "cwd"
  | "absolute"
  | "vpath"
  | "target-rule" // does not has file but has target rule
  | "not-found";

export type PreqResolution<TMeta extends PreqMeta> = {
  preqName: string;
  vpathRules: VpathRule[];
  meta?: TMeta;
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
