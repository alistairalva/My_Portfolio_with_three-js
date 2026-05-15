import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Float, Decal } from '@react-three/drei';
import { L as Loader } from './Loader_I9TZdz-6.mjs';
import { S as SectionWrapper } from './index_DLbif0VB.mjs';
import { a as styles, t as technologies } from './AstroNavbar_B75kH4Ct.mjs';

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
  const [isMobile, setIsMobile] = useState(false);
  const mediaQuery = window.matchMedia("(max-width: 560px)");
  useEffect(() => {
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [mediaQuery]);
  return isMobile ? /* @__PURE__ */ jsx("img", { src: icon, alt: "icon" }) : /* @__PURE__ */ jsx(Canvas, { frameloop: "demand", gl: { preserveDrawingBuffer: true }, children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: [
    /* @__PURE__ */ jsx(OrbitControls, { enableZoom: false }),
    /* @__PURE__ */ jsx(Ball, { imgUrl: icon })
  ] }) });
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

export { TechSection as default };
