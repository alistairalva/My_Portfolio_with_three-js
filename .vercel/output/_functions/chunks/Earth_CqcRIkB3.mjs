import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { L as Loader } from './index_BCWsjMHt.mjs';

const Earth = ({ isMobile }) => {
  const earth = useGLTF("./planet/scene.gltf");
  return /* @__PURE__ */ jsxs("mesh", { children: [
    /* @__PURE__ */ jsx("hemisphereLight", { intensity: 1, groundColor: "black" }),
    /* @__PURE__ */ jsx("pointLight", { intensity: 1 }),
    /* @__PURE__ */ jsx(
      "spotLight",
      {
        position: [-20, -50, 10],
        angle: 0.12,
        penumbra: 1,
        intensity: 1,
        castShadow: true,
        "shadow-mapSize": 1024
      }
    ),
    /* @__PURE__ */ jsx(
      "primitive",
      {
        object: earth.scene,
        scale: isMobile ? 1.5 : 2.5,
        "position-y": 0,
        "rotation-y": 0
      }
    )
  ] });
};
const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return /* @__PURE__ */ jsx(
    Canvas,
    {
      frameloop: "demand",
      camera: { position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 },
      dpr: [1, 1.5],
      gl: { antialias: false, powerPreference: "high-performance" },
      children: /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx(Loader, {}), children: [
        /* @__PURE__ */ jsx(
          OrbitControls,
          {
            autoRotate: true,
            enableZoom: false,
            maxPolarAngle: Math.PI / 2,
            minPolarAngle: Math.PI / 2
          }
        ),
        /* @__PURE__ */ jsx(Earth, { isMobile })
      ] })
    }
  );
};

export { EarthCanvas as default };
