# Astro Portfolio

This repository hosts alistairalva.com and is now built with Astro plus React islands for interactive sections such as forms and Three.js canvases.

## Stack

- Astro 6
- React 19 (islands only)
- Tailwind CSS 4
- TypeScript 6
- Vercel server adapter

## Scripts

- npm run dev: start local Astro dev server
- npm run build: production build
- npm run preview: preview built output
- npm run check: Astro type and diagnostics
- npm run lint: ESLint 10 flat-config lint for source TypeScript files
- npm run optimize:images: image optimization helper
- npm run optimize:model: Three.js model optimization helper

## SEO Audit Backend

The free SEO audit form posts to /api/audit-requests.
That Astro API route forwards validated submissions to the Google Apps Script endpoint set in AUDIT_APPS_SCRIPT_URL.

For Google Sheets setup details, see:

- docs/seo-audit-google-sheet-setup.md

For deployment details, see:

- docs/vercel-deployment-guide.md
