import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
        subhead="Practical security checks for AI-built apps, and the Playwright tests that keep them fixed."
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
                <h2 className="mt-3 text-xl font-semibold md:text-2xl">
                  <Link to={`/blog/${p.slug}`} className="transition-colors hover:text-primary">{p.title}</Link>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <Link to={`/blog/${p.slug}`} className="mono-label mt-4 inline-flex items-center gap-2 text-primary">
                  Read the post <ArrowRight className="h-3 w-3" />
                </Link>
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