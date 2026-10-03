import React, { useState } from "react";
import { Section, SectionHead } from "@/components/site/Primitives";
import SentinelBadge from "@/components/site/SentinelBadge";
import { Check, X, Clock, Filter } from "lucide-react";

const SUITES = [
  {
    name: "buyer.checkout.spec.ts",
    status: "passed",
    tests: [
      { name: "completes purchase with valid card", time: "1.2s", status: "passed" },
      { name: "blocks checkout on expired card", time: "0.8s", status: "passed" },
      { name: "applies promo code at cart", time: "0.9s", status: "passed" },
    ],
  },
  {
    name: "admin.permissions.spec.ts",
    status: "failed",
    tests: [
      { name: "admin can view all orders", time: "1.1s", status: "passed" },
      { name: "user cannot access admin panel", time: "2.0s", status: "failed" },
      { name: "manager can refund an order", time: "1.4s", status: "passed" },
    ],
  },
  {
    name: "attacker.auth-bypass.spec.ts",
    status: "passed",
    tests: [
      { name: "rejects IDOR on /api/orders/:id", time: "0.6s", status: "passed" },
      { name: "blocks mass assignment on user update", time: "0.7s", status: "passed" },
    ],
  },
];

const TOTAL = SUITES.reduce(
  (acc, s) => {
    s.tests.forEach((t) => {
      acc[t.status]++;
      acc.total++;
    });
    return acc;
  },
  { passed: 0, failed: 0, total: 0 }
);

const FILTERS = ["All", "Passed", "Failed"];

export default function ReportPreview() {
  const [filter, setFilter] = useState("All");

  return (
    <Section className="border-border/70 bg-card/20">
      <SectionHead
        label="What you get"
        title="A report that says yes or no."
        body="Every run produces a Playwright HTML report like the one below — pass/fail per suite, per test, with timings and traces for failures. Founders read it in 30 seconds; engineers open the trace."
      />

      <div className="mt-12 border border-border bg-background">
        {/* Report header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card/40 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-semibold">playwright-report</span>
            <span className="mono-label text-muted-foreground">run #284 · main</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-sm text-primary">
              <Check className="h-4 w-4" /> {TOTAL.passed} passed
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-destructive">
              <X className="h-4 w-4" /> {TOTAL.failed} failed
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> 8.7s
            </span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 border-b border-border px-5 py-3">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`mono-label px-2 py-1 transition-colors ${
                filter === f ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Suites */}
        <div className="divide-y divide-border">
          {SUITES.map((suite) => {
            const visible = suite.tests.filter(
              (t) => filter === "All" || (filter === "Passed" ? t.status === "passed" : t.status === "failed")
            );
            if (visible.length === 0) return null;
            return (
              <div key={suite.name}>
                <div className="flex items-center justify-between gap-3 px-5 py-3">
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{suite.name}</span>
                    <SentinelBadge />
                  </span>
                  <span
                    className={`mono-label ${
                      suite.status === "passed" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {suite.status}
                  </span>
                </div>
                <ul className="border-t border-border/60 bg-card/20">
                  {visible.map((t) => (
                    <li key={t.name} className="flex items-center justify-between px-5 py-2.5">
                      <span className="flex items-center gap-3 text-sm">
                        {t.status === "passed" ? (
                          <Check className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <X className="h-3.5 w-3.5 text-destructive" />
                        )}
                        <span className={t.status === "failed" ? "text-foreground" : "text-muted-foreground"}>
                          {t.name}
                        </span>
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{t.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <SentinelBadge />
        <p className="text-xs text-muted-foreground">
          Every suite ships Sentinel-ready — scanned for IDOR, broken auth, and exposed endpoints, with attacker-persona tests that keep fixes from regressing.
        </p>
      </div>
      <p className="mono-label mt-4 text-muted-foreground">
        Sample report — your suites, your filenames, your flows.
      </p>
    </Section>
  );
}