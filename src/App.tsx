import { FC, Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { projects } from "./constants";
import { seoAuditFaq } from "./constants/seo";

const HomePage = lazy(() => import("./pages/HomePage"));
const SeoAudit = lazy(() => import("./components/SeoAudit"));
const ThankYou = lazy(() => import("./components/ThankYou"));

type RouteMeta = {
  title: string;
  description: string;
  socialImage: string;
  socialImageAlt: string;
  keywords: string;
};

const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Alistair Alva | Technology Consultant & Software Developer",
    description:
      "Explore Alistair Alva's portfolio, software engineering experience, and featured projects across web, backend, and cloud systems.",
    socialImage: "/og/home.svg",
    socialImageAlt:
      "Alistair Alva technology consultant and software developer portfolio",
    keywords:
      "technology consultant, software developer, backend engineer, cloud architecture, full stack developer, portfolio",
  },
  "/free-seo-audit": {
    title: "Free SEO and Site Audit | Alistair Alva",
    description:
      "Request a free SEO and website audit to identify technical issues, growth opportunities, and practical next steps.",
    socialImage: "/og/seo-audit.svg",
    socialImageAlt: "Free SEO and site audit service page by Alistair Alva",
    keywords:
      "free seo audit, technical seo, seo consultant, site audit, search optimization, geo optimization",
  },
  "/thank-you": {
    title: "Thank You | SEO Audit Request Received",
    description:
      "Your SEO and site audit request has been received. Alistair will review your details and follow up with next steps.",
    socialImage: "/og/thank-you.svg",
    socialImageAlt: "Thank you page confirming SEO audit request submission",
    keywords: "seo audit request confirmation, thank you page",
  },
};

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
    upsertMetaTag(
      'meta[name="keywords"]',
      "name",
      "keywords",
      selectedMeta.keywords,
    );
    upsertMetaTag('meta[name="author"]', "name", "author", "Alistair Alva");
    upsertMetaTag('meta[name="robots"]', "name", "robots", robotsDirective);
    upsertMetaTag(
      'meta[name="googlebot"]',
      "name",
      "googlebot",
      robotsDirective,
    );
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
      'meta[property="og:image:type"]',
      "property",
      "og:image:type",
      "image/svg+xml",
    );
    upsertMetaTag(
      'meta[property="og:image:width"]',
      "property",
      "og:image:width",
      "1200",
    );
    upsertMetaTag(
      'meta[property="og:image:height"]',
      "property",
      "og:image:height",
      "630",
    );
    upsertMetaTag(
      'meta[property="og:image:alt"]',
      "property",
      "og:image:alt",
      selectedMeta.socialImageAlt,
    );
    upsertMetaTag(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      "en_US",
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
    upsertMetaTag(
      'meta[name="twitter:image:alt"]',
      "name",
      "twitter:image:alt",
      selectedMeta.socialImageAlt,
    );
    upsertMetaTag(
      'meta[name="twitter:url"]',
      "name",
      "twitter:url",
      canonicalUrl,
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
      potentialAction: {
        "@type": "ReadAction",
        target: [`${baseUrl}/`, `${baseUrl}/free-seo-audit`],
      },
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
      primaryImageOfPage: `${baseUrl}${selectedMeta.socialImage}`,
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
      sameAs: ["https://github.com/alistairalva"],
      mainEntityOfPage: {
        "@id": `${canonicalUrl}#webpage`,
      },
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

    const breadcrumbItems =
      pathname === "/"
        ? [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${baseUrl}/`,
            },
          ]
        : pathname === "/free-seo-audit"
          ? [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${baseUrl}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Free SEO Audit",
                item: `${baseUrl}/free-seo-audit`,
              },
            ]
          : [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${baseUrl}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Free SEO Audit",
                item: `${baseUrl}/free-seo-audit`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Thank You",
                item: `${baseUrl}/thank-you`,
              },
            ];

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbItems,
    };

    const projectListSchema = {
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
            "@id": `${baseUrl}/#person`,
          },
        },
      })),
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
      pathname === "/"
        ? [
            websiteSchema,
            webPageSchema,
            personSchema,
            breadcrumbSchema,
            projectListSchema,
          ]
        : pathname === "/free-seo-audit"
          ? [
              websiteSchema,
              webPageSchema,
              personSchema,
              breadcrumbSchema,
              serviceSchema,
              faqSchema,
            ]
          : [websiteSchema, webPageSchema, personSchema, breadcrumbSchema];

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
    <>
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
    </>
  );
};

export default App;
