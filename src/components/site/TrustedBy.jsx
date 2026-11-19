import React from "react";
import { MonoTag } from "@/components/site/Primitives";

// Add real client names (or swap the spans for logo images) once clients agree to be listed.
const CLIENTS = [];

export default function TrustedBy() {
  return (
    <section className="border-b border-border/70 px-6 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        {CLIENTS.length > 0 ? (
          <>
            <MonoTag className="block text-center">Trusted by teams shipping with confidence</MonoTag>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
              {CLIENTS.map((c) => (
                <span
                  key={c}
                  className="font-heading text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground md:text-xl"
                >
                  {c}
                </span>
              ))}
            </div>
          </>
        ) : (
          <MonoTag className="block text-center">Now taking on founding clients</MonoTag>
        )}
      </div>
    </section>
  );
}
