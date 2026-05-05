import { FC, Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { Navbar } from "./components";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const HomePage = lazy(() => import("./pages/HomePage"));
const SeoAudit = lazy(() => import("./components/SeoAudit"));
const ThankYou = lazy(() => import("./components/ThankYou"));

type RouteMeta = {
  title: string;
  description: string;
  socialImage: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Alistair Alva | Technology Consultant & Software Developer",
    description:
      "Explore Alistair Alva's portfolio, software engineering experience, and featured projects across web, backend, and cloud systems.",
    socialImage: "/logo.svg",
  },
  "/free-seo-audit": {
    title: "Free SEO and Site Audit | Alistair Alva",
    description:
      "Request a free SEO and website audit to identify technical issues, growth opportunities, and practical next steps.",
    socialImage: "/logo.svg",
  },
  "/thank-you": {
    title: "Thank You | SEO Audit Request Received",
    description:
      "Your SEO and site audit request has been received. Alistair will review your details and follow up with next steps.",
    socialImage: "/logo.svg",
  },
};

const seoAuditFaq: FaqItem[] = [
  {
    question: "What do I get in the free SEO audit?",
    answer:
      "You get a practical review of technical SEO, content opportunities, and prioritized next steps for growth.",
  },
  {
    question: "How long does the SEO audit take?",
    answer:
      "Audit delivery times depend on website size and complexity, but requests are typically reviewed promptly after submission.",
  },
  {
    question: "Who is this SEO audit for?",
    answer:
      "It is designed for startups, local businesses, and growing brands that want clear SEO improvements and faster execution.",
  },
];

const upsertMetaTag = (
  selector: string,
  attrName: "name" | "property",
  attrValue: string,
  content: string,
) => {
  let tag = document.querySelector(selector) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const RouteMetadata: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const selectedMeta = routeMeta[pathname] || routeMeta["/"];
    const baseUrl = window.location.origin;
    const canonicalUrl = `${baseUrl}${pathname}`;
    const robotsDirective =
      pathname === "/thank-you" ? "noindex, nofollow" : "index, follow";

    document.title = selectedMeta.title;

    upsertMetaTag(
      'meta[name="description"]',
      "name",
      "description",
      selectedMeta.description,
    );
    upsertMetaTag('meta[name="robots"]', "name", "robots", robotsDirective);
    upsertMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    upsertMetaTag(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      "Alistair Alva Portfolio",
    );
    upsertMetaTag(
      'meta[property="og:title"]',
      "property",
      "og:title",
      selectedMeta.title,
    );
    upsertMetaTag(
      'meta[property="og:description"]',
      "property",
      "og:description",
      selectedMeta.description,
    );
    upsertMetaTag(
      'meta[property="og:url"]',
      "property",
      "og:url",
      canonicalUrl,
    );
    upsertMetaTag(
      'meta[property="og:image"]',
      "property",
      "og:image",
      `${baseUrl}${selectedMeta.socialImage}`,
    );
    upsertMetaTag(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image",
    );
    upsertMetaTag(
      'meta[name="twitter:title"]',
      "name",
      "twitter:title",
      selectedMeta.title,
    );
    upsertMetaTag(
      'meta[name="twitter:description"]',
      "name",
      "twitter:description",
      selectedMeta.description,
    );
    upsertMetaTag(
      'meta[name="twitter:image"]',
      "name",
      "twitter:image",
      `${baseUrl}${selectedMeta.socialImage}`,
    );

    let canonicalTag = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", canonicalUrl);

    const websiteSchema = {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: `${baseUrl}/`,
      name: "Alistair Alva",
      description:
        "Technology consultant and software developer portfolio with engineering case studies and SEO audit services.",
      inLanguage: "en",
    };

    const webPageSchema = {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: selectedMeta.title,
      description: selectedMeta.description,
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      inLanguage: "en",
    };

    const personSchema = {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Alistair Alva",
      url: `${baseUrl}/`,
      jobTitle: "Technology Consultant & Software Developer",
      description:
        "Technology consultant and software developer focused on backend systems, cloud architecture, and growth-oriented web delivery.",
      image: `${baseUrl}/logo.svg`,
      knowsAbout: [
        "Backend Development",
        "Web Development",
        "Cloud Architecture",
        "SEO",
      ],
    };

    const serviceSchema = {
      "@type": "Service",
      "@id": `${baseUrl}/free-seo-audit#service`,
      name: "Free SEO and Site Audit",
      description:
        "A practical SEO and website audit that identifies technical issues, content opportunities, and next-step priorities.",
      provider: {
        "@id": `${baseUrl}/#person`,
      },
      areaServed: "Worldwide",
      serviceType: "SEO Audit",
      url: `${baseUrl}/free-seo-audit`,
    };

    const faqSchema = {
      "@type": "FAQPage",
      "@id": `${baseUrl}/free-seo-audit#faq`,
      mainEntity: seoAuditFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    const graph =
      pathname === "/free-seo-audit"
        ? [websiteSchema, webPageSchema, personSchema, serviceSchema, faqSchema]
        : [websiteSchema, webPageSchema, personSchema];

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": graph,
    };

    const existingScript = document.getElementById("route-structured-data");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "route-structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [pathname]);

  return null;
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <RouteMetadata />
      <header>
        <Navbar />
      </header>
      <Suspense
        fallback={
          <main
            id="main-content"
            className="relative z-0 bg-primary min-h-screen"
            aria-busy="true"
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/free-seo-audit" element={<SeoAudit />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
