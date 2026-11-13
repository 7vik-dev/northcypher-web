# NorthCypher Web

NorthCypher Web is a locally runnable static cybersecurity intelligence website
snapshot. It presents NorthCypher's threat intelligence, dark-web monitoring,
brand protection, red-team operations, free security tools, pricing, FAQ,
contact intake, and threat-intelligence publishing areas.

## Run locally

Requirements:

- Node.js 18 or newer

From this directory:

```powershell
npm start
```

Open <http://localhost:3000/>.

The site uses the dependency-free server in [server.js](./server.js). It serves
the exported HTML, local CSS, JavaScript, fonts, images, and videos without a
build step. The local server also provides development-only API responses for
the existing UI flows.

## What's included

- NorthCypher responsive marketing homepage
- About and operating-record pages
- Threat Intelligence and Security Operations service pages
- Free Tools hub and nine tool pages:
  - Fraud IP Check
  - IP Abuse Check
  - Proxy & VPN Detection
  - What Is My IP
  - Email Breach Check
  - Domain Reputation
  - Typosquat Finder
  - ASN Lookup
  - SSL / Header Scan
- Pricing page with Free, Starter, and Pro plan presentation
- FAQ page with structured FAQ data
- Contact and demo-report intake UI
- Sign-in page shell
- Threat Intelligence index and 22 article pages
- Local media, fonts, CSS, and JavaScript assets
- Local fallback behavior so the static pages remain visible if the exported
  client hydration bundle cannot connect to its original application runtime

## Current limitations

This repository is a frontend/exported snapshot, not a production platform.
The following items still need implementation:

- Supabase authentication: sign up, sign in, logout, persistent sessions,
  password recovery, and email verification
- User profiles, protected dashboard, usage limits, lookup history, and saved
  reports
- Production integrations for the nine security tools
- Secure server-side provider calls, validation, rate limiting, caching, and
  error handling
- Persisted contact/demo leads and analyst workflows
- Admin/analyst roles, audit logs, and support tooling
- Payment checkout, webhook verification, entitlements, receipts, and refunds
- Privacy, terms, cookie, refund, and acceptable-use pages
- Verified production metrics, legal company information, domains, email
  addresses, and social links
- Production deployment, HTTPS, monitoring, backups, and CI checks

## Recommended implementation order

1. Finalize the audience, domain, official emails, legal details, pricing, and
   whether tools are demo or live.
2. Create and configure a Supabase project with email/password authentication.
3. Wire sign-up, sign-in, logout, sessions, email verification, and password
   recovery.
4. Add a `profiles` table with Row Level Security policies.
5. Build the protected user dashboard.
6. Define request/response contracts and providers for each security tool.
7. Implement and verify the tools one at a time.
8. Store authenticated lookup history and enforce plan limits.
9. Persist contact/demo leads with validation and spam protection.
10. Add an admin/analyst view with role-based access and audit logs.
11. Connect pricing entitlements and a payment provider with server-verified
    webhooks.
12. Replace placeholder content and add legal/SEO assets.
13. Perform security hardening and multi-account authorization tests.
14. Run full route, mobile, auth, tool, form, payment, and production smoke
    tests before deployment.

## Supabase credential safety

Only the Supabase project URL and public anon/publishable key belong in
browser-side configuration. Never commit or share a Supabase service-role key,
secret key, database password, or personal access token. Use environment
variables for all server-side secrets.

## Project structure

```text
.
├── index.html
├── about.html
├── services/
├── tools/
├── blog/
├── media/
├── uploads/
├── _next/static/
├── server.js
└── package.json
```

## Branding

The site is branded as **NorthCypher**. The repository folder retains its
original local snapshot path, but the rendered site copy and metadata use the
new brand.
