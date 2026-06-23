"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Palette,
  Keyboard,
  CheckSquare,
  Ban,
  Type,
  PenLine,
  Layers,
  MousePointerClick,
  Link as LinkIcon,
  List,
  Compass,
  Accessibility,
} from "lucide-react";
import { SECTIONS } from "./nav-data";

type Entry = {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  group: string;
  keywords: string;
};

const SUB: Entry[] = [
  {
    id: "components-buttons",
    label: "Buttons",
    hint: "03 · Components",
    icon: <MousePointerClick className="h-4 w-4" />,
    group: "Components",
    keywords: "button cta action primary secondary ghost danger loading disabled",
  },
  {
    id: "components-inputs",
    label: "Inputs",
    hint: "03 · Components",
    icon: <PenLine className="h-4 w-4" />,
    group: "Components",
    keywords: "input field form text email search textarea select error disabled",
  },
  {
    id: "components-links",
    label: "Links",
    hint: "03 · Components",
    icon: <LinkIcon className="h-4 w-4" />,
    group: "Components",
    keywords: "link anchor href external visited focus underline",
  },
  {
    id: "components-lists",
    label: "Lists",
    hint: "03 · Components",
    icon: <List className="h-4 w-4" />,
    group: "Components",
    keywords: "list ordered unordered definition overflow empty",
  },
  {
    id: "components-navigation",
    label: "Navigation",
    hint: "03 · Components",
    icon: <Compass className="h-4 w-4" />,
    group: "Components",
    keywords: "navigation tabs breadcrumb aria-current",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  overview: <Layers className="h-4 w-4" />,
  context: <PenLine className="h-4 w-4" />,
  tokens: <Palette className="h-4 w-4" />,
  components: <MousePointerClick className="h-4 w-4" />,
  accessibility: <Accessibility className="h-4 w-4" />,
  content: <Type className="h-4 w-4" />,
  antipatterns: <Ban className="h-4 w-4" />,
  qa: <CheckSquare className="h-4 w-4" />,
};

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();

  const go = (id: string) => {
    onOpenChange(false);
    // defer until after dialog closes so the anchor scroll lands correctly
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // update hash without an instant jump
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    }, 80);
  };

  const top: Entry[] = SECTIONS.map((s) => ({
    id: s.id,
    label: s.label,
    hint: `${s.index} · Section`,
    icon: ICONS[s.id] ?? <Layers className="h-4 w-4" />,
    group: "Sections",
    keywords: s.label.toLowerCase(),
  }));

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Carolina command palette"
      description="Jump to any section or component in the design system."
      className="bg-surface-strong border border-border max-w-xl"
    >
      <CommandInput placeholder="Search sections, components, tokens…" />
      <CommandList className="scroll-carolina">
        <CommandEmpty>No matches found.</CommandEmpty>

        <CommandGroup heading="Sections">
          {top.map((e) => (
            <CommandItem
              key={e.id}
              value={`${e.label} ${e.keywords}`}
              onSelect={() => go(e.id)}
              className="text-ink aria-selected:text-accent"
            >
              <span className="text-accent">{e.icon}</span>
              <span className="text-c-sm">{e.label}</span>
              <CommandShortcut className="font-mono text-c-xs text-ink-muted">
                {e.hint}
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Components">
          {SUB.map((e) => (
            <CommandItem
              key={e.id}
              value={`${e.label} ${e.keywords}`}
              onSelect={() => go(e.id)}
              className="text-ink aria-selected:text-accent"
            >
              <span className="text-ink-muted">{e.icon}</span>
              <span className="text-c-sm">{e.label}</span>
              <CommandShortcut className="font-mono text-c-xs text-ink-muted">
                {e.hint}
              </CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            value="keyboard shortcuts accessibility"
            onSelect={() => go("accessibility")}
            className="text-ink aria-selected:text-accent"
          >
            <span className="text-ink-muted">
              <Keyboard className="h-4 w-4" />
            </span>
            <span className="text-c-sm">View accessibility criteria</span>
            <CommandShortcut className="font-mono text-c-xs text-ink-muted">
              04
            </CommandShortcut>
          </CommandItem>
          <a
            href="https://carolina12.framer.website/"
            target="_blank"
            rel="noreferrer"
            className="flex w-full"
          >
            <CommandItem
              value="reference site open external carolina12 framer"
              onSelect={() => onOpenChange(false)}
              className="text-ink aria-selected:text-accent w-full"
            >
              <span className="text-ink-muted">
                <LinkIcon className="h-4 w-4" />
              </span>
              <span className="text-c-sm">Open reference site</span>
              <CommandShortcut className="font-mono text-c-xs text-ink-muted">
                external
              </CommandShortcut>
            </CommandItem>
          </a>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
