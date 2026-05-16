import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

interface BallProps {
  imgUrl: string;
}

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={1}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
      </mesh>
    </Float>
  );
};

interface BallCanvasProps {
  icon: string;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  const [renderStaticIcon, setRenderStaticIcon] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const updateRenderMode = () => {
      const shouldUseStatic =
        mobileQuery.matches ||
        reducedMotionQuery.matches ||
        Boolean(connection?.saveData) ||
        connection?.effectiveType === "2g" ||
        connection?.effectiveType === "slow-2g";

      setRenderStaticIcon(shouldUseStatic);
    };

    updateRenderMode();
    mobileQuery.addEventListener("change", updateRenderMode);
    reducedMotionQuery.addEventListener("change", updateRenderMode);

    return () => {
      mobileQuery.removeEventListener("change", updateRenderMode);
      reducedMotionQuery.removeEventListener("change", updateRenderMode);
    };
  }, []);

  return renderStaticIcon ? (
    <img src={icon} alt="icon" loading="lazy" decoding="async" />
  ) : (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.25]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Ball imgUrl={icon} />
      </Suspense>
    </Canvas>
  );
};
export default BallCanvas;
