import React from "react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import { Section, SectionHead, Panel } from "@/components/site/Primitives";
import FinalCTA from "@/components/site/FinalCTA";

const VALUES = [
  ["Specific over vague", "A deliverable you can run beats a report you have to interpret."],
  ["Automated over manual", "If a human has to remember to check it, it will eventually ship broken."],
  ["Prevent, don't just find", "Every bug we find becomes a test, so it can only happen once."],
];

export default function About() {
  return (
    <div>
      <PageHero
        label="About"
        title="QA automation built by someone who ships software."
        subhead="Fortify QA is a small studio focused on Playwright test automation and security regression coverage for SaaS teams."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <Image
            src="https://media.base44.com/images/public/6a7f93b3cb5dff38406b0a9e/82d4b7bc9_generated_c5676243.png"
            alt="Abstract translucent figure rendered in low-key light"
            className="h-80 w-full border border-border object-cover"
          />
          <div>
            <p className="mono-label text-primary">Founder</p>
            <h2 className="mt-4 text-2xl font-semibold md:text-3xl">Engineer first, QA specialist second.</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                I spent years building and releasing web products, which mostly meant re-clicking the same checkout
                flow before every deploy and hoping nobody touched permissions. That is not quality assurance — it is
                anxiety with a checklist.
              </p>
              <p>
                Fortify QA exists because early-stage teams don't need a QA department. They need three to five
                personas mapped, the flows those people depend on automated in Playwright, and a pipeline that says
                yes or no on every push.
              </p>
              <p>
                The security layer came from the same instinct: a scan finding is only useful once it becomes a test
                that fails if the gap reappears.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead label="Values" title="Three rules we work by." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUES.map(([title, body]) => (
            <Panel key={title}>
              <p className="mono-label text-primary">{title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <FinalCTA heading="Get in touch." secondaryTo="/contact" secondaryLabel="Send a message" />
    </div>
  );
}