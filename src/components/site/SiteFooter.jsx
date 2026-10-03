import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail } from "lucide-react";

const QUICK = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Process", "/process"],
  ["Case Studies", "/case-studies"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const SERVICES = [
  ["Persona Test Map", "/services#persona-test-map"],
  ["Playwright Suite", "/services#playwright-persona-suite"],
  ["Security Bundle", "/services#security-regression-bundle"],
  ["Monthly Retainer", "/services#retainer"],
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/70 px-6 py-16 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold">Fortify QA</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Persona-driven Playwright test automation for early-stage SaaS and indie products.
          </p>
          <p className="mono-label mt-6 text-muted-foreground">Status: accepting 2 projects / month</p>
        </div>

        <div>
          <p className="mono-label text-muted-foreground">Quick links</p>
          <ul className="mt-4 space-y-2.5">
            {QUICK.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label text-muted-foreground">Services</p>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mono-label text-muted-foreground">Contact</p>
          <a
            href="mailto:hello@fortifyqa.com"
            className="mt-4 inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-primary"
          >
            <Mail className="h-4 w-4" /> hello@fortifyqa.com
          </a>
          <p className="mt-4 text-sm text-muted-foreground">Async by default. Two calls per engagement: kickoff and handover.</p>
          <Link to="/book-audit" className="mono-label mt-6 inline-block text-primary">Book a QA audit →</Link>
        </div>
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-2 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="mono-label text-muted-foreground">© {new Date().getFullYear()} Fortify QA</p>
        <p className="mono-label text-muted-foreground">Playwright · GitHub Actions · Rafter</p>
      </div>
    </footer>
  );
}