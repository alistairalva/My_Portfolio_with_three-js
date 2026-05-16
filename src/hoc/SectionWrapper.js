import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../motion";
const SectionWrapper = (Component, idName) => {
    const HOC = () => {
        const sectionId = idName?.trim();
        return (_jsx(motion.section, { id: sectionId || undefined, "aria-label": sectionId ? `${sectionId} section` : "portfolio section", variants: staggerContainer(), initial: "hidden", animate: "show", className: `${styles.padding} scroll-mt-24 max-w-7xl mx-auto relative z-0`, children: _jsx(Component, {}) }));
    };
    return HOC;
};
export default SectionWrapper;
