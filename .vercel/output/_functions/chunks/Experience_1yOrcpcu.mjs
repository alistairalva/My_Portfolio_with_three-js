import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { motion } from 'framer-motion';
import { a as styles, e as experiences } from './AstroNavbar_0JLaRSFt.mjs';
import { S as SectionWrapper } from './index_Bgaaulb2.mjs';
import { t as textVariant } from './ToastHost_DnYxOdd8.mjs';

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

export { ExperienceSection as default };
