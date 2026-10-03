import React from "react";
import { Section, SectionHead } from "@/components/site/Primitives";
import { Check, Minus } from "lucide-react";

const TIERS = [
  { key: "map", name: "Persona Test Map" },
  { key: "suite", name: "Playwright Persona Suite" },
  { key: "security", name: "Security + Regression Bundle" },
  { key: "retainer", name: "Monthly Retainer" },
];

// y = yes, o = omitted, — = not applicable
const ROWS = [
  { group: "Discovery & planning", feature: "60-minute discovery call", values: ["y", "y", "y", "—"] },
  { feature: "3–5 user personas documented", values: ["y", "y", "y", "—"] },
  { feature: "Critical flows & edge cases per persona", values: ["y", "y", "y", "—"] },
  { feature: "Written test plan (Notion / Google Doc)", values: ["y", "y", "y", "—"] },
  { group: "Automation", feature: "Playwright test suite per persona", values: ["—", "y", "y", "y"] },
  { feature: "Role-based locators & web-first assertions", values: ["—", "y", "y", "y"] },
  { feature: "GitHub Actions CI integration", values: ["—", "y", "y", "y"] },
  { feature: "HTML test report dashboard", values: ["—", "y", "y", "y"] },
  { feature: "Handover call + documentation", values: ["—", "y", "y", "—"] },
  { group: "Security", feature: "Sentinel scan of repo + live site", values: ["—", "—", "y", "y"] },
  { feature: "Attacker-persona regression tests", values: ["—", "—", "y", "y"] },
  { feature: "Prioritized remediation brief", values: ["—", "—", "y", "—"] },
  { group: "Ongoing", feature: "Suite maintenance & extension", values: ["—", "—", "—", "y"] },
  { feature: "Monthly Sentinel re-scan", values: ["—", "—", "—", "y"] },
  { feature: "Slack / email support for flaky tests", values: ["—", "—", "—", "y"] },
];

const PRICES = ["£500–750", "£1,500–3,500", "£2,500–5,000", "£750–1,500/mo"];

function Cell({ value }) {
  if (value === "y") return <Check className="mx-auto h-4 w-4 text-primary" />;
  if (value === "—") return <Minus className="mx-auto h-4 w-4 text-muted-foreground/40" />;
  return null;
}

export default function ComparisonTable() {
  return (
    <Section>
      <SectionHead
        label="Compare packages"
        title="Feature breakdown by tier."
        body="Every tier builds on the one before it. The retainer keeps a delivered suite green — it's maintenance, not a standalone deliverable."
      />

      <div className="mt-12 overflow-x-auto border border-border">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-card/40">
              <th className="p-4 text-left font-medium text-muted-foreground">Feature</th>
              {TIERS.map((t, i) => (
                <th key={t.key} className="border-l border-border p-4 text-left">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="mono-label mt-1 block text-primary">{PRICES[i]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, idx) => (
              <React.Fragment key={idx}>
                {row.group && (
                  <tr className="border-b border-border bg-card/20">
                    <td colSpan={5} className="p-3 px-4">
                      <span className="mono-label text-primary">{row.group}</span>
                    </td>
                  </tr>
                )}
                <tr className="border-b border-border/60 last:border-0">
                  <td className="p-4 text-muted-foreground">{row.feature}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="border-l border-border/60 p-4 text-center">
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}