# Security Policy

Thanks for helping keep Conduiv and its users safe.

## Supported versions

This repository hosts the static marketing site for Conduiv (conduiv.com).
Only the `main` branch is deployed; all fixes ship from `main`.

## Reporting a vulnerability

If you believe you've found a security issue — on conduiv.com, in this
repository, or in any of the free browser-side tools at
<https://conduiv.com/tools.html> — please report it privately rather than
opening a public issue.

**Preferred channel:** email `security@conduiv.com`
*(backup: `hello@conduiv.com`)*

Please include:

1. A clear description of the issue and its impact.
2. Step-by-step reproduction (URL, request, or payload).
3. Any proof-of-concept code, screenshots, or logs.
4. Your name / handle for credit (optional).

## What to expect

| Stage                                 | Target time              |
| ------------------------------------- | ------------------------ |
| Acknowledgement of your report        | Within 72 hours          |
| Initial triage and severity estimate  | Within 7 days            |
| Fix or mitigation deployed            | 7–30 days, severity-based |
| Public disclosure (coordinated)       | After fix is live        |

## Scope

**In scope**

- `conduiv.com` and any subdomain
- The HTML / CSS / JS served from this repository
- The client-side cryptography used by the secret-link tool

**Out of scope**

- Third-party services (Formspree, Cloudflare Turnstile, Google Fonts) —
  report those directly to the vendor.
- Social engineering, physical attacks, denial-of-service testing.
- Missing security headers where a compensating control is already in
  place (e.g., HSTS without preload when preload is scheduled).

## Safe-harbor

If you act in good faith, follow this policy, and avoid privacy violations,
destruction of data, or service disruption, we will not pursue legal action
against you for your research.

Thank you.
