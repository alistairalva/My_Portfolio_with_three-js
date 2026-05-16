import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../motion";
import { testimonials } from "../constants";
const FeedbackCard = ({ index, testimonial }) => {
    return (_jsxs(motion.div, { variants: fadeIn("up", "spring", index * 0.5, 0.75), className: "bg-black-200 p-10 rounded-3xl w-full xs:w-[320px]", children: [_jsx("p", { className: "text-white font-black text-[48px]", children: "\"" }), _jsxs("div", { className: "mt-1", children: [_jsx("p", { children: testimonial.testimonial }), _jsxs("div", { className: "mt-7 flex justify-between items-center gap-1", children: [_jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("p", { className: "text-white font-medium text-[16px]", children: [_jsx("span", { className: "blue-text-gradient", children: "@" }), " ", testimonial.name] }), _jsxs("p", { className: "mt-1 text-secondary text-[12px]", children: [testimonial.designation, " of ", testimonial.company] })] }), _jsx("img", { src: testimonial.image, alt: `feedback-by-${testimonial.name}`, className: "w-10 h-10 rounded-full object-cover" })] })] })] }));
};
const Feedbacks = () => {
    return (_jsxs("div", { className: "mt-12 bg-black-100 rounded-[20px]", children: [_jsx("div", { className: `${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`, children: _jsxs(motion.div, { variants: textVariant(), children: [_jsx("p", { className: styles.sectionSubText, children: "What others say" }), _jsx("h2", { className: styles.sectionHeadText, children: "Testimonials" })] }) }), _jsx("div", { className: `${styles.padding} -mt-20 pb-14 flex flex-wrap gap-7`, children: testimonials.map((testimonial, index) => (_jsx(FeedbackCard, { index: index, testimonial: testimonial }, testimonial.name))) })] }));
};
const FeedbackSection = SectionWrapper(Feedbacks, "");
export default FeedbackSection;
