# Vercel Deployment Guide (Portfolio + SEO Audit Form)

This app is deployed as a Vite static site on Vercel, while SEO audit submissions are stored via a Google Apps Script endpoint.

## 1) Prerequisites

1. You have a Vercel account and this repo connected.
2. You have deployed your Google Apps Script Web App URL (`.../exec`).
3. You have updated `SPREADSHEET_ID` in [google-apps-script/audit-requests.gs](../google-apps-script/audit-requests.gs).

## 2) Vercel project settings

Use these defaults in Vercel:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## 3) Environment variables (Vercel)

In `Project Settings -> Environment Variables`, add:

- `VITE_AUDIT_API_URL`: your Google Apps Script `.../exec` URL
- `VITE_APP_EMAILJS_SERVICE_ID`
- `VITE_APP_EMAILJS_TEMPLATE_ID`
- `VITE_APP_EMAILJS_PUBLIC_API_KEY`
- `VITE_APP_EMAIL`

After changing env vars, redeploy.

## 4) Client-side route support

This repo includes [vercel.json](../vercel.json) with SPA rewrites so direct visits work for:

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
5. Check Vercel Analytics events for:
   - `SEO Audit Form Submitted`
   - `SEO Audit Thank You Viewed`

## 7) Troubleshooting

- If form submission fails immediately:
  - Confirm `VITE_AUDIT_API_URL` ends with `/exec`.
  - Ensure Apps Script deployment access is `Anyone`.
  - Redeploy Vercel after updating env vars.
- If Google Sheet is not receiving rows:
  - Confirm the Spreadsheet ID in Apps Script.
  - Confirm script deployment is the latest version after edits.
- If route refresh shows 404:
  - Confirm [vercel.json](../vercel.json) exists in repo root and redeploy.
