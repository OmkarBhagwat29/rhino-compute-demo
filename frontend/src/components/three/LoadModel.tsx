// @ts-nocheck
import { useGLTF } from "@react-three/drei";
import { Edges } from "@react-three/drei";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box3,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  Scene,
  Vector3,
} from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useOWowApp } from "@/context/OWowAppProvider";
import { useThree } from "@react-three/fiber";

const EdgeOverlay = ({ tolerance = 90 }) => {
  const { scene } = useThree();
  const { modelLoaded } = useOWowApp();

  useMemo(() => {
    if (!modelLoaded) return;
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;

        if (mesh.geometry) {
          const edges = new EdgesGeometry(mesh.geometry, tolerance);
          const line = new LineSegments(
            edges,
            new LineBasicMaterial({ color: 0x000000 }) // edge color
          );

          // attach edges overlay
          mesh.add(line);
        }
      }
    });

    //console.log("edging...");
  }, [modelLoaded]);

  return null;
};

const LoadModel = () => {
  const { scene } = useGLTF("/models/test.gltf");
  const modelRef = useRef<Scene | null>(null);
  const [center, setCenter] = useState(new Vector3(0, 0, 0));
  const { topFeatureBtn, setSelElm, selElm, setModelLoaded } = useOWowApp();
  useEffect(() => {
    //const ct = new OrbitControls(camera, gl.domElement);

    if (modelRef.current) {
      //console.log("Model loaded:", modelRef.current);
      // Compute bounding box
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      box.getCenter(center);

      center.y = box.min.y; // Set y to the bottom of the model

      modelRef.current.position.sub(center);

      setModelLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!selElm) return;

    // Store original emissive color
    //console.log(selElm);
    const original = selElm.object.material.emissive?.clone();

    // Apply highlight
    selElm.object.material.emissive?.set(0xffcc00);

    return () => {
      if (selElm.object.material && original) {
        selElm.object.material.emissive.copy(original);
      }
    };
  }, [selElm]);

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape") {
        if (selElm?.object.material?.emissive) {
          selElm.object.material.emissive.set(0x000000); // reset emissive
        }
        setSelElm(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selElm, setSelElm]);

  return (
    <>
      {scene && (
        <>
          <primitive
            ref={modelRef}
            object={scene}
            onClick={(e: any) => {
              e.stopPropagation();

              if (topFeatureBtn.name !== "Data Visualization") {
                setSelElm(null);
                return;
              }

              let target = e.object;
              let foundUserData = null;

              // Traverse up until we find userData with actual keys
              let rec = 0;
              while (target && rec < 5) {
                if (
                  target.userData &&
                  Object.keys(target.userData).length > 0
                ) {
                  foundUserData = target.userData;
                  break;
                }
                target = target.parent;
                rec++;
              }

              if (foundUserData) {
                if (e.object.isLine) {
                }
                setSelElm({
                  object: e.object.isLine ? e.object.parent : e.object,
                  props: foundUserData,
                });
              } else {
                console.log("No userData found");
                setSelElm(null);
              }

              // console.log("Clicked object:", e.object);
            }}
          />

          <EdgeOverlay />
          <gridHelper
            args={[10, 10]}
            position={[center.x, center.y, center.z]}
          />
          <axesHelper args={[5]} position={[center.x, center.y, center.z]} />

          <ambientLight intensity={2.75} />
          <directionalLight
            intensity={1.5}
            position={center}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <directionalLight
            intensity={3}
            position={[-center.x, center.y, -center.z]}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />

          <EffectComposer>
            <Bloom intensity={0.1} luminanceThreshold={0.2} />
          </EffectComposer>
        </>
      )}
    </>
  );
};

export default LoadModel;
