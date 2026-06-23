"use client";

import { SectionHeading, DemoCell, Pill } from "./primitives";

export function ShowcaseLists() {
  return (
    <section id="components-lists" className="scroll-mt-24">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-3">
          <Pill tone="accent">density: 2</Pill>
          <h3 className="text-c-2xl font-bold text-ink">Lists</h3>
        </div>
        <p className="text-c-sm text-ink-muted max-w-2xl lh-base-c">
          Ordered, unordered, and definition lists. Long content wraps; vertical
          lists use <code className="font-mono">space.6</code> between items;
          nested lists indent with <code className="font-mono">space.7</code>.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <DemoCell label="unordered">
          <ul className="flex flex-col gap-2 text-c-sm text-ink w-full">
            <li className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Tokenize every color decision before shipping.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Provide a focus-visible ring on all interactive elements.
            </li>
            <li className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              Pair every error state with an accessible message.
            </li>
          </ul>
        </DemoCell>

        <DemoCell label="ordered">
          <ol className="flex flex-col gap-2 text-c-sm text-ink w-full">
            <li className="flex gap-2.5">
              <span className="font-mono text-c-xs text-accent mt-0.5">01</span>
              Define foundations and semantic tokens.
            </li>
            <li className="flex gap-2.5">
              <span className="font-mono text-c-xs text-accent mt-0.5">02</span>
              Specify component anatomy, variants, and states.
            </li>
            <li className="flex gap-2.5">
              <span className="font-mono text-c-xs text-accent mt-0.5">03</span>
              Add testable accessibility acceptance criteria.
            </li>
          </ol>
        </DemoCell>

        <DemoCell label="definition">
          <dl className="flex flex-col gap-3 w-full">
            <div>
              <dt className="font-mono text-c-xs text-accent">token</dt>
              <dd className="text-c-sm text-ink-muted">
                A named, reusable design decision (color, space, type).
              </dd>
            </div>
            <div>
              <dt className="font-mono text-c-xs text-accent">semantic</dt>
              <dd className="text-c-sm text-ink-muted">
                A token whose name describes intent, not appearance.
              </dd>
            </div>
          </dl>
        </DemoCell>

        <DemoCell label="overflow (scroll)">
          <ul className="max-h-40 w-full overflow-y-auto scroll-carolina flex flex-col gap-1.5 pr-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <li
                key={i}
                className="flex items-center justify-between rounded-c border border-border bg-surface-base/40 px-3 py-2 text-c-sm text-ink"
              >
                <span>endpoint-{String(i + 1).padStart(2, "0")}.carolina.io</span>
                <span className="font-mono text-c-xs text-ink-muted">
                  200
                </span>
              </li>
            ))}
          </ul>
        </DemoCell>
      </div>

      <DemoCell label="long content (wraps, no truncation)" className="mt-3">
        <ul className="flex flex-col gap-2 text-c-sm text-ink w-full max-w-xl">
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            When a list item contains long content it must wrap to multiple
            lines rather than truncate, so that scanning remains possible on
            narrow viewports and screen readers receive the full text.
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            Empty state: render an explicit empty message instead of an empty
            list region.
          </li>
        </ul>
      </DemoCell>
    </section>
  );
}
