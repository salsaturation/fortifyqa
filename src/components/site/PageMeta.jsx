import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { POSTS } from "@/lib/content";

const SITE = "https://fortifyqa.com";
const DEFAULT_DESC =
  "Built your app fast with AI tools? Fortify QA finds what it's leaking, helps you fix it, and locks each fix in with Playwright tests in your CI. Breach Check from £395.";

// Per-route title + description; the canonical URL follows the path so each page indexes on its own.
const PAGES = {
  "/": ["Fortify QA — Security checks for AI-built apps", DEFAULT_DESC],
  "/services": ["Services — Fortify QA", "Breach Check, Persona Test Map, Playwright Persona Suite, Security + Regression Bundle and monthly retainers. Fixed scope, fixed price."],
  "/process": ["Process — Fortify QA", "How an engagement runs: discovery call, persona mapping, Playwright suite in your CI, handover."],
  "/case-studies": ["Case studies — Fortify QA", "After-action reports from Fortify QA engagements: regression time before and after, and what the suite caught."],
  "/pricing": ["Pricing — Fortify QA", "Fixed-price security checks and Playwright packages for SaaS teams. Breach Check £395."],
  "/blog": ["Blog — Fortify QA", "Practical security checks for AI-built apps, and the Playwright tests that keep them fixed."],
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
    const post = POSTS.find((p) => `/blog/${p.slug}` === path);
    const known = PAGES[path] || (post && [`${post.title} — Fortify QA`, post.excerpt]);
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
