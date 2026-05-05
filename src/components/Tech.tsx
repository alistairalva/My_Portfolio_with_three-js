import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";

const Tech: React.FC = () => {
  return (
    <>
      <p className={styles.sectionSubText}>Tools and Platforms</p>
      <h2 className={styles.sectionHeadText}>Tech Stack.</h2>
      <ul
        className="mt-10 flex flex-row flex-wrap justify-center gap-10 list-none"
        aria-label="Technology icons"
      >
        {technologies.map((technology) => (
          <li className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </li>
        ))}
      </ul>
    </>
  );
};

const TechSection = SectionWrapper(Tech, "tech");
export default TechSection;
