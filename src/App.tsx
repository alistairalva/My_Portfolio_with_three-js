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
};

const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Alistair Alva | Technology Consultant & Software Developer",
    description:
      "Explore Alistair Alva's portfolio, software engineering experience, and featured projects across web, backend, and cloud systems.",
  },
  "/free-seo-audit": {
    title: "Free SEO and Site Audit | Alistair Alva",
    description:
      "Request a free SEO and website audit to identify technical issues, growth opportunities, and practical next steps.",
  },
  "/thank-you": {
    title: "Thank You | SEO Audit Request Received",
    description:
      "Your SEO and site audit request has been received. Alistair will review your details and follow up with next steps.",
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
    const canonicalUrl = `${window.location.origin}${pathname}`;
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
      `${window.location.origin}/logo.svg`,
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
      `${window.location.origin}/logo.svg`,
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

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Alistair Alva",
      url: window.location.origin,
      jobTitle: "Technology Consultant & Software Developer",
      knowsAbout: [
        "Backend Development",
        "Web Development",
        "Cloud Architecture",
        "SEO",
      ],
    };

    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Free SEO and Site Audit",
      provider: {
        "@type": "Person",
        name: "Alistair Alva",
      },
      areaServed: "Worldwide",
      url: `${window.location.origin}/free-seo-audit`,
    };

    const structuredData =
      pathname === "/free-seo-audit" ? serviceSchema : personSchema;
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
