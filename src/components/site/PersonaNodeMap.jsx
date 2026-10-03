import React, { useState } from "react";

const PERSONAS = [
  { id: "admin", name: "The Admin", spec: "test('admin suspends a member', async ({ adminPage }) => {", line: "  await adminPage.getByRole('button', { name: 'Suspend' }).click();" },
  { id: "buyer", name: "The Buyer", spec: "test('buyer completes checkout', async ({ buyerPage }) => {", line: "  await expect(buyerPage.getByText('Payment received')).toBeVisible();" },
  { id: "power", name: "The Power User", spec: "test('bulk upload 500 rows', async ({ page }) => {", line: "  await page.getByLabel('CSV file').setInputFiles('fixtures/large.csv');" },
  { id: "attacker", name: "The Attacker", spec: "test('cannot read another org invoice', async ({ request }) => {", line: "  expect((await request.get('/api/invoices/999')).status()).toBe(403);", danger: true },
];

export default function PersonaNodeMap() {
  const [active, setActive] = useState(PERSONAS[1]);

  return (
    <div className="border border-border bg-card/50">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <span className="mono-label text-muted-foreground">persona-map.spec.ts</span>
        <span className="mono-label text-primary">status: passing</span>
      </div>

      <div className="grid sm:grid-cols-[1fr_1.4fr]">
        <ul className="border-b border-border sm:border-b-0 sm:border-r">
          {PERSONAS.map((p) => {
            const on = p.id === active.id;
            return (
              <li key={p.id}>
                <button
                  onMouseEnter={() => setActive(p)}
                  onFocus={() => setActive(p)}
                  onClick={() => setActive(p)}
                  className={`flex w-full items-center gap-3 border-b border-border/60 px-4 py-4 text-left text-sm transition-colors ${
                    on ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 ${
                      on ? (p.danger ? "bg-accent" : "bg-primary") : "bg-border"
                    }`}
                  />
                  <span className="flex-1">{p.name}</span>
                  <span className="mono-label">{on ? "●" : ""}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="bg-background/70 p-5 font-mono text-[12px] leading-relaxed">
          <p className={active.danger ? "text-accent" : "text-primary"}>{active.spec}</p>
          <p className="text-muted-foreground">{active.line}</p>
          <p className={active.danger ? "text-accent" : "text-primary"}>{"});"}</p>
          <div className="mt-6 space-y-1 text-muted-foreground">
            <p>› npx playwright test --project=chromium</p>
            <p className="text-foreground">1 passed (4.2s)</p>
          </div>
        </div>
      </div>
    </div>
  );
}