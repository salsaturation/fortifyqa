import React, { useState, useEffect } from "react";
import PageHero from "@/components/site/PageHero";
import { Section, MonoTag } from "@/components/site/Primitives";
import { PrimaryCTA, SecondaryCTA } from "@/components/site/CTAButtons";
import { Plus, Trash2, Save, RotateCcw, AlertTriangle } from "lucide-react";

const STORAGE_KEY = "fortifyqa.persona-planner.v1";

const EMPTY = {
  product: { name: "", description: "", revenueModel: "", currentApproach: "" },
  personas: [],
};

function usePlanner() {
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : EMPTY;
    } catch {
      return EMPTY;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, [data]);

  const reset = () => {
    if (confirm("Clear the whole planner? This cannot be undone.")) setData(EMPTY);
  };

  return [data, setData, reset];
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mono-label text-muted-foreground">{label}</span>
      {hint && <span className="ml-2 text-xs text-muted-foreground/70">— {hint}</span>}
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputCls =
  "w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

export default function PersonaTestPlanner() {
  const [data, setData, reset] = usePlanner();
  const setProduct = (key, value) => setData((d) => ({ ...d, product: { ...d.product, [key]: value } }));

  const addPersona = () =>
    setData((d) => ({
      ...d,
      personas: [
        ...d.personas,
        { id: uid(), name: "", role: "", goal: "", paysFor: "", flows: [{ id: uid(), name: "", riskiest: false, edgeCases: [""] }] },
      ],
    }));

  const updatePersona = (id, key, value) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
    }));

  const removePersona = (id) =>
    setData((d) => ({ ...d, personas: d.personas.filter((p) => p.id !== id) }));

  const addFlow = (pid) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid ? { ...p, flows: [...p.flows, { id: uid(), name: "", riskiest: false, edgeCases: [""] }] } : p
      ),
    }));

  const updateFlow = (pid, fid, key, value) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid
          ? { ...p, flows: p.flows.map((f) => (f.id === fid ? { ...f, [key]: value } : f)) }
          : p
      ),
    }));

  const removeFlow = (pid, fid) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid ? { ...p, flows: p.flows.filter((f) => f.id !== fid) } : p
      ),
    }));

  const toggleRiskiest = (pid, fid) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid
          ? { ...p, flows: p.flows.map((f) => (f.id === fid ? { ...f, riskiest: !f.riskiest } : f)) }
          : p
      ),
    }));

  const setEdgeCase = (pid, fid, idx, value) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid
          ? {
              ...p,
              flows: p.flows.map((f) =>
                f.id === fid
                  ? { ...f, edgeCases: f.edgeCases.map((ec, i) => (i === idx ? value : ec)) }
                  : f
              ),
            }
          : p
      ),
    }));

  const addEdgeCase = (pid, fid) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid
          ? { ...p, flows: p.flows.map((f) => (f.id === fid ? { ...f, edgeCases: [...f.edgeCases, ""] } : f)) }
          : p
      ),
    }));

  const removeEdgeCase = (pid, fid, idx) =>
    setData((d) => ({
      ...d,
      personas: d.personas.map((p) =>
        p.id === pid
          ? {
              ...p,
              flows: p.flows.map((f) =>
                f.id === fid ? { ...f, edgeCases: f.edgeCases.filter((_, i) => i !== idx) } : f
              ),
            }
          : p
      ),
    }));

  const riskiest = data.personas.flatMap((p) =>
    p.flows.filter((f) => f.riskiest && f.name.trim()).map((f) => ({ persona: p.name, flow: f.name }))
  );

  const totalFlows = data.personas.reduce((n, p) => n + p.flows.filter((f) => f.name.trim()).length, 0);

  return (
    <div>
      <PageHero
        label="Free resource"
        title="The Persona Test Planner."
        subhead="Map your real users, the flows that earn revenue, and the edge cases worth automating first. Fill it in — your work saves to this browser automatically."
      >
        <div className="flex flex-wrap items-center gap-4">
          <PrimaryCTA to="/book-audit">Book a QA Audit</PrimaryCTA>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary">
            <Save className="h-4 w-4" /> Print / Save as PDF
          </button>
          <button onClick={reset} className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground hover:text-destructive">
            <RotateCcw className="h-4 w-4" /> Clear all
          </button>
        </div>
      </PageHero>

      {/* Section 1 — Product context */}
      <Section>
        <MonoTag tone="green">01 · Product context</MonoTag>
        <h2 className="mt-4 text-2xl font-semibold">What are you testing?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Field label="Product name">
            <input className={inputCls} value={data.product.name} onChange={(e) => setProduct("name", e.target.value)} placeholder="e.g. Acme Billing" />
          </Field>
          <Field label="Who pays?" hint="revenue model">
            <input className={inputCls} value={data.product.revenueModel} onChange={(e) => setProduct("revenueModel", e.target.value)} placeholder="e.g. SaaS subscription, per-seat" />
          </Field>
          <Field label="One-line description">
            <input className={inputCls} value={data.product.description} onChange={(e) => setProduct("description", e.target.value)} placeholder="What does the product do?" />
          </Field>
          <Field label="How do you test today?">
            <input className={inputCls} value={data.product.currentApproach} onChange={(e) => setProduct("currentApproach", e.target.value)} placeholder="e.g. Manual checklist before each release" />
          </Field>
        </div>
      </Section>

      {/* Section 2 — Personas */}
      <Section>
        <div className="flex items-center justify-between gap-4">
          <div>
            <MonoTag tone="green">02 · Personas</MonoTag>
            <h2 className="mt-4 text-2xl font-semibold">Who uses it?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Add every distinct user type — including the attacker.</p>
          </div>
          <button onClick={addPersona} className="inline-flex shrink-0 items-center gap-2 border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">
            <Plus className="h-4 w-4" /> Add persona
          </button>
        </div>

        <div className="mt-10 space-y-6">
          {data.personas.length === 0 && (
            <div className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No personas yet. Add your first — start with whoever pays you.
            </div>
          )}

          {data.personas.map((p, i) => (
            <div key={p.id} className="border border-border bg-card/40">
              <div className="flex items-center justify-between border-b border-border bg-card/30 px-5 py-3">
                <span className="mono-label text-primary">Persona {String(i + 1).padStart(2, "0")}</span>
                <button onClick={() => removePersona(p.id)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>

              <div className="grid gap-5 p-5 md:grid-cols-2">
                <Field label="Name"><input className={inputCls} value={p.name} onChange={(e) => updatePersona(p.id, "name", e.target.value)} placeholder="e.g. Buyer" /></Field>
                <Field label="Role / who they are"><input className={inputCls} value={p.role} onChange={(e) => updatePersona(p.id, "role", e.target.value)} placeholder="e.g. Procurement lead" /></Field>
                <Field label="Primary goal"><input className={inputCls} value={p.goal} onChange={(e) => updatePersona(p.id, "goal", e.target.value)} placeholder="e.g. Complete checkout in under 2 minutes" /></Field>
                <Field label="What they pay for" hint="revenue-critical action"><input className={inputCls} value={p.paysFor} onChange={(e) => updatePersona(p.id, "paysFor", e.target.value)} placeholder="e.g. A successful subscription purchase" /></Field>
              </div>

              {/* Flows */}
              <div className="border-t border-border p-5">
                <p className="mono-label text-muted-foreground">Revenue-critical flows & edge cases</p>
                <div className="mt-4 space-y-4">
                  {p.flows.map((f, fi) => (
                    <div key={f.id} className="border border-border/70 bg-background/50 p-4">
                      <div className="flex items-center gap-3">
                        <input className={inputCls} value={f.name} onChange={(e) => updateFlow(p.id, f.id, "name", e.target.value)} placeholder={`Flow ${fi + 1}: e.g. Complete checkout`} />
                        <button onClick={() => toggleRiskiest(p.id, f.id)} className={`shrink-0 border px-3 py-2.5 text-xs font-semibold ${f.riskiest ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent hover:text-accent"}`}>
                          {f.riskiest ? "★ Riskiest" : "Mark riskiest"}
                        </button>
                        <button onClick={() => removeFlow(p.id, f.id)} className="shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                      <div className="mt-3 space-y-2">
                        {f.edgeCases.map((ec, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="mono-label text-muted-foreground/60">↳</span>
                            <input className={`${inputCls} py-2`} value={ec} onChange={(e) => setEdgeCase(p.id, f.id, idx, e.target.value)} placeholder="Edge case: e.g. Promo code with expired card" />
                            {f.edgeCases.length > 1 && (
                              <button onClick={() => removeEdgeCase(p.id, f.id, idx)} className="shrink-0 text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                            )}
                          </div>
                        ))}
                        <button onClick={() => addEdgeCase(p.id, f.id)} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary">
                          <Plus className="h-3 w-3" /> Add edge case
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => addFlow(p.id)} className="mt-4 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
                  <Plus className="h-4 w-4" /> Add flow
                </button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Section 3 — Priority */}
      <Section>
        <MonoTag tone="amber">03 · Automate first</MonoTag>
        <h2 className="mt-4 text-2xl font-semibold">What to automate first.</h2>
        <p className="mt-2 text-sm text-muted-foreground">The flows you flagged as riskiest. These are your Playwright suite's starting point — the journeys that, if broken, cost you revenue.</p>

        {riskiest.length === 0 ? (
          <div className="mt-8 flex items-start gap-3 border border-accent/30 bg-accent/5 p-5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p className="text-sm text-muted-foreground">No flows flagged yet. Mark the riskiest flow under each persona — the ones a regression in would lose you money or customers.</p>
          </div>
        ) : (
          <ol className="mt-8 space-y-3">
            {riskiest.map((r, i) => (
              <li key={i} className="flex items-center gap-4 border border-border bg-card/40 px-5 py-4">
                <span className="font-mono text-lg text-primary">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">
                  <span className="text-muted-foreground">{r.persona || "Unnamed persona"} →</span>{" "}
                  <span className="font-medium text-foreground">{r.flow}</span>
                </span>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <PrimaryCTA to="/book-audit">Book a QA Audit</PrimaryCTA>
          <SecondaryCTA to="/pricing">View Pricing</SecondaryCTA>
        </div>
        <p className="mono-label mt-8 text-muted-foreground">
          {data.personas.length} persona{data.personas.length === 1 ? "" : "s"} · {totalFlows} flow{totalFlows === 1 ? "" : "s"} mapped
        </p>
      </Section>
    </div>
  );
}