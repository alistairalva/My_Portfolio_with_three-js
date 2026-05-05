import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import ComputersCanvas from "./canvas/Computers";

const Hero: React.FC = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex 
        flex-row items-start gap-5`}
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
      <ComputersCanvas />
      <div className="absolute xs:bottom-10 bottom-32 w-full  flex justify-center items-center">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <span className="sr-only">Scroll to About section</span>
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center iems-start p-2">
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
