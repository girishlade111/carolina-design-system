"use client";

import { SectionHeading, Reveal } from "./primitives";

const GOALS = [
  {
    n: "G1",
    title: "Token-driven consistency",
    body: "Every visual decision resolves to a named token, so implementations stay consistent without one-off overrides.",
  },
  {
    n: "G2",
    title: "Ship accessible by default",
    body: "WCAG 2.2 AA is the floor. Keyboard-first interaction and visible focus are required, not optional.",
  },
  {
    n: "G3",
    title: "Fast, confident delivery",
    body: "State coverage and edge-case rules let teams implement once without re-litigating decisions.",
  },
];

const PRINCIPLES = [
  "Use semantic tokens, not raw hex values.",
  "Every component defines default, hover, focus-visible, active, disabled, loading, and error states.",
  "Specify responsive behavior and edge-case handling for every component family.",
  "Accessibility acceptance criteria must be testable in implementation.",
];

export function ContextGoals() {
  return (
    <section id="context" className="scroll-mt-20">
      <SectionHeading
        index="01"
        eyebrow="Intent"
        title="Context & goals"
        description="Deliver implementation-ready design-system guidance for Carolina that can be applied consistently across documentation site interfaces — for developers and technical teams."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-c border border-border bg-surface-strong/30 p-6">
            <h3 className="text-c-xl font-semibold text-ink mb-4">
              Design intent
            </h3>
            <p className="text-c-md text-ink-muted lh-base-c mb-4">
              Carolina is a structured, accessible, implementation-first design
              system. Its surfaces are dark-first to maximize the contrast of
              its primary ink (white) and accent (orange), with a reserved
              light surface for code and high-legibility callouts.
            </p>
            <ul className="flex flex-col gap-2.5">
              {PRINCIPLES.map((p) => (
                <li
                  key={p}
                  className="flex gap-2.5 text-c-sm text-ink"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span className="lh-base-c">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-col gap-3">
            {GOALS.map((g) => (
              <div
                key={g.n}
                className="rounded-c border border-border bg-surface-strong/30 p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-c-xs text-accent">{g.n}</span>
                  <h4 className="text-c-md font-semibold text-ink">{g.title}</h4>
                </div>
                <p className="text-c-sm text-ink-muted lh-base-c">{g.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
