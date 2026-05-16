/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_AUDIT_API_URL?: string;
  readonly PUBLIC_EMAILJS_SERVICE_ID?: string;
  readonly PUBLIC_EMAILJS_TEMPLATE_ID?: string;
  readonly PUBLIC_EMAILJS_PUBLIC_API_KEY?: string;
  readonly AUDIT_APPS_SCRIPT_URL?: string;
  readonly AUDIT_ALLOWED_ORIGINS?: string;
  readonly VITE_AUDIT_API_URL?: string;
  readonly VITE_APP_EMAILJS_SERVICE_ID?: string;
  readonly VITE_APP_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_APP_EMAILJS_PUBLIC_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
