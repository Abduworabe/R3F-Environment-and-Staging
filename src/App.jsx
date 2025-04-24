import { useFrame } from '@react-three/fiber';
import { Stage, Lightformer, Environment, Sky, ContactShadows, RandomizedLight, AccumulativeShadows, SoftShadows, BakeShadows, OrbitControls, useHelper, Ring } from '@react-three/drei'; // Import from drei for easier usage
import { useRef } from 'react';
import { Perf } from 'r3f-perf';
import *as THREE from 'three'
import { useControls } from 'leva';
// npm install r3f-perf

// SoftShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11
// })
function App() {

  const { color, opacity, blur } = useControls('ContactShadows', {
    color: '#9ae58a',
    opacity: { value: 1, min: 0, max: 1 },
    blur: { value: 3.5, min: 0, max: 10 },
  })

  const { sunPosition } = useControls('sky', {
    sunPosition: { value: [1, 2, 3] }
  })
  const { envMapIntensity } = useControls('environment', {
    envMapIntensity: { value: 1, min: 0, max: 12 },
  });


  const boxeRef = useRef();
  const directionalLightRef = useRef();

  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1)
  // // This will run on every frame

  useFrame((state, delta) => {
    //   //1, we need to know hoe much time has passed sone the last frame
    //   //means delta time
    const time = state.clock.elapsedTime
    boxeRef.current.rotation.y += delta;
    // boxeRef.current.position.x=2+Math.sin(time)// 2 is starting of box or curnt inital postion 

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


  //We also have access to some attributes on the AccumulativeShasows  
  //colors -the color of the shadow
  //opacity-  the opacity of the shadow

  //And tow more atttibutes  like frames-how many shadow renders to do
  // temporal-spread teh renders across multiple frames
  //1000
  //The shasow looks smooth but Three.js had to do htose 100 renders on the first frame
  // so We can prevent the freeze with temporal
  // A weird shape is being drawn on the shadow if you move the camera,
  // this is due to the directional light helper messing up with the shadow map
  // Let's remove or comment the helper 
  // Reduce the amount of frames to 100
  // In the useFrame, retrieve the clock elapsedTime and assign it to a time  varible
  // We specifically asked the AccumulativeShadows to render 100 frames only 
  //the Solution is to tell the AccumulativeShadows to keep rendering the shadows with the frames attribute to infinity,
  // finall we can use  static scene is use AccumulativeShadow but dinamic not use 
  // comment the animation we added to the cube and put back the light helper

  //ContactShadows
  //this doesn't rely on the default shadow system of three.js 
  //Deactivate Shadows on the Canvas
  //Commment AccumulativeShadows

  //contactShadows works without a light and omly on a plane
  // import contactShadows from drei
  //add anywhere in the hsx
  //move it right above the floor
  //we can improve the qualikty with resolution 
  //We can shoose how far the shadow will render objects above with the far attribute
  //This time, we are going to add the rest of the paramtersto Leva inorder to find the best settings
  //install leva with npm install leva@learst
  // Create the color , opacity and blur tweaks in a 'cotact Shadows' folder
  //We can bake the shadow by setting the frames attribute on the contactShadow to 1

  //#Sky
  // R3F and drei make the task very easy with the sky hlper
  // import it 
  //Add it anywhere in the jsx
  //This class is physice-based and tries to reproduce a realistic sky according to various parameters like mieCoefficient, mieDirectionalalG, rayleith and turbidity
  // we are not going to cover thise and only play with the position of the sun usin Leva
  //Call useControls, set the first parameter as 'sky' and send an object with a sunPosition proerty set to have a vector 3 tweak
  // use that value in the <sky>
  //but This is not the usual way of setting a sun position an dit, sberrer to use Spherical coordinates
  //create a Spherical
  //create a vector3
  //use its setFromSphrical method
  // to make the scene more realstic and logical we can use the sunPostion for the directionallight


  //Environment Map
  //drei made the process esier with the enviromment helper
  //we are going to use the enviromnent map to illuminate the Scene
  //to prevent confilicts, we are going to commnt the current loghts and also the sky
  // imposrt Environment from drei
  //setup with cube texture
  //first we are going to use the traditional cube textures that you can find in the /public/envirmntmape/ folder
  //add the <Envirnent. to jsx and set its files attribute to contain an array of textures

  //Intensity
  //the default envMapIntensty is set to 1
  //Call useControls set hte first parameter as environment map in order ot have a folder with that name and send an object  with a envMapIntensity  property that ranges between 0 and 12 (don't forgat to retrive the envMapIntensty)
  //Use that value on every <meshStandardMatrial>
  //Background
  // if you want to see the environment map in the backgtound add a backround attribute
  //cube map is bast above but we can use more realsitc 


  //HDRI texture
  // instead of using 6 images we can use one image covering the surrounding
  // if you are looking for HDRI concept one of the best place is poly haven 
  //download the hdr version and not exr
  //try to keep the resolution as small as possible


  //presets
  // Even better than having to download those HDRI, drei created presers that will take the files directly from poly haven
  //Replce files by preset and choose on e among the following list 
  // https://github.com//pmmndrs/drei/blob/master/src/helpers/environment-assets.ts

  //Custom environment
  //We  would like to have red rectangle on one side to ensure there's red light illuminating out objects from this side 
  //we can  position a <mesh> inside the <Environmt>
  // First create the Mmesh> outside the <Environmint> to make sure it's well positoned
  //then add it on the enviromnt 


  // Adding lights to the environment map this way is a viable solutin , but three is a helper made for this purops named LightFormer.
  //comment <mesh> insid the <Environment>

  // import LightFormer from drei

  //Add it to the <Environment> with the same position and Scale that we had on our <mesh>

  // comment the resolution 


  //Ground 
  //when using an environment map as a background, we have the feeling that 
  //objects are floating because the image is infinitley far
  //By adding a ground Attribute, the projection of the envitonment map will make it look as if the floor underneath the objects is near
  //Add the ground Attribut to <environment> with the folloewing parameters instead of the background attrbute
  // ground={{

  //That ground is considerd to be at the 0 elevation of the Scene, this means that in theory our object are inside the ground 
  //fix it by moving them up a little with their position-y attribute

  //Remove or comment the green floor plane and move the <contactShasows> up with its postion attribute

  // Stage
  //sometimes, we just want a default good looking setting with mininal configutation
  //add this is what the Stage helper does
  //stage will set an envitonment map , shadows, two directonal light and center the scene
  //Comment everything in the jsx eccept for the <orbitcontrol> and <perf> 
  //then dupliecate the spher <mesh> and cube

  //import Stage from drei
  // put mesh in to stage 

  //Change the directional lights preset

  return (
    <>

      {/* <Environment
        background
        ground={{
          height:7, 
          radius:28,
          scale:100
        }}
       resolution={32}
        files={
            [
            './environmentMaps/2/px.jpg',
            './environmentMaps/2/nx.jpg',
            './environmentMaps/2/py.jpg',
            './environmentMaps/2/ny.jpg',
            './environmentMaps/2/pz.jpg',
            './environmentMaps/2/nz.jpg',
          ]
          './environmentMaps/the_sky_is_on_fire_2k.hdr'
        }


      preset='surser' like this
      >
        <Lightformer position-z={-5}  form={Ring} scale={10} color="red" intensity={3}/>

        <color args={['ivory']} attach={background}/>
 
      </Environment> */}


      {/* <Sky
        sunPosition={sunPosition}
      /> */}
      {/* <ContactShadows
        position={[0, 0, 0]}
        scale={10}
        resolution={512}
        color={color}
        far={5}
        opacity={opacity}
        blur={blur}
      // frames={1} if the scene is statice

      /> */}

      {/* <BakeShadows /> */}
      {/* If your scene is appearing black, there are a few common reasons for this when using three.js and @react-three/fiber. Here are some steps to troubleshoot and fix the */}

      {/* <ambientLight intensity={2} /> Add ambient light */}

      {/* <directionalLight
     
        position={sunPosition}
        intensity={1.5}
        ref={directionalLightRef}
        castShadow
        shadow-mapSize={[1024, 1024]}
      // shadow-camera-top={2}
      // shadow-camera-right={2}
      // shadow-camera-bottom={-2}
      // shadow-camera-left={2}
      />{' '} */}
      {/* <AccumulativeShadows
        scale={10}
        position={[0, -1.499, 0]}
        rotation-x={Math.PI * 0.25}
        color='#316d69'
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={2}
          bias={0.001}
          position={[1, 2, 3]}
          // castShadow
        
        // /> */}
      {/* </AccumulativeShadows> */}
      {/* Add point light */}
      <OrbitControls />

      <Perf position='top-left' />
      {/* <Perf /> */}
      {/* <mesh position-y={1} position-x={-1.5} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="green" envMapIntensity={envMapIntensity} />
        Set a color for the material 
      </mesh> */}
      {/* <mesh position-y={1}  position-x={1.5} ref={boxeRef} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="#ff0000" envMapIntensity={envMapIntensity} />
      </mesh> */}
      {/* <mesh  scale={10} rotation={[-Math.PI / 2, 0, 0]} position-y={0} >
        <planeGeometry />
        <meshStandardMaterial color="#808000" envMapIntensity={envMapIntensity} />
      </mesh> */}
      <Stage
        ContactShadows={{ opacity: 0.2, blur: 3 }}
        // fiels={
        //   './environmentMaps/the_sky_is_on_fire_2k.hdr'
        // }
        environment="sunset"
        preset="portrait"
        intensity={2}
      >
        <mesh position-y={1} position-x={-1.5} castShadow>
          <sphereGeometry />
          <meshStandardMaterial color="green" envMapIntensity={envMapIntensity} />
          {/* Set a color for the material  */}
        </mesh>
        <mesh position-y={1} position-x={1.5} ref={boxeRef} castShadow>
          <boxGeometry />
          <meshStandardMaterial color="#ff0000" envMapIntensity={envMapIntensity} />
        </mesh>
      </Stage>
    </>
  );
}

export default App;
