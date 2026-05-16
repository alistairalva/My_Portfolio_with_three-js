import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tilt } from "react-tilt";
import { styles } from "../styles";
import { motion } from "framer-motion";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../motion";
const ProjectCard = ({ index, project }) => {
    return (_jsx(motion.div, { variants: fadeIn("up", "spring", index * 0.5, 0.75), children: _jsx("article", { "aria-label": `${project.name} project`, children: _jsxs(Tilt, { options: {
                    max: 45,
                    scale: 1,
                    speed: 450,
                }, className: "bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full", children: [_jsxs("div", { className: "relative w-full h-[230px]", children: [_jsxs("picture", { children: [project.imageMobile ? (_jsx("source", { media: "(max-width: 768px)", srcSet: project.imageMobile })) : null, _jsx("img", { src: project.image, alt: project.name, className: "w-full h-full object-cover rounded-2xl", loading: "lazy", decoding: "async" })] }), _jsx("div", { className: "absolute inset-0 flex justify-end m-3 card-img_hover", children: _jsx("a", { href: project.source_code_link, target: "_blank", rel: "noopener noreferrer", "aria-label": `Open ${project.name} source code on GitHub`, className: "black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer", children: _jsx("img", { src: github, alt: "github", className: "w-1/2 h-1/2 object-contain" }) }) })] }), _jsxs("div", { className: "mt-5", children: [_jsx("h3", { className: "text-white font-bold text-[24px]", children: project.name }), _jsx("p", { className: "mt-2 text-secondary text-[14px]", children: project.description })] }), _jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: project.tags.map((tag) => (_jsxs("p", { className: `text-[14px] ${tag.color}`, children: ["#", tag.name] }, tag.name))) })] }) }) }));
};
const Works = () => {
    return (_jsxs(_Fragment, { children: [_jsxs(motion.div, { variants: textVariant(0), children: [_jsx("p", { className: styles.sectionSubText, children: "My work" }), _jsx("h2", { className: styles.sectionHeadText, children: "Projects." })] }), _jsx("div", { className: "w-full flex", children: _jsx(motion.p, { variants: fadeIn("", "", 0.1, 1), className: "mt-3 text-secondary text-[17px] mx-w-3xl leading-[30px]", children: "The following projects contain some of the work I have done so far. I am also currently working on a few more. I try to show my experience in building software for different domains and use cases. Each project has links to a GitHub repository and a live demo where available. Moreover, I have many other projects that are not listed here. If you want to see more, please email me and I will be happy to share them." }) }), _jsx("ul", { className: "mt-20 flex flex-wrap gap-7 list-none", children: projects.map((project, index) => (_jsx("li", { children: _jsx(ProjectCard, { index: index, project: project }) }, project.name))) })] }));
};
const WorkSection = SectionWrapper(Works, "projects");
export default WorkSection;
