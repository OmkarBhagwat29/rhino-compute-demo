import { IWallProps } from "@/props/IWallProps";
import { Box3, Mesh, Vector3 } from "three";
import { rhinoToThreeMesh } from "./three-helpers";
import { IWallResult } from "@/props/IWallResult";

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
  params: IWallProps
): Promise<IWallResult | null> {
  try {
    const res = await fetch("http://localhost:5166/generate-wall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();

    const { wall, studs } = result;

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
    wallMesh.position.set(center.x, center.y, center.z);

    const studMeshes = await Promise.all(
      studs.map(async (stud: any) => {
        const studMesh = await rhinoToThreeMesh(stud, "red", false);
        return studMesh;
      })
    );

    return { wall: wallMesh, studs: studMeshes };
  } catch (ex) {
    throw ex;
  }
}
