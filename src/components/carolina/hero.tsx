"use client";

import { ArrowRight, Keyboard, Palette, ShieldCheck } from "lucide-react";
import { DENSITY } from "./nav-data";
import { Reveal, Pill } from "./primitives";

export function Hero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden border-b border-border scroll-mt-20"
    >
      <div className="absolute inset-0 grid-noise opacity-60" aria-hidden />
      <div
        className="absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Pill tone="accent">v1.0 · implementation-ready</Pill>
            <Pill tone="neutral">Public Sans</Pill>
            <Pill tone="neutral">WCAG 2.2 AA</Pill>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="text-c-4xl font-extrabold text-ink max-w-4xl">
            Carolina — a token-driven design system for documentation
            interfaces.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-2xl text-c-lg text-ink-muted lh-base-c">
            Implementation-first guidance with semantic tokens, full component
            state coverage, and testable accessibility acceptance criteria —
            built to ship consistently across developer-facing surfaces.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#tokens"
              className="inline-flex items-center gap-2 rounded-c bg-accent px-5 py-3 text-c-md font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Explore tokens
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#components"
              className="inline-flex items-center gap-2 rounded-c border border-border px-5 py-3 text-c-md font-semibold text-ink transition-colors hover:border-accent/60"
            >
              View components
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {DENSITY.map((d) => (
              <div
                key={d.label}
                className="rounded-c border border-border bg-surface-strong/40 p-4"
              >
                <dt className="font-mono text-c-xs uppercase tracking-wider text-ink-muted">
                  {d.label}
                </dt>
                <dd className="mt-1 text-c-2xl font-bold text-ink tabular-nums">
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 font-mono text-c-xs text-ink-muted">
            Known component density on the documentation surface.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <FeatureCard
              icon={<Palette className="h-5 w-5" />}
              title="Semantic tokens"
              body="Every surface, ink, and spacing decision resolves to a named token — never a raw hex."
            />
            <FeatureCard
              icon={<Keyboard className="h-5 w-5" />}
              title="Keyboard-first"
              body="Focus-visible indicators are required and never hidden; every state is reachable by keyboard."
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Testable a11y"
              body="Acceptance criteria are written as pass/fail checks you can run against an implementation."
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-c border border-border bg-surface-strong/30 p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-c bg-accent/10 text-accent">
        {icon}
      </div>
      <h3 className="mt-4 text-c-md font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 text-c-sm text-ink-muted lh-base-c">{body}</p>
    </div>
  );
}
