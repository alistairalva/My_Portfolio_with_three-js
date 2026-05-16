import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { VerticalTimeline, VerticalTimelineElement, } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../motion";
const ExperienceCard = ({ experience, }) => {
    return (_jsxs(VerticalTimelineElement, { contentStyle: { background: "#1d1836", color: "#fff" }, contentArrowStyle: { borderRight: "7px solid #232631" }, date: experience.date, iconStyle: { background: experience.iconBg }, icon: _jsx("div", { className: "flex justify-center items-center w-full h-full", children: _jsx("img", { src: experience.icon, alt: experience.company_name, className: "w-[60%] h-[60%] object-contain", loading: "lazy", decoding: "async" }) }), children: [_jsxs("div", { children: [_jsx("h3", { className: "text-white text-[24px] font-bold", children: experience.title }), _jsx("p", { className: "text-secondary text-[16px] font-semibold", style: { margin: 0 }, children: experience.company_name })] }), _jsx("ul", { className: "mt-5 list-disc ml-5 space-y-2", children: experience.points.map((point, index) => (_jsx("li", { className: "text-white-100 text-[14px] pl-1 tracking-wider", children: point }, `experience-point-${index}`))) })] }));
};
const Experience = () => {
    return (_jsxs(_Fragment, { children: [_jsxs(motion.div, { variants: textVariant(0), children: [_jsx("p", { className: styles.sectionSubText, children: "What I have done so far" }), _jsx("h2", { className: styles.sectionHeadText, children: "Experience" })] }), _jsx("div", { className: "mt-20 flex flex-col", children: _jsx(VerticalTimeline, { children: experiences.map((experience, index) => (_jsx(ExperienceCard, { experience: experience }, index))) }) })] }));
};
const ExperienceSection = SectionWrapper(Experience, "work");
export default ExperienceSection;
