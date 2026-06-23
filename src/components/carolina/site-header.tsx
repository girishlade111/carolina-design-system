"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Menu,
  ChevronDown,
  Github,
  Search,
  ExternalLink,
  Check,
  Layers,
  PenLine,
  Palette,
  MousePointerClick,
  Accessibility,
  Type,
  Ban,
  CheckSquare,
  Link as LinkIcon,
  List,
  Compass,
} from "lucide-react";
import { SECTIONS } from "./nav-data";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./use-active-section";
import { CommandPalette } from "./command-palette";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

const SECTION_ICONS: Record<string, React.ReactNode> = {
  overview: <Layers className="h-4 w-4" />,
  context: <PenLine className="h-4 w-4" />,
  tokens: <Palette className="h-4 w-4" />,
  components: <MousePointerClick className="h-4 w-4" />,
  accessibility: <Accessibility className="h-4 w-4" />,
  content: <Type className="h-4 w-4" />,
  antipatterns: <Ban className="h-4 w-4" />,
  qa: <CheckSquare className="h-4 w-4" />,
};

const COMPONENT_ITEMS = [
  { id: "components-buttons", label: "Buttons", icon: <MousePointerClick className="h-4 w-4" /> },
  { id: "components-inputs", label: "Inputs", icon: <PenLine className="h-4 w-4" /> },
  { id: "components-links", label: "Links", icon: <LinkIcon className="h-4 w-4" /> },
  { id: "components-lists", label: "Lists", icon: <List className="h-4 w-4" /> },
  { id: "components-navigation", label: "Navigation", icon: <Compass className="h-4 w-4" /> },
];

export function SiteHeader() {
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const active = useActiveSection(SECTIONS.map((s) => s.id));

  const activeSection = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];

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

  // Scroll helper used by dropdown items. Deferred + manual so it reliably
  // wins over Radix's post-close focus restoration (which scrolls to trigger).
  const goTo = React.useCallback((id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const headerHeight = 72;
      const top =
        el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
      // Move focus to the target for screen-reader users.
      el.setAttribute("tabindex", "-1");
      (el as HTMLElement).focus({ preventScroll: true });
    }, 220);
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

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="#overview"
            className="group flex shrink-0 items-center gap-2.5 rounded-c"
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

          {/* Single dropdown holding ALL navigation */}
          <div className="min-w-0 flex-1 flex justify-start lg:justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "group inline-flex h-10 max-w-[70vw] items-center gap-2 rounded-c border px-3 text-c-sm font-medium transition-colors",
                    "border-border bg-surface-strong/40 text-ink hover:border-accent/60",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  )}
                  aria-label="Open navigation menu"
                  aria-haspopup="menu"
                >
                  <Menu className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  <span className="flex min-w-0 items-center gap-2">
                    <span
                      className="font-mono text-c-xs text-ink-muted/60 hidden sm:inline"
                      aria-hidden
                    >
                      {activeSection.index}
                    </span>
                    <span className="truncate">{activeSection.label}</span>
                  </span>
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-ink-muted transition-transform duration-200 group-data-[state=open]:rotate-180"
                    aria-hidden
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="w-[min(92vw,24rem)] border-border bg-surface-strong p-1.5 text-ink shadow-xl"
              >
                <DropdownMenuLabel className="font-mono text-c-xs uppercase tracking-[0.18em] text-ink-muted">
                  Sections
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {SECTIONS.map((s) => {
                    const isActive = active === s.id;
                    return (
                      <DropdownMenuItem
                        key={s.id}
                        onSelect={() => goTo(s.id)}
                        className={cn(
                          "gap-2.5 rounded-c px-2.5 py-2 text-c-sm outline-hidden cursor-pointer",
                          isActive
                            ? "bg-accent/10 text-ink"
                            : "text-ink-muted hover:text-ink hover:bg-surface-strong/70"
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0",
                            isActive ? "text-accent" : "text-ink-muted/60"
                          )}
                        >
                          {SECTION_ICONS[s.id]}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-c-xs w-5 shrink-0",
                            isActive ? "text-accent" : "text-ink-muted/50"
                          )}
                        >
                          {s.index}
                        </span>
                        <span className="flex-1 truncate">{s.label}</span>
                        {isActive ? (
                          <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                        ) : null}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-border" />

                <DropdownMenuLabel className="font-mono text-c-xs uppercase tracking-[0.18em] text-ink-muted">
                  Components
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  {COMPONENT_ITEMS.map((c) => (
                    <DropdownMenuItem
                      key={c.id}
                      onSelect={() => goTo(c.id)}
                      className="gap-2.5 rounded-c px-2.5 py-2 text-c-sm text-ink-muted outline-hidden cursor-pointer hover:text-ink hover:bg-surface-strong/70"
                    >
                      <span className="shrink-0 text-ink-muted/70">
                        {c.icon}
                      </span>
                      <span className="flex-1">{c.label}</span>
                      <DropdownMenuShortcut className="font-mono text-c-xs text-ink-muted/50">
                        03
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-border" />

                <DropdownMenuLabel className="font-mono text-c-xs uppercase tracking-[0.18em] text-ink-muted">
                  Actions
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onSelect={() => goTo("accessibility")}
                    className="gap-2.5 rounded-c px-2.5 py-2 text-c-sm text-ink-muted outline-hidden cursor-pointer hover:text-ink hover:bg-surface-strong/70"
                  >
                    <span className="shrink-0 text-ink-muted/70">
                      <Accessibility className="h-4 w-4" />
                    </span>
                    <span className="flex-1">Accessibility criteria</span>
                    <DropdownMenuShortcut className="font-mono text-c-xs text-ink-muted/50">
                      04
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <a
                    href="https://carolina12.framer.website/"
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <DropdownMenuItem
                      onSelect={(e) => e.preventDefault()}
                      className="gap-2.5 rounded-c px-2.5 py-2 text-c-sm text-ink-muted outline-hidden cursor-pointer hover:text-ink hover:bg-surface-strong/70"
                    >
                      <span className="shrink-0 text-ink-muted/70">
                        <ExternalLink className="h-4 w-4" />
                      </span>
                      <span className="flex-1">Open reference site</span>
                      <DropdownMenuShortcut className="font-mono text-c-xs text-ink-muted/50">
                        ext
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </a>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
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
          </div>
        </div>
      </header>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </>
  );
}
