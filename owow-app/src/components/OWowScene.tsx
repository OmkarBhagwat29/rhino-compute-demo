import { Bounds, Edges, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import LoadModel from "./LoadModel";
import NiceLighting from "./NiceLighting";

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
  return (
    <div className="w-screen h-screen">
      <Canvas
        camera={{
          position: [5, 10, 12],
          fov: 45,
          near: 0.01,
          far: 250,
        }}
        shadows
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={50}
        />
        <NiceLighting />
        {/* <Box /> */}
        <Bounds clip observe>
          <LoadModel />
        </Bounds>

        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />
      </Canvas>
    </div>
  );
};

export default OWowScene;
