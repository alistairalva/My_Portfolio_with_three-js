import { FC } from "react";

import About from "../components/About";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Hero from "../components/Hero";
import Tech from "../components/Tech";
import Works from "../components/Works";
import StarsCanvas from "../components/canvas/Stars";

const HomePage: FC = () => {
  return (
    <main id="main-content" className="relative z-0 bg-primary">
      <div className="bg-hero-pattern-mobile md:bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      {/* <Feedbacks /> */}
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  );
};

export default HomePage;
