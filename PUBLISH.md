# Conduiv — Publish Guide

A step-by-step walkthrough from "files on your laptop" to `https://conduiv.com`
live on the internet with a valid SSL certificate. First-time setup takes
roughly 45–60 minutes. Every update after that is a one-command `git push`.

---

## What you need before you start

1. **The domain `conduiv.com`** — you already own this.
2. **A GitHub account** — free. Sign up at <https://github.com/signup> if you don't have one.
3. **A Cloudflare account** — free. Sign up at <https://dash.cloudflare.com/sign-up>.
4. **A Formspree account** — free tier is fine. Sign up at <https://formspree.io/register>.
5. **Git installed on your computer** — check by running `git --version` in Terminal / PowerShell. If missing, install from <https://git-scm.com/downloads>.

---

## Stage 1 — Wire up the Formspree form (5 min)

Before you deploy, swap the placeholder form ID in `contact.html` for a real one.

1. Go to <https://formspree.io> and **sign up** with `hello@conduiv.com`
   (or any email you control — you can change it later).
2. After logging in, click **New Form** (top right).
3. Name it `Conduiv Intake`. Leave the rest default. Click **Create Form**.
4. Formspree shows you an **Endpoint URL** that looks like:
   ```
   https://formspree.io/f/xqkgapbn
   ```
   Copy the part after `/f/` — for example `xqkgapbn`. That's your Form ID.
5. On your computer, open `contact.html` in any text editor.
6. Find this line (near the top of the `<form>` tag):
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Replace `YOUR_FORM_ID` with the ID you just copied. Save the file.
7. **Verify your Formspree account** — Formspree will email you a
   confirmation link the first time someone submits the form. Click it so
   submissions start being delivered.

---

## Stage 2 — Create a GitHub repository (5 min)

1. Open <https://github.com/new>.
2. Fill in:
   - **Repository name:** `conduiv`
   - **Description:** *(optional)* "Conduiv — Bilal Ghous's professional site"
   - **Visibility:** Public *(Cloudflare Pages works with private too, but public is simpler for a portfolio)*
   - Leave **Add a README**, **.gitignore**, and **license** all **unchecked** — you already have a README and .gitignore.
3. Click **Create repository**.
4. GitHub will show you a page titled "Quick setup". Leave it open — you'll
   copy commands from it in the next stage.

---

## Stage 3 — Push your files to GitHub (5 min)

Open **Terminal** (macOS/Linux) or **PowerShell** (Windows) and navigate into
your project folder. The path will be something like
`C:\Users\Bilal\Documents\Conduiv Website` on Windows or
`~/Documents/Conduiv Website` on Mac. Once inside that folder, run:

```bash
# Initialize git in this folder
git init

# Tell git who you are (only needed the first time ever)
git config --global user.name  "Bilal Ghous"
git config --global user.email "ghous.homelab@gmail.com"

# Stage every file
git add .

# Create your first commit
git commit -m "Initial Conduiv site"

# Rename the default branch to "main"
git branch -M main

# Link to the GitHub repo you just created
# (replace <your-username> with your actual GitHub username)
git remote add origin https://github.com/<your-username>/conduiv.git

# Push
git push -u origin main
```

On that last `git push`, GitHub will ask you to authenticate. If this is
your first time pushing from this machine, the simplest flow is:

- On Windows/macOS, Git will pop up a browser window asking you to sign in
  to GitHub. Click through.
- If no browser opens, GitHub will ask for a **Personal Access Token** in
  place of your password. Create one at
  <https://github.com/settings/tokens> → **Generate new token (classic)** →
  scope = `repo`. Copy the token and paste it as the password at the
  Git prompt.

After the push completes, refresh your GitHub repo page — you should see
all your files listed there.

---

## Stage 4 — Put the domain on Cloudflare (10 min)

Before Cloudflare Pages can serve `conduiv.com`, Cloudflare needs to be
your DNS provider for that domain.

1. Log in to <https://dash.cloudflare.com>.
2. Click **+ Add site** in the top bar.
3. Enter `conduiv.com` and click **Add site**.
4. Choose the **Free** plan and click **Continue**.
5. Cloudflare will scan for your existing DNS records. Review the list — if
   you had email or other subdomains set up elsewhere, make sure they're
   captured. Click **Continue**.
6. Cloudflare will show you **two nameservers** like:
   ```
   ana.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```
   Copy them both.
7. Log in to wherever you registered `conduiv.com` (GoDaddy, Namecheap,
   Google Domains/Squarespace, etc.) and find the **nameservers** setting
   for the domain. It's usually under *Domain Settings* → *DNS* → *Change
   nameservers*.
8. Replace the existing nameservers with the two Cloudflare gave you.
   **Save.**
9. Back on Cloudflare, click **Done, check nameservers**. Propagation is
   usually under 15 minutes but can take up to 24 hours. You'll get an
   email when Cloudflare confirms the domain is active on your account.

> You can move on to Stage 5 while waiting — the Pages project can be set
> up before DNS finishes moving. Only the **custom domain** step at the
> end needs DNS to be live.

---

## Stage 5 — Create the Cloudflare Pages project (10 min)

1. In the Cloudflare dashboard left sidebar, go to
   **Workers & Pages** → **Create** → **Pages** tab → **Connect to Git**.
2. Click **Connect GitHub**, authorize Cloudflare, and select the `conduiv`
   repository you pushed in Stage 3. Click **Begin setup**.
3. Fill in the project settings **exactly** like this:

   | Setting                       | Value                 |
   | ----------------------------- | --------------------- |
   | Project name                  | `conduiv`             |
   | Production branch             | `main`                |
   | Framework preset              | `None`                |
   | Build command                 | *(leave blank)*       |
   | Build output directory        | `/`                   |
   | Root directory (advanced)     | *(leave blank)*       |
   | Environment variables         | *(none)*              |

4. Click **Save and Deploy**.
5. Cloudflare builds and publishes in ~30 seconds. When it finishes,
   you'll see a URL like `https://conduiv.pages.dev`. Click it — your
   site is live on the internet. Test every page and the contact form
   before continuing.

---

## Stage 6 — Attach the custom domain conduiv.com (5 min)

Wait until Stage 4 shows `conduiv.com` as **Active** on Cloudflare before
doing this.

1. In your Cloudflare Pages project (the one you just created), go to
   **Custom domains** → **Set up a custom domain**.
2. Enter `conduiv.com`. Cloudflare will detect that the domain is on your
   account and offer to create the DNS record automatically. **Accept.**
3. Repeat for `www.conduiv.com` — Cloudflare will create a CNAME so
   `www` redirects to the apex domain.
4. SSL/HTTPS is provisioned automatically (Universal SSL). Give it a
   minute or two.
5. Open `https://conduiv.com` in your browser. You should see the site
   with a padlock icon in the address bar.

---

## Stage 7 — Post-launch polish (5 min)

1. **Turn on Web Analytics.** Cloudflare dashboard → **Analytics &
   Logs** → **Web Analytics** → **Add a site** → select `conduiv.com`.
   Cookie-free, GDPR-safe, no script to install (it piggybacks on Pages).
2. **Force HTTPS.** Cloudflare dashboard → **SSL/TLS** → **Edge
   Certificates** → toggle **Always Use HTTPS** to ON.
3. **Submit your sitemap to Google.** Go to <https://search.google.com/search-console>,
   add `conduiv.com`, verify ownership (pick the DNS option — Cloudflare
   makes this easy), then go to **Sitemaps** and submit `sitemap.xml`.
4. **Submit to Bing.** Same idea at <https://www.bing.com/webmasters>.

---

## Stage 8 — How to update the site later

Every time you want to change copy, add a project, or push a new tool:

```bash
# edit files in your project folder with any text editor
git add .
git commit -m "Describe what changed"
git push
```

That's it. Cloudflare Pages detects the push, rebuilds in ~10 seconds,
and `conduiv.com` serves the new version. No dashboard clicks required.

If you mess up a deploy, Cloudflare keeps every previous build under
**Deployments** in your Pages project — click the old one, then
**Rollback** to revert instantly.

---

## Troubleshooting quick reference

| Symptom                                     | Fix                                                                         |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| "Permission denied (publickey)" on push     | You pasted an SSH URL; re-add the remote using the HTTPS URL in Stage 3.    |
| GitHub asks for a password and rejects it   | Use a Personal Access Token instead (see Stage 3 note).                     |
| Pages build succeeded but 404 on the site   | Check `Build output directory` is set to `/` exactly.                       |
| `conduiv.com` loads but shows a warning     | Wait 2–3 min for SSL to finish provisioning after adding the custom domain. |
| Form submits but no email arrives           | You haven't verified the Formspree endpoint — check your inbox.             |
| Form shows "YOUR_FORM_ID" error             | You forgot Stage 1 — edit `contact.html`, commit, push.                     |
| Changes pushed but site not updating        | Hard refresh (Ctrl+Shift+R / Cmd+Shift+R); Cloudflare caches aggressively.  |

---

## Files that ship (quick reference)

| File           | Purpose                                                       |
| -------------- | ------------------------------------------------------------- |
| `index.html`   | Landing page — hero, case studies, experience, skills, CTA   |
| `contact.html` | Contact / intake form (Formspree-backed)                     |
| `tools.html`   | Free security tools (password, passphrase, secret link)      |
| `styles.css`   | Shared stylesheet                                            |
| `logo.svg`     | Logo + favicon                                               |
| `robots.txt`   | Tells search engines which pages to index                    |
| `sitemap.xml`  | Lists your pages for search engines                          |
| `_headers`     | Security headers applied by Cloudflare                       |
| `.gitignore`   | Keeps OS/editor junk out of the repo                         |
| `README.md`    | Project overview                                             |
| `PUBLISH.md`   | This file                                                    |
