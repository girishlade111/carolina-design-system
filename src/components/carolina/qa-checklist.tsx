"use client";

import * as React from "react";
import { Check, RotateCcw } from "lucide-react";
import { SectionHeading, Reveal } from "./primitives";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string };
type Group = { title: string; items: Item[] };

const GROUPS: Group[] = [
  {
    title: "Foundations",
    items: [
      { id: "f1", label: "All colors resolve to semantic tokens — no raw hex in component code." },
      { id: "f2", label: "Typography uses the Public Sans scale (xs → 4xl)." },
      { id: "f3", label: "Spacing uses the space.* scale only — no one-off values." },
      { id: "f4", label: "radius.xs (4px) applied to all controls and surfaces." },
    ],
  },
  {
    title: "Component states",
    items: [
      { id: "c1", label: "Every interactive component defines default, hover, focus-visible, active, disabled, loading, and error." },
      { id: "c2", label: "Buttons meet 44×44px touch targets." },
      { id: "c3", label: "Inputs pair error states with aria-invalid + describedby." },
      { id: "c4", label: "Links show a non-color indicator (underline) in every state." },
    ],
  },
  {
    title: "Accessibility",
    items: [
      { id: "a1", label: "Body text contrast ≥ 4.5:1; large text / UI ≥ 3:1." },
      { id: "a2", label: "Focus-visible indicators present and never hidden." },
      { id: "a3", label: "Full keyboard operability; custom widgets follow WAI-ARIA patterns." },
      { id: "a4", label: "All controls have programmatic labels; no ambiguous actions." },
    ],
  },
  {
    title: "Content & delivery",
    items: [
      { id: "d1", label: "Voice is concise, confident, implementation-focused." },
      { id: "d2", label: "Responsive behavior verified at mobile and desktop widths." },
      { id: "d3", label: "Edge cases handled: long content, overflow, empty states." },
      { id: "d4", label: "Sticky footer holds at viewport bottom; pushes down on overflow." },
    ],
  },
];

const ALL_IDS = GROUPS.flatMap((g) => g.items.map((i) => i.id));

export function QAChecklist() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("carolina-qa");
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem("carolina-qa", JSON.stringify(checked));
    } catch {
      /* ignore */
    }
  }, [checked]);

  const done = ALL_IDS.filter((id) => checked[id]).length;
  const pct = Math.round((done / ALL_IDS.length) * 100);

  const toggle = (id: string) =>
    setChecked((c) => ({ ...c, [id]: !c[id] }));
  const reset = () => setChecked({});

  return (
    <section id="qa" className="scroll-mt-20">
      <SectionHeading
        index="07"
        eyebrow="Ship gate"
        title="QA checklist"
        description="Run this before merging a Carolina implementation. Progress is saved locally so you can resume between sessions."
      />

      <Reveal>
        <div className="rounded-c border border-border bg-surface-strong/30 p-6 mb-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <div>
              <p className="font-mono text-c-xs uppercase tracking-wider text-ink-muted mb-1">
                Completion
              </p>
              <p className="text-c-3xl font-bold text-ink tabular-nums">
                {pct}
                <span className="text-c-lg text-ink-muted">%</span>
              </p>
              <p className="text-c-sm text-ink-muted mt-1">
                {done} of {ALL_IDS.length} checks passed
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-c border border-border px-3 py-2 text-c-sm text-ink-muted transition-colors hover:text-ink hover:border-accent/60"
            >
              <RotateCcw className="h-4 w-4" aria-hidden />
              Reset
            </button>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-c bg-surface-base"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="QA completion"
          >
            <div
              className="h-full rounded-c bg-accent transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {pct === 100 ? (
            <p className="mt-4 text-c-sm text-success flex items-center gap-2">
              <Check className="h-4 w-4" aria-hidden />
              All checks passed — ready to ship.
            </p>
          ) : null}
        </div>
      </Reveal>

      <div className="grid gap-3 lg:grid-cols-2">
        {GROUPS.map((g, gi) => (
          <Reveal key={g.title} delay={gi * 0.04}>
            <fieldset className="rounded-c border border-border bg-surface-strong/20 p-5">
              <legend className="px-2 text-c-sm font-semibold text-ink">
                {g.title}
              </legend>
              <ul className="flex flex-col gap-1">
                {g.items.map((it) => {
                  const isOn = !!checked[it.id];
                  return (
                    <li key={it.id}>
                      <label
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-c p-2.5 transition-colors",
                          isOn ? "bg-success/5" : "hover:bg-surface-strong/40"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-c border transition-colors",
                            isOn
                              ? "border-success bg-success text-surface-base"
                              : "border-border"
                          )}
                        >
                          {isOn ? (
                            <Check className="h-3.5 w-3.5" aria-hidden />
                          ) : null}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={isOn}
                          onChange={() => toggle(it.id)}
                        />
                        <span
                          className={cn(
                            "text-c-sm lh-base-c",
                            isOn
                              ? "text-ink-muted line-through decoration-ink-muted/40"
                              : "text-ink"
                          )}
                        >
                          {it.label}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
