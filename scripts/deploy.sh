#!/usr/bin/env bash
# Build the site and publish it to Zume (cPanel) over SSH/rsync.
#
# Usage: scripts/deploy.sh [--dry-run] [--yes]
#   --dry-run  show what would change on the server, change nothing
#   --yes      don't prompt before deleting remote files that aren't in dist/
#
# Settings come from the environment or an optional .env.deploy file (git-ignored):
#   ZUME_HOST      server hostname or domain (cPanel > "Server Information")   required
#   ZUME_USER      cPanel username                                              required
#   ZUME_PORT      SSH port                                   default 22
#   ZUME_WEB_ROOT  web root, relative to the home directory   default public_html
#   ZUME_APP_DIR   private dir for config + data, relative    default fortifyqa
#   SITE_URL       public URL used for the smoke test         default https://fortifyqa.com
set -euo pipefail

cd "$(dirname "$0")/.."

DRY_RUN=0
ASSUME_YES=0
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=1 ;;
    --yes) ASSUME_YES=1 ;;
    -h|--help) sed -n '2,15p' "$0"; exit 0 ;;
    *) echo "Unknown option: $arg" >&2; exit 2 ;;
  esac
done

if [[ -f .env.deploy ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.deploy
  set +a
fi

: "${ZUME_HOST:?Set ZUME_HOST (see scripts/deploy.sh header)}"
: "${ZUME_USER:?Set ZUME_USER (see scripts/deploy.sh header)}"
ZUME_PORT="${ZUME_PORT:-22}"
ZUME_WEB_ROOT="${ZUME_WEB_ROOT:-public_html}"
ZUME_APP_DIR="${ZUME_APP_DIR:-fortifyqa}"
SITE_URL="${SITE_URL:-https://fortifyqa.com}"

for path in "$ZUME_WEB_ROOT" "$ZUME_APP_DIR"; do
  if [[ ! "$path" =~ ^[A-Za-z0-9][A-Za-z0-9._/-]*$ || "$path" == *..* ]]; then
    echo "Refusing unsafe remote path: '$path' (must be relative to home, no '..')" >&2
    exit 2
  fi
done
if [[ "$ZUME_WEB_ROOT" == "$ZUME_APP_DIR" || "$ZUME_APP_DIR" == "$ZUME_WEB_ROOT"/* ]]; then
  echo "ZUME_APP_DIR must live outside ZUME_WEB_ROOT" >&2
  exit 2
fi
[[ "$ZUME_PORT" =~ ^[0-9]+$ ]] || { echo "ZUME_PORT must be numeric" >&2; exit 2; }

TARGET="$ZUME_USER@$ZUME_HOST"
mkdir -p "$HOME/.ssh" && chmod 700 "$HOME/.ssh"
CONTROL_PATH="$HOME/.ssh/cm-fortifyqa-%r@%h:%p"
SSH_OPTS=(-p "$ZUME_PORT" -o StrictHostKeyChecking=accept-new -o ControlMaster=auto -o "ControlPath=$CONTROL_PATH" -o ControlPersist=120)
RSYNC_SSH="ssh ${SSH_OPTS[*]}"
RSYNC_OPTS=(-rlz --checksum --delete --chmod=D755,F644
  --exclude=.well-known/ --exclude=cgi-bin/ --exclude=.user.ini --exclude=php.ini --exclude=error_log)

if [[ -n "$(git status --porcelain 2>/dev/null)" ]]; then
  echo "Warning: working tree has uncommitted changes; deploying them anyway." >&2
fi

echo "==> Lint + build"
npm run lint
npm run build
for f in dist/index.html dist/.htaccess dist/api/submit.php dist/api/.htaccess; do
  [[ -f "$f" ]] || { echo "Build output missing $f" >&2; exit 1; }
done

echo "==> Connecting to $TARGET:$ZUME_PORT"
ssh "${SSH_OPTS[@]}" "$TARGET" true

echo "==> Changes to ~/$ZUME_WEB_ROOT"
CHANGES="$(rsync "${RSYNC_OPTS[@]}" --dry-run --itemize-changes -e "$RSYNC_SSH" dist/ "$TARGET:$ZUME_WEB_ROOT/")"
printf '%s\n' "${CHANGES:-(no changes)}"

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Dry run: nothing uploaded."
  exit 0
fi

if grep -q '^\*deleting' <<<"$CHANGES" && [[ "$ASSUME_YES" -ne 1 ]]; then
  read -r -p "The files marked *deleting above will be removed from the server. Continue? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

echo "==> Preparing private config in ~/$ZUME_APP_DIR (outside the web root)"
ssh "${SSH_OPTS[@]}" "$TARGET" bash -s -- "$ZUME_APP_DIR" "$(base64 -w0 server/config.example.php)" <<'REMOTE'
set -euo pipefail
umask 077
cd "$HOME"
app="$1"
mkdir -p "$app/data"
chmod 700 "$app" "$app/data"
printf '%s' "$2" | base64 -d > "$app/config.example.php"
if [[ ! -f "$app/config.php" ]]; then
  salt="$(openssl rand -hex 32 2>/dev/null || php -r 'echo bin2hex(random_bytes(32));')"
  sed "s/__IP_SALT__/$salt/" "$app/config.example.php" > "$app/config.php"
  chmod 600 "$app/config.php"
  echo "Created ~/$app/config.php from template (edit notify_to / mail_from there if needed)."
else
  echo "Keeping existing ~/$app/config.php"
fi
REMOTE

echo "==> Uploading site to ~/$ZUME_WEB_ROOT"
rsync "${RSYNC_OPTS[@]}" -e "$RSYNC_SSH" dist/ "$TARGET:$ZUME_WEB_ROOT/"

ssh "${SSH_OPTS[@]}" -O exit "$TARGET" 2>/dev/null || true

echo "==> Smoke test against $SITE_URL"
home_status="$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL/")"
route_status="$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL/pricing")"
api_status="$(curl -s -o /dev/null -w '%{http_code}' "$SITE_URL/api/submit.php")"
echo "  /                -> $home_status (want 200)"
echo "  /pricing         -> $route_status (want 200, SPA fallback)"
echo "  /api/submit.php  -> $api_status (want 405 for GET)"
if [[ "$home_status" != 200 || "$route_status" != 200 || "$api_status" != 405 ]]; then
  echo "Smoke test failed. If DNS/SSL isn't live yet, re-run the checks later." >&2
  exit 1
fi
echo "Deployed."
