import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // Import from drei for easier usage
import { useRef } from 'react';
function App() {
  const boxeRef = useRef();
  // This will run on every frame

  // useFrame((state, delta) => {
  //   //1, we need to know hoe much time has passed sone the last frame
  //   //means delta time
  //   boxeRef.current.rotation.y += delta;
  //   // groupRef.current.rotation.y += delta;
  // });

  return (
    <>
      <Canvas>
        {/* If your scene is appearing black, there are a few common reasons for this when using three.js and @react-three/fiber. Here are some steps to troubleshoot and fix the */}
        <ambientLight intensity={2} /> {/* Add ambient light */}
        <pointLight position={[1, 2, 0]} intensity={20} />{' '}
        {/* Add point light */}
        <OrbitControls />
        <mesh position-x={-1.5}>
          <sphereGeometry />
          <meshStandardMaterial color="green" />{' '}
          {/* Set a color for the material */}
        </mesh>
        <mesh position-x={1.5} ref={boxeRef}>
          <boxGeometry />
          <meshStandardMaterial color="#ff0000" />
        </mesh>
        <mesh scale={10} rotation-x={-Math.PI * 0.25} position-y={-1.5}>
          <planeGeometry />
          <meshStandardMaterial color="#808000" />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
