import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShieldCheck } from "lucide-react";
import { PrimaryCTA, SecondaryCTA } from "./CTAButtons";

const LINKS = [
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight">Fortify QA</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-foreground ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <SecondaryCTA className="px-4 py-2 text-xs" />
          <PrimaryCTA className="px-4 py-2 text-xs" />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          className="border border-border p-2 lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/70 px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
                {l.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-2">
              <PrimaryCTA className="justify-center" />
              <SecondaryCTA className="justify-center" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}