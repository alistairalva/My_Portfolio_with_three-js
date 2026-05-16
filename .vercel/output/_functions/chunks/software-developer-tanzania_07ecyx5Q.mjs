import { c as createComponent } from './astro-component_csqRG9yS.mjs';
import 'piccolore';
import { r as renderComponent, t as renderTemplate, p as maybeRenderHead, j as addAttribute } from './entrypoint_BqpO-GVD.mjs';
import { $ as $$BaseLayout, A as AstroNavbar, a as styles } from './AstroNavbar_Csw12Y4D.mjs';

const $$SoftwareDeveloperTanzania = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SoftwareDeveloperTanzania;
  const baseUrl = "https://alistairalva.com";
  const canonicalUrl = `${baseUrl}/software-developer-tanzania`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Software Developer in Tanzania | Alistair Alva",
        description: "Software developer and technology consultant for businesses in Tanzania, focused on backend systems, web platforms, and scalable cloud architecture.",
        inLanguage: "en",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Software Development Services in Tanzania",
        provider: {
          "@id": `${baseUrl}/#person`
        },
        areaServed: {
          "@type": "Country",
          name: "Tanzania"
        },
        serviceType: [
          "Software Development",
          "Backend Engineering",
          "Web Development"
        ],
        url: canonicalUrl
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Software Developer in Tanzania",
            item: canonicalUrl
          }
        ]
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Software Developer in Tanzania | Alistair Alva", "description": "Software developer and technology consultant for businesses in Tanzania, focused on backend systems, web platforms, and scalable cloud architecture.", "canonicalPath": "/software-developer-tanzania", "socialImage": "/og/home.svg", "socialImageAlt": "Software developer services in Tanzania by Alistair Alva", "keywords": "software developer tanzania, web developer tanzania, backend developer tanzania, technology consultant tanzania", "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AstroNavbar", AstroNavbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/AstroNavbar", "client:component-export": "default" })} ${maybeRenderHead()}<main id="main-content" class="relative z-0 bg-primary min-h-screen" aria-label="Software developer in Tanzania page"> <div${addAttribute(`${styles.paddingX} pt-28 pb-16`, "class")}> <section class="mx-auto w-full max-w-4xl bg-black-100 p-8 sm:p-10 rounded-2xl"> <p${addAttribute(styles.sectionSubText, "class")}>Location Focus</p> <h1${addAttribute(styles.sectionHeadText, "class")}>Software Developer in Tanzania</h1> <p class="mt-4 text-secondary text-[16px] leading-[30px]">
If you are looking for a software developer in Tanzania, I help teams design, build,
          and scale reliable digital products. My work focuses on backend systems, API
          architecture, cloud deployment, and performance optimization for growth-stage products.
</p> <p class="mt-4 text-secondary text-[16px] leading-[30px]">
I support startups and established businesses with practical execution, clear technical
          planning, and measurable outcomes. Engagements can cover product MVP delivery,
          legacy-system modernization, SEO-focused technical improvements, and long-term
          engineering support.
</p> <div class="mt-8 flex flex-wrap gap-4"> <a href="/free-seo-audit" class="bg-tertiary py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl">
Request a Free SEO Audit
</a> <a href="/#contact" class="bg-black py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl border border-white/20">
Contact Me
</a> </div> </section> </div> </main> ` })}`;
}, "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/software-developer-tanzania.astro", void 0);

const $$file = "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/software-developer-tanzania.astro";
const $$url = "/software-developer-tanzania";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SoftwareDeveloperTanzania,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
