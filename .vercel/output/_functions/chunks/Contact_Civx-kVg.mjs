import { jsxs, jsx } from 'react/jsx-runtime';
import { lazy, useRef, useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import email from '@emailjs/browser';
import { a as styles } from './AstroNavbar_C3Ux8xkL.mjs';
import { S as SectionWrapper } from './index_SKvDXMQQ.mjs';
import { s as slideIn } from './ToastHost_DnYxOdd8.mjs';

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://alistairalva.com", "SSR": true};
const EarthCanvas = lazy(() => import('./Earth_CoSAhB3c.mjs'));
const Contact = () => {
  const formRef = useRef(null);
  const toastOptions = {
    position: "bottom-left",
    autoClose: 5e3,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: void 0,
    theme: "colored"
  };
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [shouldRenderEarth, setShouldRenderEarth] = useState(false);
  const earthContainerRef = useRef(null);
  useEffect(() => {
    const target = earthContainerRef.current;
    if (!target || shouldRenderEarth) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          setShouldRenderEarth(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px"
      }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldRenderEarth]);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.user_name || !form.user_email || !form.message) {
      toast.warn("Please fill out all fields", toastOptions);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const env = Object.assign(__vite_import_meta_env__, { VITE_APP_EMAILJS_SERVICE_ID: "service_wj916sj", VITE_APP_EMAILJS_TEMPLATE_ID: "template_rhbecfn", VITE_APP_EMAILJS_PUBLIC_API_KEY: "r7tbf2eRctia6w7b9", VITE_APP_EMAIL: "alistairalva2000@outlook.com", PUBLIC: "C:\\Users\\Public", TEMP: "C:\\Users\\Alistair\\AppData\\Local\\Temp" });
      const serviceId = env.PUBLIC_EMAILJS_SERVICE_ID || env.VITE_APP_EMAILJS_SERVICE_ID;
      const templateId = env.PUBLIC_EMAILJS_TEMPLATE_ID || env.VITE_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = env.PUBLIC_EMAILJS_PUBLIC_API_KEY || env.VITE_APP_EMAILJS_PUBLIC_API_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS environment variables are not configured");
      }
      await email.sendForm(serviceId, templateId, formRef.current, publicKey);
      setForm({ user_name: "", user_email: "", message: "" });
      formRef.current?.reset();
      toast.success(
        "Thank you, I will get back to you as soon as possible",
        toastOptions
      );
    } catch (error) {
      toast.error(
        "Failed to send message. Please try again later.",
        toastOptions
      );
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        variants: slideIn("left", "tween", 0.2, 0.1),
        className: "flex-[0.75] bg-black-100 p-8 rounded-2xl",
        children: [
          /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Get in Touch" }),
          /* @__PURE__ */ jsx("h2", { id: "contact-form-heading", className: styles.sectionHeadText, children: "Contact." }),
          /* @__PURE__ */ jsxs(
            "form",
            {
              ref: formRef,
              onSubmit: handleSubmit,
              "aria-labelledby": "contact-form-heading",
              className: "mt-12 flex flex-col gap-8",
              children: [
                /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-4", children: "Your Name" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      name: "user_name",
                      value: form.user_name,
                      onChange: handleChange,
                      placeholder: "What's your name?",
                      className: "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-4", children: "Your Email" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "email",
                      name: "user_email",
                      value: form.user_email,
                      onChange: handleChange,
                      placeholder: "What's your email?",
                      className: "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("label", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-white font-medium mb-4", children: "Your Message" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      rows: 7,
                      name: "message",
                      value: form.message,
                      onChange: handleChange,
                      placeholder: "What do you want to say?",
                      className: "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none focus-visible:ring-2 focus-visible:ring-[#915eff]"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    className: "bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl focus-visible:ring-2 focus-visible:ring-[#915eff]",
                    children: loading ? "Sending..." : "Send"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        ref: earthContainerRef,
        variants: slideIn("left", "tween", 0.2, 0.1),
        className: "xl:flex-1 xl:h-auto md:h-[550px] h-[350px]",
        children: shouldRenderEarth ? /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(EarthCanvas, {}) }) : null
      }
    )
  ] });
};
const ContactSection = SectionWrapper(Contact, "contact");

export { ContactSection as default };
