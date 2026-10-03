#!/usr/bin/env bash
# Build an upload-ready folder for manual (FileZilla / cPanel File Manager) deploys.
#
# Usage: scripts/bundle.sh
#
# Produces release/home/, which mirrors your Zume home directory:
#   release/home/public_html/       -> upload into ~/public_html/
#   release/home/fortifyqa/config.php  -> upload into ~/fortifyqa/ (first deploy only)
#
# config.php is generated once with a random IP salt and reused on later runs,
# so re-bundling never changes the salt. release/ is git-ignored.
set -euo pipefail

cd "$(dirname "$0")/.."

echo "==> Lint + build"
npm run lint
npm run build
for f in dist/index.html dist/.htaccess dist/api/submit.php dist/api/.htaccess; do
  [[ -f "$f" ]] || { echo "Build output missing $f" >&2; exit 1; }
done

OUT=release/home
rm -rf "$OUT/public_html"
mkdir -p "$OUT/public_html" "$OUT/fortifyqa"
cp -a dist/. "$OUT/public_html/"

CONFIG="$OUT/fortifyqa/config.php"
if [[ ! -f "$CONFIG" ]]; then
  ( umask 077; sed "s/__IP_SALT__/$(openssl rand -hex 32)/" server/config.example.php > "$CONFIG" )
  echo "Created $CONFIG (random IP salt)."
fi
chmod 600 "$CONFIG"

echo
echo "Bundle ready: $(pwd)/$OUT"
echo "  public_html/  -> upload the CONTENTS into ~/public_html/ (includes hidden .htaccess files)"
echo "  fortifyqa/    -> upload into ~/ (first deploy, or if you changed config.php), then set config.php to 600"
echo "Afterwards run: scripts/smoke-test.sh"
