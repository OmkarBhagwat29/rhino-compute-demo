import { useOWowApp } from "@/context/OWowAppProvider";
import { callWallAutomation } from "@/core/wall-automation-helper";
import { Edges, TransformControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Group } from "three";
import WindowNotation from "./WindowNotation";

const AutomationThree = () => {
  const { topFeatureBtn, wallResult, setWallResult, wallParams } = useOWowApp();

  const { scene } = useThree();

  useEffect(() => {
    if (topFeatureBtn.name === "Automation") {
      scene.traverse((child) => {
        if (child instanceof Group && child.name.includes("E-WA")) {
          //child.children[0].material.wireframe = true;
          child.children[0].visible = false;
          // console.log(child.children[0]);
        } else if (child.name.includes("OW_Window")) {
          child.visible = false;
        }
      });

      //   if (wallResult !== null) {
      //     return;
      //   }
    } else {
      scene.traverse((child) => {
        child.visible = true;
      });
      if (wallResult !== null) {
        scene.remove(wallResult.wall);
        wallResult.studs.forEach((stud) => {
          scene.remove(stud);
        });
      }
    }
  }, [topFeatureBtn, scene]);

  useEffect(() => {
    (async () => {
      if (topFeatureBtn.name !== "Automation") return;

      console.log("calling end point");
      const result = await callWallAutomation(wallParams);

      if (result) {
        console.log("result ->", result);
        setWallResult(result);
      }
    })();
  }, [wallParams, topFeatureBtn, setWallResult]);

  return (
    <>
      {wallResult && topFeatureBtn.name === "Automation" && (
        <>
          <WindowNotation />
          <TransformControls
            size={0.45}
            position={[
              wallResult.wall.position.x,
              wallResult.wall.position.y,
              wallResult.wall.position.z,
            ]}
          >
            <mesh
              geometry={wallResult.wall.geometry}
              material={wallResult.wall.material}
            >
              {/* Draw edges */}
              <Edges color="black" />
            </mesh>
          </TransformControls>

          {wallResult.studs.map((stud) => {
            return (
              <mesh
                key={stud.id}
                geometry={stud.geometry}
                material={stud.material}
                rotation={[(-90 * Math.PI) / 180, 0, 0]}
              >
                <Edges color="black" />
              </mesh>
            );
          })}
        </>
      )}
    </>
  );
};

export default AutomationThree;
