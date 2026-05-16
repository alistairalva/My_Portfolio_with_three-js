import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, OrbitControls, useTexture,
// MeshProps,
 } from "@react-three/drei";
import CanvasLoader from "../Loader";
const Ball = ({ imgUrl }) => {
    const [decal] = useTexture([imgUrl]);
    return (_jsxs(Float, { speed: 1.75, rotationIntensity: 1, floatIntensity: 1, children: [_jsx("ambientLight", { intensity: 0.2 }), _jsx("directionalLight", { position: [0, 0, 0.05] }), _jsxs("mesh", { castShadow: true, receiveShadow: true, scale: 2.75, children: [_jsx("icosahedronGeometry", { args: [1, 1] }), _jsx("meshStandardMaterial", { color: "#fff8eb", polygonOffset: true, polygonOffsetFactor: -5, flatShading: true }), _jsx(Decal, { position: [0, 0, 1], rotation: [2 * Math.PI, 0, 6.25], map: decal })] })] }));
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
    return isMobile ? (_jsx("img", { src: icon, alt: "icon" })) : (_jsx(Canvas, { frameloop: "demand", gl: { preserveDrawingBuffer: true }, children: _jsxs(Suspense, { fallback: _jsx(CanvasLoader, {}), children: [_jsx(OrbitControls, { enableZoom: false }), _jsx(Ball, { imgUrl: icon })] }) }));
};
export default BallCanvas;
