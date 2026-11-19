import React from "react";
import PageHero from "@/components/site/PageHero";
import { Section, SectionHead } from "@/components/site/Primitives";
import PackageCard from "@/components/site/PackageCard";
import ComparisonTable from "@/components/site/ComparisonTable";
import RoiCalculator from "@/components/site/RoiCalculator";
import RetainerValueSidebar from "@/components/site/RetainerValueSidebar";
import FinalCTA from "@/components/site/FinalCTA";
import BreachCheckCard from "@/components/site/BreachCheckCard";
import { PACKAGES, RETAINER, FAQS } from "@/lib/content";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Pricing() {
  return (
    <div>
      <PageHero
        label="Pricing"
        title="Fixed-price QA packages."
        subhead="No hourly guessing. Start with a £395 Breach Check, or pick a bigger scope."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <BreachCheckCard />
            <div className="grid gap-6 md:grid-cols-3">
              {PACKAGES.map((p) => (
                <PackageCard key={p.slug} pkg={p} />
              ))}
            </div>

            <div className="border border-border bg-card/50 p-8 md:flex md:items-center md:justify-between md:gap-12">
              <div>
                <h3 className="text-lg font-semibold">{RETAINER.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{RETAINER.summary}</p>
                <ul className="mt-5 space-y-2">
                  {RETAINER.includes.map((i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="font-mono text-xs text-primary">[x]</span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 font-mono text-2xl md:mt-0">{RETAINER.price}</p>
            </div>
          </div>

          <RetainerValueSidebar />
        </div>
      </Section>

      <ComparisonTable />

      <RoiCalculator />

      <Section>
        <SectionHead label="FAQ" title="Questions engineers actually ask." />
        <Accordion type="single" collapsible className="mt-12 border-t border-border">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
              <AccordionTrigger className="py-6 text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <FinalCTA
        heading="Not sure which fits?"
        body="Book a free 20-minute audit scoping call. We'll name your riskiest journeys and recommend a package — even if that package is none of ours yet."
        secondaryTo="/services"
        secondaryLabel="Compare services"
      />
    </div>
  );
}