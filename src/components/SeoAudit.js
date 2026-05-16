import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { track } from "@vercel/analytics";
import { styles } from "../styles";
import { slideIn } from "../motion";
import StarsCanvas from "./canvas/Stars";
import { seoAuditFaq } from "../constants/seo";
const initialForm = {
    fullName: "",
    businessEmail: "",
    companyName: "",
    websiteUrl: "",
    industry: "",
    primaryGoals: "",
    monthlyTrafficEstimate: "",
    targetAudience: "",
    topCompetitors: "",
    mainChallenges: "",
    timelineUrgency: "",
    preferredContactMethod: "",
};
const inputClassName = "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none focus-visible:ring-2 focus-visible:ring-[#915eff]";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_FORM_COMPLETION_MS = 3000;
const isValidWebsiteUrl = (value) => {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
    }
    catch {
        return false;
    }
};
const getValidationMessage = (form) => {
    const hasMissingFields = Object.values(form).some((value) => value.trim().length === 0);
    if (hasMissingFields) {
        return "Please fill out all fields";
    }
    if (form.fullName.trim().length < 2) {
        return "Please enter your full name";
    }
    if (!EMAIL_REGEX.test(form.businessEmail.trim())) {
        return "Please enter a valid email address";
    }
    if (!isValidWebsiteUrl(form.websiteUrl.trim())) {
        return "Please enter a valid website URL (including http or https)";
    }
    return null;
};
const SeoAudit = () => {
    const formStartedAtRef = useRef(Date.now());
    const [form, setForm] = useState(initialForm);
    const [website, setWebsite] = useState("");
    const [loading, setLoading] = useState(false);
    const toastOptions = {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationMessage = getValidationMessage(form);
        if (validationMessage) {
            toast.warn(validationMessage, toastOptions);
            return;
        }
        const completionTimeMs = Date.now() - formStartedAtRef.current;
        if (website.trim().length > 0 ||
            completionTimeMs < MIN_FORM_COMPLETION_MS) {
            track("SEO Audit Spam Blocked", {
                reason: website.trim().length > 0 ? "honeypot" : "completed_too_fast",
                completion_time_ms: completionTimeMs,
            });
            toast.warn("Please wait a moment and try again.", toastOptions);
            return;
        }
        setLoading(true);
        try {
            const env = import.meta.env;
            const localDevAuditEndpoint = env.PUBLIC_AUDIT_API_URL ||
                env.VITE_AUDIT_API_URL;
            const endpoint = Boolean(env.DEV) && localDevAuditEndpoint
                ? localDevAuditEndpoint
                : "/api/audit-requests";
            const payload = {
                ...form,
                website,
                clientCompletionMs: completionTimeMs,
                source: "portfolio-seo-audit",
                submittedAt: new Date().toISOString(),
            };
            const isExternalEndpoint = /^https?:\/\//i.test(endpoint);
            const requestOptions = {
                method: "POST",
                body: JSON.stringify(payload),
            };
            if (!isExternalEndpoint) {
                requestOptions.headers = {
                    "Content-Type": "application/json",
                };
            }
            const response = await fetch(endpoint, requestOptions);
            const result = await response
                .json()
                .catch(() => ({ success: response.ok }));
            if (!response.ok || result?.success === false) {
                const message = result?.message ||
                    `Audit request failed with status ${response.status}`;
                throw new Error(message);
            }
            setForm(initialForm);
            setWebsite("");
            formStartedAtRef.current = Date.now();
            track("SEO Audit Form Submitted", {
                timeline: form.timelineUrgency,
                preferred_contact: form.preferredContactMethod,
                industry: form.industry.slice(0, 80),
            });
            toast.success("Request sent. Redirecting to your confirmation page...", toastOptions);
            window.location.assign("/thank-you");
        }
        catch (error) {
            console.error(error);
            toast.error("Could not submit your audit request right now. Please try again.", toastOptions);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("main", { id: "main-content", className: "relative z-0 bg-primary min-h-screen", "aria-label": "Free SEO audit form", children: [_jsx("div", { className: "relative z-10", children: _jsx("div", { className: `${styles.paddingX} pt-28 pb-16`, children: _jsxs(motion.div, { variants: slideIn("left", "tween", 0.2, 0.5), initial: "hidden", animate: "show", className: "mx-auto w-full max-w-5xl bg-black-100 p-6 sm:p-8 rounded-2xl", children: [_jsx("h1", { className: styles.sectionSubText, children: "Free SEO and Site Audit" }), _jsx("h2", { id: "seo-audit-heading", className: styles.sectionHeadText, children: "Tell Me About Your Site." }), _jsx("p", { className: "mt-4 text-secondary text-[16px] leading-[28px]", children: "Share your current website details and goals. You will receive a practical audit focused on technical SEO, content opportunities, and high-impact actions you can take first." }), _jsxs("form", { onSubmit: handleSubmit, "aria-labelledby": "seo-audit-heading", className: "mt-10 flex flex-col gap-6", noValidate: true, children: [_jsxs("div", { "aria-hidden": "true", className: "absolute -left-[9999px] top-auto w-px h-px overflow-hidden", children: [_jsx("label", { htmlFor: "website", children: "Website" }), _jsx("input", { id: "website", type: "text", name: "website", value: website, onChange: (e) => setWebsite(e.target.value), autoComplete: "off", tabIndex: -1 })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [_jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Full Name" }), _jsx("input", { type: "text", name: "fullName", value: form.fullName, onChange: handleChange, placeholder: "Your full name", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Business Email" }), _jsx("input", { type: "email", name: "businessEmail", value: form.businessEmail, onChange: handleChange, placeholder: "you@company.com", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Company Name" }), _jsx("input", { type: "text", name: "companyName", value: form.companyName, onChange: handleChange, placeholder: "Your company", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Website URL" }), _jsx("input", { type: "url", name: "websiteUrl", value: form.websiteUrl, onChange: handleChange, placeholder: "https://example.com", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Business Type / Industry" }), _jsx("input", { type: "text", name: "industry", value: form.industry, onChange: handleChange, placeholder: "e.g., SaaS, E-commerce, Local Services", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Monthly Traffic Estimate" }), _jsx("input", { type: "text", name: "monthlyTrafficEstimate", value: form.monthlyTrafficEstimate, onChange: handleChange, placeholder: "e.g., 1k-5k visits", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col md:col-span-2", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Primary Goals (traffic, leads, sales)" }), _jsx("textarea", { rows: 4, name: "primaryGoals", value: form.primaryGoals, onChange: handleChange, placeholder: "What outcomes are you trying to improve?", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col md:col-span-2", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Target Audience" }), _jsx("textarea", { rows: 3, name: "targetAudience", value: form.targetAudience, onChange: handleChange, placeholder: "Who are your ideal customers?", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col md:col-span-2", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Top Competitors" }), _jsx("textarea", { rows: 3, name: "topCompetitors", value: form.topCompetitors, onChange: handleChange, placeholder: "List up to 3 competitor websites", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col md:col-span-2", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Main Challenges / Issues" }), _jsx("textarea", { rows: 4, name: "mainChallenges", value: form.mainChallenges, onChange: handleChange, placeholder: "What problems are you seeing today?", className: inputClassName, required: true })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Timeline / Urgency" }), _jsxs("select", { name: "timelineUrgency", value: form.timelineUrgency, onChange: handleChange, className: inputClassName, required: true, children: [_jsx("option", { value: "", children: "Select a timeline" }), _jsx("option", { value: "asap", children: "ASAP" }), _jsx("option", { value: "2-4-weeks", children: "2-4 weeks" }), _jsx("option", { value: "1-3-months", children: "1-3 months" }), _jsx("option", { value: "just-exploring", children: "Just exploring" })] })] }), _jsxs("label", { className: "flex flex-col", children: [_jsx("span", { className: "text-white font-medium mb-3", children: "Preferred Contact Method" }), _jsxs("select", { name: "preferredContactMethod", value: form.preferredContactMethod, onChange: handleChange, className: inputClassName, required: true, children: [_jsx("option", { value: "", children: "Select a contact method" }), _jsx("option", { value: "email", children: "Email" }), _jsx("option", { value: "whatsapp", children: "WhatsApp" }), _jsx("option", { value: "zoom", children: "Zoom" })] })] })] }), _jsx("button", { type: "submit", className: "bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl focus-visible:ring-2 focus-visible:ring-[#915eff]", disabled: loading, children: loading ? "Submitting..." : "Submit" })] }), _jsxs("section", { className: "mt-12", "aria-labelledby": "seo-audit-faq-heading", children: [_jsx("h2", { id: "seo-audit-faq-heading", className: "text-white font-bold text-[28px]", children: "Frequently Asked Questions" }), _jsx("dl", { className: "mt-6 space-y-5", children: seoAuditFaq.map((item) => (_jsxs("div", { className: "bg-tertiary rounded-lg p-5", children: [_jsx("dt", { className: "text-white font-semibold text-[17px]", children: item.question }), _jsx("dd", { className: "mt-2 text-secondary leading-[28px]", children: item.answer })] }, item.question))) })] })] }) }) }), _jsx(StarsCanvas, {})] }));
};
export default SeoAudit;
