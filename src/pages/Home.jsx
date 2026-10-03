import React from "react";
import { Link } from "react-router-dom";
import { Timer, TestTube2, ShieldAlert, ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { Section, SectionHead, MonoTag } from "@/components/site/Primitives";
import { PrimaryCTA, SecondaryCTA } from "@/components/site/CTAButtons";
import PersonaNodeMap from "@/components/site/PersonaNodeMap";
import PackageCard from "@/components/site/PackageCard";
import LeadMagnet from "@/components/site/LeadMagnet";
import TrustedBy from "@/components/site/TrustedBy";
import TechStack from "@/components/site/TechStack";
import MetricsSection from "@/components/site/MetricsSection";
import TestimonialSlider from "@/components/site/TestimonialSlider";
import FinalCTA from "@/components/site/FinalCTA";
import { PACKAGES, STEPS, CASE_STUDIES } from "@/lib/content";

const PROBLEMS = [
  { icon: Timer, title: "Slow releases?", body: "Manual regression is the bottleneck. We automate the journeys that actually earn revenue so a release check takes minutes." },
  { icon: TestTube2, title: "No test coverage?", body: "Get a maintainable Playwright suite — fixtures, role-based locators, web-first assertions — running in CI within days." },
  { icon: ShieldAlert, title: "Worried about security?", body: "Add a Rafter-powered scan and turn each finding into an attacker-persona test that stops it coming back.", amber: true },
];

export default function Home() {
  const featured = CASE_STUDIES[0];

  return (
    <div>
      <TrustedBy />
      <header className="relative overflow-hidden border-b border-border/70 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24">
        <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.35]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">
          <div>
            <MonoTag tone="green">Playwright automation studio</MonoTag>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] md:text-6xl">
              Ship fewer bugs.<br />Sleep better at night.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Persona-driven Playwright test automation for early-stage SaaS teams. We turn your real users into
              reliable regression suites — and catch security gaps before your customers do.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA />
              <SecondaryCTA to="/process">See how it works</SecondaryCTA>
            </div>
            <p className="mono-label mt-10 text-muted-foreground">
              Trusted by early-stage SaaS teams shipping with confidence
            </p>
          </div>

          <div className="space-y-4">
            <PersonaNodeMap />
            <Image
              src="https://media.base44.com/images/public/6a7f93b3cb5dff38406b0a9e/4eca4ffe6_generated_da433b25.png"
              alt="Translucent circuit board with green light pulses"
              className="h-40 w-full border border-border object-cover"
            />
          </div>
        </div>
      </header>

      <Section>
        <SectionHead
          label="The problem"
          title="You already know what's fragile. Nothing is testing it."
        />
        <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, body, amber }) => (
            <div key={title} className="bg-card/60 p-8">
              <Icon className={`h-5 w-5 ${amber ? "text-accent" : "text-primary"}`} />
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead label="How it works" title="Map. Automate. Protect." />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {STEPS.filter((s) => ["01", "03", "04"].includes(s.id)).map((s, i) => (
            <div key={s.id} className="border-t border-border pt-6">
              <p className="mono-label text-primary">Step 0{i + 1}</p>
              <h3 className="mt-4 text-xl font-semibold">
                {["Map", "Automate", "Protect"][i]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "We interview you and define the 3–5 user personas that drive revenue.",
                  "We write Playwright suites for each persona and wire them into GitHub Actions.",
                  "An optional Rafter security scan becomes attacker-persona tests that prevent regressions.",
                ][i]}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead label="Packages" title="Fixed scope. Fixed price." />
          <Link to="/pricing" className="mono-label inline-flex items-center gap-2 text-primary">
            Full pricing <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PACKAGES.map((p) => (
            <PackageCard key={p.slug} pkg={p} ctaLabel="See details" ctaTo="/pricing" />
          ))}
        </div>
      </Section>

      <TechStack />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <MonoTag>Case study</MonoTag>
            <h2 className="mt-5 text-3xl font-semibold md:text-4xl">{featured.name}</h2>
            <p className="mt-6 font-mono text-4xl text-primary">{featured.metric}</p>
            <p className="mono-label mt-2 text-muted-foreground">{featured.metricLabel}</p>
            <p className="mt-6 max-w-lg text-muted-foreground">{featured.outcome}</p>
            <Link to="/case-studies" className="mono-label mt-8 inline-flex items-center gap-2 text-primary">
              Read the case study <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <Image
            src="https://media.base44.com/images/public/6a7f93b3cb5dff38406b0a9e/d33d79e58_generated_e94ed149.png"
            alt="Network of luminous nodes representing mapped user journeys"
            className="h-72 w-full border border-border object-cover"
          />
        </div>
      </Section>

      <MetricsSection />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              label="Lead magnet"
              title="Map your own personas first."
              body="Not ready to talk? Start with the planner we use on every discovery call."
            />
          </div>
          <LeadMagnet source="home" />
        </div>
      </Section>

      <TestimonialSlider />

      <FinalCTA />
    </div>
  );
}