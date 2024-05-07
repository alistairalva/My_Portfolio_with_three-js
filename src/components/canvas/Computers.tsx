import { Suspense, useState, useEffect, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import CanvasLoader from "../Loader";

type ComputersProps = {
  isMobile: boolean;
};

const Computers: FC<ComputersProps> = ({ isMobile }) => {
  const computer: GLTF = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, -50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [0, -3.5, -2.0] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.02, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas: FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* <Preload all /> */}
        <Computers isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;