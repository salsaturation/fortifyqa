// Entry-level security check, shown on its own above the main packages.
export const BREACH_CHECK = {
  slug: "breach-check",
  name: "Breach Check",
  price: "£395",
  meta: "Report in 2 business days",
  summary: "Find out what your app is leaking before someone else does. Built for apps made quickly with AI tools.",
  includes: [
    "Automated scan of your repo and live site",
    "Hands-on check of the 10 leaks AI-built apps ship with most",
    "Plain-English report, ranked by risk, with the fix for each",
    "30-minute walkthrough call",
    "Free re-check within 30 days of the report",
  ],
  note: "We only test apps you own or are authorised to test, under a signed scope agreed before we start.",
};

export const PACKAGES = [
  {
    slug: "persona-test-map",
    name: "Persona Test Map",
    price: "£500–750",
    meta: "3–5 business days",
    summary: "The blueprint: who your real users are and the flows that must never break.",
    includes: [
      "60-minute discovery call",
      "3–5 user personas documented",
      "Critical flows and edge cases per persona",
      "Delivered as a Notion / Google Doc test plan",
    ],
  },
  {
    slug: "playwright-persona-suite",
    name: "Playwright Persona Suite",
    price: "£1,500–3,500",
    meta: "5–10 business days",
    summary: "A maintainable Playwright suite per persona, running in your CI.",
    includes: [
      "Playwright tests per persona with fixtures",
      "Role-based locators and web-first assertions",
      "GitHub Actions CI integration",
      "HTML test report dashboard",
      "Handover call + documentation",
    ],
  },
  {
    slug: "security-regression-bundle",
    name: "Security + Regression Bundle",
    price: "£2,500–5,000",
    meta: "8–10 business days",
    recommended: true,
    summary: "Everything in the suite, plus an attacker persona that stops security regressions.",
    includes: [
      "Everything in the Playwright Suite",
      "Sentinel scan of repo + live site",
      "Attacker-persona regression tests for top risks",
      "Prioritized remediation brief",
    ],
  },
];

export const RETAINER = {
  name: "Monthly Retainer",
  price: "£750–1,500/mo",
  summary: "Keep the suite green as your product ships.",
  includes: [
    "Maintain and extend the suite as features ship",
    "Monthly Sentinel re-scan",
    "Slack / email support for flaky tests",
  ],
};

export const STEPS = [
  { id: "01", title: "Discovery", body: "You share your app, your users, and your biggest fear. We define personas and critical flows, and agree a signed scope and written permission to test." },
  { id: "02", title: "Test Design", body: "We write the test plan and agree on scope and price before a line of code is written." },
  { id: "03", title: "Automation", body: "We build the Playwright suite, fixtures, and the CI pipeline that runs it on every push." },
  { id: "04", title: "Security Layer", body: "Optional Sentinel scan becomes attacker-persona tests that prevent the same gap returning." },
  { id: "05", title: "Handover", body: "You get the repo, the docs, and a walkthrough. The suite is yours to run." },
];

// Real, client-approved engagements only. Shape:
// { slug, name, metric, metricLabel, problem, solution, results, personas: [] }
export const CASE_STUDIES = [];

// Blog posts. Bodies are Markdown files in src/posts/, loaded by slug.
export const POSTS = [
  {
    slug: "ai-built-app-leaks",
    title: "10 ways AI-built apps leak user data, and how to check yours in an hour",
    tag: "Security",
    read: "9 min",
    date: "2026-11-19",
    excerpt: "Apps built fast with AI tools keep shipping with the same holes: keys in the browser, database rules switched off, and users who can read each other's data. Here's how to check yours.",
  },
  {
    slug: "breach-check-sample-report",
    title: "What a Breach Check looks like: a sample report",
    tag: "Process",
    read: "6 min",
    date: "2026-11-19",
    excerpt: "A walk through the report you get from a Breach Check, using a made-up app: how findings are ranked, what a fix looks like, and the test that stops it coming back.",
  },
];

export const FAQS = [
  { q: "Is it legal for you to test my app?", a: "Yes, with your written permission. Before any test we agree a signed scope: which app, which environments, which accounts and what's off limits. We only test apps you own or are authorised to have tested, and we never test third-party services your app relies on without their permission." },
  { q: "What happens when a test breaks?", a: "A red build blocks the merge, not the release. Each failure includes a Playwright trace — a step-by-step replay of what the test saw — so an engineer can reproduce it in minutes. If the product changed intentionally, we update the test; if it's a real regression, you fix the code before it ships." },
  { q: "How do you keep tests from going flaky?", a: "Web-first assertions auto-wait for the DOM to settle, so there are no sleep() calls. Role-based locators target what users actually see, so a class rename doesn't break the suite. And every test runs in CI across Chromium, Firefox, and WebKit with retries — a genuine flake surfaces and gets fixed, not ignored." },
  { q: "Who maintains the suite after handover?", a: "You can. The repo, fixtures, and docs are yours and structured to be readable after 400 tests. Most teams add the retainer so the suite keeps pace with new features and someone else owns the flaky tests — but there is no lock-in." },
  { q: "What does the Sentinel scan actually look for?", a: "It sweeps your repository and live site for the issues that bite early-stage SaaS: broken access control (IDOR), authentication and session flaws, exposed endpoints and secrets, and mass-assignment gaps. We prioritise the highest-risk findings and convert each into an attacker-persona Playwright test so the fix can't silently regress." },
  { q: "Is the security scan a one-time thing?", a: "In the Security Bundle, yes — one scan plus the attacker-persona tests and a remediation brief. The Monthly Retainer adds a recurring Sentinel re-scan so new code doesn't reopen old gaps. If you already run security tooling, we skip our scan and write tests straight from your findings." },
  { q: "How does the monthly retainer work?", a: "It's a rolling month-to-month plan, no long contract. Each month we extend the suite as features ship, re-run the Sentinel scan, and handle flaky-test reports over Slack or email. You can pause or cancel at any point with one month's notice — the suite stays yours and keeps running in your CI regardless." },
  { q: "Which tech stacks do you support?", a: "Anything that renders in a browser: Next.js, React, Vue, Svelte, Rails, Django, Laravel. Playwright drives the UI, so your backend is not a constraint." },
  { q: "How long does each package take?", a: "Persona Test Map: 3–5 business days. Playwright Suite: 5–10. Security Bundle: 8–10. One kickoff call, one handover call, async updates in between." },
];