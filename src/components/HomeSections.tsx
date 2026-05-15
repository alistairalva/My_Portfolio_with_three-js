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
};

const DeferredSection: FC<DeferredSectionProps> = ({
  children,
  rootMargin = "250px",
  placeholderClassName = "h-16",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
      { rootMargin },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

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
          scrollToSectionWhenReady,
        );
      }
    };

    animationFrameId = window.requestAnimationFrame(scrollToSectionWhenReady);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <Hero />
      <About />
      <DeferredSection placeholderClassName="h-24" rootMargin="120px">
        <Experience />
      </DeferredSection>
      <DeferredSection placeholderClassName="h-24" rootMargin="120px">
        <Tech />
      </DeferredSection>
      <DeferredSection placeholderClassName="h-24" rootMargin="120px">
        <Works />
      </DeferredSection>
      <div className="relative z-0">
        <DeferredSection placeholderClassName="h-24" rootMargin="180px">
          <Contact />
        </DeferredSection>
        <DeferredSection placeholderClassName="h-0" rootMargin="180px">
          <StarsCanvas />
        </DeferredSection>
      </div>
    </main>
  );
};

export default HomeSections;
