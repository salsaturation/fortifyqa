import React from "react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";
import LeadMagnet from "@/components/site/LeadMagnet";
import { POSTS } from "@/lib/content";

export default function Blog() {
  return (
    <div>
      <PageHero
        label="Blog"
        title="QA for builders."
        subhead="Practical Playwright, persona-driven testing, and security automation."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="divide-y divide-border border-y border-border">
            {POSTS.map((p) => (
              <article key={p.slug} className="py-8">
                <div className="flex items-center gap-4">
                  <span className="mono-label text-primary">{p.tag}</span>
                  <span className="mono-label text-muted-foreground">{p.read} read</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold md:text-2xl">{p.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <p className="mono-label mt-4 text-muted-foreground">Coming soon</p>
              </article>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LeadMagnet source="blog" compact />
          </aside>
        </div>
      </Section>
    </div>
  );
}