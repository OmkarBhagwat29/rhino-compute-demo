import React from "react";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

const NiceLighting = () => {
  return (
    <>
      {/* Camera controls */}

      {/* Ambient light for base brightness */}
      <ambientLight intensity={0.3} />

      {/* Directional light (like the sun) */}
      <directionalLight
        intensity={3}
        position={[10, 15, 10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment map for IBL (with blur) */}
      {/* <Environment
        files="/hdrs/studio.hdr" // <- replace with your HDR file
        background
        blur={0.6} // soften reflections
        ground={{ scale: 30, height: 5 }} // fake ground reflection
      /> */}

      {/* Postprocessing (exposure + bloom) */}
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.8} />
        {/* <ToneMapping
          adaptive={false}
          resolution={256}
          middleGrey={0.6} // exposure adjustment
          maxLuminance={16}
          averageLuminance={1.0}
        /> */}
      </EffectComposer>
    </>
  );
};

export default NiceLighting;
