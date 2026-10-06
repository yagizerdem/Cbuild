import { EvaluatedRule } from "@tinymake-backend/evaluator.js";
import { DeqpGraph } from "@tinymake-backend/graph.js";
import { TinyMakeExpansionEngine } from "@tinymake-backend/expansion.js";
import { TinyMakeEnv } from "@tinymake-backend/env.js";
import { ExecResult, TinyMakeShell } from "@tinymake-backend/shell.js";
import path from "node:path";
import fs from "fs";

interface TinyMakeSchedularSchedularOptions {
  depqGraph: DeqpGraph;
  context: TinyMakeEnv;
}

export class TinyMakeSchedular {
  private readonly depqGrpah: DeqpGraph;
  private activeTargets = new Set<string>(); //  active rule targets
  private failedTargets = new Set<string>(); // not-builded targets
  private compleatedTargets = new Set<string>(); // builded targets

  private depqCounter: Record<string, number> = {}; // holds target name - remaining depq count
  private activeBuildProcesses: Set<Promise<void>> = new Set();
  private readonly context: TinyMakeEnv;

  constructor(options: TinyMakeSchedularSchedularOptions) {
    this.depqGrpah = options.depqGraph;
    this.context = options.context;

    for (const rule of options.depqGraph.rules) {
      this.depqCounter[rule.target] =
        options.depqGraph.targetDepqMap[rule.target].length;
    }
  }

  private shouldRebuild(target: string) {
    const rule = this.depqGrpah.targetRuleMap[target];

    const targetAbsPath = path.resolve(process.cwd(), rule.target);
    if (!fs.existsSync(targetAbsPath)) return true;
    const targetLastModifiedDate: number = fs.statSync(targetAbsPath).mtimeMs;

    for (const preq of rule.preqs) {
      const preqAbsPath = path.resolve(process.cwd(), preq);
      const preqFileExist = fs.existsSync(preqAbsPath);

      if (
        !preqFileExist &&
        !Object.keys(this.depqGrpah.targetRuleMap).includes(preq)
      ) {
        throw new Error(
          "tinymake: No rule to make targert needed by . Stop...",
        );
      }

      // rule should be rebuilded
      if (!preqFileExist) {
        continue;
      }

      const preqLastModifiedDate: number = fs.statSync(preqAbsPath).mtimeMs;

      if (preqLastModifiedDate >= targetLastModifiedDate) {
        return true;
      }
    }

    return false;
  }

  private collectNextRules(): string[] {
    return Object.keys(this.depqCounter).filter((key) => {
      if (
        this.compleatedTargets.has(key) ||
        this.failedTargets.has(key) ||
        this.activeTargets.has(key)
      )
        return false;

      return this.depqCounter[key] === 0;
    });
  }

  private async buildTarget(target: string) {
    const rule = this.depqGrpah.targetRuleMap[target];

    if (!this.shouldRebuild(rule.target)) return;

    for (const recipe of rule.recipes) {
      const expansion = new TinyMakeExpansionEngine(this.context);
      const command = expansion.expand(recipe).trim();

      // execute command
      const shell = new TinyMakeShell({
        abortController: new AbortController(),
        captureStderr: true,
        captureStdout: true,
        env: process.env,
      });

      const result: ExecResult = await shell.exec(command);

      console.log(command);
      if (result.exitcode == 0) {
        process.stdout.write(result.stdout);
      } else {
        process.stderr.write(result.stderr);
      }
    }
  }

  private sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  public async schedule() {
    const maxSlotsSize = this.context.cliOptions.jobs ?? 1;

    while (
      this.compleatedTargets.size + this.failedTargets.size <
      this.depqGrpah.rules.length
    ) {
      const availableSlotSize = maxSlotsSize - this.activeBuildProcesses.size;

      if (availableSlotSize <= 0) {
        await this.sleep(100);
      }

      const rules: EvaluatedRule[] = this.collectNextRules().map(
        (t) => this.depqGrpah.targetRuleMap[t],
      );

      const chunk = rules.slice(0, availableSlotSize);

      const processes = chunk.map((rule) => {
        const process = new Promise<void>(async (resolve, reject) => {
          try {
            await this.buildTarget(rule.target);
            // build successfully
            this.compleatedTargets.add(rule.target);
            resolve();
          } catch (error) {
            reject(error);
          } finally {
          }
        });

        process.finally(() => {
          this.activeTargets.delete(rule.target);
          this.activeBuildProcesses.delete(process);

          // the targets that affected by this build
          const dependents = this.depqGrpah.reverseTargetRuleMap[rule.target];

          // reduce their depq counter -1
          dependents.forEach((rule) => {
            this.depqCounter[rule.target]--;
          });
        });

        process.catch(() => {
          this.failedTargets.add(rule.target);
        });

        return process;
      });

      processes.forEach((process) => {
        this.activeBuildProcesses.add(process);
      });

      chunk.forEach((rule) => {
        this.activeTargets.add(rule.target);
      });

      await Promise.race(this.activeBuildProcesses);
    }
  }
}
