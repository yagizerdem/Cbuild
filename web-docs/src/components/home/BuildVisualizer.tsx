import type { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type State = "rebuild" | "fresh" | "skipped";

type GraphNode = {
  id: string;
  x: number;
  y: number;
};

type Scenario = {
  id: string;
  label: string;
  command: string;
  states: Record<string, State>;
  notes: Record<string, string>;
  output: string[];
  summary: string;
};

const NODE_WIDTH = 132;
const NODE_HEIGHT = 56;

const nodes: GraphNode[] = [
  { id: "main.c", x: 8, y: 24 },
  { id: "util.c", x: 8, y: 176 },
  { id: "main.o", x: 214, y: 24 },
  { id: "util.o", x: 214, y: 176 },
  { id: "app", x: 420, y: 100 },
];

const edges: [string, string][] = [
  ["main.c", "main.o"],
  ["util.c", "util.o"],
  ["main.o", "app"],
  ["util.o", "app"],
];

const scenarios: Scenario[] = [
  {
    id: "first",
    label: "First build",
    command: "cbuild -j 2",
    states: {
      "main.c": "fresh",
      "util.c": "fresh",
      "main.o": "rebuild",
      "util.o": "rebuild",
      app: "rebuild",
    },
    notes: {
      "main.c": "source",
      "util.c": "source",
      "main.o": "missing",
      "util.o": "missing",
      app: "missing",
    },
    output: [
      "cc -c main.c -o main.o",
      "cc -c util.c -o util.o",
      "cc main.o util.o -o app",
    ],
    summary:
      "Both objects compile side by side, then app links once they finish.",
  },
  {
    id: "edit",
    label: "Edit util.c",
    command: "cbuild -j 2",
    states: {
      "main.c": "fresh",
      "util.c": "rebuild",
      "main.o": "skipped",
      "util.o": "rebuild",
      app: "rebuild",
    },
    notes: {
      "main.c": "unchanged",
      "util.c": "edited",
      "main.o": "newer than main.c",
      "util.o": "older than util.c",
      app: "older than util.o",
    },
    output: ["cc -c util.c -o util.o", "cc main.o util.o -o app"],
    summary:
      "Only the branch under the edited file runs. main.o is left alone.",
  },
  {
    id: "nothing",
    label: "Nothing changed",
    command: "cbuild",
    states: {
      "main.c": "fresh",
      "util.c": "fresh",
      "main.o": "fresh",
      "util.o": "fresh",
      app: "fresh",
    },
    notes: {
      "main.c": "unchanged",
      "util.c": "unchanged",
      "main.o": "up to date",
      "util.o": "up to date",
      app: "up to date",
    },
    output: [],
    summary: "Every target is newer than its inputs, so no command runs.",
  },
];

const stateLabels: Record<State, string> = {
  rebuild: "Changed or rebuilt",
  fresh: "Up to date",
  skipped: "Skipped",
};

const stateColor: Record<State, string> = {
  rebuild: "var(--rebuild)",
  fresh: "var(--fresh)",
  skipped: "var(--skipped)",
};

function nodeById(id: string): GraphNode {
  return nodes.find((node) => node.id === id)!;
}

function Graph({ scenario }: { scenario: Scenario }): ReactNode {
  return (
    <svg
      viewBox="0 0 560 256"
      className="h-auto w-full"
      role="img"
      aria-label={`Dependency graph for "${scenario.label}"`}
    >
      {edges.map(([from, to]) => {
        const a = nodeById(from);
        const b = nodeById(to);
        const x1 = a.x + NODE_WIDTH;
        const y1 = a.y + NODE_HEIGHT / 2;
        const x2 = b.x;
        const y2 = b.y + NODE_HEIGHT / 2;
        const mid = (x1 + x2) / 2;
        const active = scenario.states[to] === "rebuild";
        return (
          <path
            key={`${from}-${to}`}
            d={`M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`}
            fill="none"
            stroke={active ? "var(--rebuild)" : "var(--rule)"}
            strokeWidth={active ? 2 : 1.25}
            className="motion-safe:transition-[stroke] motion-safe:duration-300"
          />
        );
      })}
      {nodes.map((node) => {
        const state = scenario.states[node.id];
        return (
          <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
            <rect
              width={NODE_WIDTH}
              height={NODE_HEIGHT}
              rx={4}
              fill="var(--panel)"
              stroke={stateColor[state]}
              strokeWidth={state === "rebuild" ? 2 : 1.25}
              className="motion-safe:transition-[stroke] motion-safe:duration-300"
            />
            <rect
              width={5}
              height={NODE_HEIGHT}
              rx={1}
              fill={stateColor[state]}
              className="motion-safe:transition-[fill] motion-safe:duration-300"
            />
            <text
              x={18}
              y={24}
              fill="var(--ink)"
              className="font-mono text-[15px] font-medium"
            >
              {node.id}
            </text>
            <text
              x={18}
              y={43}
              fill="var(--ink-soft)"
              className="font-mono text-[11px]"
            >
              {scenario.notes[node.id]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Buildfile(): ReactNode {
  return (
    <pre className="m-0 overflow-x-auto bg-transparent p-5 [tab-size:4] font-mono text-[13px] leading-6 text-ink">
      <code>
        <span className="text-ink-soft">CC = cc</span>
        {"\n\n"}
        <span className="font-semibold">app:</span> main.o util.o{"\n"}
        {"\t"}$(CC) $^ -o $@{"\n\n"}
        <span className="font-semibold">%.o:</span> %.c{"\n"}
        {"\t"}$(CC) -c $&lt; -o $@
      </code>
    </pre>
  );
}

function Legend(): ReactNode {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
      {(Object.keys(stateLabels) as State[]).map((state) => (
        <li key={state} className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block size-2.5 rounded-[2px]"
            style={{ background: stateColor[state] }}
          />
          {stateLabels[state]}
        </li>
      ))}
    </ul>
  );
}

export default function BuildVisualizer(): ReactNode {
  return (
    <Tabs defaultValue="first" className="gap-0">
      <div className="flex flex-col gap-4 pb-5 md:flex-row md:items-end md:justify-between">
        <TabsList className="h-auto rounded-[4px] border border-rule bg-steel-deep p-1">
          {scenarios.map((scenario) => (
            <TabsTrigger
              key={scenario.id}
              value={scenario.id}
              className="rounded-[3px] px-3 py-1.5 text-sm data-[state=active]:bg-panel data-[state=active]:shadow-none"
            >
              {scenario.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <Legend />
      </div>

      {scenarios.map((scenario) => (
        <TabsContent
          key={scenario.id}
          value={scenario.id}
          className="overflow-hidden rounded-[4px] border border-rule bg-panel"
        >
          <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="border-b border-rule md:border-r md:border-b-0">
              <p className="border-b border-rule px-5 py-2.5 font-mono text-xs text-ink-soft">
                CBuildfile
              </p>
              <Buildfile />
            </div>
            <div className="p-4 md:p-6">
              <Graph scenario={scenario} />
              <p className="mt-3 text-sm text-ink-soft">{scenario.summary}</p>
            </div>
          </div>
          <div className="bg-terminal px-5 py-4 font-mono text-[13px] leading-6 text-terminal-fg">
            <p>
              <span className="text-skipped">$ </span>
              {scenario.command}
            </p>
            {scenario.output.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p
              className={cn(
                "text-skipped",
                scenario.output.length > 0 && "mt-1",
              )}
            >
              {scenario.output.length === 0
                ? "No commands ran. Exit status 0."
                : `${scenario.output.length} commands ran. Exit status 0.`}
            </p>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
