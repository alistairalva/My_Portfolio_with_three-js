import React from "react";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import type { Project } from "../constants";
import { fadeIn, textVariant } from "../motion";

interface ProjectCardProps {
  index: number;
  project: Project;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ index, project }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
          <p className="mt-2 text-secondary text-[14px]">
            {project.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};
const Works: React.FC = () => {
  return (
    <>
      <motion.div variants={textVariant(0)}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full-flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] mx-w-3xl leading-[30px]"
        >
          The following projects are some of the work I have done so far. I am
          also currently working on a few more. I try to show my experience in
          building software for different domains and use cases. Each project
          has links to a GitHub repository with and a live demo with others.
          Morevoer, I have many other projects that are not listed here. If you
          want to see more, please email me and I will be happy to share them.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={index} index={index} project={project} />
        ))}
      </div>
    </>
  );
};

const WorkSection = SectionWrapper(Works, "");
export default WorkSection;
