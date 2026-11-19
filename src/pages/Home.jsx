import React from "react";
import { Link } from "react-router-dom";
import { Timer, TestTube2, ShieldAlert, ArrowRight } from "lucide-react";
import BreachCheckCard from "@/components/site/BreachCheckCard";
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
  { icon: ShieldAlert, title: "Built it with AI tools?", body: "Keys left in the browser code, database rules switched off, users who can open each other's records by changing a number in the URL. AI-built apps ship with the same holes again and again.", amber: true },
  { icon: TestTube2, title: "Fixed it once, broke it again?", body: "The next AI-generated change can quietly undo a security fix. We turn each fix into a Playwright test that fails the build if the hole comes back." },
  { icon: Timer, title: "Release day is a gamble?", body: "Manual checks are the bottleneck. We automate the journeys that earn revenue, so checking a release takes minutes, not days." },
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
            <MonoTag tone="green">Security checks for AI-built apps</MonoTag>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] md:text-6xl">
              Built it fast with AI?<br />Find out what it's leaking.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We check your app for the holes AI-built apps keep shipping with, help you fix them, and lock each fix in
              with a Playwright test that runs on every deploy. Before someone else finds them.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <PrimaryCTA to="/contact?package=breach-check">Book a Breach Check</PrimaryCTA>
              <SecondaryCTA to="/blog/ai-built-app-leaks">Check your own app</SecondaryCTA>
            </div>
            <p className="mono-label mt-10 text-muted-foreground">
              Fixed scope · Fixed price · Runs in your CI
            </p>
          </div>

          <div className="space-y-4">
            <PersonaNodeMap />
            <Image
              src="/images/circuit-board.webp"
              alt="Translucent circuit board with green light pulses"
              className="h-40 w-full border border-border object-cover"
            />
          </div>
        </div>
      </header>

      <Section>
        <SectionHead
          label="The problem"
          title="Shipping fast is easy now. Shipping safely isn't."
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
        <SectionHead label="How it works" title="Check. Fix. Lock it in." />
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {STEPS.filter((s) => ["01", "03", "04"].includes(s.id)).map((s, i) => (
            <div key={s.id} className="border-t border-border pt-6">
              <p className="mono-label text-primary">Step 0{i + 1}</p>
              <h3 className="mt-4 text-xl font-semibold">
                {["Check", "Fix", "Lock it in"][i]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {[
                  "We scan your code and live site, then test it by hand the way an attacker would: other users' data, admin pages, keys, uploads, AI features.",
                  "You get a plain-English report ranked by risk, with the fix for each finding. We can make the fixes with you or for you.",
                  "Each fix becomes a Playwright test in your CI, so the next change, human or AI, can't quietly reopen it.",
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
        <BreachCheckCard className="mt-14" />
        <div className="mt-6 grid gap-6 md:grid-cols-3">
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
            {featured ? (
              <>
                <h2 className="mt-5 text-3xl font-semibold md:text-4xl">{featured.name}</h2>
                <p className="mt-6 font-mono text-4xl text-primary">{featured.metric}</p>
                <p className="mono-label mt-2 text-muted-foreground">{featured.metricLabel}</p>
                <p className="mt-6 max-w-lg text-muted-foreground">{featured.results}</p>
                <Link to="/case-studies" className="mono-label mt-8 inline-flex items-center gap-2 text-primary">
                  Read the case study <ArrowRight className="h-3 w-3" />
                </Link>
              </>
            ) : (
              <>
                <h2 className="mt-5 text-3xl font-semibold md:text-4xl">Your app could be the first.</h2>
                <p className="mt-6 max-w-lg text-muted-foreground">
                  Each engagement ends with an after-action report: the flows we covered, what the suite caught and
                  how long regression takes now. We'll publish our first ones here, with our clients' permission.
                </p>
                <Link to="/book-audit" className="mono-label mt-8 inline-flex items-center gap-2 text-primary">
                  Become a founding client <ArrowRight className="h-3 w-3" />
                </Link>
              </>
            )}
          </div>
          <Image
            src="/images/journey-network.webp"
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