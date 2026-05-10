import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";

import About from "../components/About";
import Hero from "../components/Hero";

const Experience = lazy(() => import("../components/Experience"));
const Tech = lazy(() => import("../components/Tech"));
const Works = lazy(() => import("../components/Works"));
const Contact = lazy(() => import("../components/Contact"));
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));

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

const HomePage: FC = () => {
  const { state } = useLocation();
  const targetSection = (state as { targetSection?: string } | null)
    ?.targetSection;
  const forceDeferredSections = Boolean(targetSection);

  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <Hero />
      <About />
      <DeferredSection
        placeholderClassName="h-24"
        rootMargin="120px"
        forceRender={forceDeferredSections}
      >
        <Experience />
      </DeferredSection>
      <DeferredSection
        placeholderClassName="h-24"
        rootMargin="120px"
        forceRender={forceDeferredSections}
      >
        <Tech />
      </DeferredSection>
      <DeferredSection
        placeholderClassName="h-24"
        rootMargin="120px"
        forceRender={forceDeferredSections}
      >
        <Works />
      </DeferredSection>
      {/* <Feedbacks /> */}
      <div className="relative z-0">
        <DeferredSection
          placeholderClassName="h-24"
          rootMargin="180px"
          forceRender={forceDeferredSections}
        >
          <Contact />
        </DeferredSection>
        <DeferredSection
          placeholderClassName="h-0"
          rootMargin="180px"
          forceRender={forceDeferredSections}
        >
          <StarsCanvas />
        </DeferredSection>
      </div>
    </main>
  );
};

export default HomePage;
