import { useFrame } from '@react-three/fiber';
import { SoftShadows, BakeShadows, OrbitControls, useHelper } from '@react-three/drei'; // Import from drei for easier usage
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import *as THREE from 'three'
SoftShadows({
  frustum: 3.75,
  size: 0.005,
  near: 9.5,
  samples: 17,
  rings: 11
})
// npm install r3f-perf
function App() {
  const boxeRef = useRef();
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)
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

  //Shasows 
  //1 rs Activet its on canva

  // Baking:mans the render is ones render the shasow whn statrt like useEffect with impty depandecy
  // used whan static scene not move 
  //import BakeShasows from @react-three/drei

  // the default shadow sitin is look so good. but we can tiwk it
  // in native three.js  we can access it with diractionalight. shasow.mapSixze.wet(1024, 1024)
  //but how can we do that in R3F
  // we can do it by referance but thire is bast option 
  //To change the shasow.mapSize Property, we can use the Shasoe-mapSize attrbute
  // and we can do the same with the near, far, top, right botton and left properties

  //next Soft Shadows
  //the default shasows are too sharp 
  //Ther are multiple ways of Softening them and we are going to discover one techniue called Percent Closer soft Shasowe(PCSS)
  // drei comes to the rescue with a helper named SoftShasows()
  //To make SoftShasows() work, we call it once at the beginning and outside of any component because this functon well modify Three.js Shaders directly
  //why it used? solution whan the boll bounce the near object shadow is bold the far is not just like this.
  // in app.js inport it from @react-three.drei

  return (
    <>
      <BakeShadows />
      {/* If your scene is appearing black, there are a few common reasons for this when using three.js and @react-three/fiber. Here are some steps to troubleshoot and fix the */}
      <ambientLight intensity={2} /> {/* Add ambient light */}
      <directionalLight
        position={[1, 2, 3]}
        intensity={1.5}
        ref={directionalLightRef}
        castShadow
        shadow-mapSize={[1024, 1024]}
      // shadow-camera-top={2}
      // shadow-camera-right={2}
      // shadow-camera-bottom={-2}
      // shadow-camera-left={2}
      />{' '}
      {/* Add point light */}
      <OrbitControls />
      <Perf position='top-left' />
      {/* <Perf /> */}
      <mesh position-x={-1.5} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="green" />{' '}
        {/* Set a color for the material */}
      </mesh>
      <mesh position-x={1.5} ref={boxeRef} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ff0000" />
      </mesh>
      <mesh scale={10} rotation-x={-Math.PI * 0.25} position-y={-1.5} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color="#808000" />
      </mesh>

    </>
  );
}

export default App;
