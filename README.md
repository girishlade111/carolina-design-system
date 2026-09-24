# Carolina Design System

A modern, accessible, and production-ready design system and component library built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**. Carolina ships a full set of UI primitives, design tokens, usage guidelines, accessibility rules, and anti-pattern documentation in a living documentation site.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Design System Components](#design-system-components)
- [Documentation Sections](#documentation-sections)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **60+ UI components** — Radix UI–powered primitives styled with Tailwind CSS and shadcn/ui conventions (buttons, forms, dialogs, tables, charts, sidebars, command palette, and more).
- **Design token foundations** — documented color, typography, spacing, and elevation tokens that keep every surface consistent.
- **Usage guidance built in** — component showcases for buttons, inputs, links, lists, and navigation with do/don't guidance.
- **Accessibility first** — WCAG-oriented guidance, focus management, keyboard navigation, and an accessibility checklist page.
- **Anti-pattern catalogue** — explicit examples of what *not* to do so teams ship consistent UI.
- **Content & tone guidelines** — copywriting rules for buttons, empty states, errors, and microcopy.
- **Command palette** — ⌘K / Ctrl-K quick navigation across the documentation site.
- **QA checklist** — a built-in review checklist for design and code reviews.
- **Theming** — dark/light mode via `next-themes`.
- **Type-safe forms** — React Hook Form + Zod resolvers.
- **Data layer** — Prisma ORM with PostgreSQL/SQLite-friendly schema and migration scripts.
- **Production build** — standalone Next.js output with Caddy config for reverse-proxy deployment.

---

## Tech Stack

| Layer        | Technology |
| ------------ | ---------- |
| Framework    | Next.js 16 (App Router), React 19 |
| Language     | TypeScript 5 |
| Styling      | Tailwind CSS v4, `tailwindcss-animate`, `tw-animate-css` |
| UI Primitives | Radix UI, shadcn/ui patterns |
| Components   | class-variance-authority, clsx, tailwind-merge |
| Animation    | Framer Motion, Embla Carousel |
| State        | Zustand, TanStack Query |
| Forms        | React Hook Form, Zod |
| Tables       | TanStack Table |
| Charts       | Recharts |
| Rich Text    | MDX Editor, React Markdown, React Syntax Highlighter |
| Drag & Drop  | dnd-kit |
| Auth         | NextAuth |
| i18n         | next-intl |
| Database     | Prisma ORM |
| Linting      | ESLint 9 (`eslint-config-next`) |
| Package Mgr  | Bun (bun.lock committed) |

---

## Project Structure

```
.
├── .zscripts/            # Build/dev/deploy shell scripts
├── db/                   # Database assets
├── download/             # Downloaded assets / notes
├── examples/
│   └── websocket/        # WebSocket usage example
├── mini-services/        # Auxiliary micro-services (placeholder)
├── prisma/
│   └── schema.prisma     # Prisma data model
├── public/               # Static assets served by Next.js
├── src/
│   ├── app/              # App Router pages & API routes
│   │   ├── api/          # Route handlers
│   │   ├── globals.css   # Global styles / tokens
│   │   ├── layout.tsx    # Root layout (theme, providers)
│   │   └── page.tsx      # Documentation home
│   ├── components/
│   │   ├── carolina/     # Design-system docs components
│   │   │   ├── hero.tsx
│   │   │   ├── site-header.tsx / site-footer.tsx
│   │   │   ├── section-nav.tsx / nav-data.ts
│   │   │   ├── token-foundations.tsx
│   │   │   ├── showcase-*.tsx        (buttons, inputs, links, lists, navigation)
│   │   │   ├── accessibility.tsx
│   │   │   ├── anti-patterns.tsx
│   │   │   ├── content-tone.tsx
│   │   │   ├── context-goals.tsx
│   │   │   ├── qa-checklist.tsx
│   │   │   ├── command-palette.tsx
│   │   │   └── primitives.tsx
│   │   └── ui/           # shadcn/ui component library (60+ components)
│   ├── hooks/            # Shared React hooks
│   └── lib/              # Utilities (cn(), helpers)
├── Caddyfile             # Caddy reverse-proxy config
├── components.json       # shadcn/ui config
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18.18+
- PostgreSQL or SQLite (only if you use the database features)
- Git

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>.git
cd carolina-design-system

# 2. Install dependencies
bun install
# or: npm install / pnpm install / yarn install

# 3. Configure environment variables
cp .env.example .env    # then edit .env

# 4. (Optional) push the database schema
bun run db:generate
bun run db:push

# 5. Start the development server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the design system site.

---

## Environment Variables

Create a `.env` file in the project root (it is git-ignored — never commit secrets):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/carolina"

# NextAuth (if authentication is enabled)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

| Variable            | Description                          | Required |
| ------------------- | ------------------------------------ | -------- |
| `DATABASE_URL`      | Prisma connection string             | Yes (DB) |
| `NEXTAUTH_URL`      | Canonical app URL for NextAuth       | No       |
| `NEXTAUTH_SECRET`   | Secret used to sign session tokens   | No       |
| `NEXT_PUBLIC_APP_URL` | Public base URL of the deployed app | No      |

---

## Available Scripts

| Script              | Description                                                        |
| ------------------- | ------------------------------------------------------------------ |
| `bun run dev`       | Start the Next.js dev server on port 3000 (logs to `dev.log`)      |
| `bun run build`     | Production build + copy static assets into the standalone output   |
| `bun run start`     | Run the standalone production server with Bun                      |
| `bun run lint`      | Run ESLint across the project                                      |
| `bun run db:push`   | Push the Prisma schema to the database                             |
| `bun run db:generate` | Generate the Prisma client                                       |
| `bun run db:migrate`  | Create/apply a development migration                             |
| `bun run db:reset`    | Reset the database and re-apply migrations                       |

---

## Design System Components

Located in `src/components/ui/` and built on Radix UI + Tailwind CSS:

**Actions:** Button, Alert, AlertDialog, Sheet, Drawer, Dropdown Menu, Context Menu, Menubar

**Forms:** Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Form, Label, Calendar, Input OTP, Form

**Data Display:** Card, Badge, Avatar, Table (TanStack), Chart, Progress, Skeleton, Separator, Scroll Area, Resizable Panels, Pagination, Breadcrumb

**Navigation:** Tabs, Accordion, Collapsible, Navigation Menu, Sidebar, Command Palette, Carousel

**Overlay:** Dialog, Popover, Hover Card, Tooltip, Toast (Sonner)

**Feedback:** Alert, Toast, Progress, Skeleton

Every component follows the Carolina token set — import the `cn()` helper from `src/lib` and compose with the class-variance-authority variants.

---

## Documentation Sections

The home page (`src/app/page.tsx`) wires together these sections from `src/components/carolina/`:

1. **Hero** — introduction to the design system.
2. **Context & Goals** — why Carolina exists and what it optimizes for.
3. **Token Foundations** — color, type, spacing, and elevation tokens.
4. **Component Showcases** — interactive examples of buttons, inputs, links, lists, and navigation.
5. **Content & Tone** — voice and microcopy rules.
6. **Accessibility** — WCAG guidance and keyboard/focus patterns.
7. **Anti-patterns** — common mistakes with corrected examples.
8. **QA Checklist** — pre-ship review checklist.
9. **Command Palette** — keyboard-first navigation (`Ctrl/⌘ + K`).
10. **Section Navigation** — sticky sidebar driven by `use-active-section`.

---

## Database

Prisma schema lives at `prisma/schema.prisma`.

```bash
bun run db:generate   # generate Prisma client
bun run db:push       # sync schema to the database
bun run db:migrate    # create & apply migrations (dev)
bun run db:reset      # drop, recreate, and re-seed
```

---

## Deployment

### Build for production

```bash
bun run build
bun run start
```

The build script produces a standalone server in `.next/standalone` with static assets copied in, so you can run it with minimal resources.

### With Caddy

A `Caddyfile` is included for reverse proxying:

```bash
caddy run --config Caddyfile
```

### Scripts

Helper scripts live in `.zscripts/`:

| Script                        | Purpose                        |
| ----------------------------- | ------------------------------ |
| `dev.sh`                      | Start dev server               |
| `build.sh`                    | Production build               |
| `start.sh`                    | Start production server        |
| `mini-services-install.sh`    | Install mini-service deps      |
| `mini-services-build.sh`      | Build mini-services            |
| `mini-services-start.sh`      | Start mini-services            |

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feature/my-change`
2. Make your changes and keep components token-compliant.
3. Run lint: `bun run lint`
4. Commit using a clear message: `git commit -m "feat: add <component>"`
5. Push and open a Pull Request.

### Conventions

- Components are functionally typed and use `cn()` for class merging.
- New variants go through `class-variance-authority`.
- All interactive elements must be keyboard accessible.
- Document do/don't guidance when adding a new showcase.

---

## License

MIT — free to use, modify, and distribute.
