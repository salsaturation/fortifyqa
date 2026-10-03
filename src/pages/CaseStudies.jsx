import React from "react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";
import CaseStudyCard from "@/components/site/CaseStudyCard";
import FinalCTA from "@/components/site/FinalCTA";
import { CASE_STUDIES } from "@/lib/content";

export default function CaseStudies() {
  return (
    <div>
      <PageHero
        label="After-action reports"
        title="Real results from real releases."
        subhead="Each engagement ends with numbers: how long regression used to take, how long it takes now, and what we caught on the way."
      />

      <Section>
        <div className="space-y-6">
          {CASE_STUDIES.map((c) => (
            <CaseStudyCard key={c.slug} study={c} />
          ))}
        </div>
        <p className="mono-label mt-8 text-muted-foreground">
          Note: engagements shown are representative of the work and metrics we deliver.
        </p>
      </Section>

      <FinalCTA heading="Start your own audit." />
    </div>
  );
}