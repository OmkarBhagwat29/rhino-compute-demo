import { useOWowApp } from "@/context/OWowAppProvider";
import { callWallAutomation } from "@/core/wall-automation-helper";
import { Edges } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Group } from "three";
import WindowNotation from "./WindowNotation";

const AutomationThree = () => {
  const { topFeatureBtn, wallResult, setWallResult, wallParams, dataViz } =
    useOWowApp();

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

          // console.log(child);
        } else if (
          child.name === "FamilyInstance_Generic_Models_PTHP_<44037198_PTHP<" ||
          child.name === "FamilyInstance_Generic_Models_PTHP_<45248326_PTHP<"
        ) {
          child.visible = false;
        }
      });
    } else {
      scene.traverse((child) => {
        if (child instanceof Group && child.name.includes("E-WA")) {
          if (!dataViz.categories[0].hide) child.children[0].visible = true;
        } else if (child.name.includes("OW_Window")) {
          if (!dataViz.categories[1].hide) child.visible = true;
        } else if (
          child.name === "FamilyInstance_Generic_Models_PTHP_<44037198_PTHP<" ||
          child.name === "FamilyInstance_Generic_Models_PTHP_<45248326_PTHP<"
        ) {
          child.visible = true;
        }
      });
      if (wallResult !== null) {
        scene.remove(wallResult.wall);
        wallResult.studs.forEach((stud) => {
          scene.remove(stud);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topFeatureBtn, scene]);

  useEffect(() => {
    (async () => {
      if (topFeatureBtn.name !== "Automation") return;

      // console.log("calling end point");
      const result = await callWallAutomation(wallParams);

      if (result) {
        //console.log("result ->", result);
        setWallResult(result);
      }
    })();
  }, [wallParams, topFeatureBtn, setWallResult]);

  return (
    <>
      {wallResult && topFeatureBtn.name === "Automation" && (
        <>
          <WindowNotation />

          <group>
            <mesh
              position={wallResult.wall.position}
              geometry={wallResult.wall.geometry}
              material={wallResult.wall.material}
            >
              {/* Draw edges */}
              <Edges color="black" threshold={90} />
            </mesh>

            {wallResult.studs.map((stud) => {
              return (
                <mesh
                  position={stud.position}
                  key={stud.id}
                  geometry={stud.geometry}
                  material={stud.material}
                >
                  <Edges color="black" threshold={90} />
                </mesh>
              );
            })}
          </group>
        </>
      )}
    </>
  );
};

export default AutomationThree;
