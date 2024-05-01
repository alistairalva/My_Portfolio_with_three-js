import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import earthTexture from '../../assets/8k_earth.jpg';

const AnimatedSphere = () => {

    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(earthTexture);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial map={texture} />
        </mesh>
    );
};

const Sphere = () => (
    <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[0, 0, 5]} />
        <directionalLight position={[1, 1, 1]} intensity={2} />
        <AnimatedSphere />
        <OrbitControls />
    </Canvas>
);

export default Sphere;