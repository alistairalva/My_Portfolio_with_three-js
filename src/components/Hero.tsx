import React, { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import heroBg from "../assets/herobg.webp";
import heroBgMobile from "../assets/herobg-mobile.webp";

const ComputersCanvas = lazy(() => import("./canvas/Computers"));

type NavigatorConnection = {
  saveData?: boolean;
  effectiveType?: string;
};

type WindowWithIdle = Window & {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions,
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
};

const Hero: React.FC = () => {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const connection = (
      navigator as Navigator & {
        connection?: NavigatorConnection;
      }
    ).connection;

    const isLowPerfDevice =
      motionQuery.matches ||
      mobileQuery.matches ||
      Boolean(connection?.saveData) ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    if (isLowPerfDevice) {
      return;
    }

    const scheduleRender = () => setShouldRenderCanvas(true);
    const idleWindow = window as WindowWithIdle;

    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(scheduleRender, {
        timeout: 1200,
      });

      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = setTimeout(scheduleRender, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className={`relative w-full mx-auto md:h-screen`}>
      <picture className="absolute inset-0 z-0">
        <source media="(max-width: 768px)" srcSet={heroBgMobile} />
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </picture>
      <div
        className="absolute inset-0 z-[1] bg-primary/20"
        aria-hidden="true"
      />
      <div
        className={`${styles.paddingX} pointer-events-none relative z-10 pt-[120px] pb-10 max-w-7xl mx-auto flex 
        flex-row items-start gap-5 md:absolute md:inset-0 md:top-[120px] md:pt-0 md:pb-0`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient " />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} mt-2 text-white`}>
            Hi, I'm
            <span className="text-[#915eff]"> Alistair</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I ship fast, build quick & deliver excellence.{" "}
            <br className="sm:block hidden" />
          </p>
        </div>
      </div>
      {shouldRenderCanvas ? (
        <Suspense fallback={null}>
          <ComputersCanvas />
        </Suspense>
      ) : null}
      <div className="hidden md:flex absolute z-20 xs:bottom-10 bottom-32 w-full justify-center items-center">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <span className="sr-only">Scroll to About section</span>
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
