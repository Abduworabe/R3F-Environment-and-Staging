import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Canvas } from '@react-three/fiber';


createRoot(document.getElementById('root')).render(

  <Canvas 
  shadows
  camera={{
    fov:45, 
    near:0.1,
    far:200,
    position:[0,-1, 20]
    
  }}>
    <color args={['#b7ffc0']} attach="background"/>
<App/>
  </Canvas>
);
