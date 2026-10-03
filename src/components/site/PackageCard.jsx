import React from "react";
import { Link } from "react-router-dom";

export default function PackageCard({ pkg, ctaLabel = "Book this package", ctaTo = "/book-audit" }) {
  return (
    <article
      id={pkg.slug}
      className={`relative flex flex-col border bg-card/50 ${pkg.recommended ? "border-accent/60" : "border-border"}`}
    >
      {pkg.recommended && (
        <>
          <div className="hazard-stripe h-1.5 w-full" />
          <span className="mono-label absolute right-4 top-4 text-accent">Recommended</span>
        </>
      )}
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-lg font-semibold">{pkg.name}</h3>
        <p className="mt-4 font-mono text-2xl text-foreground">{pkg.price}</p>
        {pkg.meta && <p className="mono-label mt-2 text-muted-foreground">{pkg.meta}</p>}
        <p className="mt-5 text-sm text-muted-foreground">{pkg.summary}</p>

        <ul className="mt-7 space-y-3 border-t border-border/70 pt-6">
          {pkg.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-muted-foreground">
              <span className={`font-mono text-xs ${pkg.recommended ? "text-accent" : "text-primary"}`}>[x]</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Link
          to={ctaTo}
          className={`mt-8 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold transition-colors ${
            pkg.recommended
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "border border-border hover:border-primary hover:text-primary"
          }`}
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}