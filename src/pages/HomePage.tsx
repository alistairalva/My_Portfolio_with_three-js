import {
  FC,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";

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

const HomePage: FC = () => {
  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <div className="bg-hero-pattern-mobile md:bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <About />
      <DeferredSection placeholderClassName="h-24" rootMargin="300px">
        <Experience />
      </DeferredSection>
      <DeferredSection placeholderClassName="h-24" rootMargin="300px">
        <Tech />
      </DeferredSection>
      <DeferredSection placeholderClassName="h-24" rootMargin="300px">
        <Works />
      </DeferredSection>
      {/* <Feedbacks /> */}
      <div className="relative z-0">
        <DeferredSection placeholderClassName="h-24" rootMargin="350px">
          <Contact />
        </DeferredSection>
        <DeferredSection placeholderClassName="h-0" rootMargin="350px">
          <StarsCanvas />
        </DeferredSection>
      </div>
    </main>
  );
};

export default HomePage;
