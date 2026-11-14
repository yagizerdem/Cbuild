import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import BuildVisualizer from '@/components/home/BuildVisualizer';
import CopyCommand from '@/components/home/CopyCommand';
import {Button} from '@/components/ui/button';

const INSTALL = 'pip install git+https://github.com/yagizerdem/Cbuild';

const makeFeatures: {name: string; detail: ReactNode}[] = [
  {
    name: 'Pattern rules',
    detail: (
      <>
        <Code>%.o: %.c</Code> with stem matching and the built-in implicit
        rules.
      </>
    ),
  },
  {
    name: 'Includes',
    detail: (
      <>
        <Code>include</Code> and <Code>-include</Code>, with <Code>-I</Code>{' '}
        search directories.
      </>
    ),
  },
  {
    name: 'Conditionals',
    detail: (
      <>
        <Code>ifeq</Code>, <Code>ifneq</Code>, <Code>ifdef</Code> and{' '}
        <Code>ifndef</Code>, nested as deep as you need.
      </>
    ),
  },
  {
    name: 'Order-only prerequisites',
    detail: (
      <>
        <Code>out.o: in.c | build/</Code> waits for the directory without
        rebuilding when it changes.
      </>
    ),
  },
  {
    name: 'Functions',
    detail: (
      <>
        <Code>$(wildcard)</Code>, <Code>$(patsubst)</Code>,{' '}
        <Code>$(filter)</Code>, <Code>$(foreach)</Code>, <Code>$(call)</Code>,{' '}
        <Code>$(shell)</Code> and more.
      </>
    ),
  },
  {
    name: 'Variables',
    detail: (
      <>
        Recursive and simple assignment, <Code>export</Code>, and the automatic
        variables <Code>$@</Code> <Code>$&lt;</Code> <Code>$^</Code>{' '}
        <Code>$?</Code>.
      </>
    ),
  },
];

const flags: [string, string][] = [
  ['-j N', 'Run up to N recipes at once'],
  ['-k', 'Keep going after a recipe fails'],
  ['-n', 'Print the commands without running them'],
  ['-q', 'Exit 0 if everything is up to date, 1 if not'],
  ['-t', 'Touch targets instead of rebuilding them'],
  ['-W file', 'Rebuild as if file had just changed'],
  ['-C dir', 'Change to dir before reading the buildfile'],
  ['-f file', 'Read file instead of CBuildfile'],
];

const steps: {title: string; command: string; body: string}[] = [
  {
    title: 'Install',
    command: INSTALL,
    body: 'Needs Python 3.14 or newer. Installs the cbuild command.',
  },
  {
    title: 'Write a CBuildfile',
    command: 'app: main.o util.o',
    body: 'Same syntax as a Makefile. An existing one usually works as is.',
  },
  {
    title: 'Run cbuild',
    command: 'cbuild -j 4',
    body: 'Builds the first target, running independent recipes in parallel.',
  },
];

function Code({children}: {children: ReactNode}): ReactNode {
  return (
    <code className="rounded-[3px] border border-rule bg-steel px-1.5 py-px font-mono text-[0.85em] text-ink">
      {children}
    </code>
  );
}

function Section({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}): ReactNode {
  return (
    <section className="border-t border-rule py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="mb-4 text-[clamp(1.75rem,3.2vw,2.5rem)] leading-[1.1] font-extrabold tracking-[-0.01em] text-ink [font-stretch:115%]">
          {title}
        </h2>
        {intro && (
          <p className="mb-10 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

function Hero(): ReactNode {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-16 pb-12 md:px-8 md:pt-24">
      <h1 className="max-w-[16ch] text-[clamp(2.6rem,7vw,5.25rem)] leading-[0.98] font-black tracking-[-0.025em] text-ink [font-stretch:125%]">
        Write a makefile. Build only what changed.
      </h1>
      <p className="mt-7 max-w-[58ch] text-lg leading-relaxed text-ink-soft md:text-xl">
        CBuild reads GNU make syntax, runs independent targets in parallel, and
        lets you script the tricky parts in Lua.
      </p>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          asChild
          size="lg"
          className="h-10 rounded-[4px] bg-ink px-5 text-[15px] text-steel hover:bg-ink/90 hover:text-steel">
          <Link to="/docs/introduction">Read the docs</Link>
        </Button>
        <CopyCommand command={INSTALL} className="sm:max-w-md" />
      </div>
    </header>
  );
}

function SpeaksMake(): ReactNode {
  return (
    <Section title="Speaks make">
      <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <p className="max-w-[44ch] text-lg leading-relaxed text-ink-soft">
          CBuild parses Makefile syntax directly, so there is no new language to
          learn. Rules, variables and recipes mean what they mean in GNU make.
          Freshness comes from file timestamps, the same way make decides.
        </p>
        <dl className="border-t border-rule">
          {makeFeatures.map((feature) => (
            <div
              key={feature.name}
              className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
              <dt className="font-semibold text-ink">{feature.name}</dt>
              <dd className="leading-relaxed text-ink-soft">{feature.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function LuaHooks(): ReactNode {
  return (
    <Section
      title="Hooks in Lua"
      intro="A hook block runs while the buildfile is being read. Use it for the logic that is awkward in make: probing files, choosing defaults, computing values.">
      <div className="grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <div className="overflow-hidden rounded-[4px] border border-rule bg-panel">
          <p className="border-b border-rule px-5 py-2.5 font-mono text-xs text-ink-soft">
            CBuildfile
          </p>
          <pre className="m-0 overflow-x-auto bg-transparent p-5 [tab-size:4] font-mono text-[13px] leading-6 text-ink">
            <code>{`hook {
  if not context.contains("CC") then
    context.export("CC", "cc")
  end

  if fs.exists("local.mk") then
    context.export("PROFILE", "local")
  end
}

app: main.o util.o
\t$(CC) $^ -o $@`}</code>
          </pre>
        </div>
        <ul className="border-t border-rule">
          <li className="border-b border-rule py-5">
            <h3 className="mb-1.5 text-base font-semibold text-ink">
              Set make variables
            </h3>
            <p className="leading-relaxed text-ink-soft">
              <Code>context.export</Code> defines a variable the rest of the
              buildfile can expand. <Code>context.contains</Code> checks whether
              one is already set.
            </p>
          </li>
          <li className="border-b border-rule py-5">
            <h3 className="mb-1.5 text-base font-semibold text-ink">
              Read the file system
            </h3>
            <p className="leading-relaxed text-ink-soft">
              <Code>fs</Code>, <Code>os</Code>, <Code>string</Code> and{' '}
              <Code>math</Code> modules cover file checks, platform details and
              text handling.
            </p>
          </li>
          <li className="border-b border-rule py-5">
            <h3 className="mb-1.5 text-base font-semibold text-ink">
              No extra process
            </h3>
            <p className="leading-relaxed text-ink-soft">
              Hooks run inside CBuild, so a check doesn't need to spawn a shell
              the way <Code>$(shell)</Code> does.
            </p>
          </li>
        </ul>
      </div>
    </Section>
  );
}

function Flags(): ReactNode {
  return (
    <Section
      title="Flags you already know"
      intro="The command line follows GNU make, so scripts and habits carry over.">
      <dl className="grid border-t border-rule md:grid-cols-2 md:gap-x-16">
        {flags.map(([flag, meaning]) => (
          <div
            key={flag}
            className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-rule py-3.5">
            <dt>
              <Code>{flag}</Code>
            </dt>
            <dd className="text-ink-soft">{meaning}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function GettingStarted(): ReactNode {
  return (
    <Section title="Getting started">
      <ol className="grid gap-px overflow-hidden rounded-[4px] border border-rule bg-rule md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-4 bg-panel p-6">
            <h3 className="flex items-baseline gap-3 text-lg font-bold text-ink">
              <span className="font-mono text-sm font-medium text-ink-soft">
                {index + 1}
              </span>
              {step.title}
            </h3>
            <code className="block truncate rounded-[3px] border border-rule bg-steel px-3 py-2 font-mono text-[13px] text-ink">
              {step.command}
            </code>
            <p className="leading-relaxed text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
      <Button
        asChild
        variant="outline"
        className="mt-8 h-10 rounded-[4px] border-rule bg-transparent px-5 text-[15px] text-ink shadow-none hover:bg-steel-deep hover:text-ink">
        <Link to="/docs/introduction">Read the introduction</Link>
      </Button>
    </Section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      wrapperClassName="bg-steel"
      title="A GNU make compatible build system"
      description="CBuild reads GNU make syntax, runs independent targets in parallel, and lets you script the tricky parts in Lua.">
      <main className="tw-scope bg-steel font-sans text-ink">
        <Hero />
        <div className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
          <BuildVisualizer />
        </div>
        <SpeaksMake />
        <LuaHooks />
        <Flags />
        <GettingStarted />
      </main>
    </Layout>
  );
}
