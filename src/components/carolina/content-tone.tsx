"use client";

import { Check, X } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";

const TONE = {
  voice: "concise, confident, implementation-focused",
  rules: [
    "Write in the active voice and present tense.",
    "Lead with the action; keep sentences under 25 words.",
    "Use sentence case for headings and button labels.",
    "Prefer specific verbs (configure, deploy, regenerate) over generic ones (handle, process, do).",
  ],
};

const EXAMPLES = [
  {
    do: "Configure the token before deploying the surface.",
    dont: "You might want to consider configuring the token prior to deployment.",
  },
  {
    do: "Regenerate tokens when the palette changes.",
    dont: "Tokens can be regenerated if needed.",
  },
  {
    do: "Press Tab to move between fields.",
    dont: "Use the keyboard to navigate the form fields as appropriate.",
  },
  {
    do: "Enter a valid email address.",
    dont: "Invalid input. Please try again.",
  },
];

export function ContentTone() {
  return (
    <section id="content" className="scroll-mt-20">
      <SectionHeading
        index="05"
        eyebrow="Voice"
        title="Content & tone standards"
        description="Carolina speaks to developers and technical teams in a concise, confident, implementation-focused voice."
      />

      <Reveal>
        <div className="rounded-c border border-border bg-surface-strong/30 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="font-mono text-c-xs uppercase tracking-wider text-ink-muted">
              Voice
            </span>
            <span className="rounded-c bg-accent/10 border border-accent/40 px-3 py-1 text-c-sm text-accent">
              {TONE.voice}
            </span>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {TONE.rules.map((r) => (
              <li
                key={r}
                className="flex gap-2.5 text-c-sm text-ink"
              >
                <Check className="h-4 w-4 shrink-0 text-success mt-0.5" aria-hidden />
                <span className="lh-base-c">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="grid gap-3 lg:grid-cols-2">
        {EXAMPLES.map((ex, i) => (
          <Reveal key={i} delay={i * 0.03}>
            <div className="rounded-c border border-border bg-surface-strong/30 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <Check className="h-4 w-4 text-success" aria-hidden />
                <span className="font-mono text-c-xs uppercase tracking-wider text-success">
                  Do
                </span>
              </div>
              <p className="px-4 py-3 text-c-md text-ink">{ex.do}</p>
              <div className="flex items-center gap-2 border-y border-border bg-danger/5 px-4 py-2.5">
                <X className="h-4 w-4 text-danger" aria-hidden />
                <span className="font-mono text-c-xs uppercase tracking-wider text-danger">
                  Don&apos;t
                </span>
              </div>
              <p className="px-4 py-3 text-c-md text-ink-muted line-through decoration-ink-muted/40">
                {ex.dont}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
