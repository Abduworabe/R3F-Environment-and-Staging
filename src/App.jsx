import { useFrame } from '@react-three/fiber';
import { OrbitControls, useHelper } from '@react-three/drei'; // Import from drei for easier usage
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import *as THREE from 'three'

// npm install r3f-perf
function App() {
  const boxeRef = useRef();
  const directionalLightRef = useRef();

  useHelper(directionalLightRef,THREE.DirectionalLightHelper, 1)
  // This will run on every frame
  
  useFrame((state, delta) => {
    //   //1, we need to know hoe much time has passed sone the last frame
    //   //means delta time
    boxeRef.current.rotation.y += delta;
    //   // groupRef.current.rotation.y += delta;
  });
  // Light
  // <ambientLight>
  //   <hemisphereLight
  //   <directionalLight
  //   <pointLight
  //   <rectAreaLight
  //   <spotLight
  //1 Light helpers
  // it used to animat light
  // we can still use Three.js light helpers with useHelper from drei
  // 1 st we need a reference to the directionlLight
  //then import useHelper from @react-three/drei
  //the first parameteris the reference to the lighy source and the second patameter is thehelper class we eant to use from three.js
  // This means that we need to import THREE  in order to ger access to DirectionalLightHelper class



  return (
    <>

      {/* If your scene is appearing black, there are a few common reasons for this when using three.js and @react-three/fiber. Here are some steps to troubleshoot and fix the */}
      <ambientLight intensity={2} /> {/* Add ambient light */}
      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
        ref={directionalLightRef}
      />{' '}
      {/* Add point light */}
      <OrbitControls />
      <Perf position='top-left' />
      {/* <Perf /> */}
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

    </>
  );
}

export default App;
