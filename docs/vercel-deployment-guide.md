# Vercel Deployment Guide (Portfolio + SEO Audit Form)

This app is deployed as an Astro server build on Vercel, and SEO audit submissions are relayed through an Astro API route to a Google Apps Script endpoint.

## 1) Prerequisites

1. You have a Vercel account and this repo connected.
2. You have deployed your Google Apps Script Web App URL (`.../exec`).
3. You have updated `SPREADSHEET_ID` in [google-apps-script/audit-requests.gs](../google-apps-script/audit-requests.gs).

## 2) Vercel project settings

Use these defaults in Vercel:

- Framework Preset: `Astro`
- Build Command: `npm run build`
- Output Directory: leave default for Astro
- Install Command: `npm install`

## 3) Environment variables (Vercel)

In `Project Settings -> Environment Variables`, add:

- `AUDIT_APPS_SCRIPT_URL`: your Google Apps Script `.../exec` URL
- `AUDIT_ALLOWED_ORIGINS`: comma-separated trusted origins (for example `https://your-domain.com,https://www.your-domain.com`)
- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_PUBLIC_API_KEY`

Compatibility note:

- The current form code also accepts legacy VITE*APP_EMAILJS*\* variable names during migration.

After changing env vars, redeploy.

Notes:

- Do not expose the Apps Script URL as a client variable in production.
- The frontend posts to `/api/audit-requests` and the Astro API route forwards to Apps Script.
- Optional for local development: set `AUDIT_APPS_SCRIPT_URL` only in local `.env` if you are using `npm run dev` instead of `vercel dev`.

## 4) Client-side route support

Astro uses file-based routing and server output, so direct visits work without SPA rewrites for:

- `/free-seo-audit`
- `/thank-you`

## 5) Deploy

1. Push to your connected branch (for example `master`).
2. Wait for Vercel deployment to complete.
3. Open your Vercel domain and test these routes directly.

## 6) Post-deploy verification checklist

1. Open `/free-seo-audit` directly in a new tab (no 404).
2. Submit a valid form and confirm redirect to `/thank-you`.
3. Verify a new row appears in your Google Sheet.
4. Submit rapidly or duplicate quickly and confirm anti-spam rejection.
5. Confirm `/api/audit-requests` returns `405` for `GET` (route is active and method-protected).
6. Check Vercel Analytics events for:
   - `SEO Audit Form Submitted`
   - `SEO Audit Thank You Viewed`

## 7) Troubleshooting

- If form submission fails immediately:
  - Confirm `AUDIT_APPS_SCRIPT_URL` ends with `/exec`.
  - Confirm `AUDIT_ALLOWED_ORIGINS` includes your deployed domain.
  - Ensure Apps Script deployment access is `Anyone`.
  - Redeploy Vercel after updating env vars.
- If Google Sheet is not receiving rows:
  - Confirm the Spreadsheet ID in Apps Script.
  - Confirm script deployment is the latest version after edits.
- If route refresh shows 404:
  - Confirm Astro build completed successfully and redeploy.
