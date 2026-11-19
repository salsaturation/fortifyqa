import React from "react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import { Section, SectionHead, Panel } from "@/components/site/Primitives";
import PackageCard from "@/components/site/PackageCard";
import ReportPreview from "@/components/site/ReportPreview";
import FinalCTA from "@/components/site/FinalCTA";
import BreachCheckCard from "@/components/site/BreachCheckCard";
import { PACKAGES, RETAINER } from "@/lib/content";

const WHY = [
  ["Cross-browser", "One suite runs on Chromium, Firefox, and WebKit — no separate stacks to maintain."],
  ["CI-native", "Built for GitHub Actions: sharding, retries, traces, and HTML reports out of the box."],
  ["Role-based locators", "Tests target what users see, so a class rename doesn't break your suite."],
  ["Web-first assertions", "Auto-waiting removes the sleep() calls that make suites flaky."],
];

export default function Services() {
  return (
    <div>
      <PageHero
        label="Services"
        title="Find the holes. Fix them. Keep them fixed."
        subhead="Security checks and Playwright test suites for SaaS teams, especially apps built quickly with AI tools. Fixed scope, fixed price, and you keep everything we build."
      />

      <Section>
        <SectionHead label="Core services" title="Five ways to work together." />
        <BreachCheckCard className="mt-14" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <PackageCard key={p.slug} pkg={p} />
          ))}
        </div>

        <div id="retainer" className="mt-6 border border-border bg-card/50 p-8 md:flex md:items-center md:justify-between md:gap-12">
          <div>
            <h3 className="text-lg font-semibold">{RETAINER.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{RETAINER.summary}</p>
            <ul className="mt-5 space-y-2">
              {RETAINER.includes.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="font-mono text-xs text-primary">[x]</span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 font-mono text-2xl md:mt-0">{RETAINER.price}</p>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead label="Security add-on" title="The attacker is a persona too." body="We run a Sentinel scan across your repo and live site, then convert the highest-risk findings into Playwright regression tests: broken access control, auth bypass, exposed endpoints. You get a prioritized remediation brief and permanent coverage." />
          </div>
          <Image
            src="/images/services.webp"
            alt="Obsidian shield of interlocking data shards with amber highlights"
            className="h-72 w-full border border-border object-cover"
          />
        </div>
      </Section>

      <ReportPreview />

      <Section>
        <SectionHead label="Tooling" title="Why Playwright?" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {WHY.map(([title, body]) => (
            <Panel key={title}>
              <p className="mono-label text-primary">{title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      <FinalCTA heading="Pick the deliverable, not the day rate." />
    </div>
  );
}