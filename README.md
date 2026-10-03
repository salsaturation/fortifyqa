# Fortify QA website

Marketing site for Fortify QA. Static React (Vite + Tailwind) frontend plus one PHP endpoint for form submissions, hosted on Zume (cPanel / Apache + PHP).

Originally built in Base44 (app `6a7f93b3cb5dff38406b0a9e`); this repo is the standalone copy with no Base44 runtime dependency.

## Layout on the server

```
~/public_html/            <- contents of dist/ (rsync'd by scripts/deploy.sh)
  .htaccess               HTTPS + apex redirect, SPA fallback, security headers
  api/submit.php          form endpoint (contact, audit, lead)
~/fortifyqa/              <- private, outside the web root (chmod 700)
  config.php              recipient, sender, allowed origins, rate limits, IP salt (chmod 600)
  data/submissions.csv    append-only log of every accepted submission (chmod 600)
  data/ratelimit/         per-IP / global counters (hashed keys)
```

## Local development

```bash
npm install
npm run dev        # frontend on http://localhost:5173
```

`/api` is proxied to `http://localhost:8080` (override with `FORM_API_PROXY`). To exercise the PHP endpoint locally, run it in Docker:

```bash
npm run build
docker run --rm -p 8080:80 -v "$PWD/dist:/var/www/html:ro" -v "$PWD/.local-server:/var/www/fortifyqa" php:8.2-apache \
  bash -c "a2enmod rewrite headers >/dev/null && sed -i '/<Directory \/var\/www\/>/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /etc/apache2/apache2.conf && apache2-foreground"
```

Put a `config.php` (copied from `server/config.example.php`, with your local origin in `allowed_origins`) in `.local-server/`, and send `X-Forwarded-Proto: https` or the `.htaccess` will redirect you to HTTPS.

## Checks

```bash
npm run lint
npm run build
```

## Deploying to Zume

One-time setup:

1. In the Zume client area, add `fortifyqa.com` to the hosting plan and point DNS at Zume (nameservers `ns1.zumedns.com` / `ns2.zumedns.com`). SSL is issued automatically.
2. In cPanel > Email Accounts, create `website@fortifyqa.com` (the sender) and make sure `hello@fortifyqa.com` exists (the recipient). Check that SPF/DKIM are enabled under Email Deliverability.
3. Add your SSH public key in cPanel > SSH Access > Manage SSH Keys and authorise it.
4. Create `.env.deploy` in the repo root (git-ignored):

   ```bash
   ZUME_HOST=your-server.zume.net   # cPanel > Server Information
   ZUME_USER=your-cpanel-username
   # ZUME_PORT=22
   # ZUME_WEB_ROOT=public_html
   # ZUME_APP_DIR=fortifyqa
   ```

Every deploy:

```bash
scripts/deploy.sh --dry-run   # preview what changes on the server
scripts/deploy.sh             # lint, build, upload, smoke test
```

The script asks before deleting any remote file that isn't in `dist/` (e.g. a cPanel placeholder `index.html` or an old site). `.well-known/`, `cgi-bin/`, `.user.ini`, `php.ini` and `error_log` are never touched. On first run it creates `~/fortifyqa/config.php` with a random IP salt; later runs leave it alone, so edit it on the server if the recipient or sender changes.

### Manual deploy with FileZilla

```bash
scripts/bundle.sh       # lint + build into release/home/ (mirrors your Zume home dir)
```

1. In FileZilla, connect with **SFTP**, port 22, your cPanel username and password (or SSH key). The host is your domain or the server hostname from cPanel > Server Information.
2. Turn on **Server > Force showing hidden files** so `.htaccess` is visible on the server.
3. Local pane: open `release/home/`. Remote pane: your home directory (the folder that contains `public_html`).
4. **First deploy only:** drag `fortifyqa/` into the home directory. Then right-click `fortifyqa/config.php` > File permissions > `600`, and set the `fortifyqa` folder to `700`. Never put this folder inside `public_html`.
5. Open `release/home/public_html/` locally and drag **everything inside it** (including `.htaccess` and `api/`) into the remote `public_html/`. Choose **Overwrite** when prompted. Delete any old placeholder `index.php` or `default.html` that cPanel created.
6. Run `scripts/smoke-test.sh` and submit the Contact form once to confirm the email arrives.

Re-running `scripts/bundle.sh` keeps the same `config.php` (and IP salt). After the first deploy, only `public_html/` needs re-uploading. Old `assets/index-*.js` files left behind on the server are harmless, but you can delete the ones not referenced by the new `index.html`.

## Form submissions

`public/api/submit.php` accepts JSON `POST`s from the site's own origin only. It validates each form against a fixed schema (unknown fields rejected, length limits, enum checks, email/URL validation), silently drops honeypot or too-fast bot submissions, rate-limits per IP (5 per 10 min) and globally (60 per hour), appends to the CSV (spreadsheet formula injection neutralised), and emails the recipient with `Reply-To` set to the submitter. Submissions succeed if either the CSV write or the email works; failures are written to the PHP error log without personal data.

To read submissions: cPanel File Manager > `fortifyqa/data/submissions.csv`, or `scp` it down.
