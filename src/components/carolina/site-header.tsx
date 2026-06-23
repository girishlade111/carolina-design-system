"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Github } from "lucide-react";
import { SECTIONS } from "./nav-data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-base/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          href="#overview"
          className="group flex items-center gap-2.5 rounded-c"
          aria-label="Carolina design system home"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-c bg-accent text-accent-foreground font-extrabold text-c-sm"
            aria-hidden
          >
            C
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-c-md font-bold text-ink">Carolina</span>
            <span className="font-mono text-c-xs text-ink-muted">
              design-system
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 lg:flex"
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                "rounded-c px-3 py-2 text-c-sm transition-colors",
                active === s.id
                  ? "text-ink bg-surface-strong"
                  : "text-ink-muted hover:text-ink hover:bg-surface-strong/60"
              )}
              aria-current={active === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://carolina12.framer.website/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-c border border-border px-3 py-2 text-c-sm text-ink-muted transition-colors hover:text-ink hover:border-accent/60"
          >
            <Github className="h-4 w-4" aria-hidden />
            Reference
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-c border border-border text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="lg:hidden border-t border-border bg-surface-base"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6 grid grid-cols-2 gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-c px-3 py-2 text-c-sm",
                    active === s.id
                      ? "text-ink bg-surface-strong"
                      : "text-ink-muted hover:text-ink hover:bg-surface-strong/60"
                  )}
                >
                  <span className="font-mono text-c-xs text-accent mr-2">
                    {s.index}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
