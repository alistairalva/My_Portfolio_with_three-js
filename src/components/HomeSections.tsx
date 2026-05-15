import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";

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
  placeholderClassName?: string;
  forceRender?: boolean;
};

const DeferredSection: FC<DeferredSectionProps> = ({
  children,
  rootMargin = "250px",
  placeholderClassName = "h-16",
  forceRender = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (forceRender) {
      setShouldRender(true);
      return;
    }

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
      { rootMargin },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [forceRender, rootMargin, shouldRender]);

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense
          fallback={<div className={placeholderClassName} aria-hidden="true" />}
        >
          {children}
        </Suspense>
      ) : (
        <div className={placeholderClassName} aria-hidden="true" />
      )}
    </div>
  );
};

const HomeSections: FC = () => {
  const [hashTargetId, setHashTargetId] = useState("");
  const [hashNavigationVersion, setHashNavigationVersion] = useState(0);

  useEffect(() => {
    const updateHashTarget = () => {
      setHashTargetId(window.location.hash.replace("#", ""));
      setHashNavigationVersion((currentVersion) => currentVersion + 1);
    };

    updateHashTarget();
    window.addEventListener("hashchange", updateHashTarget);

    return () => {
      window.removeEventListener("hashchange", updateHashTarget);
    };
  }, []);

  useEffect(() => {
    if (!hashTargetId) {
      return;
    }

    const targetId = hashTargetId;
    let attempts = 0;
    const maxAttempts = 80;
    let timeoutId: number | null = null;

    const scrollToSectionWhenReady = () => {
      const sectionElement = document.getElementById(targetId);

      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `/#${targetId}`);
        return;
      }

      attempts += 1;
      if (attempts < maxAttempts) {
        timeoutId = window.setTimeout(scrollToSectionWhenReady, 100);
      }
    };

    scrollToSectionWhenReady();

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [hashNavigationVersion, hashTargetId]);

  const shouldForceRenderDeferredSections = hashTargetId.length > 0;

  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <Hero />
      <About />
      <DeferredSection
        placeholderClassName="h-24"
        rootMargin="120px"
        forceRender={shouldForceRenderDeferredSections}
      >
        <Experience />
      </DeferredSection>
      <DeferredSection
        placeholderClassName="h-24"
        rootMargin="120px"
        forceRender={shouldForceRenderDeferredSections}
      >
        <Tech />
      </DeferredSection>
      <DeferredSection
        placeholderClassName="h-24"
        rootMargin="120px"
        forceRender={shouldForceRenderDeferredSections}
      >
        <Works />
      </DeferredSection>
      <div className="relative z-0">
        <DeferredSection
          placeholderClassName="h-24"
          rootMargin="180px"
          forceRender={shouldForceRenderDeferredSections}
        >
          <Contact />
        </DeferredSection>
        <DeferredSection
          placeholderClassName="h-0"
          rootMargin="180px"
          forceRender={shouldForceRenderDeferredSections}
        >
          <StarsCanvas />
        </DeferredSection>
      </div>
    </main>
  );
};

export default HomeSections;
