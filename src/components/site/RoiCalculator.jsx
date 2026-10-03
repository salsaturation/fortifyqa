import React, { useMemo, useState } from "react";
import { Section, SectionHead } from "@/components/site/Primitives";
import { Clock, PiggyBank, Gauge } from "lucide-react";

// Playwright runs the same regression in ~15 minutes (0.25h)
const AUTOMATED_HOURS = 0.25;

function Stat({ icon: Icon, label, value, sub }) {
  return (
    <div className="border border-border bg-card/50 p-6">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mono-label mt-4 text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-3xl">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export default function RoiCalculator() {
  const [manualHours, setManualHours] = useState(16);
  const [releases, setReleases] = useState(2);
  const [rate, setRate] = useState(60);

  const { savedHours, savedMoney, cyclesPerYear } = useMemo(() => {
    const perRelease = Math.max(0, manualHours - AUTOMATED_HOURS);
    const monthlyHours = perRelease * releases;
    return {
      savedHours: monthlyHours,
      savedMoney: monthlyHours * rate,
      cyclesPerYear: monthlyHours * 12,
    };
  }, [manualHours, releases, rate]);

  return (
    <Section>
      <SectionHead
        label="ROI calculator"
        title="What is manual regression actually costing you?"
        body="Slide to match your team. We compare your manual cycle to a Playwright suite that runs the same coverage in about fifteen minutes, on every push."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="space-y-8">
          <div>
            <div className="flex items-baseline justify-between">
              <label className="mono-label text-muted-foreground">Manual hours per release cycle</label>
              <span className="font-mono text-lg text-primary">{manualHours}h</span>
            </div>
            <input
              type="range" min={1} max={80} value={manualHours}
              onChange={(e) => setManualHours(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label className="mono-label text-muted-foreground">Release cycles per month</label>
              <span className="font-mono text-lg text-primary">{releases}</span>
            </div>
            <input
              type="range" min={1} max={12} value={releases}
              onChange={(e) => setReleases(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label className="mono-label text-muted-foreground">Engineer hourly rate (£)</label>
              <span className="font-mono text-lg text-primary">£{rate}</span>
            </div>
            <input
              type="range" min={25} max={150} step={5} value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-4 w-full accent-primary"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Stat icon={Clock} label="Engineering hours saved / month" value={`${savedHours.toFixed(1)}h`} sub={`${cyclesPerYear.toFixed(0)}h freed per year`} />
          <Stat icon={PiggyBank} label="Cost recovered / month" value={`£${savedMoney.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} sub="at your current rate" />
          <div className="border border-primary/40 bg-primary/5 p-6 sm:col-span-2 lg:col-span-1">
            <Gauge className="h-5 w-5 text-primary" />
            <p className="mono-label mt-4 text-muted-foreground">Automation run time per release</p>
            <p className="mt-2 font-mono text-3xl text-primary">~15 min</p>
            <p className="mt-2 text-xs text-muted-foreground">A Playwright suite covers the same journeys your manual cycle does, on every push, across Chromium, Firefox and WebKit.</p>
          </div>
        </div>
      </div>

      <p className="mono-label mt-8 text-muted-foreground">
        Estimate only — real savings depend on your flows. Book a free audit to get numbers for your app.
      </p>
    </Section>
  );
}