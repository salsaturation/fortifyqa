import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://fortifyqa.com";
const DEFAULT_DESC =
  "Fortify QA maps your real user personas, automates their critical flows with Playwright in your CI, and adds attacker-persona security regression tests. Fixed scope, fixed price.";

// Per-route title + description; the canonical URL follows the path so each page indexes on its own.
const PAGES = {
  "/": ["Fortify QA — Persona-driven Playwright testing for SaaS teams", DEFAULT_DESC],
  "/services": ["Services — Fortify QA", "Persona Test Map, Playwright Persona Suite, Security + Regression Bundle and monthly retainers. Fixed scope, fixed price."],
  "/process": ["Process — Fortify QA", "How an engagement runs: discovery call, persona mapping, Playwright suite in your CI, handover."],
  "/case-studies": ["Case studies — Fortify QA", "After-action reports from Fortify QA engagements: regression time before and after, and what the suite caught."],
  "/pricing": ["Pricing — Fortify QA", "Fixed-price Playwright and security regression packages for SaaS teams, from £500."],
  "/blog": ["Blog — Fortify QA", "Practical Playwright, persona-driven testing and security automation."],
  "/about": ["About — Fortify QA", "Why Fortify QA tests software the way your real users, and attackers, use it."],
  "/contact": ["Contact — Fortify QA", "Tell us what you're shipping and what keeps breaking. We reply within one business day."],
  "/book-audit": ["Book a QA audit — Fortify QA", "Book a free 20-minute call to scope a QA audit of your app's riskiest flows."],
  "/persona-test-planner": ["Persona test planner — Fortify QA", "A free planner for mapping user personas to the flows that must never break."],
  "/privacy": ["Privacy policy — Fortify QA", "What Fortify QA collects through this site, why, and how long we keep it."],
};

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export default function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";
    const known = PAGES[path];
    const [title, desc] = known || ["Page not found — Fortify QA", DEFAULT_DESC];
    document.title = title;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('link[rel="canonical"]', "href", SITE + (path === "/" ? "/" : path));
    setMeta('meta[property="og:url"]', "content", SITE + (path === "/" ? "/" : path));
    let robots = document.head.querySelector('meta[name="robots"]');
    if (!known) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex");
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);
  return null;
}
