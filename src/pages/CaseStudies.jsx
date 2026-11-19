import React from "react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";
import CaseStudyCard from "@/components/site/CaseStudyCard";
import FinalCTA from "@/components/site/FinalCTA";
import FoundingNote from "@/components/site/FoundingNote";
import { CASE_STUDIES } from "@/lib/content";

export default function CaseStudies() {
  return (
    <div>
      <PageHero
        label="After-action reports"
        title="Results from real releases."
        subhead="Each engagement ends with numbers: how long regression used to take, how long it takes now, and what we caught on the way."
      />

      <Section>
        {CASE_STUDIES.length > 0 ? (
          <div className="space-y-6">
            {CASE_STUDIES.map((c) => (
              <CaseStudyCard key={c.slug} study={c} />
            ))}
          </div>
        ) : (
          <FoundingNote>
            We're working with our first clients now. Their after-action reports will be published here once
            the projects finish and they've approved what we share.
          </FoundingNote>
        )}
      </Section>

      <FinalCTA heading="Start your own audit." />
    </div>
  );
}