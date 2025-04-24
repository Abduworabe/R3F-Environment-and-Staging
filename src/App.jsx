import { useFrame } from '@react-three/fiber';
import {RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, OrbitControls, useHelper } from '@react-three/drei'; // Import from drei for easier usage
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import *as THREE from 'three'
// npm install r3f-perf

// SoftShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11
// })
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

  //next AccumlativeShadows will accumulate multiple shasow renders, and we are going to move the light randomly before each render 
  // the AcculmlativeShasows can be renderd on a plane only
  //Since the AccumlariveShasows will be a shasow on its own, we should deactivate theshasows on the <mesh> corresponding to the floor
  // and comment or remove the SoftShasows();
  // import it
  //Add it to the scene right after the directionlLight and don't auto-close it 
  // move it a little abouvve the floor
  //then we need to provide lights to it
  //Create a <directionlight> in the AcumulativeShasoes 
  // use the same positon attribute as the dirctionalLight and add the Casrshsow atrubut



  //The acshasow is doing a lot of shasow renders gut always from the sam dirctional light at teh ecaxt same positon 
  //we nneed to move it randomlu on each frame
  //we are going yo use the RandomizeLight
  //impot it Randomixi

  // add it to the AccoumulativeShasows instead of the directionlaLight and use the same positon atrubute
  
  // The RandomixedLight has multiple attributes to control the behaviour of the light
  //amount ,radious, intensity, anbient
  //Add parameteres related to the shasow map
  //castShasow, mapSizw etc...
  
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
<AccumulativeShadows scale={10} position={[0, -1.499, 0]} rotation-x={Math.PI * 0.25}>
        <RandomizedLight
          position={[1, 2, 3]}
          // castShadow

        />
      </AccumulativeShadows>
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
      <mesh scale={10} rotation-x={-Math.PI * 0.25} position-y={-1.5} >
        <planeGeometry />
        <meshStandardMaterial color="#808000" />
      </mesh>

    </>
  );
}

export default App;
