import {
  Bounds,
  Edges,
  OrbitControls,
  OrthographicCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import LoadModel from "./LoadModel";
import AutomationThree from "./automation/AutomationThree";
import { loadRhino3dm } from "@/rhino/loadRhino3dm";
import { MOUSE } from "three";

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="pink" />
      {/* Draw the edges */}
      <Edges color="black" />
    </mesh>
  );
}

const OWowScene = () => {
  useEffect(() => {
    (async () => {
      const rhino = await loadRhino3dm();
      console.log(rhino);
    })();
  }, []);

  return (
    <div className="absolute w-full h-full">
      <Canvas shadows camera={{ position: [2, 5, 10], fov: 50 }}>
        <OrbitControls
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={500}
          mouseButtons={{
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE, // Right-click rotates (orbit)
          }}
        />
        {/* 
        <OrthographicCamera
          makeDefault
          position={[2, 5, 5]}
          zoom={65}
          near={1}
          far={500}
        /> */}
        {/* <Box /> */}
        <Bounds clip observe margin={1.2} maxDuration={1}>
          <LoadModel />
        </Bounds>

        <AutomationThree />
      </Canvas>
    </div>
  );
};

export default OWowScene;
