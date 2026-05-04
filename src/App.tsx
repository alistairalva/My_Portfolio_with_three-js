import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  SeoAudit,
  Tech,
  ThankYou,
  Works,
  StarsCanvas,
} from "./components";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const HomePage: FC = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <div>
        <About />
        <Experience />
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
      </div>
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <SpeedInsights />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/free-seo-audit" element={<SeoAudit />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
