import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../motion";
import { SectionWrapper } from "../hoc";

interface ServiceCardProps {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ index, title, icon }) => {
  return (
    <Tilt
      tiltMaxAngleX={45}
      tiltMaxAngleY={45}
      scale={1}
      transitionSpeed={450}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col">
          <img
            src={icon}
            alt={title}
            className="w-16 h-16 object contain mb-4"
            loading="lazy"
            decoding="async"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About: React.FC = () => {
  return (
    <>
      <motion.div variants={textVariant(0)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] mx-w-3xl leading-[30px]"
      >
        I'm a technology consultant and software developer with a strong focus
        on backend architecture for web, mobile, and desktop applications. I
        specialize in building scalable, high-performance systems with clean
        APIs and strong data integrity. Over the past few years, I've worked
        with startups and enterprises across industries like FinTech, real
        estate, and fitness, delivering everything from MVPs to enterprise-grade
        infrastructure. I've also consulted on business operations and helped
        teams improve efficiency, reduce costs, and build strong technical
        foundations. I'm a quick learner, passionate about clean code, and
        always exploring new technologies. My goal is to build meaningful
        software that drives results — and to collaborate with teams that care
        about impact and craftsmanship. Let's build something great together! 🚀
      </motion.p>
      <ul className="mt-20 flex flex-wrap gap-10 list-none">
        {services.map((service, index) => (
          <li key={service.title}>
            <ServiceCard index={index} {...service} />
          </li>
        ))}
      </ul>
    </>
  );
};

const AboutSection = SectionWrapper(About, "about");
export default AboutSection;
