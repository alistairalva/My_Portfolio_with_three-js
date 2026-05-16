import { c as createComponent } from './astro-component_csqRG9yS.mjs';
import 'piccolore';
import { r as renderComponent, t as renderTemplate } from './entrypoint_BqpO-GVD.mjs';
import { a as styles, $ as $$BaseLayout, A as AstroNavbar } from './AstroNavbar_Csw12Y4D.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { track } from '@vercel/analytics';
import { s as slideIn, T as ToastHost } from './ToastHost_DnYxOdd8.mjs';
import StarsCanvas from './Stars_Cls4BoDU.mjs';

const seoAuditFaq = [
  {
    question: "What do I get in the free SEO audit?",
    answer: "You get a practical review of technical SEO, content opportunities, and prioritized next steps for growth."
  },
  {
    question: "How long does the SEO audit take?",
    answer: "Audit delivery times depend on website size and complexity, but requests are typically reviewed promptly after submission."
  },
  {
    question: "Who is this SEO audit for?",
    answer: "It is designed for startups, local businesses, and growing brands that want clear SEO improvements and faster execution."
  }
];

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://alistairalva.com", "SSR": true};
const initialForm = {
  fullName: "",
  businessEmail: "",
  companyName: "",
  websiteUrl: "",
  industry: "",
  primaryGoals: "",
  monthlyTrafficEstimate: "",
  targetAudience: "",
  topCompetitors: "",
  mainChallenges: "",
  timelineUrgency: "",
  preferredContactMethod: ""
};
const inputClassName = "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none focus-visible:ring-2 focus-visible:ring-[#915eff]";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_FORM_COMPLETION_MS = 3e3;
const isValidWebsiteUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};
const getValidationMessage = (form) => {
  const hasMissingFields = Object.values(form).some(
    (value) => value.trim().length === 0
  );
  if (hasMissingFields) {
    return "Please fill out all fields";
  }
  if (form.fullName.trim().length < 2) {
    return "Please enter your full name";
  }
  if (!EMAIL_REGEX.test(form.businessEmail.trim())) {
    return "Please enter a valid email address";
  }
  if (!isValidWebsiteUrl(form.websiteUrl.trim())) {
    return "Please enter a valid website URL (including http or https)";
  }
  return null;
};
const SeoAudit = () => {
  const formStartedAtRef = useRef(Date.now());
  const [form, setForm] = useState(initialForm);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5e3,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: void 0,
    theme: "colored"
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessage = getValidationMessage(form);
    if (validationMessage) {
      toast.warn(validationMessage, toastOptions);
      return;
    }
    const completionTimeMs = Date.now() - formStartedAtRef.current;
    if (website.trim().length > 0 || completionTimeMs < MIN_FORM_COMPLETION_MS) {
      track("SEO Audit Spam Blocked", {
        reason: website.trim().length > 0 ? "honeypot" : "completed_too_fast",
        completion_time_ms: completionTimeMs
      });
      toast.warn("Please wait a moment and try again.", toastOptions);
      return;
    }
    setLoading(true);
    try {
      const env = Object.assign(__vite_import_meta_env__, { VITE_AUDIT_API_URL: "https://script.google.com/macros/s/AKfycbyvllrLi2T_6X9tnA-h_-7Bm1MLZmpPwrWyQVc92GXphlZSvgNZqVLHJWTfT3oJ5oBh/exec", OS: "Windows_NT", PUBLIC: "C:\\Users\\Public" });
      const localDevAuditEndpoint = env.PUBLIC_AUDIT_API_URL || env.VITE_AUDIT_API_URL;
      const endpoint = Boolean(env.DEV) && localDevAuditEndpoint ? localDevAuditEndpoint : "/api/audit-requests";
      const payload = {
        ...form,
        website,
        clientCompletionMs: completionTimeMs,
        source: "portfolio-seo-audit",
        submittedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const isExternalEndpoint = /^https?:\/\//i.test(endpoint);
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(payload)
      };
      if (!isExternalEndpoint) {
        requestOptions.headers = {
          "Content-Type": "application/json"
        };
      }
      const response = await fetch(endpoint, requestOptions);
      const result = await response.json().catch(() => ({ success: response.ok }));
      if (!response.ok || result?.success === false) {
        const message = result?.message || `Audit request failed with status ${response.status}`;
        throw new Error(message);
      }
      setForm(initialForm);
      setWebsite("");
      formStartedAtRef.current = Date.now();
      track("SEO Audit Form Submitted", {
        timeline: form.timelineUrgency,
        preferred_contact: form.preferredContactMethod,
        industry: form.industry.slice(0, 80)
      });
      toast.success(
        "Request sent. Redirecting to your confirmation page...",
        toastOptions
      );
      window.location.assign("/thank-you");
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not submit your audit request right now. Please try again.",
        toastOptions
      );
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(
    "main",
    {
      id: "main-content",
      className: "relative z-0 bg-primary min-h-screen",
      "aria-label": "Free SEO audit form",
      children: [
        /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx("div", { className: `${styles.paddingX} pt-28 pb-16`, children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            variants: slideIn("left", "tween", 0.2, 0.5),
            initial: "hidden",
            animate: "show",
            className: "mx-auto w-full max-w-5xl bg-black-100 p-6 sm:p-8 rounded-2xl",
            children: [
              /* @__PURE__ */ jsx("h1", { className: styles.sectionSubText, children: "Free SEO and Site Audit" }),
              /* @__PURE__ */ jsx("h2", { id: "seo-audit-heading", className: styles.sectionHeadText, children: "Tell Me About Your Site." }),
              /* @__PURE__ */ jsx("p", { className: "mt-4 text-secondary text-[16px] leading-[28px]", children: "Share your current website details and goals. You will receive a practical audit focused on technical SEO, content opportunities, and high-impact actions you can take first." }),
              /* @__PURE__ */ jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  "aria-labelledby": "seo-audit-heading",
                  className: "mt-10 flex flex-col gap-6",
                  noValidate: true,
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        "aria-hidden": "true",
                        className: "absolute -left-[9999px] top-auto w-px h-px overflow-hidden",
                        children: [
                          /* @__PURE__ */ jsx("label", { htmlFor: "website", children: "Website" }),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              id: "website",
                              type: "text",
                              name: "website",
                              value: website,
                              onChange: (e) => setWebsite(e.target.value),
                              autoComplete: "off",
                              tabIndex: -1
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Full Name" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            name: "fullName",
                            value: form.fullName,
                            onChange: handleChange,
                            placeholder: "Your full name",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Business Email" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "email",
                            name: "businessEmail",
                            value: form.businessEmail,
                            onChange: handleChange,
                            placeholder: "you@company.com",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Company Name" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            name: "companyName",
                            value: form.companyName,
                            onChange: handleChange,
                            placeholder: "Your company",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Website URL" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "url",
                            name: "websiteUrl",
                            value: form.websiteUrl,
                            onChange: handleChange,
                            placeholder: "https://example.com",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Business Type / Industry" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            name: "industry",
                            value: form.industry,
                            onChange: handleChange,
                            placeholder: "e.g., SaaS, E-commerce, Local Services",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Monthly Traffic Estimate" }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            name: "monthlyTrafficEstimate",
                            value: form.monthlyTrafficEstimate,
                            onChange: handleChange,
                            placeholder: "e.g., 1k-5k visits",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col md:col-span-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Primary Goals (traffic, leads, sales)" }),
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            rows: 4,
                            name: "primaryGoals",
                            value: form.primaryGoals,
                            onChange: handleChange,
                            placeholder: "What outcomes are you trying to improve?",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col md:col-span-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Target Audience" }),
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            rows: 3,
                            name: "targetAudience",
                            value: form.targetAudience,
                            onChange: handleChange,
                            placeholder: "Who are your ideal customers?",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col md:col-span-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Top Competitors" }),
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            rows: 3,
                            name: "topCompetitors",
                            value: form.topCompetitors,
                            onChange: handleChange,
                            placeholder: "List up to 3 competitor websites",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col md:col-span-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Main Challenges / Issues" }),
                        /* @__PURE__ */ jsx(
                          "textarea",
                          {
                            rows: 4,
                            name: "mainChallenges",
                            value: form.mainChallenges,
                            onChange: handleChange,
                            placeholder: "What problems are you seeing today?",
                            className: inputClassName,
                            required: true
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Timeline / Urgency" }),
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            name: "timelineUrgency",
                            value: form.timelineUrgency,
                            onChange: handleChange,
                            className: inputClassName,
                            required: true,
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "", children: "Select a timeline" }),
                              /* @__PURE__ */ jsx("option", { value: "asap", children: "ASAP" }),
                              /* @__PURE__ */ jsx("option", { value: "2-4-weeks", children: "2-4 weeks" }),
                              /* @__PURE__ */ jsx("option", { value: "1-3-months", children: "1-3 months" }),
                              /* @__PURE__ */ jsx("option", { value: "just-exploring", children: "Just exploring" })
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-3", children: "Preferred Contact Method" }),
                        /* @__PURE__ */ jsxs(
                          "select",
                          {
                            name: "preferredContactMethod",
                            value: form.preferredContactMethod,
                            onChange: handleChange,
                            className: inputClassName,
                            required: true,
                            children: [
                              /* @__PURE__ */ jsx("option", { value: "", children: "Select a contact method" }),
                              /* @__PURE__ */ jsx("option", { value: "email", children: "Email" }),
                              /* @__PURE__ */ jsx("option", { value: "whatsapp", children: "WhatsApp" }),
                              /* @__PURE__ */ jsx("option", { value: "zoom", children: "Zoom" })
                            ]
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl focus-visible:ring-2 focus-visible:ring-[#915eff]",
                        disabled: loading,
                        children: loading ? "Submitting..." : "Submit"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("section", { className: "mt-12", "aria-labelledby": "seo-audit-faq-heading", children: [
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    id: "seo-audit-faq-heading",
                    className: "text-white font-bold text-[28px]",
                    children: "Frequently Asked Questions"
                  }
                ),
                /* @__PURE__ */ jsx("dl", { className: "mt-6 space-y-5", children: seoAuditFaq.map((item) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "bg-tertiary rounded-lg p-5",
                    children: [
                      /* @__PURE__ */ jsx("dt", { className: "text-white font-semibold text-[17px]", children: item.question }),
                      /* @__PURE__ */ jsx("dd", { className: "mt-2 text-secondary leading-[28px]", children: item.answer })
                    ]
                  },
                  item.question
                )) })
              ] })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsx(StarsCanvas, {})
      ]
    }
  );
};

const $$FreeSeoAudit = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FreeSeoAudit;
  const baseUrl = "https://alistairalva.com";
  const canonicalUrl = `${baseUrl}/free-seo-audit`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Alistair Alva",
        description: "Technology consultant and software developer portfolio with engineering case studies and SEO audit services.",
        inLanguage: "en"
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Free SEO and Site Audit | Alistair Alva",
        description: "Request a free SEO and website audit to identify technical issues, growth opportunities, and practical next steps.",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        },
        inLanguage: "en",
        primaryImageOfPage: `${baseUrl}/og/seo-audit.svg`
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Alistair Alva",
        url: `${baseUrl}/`,
        jobTitle: "Technology Consultant & Software Developer"
      },
      {
        "@type": "Service",
        "@id": `${canonicalUrl}#service`,
        name: "Free SEO and Site Audit",
        description: "A practical SEO and website audit that identifies technical issues, content opportunities, and next-step priorities.",
        provider: {
          "@id": `${baseUrl}/#person`
        },
        areaServed: "Worldwide",
        serviceType: "SEO Audit",
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
            name: "Free SEO Audit",
            item: canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: seoAuditFaq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Free SEO and Site Audit | Alistair Alva", "description": "Request a free SEO and website audit to identify technical issues, growth opportunities, and practical next steps.", "canonicalPath": "/free-seo-audit", "socialImage": "/og/seo-audit.svg", "socialImageAlt": "Free SEO and site audit service page by Alistair Alva", "keywords": "free seo audit, technical seo, seo consultant, site audit, search optimization, geo optimization", "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AstroNavbar", AstroNavbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/AstroNavbar", "client:component-export": "default" })} ${renderComponent($$result2, "SeoAudit", SeoAudit, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/SeoAudit", "client:component-export": "default" })} ${renderComponent($$result2, "ToastHost", ToastHost, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/ToastHost", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/free-seo-audit.astro", void 0);

const $$file = "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/free-seo-audit.astro";
const $$url = "/free-seo-audit";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FreeSeoAudit,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
