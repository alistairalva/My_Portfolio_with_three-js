import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import heroBg from "../assets/herobg.webp";
import heroBgMobile from "../assets/herobg-mobile.webp";
const ComputersCanvas = lazy(() => import("./canvas/Computers"));
const Hero = () => {
    const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
    useEffect(() => {
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const mobileQuery = window.matchMedia("(max-width: 768px)");
        const connection = navigator.connection;
        const isLowPerfDevice = motionQuery.matches ||
            mobileQuery.matches ||
            Boolean(connection?.saveData) ||
            connection?.effectiveType === "slow-2g" ||
            connection?.effectiveType === "2g";
        if (isLowPerfDevice) {
            return;
        }
        const scheduleRender = () => setShouldRenderCanvas(true);
        const idleWindow = window;
        let timeoutId;
        let idleId;
        const startDeferredRender = () => {
            // Defer 3D import until after load + idle to reduce main-thread contention.
            if (idleWindow.requestIdleCallback) {
                idleId = idleWindow.requestIdleCallback(scheduleRender, {
                    timeout: 2600,
                });
                return;
            }
            timeoutId = setTimeout(scheduleRender, 2200);
        };
        if (document.readyState === "complete") {
            startDeferredRender();
        }
        else {
            window.addEventListener("load", startDeferredRender, { once: true });
        }
        return () => {
            window.removeEventListener("load", startDeferredRender);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (idleId !== undefined) {
                idleWindow.cancelIdleCallback?.(idleId);
            }
        };
    }, []);
    return (_jsxs("section", { className: `relative w-full mx-auto min-h-[72vh] md:h-screen overflow-hidden`, children: [_jsxs("picture", { className: "absolute inset-0 z-0", children: [_jsx("source", { media: "(max-width: 768px)", srcSet: heroBgMobile }), _jsx("img", { src: heroBg, alt: "", "aria-hidden": "true", fetchPriority: "high", loading: "eager", decoding: "async", width: 1920, height: 1080, className: "h-full w-full object-cover" })] }), _jsx("div", { className: "absolute inset-0 z-[1] bg-primary/20", "aria-hidden": "true" }), _jsxs("div", { className: `${styles.paddingX} pointer-events-none relative z-10 pt-[120px] pb-10 max-w-7xl mx-auto flex 
        flex-row items-start gap-5 md:absolute md:inset-0 md:top-[120px] md:pt-0 md:pb-0`, children: [_jsxs("div", { className: "flex flex-col justify-center items-center mt-5", children: [_jsx("div", { className: "w-5 h-5 rounded-full bg-[#915eff]" }), _jsx("div", { className: "w-1 sm:h-80 h-40 violet-gradient " })] }), _jsxs("div", { children: [_jsxs("h1", { className: `${styles.heroHeadText} mt-2 text-white`, children: ["Hi, I'm", _jsx("span", { className: "text-[#915eff]", children: " Alistair" })] }), _jsxs("p", { className: `${styles.heroSubText} mt-2 text-white-100`, children: ["I ship fast, build quick & deliver excellence.", " ", _jsx("br", { className: "sm:block hidden" })] })] })] }), _jsx("div", { className: "absolute inset-0 z-[2]", children: shouldRenderCanvas ? (_jsx(Suspense, { fallback: null, children: _jsx(ComputersCanvas, {}) })) : null }), _jsx("div", { className: "hidden md:flex absolute z-20 xs:bottom-10 bottom-32 w-full justify-center items-center", children: _jsxs("a", { href: "#about", "aria-label": "Scroll to About section", className: "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary", children: [_jsx("span", { className: "sr-only", children: "Scroll to About section" }), _jsx("div", { className: "w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2", children: _jsx(motion.div, { animate: {
                                    y: [0, 24, 0],
                                }, transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                }, className: "w-3 h-3 rounded-full bg-secondary mb-1" }) })] }) })] }));
};
export default Hero;
