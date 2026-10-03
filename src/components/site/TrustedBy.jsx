import React from "react";
import { MonoTag } from "@/components/site/Primitives";

// Replace these wordmarks with real client logos (SVG/Image) when available.
const CLIENTS = ["Northwind", "Lumen", "Cartstack", "Vitals", "Orbital", "Mergo"];

export default function TrustedBy() {
  return (
    <section className="border-b border-border/70 px-6 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
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
      </div>
    </section>
  );
}