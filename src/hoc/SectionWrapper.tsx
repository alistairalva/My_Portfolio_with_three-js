import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../motion";

const SectionWrapper = (Component: React.FC, idName: string) => {
  const HOC: React.FC = () => {
    const sectionId = idName?.trim();

    return (
      <motion.section
        id={sectionId || undefined}
        aria-label={sectionId ? `${sectionId} section` : "portfolio section"}
        variants={staggerContainer()}
        initial="hidden"
        animate="show"
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        {sectionId ? (
          <span className="hash-span" id={sectionId} aria-hidden="true">
            &nbsp;
          </span>
        ) : null}
        <Component />
      </motion.section>
    );
  };

  return HOC;
};

export default SectionWrapper;
