import React, { useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Download, Check, ArrowRight } from "lucide-react";

export default function LeadMagnet({ source = "home", compact = false }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    await base44.entities.LeadCapture.create({ email, source, asset: "The Persona Test Planner" });
    setBusy(false);
    setDone(true);
  };

  return (
    <div className={`border border-border bg-card/60 ${compact ? "p-6" : "p-8"}`}>
      <p className="mono-label text-accent">Free resource</p>
      <h3 className="mt-3 text-xl font-semibold">The Persona Test Planner</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        A template for mapping your own personas, their revenue-critical flows, and the edge cases worth automating first.
      </p>
      {done ? (
        <div className="mt-6 space-y-4">
          <p className="inline-flex items-center gap-2 text-sm text-primary">
            <Check className="h-4 w-4" /> You're in — the planner is open below.
          </p>
          <Link to="/persona-test-planner" className="inline-flex items-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
            Open the planner <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            <Download className="h-4 w-4" /> {busy ? "Sending…" : "Get the planner"}
          </button>
        </form>
      )}
    </div>
  );
}