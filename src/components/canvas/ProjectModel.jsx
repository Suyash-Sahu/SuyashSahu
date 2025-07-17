import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { motion } from 'framer-motion-3d';

const Model = ({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], onClick }) => {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (modelRef.current && hovered) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <motion.group
      ref={modelRef}
      position={position}
      rotation={rotation}
      scale={hovered ? scale * 1.1 : scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      animate={{
        y: hovered ? 0.5 : 0,
      }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      }}
    >
      <primitive object={scene} />
      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="bg-black bg-opacity-75 text-white p-2 rounded">
            Click to view details
          </div>
        </Html>
      )}
    </motion.group>
  );
};

const ProjectModel = ({ modelUrl, scale, position, rotation, onSelect }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ height: '400px' }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Suspense fallback={null}>
        <Model
          url={modelUrl}
          scale={scale}
          position={position}
          rotation={rotation}
          onClick={onSelect}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Suspense>
    </Canvas>
  );
};

export default ProjectModel;
