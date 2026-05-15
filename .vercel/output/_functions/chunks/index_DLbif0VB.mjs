import { c as createComponent } from './astro-component_Gdpiq1Oo.mjs';
import 'piccolore';
import { r as renderComponent, t as renderTemplate } from './entrypoint_DzxMRv0R.mjs';
import { a as styles, s as services, p as projects, $ as $$BaseLayout, A as AstroNavbar } from './AstroNavbar_B75kH4Ct.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { lazy, useState, useEffect, Suspense, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { a as staggerContainer, t as textVariant, f as fadeIn, T as ToastHost } from './ToastHost_DnYxOdd8.mjs';

const SectionWrapper = (Component, idName) => {
  const HOC = () => {
    const sectionId = idName?.trim();
    return /* @__PURE__ */ jsx(
      motion.section,
      {
        id: sectionId || void 0,
        "aria-label": sectionId ? `${sectionId} section` : "portfolio section",
        variants: staggerContainer(),
        initial: "hidden",
        animate: "show",
        className: `${styles.padding} scroll-mt-24 max-w-7xl mx-auto relative z-0`,
        children: /* @__PURE__ */ jsx(Component, {})
      }
    );
  };
  return HOC;
};

const ServiceCard = ({ index, title, icon }) => {
  return /* @__PURE__ */ jsx(
    Tilt,
    {
      tiltMaxAngleX: 45,
      tiltMaxAngleY: 45,
      scale: 1,
      transitionSpeed: 450,
      className: "xs:w-[250px] w-full",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          variants: fadeIn("right", "spring", 0.5 * index, 0.75),
          className: "w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card",
          children: /* @__PURE__ */ jsxs("div", { className: "bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: icon,
                alt: title,
                className: "w-16 h-16 object contain mb-4",
                loading: "lazy",
                decoding: "async"
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-white text-[20px] font-bold text-center", children: title })
          ] })
        }
      )
    }
  );
};
const About = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(0), children: [
      /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Introduction" }),
      /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Overview" })
    ] }),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        variants: fadeIn("", "", 0.1, 1),
        className: "mt-4 text-secondary text-[17px] mx-w-3xl leading-[30px]",
        children: "I'm a technology consultant and software developer with a strong focus on backend architecture for web, mobile, and desktop applications. I specialize in building scalable, high-performance systems with clean APIs and strong data integrity. Over the past few years, I've worked with startups and enterprises across industries like FinTech, real estate, and fitness, delivering everything from MVPs to enterprise-grade infrastructure. I've also consulted on business operations and helped teams improve efficiency, reduce costs, and build strong technical foundations. I'm a quick learner, passionate about clean code, and always exploring new technologies. My goal is to build meaningful software that drives results — and to collaborate with teams that care about impact and craftsmanship. Let's build something great together! 🚀"
      }
    ),
    /* @__PURE__ */ jsx("ul", { className: "mt-20 flex flex-wrap gap-10 list-none", children: services.map((service, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ServiceCard, { index, ...service }) }, service.title)) })
  ] });
};
const AboutSection = SectionWrapper(About, "about");

const heroBg = new Proxy({"src":"/_astro/herobg.DIlOjKkU.webp","width":1600,"height":870,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/assets/herobg.webp";
							}
							
							return target[name];
						}
					});

const heroBgMobile = new Proxy({"src":"/_astro/herobg-mobile.B6JNJd4l.webp","width":640,"height":348,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/assets/herobg-mobile.webp";
							}
							
							return target[name];
						}
					});

const toAssetUrl = (asset) => {
  if (typeof asset === "string") {
    return asset;
  }
  if (typeof asset?.src === "string") {
    return asset.src;
  }
  if (typeof asset?.default === "string") {
    return asset.default;
  }
  if (asset?.default && typeof asset.default === "object" && typeof asset.default.src === "string") {
    return asset.default.src;
  }
  return "";
};
const heroBgUrl = toAssetUrl(heroBg);
const heroBgMobileUrl = toAssetUrl(heroBgMobile);
const ComputersCanvas = lazy(() => import('./Computers_DbvEGyR0.mjs'));
const Hero = () => {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const connection = navigator.connection;
    const isLowPerfDevice = motionQuery.matches || mobileQuery.matches || Boolean(connection?.saveData) || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
    if (isLowPerfDevice) {
      return;
    }
    const scheduleRender = () => setShouldRenderCanvas(true);
    const idleWindow = window;
    let timeoutId;
    let idleId;
    const startDeferredRender = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(scheduleRender, {
          timeout: 2600
        });
        return;
      }
      timeoutId = setTimeout(scheduleRender, 2200);
    };
    if (document.readyState === "complete") {
      startDeferredRender();
    } else {
      window.addEventListener("load", startDeferredRender, { once: true });
    }
    return () => {
      window.removeEventListener("load", startDeferredRender);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId !== void 0) {
        idleWindow.cancelIdleCallback?.(idleId);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `relative w-full mx-auto min-h-[72vh] md:h-screen overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxs("picture", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsx("source", { media: "(max-width: 768px)", srcSet: heroBgMobileUrl }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: heroBgUrl,
              alt: "",
              "aria-hidden": "true",
              fetchPriority: "high",
              loading: "eager",
              decoding: "async",
              width: 1920,
              height: 1080,
              className: "h-full w-full object-cover"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-[1] bg-primary/20",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `${styles.paddingX} pointer-events-none relative z-10 pt-[120px] pb-10 max-w-7xl mx-auto flex 
        flex-row items-start gap-5 md:absolute md:inset-0 md:top-[120px] md:pt-0 md:pb-0`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center mt-5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-[#915eff]" }),
                /* @__PURE__ */ jsx("div", { className: "w-1 sm:h-80 h-40 violet-gradient " })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h1", { className: `${styles.heroHeadText} mt-2 text-white`, children: [
                  "Hi, I'm",
                  /* @__PURE__ */ jsx("span", { className: "text-[#915eff]", children: " Alistair" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: `${styles.heroSubText} mt-2 text-white-100`, children: [
                  "I ship fast, build quick & deliver excellence.",
                  " ",
                  /* @__PURE__ */ jsx("br", { className: "sm:block hidden" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2]", children: shouldRenderCanvas ? /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(ComputersCanvas, {}) }) : null }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex absolute z-20 xs:bottom-10 bottom-32 w-full justify-center items-center", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#about",
            "aria-label": "Scroll to About section",
            className: "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Scroll to About section" }),
              /* @__PURE__ */ jsx("div", { className: "w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    y: [0, 24, 0]
                  },
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  },
                  className: "w-3 h-3 rounded-full bg-secondary mb-1"
                }
              ) })
            ]
          }
        ) })
      ]
    }
  );
};

const Experience = lazy(() => import('./Experience_-VG0UnIe.mjs'));
const Tech = lazy(() => import('./Tech_BT1A8Dsf.mjs'));
const Works = lazy(() => import('./Works_s0Td-BAW.mjs'));
const Contact = lazy(() => import('./Contact_CgPHljYG.mjs'));
const StarsCanvas = lazy(() => import('./Stars_Cls4BoDU.mjs'));
const DeferredSection = ({
  children,
  rootMargin = "250px",
  placeholderClassName = "h-16"
}) => {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    const target = containerRef.current;
    if (!target || shouldRender) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, children: shouldRender ? /* @__PURE__ */ jsx(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx("div", { className: placeholderClassName, "aria-hidden": "true" }),
      children
    }
  ) : /* @__PURE__ */ jsx("div", { className: placeholderClassName, "aria-hidden": "true" }) });
};
const HomeSections = () => {
  useEffect(() => {
    if (window.location.hash.length <= 1) {
      return;
    }
    const targetId = window.location.hash.replace("#", "");
    let animationFrameId = 0;
    let attempts = 0;
    const maxAttempts = 45;
    const scrollToSectionWhenReady = () => {
      const sectionElement = document.getElementById(targetId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        animationFrameId = window.requestAnimationFrame(
          scrollToSectionWhenReady
        );
      }
    };
    animationFrameId = window.requestAnimationFrame(scrollToSectionWhenReady);
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return /* @__PURE__ */ jsxs("main", { id: "main-content", className: "relative z-0 bg-primary", children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(AboutSection, {}),
    /* @__PURE__ */ jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "120px", children: /* @__PURE__ */ jsx(Experience, {}) }),
    /* @__PURE__ */ jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "120px", children: /* @__PURE__ */ jsx(Tech, {}) }),
    /* @__PURE__ */ jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "120px", children: /* @__PURE__ */ jsx(Works, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-0", children: [
      /* @__PURE__ */ jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "180px", children: /* @__PURE__ */ jsx(Contact, {}) }),
      /* @__PURE__ */ jsx(DeferredSection, { placeholderClassName: "h-0", rootMargin: "180px", children: /* @__PURE__ */ jsx(StarsCanvas, {}) })
    ] })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const baseUrl = "https://alistairalva.com";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Alistair Alva",
        description: "Technology consultant and software developer portfolio with engineering case studies and SEO audit services.",
        inLanguage: "en",
        potentialAction: {
          "@type": "ReadAction",
          target: [`${baseUrl}/`, `${baseUrl}/free-seo-audit`]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: `${baseUrl}/`,
        name: "Alistair Alva | Technology Consultant & Software Developer",
        description: "Explore Alistair Alva's portfolio, software engineering experience, and featured projects across web, backend, and cloud systems.",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        },
        inLanguage: "en",
        primaryImageOfPage: `${baseUrl}/og/home.svg`
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Alistair Alva",
        url: `${baseUrl}/`,
        jobTitle: "Technology Consultant & Software Developer",
        description: "Technology consultant and software developer focused on backend systems, cloud architecture, and growth-oriented web delivery.",
        image: `${baseUrl}/logo.svg`,
        sameAs: ["https://github.com/alistairalva"],
        mainEntityOfPage: {
          "@id": `${baseUrl}/#webpage`
        },
        knowsAbout: [
          "Backend Development",
          "Web Development",
          "Cloud Architecture",
          "SEO"
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/`
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#projects`,
        name: "Featured Projects",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.description,
            codeRepository: project.source_code_link,
            keywords: project.tags.map((tag) => tag.name).join(", "),
            author: {
              "@id": `${baseUrl}/#person`
            }
          }
        }))
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Alistair Alva | Technology Consultant & Software Developer", "description": "Explore Alistair Alva's portfolio, software engineering experience, and featured projects across web, backend, and cloud systems.", "canonicalPath": "/", "socialImage": "/og/home.svg", "socialImageAlt": "Alistair Alva technology consultant and software developer portfolio", "keywords": "technology consultant, software developer, backend engineer, cloud architecture, full stack developer, portfolio", "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AstroNavbar", AstroNavbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/AstroNavbar", "client:component-export": "default" })} ${renderComponent($$result2, "HomeSections", HomeSections, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/HomeSections", "client:component-export": "default" })} ${renderComponent($$result2, "ToastHost", ToastHost, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/ToastHost", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const index___astro = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  page
}, Symbol.toStringTag, { value: 'Module' }));

export { SectionWrapper as S, index___astro as i };
