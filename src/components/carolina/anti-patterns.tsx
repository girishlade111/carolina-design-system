"use client";

import { Ban } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";

const PROHIBITED = [
  {
    title: "Raw hex in component code",
    body: "Do not hard-code colors like #fc7200 in components. Reference semantic tokens (color.text.tertiary) so theme changes propagate.",
  },
  {
    title: "Hidden focus indicators",
    body: "Do not remove :focus-visible outlines without an equivalent replacement. Keyboard users must always see where they are.",
  },
  {
    title: "Low-contrast text",
    body: "Do not place orange on light surfaces for body text (2.9:1). Reserve it for large text or the dark base.",
  },
  {
    title: "One-off spacing exceptions",
    body: "Do not introduce values outside the space.* scale (e.g. 7px, 13px). Compose from the scale instead.",
  },
  {
    title: "Ambiguous labels",
    body: "Do not use 'click here', 'learn more', or icon-only buttons without an aria-label. Labels must describe the action.",
  },
  {
    title: "Stateless components",
    body: "Do not ship a component without explicit hover, focus-visible, active, disabled, loading, and error rules.",
  },
  {
    title: "Color-only signaling",
    body: "Do not convey state with color alone. Pair error red with text and an icon; pair link color with an underline.",
  },
  {
    title: "Invented motion",
    body: "Do not introduce durations or easings outside the motion tokens. Keep transitions ≤ 200ms for interaction feedback.",
  },
];

export function AntiPatterns() {
  return (
    <section id="antipatterns" className="scroll-mt-20">
      <SectionHeading
        index="06"
        eyebrow="Guardrails"
        title="Anti-patterns & prohibited implementations"
        description="These implementations break Carolina's consistency, accessibility, or delivery goals and must not ship."
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {PROHIBITED.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.03}>
            <article className="flex h-full gap-3 rounded-c border border-danger/25 bg-danger/[0.04] p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-c bg-danger/10 text-danger">
                <Ban className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <h3 className="text-c-md font-semibold text-ink mb-1.5">
                  {p.title}
                </h3>
                <p className="text-c-sm text-ink-muted lh-base-c">{p.body}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
