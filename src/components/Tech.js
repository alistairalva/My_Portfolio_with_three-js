import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import BallCanvas from "./canvas/Ball";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { styles } from "../styles";
const Tech = () => {
    return (_jsxs(_Fragment, { children: [_jsx("p", { className: styles.sectionSubText, children: "Tools and Platforms" }), _jsx("h2", { className: styles.sectionHeadText, children: "Tech Stack." }), _jsx("ul", { className: "mt-10 flex flex-row flex-wrap justify-center gap-10 list-none", "aria-label": "Technology icons", children: technologies.map((technology) => (_jsx("li", { className: "w-28 h-28", children: _jsx(BallCanvas, { icon: technology.icon }) }, technology.name))) })] }));
};
const TechSection = SectionWrapper(Tech, "tech");
export default TechSection;
