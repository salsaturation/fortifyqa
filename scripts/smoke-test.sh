#!/usr/bin/env bash
# Check a deployed site responds correctly.
# Usage: scripts/smoke-test.sh [SITE_URL]   (default https://fortifyqa.com)
set -euo pipefail

SITE_URL="${1:-${SITE_URL:-https://fortifyqa.com}}"
SITE_URL="${SITE_URL%/}"
failed=0

check() {
  local path="$1" want="$2" note="$3" got
  got="$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL$path" || true)"
  if [[ "$got" == "$want" ]]; then
    printf '  ok    %-22s %s (%s)\n' "$path" "$got" "$note"
  else
    printf '  FAIL  %-22s %s, want %s (%s)\n' "$path" "$got" "$want" "$note"
    failed=1
  fi
}

echo "==> Smoke test against $SITE_URL"
check /                 200 "home page"
check /pricing          200 "SPA fallback via .htaccess"
check /images/about.webp 200 "static assets"
check /api/submit.php   405 "form endpoint alive, rejects GET"
check /api/.htaccess    403 "hidden files blocked"

csp="$(curl -sI "$SITE_URL/" | grep -i '^content-security-policy:' || true)"
if [[ -n "$csp" ]]; then
  echo "  ok    security headers present"
else
  echo "  FAIL  no Content-Security-Policy header (is public_html/.htaccess uploaded?)"
  failed=1
fi

if [[ "$failed" -ne 0 ]]; then
  echo "Smoke test failed. If DNS/SSL isn't live yet, re-run later." >&2
  exit 1
fi
echo "All checks passed. Now submit the Contact form once and confirm the email arrives."
