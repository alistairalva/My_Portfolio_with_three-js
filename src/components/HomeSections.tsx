import { FC, Suspense, lazy } from "react";

import About from "./About";
import Contact from "./Contact";
import Experience from "./Experience";
import Hero from "./Hero";
import Tech from "./Tech";
import Works from "./Works";

const StarsCanvas = lazy(() => import("./canvas/Stars"));

const HomeSections: FC = () => {
  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <Hero />
      <About />
      <Experience />
      <Tech />
      <Works />
      <div className="relative z-0">
        <Contact />
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>
    </main>
  );
};

export default HomeSections;
