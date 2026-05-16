import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy, useEffect, useRef, useState, } from "react";
import { useLocation } from "react-router-dom";
import About from "../components/About";
import Hero from "../components/Hero";
const Experience = lazy(() => import("../components/Experience"));
const Tech = lazy(() => import("../components/Tech"));
const Works = lazy(() => import("../components/Works"));
const Contact = lazy(() => import("../components/Contact"));
const StarsCanvas = lazy(() => import("../components/canvas/Stars"));
const DeferredSection = ({ children, rootMargin = "250px", placeholderClassName = "h-16", forceRender = false, }) => {
    const containerRef = useRef(null);
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        if (forceRender) {
            setShouldRender(true);
            return;
        }
        const target = containerRef.current;
        if (!target || shouldRender) {
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry?.isIntersecting) {
                setShouldRender(true);
                observer.disconnect();
            }
        }, { rootMargin });
        observer.observe(target);
        return () => observer.disconnect();
    }, [forceRender, rootMargin, shouldRender]);
    return (_jsx("div", { ref: containerRef, children: shouldRender ? (_jsx(Suspense, { fallback: _jsx("div", { className: placeholderClassName, "aria-hidden": "true" }), children: children })) : (_jsx("div", { className: placeholderClassName, "aria-hidden": "true" })) }));
};
const HomePage = () => {
    const { state } = useLocation();
    const targetSection = state
        ?.targetSection;
    const forceDeferredSections = Boolean(targetSection);
    return (_jsxs("main", { id: "main-content", className: "relative z-0 bg-primary", children: [_jsx(Hero, {}), _jsx(About, {}), _jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "120px", forceRender: forceDeferredSections, children: _jsx(Experience, {}) }), _jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "120px", forceRender: forceDeferredSections, children: _jsx(Tech, {}) }), _jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "120px", forceRender: forceDeferredSections, children: _jsx(Works, {}) }), _jsxs("div", { className: "relative z-0", children: [_jsx(DeferredSection, { placeholderClassName: "h-24", rootMargin: "180px", forceRender: forceDeferredSections, children: _jsx(Contact, {}) }), _jsx(DeferredSection, { placeholderClassName: "h-0", rootMargin: "180px", forceRender: forceDeferredSections, children: _jsx(StarsCanvas, {}) })] })] }));
};
export default HomePage;
