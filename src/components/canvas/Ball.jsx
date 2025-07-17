import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
  MeshDistortMaterial
} from '@react-three/drei';

import CanvasLoader from '../Loader';

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float 
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={2}
      floatingRange={[-0.2, 0.2]}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.5} />
      <pointLight position={[-1, -1, -1]} intensity={0.5} />
      <pointLight position={[1, 1, 1]} intensity={0.5} />
      
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#ffffff"
          attach="material"
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#ffffff"
          emissiveIntensity={0.1}
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          flatShading
          map={decal}
          transparent
          polygonOffset
          polygonOffsetFactor={-10}
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: true,
        alpha: true
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 6]
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
