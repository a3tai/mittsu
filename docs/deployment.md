# Deployment

The Mittsu showcase (`apps/web`) deploys to **Cloudflare Pages**. The
project is named `mittsu`; the live domain is **mittsu.dev**.

Local development still uses `npm --workspace apps/web run dev`. Nothing
in this doc affects that — these notes only cover the deploy path.

## How it works

```
git push origin main
        │
        ▼
GitHub Action (.github/workflows/deploy.yml)
        │  · npm ci
        │  · type-check both packages
        │  · build apps/web with adapter-static (→ apps/web/build/)
        │  · wrangler pages deploy build --project-name=mittsu
        ▼
Cloudflare Pages project "mittsu" → mittsu.dev
```

The GitHub Action reads two repo secrets:

| Secret | Where to find it |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens → Create token. Use template **"Edit Cloudflare Workers"** (or scope a custom token to: Account · Cloudflare Pages: Edit). |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → any zone or Workers/Pages page → right sidebar shows Account ID. |

Set both at: **GitHub → repo → Settings → Secrets and variables → Actions → New repository secret.**

## First deploy (one-time)

1. Create the Cloudflare API token + grab the account ID (see table above).
2. Add both as GitHub repo secrets.
3. Push to `main`. The Action will:
   - Auto-create a Pages project named `mittsu` on first run.
   - Deploy the build output.
   - Print the preview URL in the job log (e.g. `https://mittsu.pages.dev`).
4. **Bind `mittsu.dev` to the project**: Cloudflare dashboard → Pages →
   `mittsu` → Custom domains → Set up a custom domain → enter `mittsu.dev`.
   Cloudflare will create the DNS record automatically (since the domain
   is registered through Cloudflare). Allow ~30s for cert provisioning.
5. (Optional) Add `www.mittsu.dev` as a redirect in the same panel.

After this, every push to `main` deploys automatically. PRs / non-`main`
branches get a preview URL but don't update the production domain.

## Local environment (1Password + direnv)

If you want to run `wrangler` locally (e.g. to deploy from your laptop or
to use `wrangler dev` for local testing of the deployed build), the same
two env vars need to be available in your shell.

The repo uses **direnv + 1Password CLI** for this. No secrets are ever
written to disk; `direnv` resolves them at shell-load time.

### One-time setup

```sh
# Install
brew install direnv 1password-cli

# Hook direnv into your shell (zsh shown — bash/fish similar)
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
exec zsh

# Sign in to 1Password CLI
eval "$(op signin)"
```

### Per-repo setup

```sh
# Copy the template and edit the op:// paths to match your vault layout
cp .envrc.example .envrc

# Allow direnv to load this file (it asks once, then remembers)
direnv allow
```

The default `.envrc.example` assumes a 1Password item at:

- **Vault**: `Private`
- **Item**: `Cloudflare — Mittsu`
- **Fields**: `api-token`, `account-id`

Adjust the `op://` paths inside `.envrc` to match wherever you actually
stored the credentials.

`.envrc` is **gitignored**. Only `.envrc.example` is committed.

### Verifying

```sh
cd /path/to/mittsu
echo $CLOUDFLARE_ACCOUNT_ID    # should print your account id
echo $CLOUDFLARE_API_TOKEN | head -c 4   # should print 4 chars and a newline
```

If the second one prints nothing, check `op account get` works.

## Manual deploy (from your laptop)

After the env vars are loaded:

```sh
npm --workspace apps/web run build
cd apps/web
npx wrangler pages deploy build --project-name=mittsu
```

The first deploy creates the project; subsequent ones push new versions.

## Troubleshooting

- **`Authentication error`** — your API token doesn't have Pages: Edit
  scope, or `CLOUDFLARE_ACCOUNT_ID` is wrong. The token must include the
  account in its scope.
- **`Project mittsu does not exist`** — first deploy auto-creates it on
  Cloudflare's side. If it errors instead, create the project manually
  in the Pages dashboard with the same name.
- **mittsu.dev shows the default Cloudflare placeholder** — DNS hasn't
  propagated yet, or the custom domain binding step is incomplete.
  Cloudflare's "Custom domains" tab in the Pages project shows the
  current state.
- **direnv didn't load `.envrc`** — run `direnv allow` once after
  creating it, and check `direnv status` for errors.

## What's NOT in here yet

- Preview deploys for branches / PRs — works automatically with the
  `--branch=...` flag we already pass. No extra config needed.
- Edge functions / SSR — the showcase is pure static. If we ever add
  edge functions, switch the SvelteKit adapter from
  `@sveltejs/adapter-static` to `@sveltejs/adapter-cloudflare` and
  add a `main` entry to `wrangler.toml`.
- Build caching — Cloudflare Pages caches automatically; no config.
