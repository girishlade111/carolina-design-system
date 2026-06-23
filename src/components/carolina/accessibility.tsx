"use client";

import { Check, X, Keyboard } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";

const CRITERIA = [
  {
    id: "contrast",
    title: "Color contrast meets AA",
    body: "Body text ≥ 4.5:1; large text (≥24px or ≥18.66px bold) and UI components ≥ 3:1 against their background.",
    pass: "White (#ffffff) on black (#000000) = 21:1. Orange (#fc7200) on black = 6.9:1.",
    fail: "Orange (#fc7200) on white (#f2f2f2) = 2.9:1 — fails for body text. Use it only for large text / UI on light surfaces.",
  },
  {
    id: "focus",
    title: "Focus-visible is never hidden",
    body: "Every interactive element shows a visible focus indicator on keyboard focus. outlines are never removed without a replacement.",
    pass: ":focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }",
    fail: "outline: none with no alternative indicator.",
  },
  {
    id: "keyboard",
    title: "Full keyboard operability",
    body: "All functionality is reachable and operable via keyboard. Custom widgets implement the relevant WAI-ARIA pattern (tabs, menu, etc.).",
    pass: "Tabs use roving tabindex + arrow keys; Escape closes overlays.",
    fail: "A custom dropdown that only opens on click and traps no focus management.",
  },
  {
    id: "labels",
    title: "Descriptive labels & names",
    body: "Every form control has a programmatic label; every icon-only control has an aria-label. No ambiguous labels like 'click here'.",
    pass: "<label for=\"email\">Email</label> paired with <input id=\"email\">.",
    fail: "A search input with placeholder-only labeling and no accessible name.",
  },
  {
    id: "target",
    title: "Touch targets ≥ 44×44px",
    body: "Interactive elements meet the 44×44px minimum on touch surfaces, with adequate spacing between adjacent targets.",
    pass: "Buttons use h-11 (44px); sidebar links have py-2 (≥44px row).",
    fail: "A 24×24px close icon with no padding expanding its hit area.",
  },
  {
    id: "status",
    title: "State is announced",
    body: "Loading, error, and success states are communicated to assistive tech via aria-live, aria-invalid, and describedby.",
    pass: "Loading button keeps label + spinner; errors use aria-invalid + describedby.",
    fail: "An error shown only as a red border with no text or aria reference.",
  },
];

export function Accessibility() {
  return (
    <section id="accessibility" className="scroll-mt-20">
      <SectionHeading
        index="04"
        eyebrow="A11y"
        title="Accessibility requirements"
        description="Target: WCAG 2.2 AA. Every rule below is testable — each carries a pass example and a fail example you can assert against an implementation."
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {CRITERIA.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.03}>
            <article className="flex h-full flex-col rounded-c border border-border bg-surface-strong/30 p-5">
              <header className="flex items-center gap-3 mb-3">
                <span className="grid h-8 w-8 place-items-center rounded-c bg-accent/10 text-accent">
                  <Keyboard className="h-4 w-4" aria-hidden />
                </span>
                <h3 className="text-c-md font-semibold text-ink">{c.title}</h3>
              </header>
              <p className="text-c-sm text-ink-muted lh-base-c mb-4">{c.body}</p>
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex gap-2 rounded-c border border-success/30 bg-success/5 p-3">
                  <Check className="h-4 w-4 shrink-0 text-success mt-0.5" aria-hidden />
                  <code className="font-mono text-c-xs text-ink leading-relaxed">
                    {c.pass}
                  </code>
                </div>
                <div className="flex gap-2 rounded-c border border-danger/30 bg-danger/5 p-3">
                  <X className="h-4 w-4 shrink-0 text-danger mt-0.5" aria-hidden />
                  <code className="font-mono text-c-xs text-ink-muted leading-relaxed">
                    {c.fail}
                  </code>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
