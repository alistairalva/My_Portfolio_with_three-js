import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../motion";
import { SectionWrapper } from "../hoc";
const ServiceCard = ({ index, title, icon }) => {
    return (_jsx(Tilt, { options: { max: 45, scale: 1, speed: 450 }, className: "xs:w-[250px] w-full", children: _jsx(motion.div, { variants: fadeIn("right", "spring", 0.5 * index, 0.75), className: "w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card", children: _jsxs("div", { className: "bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col", children: [_jsx("img", { src: icon, alt: title, className: "w-16 h-16 object contain mb-4", loading: "lazy", decoding: "async" }), _jsx("h3", { className: "text-white text-[20px] font-bold text-center", children: title })] }) }) }));
};
const About = () => {
    return (_jsxs(_Fragment, { children: [_jsxs(motion.div, { variants: textVariant(0), children: [_jsx("p", { className: styles.sectionSubText, children: "Introduction" }), _jsx("h2", { className: styles.sectionHeadText, children: "Overview" })] }), _jsx(motion.p, { variants: fadeIn("", "", 0.1, 1), className: "mt-4 text-secondary text-[17px] mx-w-3xl leading-[30px]", children: "I'm a technology consultant and software developer with a strong focus on backend architecture for web, mobile, and desktop applications. I specialize in building scalable, high-performance systems with clean APIs and strong data integrity. Over the past few years, I've worked with startups and enterprises across industries like FinTech, real estate, and fitness, delivering everything from MVPs to enterprise-grade infrastructure. I've also consulted on business operations and helped teams improve efficiency, reduce costs, and build strong technical foundations. I'm a quick learner, passionate about clean code, and always exploring new technologies. My goal is to build meaningful software that drives results \u2014 and to collaborate with teams that care about impact and craftsmanship. Let's build something great together! \uD83D\uDE80" }), _jsx("ul", { className: "mt-20 flex flex-wrap gap-10 list-none", children: services.map((service, index) => (_jsx("li", { children: _jsx(ServiceCard, { index: index, ...service }) }, service.title))) })] }));
};
const AboutSection = SectionWrapper(About, "about");
export default AboutSection;
