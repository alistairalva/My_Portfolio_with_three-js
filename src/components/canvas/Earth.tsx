import { Suspense, useState, useEffect, FC } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

import CanvasLoader from "../Loader";

type EarthProps = {
  isMobile: boolean;
};

const Earth: FC<EarthProps> = ({ isMobile }) => {
  const earth: GLTF = useGLTF("./planet/scene.gltf");

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
        object={earth.scene}
        scale={isMobile ? 1.5 : 2.5}
        position-y={0}
        rotation-y={0}
      />
    </mesh>
  );
};

const EarthCanvas: FC = () => {
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
      camera={{ position: [-4, 3, 6], fov: 45, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Preload all />
        <Earth isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
