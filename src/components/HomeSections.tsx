import { FC, Suspense, lazy, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

import About from "./About";
import Hero from "./Hero";

const Experience = lazy(() => import("./Experience"));
const Tech = lazy(() => import("./Tech"));
const Works = lazy(() => import("./Works"));
const Contact = lazy(() => import("./Contact"));
const StarsCanvas = lazy(() => import("./canvas/Stars"));

type DeferredSectionProps = {
  children: ReactNode;
  rootMargin?: string;
  forceRender?: boolean;
};

const DeferredSection: FC = ({
  children,
  rootMargin = "280px 0px",
  forceRender = false,
}) => {
  const [visible, setVisible] = useState(forceRender);
  const [node, setNode] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (forceRender) {
      setVisible(true);
    }
  }, [forceRender]);

  useEffect(() => {
    if (visible || forceRender || !node || typeof window === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [forceRender, node, rootMargin, visible]);

  return <div ref={setNode}>{visible ? children : null}</div>;
};

const HomeSections: FC = () => {
  const [forceDeferredSections, setForceDeferredSections] = useState(false);
  const [pendingHashSection, setPendingHashSection] = useState<string | null>(
    null,
  );

  const hashTarget = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.hash.replace(/^#/, "");
  }, []);

  useEffect(() => {
    if (!hashTarget) return;
    setPendingHashSection(hashTarget);
    setForceDeferredSections(true);
  }, [hashTarget]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashChange = () => {
      const sectionId = window.location.hash.replace(/^#/, "");
      if (!sectionId) return;
      setPendingHashSection(sectionId);
      setForceDeferredSections(true);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (!pendingHashSection || typeof window === "undefined") return;

    let attempts = 0;
    const maxAttempts = 40;

    const tryScroll = () => {
      const target = document.getElementById(pendingHashSection);
      if (!target) {
        attempts += 1;
        if (attempts >= maxAttempts) {
          setPendingHashSection(null);
          return;
        }
        requestAnimationFrame(tryScroll);
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setPendingHashSection(null);
    };

    requestAnimationFrame(tryScroll);
  }, [pendingHashSection]);

  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <Hero />
      <About />
      <Suspense fallback={null}>
        <DeferredSection forceRender={forceDeferredSections}>
          <Experience />
        </DeferredSection>
        <DeferredSection forceRender={forceDeferredSections}>
          <Tech />
        </DeferredSection>
        <DeferredSection forceRender={forceDeferredSections}>
          <Works />
        </DeferredSection>
      </Suspense>
      <div className="relative z-0">
        <Suspense fallback={null}>
          <DeferredSection forceRender={forceDeferredSections}>
            <Contact />
          </DeferredSection>
          <StarsCanvas />
        </Suspense>
      </div>
    </main>
  );
};

export default HomeSections;
