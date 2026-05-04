# SEO Audit Google Sheets Backend Setup

This project sends SEO audit submissions to `VITE_AUDIT_API_URL`.
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

## 3) Configure this frontend

Add the URL to your local `.env` file:

```env
VITE_AUDIT_API_URL=https://script.google.com/macros/s/REPLACE_WITH_DEPLOYMENT_ID/exec
```

Then restart your dev server.

## 4) Test submission

1. Open `/free-seo-audit`.
2. Submit the form.
3. Confirm a new row appears in the `AuditRequests` tab.

## Notes

- The frontend sends plain JSON text to avoid unnecessary CORS preflight for Apps Script deployments.
- Required field validation is performed on the client and repeated in the Apps Script endpoint.
- Anti-spam protections are now enforced both client-side and server-side:
  - Honeypot trap (`website`)
  - Minimum completion-time gate
  - Duplicate submission cooldown (10 minutes) based on email + website URL
- Every Apps Script change requires a new Apps Script deployment version before it is live.
