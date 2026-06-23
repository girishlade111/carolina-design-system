"use client";

import * as React from "react";
import { Search, AlertCircle, Check, ChevronDown } from "lucide-react";
import { SectionHeading, DemoCell, Pill, CodeBlock } from "./primitives";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-c bg-surface-base border text-ink placeholder:text-ink-muted/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ShowcaseInputs() {
  const [email, setEmail] = React.useState("dev@carolina");
  const [validEmail, setValidEmail] = React.useState("dev@carolina.io");
  const [query, setQuery] = React.useState("");
  const [bio, setBio] = React.useState("");

  return (
    <section id="components-inputs" className="scroll-mt-24">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-3">
          <Pill tone="accent">density: 14</Pill>
          <h3 className="text-c-2xl font-bold text-ink">Inputs</h3>
        </div>
        <p className="text-c-sm text-ink-muted max-w-2xl lh-base-c">
          Anatomy: <code className="font-mono">label</code> →{" "}
          <code className="font-mono">control</code> →{" "}
          <code className="font-mono">helper / error</code>. Label always above
          control; helper text below. Height 44px; radius{" "}
          <code className="font-mono">radius.xs</code>.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {/* default */}
        <DemoCell label="default">
          <div className="w-full">
            <label
              htmlFor="in-default"
              className="block text-c-sm font-medium text-ink mb-1.5"
            >
              Project name
            </label>
            <input
              id="in-default"
              type="text"
              defaultValue="carolina-docs"
              className={cn(fieldBase, "h-11 px-3 border-border focus:border-accent")}
            />
            <p className="mt-1.5 text-c-xs text-ink-muted">
              Used in the URL and sidebar.
            </p>
          </div>
        </DemoCell>

        {/* focus */}
        <DemoCell label="focus-visible">
          <div className="w-full">
            <label
              htmlFor="in-focus"
              className="block text-c-sm font-medium text-ink mb-1.5"
            >
              Repository
            </label>
            <input
              id="in-focus"
              type="text"
              defaultValue="carolina/design-system"
              className={cn(
                fieldBase,
                "h-11 px-3 border-accent outline-2 outline-offset-2 outline-accent"
              )}
            />
          </div>
        </DemoCell>

        {/* error */}
        <DemoCell label="error">
          <div className="w-full">
            <label
              htmlFor="in-error"
              className="block text-c-sm font-medium text-ink mb-1.5"
            >
              Email
            </label>
            <input
              id="in-error"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid="true"
              aria-describedby="in-error-msg"
              className={cn(fieldBase, "h-11 px-3 pr-9 border-danger")}
            />
            <span className="relative block">
              <AlertCircle
                className="absolute -top-8 right-3 h-4 w-4 text-danger"
                aria-hidden
              />
            </span>
            <p
              id="in-error-msg"
              className="mt-1.5 text-c-xs text-danger flex items-center gap-1"
            >
              Enter a valid email address, e.g. dev@carolina.io
            </p>
          </div>
        </DemoCell>

        {/* success */}
        <DemoCell label="success (valid)">
          <div className="w-full">
            <label
              htmlFor="in-success"
              className="block text-c-sm font-medium text-ink mb-1.5"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="in-success"
                type="email"
                value={validEmail}
                onChange={(e) => setValidEmail(e.target.value)}
                className={cn(fieldBase, "h-11 px-3 pr-9 border-success")}
              />
              <Check
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-success"
                aria-hidden
              />
            </div>
            <p className="mt-1.5 text-c-xs text-success">
              Looks good.
            </p>
          </div>
        </DemoCell>

        {/* disabled */}
        <DemoCell label="disabled">
          <div className="w-full">
            <label
              htmlFor="in-disabled"
              className="block text-c-sm font-medium text-ink-muted mb-1.5"
            >
              Cluster ID
            </label>
            <input
              id="in-disabled"
              type="text"
              defaultValue="us-east-1-prod"
              disabled
              className={cn(fieldBase, "h-11 px-3 border-border opacity-50 cursor-not-allowed")}
            />
          </div>
        </DemoCell>

        {/* search */}
        <DemoCell label="search">
          <div className="w-full">
            <label htmlFor="in-search" className="sr-only">
              Search the docs
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted"
                aria-hidden
              />
              <input
                id="in-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the docs…"
                className={cn(fieldBase, "h-11 pl-9 pr-3 border-border focus:border-accent")}
              />
            </div>
          </div>
        </DemoCell>

        {/* textarea */}
        <DemoCell label="textarea (overflow)">
          <div className="w-full">
            <label
              htmlFor="in-bio"
              className="block text-c-sm font-medium text-ink mb-1.5"
            >
              Bio
            </label>
            <textarea
              id="in-bio"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your stack…"
              className={cn(
                fieldBase,
                "p-3 border-border focus:border-accent resize-y min-h-[88px]"
              )}
            />
            <p className="mt-1.5 text-c-xs text-ink-muted">
              Resizes vertically; max-height 240px then scrolls.
            </p>
          </div>
        </DemoCell>

        {/* select */}
        <DemoCell label="select">
          <div className="w-full">
            <label
              htmlFor="in-region"
              className="block text-c-sm font-medium text-ink mb-1.5"
            >
              Region
            </label>
            <div className="relative">
              <select
                id="in-region"
                defaultValue="us-east"
                className={cn(
                  fieldBase,
                  "h-11 pl-3 pr-9 border-border focus:border-accent appearance-none cursor-pointer"
                )}
              >
                <option value="us-east">us-east-1</option>
                <option value="us-west">us-west-2</option>
                <option value="eu">eu-central-1</option>
                <option value="ap">ap-southeast-1</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted pointer-events-none"
                aria-hidden
              />
            </div>
          </div>
        </DemoCell>
      </div>

      <div className="mt-6">
        <CodeBlock
          caption="Error state must pair aria-invalid with an describedby message."
          code={`<input
  aria-invalid="true"
  aria-describedby="email-error"
  className="border-danger"
/>
<p id="email-error" className="text-danger">
  Enter a valid email address.
</p>`}
        />
      </div>
    </section>
  );
}
