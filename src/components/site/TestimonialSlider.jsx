import React, { useState } from "react";
import { Section, MonoTag } from "@/components/site/Primitives";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoundingNote from "@/components/site/FoundingNote";

// Real, attributed quotes only, with the client's permission. Shape: { quote, name, metric }
const QUOTES = [];

export default function TestimonialSlider() {
  const [i, setI] = useState(0);
  const count = QUOTES.length;
  const go = (n) => setI((p) => (n + count) % count);
  const active = QUOTES[i];

  if (count === 0) {
    return (
      <Section className="border-border/70 bg-card/20">
        <MonoTag tone="green">Testimonials</MonoTag>
        <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">Your quote could go here.</h2>
        <FoundingNote className="mt-12">
          We're a new studio working with our first clients now. Founding clients get our full attention and help
          shape how the packages work. Their words will go here, with permission.
        </FoundingNote>
      </Section>
    );
  }

  return (
    <Section className="border-border/70 bg-card/20">
      <MonoTag tone="green">From the founders</MonoTag>
      <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">
        Faster shipping, fewer surprises.
      </h2>

      <div className="mt-12 grid gap-8 border border-border bg-background/60 p-8 md:p-12 lg:grid-cols-[1fr_auto]">
        <div>
          <blockquote className="text-lg leading-relaxed text-foreground md:text-2xl">
            “{active.quote}”
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-8 bg-primary" />
            <div>
              <p className="text-sm font-semibold">{active.name}</p>
              <p className="mono-label mt-1 text-primary">{active.metric}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:flex-col">
          <button
            onClick={() => go(i - 1)}
            aria-label="Previous testimonial"
            className="border border-border p-2 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="mono-label text-muted-foreground">
            0{i + 1} / 0{count}
          </span>
          <button
            onClick={() => go(i + 1)}
            aria-label="Next testimonial"
            className="border border-border p-2 transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {QUOTES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`h-1 transition-all ${idx === i ? "w-10 bg-primary" : "w-5 bg-border"}`}
          />
        ))}
      </div>
    </Section>
  );
}