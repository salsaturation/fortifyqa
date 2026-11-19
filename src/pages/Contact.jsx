import React, { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { submitForm } from "@/api/forms";
import { Check, Mail } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";
import LeadMagnet from "@/components/site/LeadMagnet";
import Honeypot from "@/components/site/Honeypot";

const PACKAGE_OPTIONS = ["Not sure", "Breach Check", "Persona Test Map", "Playwright Suite", "Security Bundle", "Retainer"];

// ?package=<slug> links (e.g. from the Breach Check card) preselect the package.
const PACKAGE_FROM_SLUG = {
  "breach-check": "Breach Check",
  "persona-test-map": "Persona Test Map",
  "playwright-persona-suite": "Playwright Suite",
  "security-regression-bundle": "Security Bundle",
  retainer: "Retainer",
};

const inputClass =
  "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

export default function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    tech_stack: "",
    worry: "",
    package_interest: PACKAGE_FROM_SLUG[params.get("package")] || "Not sure",
  });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const startedAt = useRef(Date.now());

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await submitForm("contact", form, e.currentTarget, startedAt.current);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHero
        label="Contact"
        title="Let's talk about your riskiest user flows."
        subhead="Tell us what you're shipping and what keeps breaking. We reply within one business day."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="border border-border bg-card/50 p-8">
            {sent ? (
              <div>
                <p className="inline-flex items-center gap-2 text-primary">
                  <Check className="h-4 w-4" /> Message received.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  We'll come back to you within one business day with a first read on your riskiest flows.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="relative space-y-5">
                <Honeypot />
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mono-label text-muted-foreground">Name</span>
                    <input required maxLength={120} value={form.name} onChange={set("name")} className={`mt-2 ${inputClass}`} />
                  </label>
                  <label className="block">
                    <span className="mono-label text-muted-foreground">Email</span>
                    <input required type="email" maxLength={254} value={form.email} onChange={set("email")} className={`mt-2 ${inputClass}`} />
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mono-label text-muted-foreground">Company / Product</span>
                    <input maxLength={160} value={form.company} onChange={set("company")} className={`mt-2 ${inputClass}`} />
                  </label>
                  <label className="block">
                    <span className="mono-label text-muted-foreground">Tech stack</span>
                    <input
                      placeholder="Next.js, Rails, Vue…"
                      maxLength={200}
                      value={form.tech_stack}
                      onChange={set("tech_stack")}
                      className={`mt-2 ${inputClass}`}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="mono-label text-muted-foreground">Biggest QA worry</span>
                  <textarea rows={4} maxLength={4000} value={form.worry} onChange={set("worry")} className={`mt-2 ${inputClass}`} />
                </label>
                <label className="block">
                  <span className="mono-label text-muted-foreground">Package interest</span>
                  <select value={form.package_interest} onChange={set("package_interest")} className={`mt-2 ${inputClass}`}>
                    {PACKAGE_OPTIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </label>
                <button
                  type="submit"
                  disabled={busy}
                  className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                >
                  {busy ? "Sending…" : "Send message"}
                </button>
                {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="border border-border bg-card/50 p-6">
              <p className="mono-label text-primary">Prefer to book directly?</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Grab a free 20-minute scoping call instead of writing a brief.
              </p>
              <Link to="/book-audit" className="mono-label mt-4 inline-block text-primary">Book a QA Audit →</Link>
            </div>
            <div className="border border-border bg-card/50 p-6">
              <p className="mono-label text-muted-foreground">Email</p>
              <a href="mailto:hello@fortifyqa.com" className="mt-3 inline-flex items-center gap-2 text-sm hover:text-primary">
                <Mail className="h-4 w-4" /> hello@fortifyqa.com
              </a>
            </div>
            <LeadMagnet source="contact" compact />
          </aside>
        </div>
      </Section>
    </div>
  );
}