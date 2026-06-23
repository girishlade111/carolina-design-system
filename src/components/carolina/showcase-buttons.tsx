"use client";

import * as React from "react";
import { Loader2, ArrowRight, Trash2, Plus } from "lucide-react";
import { SectionHeading, DemoCell, Pill, CodeBlock } from "./primitives";
import { cn } from "@/lib/utils";

/* Carolina Button — token-driven, full state coverage */
type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-c font-semibold transition-all duration-150 select-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 hover:-translate-y-0.5",
  secondary:
    "bg-surface-strong text-ink border border-border hover:border-accent/60",
  ghost: "bg-transparent text-ink hover:bg-surface-strong/70",
  danger: "bg-danger text-white hover:brightness-110",
};

const sizes: Record<Size, string> = {
  sm: "text-c-sm px-3 h-9 min-w-[44px]",
  md: "text-c-md px-5 h-11 min-w-[44px]",
};

export function CButton({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : null}
      <span>{children}</span>
    </button>
  );
}

export function ShowcaseButtons() {
  const [loading, setLoading] = React.useState(false);
  const [variant, setVariant] = React.useState<Variant>("primary");

  return (
    <section id="components-buttons" className="scroll-mt-24">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-3">
          <Pill tone="accent">density: 7</Pill>
          <h3 className="text-c-2xl font-bold text-ink">Buttons</h3>
        </div>
        <p className="text-c-sm text-ink-muted max-w-2xl lh-base-c">
          Anatomy: <code className="font-mono">label</code> + optional{" "}
          <code className="font-mono">leading/trailing icon</code>. Spacing uses{" "}
          <code className="font-mono">space.4–6</code>; height 44px (md) /
          36px (sm); radius <code className="font-mono">radius.xs</code>.
        </p>
      </div>

      {/* Interactive playground */}
      <div className="rounded-c border border-border bg-surface-strong/30 p-5 mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-mono text-c-xs uppercase tracking-wider text-ink-muted">
            Playground
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {(["primary", "secondary", "ghost", "danger"] as Variant[]).map(
            (v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={cn(
                  "rounded-c border px-3 py-1.5 text-c-sm transition-colors",
                  variant === v
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-ink-muted hover:text-ink"
                )}
              >
                {v}
              </button>
            )
          )}
          <label className="ml-2 flex items-center gap-2 text-c-sm text-ink-muted">
            <input
              type="checkbox"
              checked={loading}
              onChange={(e) => setLoading(e.target.checked)}
              className="h-4 w-4 accent-[var(--accent)]"
            />
            loading
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3 rounded-c border border-dashed border-border bg-surface-base/60 p-6">
          <CButton variant={variant} loading={loading} onClick={() => {}}>
            <Plus className="h-4 w-4" aria-hidden /> Action
          </CButton>
          <CButton variant={variant} size="sm" loading={loading} onClick={() => {}}>
            Small
          </CButton>
          <CButton variant={variant} loading={loading} onClick={() => {}}>
            Continue <ArrowRight className="h-4 w-4" aria-hidden />
          </CButton>
        </div>
      </div>

      {/* State grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCell label="default">
          <CButton variant="primary">Save changes</CButton>
        </DemoCell>
        <DemoCell label="hover (pointer)">
          <CButton variant="primary" className="brightness-110 -translate-y-0.5">
            Save changes
          </CButton>
        </DemoCell>
        <DemoCell label="focus-visible (keyboard)">
          <CButton variant="primary" className="outline-2 outline-offset-2 outline-accent">
            Save changes
          </CButton>
        </DemoCell>
        <DemoCell label="active (pressed)">
          <CButton variant="primary" className="scale-[0.98]">
            Save changes
          </CButton>
        </DemoCell>
        <DemoCell label="disabled">
          <CButton variant="primary" disabled>
            Save changes
          </CButton>
        </DemoCell>
        <DemoCell label="loading">
          <CButton variant="primary" loading>
            Saving…
          </CButton>
        </DemoCell>
      </div>

      {/* Variants row */}
      <div className="mt-6">
        <DemoCell label="variants">
          <CButton variant="primary">Primary</CButton>
          <CButton variant="secondary">Secondary</CButton>
          <CButton variant="ghost">Ghost</CButton>
          <CButton variant="danger">
            <Trash2 className="h-4 w-4" aria-hidden /> Danger
          </CButton>
        </DemoCell>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SpecCard
          title="Behavior"
          items={[
            "Keyboard: Space / Enter activates; focus-visible ring via outline-accent.",
            "Pointer: hover lifts -0.5px (translate-y), active scales 0.98.",
            "Touch: min target 44×44px; no hover-only affordances.",
            "Loading: disables input, shows spinner, preserves label width.",
          ]}
        />
        <SpecCard
          title="Edge cases"
          items={[
            "Long content: label wraps to a max of 2 lines; truncate with ellipsis beyond.",
            "Empty state: a button must always carry a text label — no icon-only without aria-label.",
            "Responsive: full-width on <360px viewports when primary CTA.",
          ]}
        />
      </div>

      <div className="mt-6">
        <CodeBlock
          caption="Consume tokens, never raw hex."
          code={`<Button variant="primary" loading={saving} onClick={save}>
  Save changes
</Button>`}
        />
      </div>
    </section>
  );
}

function SpecCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-c border border-border bg-surface-strong/30 p-5">
      <h4 className="text-c-md font-semibold text-ink mb-3">{title}</h4>
      <ul className="flex flex-col gap-2">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-c-sm text-ink-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
            <span className="lh-base-c">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
