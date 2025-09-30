import { loadRhino3dm } from "@/rhino/loadRhino3dm";
import { RhinoModule } from "rhino3dm";
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
} from "three";

export async function rhinoToThreeMesh(
  meshJson: any,
  color: string = "black",
  transparent: boolean = true,
  opacity: number = 0.5
): Promise<Mesh | null> {
  const rhino = await loadRhino3dm();
  const rhObj = rhino.CommonObject.decode(meshJson);

  if (rhObj) {
    if (rhObj instanceof rhino.Mesh) {
      const geom = rhObj.toThreejsJSON();
      if (geom) {
        const bufferGeom = new BufferGeometry();

        // Reconstruct BufferAttributes
        const posArray = new Float32Array(geom.data.attributes.position.array);
        bufferGeom.setAttribute("position", new BufferAttribute(posArray, 3));

        if (geom.data.attributes.normal) {
          const normArray = new Float32Array(geom.data.attributes.normal.array);
          bufferGeom.setAttribute("normal", new BufferAttribute(normArray, 3));
        }

        if (geom.data.attributes.uv) {
          const uvArray = new Float32Array(geom.data.attributes.uv.array);
          bufferGeom.setAttribute("uv", new BufferAttribute(uvArray, 2));
        }

        // Reconstruct index
        if (geom.data.index) {
          const indexArray =
            geom.data.index.type === "Uint16Array"
              ? new Uint16Array(geom.data.index.array)
              : new Uint32Array(geom.data.index.array);
          bufferGeom.setIndex(new BufferAttribute(indexArray, 1));
        }

        const wallMesh = new Mesh(
          bufferGeom,
          new MeshStandardMaterial({
            color: color,
            transparent,
            opacity,
            side: DoubleSide,
          })
        );

        return wallMesh;

        //wallMesh.rotation.set((-90 * Math.PI) / 180, 0, 0);
        //scene.add(wallMesh);
        //setWallMesh(wallMesh);
      }
    }
  }

  return null;
}
