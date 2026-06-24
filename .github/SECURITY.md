# Security Policy

## Supported versions

The `main` branch and the current production deployment (Vercel) are supported.

## Reporting a vulnerability

Please **do not open a public issue** for security vulnerabilities.

- Email: lqykim275@gmail.com
- Or use GitHub's private **"Report a vulnerability"** (Security → Advisories).

Include reproduction steps, impact, and any suggested fix. We aim to acknowledge
within 72 hours.

## Handling secrets

- Never commit `.env*` files. The contact form's email credentials live in the
  **Vercel** dashboard (server-side env vars), never in `NEXT_PUBLIC_*`.
- Secret scanning (gitleaks) runs on every push/PR. If a secret is ever
  committed, **rotate it immediately**.
