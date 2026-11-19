import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { BREACH_CHECK } from "@/lib/content";

// The entry-level offer, shown above the main packages on Home, Services and Pricing.
export default function BreachCheckCard({ className = "" }) {
  const b = BREACH_CHECK;
  return (
    <article id={b.slug} className={`relative scroll-mt-24 border border-accent/60 bg-card/50 ${className}`}>
      <div className="hazard-stripe h-1.5 w-full" />
      <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div>
          <p className="mono-label inline-flex items-center gap-2 text-accent">
            <ShieldAlert className="h-3.5 w-3.5" /> Start here
          </p>
          <h3 className="mt-4 text-2xl font-semibold md:text-3xl">{b.name}</h3>
          <p className="mt-4 font-mono text-3xl text-foreground">{b.price}</p>
          <p className="mono-label mt-2 text-muted-foreground">{b.meta}</p>
          <p className="mt-5 max-w-md text-muted-foreground">{b.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?package=${b.slug}`}
              className="group inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Book a Breach Check
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/blog/ai-built-app-leaks" className="mono-label text-primary hover:underline">
              What we check
            </Link>
          </div>
        </div>
        <div>
          <ul className="space-y-3 border-t border-border/70 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {b.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                <span className="font-mono text-xs text-accent">[x]</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground lg:pl-10">{b.note}</p>
        </div>
      </div>
    </article>
  );
}
