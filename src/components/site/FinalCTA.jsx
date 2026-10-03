import React from "react";
import { Section, MonoTag } from "./Primitives";
import { PrimaryCTA, SecondaryCTA } from "./CTAButtons";

export default function FinalCTA({
  heading = "Ready to stop testing by hand?",
  body = "Twenty minutes on a call is enough to name your riskiest user journeys and the right package for them.",
  secondaryTo = "/pricing",
  secondaryLabel = "View Pricing",
}) {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-20" />
      <div className="relative">
        <MonoTag tone="green">Next step</MonoTag>
        <h2 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">{heading}</h2>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">{body}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <PrimaryCTA />
          <SecondaryCTA to={secondaryTo}>{secondaryLabel}</SecondaryCTA>
        </div>
      </div>
    </Section>
  );
}