import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import Tilt from 'react-parallax-tilt';
import { a as styles, p as projects, g as githubSrc } from './AstroNavbar_BSu_1M8D.mjs';
import { motion } from 'framer-motion';
import { S as SectionWrapper } from './index_CexM5_QM.mjs';
import { t as textVariant, f as fadeIn } from './ToastHost_DnYxOdd8.mjs';

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

export { WorkSection as default };
