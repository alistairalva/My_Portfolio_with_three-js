import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
const Earth = ({ isMobile }) => {
    const earth = useGLTF("./planet/scene.gltf");
    return (_jsxs("mesh", { children: [_jsx("hemisphereLight", { intensity: 1, groundColor: "black" }), _jsx("pointLight", { intensity: 1 }), _jsx("spotLight", { position: [-20, -50, 10], angle: 0.12, penumbra: 1, intensity: 1, castShadow: true, "shadow-mapSize": 1024 }), _jsx("primitive", { object: earth.scene, scale: isMobile ? 1.5 : 2.5, "position-y": 0, "rotation-y": 0 })] }));
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
    return (_jsx(Canvas, { frameloop: "demand", camera: { position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }, dpr: [1, 1.5], gl: { antialias: false, powerPreference: "high-performance" }, children: _jsxs(Suspense, { fallback: _jsx(CanvasLoader, {}), children: [_jsx(OrbitControls, { autoRotate: true, enableZoom: false, maxPolarAngle: Math.PI / 2, minPolarAngle: Math.PI / 2 }), _jsx(Earth, { isMobile: isMobile })] }) }));
};
export default EarthCanvas;
