"use client";

import { SECTIONS } from "./nav-data";
import { useActiveSection } from "./use-active-section";
import { cn } from "@/lib/utils";

export function SectionNav() {
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden xl:block"
    >
      <p className="font-mono text-c-xs uppercase tracking-[0.2em] text-ink-muted mb-4">
        On this page
      </p>
      <ol className="flex flex-col gap-1 border-l border-border">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "-ml-px flex items-center gap-3 border-l-2 px-4 py-1.5 text-c-sm transition-colors",
                  isActive
                    ? "border-accent text-ink"
                    : "border-transparent text-ink-muted hover:text-ink hover:border-border"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "font-mono text-c-xs",
                    isActive ? "text-accent" : "text-ink-muted/60"
                  )}
                >
                  {s.index}
                </span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
