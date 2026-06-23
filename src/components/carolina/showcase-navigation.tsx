"use client";

import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { SectionHeading, DemoCell, Pill } from "./primitives";
import { cn } from "@/lib/utils";

export function ShowcaseNavigation() {
  const tabs = ["Foundations", "Components", "Accessibility", "QA"] as const;
  const [active, setActive] = React.useState<(typeof tabs)[number]>("Components");

  return (
    <section id="components-navigation" className="scroll-mt-24">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-3">
          <Pill tone="accent">density: 2</Pill>
          <h3 className="text-c-2xl font-bold text-ink">Navigation</h3>
        </div>
        <p className="text-c-sm text-ink-muted max-w-2xl lh-base-c">
          Tabs for in-page section switching; breadcrumbs for hierarchy. Both
          use <code className="font-mono">color.text.tertiary</code> for the
          active state and expose <code className="font-mono">aria-current</code>.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <DemoCell label="tabs (active = Components)">
          <div
            role="tablist"
            aria-label="Documentation sections"
            className="flex w-full gap-1 border-b border-border"
          >
            {tabs.map((t) => {
              const selected = active === t;
              return (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  id={`tab-${t}`}
                  aria-selected={selected}
                  aria-controls={`tabpanel-${t}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t)}
                  className={cn(
                    "relative -mb-px px-4 py-2.5 text-c-sm transition-colors",
                    selected
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {t}
                  {selected ? (
                    <span
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id={`tabpanel-${active}`}
            aria-labelledby={`tab-${active}`}
            className="w-full pt-4 text-c-sm text-ink-muted"
          >
            Viewing the <span className="text-ink font-medium">{active}</span>{" "}
            section. Arrow keys move between tabs; Home/End jump to ends.
          </div>
        </DemoCell>

        <DemoCell label="breadcrumb">
          <nav aria-label="Breadcrumb" className="w-full">
            <ol className="flex flex-wrap items-center gap-1 text-c-sm">
              <li>
                <a
                  href="#overview"
                  className="inline-flex items-center gap-1 text-ink-muted hover:text-accent"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden />
                  Home
                </a>
              </li>
              <li aria-hidden className="text-ink-muted/50">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <a href="#components" className="text-ink-muted hover:text-accent">
                  Components
                </a>
              </li>
              <li aria-hidden className="text-ink-muted/50">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="text-ink font-medium">
                Navigation
              </li>
            </ol>
          </nav>
        </DemoCell>
      </div>

      <p className="mt-4 text-c-xs text-ink-muted">
        Keyboard: tabs implement roving <code className="font-mono">tabindex</code>;
        arrow keys switch focus; the active tab panel is exposed via{" "}
        <code className="font-mono">aria-controls</code> /{" "}
        <code className="font-mono">aria-labelledby</code>.
      </p>
    </section>
  );
}
