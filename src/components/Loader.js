import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Html, useProgress } from "@react-three/drei";
const Loader = () => {
    const { progress } = useProgress();
    return (_jsxs(Html, { children: [_jsx("span", { className: "canvas-load" }), _jsxs("p", { style: {
                    fontSize: 14,
                    color: "#f1f1f1",
                    fontWeight: 800,
                    marginTop: 40,
                }, children: [progress.toFixed(2), "%"] })] }));
};
export default Loader;
