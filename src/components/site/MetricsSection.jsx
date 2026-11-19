import React from "react";
import { Section, MonoTag } from "@/components/site/Primitives";
import FoundingNote from "@/components/site/FoundingNote";

// Before/after numbers from real engagements only. Shape: { value, label, detail }
const METRICS = [];

export default function MetricsSection() {
  return (
    <Section className="border-border/70">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <MonoTag tone="green">By the numbers</MonoTag>
          <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
            Outcomes, not effort reports.
          </h2>
        </div>
      </div>

      {METRICS.length === 0 ? (
        <FoundingNote className="mt-14">
          Every engagement ends with before-and-after numbers: how long regression took, how long it takes now,
          and what the suite caught before release. We'll publish them here as our first clients' projects finish.
        </FoundingNote>
      ) : (
      <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-card/60 p-8">
            <p className="font-mono text-3xl text-primary md:text-4xl">{m.value}</p>
            <p className="mt-4 text-sm font-semibold">{m.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.detail}</p>
          </div>
        ))}
      </div>
      )}
    </Section>
  );
}