# SEO Audit Google Sheets Backend Setup

This project sends SEO audit submissions to `/api/audit-requests`.
The Vercel API route forwards requests to Google Apps Script.
To store submissions in Google Sheets, deploy the Apps Script endpoint in [google-apps-script/audit-requests.gs](../google-apps-script/audit-requests.gs).

## 1) Create the destination sheet

1. Create a new Google Sheet.
2. Copy its Spreadsheet ID from the URL.
3. Open the Apps Script editor from `Extensions -> Apps Script`.

## 2) Deploy the Apps Script endpoint

1. Replace `SPREADSHEET_ID` in [google-apps-script/audit-requests.gs](../google-apps-script/audit-requests.gs).
2. Paste the full script into Apps Script.
3. Click `Deploy -> New deployment`.
4. Choose `Web app`.
5. Execute as: `Me`.
6. Who has access: `Anyone`.
7. Deploy and copy the `Web app URL` ending with `/exec`.

## 3) Configure Vercel environment variables

In Vercel project settings, add:

```env
AUDIT_APPS_SCRIPT_URL=https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec
AUDIT_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

Then redeploy.

Local development options:

- Preferred: use `vercel dev` so `/api/audit-requests` runs locally.
- Optional fallback: set `AUDIT_APPS_SCRIPT_URL` only in local `.env` for direct testing with `npm run dev`.

## 4) Test submission

1. Open `/free-seo-audit`.
2. Submit the form.
3. Confirm a new row appears in the `AuditRequests` tab.

## Notes

- The frontend no longer calls Apps Script directly in production; it uses the same-origin Vercel API route.
- Required field validation is performed on the client and repeated in the Apps Script endpoint.
- Anti-spam protections are now enforced both client-side and server-side:
  - Honeypot trap (`website`)
  - Minimum completion-time gate
  - Duplicate submission cooldown (10 minutes) based on email + website URL
- The Vercel API route also enforces origin checks and rate limiting before forwarding.
- Every Apps Script change requires a new Apps Script deployment version before it is live.
