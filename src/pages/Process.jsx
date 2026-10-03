import React from "react";
import PageHero from "@/components/site/PageHero";
import { Section, SectionHead, Panel } from "@/components/site/Primitives";
import FinalCTA from "@/components/site/FinalCTA";
import { STEPS } from "@/lib/content";

const COMMS = [
  ["Async by default", "Slack or email updates as work lands. No status meetings."],
  ["Two calls, total", "One kickoff to map personas, one handover to walk the suite."],
  ["5–10 business days", "Delivery window depends on the package, agreed before we start."],
];

export default function Process() {
  return (
    <div>
      <PageHero
        label="Process"
        title="How we work in two weeks or less."
        subhead="A fixed process, clear deliverables, no scope creep."
      />

      <Section>
        <ol className="relative border-l border-border pl-8 md:pl-12">
          {STEPS.map((s) => (
            <li key={s.id} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[calc(2rem+5px)] top-2 h-2.5 w-2.5 bg-primary md:-left-[calc(3rem+5px)]" />
              <p className="mono-label text-muted-foreground">Phase {s.id}</p>
              <h2 className="mt-3 text-2xl font-semibold md:text-3xl">{s.title}</h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHead label="Communication" title="What working together looks like." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {COMMS.map(([title, body]) => (
            <Panel key={title}>
              <p className="mono-label text-primary">{title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <FinalCTA heading="Know the process. Now pick the scope." secondaryLabel="See pricing" />
    </div>
  );
}