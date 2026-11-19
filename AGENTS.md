# AGENTS.md

## Project Context

Fortify QA marketing site. Standalone Vite + React + Tailwind frontend with a single PHP form endpoint, deployed to Zume (cPanel shared hosting, Apache + PHP). Originally exported from Base44 app `6a7f93b3cb5dff38406b0a9e`; the Base44 SDK, Vite plugin, and auth pages have been removed. Do not reintroduce them.

See `README.md` for server layout, local development, and the deploy workflow.

## Key Files

- `src/`: frontend source. `@/` aliases `src/` (configured in `vite.config.js`).
- `src/api/forms.js`: client helper that posts forms to `/api/submit.php`.
- `public/api/submit.php`: form endpoint (validation, rate limit, CSV log, email). Field schemas must match the form fields/options in `src/pages/Contact.jsx`, `src/pages/BookAudit.jsx`, and `src/components/site/LeadMagnet.jsx`.
- `public/.htaccess`: HTTPS/apex redirects, SPA fallback, CSP and security headers. New external origins (fonts, images, scripts) must be added to the CSP.
- `server/config.example.php`: template for `~/fortifyqa/config.php` on the server (outside the web root).
- `scripts/deploy.sh`: lint, build, rsync over SSH to Zume, smoke test. Settings in git-ignored `.env.deploy`.
- `scripts/bundle.sh`: builds `release/home/` (git-ignored) for manual FileZilla uploads. Its `config.php` contains the IP salt, so don't commit or share it.
- `scripts/smoke-test.sh [URL]`: post-deploy HTTP checks.

## Checks

- `npm run lint`
- `npm run build`
- Endpoint tests: run `dist/` in `php:8.2-apache` Docker (see README) and exercise `/api/submit.php` with curl.

## Content rules

- Client proof (logos in `TrustedBy.jsx`, `METRICS`, `QUOTES`, `CASE_STUDIES`) must be real and approved by the client. The lists are empty until then and the sections show a founding-client note instead. Don't add invented or "representative" examples.
- Each route needs an entry in `src/components/site/PageMeta.jsx` (title, description, canonical) and in `public/sitemap.xml`.
