import React from "react";
import PageHero from "@/components/site/PageHero";
import { Section } from "@/components/site/Primitives";

const CONTACT = "hello@fortifyqa.com";
const h2 = "pt-4 text-xl font-semibold text-foreground";

export default function Privacy() {
  return (
    <div>
      <PageHero label="Legal" title="Privacy policy." subhead="What this site collects, why, and how long we keep it." />
      <Section>
        <div className="max-w-3xl space-y-5 leading-relaxed text-muted-foreground">
          <p className="mono-label">Last updated: 19 November 2026</p>
          <p>
            This covers fortifyqa.com. Questions or requests:{" "}
            <a className="text-primary hover:underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>.
          </p>

          <h2 className={h2}>What we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="text-foreground">Contact form:</strong> your name, email, and anything you add about your company, tech stack, the package you're interested in and what you're worried about.</li>
            <li><strong className="text-foreground">Audit booking:</strong> your name, email, app URL, preferred time slot and your riskiest flow.</li>
            <li><strong className="text-foreground">Checklist sign-up:</strong> your email and which page you signed up from.</li>
            <li><strong className="text-foreground">Abuse protection:</strong> to rate-limit the forms we keep a salted one-way hash of your IP address with recent request times, never the address itself.</li>
            <li><strong className="text-foreground">Persona test planner:</strong> what you type is saved in your own browser's local storage only. It is never sent to us.</li>
          </ul>
          <p>No analytics or advertising trackers, and no cookies.</p>

          <h2 className={h2}>How we use it</h2>
          <p>To reply to you, scope and deliver the work you asked about, and send the resource you requested. We don't sell your data or add you to marketing lists you didn't ask for.</p>

          <h2 className={h2}>Who processes it</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li><strong className="text-foreground">Our web host</strong> stores form submissions and delivers the notification email to our inbox.</li>
            <li><strong className="text-foreground">Google Fonts</strong> serves the site's fonts, so Google sees your IP address when a page loads.</li>
          </ul>

          <h2 className={h2}>How long we keep it</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Enquiries, bookings and sign-ups: for as long as we need to respond and follow up, and no more than 2 years after our last contact. If you become a client, contract and accounting records are kept as the law requires.</li>
            <li>Rate-limit records: about a day.</li>
          </ul>

          <h2 className={h2}>Why we're allowed to</h2>
          <p>We process enquiries to take steps you asked for before a possible contract, and checklist sign-ups with your consent. Rate limiting is in our legitimate interest in keeping the forms secure.</p>

          <h2 className={h2}>Your rights</h2>
          <p>
            Under UK GDPR you can ask to see, correct or delete your data, object to how we use it, or withdraw consent at any time. Email{" "}
            <a className="text-primary hover:underline" href={`mailto:${CONTACT}`}>{CONTACT}</a>. You can also complain to the Information Commissioner's Office (ico.org.uk).
          </p>
        </div>
      </Section>
    </div>
  );
}
