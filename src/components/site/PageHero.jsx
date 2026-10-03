import React from "react";
import { MonoTag } from "./Primitives";

export default function PageHero({ label, title, subhead, children }) {
  return (
    <header className="relative overflow-hidden px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-28">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.35]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      <div className="relative mx-auto w-full max-w-6xl">
        {label && <MonoTag tone="green">{label}</MonoTag>}
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl">{title}</h1>
        {subhead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{subhead}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}