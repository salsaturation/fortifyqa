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
  { id: "01", title: "Discovery", body: "You share your app, your users, and your biggest fear. We define personas and critical flows." },
  { id: "02", title: "Test Design", body: "We write the test plan and agree on scope and price before a line of code is written." },
  { id: "03", title: "Automation", body: "We build the Playwright suite, fixtures, and the CI pipeline that runs it on every push." },
  { id: "04", title: "Security Layer", body: "Optional Sentinel scan becomes attacker-persona tests that prevent the same gap returning." },
  { id: "05", title: "Handover", body: "You get the repo, the docs, and a walkthrough. The suite is yours to run." },
];

export const CASE_STUDIES = [
  {
    slug: "saas-billing-platform",
    name: "SaaS Billing Platform",
    metric: "3 days → 15 minutes",
    metricLabel: "Regression cycle",
    problem: "Manual checkout regression took 2 days every sprint, and releases slipped because of it.",
    solution: "Playwright persona suite for buyer, admin, and refund-user flows, wired into GitHub Actions.",
    results: "Regression time reduced to 15 minutes; caught 2 checkout bugs before release.",
    personas: ["Buyer", "Admin", "Refund user"],
  },
  {
    slug: "healthcare-booking-app",
    name: "Healthcare Booking App",
    metric: "3 auth fixes",
    metricLabel: "Vulnerabilities closed",
    problem: "No accessibility or security coverage before a compliance audit with a hard deadline.",
    solution: "Screen-reader persona tests plus the Sentinel security bundle and attacker-persona regressions.",
    results: "Passed the accessibility audit first time; fixed 3 auth vulnerabilities pre-audit.",
    personas: ["Patient", "Clinician", "Screen-reader user", "Attacker"],
  },
  {
    slug: "ecommerce-marketplace",
    name: "E-commerce Marketplace",
    metric: "-40% churn",
    metricLabel: "From upload errors",
    problem: "Sellers kept hitting broken bulk-upload flows that no test ever touched.",
    solution: "Power-user persona tests for bulk actions and edge-case file uploads across browsers.",
    results: "Seller churn caused by upload errors dropped 40% in one quarter.",
    personas: ["Power seller", "New seller", "Support agent"],
  },
];

export const POSTS = [
  { slug: "five-personas", title: "The 5 Personas Every SaaS Should Test Before Launch", tag: "Personas", read: "7 min", excerpt: "Most teams test the happy path of one user. Here are the five personas that actually generate revenue — and the flows each one breaks." },
  { slug: "structure-by-persona", title: "How to Structure Playwright Tests by User Persona", tag: "Playwright", read: "9 min", excerpt: "Fixtures per persona, role-based locators, and a folder layout that still makes sense after 400 tests." },
  { slug: "attacker-persona", title: "Adding a Security Attacker Persona to Your Playwright Suite", tag: "Security", read: "8 min", excerpt: "Turn scan findings into permanent regression tests: IDOR, broken auth, and mass assignment, in Playwright." },
  { slug: "sentinel-review", title: "Sentinel Review: Affordable Security Scanning for Indie Teams", tag: "Tooling", read: "6 min", excerpt: "What a repo-plus-live-site scan actually catches, what it misses, and where a human still has to look." },
  { slug: "manual-to-ci", title: "From Manual Regression to CI in 10 Days", tag: "Process", read: "10 min", excerpt: "A day-by-day account of replacing a two-day manual checklist with a 15-minute pipeline." },
];

export const FAQS = [
  { q: "What happens when a test breaks?", a: "A red build blocks the merge, not the release. Each failure includes a Playwright trace — a step-by-step replay of what the test saw — so an engineer can reproduce it in minutes. If the product changed intentionally, we update the test; if it's a real regression, you fix the code before it ships." },
  { q: "How do you keep tests from going flaky?", a: "Web-first assertions auto-wait for the DOM to settle, so there are no sleep() calls. Role-based locators target what users actually see, so a class rename doesn't break the suite. And every test runs in CI across Chromium, Firefox, and WebKit with retries — a genuine flake surfaces and gets fixed, not ignored." },
  { q: "Who maintains the suite after handover?", a: "You can. The repo, fixtures, and docs are yours and structured to be readable after 400 tests. Most teams add the retainer so the suite keeps pace with new features and someone else owns the flaky tests — but there is no lock-in." },
  { q: "What does the Sentinel scan actually look for?", a: "It sweeps your repository and live site for the issues that bite early-stage SaaS: broken access control (IDOR), authentication and session flaws, exposed endpoints and secrets, and mass-assignment gaps. We prioritise the highest-risk findings and convert each into an attacker-persona Playwright test so the fix can't silently regress." },
  { q: "Is the security scan a one-time thing?", a: "In the Security Bundle, yes — one scan plus the attacker-persona tests and a remediation brief. The Monthly Retainer adds a recurring Sentinel re-scan so new code doesn't reopen old gaps. If you already run security tooling, we skip our scan and write tests straight from your findings." },
  { q: "How does the monthly retainer work?", a: "It's a rolling month-to-month plan, no long contract. Each month we extend the suite as features ship, re-run the Sentinel scan, and handle flaky-test reports over Slack or email. You can pause or cancel at any point with one month's notice — the suite stays yours and keeps running in your CI regardless." },
  { q: "Which tech stacks do you support?", a: "Anything that renders in a browser: Next.js, React, Vue, Svelte, Rails, Django, Laravel. Playwright drives the UI, so your backend is not a constraint." },
  { q: "How long does each package take?", a: "Persona Test Map: 3–5 business days. Playwright Suite: 5–10. Security Bundle: 8–10. One kickoff call, one handover call, async updates in between." },
];