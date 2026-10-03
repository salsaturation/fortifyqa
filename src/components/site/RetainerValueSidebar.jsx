import React from "react";
import { RefreshCw, PackageCheck, LifeBuoy, ShieldCheck } from "lucide-react";
import { MonoTag } from "@/components/site/Primitives";

const POINTS = [
  {
    icon: RefreshCw,
    title: "Tests age with your product",
    body: "A one-off suite is correct on day one and stale by month three. The retainer keeps coverage in step with every feature you ship.",
  },
  {
    icon: LifeBuoy,
    title: "Someone owns the flaky tests",
    body: "No more 'is it us or the test?' threads. We triage failures over Slack and fix genuine flakes before they erode trust in CI.",
  },
  {
    icon: ShieldCheck,
    title: "Security stays closed",
    body: "A monthly Sentinel re-scan means new code can't silently reopen a fixed vulnerability — it's caught the same sprint.",
  },
  {
    icon: PackageCheck,
    title: "No lock-in",
    body: "The repo, fixtures and docs are always yours. Pause or cancel with a month's notice; the suite keeps running in your CI.",
  },
];

export default function RetainerValueSidebar() {
  return (
    <aside className="border border-border bg-card/40 p-8 lg:sticky lg:top-8 lg:self-start">
      <MonoTag tone="amber">Why the retainer</MonoTag>
      <h3 className="mt-4 text-2xl font-semibold leading-tight">
        One-off suites decay. The retainer compounds.
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">
        A fixed-price package gets you a working suite. The monthly retainer is what keeps it working — here's the difference.
      </p>
      <ul className="mt-8 space-y-6">
        {POINTS.map((p) => (
          <li key={p.title} className="flex gap-4">
            <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}