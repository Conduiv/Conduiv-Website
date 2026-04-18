# Conduiv — conduiv.com

Static marketing site for Conduiv, a boutique IT consulting practice.
Pure HTML / CSS / vanilla JavaScript. No build step.

## Files

| File             | Purpose                                                             |
|------------------|---------------------------------------------------------------------|
| `index.html`     | Landing page — hero, bio card, services, proof-of-work, CTA         |
| `contact.html`   | Consultation Intake Form (Formspree-backed)                         |
| `tools.html`     | Free Security Tools — password gen, passphrase gen, secret link     |
| `styles.css`     | Shared white/orange "early-2000s, modern hygiene" stylesheet        |

There is no `package.json`, no bundler, and no framework. You can open the
files directly in a browser to test.

---

## 1. Local preview

The simplest way to preview before deploying:

```bash
# from the project root
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just double-click `index.html`.

---

## 2. Wire up the Formspree intake form

`contact.html` posts to a placeholder endpoint:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Steps:

1. Sign up at [formspree.io](https://formspree.io/) with `hello@conduiv.com`.
2. Create a new form, give it the name **Conduiv Intake**.
3. Copy the form ID (looks like `xqkgapbn`).
4. In `contact.html`, replace `YOUR_FORM_ID` with that ID.
5. Submit a test entry — Formspree will email you a confirmation link the
   first time before deliveries are live.

The form already includes:
- A honeypot field (`_gotcha`) for basic bot rejection.
- A custom subject line via `_subject`.
- All the required pre-qualification fields (M365 licensing, primary challenge,
  timeline, budget, etc.).

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Conduiv site"
git branch -M main
git remote add origin git@github.com:<your-username>/conduiv.git
git push -u origin main
```

---

## 4. Deploy to Cloudflare Pages

Cloudflare Pages docs: <https://developers.cloudflare.com/pages/>

### A. Connect the GitHub repo

1. Sign in to the **Cloudflare dashboard** → **Workers & Pages** → **Create**.
2. Select the **Pages** tab → **Connect to Git**.
3. Authorize Cloudflare to access your GitHub account, then select the
   `conduiv` repository.
4. Click **Begin setup**.

### B. Build configuration

Because this is a plain HTML/CSS site with no build step, the settings are
deliberately minimal. Set them exactly as below:

| Setting                          | Value                          |
|----------------------------------|--------------------------------|
| **Project name**                 | `conduiv`                      |
| **Production branch**            | `main`                         |
| **Framework preset**             | `None`                         |
| **Build command**                | *(leave blank)*                |
| **Build output directory**       | `/` (root of the repo)         |
| **Root directory (advanced)**    | *(leave blank — defaults to /)*|
| **Environment variables**        | *(none required)*              |

Click **Save and Deploy**.

The first deployment will publish to a URL like
`https://conduiv.pages.dev` within ~30 seconds.

### C. Add the custom domain `conduiv.com`

1. In your Pages project → **Custom domains** → **Set up a custom domain**.
2. Enter `conduiv.com` (and repeat for `www.conduiv.com`).
3. Cloudflare will detect that the apex domain is already on your Cloudflare
   account and offer to create the DNS records automatically. Accept.
4. SSL is provisioned automatically (Universal SSL — Full/Strict).
5. After DNS propagates (usually <5 minutes), `https://conduiv.com` will
   serve `index.html`.

### D. Recommended Pages settings (optional but worth it)

In **Settings → Builds & deployments**:

- **Production branch:** `main`
- **Preview deployments:** *Enabled* — every PR gets its own preview URL.
- **Build watch paths:** *(leave blank — rebuild on every push)*
- **Skip builds for unchanged paths:** *Enabled*

In **Settings → General**:

- **Access Policy:** Public.
- **Compatibility flags:** none required.

In **Settings → Functions**: *(not used — this is a static site).*

In **Settings → Web Analytics**: enable Cloudflare Web Analytics. It is
cookie-free, GDPR/PIPEDA-friendly, and does not require a separate script.

### E. Cache & headers (optional)

Cloudflare will cache static assets aggressively by default. If you change
`styles.css` and want to bust the cache without renaming, you can either:

- Append a query string when including it (`styles.css?v=2`), or
- Use **Caching → Configuration → Purge Cache** in the Cloudflare dashboard
  after a deploy.

For long-term hygiene, add a `_headers` file at the repo root if you want to
override defaults. Example:

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

---

## 5. Updating content

Because there is no build step, edits go live as soon as they are pushed:

```bash
# edit files…
git add .
git commit -m "Update services copy"
git push
```

Cloudflare detects the push, deploys in ~10 seconds, and `conduiv.com`
serves the new version.

---

## 6. Adding more free tools later

The tools page (`tools.html`) is intentionally structured so each tool sits
inside its own `.tool-card` block with a self-contained `<script>` section
at the bottom. To add another tool, copy an existing `.tool-card`, give the
new inputs unique IDs, and append the logic to the existing `<script>` tag.

Ideas already worth shipping:
- IP / CIDR calculator
- DKIM/SPF/DMARC record builder
- M365 license cost estimator
- Random Conditional Access policy name generator
- Bcrypt / SHA-256 hasher
