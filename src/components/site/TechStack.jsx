import React from "react";
import { Section, SectionHead, Panel, MonoTag } from "@/components/site/Primitives";

const STACK = [
  {
    name: "Playwright",
    tag: "test framework",
    points: [
      "Cross-browser: Chromium, Firefox, WebKit",
      "Web-first assertions with auto-waiting",
      "Role-based locators that survive refactors",
    ],
  },
  {
    name: "GitHub Actions",
    tag: "CI/CD",
    points: [
      "Sharded parallel test execution",
      "Retry + trace artifacts on every run",
      "Gated deploys — red build blocks merge",
    ],
  },
  {
    name: "Sentinel",
    tag: "security scanning",
    points: [
      "Repo + live surface scanning",
      "Findings converted to regression tests",
      "Attacker-persona coverage built in",
    ],
  },
];

export default function TechStack() {
  return (
    <Section className="border-border/70 bg-card/20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          label="Modern toolchain"
          title="The stack we build with."
          body="No Selenium wrappers, no proprietary runners. Just the tools your engineers already trust — wired into your pipeline, not bolted on."
        />
        <MonoTag tone="green">maintainable · open · yours to keep</MonoTag>
      </div>

      <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
        {STACK.map((tool) => (
          <Panel key={tool.name} className="bg-card/60">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-semibold">{tool.name}</h3>
              <span className="mono-label text-muted-foreground">{tool.tag}</span>
            </div>
            <ul className="mt-6 space-y-3">
              {tool.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="font-mono text-xs text-primary">[x]</span>
                  {p}
                </li>
              ))}
            </ul>
          </Panel>
        ))}
      </div>
    </Section>
  );
}