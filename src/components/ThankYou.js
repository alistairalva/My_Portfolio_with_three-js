import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { fadeIn } from "../motion";
import { styles } from "../styles";
const ThankYou = () => {
    useEffect(() => {
        track("SEO Audit Thank You Viewed");
    }, []);
    return (_jsx("main", { id: "main-content", className: "relative z-0 bg-primary min-h-screen", "aria-label": "Thank you page", children: _jsx("div", { className: `${styles.paddingX} pt-28 pb-16`, children: _jsxs(motion.div, { variants: fadeIn("", "tween", 0.2, 0.6), initial: "hidden", animate: "show", className: "mx-auto w-full max-w-3xl bg-black-100 p-8 sm:p-10 rounded-2xl text-center", children: [_jsx("p", { className: styles.sectionSubText, children: "Request Received" }), _jsx("h1", { className: styles.sectionHeadText, children: "Thank You." }), _jsx("p", { className: "mt-4 text-secondary text-[16px] leading-[28px]", children: "Your free SEO and site audit request has been submitted. I will review your details and reach out with next steps." }), _jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Link, { to: "/", className: "bg-tertiary py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl", children: "Back to Home" }), _jsx(Link, { to: "/free-seo-audit", className: "bg-black py-3 px-8 outline-none text-white font-bold shadow-md shadow-primary rounded-xl border border-white/20", children: "Submit Another Request" })] })] }) }) }));
};
export default ThankYou;
