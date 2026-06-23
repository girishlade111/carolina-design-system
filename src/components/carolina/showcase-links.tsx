"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";
import { SectionHeading, DemoCell, Pill } from "./primitives";
import { cn } from "@/lib/utils";

export function ShowcaseLinks() {
  return (
    <section id="components-links" className="scroll-mt-24">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-3">
          <Pill tone="accent">density: 27</Pill>
          <h3 className="text-c-2xl font-bold text-ink">Links</h3>
        </div>
        <p className="text-c-sm text-ink-muted max-w-2xl lh-base-c">
          On the dark base, links use{" "}
          <code className="font-mono">color.text.tertiary</code> (accent) with an
          underline; on the muted light surface they use{" "}
          <code className="font-mono">color.text.inverse</code> (#0000ee).
          External links append an icon.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DemoCell label="default">
          <a
            href="#tokens"
            className="text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent transition-colors"
          >
            Read the token guide
          </a>
        </DemoCell>
        <DemoCell label="hover">
          <a
            href="#tokens"
            className="text-accent underline underline-offset-4 decoration-accent"
          >
            Read the token guide
          </a>
        </DemoCell>
        <DemoCell label="focus-visible">
          <a
            href="#tokens"
            className="text-accent underline underline-offset-4 decoration-accent outline-2 outline-offset-2 outline-accent"
          >
            Read the token guide
          </a>
        </DemoCell>
        <DemoCell label="visited">
          <a
            href="#tokens"
            className="text-[#c9a25a] underline underline-offset-4 decoration-[#c9a25a]/40"
          >
            Read the token guide
          </a>
        </DemoCell>
        <DemoCell label="external">
          <a
            href="https://carolina12.framer.website/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-accent underline underline-offset-4 decoration-accent/40 hover:decoration-accent"
          >
            carolina12.framer.website
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </DemoCell>
        <DemoCell label="disabled">
          <span
            aria-disabled="true"
            className="text-ink-muted/40 underline underline-offset-4 decoration-ink-muted/20 cursor-not-allowed"
          >
            Unavailable link
          </span>
        </DemoCell>
      </div>

      {/* Inverse-surface link treatment */}
      <div className="mt-6 surface-inverse rounded-c p-5">
        <p className="text-c-sm mb-3">
          On the muted (light) surface, links use{" "}
          <code className="font-mono">color.text.inverse</code>:
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#tokens" className="underline underline-offset-4">
            token guide
          </a>
          <a href="#accessibility" className="underline underline-offset-4">
            accessibility criteria
          </a>
          <a
            href="https://carolina12.framer.website/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 underline underline-offset-4"
          >
            reference site
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      <p className="mt-4 text-c-xs text-ink-muted">
        Every link must be operable by keyboard and have a non-color indicator
        (underline). Color alone never conveys link state.
      </p>
    </section>
  );
}
