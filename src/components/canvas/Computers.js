import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
const getViewportWidth = () => {
    if (typeof window === "undefined") {
        return 1280;
    }
    return window.innerWidth;
};
const getModelLayout = (width) => {
    if (width <= 640) {
        return {
            scale: 0.45,
            position: [0, -3.7, -2.0],
        };
    }
    if (width <= 1024) {
        return {
            scale: 0.52,
            position: [0, -3.45, -1.8],
        };
    }
    return {
        scale: 0.65,
        position: [0, -3.25, -1.5],
    };
};
const MODEL_PATH = "/desktop_pc/scene.optimized.glb";
const Computers = ({ layout }) => {
    const computer = useGLTF(MODEL_PATH);
    return (_jsxs("mesh", { children: [_jsx("hemisphereLight", { intensity: 1, groundColor: "black" }), _jsx("pointLight", { intensity: 1 }), _jsx("spotLight", { position: [-20, -50, 10], angle: 0.12, penumbra: 1, intensity: 0.75 }), _jsx("primitive", { object: computer.scene, scale: layout.scale, position: layout.position, rotation: [-0.01, -0.02, -0.1] })] }));
};
const ComputersCanvas = () => {
    const [layout, setLayout] = useState(() => getModelLayout(getViewportWidth()));
    useEffect(() => {
        const handleResize = () => {
            setLayout(getModelLayout(window.innerWidth));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (_jsx(Canvas, { className: "h-full w-full", frameloop: "demand", camera: { position: [20, 3, 5], fov: 25 }, dpr: [1, 1.25], gl: { antialias: false, powerPreference: "high-performance" }, children: _jsxs(Suspense, { fallback: _jsx(CanvasLoader, {}), children: [_jsx(OrbitControls, { enableZoom: false, maxPolarAngle: Math.PI / 2, minPolarAngle: Math.PI / 2 }), _jsx(Computers, { layout: layout })] }) }));
};
useGLTF.preload(MODEL_PATH);
export default ComputersCanvas;
