"use client";

import { SiteHeader } from "@/components/carolina/site-header";
import { SiteFooter } from "@/components/carolina/site-footer";
import { SectionNav } from "@/components/carolina/section-nav";
import { Hero } from "@/components/carolina/hero";
import { ContextGoals } from "@/components/carolina/context-goals";
import { TokenFoundations } from "@/components/carolina/token-foundations";
import { ShowcaseButtons } from "@/components/carolina/showcase-buttons";
import { ShowcaseInputs } from "@/components/carolina/showcase-inputs";
import { ShowcaseLinks } from "@/components/carolina/showcase-links";
import { ShowcaseLists } from "@/components/carolina/showcase-lists";
import { ShowcaseNavigation } from "@/components/carolina/showcase-navigation";
import { Accessibility } from "@/components/carolina/accessibility";
import { ContentTone } from "@/components/carolina/content-tone";
import { AntiPatterns } from "@/components/carolina/anti-patterns";
import { QAChecklist } from "@/components/carolina/qa-checklist";
import { SectionHeading } from "@/components/carolina/primitives";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[220px_minmax(0,1fr)]">
            <aside className="hidden xl:block">
              <SectionNav />
            </aside>

            <div className="flex flex-col gap-16 pb-20 pt-16">
              <ContextGoals />
              <TokenFoundations />

              {/* Components section wrapper */}
              <section id="components" className="scroll-mt-20">
                <SectionHeading
                  index="03"
                  eyebrow="Building blocks"
                  title="Component rules"
                  description="Anatomy, variants, states, and responsive behavior for every Carolina component family. Each defines keyboard, pointer, and touch behavior plus long-content, overflow, and empty-state handling."
                />
                <div className="flex flex-col gap-14">
                  <ShowcaseButtons />
                  <ShowcaseInputs />
                  <ShowcaseLinks />
                  <ShowcaseLists />
                  <ShowcaseNavigation />
                </div>
              </section>

              <Accessibility />
              <ContentTone />
              <AntiPatterns />
              <QAChecklist />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
