"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Github, Search, CornerDownLeft } from "lucide-react";
import { SECTIONS } from "./nav-data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";
import { CommandPalette } from "./command-palette";

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  // Reading-progress bar at the very top of the viewport.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Scroll-aware header: intensify border + blur once the user scrolls.
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global ⌘K / Ctrl+K to open the command palette.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the mobile menu on viewport widening past the lg breakpoint.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Skip to content — keyboard-first a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-c focus:bg-accent focus:px-4 focus:py-2 focus:text-c-sm focus:font-semibold focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-surface-base/85 backdrop-blur-xl supports-[backdrop-filter]:bg-surface-base/70"
            : "border-b border-transparent bg-surface-base/40 backdrop-blur-md"
        )}
      >
        {/* Reading progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
        />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="#overview"
            className="group flex items-center gap-2.5 rounded-c"
            aria-label="Carolina design system home"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-c bg-accent text-accent-foreground font-extrabold text-c-sm shadow-[0_0_0_3px_rgba(252,114,0,0.18)] transition-transform group-hover:scale-105"
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

          {/* Primary nav with animated active pill */}
          <nav
            aria-label="Primary"
            className="relative hidden items-center gap-0.5 lg:flex"
          >
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={cn(
                    "relative rounded-c px-3 py-2 text-c-sm transition-colors",
                    isActive
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-c bg-surface-strong ring-1 ring-inset ring-border"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  ) : null}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className={cn(
                        "font-mono text-c-xs",
                        isActive ? "text-accent" : "text-ink-muted/50"
                      )}
                    >
                      {s.index}
                    </span>
                    {s.label}
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="group inline-flex h-10 items-center gap-2 rounded-c border border-border bg-surface-strong/40 pl-3 pr-1.5 text-c-sm text-ink-muted transition-colors hover:border-accent/60 hover:text-ink"
              aria-label="Open command palette"
            >
              <Search className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Search</span>
              <kbd className="ml-1 hidden items-center gap-0.5 rounded-c border border-border bg-surface-base px-1.5 py-0.5 font-mono text-c-xs text-ink-muted sm:inline-flex">
                <span className="text-c-xs">⌘</span>K
              </kbd>
            </button>

            <a
              href="https://carolina12.framer.website/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-c border border-border px-3 py-2 text-c-sm text-ink-muted transition-colors hover:text-ink hover:border-accent/60"
            >
              <Github className="h-4 w-4" aria-hidden />
              <span className="hidden md:inline">Reference</span>
            </a>

            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-c border border-border text-ink transition-colors hover:border-accent/60"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav — animated */}
        <AnimatePresence>
          {open ? (
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-border bg-surface-base/95 backdrop-blur-xl"
            >
              <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6 grid grid-cols-2 gap-1.5">
                {SECTIONS.map((s) => {
                  const isActive = active === s.id;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 rounded-c border px-3 py-2.5 text-c-sm transition-colors",
                          isActive
                            ? "border-accent/40 bg-accent/10 text-ink"
                            : "border-border text-ink-muted hover:text-ink hover:bg-surface-strong/60"
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
                <li className="col-span-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setCmdOpen(true);
                    }}
                    className="flex w-full items-center justify-between rounded-c border border-dashed border-border px-3 py-2.5 text-c-sm text-ink-muted transition-colors hover:text-ink hover:border-accent/60"
                  >
                    <span className="flex items-center gap-2">
                      <Search className="h-4 w-4" aria-hidden />
                      Search the docs
                    </span>
                    <kbd className="inline-flex items-center gap-0.5 rounded-c border border-border bg-surface-base px-1.5 py-0.5 font-mono text-c-xs text-ink-muted">
                      ⌘K
                    </kbd>
                  </button>
                </li>
              </ul>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}
