import { IWallProps } from "@/props/IWallProps";
import { Box3, Vector3 } from "three";
import { rhinoToThreeMesh } from "./three-helpers";
import { IWallResult } from "@/props/IWallResult";
import { roundUp } from "./math/math";

export function getDefaultWallAutomationParams(): IWallProps {
  return {
    width_A: 1.25,
    height_A: 1.8,
    width_B: 1.25,
    height_B: 1.8,
    insert_A: {
      x: -3.6,
      y: 2,
      z: 1.2,
    },
    insert_B: {
      x: -3.6,
      y: 2,
      z: -1.2,
    },
    stud_gap: 0.49,
  };
}

export async function callWallAutomation(
  params: IWallProps,
): Promise<IWallResult | null> {
  try {

    const res = await fetch("http://localhost:5166/generate-wall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      console.error("HTTP error! status:", res.status);
      return null;
      //throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    // console.log("api result", result);
    const { wall, studs, wallVolume, studsLength, studsCount } = result;

    const wallMesh = await rhinoToThreeMesh(wall, "yellow", true, 0.25);

    if (!wallMesh) return null;

    //first roate the geometry to align Y-up
    wallMesh.geometry.rotateX((-90 * Math.PI) / 180);

    //compute center at its current location
    const center = new Vector3();
    const box = new Box3();
    box.setFromObject(wallMesh);
    box.getCenter(center);

    //transform geometry back to scene origin 0,0,0
    wallMesh.geometry.center();

    //now set its position
    wallMesh.position.copy(center);

    const studMeshes = await Promise.all(
      studs.map(async (stud: any) => {
        const studMesh = await rhinoToThreeMesh(stud, "red", false);

        if (studMesh !== null) {
          studMesh.geometry.rotateX((-90 * Math.PI) / 180);

          box.setFromObject(studMesh);
          box.getCenter(center);

          studMesh.geometry.center();
          studMesh.position.copy(center);

          //console.log(studMesh.position);
        }

        return studMesh;
      }),
    );

    return {
      wall: wallMesh,
      studs: studMeshes,
      wallVolume: roundUp(wallVolume, 2),
      studsCount: Math.round(studsCount),
      studsLength,
    };
  } catch (ex) {
    throw ex;
  }
}
