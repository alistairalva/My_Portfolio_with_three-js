import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { track } from "@vercel/analytics";

import { styles } from "../styles";
import { slideIn } from "../motion";
import { StarsCanvas } from "./canvas";

type SeoAuditForm = {
  fullName: string;
  businessEmail: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  primaryGoals: string;
  monthlyTrafficEstimate: string;
  targetAudience: string;
  topCompetitors: string;
  mainChallenges: string;
  timelineUrgency: string;
  preferredContactMethod: string;
};

const initialForm: SeoAuditForm = {
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

const inputClassName =
  "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const MIN_FORM_COMPLETION_MS = 3000;

const isValidWebsiteUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

const getValidationMessage = (form: SeoAuditForm) => {
  const hasMissingFields = Object.values(form).some(
    (value) => value.trim().length === 0,
  );

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

const SeoAudit: React.FC = () => {
  const navigate = useNavigate();
  const formStartedAtRef = useRef(Date.now());
  const [form, setForm] = useState<SeoAuditForm>(initialForm);
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const toastOptions = {
    position: "bottom-left" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored" as const,
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationMessage = getValidationMessage(form);
    if (validationMessage) {
      toast.warn(validationMessage, toastOptions);
      return;
    }

    const completionTimeMs = Date.now() - formStartedAtRef.current;
    if (
      website.trim().length > 0 ||
      completionTimeMs < MIN_FORM_COMPLETION_MS
    ) {
      track("SEO Audit Spam Blocked", {
        reason: website.trim().length > 0 ? "honeypot" : "completed_too_fast",
        completion_time_ms: completionTimeMs,
      });
      toast.warn("Please wait a moment and try again.", toastOptions);
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        import.meta.env.DEV && import.meta.env.AUDIT_APPS_SCRIPT_URL
          ? import.meta.env.AUDIT_APPS_SCRIPT_URL
          : "/api/audit-requests";
      const payload = {
        ...form,
        website,
        clientCompletionMs: completionTimeMs,
        source: "portfolio-seo-audit",
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response
        .json()
        .catch(() => ({ success: response.ok }));

      if (!response.ok || result?.success === false) {
        const message =
          result?.message ||
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
      toast.success(
        "Request sent. Redirecting to your confirmation page...",
        toastOptions,
      );
      navigate("/thank-you");
    } catch (error) {
      console.error(error);
      toast.error(
        "Could not submit your audit request right now. Please try again.",
        toastOptions,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      id="main-content"
      className="relative z-0 bg-primary min-h-screen"
      aria-label="Free SEO audit form"
    >
      <div className="relative z-10">
        <div className={`${styles.paddingX} pt-28 pb-16`}>
          <motion.div
            variants={slideIn("left", "tween", 0.2, 0.5)}
            initial="hidden"
            animate="show"
            className="mx-auto w-full max-w-5xl bg-black-100 p-6 sm:p-8 rounded-2xl"
          >
            <p className={styles.sectionSubText}>Free SEO and Site Audit</p>
            <h1 className={styles.sectionHeadText}>Tell Me About Your Site.</h1>
            <p className="mt-4 text-secondary text-[16px] leading-[28px]">
              Share your current website details and goals. You will receive a
              practical audit focused on technical SEO, content opportunities,
              and high-impact actions you can take first.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col gap-6"
              noValidate
            >
              <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  autoComplete="off"
                  tabIndex={-1}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Business Email
                  </span>
                  <input
                    type="email"
                    name="businessEmail"
                    value={form.businessEmail}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Company Name
                  </span>
                  <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Website URL
                  </span>
                  <input
                    type="url"
                    name="websiteUrl"
                    value={form.websiteUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Business Type / Industry
                  </span>
                  <input
                    type="text"
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                    placeholder="e.g., SaaS, E-commerce, Local Services"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Monthly Traffic Estimate
                  </span>
                  <input
                    type="text"
                    name="monthlyTrafficEstimate"
                    value={form.monthlyTrafficEstimate}
                    onChange={handleChange}
                    placeholder="e.g., 1k-5k visits"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-white font-medium mb-3">
                    Primary Goals (traffic, leads, sales)
                  </span>
                  <textarea
                    rows={4}
                    name="primaryGoals"
                    value={form.primaryGoals}
                    onChange={handleChange}
                    placeholder="What outcomes are you trying to improve?"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-white font-medium mb-3">
                    Target Audience
                  </span>
                  <textarea
                    rows={3}
                    name="targetAudience"
                    value={form.targetAudience}
                    onChange={handleChange}
                    placeholder="Who are your ideal customers?"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-white font-medium mb-3">
                    Top Competitors
                  </span>
                  <textarea
                    rows={3}
                    name="topCompetitors"
                    value={form.topCompetitors}
                    onChange={handleChange}
                    placeholder="List up to 3 competitor websites"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col md:col-span-2">
                  <span className="text-white font-medium mb-3">
                    Main Challenges / Issues
                  </span>
                  <textarea
                    rows={4}
                    name="mainChallenges"
                    value={form.mainChallenges}
                    onChange={handleChange}
                    placeholder="What problems are you seeing today?"
                    className={inputClassName}
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Timeline / Urgency
                  </span>
                  <select
                    name="timelineUrgency"
                    value={form.timelineUrgency}
                    onChange={handleChange}
                    className={inputClassName}
                    required
                  >
                    <option value="">Select a timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="2-4-weeks">2-4 weeks</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="just-exploring">Just exploring</option>
                  </select>
                </label>

                <label className="flex flex-col">
                  <span className="text-white font-medium mb-3">
                    Preferred Contact Method
                  </span>
                  <select
                    name="preferredContactMethod"
                    value={form.preferredContactMethod}
                    onChange={handleChange}
                    className={inputClassName}
                    required
                  >
                    <option value="">Select a contact method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="zoom">Zoom</option>
                  </select>
                </label>
              </div>

              <button
                type="submit"
                className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Get Free Audit"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <StarsCanvas />
    </main>
  );
};

export default SeoAudit;
