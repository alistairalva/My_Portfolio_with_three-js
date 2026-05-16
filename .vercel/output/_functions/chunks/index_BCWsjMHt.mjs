import { c as createComponent } from './astro-component_csqRG9yS.mjs';
import 'piccolore';
import { r as renderComponent, t as renderTemplate } from './entrypoint_BqpO-GVD.mjs';
import { a as styles, s as services, e as experiences, t as technologies, p as projects, g as githubSrc, $ as $$BaseLayout, A as AstroNavbar } from './AstroNavbar_Csw12Y4D.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { lazy, useRef, useState, useEffect, Suspense } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { a as staggerContainer, t as textVariant, f as fadeIn, s as slideIn, T as ToastHost } from './ToastHost_DnYxOdd8.mjs';
import { toast } from 'react-toastify';
import email from '@emailjs/browser';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Canvas } from '@react-three/fiber';
import { useProgress, Html, useTexture, Float, Decal } from '@react-three/drei';

const SectionWrapper = (Component, idName) => {
  const HOC = () => {
    const sectionId = idName?.trim();
    return /* @__PURE__ */ jsx(
      motion.section,
      {
        id: sectionId || void 0,
        "aria-label": sectionId ? `${sectionId} section` : "portfolio section",
        variants: staggerContainer(),
        initial: "hidden",
        animate: "show",
        className: `${styles.padding} scroll-mt-24 max-w-7xl mx-auto relative z-0`,
        children: /* @__PURE__ */ jsx(Component, {})
      }
    );
  };
  return HOC;
};

const ServiceCard = ({ index, title, icon }) => {
  return /* @__PURE__ */ jsx(
    Tilt,
    {
      tiltMaxAngleX: 45,
      tiltMaxAngleY: 45,
      scale: 1,
      transitionSpeed: 450,
      className: "xs:w-[250px] w-full",
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          variants: fadeIn("right", "spring", 0.5 * index, 0.75),
          className: "w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card",
          children: /* @__PURE__ */ jsxs("div", { className: "bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-center items-center flex-col", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: icon,
                alt: title,
                className: "w-16 h-16 object contain mb-4",
                loading: "lazy",
                decoding: "async"
              }
            ),
            /* @__PURE__ */ jsx("h3", { className: "text-white text-[20px] font-bold text-center", children: title })
          ] })
        }
      )
    }
  );
};
const About = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(0), children: [
      /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Introduction" }),
      /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Overview" })
    ] }),
    /* @__PURE__ */ jsx(
      motion.p,
      {
        variants: fadeIn("", "", 0.1, 1),
        className: "mt-4 text-secondary text-[17px] mx-w-3xl leading-[30px]",
        children: "I'm a technology consultant and software developer with a strong focus on backend architecture for web, mobile, and desktop applications. I specialize in building scalable, high-performance systems with clean APIs and strong data integrity. Over the past few years, I've worked with startups and enterprises across industries like FinTech, real estate, and fitness, delivering everything from MVPs to enterprise-grade infrastructure. I've also consulted on business operations and helped teams improve efficiency, reduce costs, and build strong technical foundations. I'm a quick learner, passionate about clean code, and always exploring new technologies. I work with startups and growth-stage teams in Tanzania and London, Ontario to ship software that drives measurable business outcomes. My goal is to build meaningful software that drives results and to collaborate with teams that care about impact and craftsmanship. Let's build something great together! 🚀"
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        variants: fadeIn("", "", 0.2, 1),
        className: "mt-6 flex flex-wrap gap-4",
        children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/software-developer-tanzania",
              className: "text-[#915eff] underline underline-offset-4 hover:text-white transition-colors",
              children: "Software Developer in Tanzania"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/software-developer-london-ontario",
              className: "text-[#915eff] underline underline-offset-4 hover:text-white transition-colors",
              children: "Software Developer in London, Ontario"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx("ul", { className: "mt-20 flex flex-wrap gap-10 list-none", children: services.map((service, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ServiceCard, { index, ...service }) }, service.title)) })
  ] });
};
const AboutSection = SectionWrapper(About, "about");

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://alistairalva.com", "SSR": true};
const EarthCanvas = lazy(() => import('./Earth_CqcRIkB3.mjs'));
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

const ExperienceCard = ({
  experience
}) => {
  return /* @__PURE__ */ jsxs(
    VerticalTimelineElement,
    {
      contentStyle: { background: "#1d1836", color: "#fff" },
      contentArrowStyle: { borderRight: "7px solid #232631" },
      date: experience.date,
      iconStyle: { background: experience.iconBg },
      icon: /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center w-full h-full", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: experience.icon,
          alt: experience.company_name,
          className: "w-[60%] h-[60%] object-contain",
          loading: "lazy",
          decoding: "async"
        }
      ) }),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white text-[24px] font-bold", children: experience.title }),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "text-secondary text-[16px] font-semibold",
              style: { margin: 0 },
              children: experience.company_name
            }
          )
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "mt-5 list-disc ml-5 space-y-2", children: experience.points.map((point, index) => /* @__PURE__ */ jsx(
          "li",
          {
            className: "text-white-100 text-[14px] pl-1 tracking-wider",
            children: point
          },
          `experience-point-${index}`
        )) })
      ]
    }
  );
};
const Experience = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(0), children: [
      /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "What I have done so far" }),
      /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Experience" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-20 flex flex-col", children: /* @__PURE__ */ jsx(VerticalTimeline, { children: experiences.map((experience, index) => /* @__PURE__ */ jsx(ExperienceCard, { experience }, index)) }) })
  ] });
};
const ExperienceSection = SectionWrapper(Experience, "work");

const heroBg = new Proxy({"src":"/_astro/herobg.DIlOjKkU.webp","width":1600,"height":870,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/assets/herobg.webp";
							}
							
							return target[name];
						}
					});

const heroBgMobile = new Proxy({"src":"/_astro/herobg-mobile.B6JNJd4l.webp","width":640,"height":348,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/assets/herobg-mobile.webp";
							}
							
							return target[name];
						}
					});

const toAssetUrl = (asset) => {
  if (typeof asset === "string") {
    return asset;
  }
  if (typeof asset?.src === "string") {
    return asset.src;
  }
  if (typeof asset?.default === "string") {
    return asset.default;
  }
  if (asset?.default && typeof asset.default === "object" && typeof asset.default.src === "string") {
    return asset.default.src;
  }
  return "";
};
const heroBgUrl = toAssetUrl(heroBg);
const heroBgMobileUrl = toAssetUrl(heroBgMobile);
const ComputersCanvas = lazy(() => import('./Computers_Dwqr8OKJ.mjs'));
const Hero = () => {
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const connection = navigator.connection;
    const isLowPerfDevice = motionQuery.matches || mobileQuery.matches || Boolean(connection?.saveData) || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
    if (isLowPerfDevice) {
      return;
    }
    const scheduleRender = () => setShouldRenderCanvas(true);
    const idleWindow = window;
    let timeoutId;
    let idleId;
    const startDeferredRender = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(scheduleRender, {
          timeout: 2600
        });
        return;
      }
      timeoutId = setTimeout(scheduleRender, 2200);
    };
    if (document.readyState === "complete") {
      startDeferredRender();
    } else {
      window.addEventListener("load", startDeferredRender, { once: true });
    }
    return () => {
      window.removeEventListener("load", startDeferredRender);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (idleId !== void 0) {
        idleWindow.cancelIdleCallback?.(idleId);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `relative w-full mx-auto min-h-[72vh] md:h-screen overflow-hidden`,
      children: [
        /* @__PURE__ */ jsxs("picture", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsx("source", { media: "(max-width: 768px)", srcSet: heroBgMobileUrl }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: heroBgUrl,
              alt: "",
              "aria-hidden": "true",
              fetchPriority: "high",
              loading: "eager",
              decoding: "async",
              width: 1920,
              height: 1080,
              className: "h-full w-full object-cover"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 z-[1] bg-primary/20",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: `${styles.paddingX} pointer-events-none relative z-10 pt-[120px] pb-10 max-w-7xl mx-auto flex 
        flex-row items-start gap-5 md:absolute md:inset-0 md:top-[120px] md:pt-0 md:pb-0`,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center mt-5", children: [
                /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-[#915eff]" }),
                /* @__PURE__ */ jsx("div", { className: "w-1 sm:h-80 h-40 violet-gradient " })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("h1", { className: `${styles.heroHeadText} mt-2 text-white`, children: [
                  "Hi, I'm",
                  /* @__PURE__ */ jsx("span", { className: "text-[#915eff]", children: " Alistair" })
                ] }),
                /* @__PURE__ */ jsxs("p", { className: `${styles.heroSubText} mt-2 text-white-100`, children: [
                  "I ship fast, build quick & deliver excellence.",
                  " ",
                  /* @__PURE__ */ jsx("br", { className: "sm:block hidden" })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-[2]", children: shouldRenderCanvas ? /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(ComputersCanvas, {}) }) : null }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex absolute z-20 xs:bottom-10 bottom-32 w-full justify-center items-center", children: /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#about",
            "aria-label": "Scroll to About section",
            className: "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#915eff] focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
            children: [
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Scroll to About section" }),
              /* @__PURE__ */ jsx("div", { className: "w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2", children: /* @__PURE__ */ jsx(
                motion.div,
                {
                  animate: {
                    y: [0, 24, 0]
                  },
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  },
                  className: "w-3 h-3 rounded-full bg-secondary mb-1"
                }
              ) })
            ]
          }
        ) })
      ]
    }
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx("span", { className: "canvas-load" }),
    /* @__PURE__ */ jsxs(
      "p",
      {
        style: {
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40
        },
        children: [
          progress.toFixed(2),
          "%"
        ]
      }
    )
  ] });
};

const Ball = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return /* @__PURE__ */ jsxs(Float, { speed: 1.75, rotationIntensity: 1, floatIntensity: 1, children: [
    /* @__PURE__ */ jsx("ambientLight", { intensity: 0.2 }),
    /* @__PURE__ */ jsx("directionalLight", { position: [0, 0, 0.05] }),
    /* @__PURE__ */ jsxs("mesh", { castShadow: true, receiveShadow: true, scale: 2.75, children: [
      /* @__PURE__ */ jsx("icosahedronGeometry", { args: [1, 1] }),
      /* @__PURE__ */ jsx(
        "meshStandardMaterial",
        {
          color: "#fff8eb",
          polygonOffset: true,
          polygonOffsetFactor: -5,
          flatShading: true
        }
      ),
      /* @__PURE__ */ jsx(
        Decal,
        {
          position: [0, 0, 1],
          rotation: [2 * Math.PI, 0, 6.25],
          map: decal
        }
      )
    ] })
  ] });
};
const BallCanvas = ({ icon }) => {
  const [renderStaticIcon, setRenderStaticIcon] = useState(false);
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const connection = navigator.connection;
    const updateRenderMode = () => {
      const shouldUseStatic = mobileQuery.matches || reducedMotionQuery.matches || Boolean(connection?.saveData) || connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";
      setRenderStaticIcon(shouldUseStatic);
    };
    updateRenderMode();
    mobileQuery.addEventListener("change", updateRenderMode);
    reducedMotionQuery.addEventListener("change", updateRenderMode);
    return () => {
      mobileQuery.removeEventListener("change", updateRenderMode);
      reducedMotionQuery.removeEventListener("change", updateRenderMode);
    };
  }, []);
  return renderStaticIcon ? /* @__PURE__ */ jsx("img", { src: icon, alt: "icon", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsx(
    Canvas,
    {
      frameloop: "demand",
      dpr: [1, 1.25],
      gl: { antialias: false, powerPreference: "high-performance" },
      children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: /* @__PURE__ */ jsx(Ball, { imgUrl: icon }) })
    }
  );
};

const Tech = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "Tools and Platforms" }),
    /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Tech Stack." }),
    /* @__PURE__ */ jsx(
      "ul",
      {
        className: "mt-10 flex flex-row flex-wrap justify-center gap-10 list-none",
        "aria-label": "Technology icons",
        children: technologies.map((technology) => /* @__PURE__ */ jsx("li", { className: "w-28 h-28", children: /* @__PURE__ */ jsx(BallCanvas, { icon: technology.icon }) }, technology.name))
      }
    )
  ] });
};
const TechSection = SectionWrapper(Tech, "tech");

const ProjectCard = ({ index, project }) => {
  return /* @__PURE__ */ jsx(motion.div, { variants: fadeIn("up", "spring", index * 0.5, 0.75), children: /* @__PURE__ */ jsx("article", { "aria-label": `${project.name} project`, children: /* @__PURE__ */ jsxs(
    Tilt,
    {
      tiltMaxAngleX: 45,
      tiltMaxAngleY: 45,
      scale: 1,
      transitionSpeed: 450,
      className: "bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full h-[230px]", children: [
          /* @__PURE__ */ jsxs("picture", { children: [
            project.imageMobile ? /* @__PURE__ */ jsx(
              "source",
              {
                media: "(max-width: 768px)",
                srcSet: project.imageMobile
              }
            ) : null,
            /* @__PURE__ */ jsx(
              "img",
              {
                src: project.image,
                alt: project.name,
                className: "w-full h-full object-cover rounded-2xl",
                loading: "lazy",
                decoding: "async"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex justify-end m-3 card-img_hover", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: project.source_code_link,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": `Open ${project.name} source code on GitHub`,
              className: "black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer",
              children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: githubSrc,
                  alt: "github",
                  className: "w-1/2 h-1/2 object-contain"
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-white font-bold text-[24px]", children: project.name }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-secondary text-[14px]", children: project.description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: project.tags.map((tag) => /* @__PURE__ */ jsxs("p", { className: `text-[14px] ${tag.color}`, children: [
          "#",
          tag.name
        ] }, tag.name)) })
      ]
    }
  ) }) });
};
const Works = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(motion.div, { variants: textVariant(0), children: [
      /* @__PURE__ */ jsx("p", { className: styles.sectionSubText, children: "My work" }),
      /* @__PURE__ */ jsx("h2", { className: styles.sectionHeadText, children: "Projects." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full flex", children: /* @__PURE__ */ jsx(
      motion.p,
      {
        variants: fadeIn("", "", 0.1, 1),
        className: "mt-3 text-secondary text-[17px] mx-w-3xl leading-[30px]",
        children: "The following projects contain some of the work I have done so far. I am also currently working on a few more. I try to show my experience in building software for different domains and use cases. Each project has links to a GitHub repository and a live demo where available. Moreover, I have many other projects that are not listed here. If you want to see more, please email me and I will be happy to share them."
      }
    ) }),
    /* @__PURE__ */ jsx("ul", { className: "mt-20 flex flex-wrap gap-7 list-none", children: projects.map((project, index) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ProjectCard, { index, project }) }, project.name)) })
  ] });
};
const WorkSection = SectionWrapper(Works, "projects");

const StarsCanvas = lazy(() => import('./Stars_Cls4BoDU.mjs'));
const HomeSections = () => {
  return /* @__PURE__ */ jsxs("main", { id: "main-content", className: "relative z-0 bg-primary", children: [
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx(AboutSection, {}),
    /* @__PURE__ */ jsx(ExperienceSection, {}),
    /* @__PURE__ */ jsx(TechSection, {}),
    /* @__PURE__ */ jsx(WorkSection, {}),
    /* @__PURE__ */ jsxs("div", { className: "relative z-0", children: [
      /* @__PURE__ */ jsx(ContactSection, {}),
      /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(StarsCanvas, {}) })
    ] })
  ] });
};

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const baseUrl = "https://alistairalva.com";
  const toAssetUrl = (asset) => {
    if (typeof asset === "string") {
      return asset;
    }
    return typeof asset?.src === "string" ? asset.src : "";
  };
  const heroBgUrl = toAssetUrl(heroBg);
  const heroBgMobileUrl = toAssetUrl(heroBgMobile);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: `${baseUrl}/`,
        name: "Alistair Alva",
        description: "Technology consultant and software developer portfolio with engineering case studies and SEO audit services.",
        inLanguage: "en",
        potentialAction: {
          "@type": "ReadAction",
          target: [`${baseUrl}/`, `${baseUrl}/free-seo-audit`]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: `${baseUrl}/`,
        name: "Software Developer in Tanzania and London, Ontario | Alistair Alva",
        description: "Software developer and technology consultant serving businesses in Tanzania and London, Ontario with backend architecture, web platforms, and cloud engineering.",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        },
        inLanguage: "en",
        primaryImageOfPage: `${baseUrl}/og/home.svg`
      },
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Alistair Alva",
        url: `${baseUrl}/`,
        jobTitle: "Technology Consultant & Software Developer",
        description: "Technology consultant and software developer focused on backend systems, cloud architecture, and growth-oriented web delivery in Tanzania and London, Ontario.",
        image: `${baseUrl}/logo.svg`,
        sameAs: ["https://github.com/alistairalva"],
        mainEntityOfPage: {
          "@id": `${baseUrl}/#webpage`
        },
        areaServed: [
          {
            "@type": "Country",
            name: "Tanzania"
          },
          {
            "@type": "AdministrativeArea",
            name: "London, Ontario",
            containedInPlace: {
              "@type": "Country",
              name: "Canada"
            }
          }
        ],
        knowsAbout: [
          "Backend Development",
          "Web Development",
          "Cloud Architecture",
          "SEO"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#software-development-service`,
        name: "Software Development and Technology Consulting",
        url: `${baseUrl}/`,
        provider: {
          "@id": `${baseUrl}/#person`
        },
        serviceType: [
          "Software Development",
          "Backend Engineering",
          "Technology Consulting"
        ],
        areaServed: [
          {
            "@type": "Country",
            name: "Tanzania"
          },
          {
            "@type": "AdministrativeArea",
            name: "London, Ontario",
            containedInPlace: {
              "@type": "Country",
              name: "Canada"
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${baseUrl}/`
          }
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#projects`,
        name: "Featured Projects",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.description,
            codeRepository: project.source_code_link,
            keywords: project.tags.map((tag) => tag.name).join(", "),
            author: {
              "@id": `${baseUrl}/#person`
            }
          }
        }))
      }
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Software Developer in Tanzania and London, Ontario | Alistair Alva", "description": "Software developer and technology consultant serving businesses in Tanzania and London, Ontario with backend architecture, web platforms, and cloud engineering.", "canonicalPath": "/", "socialImage": "/og/home.svg", "socialImageAlt": "Alistair Alva technology consultant and software developer portfolio", "keywords": "software developer tanzania, software developer london ontario, backend developer tanzania, web developer london ontario, technology consultant tanzania, software engineer london ontario", "preloadImages": [
    {
      href: heroBgUrl,
      media: "(min-width: 769px)",
      type: "image/webp",
      fetchPriority: "high"
    },
    {
      href: heroBgMobileUrl,
      media: "(max-width: 768px)",
      type: "image/webp",
      fetchPriority: "high"
    }
  ], "structuredData": structuredData }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "AstroNavbar", AstroNavbar, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/AstroNavbar", "client:component-export": "default" })} ${renderComponent($$result2, "HomeSections", HomeSections, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/HomeSections", "client:component-export": "default" })} ${renderComponent($$result2, "ToastHost", ToastHost, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/components/ToastHost", "client:component-export": "default" })} ` })}`;
}, "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/index.astro", void 0);

const $$file = "C:/Users/Alistair/source/PersonalPortfolio/My_Portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

const index___astro = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  page
}, Symbol.toStringTag, { value: 'Module' }));

export { Loader as L, index___astro as i };
