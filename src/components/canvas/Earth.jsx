import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF, Stars, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

import CanvasLoader from '../Loader';

const ParticleRing = () => {
  const points = useRef();
  const [sphere] = useState(() => 
    new Float32Array(
      Array.from({ length: 10000 }, (_, i) => {
        const angle = (i / 5000) * Math.PI * 2;
        const radius = 3.5 + Math.random() * 0.2;
        return [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 0.5,
          Math.sin(angle) * radius,
        ];
      }).flat()
    )
  );

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      points.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={sphere.length / 3}
          array={sphere}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.01}
        color="#915eff"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const ParticleField = () => {
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group>
      <Points
        ref={pointsRef}
        positions={new Float32Array(Array.from({ length: 5000 }, () => (Math.random() - 0.5) * 50))}
        stride={3}
        frustumCulled={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <PointMaterial
          transparent
          color={hovered ? '#f272c8' : '#fff'}
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  const earthRef = useRef();

  useFrame((state) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive 
      ref={earthRef}
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full h-full min-h-[500px] relative">
      {/* Glow effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse animation-delay-2000" />
      </div>

      <Canvas
        shadows
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        className="z-10"
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.5} />
          
          {/* Directional lights for dramatic effect */}
          <directionalLight position={[5, 5, 5]} intensity={1} color="#4fc3dc" />
          <directionalLight position={[-5, -5, -5]} intensity={1} color="#ff2d75" />
          
          {/* Point lights for extra glow */}
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#4fc3dc" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff2d75" />

          {/* Controls */}
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          {/* Scene */}
          {isMounted && (
            <>
              <Stars
                radius={300}
                depth={60}
                count={1000}
                factor={7}
                saturation={0}
                fade
                speed={1}
              />
              <ParticleField />
              <Earth />
              <ParticleRing />
            </>
          )}
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default EarthCanvas;
