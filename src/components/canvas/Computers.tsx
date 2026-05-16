import { Suspense, useState, useEffect, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import type { GLTF } from "three-stdlib";

import CanvasLoader from "../Loader";

type ModelLayout = {
  scale: number;
  position: [number, number, number];
};

const getViewportWidth = () => {
  if (typeof window === "undefined") {
    return 1280;
  }

  return window.innerWidth;
};

const getModelLayout = (width: number): ModelLayout => {
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

const Computers: FC<{ layout: ModelLayout }> = ({ layout }) => {
  const computer: GLTF = useGLTF(MODEL_PATH);

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, -50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.75}
      />
      <primitive
        object={computer.scene}
        scale={layout.scale}
        position={layout.position}
        rotation={[-0.01, -0.02, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas: FC = () => {
  const [layout, setLayout] = useState<ModelLayout>(() =>
    getModelLayout(getViewportWidth()),
  );

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

  return (
    <Canvas
      className="h-full w-full"
      frameloop="demand"
      camera={{ position: [20, 3, 5], fov: 25 }}
      dpr={[1, 1.25]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers layout={layout} />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload(MODEL_PATH);

export default ComputersCanvas;
