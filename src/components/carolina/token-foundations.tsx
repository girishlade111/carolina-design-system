"use client";

import { TOKENS } from "./nav-data";
import { Reveal, CopyButton, SectionHeading } from "./primitives";

export function TokenFoundations() {
  return (
    <section id="tokens" className="scroll-mt-20">
      <SectionHeading
        index="02"
        eyebrow="Foundations"
        title="Design tokens & foundations"
        description="The single source of truth. Components must consume semantic tokens — color.surface.*, color.text.*, space.*, font.size.*, radius.* — and must never reference raw hex values."
      />

      <Reveal>
        <ColorTokens />
      </Reveal>
      <Reveal delay={0.05}>
        <TypeTokens />
      </Reveal>
      <Reveal delay={0.05}>
        <SpacingTokens />
      </Reveal>
      <Reveal delay={0.05}>
        <RadiusTokens />
      </Reveal>
    </section>
  );
}

/* --------------------------- Color tokens -------------------------- */
function ColorTokens() {
  return (
    <div className="mb-c7">
      <SubHeading>Color</SubHeading>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TOKENS.colors.map((c) => {
          const onLight = c.text === "on-light";
          return (
            <div
              key={c.name}
              className="overflow-hidden rounded-c border border-border bg-surface-strong/30"
            >
              <div
                className="relative h-24 border-b border-border"
                style={{ backgroundColor: c.swatch }}
              >
                <span
                  className={`absolute bottom-2 left-3 font-mono text-c-xs ${
                    onLight ? "text-surface-base" : "text-ink/70"
                  }`}
                >
                  {c.value}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center justify-between gap-2">
                  <code className="font-mono text-c-sm text-ink">{c.name}</code>
                  <CopyButton value={c.value} label={c.name} />
                </div>
                <p className="text-c-xs text-ink-muted lh-base-c">{c.role}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-c-xs text-ink-muted">
        Carolina is dark-surface-first. <code className="font-mono">color.text.inverse</code>{" "}
        (#0000ee) is reserved for the muted (light) surface and classic link
        treatment; <code className="font-mono">color.text.tertiary</code> (orange)
        provides AA-compliant accent emphasis on the dark base.
      </p>
    </div>
  );
}

/* --------------------------- Type tokens --------------------------- */
function TypeTokens() {
  return (
    <div className="mb-c7">
      <SubHeading>Typography · Public Sans</SubHeading>
      <div className="overflow-hidden rounded-c border border-border">
        <table className="w-full text-left">
          <thead className="bg-surface-strong/60">
            <tr className="text-c-xs uppercase tracking-wider text-ink-muted">
              <th className="px-4 py-3 font-medium">Token</th>
              <th className="px-4 py-3 font-medium">Size</th>
              <th className="px-4 py-3 font-medium">Preview</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                Use
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {TOKENS.type.map((t) => {
              const cls = `text-c-${t.name.split(".").pop()}`;
              return (
                <tr key={t.name} className="hover:bg-surface-strong/30">
                  <td className="px-4 py-3">
                    <code className="font-mono text-c-sm text-ink">{t.name}</code>
                  </td>
                  <td className="px-4 py-3 font-mono text-c-sm text-ink-muted">
                    {t.value}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`${cls} text-ink`}>Ag</span>
                  </td>
                  <td className="hidden px-4 py-3 text-c-sm text-ink-muted sm:table-cell">
                    {t.use}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-c-xs text-ink-muted">
        Base: <code className="font-mono">font.size.base = 16px</code>,{" "}
        <code className="font-mono">font.weight.base = 400</code>,{" "}
        <code className="font-mono">font.lineHeight.base = 19.2px</code>. Stack:{" "}
        <code className="font-mono">Public Sans, sans-serif</code>.
      </p>
    </div>
  );
}

/* -------------------------- Spacing tokens ------------------------- */
function SpacingTokens() {
  return (
    <div className="mb-c7">
      <SubHeading>Spacing</SubHeading>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TOKENS.space.map((s) => {
          const px = parseInt(s.value, 10);
          return (
            <div
              key={s.name}
              className="rounded-c border border-border bg-surface-strong/30 p-4"
            >
              <div className="flex items-center justify-between">
                <code className="font-mono text-c-sm text-ink">{s.name}</code>
                <span className="font-mono text-c-xs text-ink-muted">
                  {s.value}
                </span>
              </div>
              <div className="mt-3 h-6 w-full overflow-hidden rounded-c bg-surface-base">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${Math.min(px, 80)}px` }}
                  aria-hidden
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------- Radius tokens ------------------------- */
function RadiusTokens() {
  return (
    <div>
      <SubHeading>Radius & motion</SubHeading>
      <div className="grid gap-3 sm:grid-cols-3">
        {TOKENS.radius.map((r) => (
          <div
            key={r.name}
            className="flex flex-col gap-3 rounded-c border border-border bg-surface-strong/30 p-5"
          >
            <div
              className="h-16 w-16 border-2 border-accent bg-accent/10"
              style={{ borderRadius: r.value }}
              aria-hidden
            />
            <div>
              <code className="font-mono text-c-sm text-ink">{r.name}</code>
              <p className="text-c-xs text-ink-muted">{r.use}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-3 rounded-c border border-border bg-surface-strong/30 p-5">
          <div className="h-16 w-16 rounded-c bg-accent/10 border-2 border-accent/40 motion-demo" aria-hidden />
          <div>
            <code className="font-mono text-c-sm text-ink">motion.fast</code>
            <p className="text-c-xs text-ink-muted">120–200ms · ease-out</p>
          </div>
        </div>
      </div>
      <style>{`
        .motion-demo { animation: carolina-pulse 1.8s ease-in-out infinite; }
        @keyframes carolina-pulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
      `}</style>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-c-xl font-semibold text-ink mb-4 flex items-center gap-3">
      <span className="h-4 w-1 bg-accent rounded-c" aria-hidden />
      {children}
    </h3>
  );
}
