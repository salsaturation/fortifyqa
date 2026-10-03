import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Check } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";

const NEEDS = [
  ["A staging URL", "Anywhere we can click through your product without touching production data."],
  ["Your riskiest flow", "The one you re-test by hand before every release."],
  ["Who your users are", "Roles, plans, or permissions — we'll shape personas from them."],
];

const NEXT = [
  "Pick a time that works for you.",
  "We review your app before the call.",
  "You get a short written audit recommendation within 48 hours.",
];

const SLOTS = [
  "Mon 09:00–11:00 UK",
  "Tue 14:00–17:00 UK",
  "Wed 09:00–12:00 UK",
  "Thu 15:00–18:00 UK",
  "Fri 10:00–13:00 UK",
];

const inputClass = "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

export default function BookAudit() {
  const [form, setForm] = useState({ name: "", email: "", app_url: "", preferred_slot: SLOTS[0], riskiest_flow: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    await base44.entities.AuditRequest.create(form);
    setBusy(false);
    setSent(true);
  };

  return (
    <div>
      <PageHero
        label="Audit command"
        title="Book a free 20-minute QA Audit scoping call."
        subhead="We'll identify your riskiest user journeys and recommend the right package. No commitment."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="mono-label text-primary">What we need from you</p>
            <ul className="mt-6 space-y-6">
              {NEEDS.map(([t, b]) => (
                <li key={t} className="border-l border-border pl-5">
                  <p className="text-sm font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b}</p>
                </li>
              ))}
            </ul>

            <p className="mono-label mt-12 text-primary">What happens next</p>
            <ol className="mt-6 space-y-4">
              {NEXT.map((n, i) => (
                <li key={n} className="flex gap-4 text-sm text-muted-foreground">
                  <span className="font-mono text-xs text-foreground">0{i + 1}</span>
                  {n}
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-border bg-card/50">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="mono-label text-muted-foreground">booking · fortify-qa</span>
              <span className="mono-label text-primary">20 min · free</span>
            </div>
            <div className="p-8">
              {sent ? (
                <div>
                  <p className="inline-flex items-center gap-2 text-primary">
                    <Check className="h-4 w-4" /> Request received.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    We'll confirm a slot in your preferred window by email, then send the written audit
                    recommendation within 48 hours of the call.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mono-label text-muted-foreground">Name</span>
                      <input required value={form.name} onChange={set("name")} className={`mt-2 ${inputClass}`} />
                    </label>
                    <label className="block">
                      <span className="mono-label text-muted-foreground">Email</span>
                      <input required type="email" value={form.email} onChange={set("email")} className={`mt-2 ${inputClass}`} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mono-label text-muted-foreground">App / staging URL</span>
                    <input value={form.app_url} onChange={set("app_url")} placeholder="https://" className={`mt-2 ${inputClass}`} />
                  </label>
                  <label className="block">
                    <span className="mono-label text-muted-foreground">Preferred slot</span>
                    <select value={form.preferred_slot} onChange={set("preferred_slot")} className={`mt-2 ${inputClass}`}>
                      {SLOTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mono-label text-muted-foreground">Riskiest user flow</span>
                    <textarea rows={3} value={form.riskiest_flow} onChange={set("riskiest_flow")} className={`mt-2 ${inputClass}`} />
                  </label>
                  <button
                    type="submit"
                    disabled={busy}
                    className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    {busy ? "Booking…" : "Request this slot"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}