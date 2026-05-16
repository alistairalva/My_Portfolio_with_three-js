import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
const Stars = () => {
    const ref = useRef(null);
    const [sphere] = useState(() => random.inSphere(new Float32Array(2500), { radius: 1.2 }));
    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });
    return (_jsx("group", { rotation: [0, 0, Math.PI / 4], children: _jsx(Points, { ref: ref, positions: sphere, stride: 3, frustumCulled: true, children: _jsx(PointMaterial, { transparent: true, color: "#f272c8", size: 0.002, sizeAttenuation: true, depthWrite: false }) }) }));
};
const StarsCanvas = () => {
    const [shouldRender, setShouldRender] = useState(true);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
        const handleMediaQueryChange = (event) => {
            setShouldRender(!event.matches);
        };
        setShouldRender(!mediaQuery.matches);
        mediaQuery.addEventListener("change", handleMediaQueryChange);
        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);
    if (!shouldRender) {
        return null;
    }
    return (_jsx("div", { className: "w-full h-auto absolute inset-0 z-[-1]", children: _jsx(Canvas, { camera: { position: [0, 0, 1] }, dpr: [1, 1.5], gl: { antialias: false, powerPreference: "high-performance" }, children: _jsx(Suspense, { fallback: null, children: _jsx(Stars, {}) }) }) }));
};
export default StarsCanvas;
