import React from "react";
import { Box, Text, TransformControls } from "@react-three/drei";
import { useOWowApp } from "@/context/OWowAppProvider";
import { getDefaultWallAutomationParams } from "@/core/wall-automation-helper";

const dParams = getDefaultWallAutomationParams();
const WindowNotation = () => {
  const { wallParams, setWallParams } = useOWowApp();
  return (
    <>
      <Text
        color={"black"}
        position={[
          wallParams.insert_B.x,
          wallParams.insert_B.y,
          wallParams.insert_B.z - 0.1,
        ]}
        scale={0.15}
        rotation={[0, -Math.PI / 2, 0]}
        anchorX={"right"}
      >
        B
      </Text>

      <Text
        color={"black"}
        position={[
          wallParams.insert_A.x,
          wallParams.insert_A.y,
          wallParams.insert_A.z - 0.1,
        ]}
        scale={0.15}
        rotation={[0, -Math.PI / 2, 0]}
        anchorX={"right"}
      >
        A
      </Text>

      <TransformControls
        size={0.5}
        mode="translate"
        showX={false}
        position={[dParams.insert_B.x, dParams.insert_B.y, dParams.insert_B.z]}
        onMouseUp={(e) => {
          const obj = e?.target.object;
          setWallParams({
            ...wallParams,
            insert_B: {
              x: obj.position.x,
              y: obj.position.y,
              z: obj.position.z,
            },
          });
        }}
      >
        <Box scale={0.05} />
      </TransformControls>

      <TransformControls
        size={0.5}
        mode="translate"
        showX={false}
        position={[dParams.insert_A.x, dParams.insert_A.y, dParams.insert_A.z]}
        onMouseUp={(e) => {
          const obj = e?.target.object; // the controlled Three.js object
          setWallParams({
            ...wallParams,
            insert_A: {
              x: obj.position.x,
              y: obj.position.y,
              z: obj.position.z,
            },
          });
        }}
      >
        <Box scale={0.05} />
      </TransformControls>
    </>
  );
};

export default WindowNotation;
