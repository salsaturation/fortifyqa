import React from "react";
import { cn } from "@/lib/utils";

export function Section({ id, className, children }) {
  return (
    <section id={id} className={cn("border-t border-border/70 px-6 py-24 md:px-10 lg:py-32", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function MonoTag({ children, tone = "muted", className }) {
  const tones = {
    muted: "text-muted-foreground",
    green: "text-primary",
    amber: "text-accent",
  };
  return (
    <span className={cn("mono-label inline-flex items-center gap-2", tones[tone], className)}>
      <span className="h-1 w-1 bg-current" />
      {children}
    </span>
  );
}

export function Panel({ className, children }) {
  return <div className={cn("border border-border bg-card/60 p-8", className)}>{children}</div>;
}

export function SectionHead({ label, title, body, align = "left" }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {label && <MonoTag>{label}</MonoTag>}
      <h2 className="mt-5 text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-lg text-muted-foreground">{body}</p>}
    </div>
  );
}