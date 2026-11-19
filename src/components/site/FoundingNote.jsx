import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Shown where client proof (logos, quotes, numbers, case studies) will go once there are real, approved examples.
export default function FoundingNote({ children, className = "" }) {
  return (
    <div className={`border border-dashed border-border bg-card/30 p-8 md:p-10 ${className}`}>
      <p className="max-w-2xl leading-relaxed text-muted-foreground">{children}</p>
      <Link to="/book-audit" className="mono-label mt-6 inline-flex items-center gap-2 text-primary">
        Become a founding client <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
