People reasonably want to know what they're buying before they book a security check. So here's what a Breach Check report looks like, from first email to re-check.

> **This is a sample.** "Tasklet" is a made-up app, and the findings below are examples written to show the format of the report. They are not results from a real client.

## The app

Tasklet is a small project-management tool for freelancers: projects, tasks, invoices and file uploads. The founder built it in a few weeks with an AI coding assistant, on Next.js and Supabase, with an AI "summarise this project" feature. It has about 300 users and is starting to take payments.

## Step 1: Scope and permission

Before anything is tested, we agree in writing:

- **What's in scope:** the production web app and its API, the GitHub repository, and a staging copy if there is one.
- **Test accounts:** two ordinary users and one admin, created by the founder. We never use real customers' accounts.
- **What's off limits:** load testing, social engineering, and third-party services such as Stripe and Supabase's own systems.
- **When:** a testing window, and a contact in case we find something urgent.

Nothing starts until this is signed.

## Step 2: Scan, then test by hand

An automated scan of the repo and live site covers the basics: exposed keys and files, missing security headers and known-vulnerable packages. Then we work through the [10 most common leaks in AI-built apps](/blog/ai-built-app-leaks) by hand, as each test user, the way an attacker would.

## Step 3: The report

Findings are ranked by what could actually happen to your users, not by how clever the bug is. Here's the summary page of the sample report:

1. **Critical:** Supabase `service_role` key in the browser code. *Fix: about 1 hour.*
2. **High:** any user can open any invoice by changing its ID. *Fix: about 2 hours.*
3. **High:** the AI summary can be asked about other users' projects. *Fix: about half a day.*
4. **Medium:** the profile update accepts `plan: "pro"`. *Fix: about 1 hour.*
5. **Medium:** no rate limit on password reset. *Fix: about 1 hour.*
6. **Low:** missing security headers. *Fix: about 15 minutes.*

Each finding then gets its own page in plain English: what's wrong, what someone could do with it, how we found it, and how to fix it. Here's finding 2:

### Finding 2: Any user can open any invoice by changing its ID

**What's wrong.** `GET /api/invoices/:id` checks that you're logged in, but not that the invoice is yours.

**What someone could do.** Any signed-up user could download every customer's invoices, with names, addresses and amounts, by counting up from their own invoice number.

**How we found it.** Logged in as test user Alice, we requested an invoice belonging to test user Bob. The API returned it.

**How to fix it.** Look up the invoice with *both* its ID and the current user's ID, and return 404 if there's no match. Also turn on Row Level Security for the `invoices` table, so the database refuses even if the code forgets.

## Step 4: Lock the fix in

A fix is only safe until the next change undoes it. So each finding comes with the test that proves it's fixed. For finding 2, it's a short Playwright test that runs in CI on every pull request:

```ts
import { test, expect } from "@playwright/test";

test("a user can't read someone else's invoice", async ({ playwright }) => {
  const alice = await playwright.request.newContext({
    baseURL: process.env.BASE_URL,
    storageState: "auth/alice.json", // Alice's logged-in session
  });

  const res = await alice.get(`/api/invoices/${process.env.BOB_INVOICE_ID}`);

  expect([403, 404]).toContain(res.status());
  await alice.dispose();
});
```

If someone, or some AI, rewrites the invoices API next month and drops the ownership check, this test fails and the change can't be merged.

Writing these tests is part of our Security + Regression Bundle. With a Breach Check you get the findings and the fixes, and you can add the tests later.

## Step 5: Walkthrough and re-check

We go through the report together on a 30-minute call, worst finding first. Once you've made the fixes, we re-test every finding for free within 30 days and update the report, so you have a clean copy to show investors, customers or an insurer.

## What it costs

A Breach Check is £395, with the report within two business days of getting access. If your app was built quickly, especially with AI tools, it's the fastest way to find out what it's leaking before someone else does.
