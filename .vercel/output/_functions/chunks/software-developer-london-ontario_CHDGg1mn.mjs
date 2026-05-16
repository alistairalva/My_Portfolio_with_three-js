import { c as createComponent } from './astro-component_csqRG9yS.mjs';
import 'piccolore';
import { r as renderComponent, t as renderTemplate, p as maybeRenderHead, j as addAttribute } from './entrypoint_BqpO-GVD.mjs';
import { $ as $$BaseLayout, A as AstroNavbar, a as styles } from './AstroNavbar_Csw12Y4D.mjs';

const $$SoftwareDeveloperLondonOntario = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SoftwareDeveloperLondonOntario;
  const baseUrl = "https://alistairalva.com";
  const canonicalUrl = `${baseUrl}/software-developer-london-ontario`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Software Developer in London, Ontario | Alistair Alva",
        description: "Software developer and technology consultant for teams in London, Ontario, delivering backend architecture, web platforms, and cloud-ready systems.",
        inLanguage: "en",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        }
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Software Development Services in London, Ontario",
        provider: {
          "@id": `${baseUrl}/#person`
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "London, Ontario",
          containedInPlace: {
            "@type": "Country",
            name: "Canada"
          }
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
            name: "Software Developer in London, Ontario",
            item: canonicalUrl
          }
        ]
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Software Developer in London, Ontario | Alistair Alva", "description": "Software developer and technology consultant for teams in London, Ontario, delivering backend architecture, web platforms, and cloud-ready systems.", "canonicalPath": "/software-developer-london-ontario", "socialImage": "/og/home.svg", "socialImageAlt": "Software developer services in London, Ontario by Alistair Alva", "keywords": "software developer london ontario, web developer london ontario, backend developer london ontario, technology consultant london ontario", "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AstroNavbar", AstroNavbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/AstroNavbar", "client:component-export": "default" })} ${maybeRenderHead()}<main id="main-content" class="relative z-0 bg-primary min-h-screen" aria-label="Software developer in London Ontario page"> <div${addAttribute(`${styles.paddingX} pt-28 pb-16`, "class")}> <section class="mx-auto w-full max-w-4xl bg-black-100 p-8 sm:p-10 rounded-2xl"> <p${addAttribute(styles.sectionSubText, "class")}>Location Focus</p> <h1${addAttribute(styles.sectionHeadText, "class")}>Software Developer in London, Ontario</h1> <p class="mt-4 text-secondary text-[16px] leading-[30px]">
If your team is searching for a software developer in London, Ontario, I can help you
          deliver backend-heavy products with reliable architecture and clean execution.
          I work across product planning, API development, cloud infrastructure, and performance
          optimization.
</p> <p class="mt-4 text-secondary text-[16px] leading-[30px]">
I support startups and businesses that need practical technical leadership, fast delivery,
          and maintainable systems. Typical engagements include MVP development, backend scaling,
          modernization of existing systems, and technical SEO improvements for growth.
</p> <div class="mt-8 flex flex-wrap gap-4"> <a href="/free-seo-audit" class="bg-tertiary py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl">
Request a Free SEO Audit
</a> <a href="/#contact" class="bg-black py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl border border-white/20">
Contact Me
</a> </div> </section> </div> </main> ` })}`;
}, "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/software-developer-london-ontario.astro", void 0);

const $$file = "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/software-developer-london-ontario.astro";
const $$url = "/software-developer-london-ontario";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$SoftwareDeveloperLondonOntario,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
