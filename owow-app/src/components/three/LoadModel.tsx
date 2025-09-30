import { OrbitControls, OrthographicCamera, useGLTF } from "@react-three/drei";

import { useEffect, useRef, useState } from "react";
import { Box3, Scene, Vector3 } from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const LoadModel = () => {
  const { scene } = useGLTF("/models/test.gltf");
  const modelRef = useRef<Scene | null>(null);
  const [center, setCenter] = useState(new Vector3(0, 0, 0));

  useEffect(() => {
    //const ct = new OrbitControls(camera, gl.domElement);

    if (modelRef.current) {
      console.log("Model loaded:", modelRef.current);
      // Compute bounding box
      const box = new Box3().setFromObject(modelRef.current);
      const center = new Vector3();
      box.getCenter(center);

      center.y = box.min.y; // Set y to the bottom of the model

      //setCenter(center);

      modelRef.current.position.sub(center); // Center the model
      //modelRef.current.position.set(0, 0, 0.1);
    }
  }, []);

  return (
    <>
      {scene && (
        <>
          <primitive ref={modelRef} object={scene} />

          <gridHelper
            args={[10, 10]}
            position={[center.x, center.y, center.z]}
          />
          <axesHelper args={[5]} position={[center.x, center.y, center.z]} />

          <ambientLight intensity={3} />
          <directionalLight
            intensity={3}
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
            <Bloom intensity={0.3} luminanceThreshold={0.8} />
          </EffectComposer>
        </>
      )}
    </>
  );
};

export default LoadModel;
