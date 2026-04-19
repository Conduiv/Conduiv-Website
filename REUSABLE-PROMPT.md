# Reusable Prompt — "Build me a consulting / portfolio website"

Save this file. When you want to spin up a new site (yours, a client's,
or a second practice), start a fresh Claude conversation, attach the
relevant inputs, and paste the prompt below. Edit the **bracketed
sections** to match the new project.

---

## Pre-flight checklist (read before prompting)

These are the gotchas we hit building Conduiv — handle them up front so
you don't rediscover them.

1. **Domain bought and in hand** — know the exact name.
2. **GitHub email privacy** — go to <https://github.com/settings/emails>
   and copy your noreply address (`ID+username@users.noreply.github.com`)
   before your first commit. Use it in `git config user.email`. If you
   forget, pushes to a public repo will be blocked and you'll have to
   rewrite history.
3. **Formspree account** — sign up *before* building; you'll want the
   form endpoint ID to paste into the contact page.
4. **Cloudflare account + domain transferred to Cloudflare DNS** — Pages
   deploys are free from a public GitHub repo.
5. **Cloudflare Turnstile site** — create a widget for the domain before
   building the contact page. Site key goes in HTML (public), secret key
   goes in Formspree → Spam Filters (never commit).
6. **Attach your inputs** — resume (.docx / .pdf), brand colours, 1–2
   reference sites you admire, and any existing copy.

---

## The prompt

```
Act as a CTO and Lead Web Developer. I want a single-author
consulting/portfolio website that I can deploy to Cloudflare Pages from
GitHub and maintain myself with nothing more than `git push` from
GitHub Desktop.

## About me

- Name: [YOUR NAME]
- Role: [e.g. IT Specialist & Systems Administrator]
- Location: [CITY, REGION, COUNTRY]
- Business / brand name: [BRAND]
- Domain: [domain.com]
- Mission statement: "[ONE LINE]"
- Email on the site: [hello@domain.com]
- Social: [LinkedIn URL], [GitHub URL]

## Headline metrics (integrate these throughout)

- [METRIC 1, e.g. $150K saved on X]
- [METRIC 2, e.g. 50% faster Y]
- [METRIC 3, e.g. 99.9% uptime]
- [METRIC 4, e.g. 15,000+ users supported]

## Brand & visual direction

- Palette: [white/orange | black/emerald | cream/navy — pick two]
- Typography: Plus Jakarta Sans for UI, JetBrains Mono for metrics
- Feel: [early-2000s professional but modern | brutalist editorial |
  soft/organic | whatever]
- No build tooling. Vanilla HTML, CSS, JS. Everything in one folder.

## Pages I want

1. `index.html` — Hero (metric-driven, two-beat: pain + outcome),
   bio card, 3–4 case studies with KPIs, experience timeline,
   skills grid, testimonials, CTA banner, footer.
2. `contact.html` — Formspree intake form with specific pre-qualifying
   fields (NOT a generic "name/email/message"). Gate submissions with
   Cloudflare Turnstile. Form button is disabled until the challenge
   passes.
3. `tools.html` — Free browser-side utilities specific to my field:
   [e.g. password generator, passphrase generator, AES-GCM encrypted
   secret links, IP lookup]. Everything runs client-side; nothing
   leaves the browser.
4. `404.html` — Branded dead-end with nav back to the site. Cloudflare
   Pages serves this automatically from root for free.

## Copy style

- Hero: two-beat. First beat = the pain. Second beat = outcome, with
  at least one metric inline.
- Services / case studies: framed as high-level consulting offerings,
  not support tasks. Use vocabulary the prospect uses ("Tenant
  Hardening", "Infrastructure Modernization", "Process Engineering" —
  swap for your domain).
- Timeline: show company names OR generalize to sector labels
  ("Energy & Utilities Client", "Global IT Services Provider") — pick
  and be consistent.
- Testimonials: real quotes with named attribution. One strong quote
  beats three generic ones.

## Technical requirements

- Responsive (mobile-first grid, `clamp()` typography).
- Accessible (WCAG 2.1 AA target — colour contrast, focus states,
  `prefers-reduced-motion` guards on every animation, ARIA labels).
- Progressive enhancement: the site must work with JavaScript
  disabled. JS adds: magnetic buttons, card tilt, scroll reveal,
  metric count-up, scroll progress bar — all via data-attributes
  (`data-magnetic`, `data-tilt`, `data-reveal`, `data-countup`).
- Living background orbs using blurred radial gradients and CSS
  keyframe drift — no images.
- Cross-document View Transitions API with CSS fallback for browsers
  that don't support it.
- `robots.txt` + `sitemap.xml` + `rel="canonical"`.
- Open Graph + Twitter Card meta tags on every page.
- JSON-LD structured data on homepage: `Person`,
  `ProfessionalService`, `WebSite` all linked via `@id`.
- Favicon = inline SVG logo.

## Security & production polish

- `_headers` file with: HSTS (preload-eligible, 2 years),
  X-Frame-Options DENY, X-Content-Type-Options nosniff,
  Referrer-Policy strict-origin-when-cross-origin, a restrictive
  Permissions-Policy, COOP/CORP same-origin, and a real
  Content-Security-Policy that only allowlists the exact external
  hosts I use (Cloudflare Turnstile, Google Fonts, Formspree).
- `SECURITY.md` describing disclosure policy.
- `.well-known/security.txt` (RFC 9116).
- `.gitignore` for OS/editor junk.
- Clean `README.md` and a step-by-step `PUBLISH.md` walking a
  non-developer through Formspree setup, GitHub repo creation, DNS
  move to Cloudflare, Pages project creation, custom domain
  attachment, HTTPS forcing, analytics, and sitemap submission.

## What NOT to include

- No build step, no npm, no frameworks, no bundler.
- No localStorage / sessionStorage (fails in some sandboxes).
- No tracking pixels, no ad scripts, no third-party analytics that
  require cookies. Cloudflare Web Analytics is the only analytics.
- No generic testimonials or stock copy.

## Deliverables (in this order)

1. Ask me clarifying questions about anything under-specified above.
2. Build the full folder in a temporary workspace; show me `index.html`
   first so I can react before you build the others.
3. After I confirm direction, build the rest.
4. Run a final verification pass: HTML tag balance, JSON-LD validity,
   grep for any leftover placeholders ("YOUR_", "TODO", "Lorem").
5. Give me a Cloudflare Pages settings table (project name, branch,
   framework preset, build command, output directory) and the exact
   commands I'll run from GitHub Desktop / terminal to push.
```

---

## Tips for getting the best result

- **Attach, don't paste.** Upload your resume as a file rather than
  pasting the text. Attach 1–2 reference sites as screenshots if you
  have a specific aesthetic in mind.
- **Commit as you go.** After each major feature (hero, cases,
  contact form, tools), commit to a branch so you can roll back. Once
  the site is up, push directly to `main`.
- **Use a noreply email from commit #1.** Revisiting git history to
  remove your real email is painful.
- **Don't enable "Require a pull request" on `main`** as a solo
  developer — just block force-pushes and deletions.
- **Ask for the security review last.** Once the site feels done,
  ask Claude to "review this site and the GitHub repo for security
  vulnerabilities and propose fixes." It will catch missing CSP,
  HSTS, structured data, OG tags, and disclosure policy.

---

## What a second-project version of this prompt might look like

If you're building a *different kind of site* later — say, a product
landing page, a nonprofit, or a client's practice — keep the structure
above but swap:

- "consulting/portfolio" → "SaaS landing page" or "boutique law practice"
- The service vocabulary block
- The case study structure (for SaaS, swap to feature cards +
  pricing tiers; for nonprofit, swap to impact stats + donation CTA)
- The Tools page (remove entirely if not relevant)

The skeleton — Hero / Bio / Cases / Timeline / Skills / Testimonials /
Contact / Tools / 404 — is generic enough to serve most small sites.
