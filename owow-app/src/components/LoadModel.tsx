import { useGLTF } from "@react-three/drei";

import { useEffect, useRef } from "react";
import { Box3, Scene, Vector3 } from "three";

const LoadModel = () => {
  const { scene } = useGLTF("/models/test.gltf");
  const modelRef = useRef<Scene | null>(null);

  useEffect(() => {
    if (modelRef.current) {
      // Compute bounding box
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      box.getCenter(center);
      center.y = box.min.y; // Set y to the bottom of the model

      modelRef.current.position.sub(center);
      //modelRef.current.position.set(0, 0, 0.1);
    }
  }, []);

  return <>{scene && <primitive ref={modelRef} object={scene} />}</>;
};

export default LoadModel;
