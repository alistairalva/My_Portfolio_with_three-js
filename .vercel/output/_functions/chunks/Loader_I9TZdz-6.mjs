import { jsxs, jsx } from 'react/jsx-runtime';
import { useProgress, Html } from '@react-three/drei';

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

export { Loader as L };
