import { c as createComponent } from './astro-component_UNYrH44a.mjs';
import 'piccolore';
import { r as renderComponent, t as renderTemplate, p as maybeRenderHead, j as addAttribute } from './entrypoint_NAxb33b7.mjs';
import { $ as $$BaseLayout, A as AstroNavbar, a as styles } from './AstroNavbar_gwgbQUY6.mjs';
import { useEffect } from 'react';
import { track } from '@vercel/analytics';

const ThankYouTracker = () => {
  useEffect(() => {
    track("SEO Audit Thank You Viewed");
  }, []);
  return null;
};

const $$ThankYou = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ThankYou;
  const baseUrl = "https://alistairalva.com";
  const canonicalUrl = `${baseUrl}/thank-you`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Alistair Alva",
        inLanguage: "en"
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Thank You | SEO Audit Request Received",
        description: "Your SEO and site audit request has been received. Alistair will review your details and follow up with next steps.",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        },
        inLanguage: "en",
        primaryImageOfPage: `${baseUrl}/og/thank-you.svg`
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Thank You | SEO Audit Request Received", "description": "Your SEO and site audit request has been received. Alistair will review your details and follow up with next steps.", "canonicalPath": "/thank-you", "socialImage": "/og/thank-you.svg", "socialImageAlt": "Thank you page confirming SEO audit request submission", "keywords": "seo audit request confirmation, thank you page", "noIndex": true, "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AstroNavbar", AstroNavbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/AstroNavbar", "client:component-export": "default" })} ${maybeRenderHead()}<main id="main-content" class="relative z-0 bg-primary min-h-screen" aria-label="Thank you page"> <div${addAttribute(`${styles.paddingX} pt-28 pb-16`, "class")}> <section class="mx-auto w-full max-w-3xl bg-black-100 p-8 sm:p-10 rounded-2xl text-center"> <p${addAttribute(styles.sectionSubText, "class")}>Request Received</p> <h1${addAttribute(styles.sectionHeadText, "class")}>Thank You.</h1> <p class="mt-4 text-secondary text-[16px] leading-[28px]">
Your free SEO and site audit request has been submitted. I will review your details and
          reach out with next steps.
</p> <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center"> <a href="/" class="bg-tertiary py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl">
Back to Home
</a> <a href="/free-seo-audit" class="bg-black py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl border border-white/20">
Submit Another Request
</a> </div> </section> </div> </main> ${renderComponent($$result2, "ThankYouTracker", ThankYouTracker, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/ThankYouTracker", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/thank-you.astro", void 0);

const $$file = "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThankYou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
