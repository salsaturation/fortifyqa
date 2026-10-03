import React from "react";
import { AlertTriangle, Wrench, TrendingUp } from "lucide-react";

const SECTIONS = [
  { key: "problem", label: "The problem", icon: AlertTriangle, tone: "text-accent" },
  { key: "solution", label: "What we built", icon: Wrench, tone: "text-muted-foreground" },
  { key: "results", label: "The results", icon: TrendingUp, tone: "text-primary" },
];

/**
 * Reusable case study layout.
 * Props:
 *  - study: { name, metric, metricLabel, personas[], problem, solution, results }
 */
export default function CaseStudyCard({ study }) {
  return (
    <article className="grid border border-border bg-card/50 lg:grid-cols-[1fr_2fr]">
      {/* Header / headline metric */}
      <div className="border-b border-border p-8 lg:border-b-0 lg:border-r">
        <h2 className="text-xl font-semibold">{study.name}</h2>
        <p className="mt-6 font-mono text-3xl text-primary">{study.metric}</p>
        <p className="mono-label mt-2 text-muted-foreground">{study.metricLabel}</p>
        {study.personas?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {study.personas.map((p) => (
              <span
                key={p}
                className={`mono-label border px-2 py-1 ${
                  p === "Attacker" ? "border-accent/60 text-accent" : "border-border text-muted-foreground"
                }`}
              >
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Problem → Solution → Results */}
      <div className="grid gap-8 p-8 sm:grid-cols-3">
        {SECTIONS.map(({ key, label, icon: Icon, tone }) => (
          <div key={key}>
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${tone}`} />
              <p className={`mono-label ${tone}`}>{label}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study[key]}</p>
          </div>
        ))}
      </div>
    </article>
  );
}