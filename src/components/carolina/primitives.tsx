"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Reveal — subtle entrance animation, respects reduced motion         */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------------ */
/* CopyButton — copies a token value, keyboard accessible             */
/* ------------------------------------------------------------------ */
export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        });
      }}
      aria-label={label ? `Copy ${label}` : `Copy ${value}`}
      className={cn(
        "inline-flex items-center gap-1 rounded-c border border-border bg-surface-strong/60 px-2 py-1 text-c-xs text-ink-muted transition-colors hover:text-ink hover:border-accent/60",
        className
      )}
    >
      {copied ? (
        <Check className="h-3 w-3 text-success" aria-hidden />
      ) : (
        <Copy className="h-3 w-3" aria-hidden />
      )}
      <span className="font-mono">{copied ? "copied" : value}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* SectionHeading — consistent section anchor + eyebrow               */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  description,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div id={id} className="flex flex-col gap-3 border-b border-border pb-7 mb-c7 scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="font-mono text-c-xs text-accent">{index}</span>
        <span className="h-px w-8 bg-accent/50" aria-hidden />
        <span className="font-mono text-c-xs uppercase tracking-[0.2em] text-ink-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-c-3xl font-bold text-ink">{title}</h2>
      {description ? (
        <p className="text-c-md text-ink-muted max-w-2xl lh-base-c">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pill — small label                                                  */
/* ------------------------------------------------------------------ */
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "accent" | "success" | "danger";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "border-border text-ink-muted bg-surface-strong/50",
    accent: "border-accent/40 text-accent bg-accent/10",
    success: "border-success/40 text-success bg-success/10",
    danger: "border-danger/40 text-danger bg-danger/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-c border px-2 py-0.5 text-c-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* CodeBlock — inverse light surface for max code legibility          */
/* ------------------------------------------------------------------ */
export function CodeBlock({
  code,
  caption,
  className,
}: {
  code: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative", className)}>
      <pre className="surface-inverse overflow-x-auto rounded-c p-4 font-mono text-c-sm leading-relaxed">
        <code>{code}</code>
      </pre>
      {caption ? (
        <figcaption className="mt-2 text-c-xs text-ink-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* StateChip — labels a component state under a demo                  */
/* ------------------------------------------------------------------ */
export function StateChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-c-xs uppercase tracking-wider text-ink-muted">
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* DemoCell — wraps a single state demo with label                    */
/* ------------------------------------------------------------------ */
export function DemoCell({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-c border border-border bg-surface-strong/30 p-4",
        className
      )}
    >
      <StateChip>{label}</StateChip>
      <div className="flex min-h-[44px] flex-wrap items-center gap-3">
        {children}
      </div>
    </div>
  );
}
