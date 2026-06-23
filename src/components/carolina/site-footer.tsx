import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface-base">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 place-items-center rounded-c bg-accent text-accent-foreground font-extrabold text-c-sm"
                aria-hidden
              >
                C
              </span>
              <span className="text-c-md font-bold text-ink">Carolina</span>
            </div>
            <p className="text-c-sm text-ink-muted max-w-xs lh-base-c">
              Implementation-ready, token-driven design-system guidance for
              documentation site interfaces.
            </p>
          </div>

          <FooterCol
            title="System"
            links={[
              { label: "Context & goals", href: "#context" },
              { label: "Tokens & foundations", href: "#tokens" },
              { label: "Components", href: "#components" },
            ]}
          />
          <FooterCol
            title="Quality"
            links={[
              { label: "Accessibility", href: "#accessibility" },
              { label: "Anti-patterns", href: "#antipatterns" },
              { label: "QA checklist", href: "#qa" },
            ]}
          />
          <FooterCol
            title="Reference"
            links={[
              {
                label: "carolina12.framer.website",
                href: "https://carolina12.framer.website/",
                external: true,
              },
              { label: "Content & tone", href: "#content" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-c-xs text-ink-muted">
            WCAG 2.2 AA · keyboard-first · token-driven
          </p>
          <p className="font-mono text-c-xs text-ink-muted">
            © {new Date().getFullYear()} Carolina Design System
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-mono text-c-xs uppercase tracking-[0.2em] text-ink-muted">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              {...(l.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="text-c-sm text-ink-muted transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
