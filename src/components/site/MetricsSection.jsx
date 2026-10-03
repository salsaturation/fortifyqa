import React from "react";
import { Section, MonoTag } from "@/components/site/Primitives";

const METRICS = [
  { value: "98%", label: "Test coverage", detail: "On critical revenue flows after suite delivery" },
  { value: "3 days → 15 min", label: "Regression cycle", detail: "Manual checklist replaced with a CI pipeline" },
  { value: "-40%", label: "Seller churn", detail: "From broken bulk-upload flows now under test" },
  { value: "0", label: "Recurring auth bugs", detail: "Attacker-persona tests lock fixes in place" },
];

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
        <p className="mono-label max-w-xs text-muted-foreground">
          Representative results from shipped engagements
        </p>
      </div>

      <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-card/60 p-8">
            <p className="font-mono text-3xl text-primary md:text-4xl">{m.value}</p>
            <p className="mt-4 text-sm font-semibold">{m.label}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}