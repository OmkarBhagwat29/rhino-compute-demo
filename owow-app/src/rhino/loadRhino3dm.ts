import { RhinoModule } from "rhino3dm";

let rhino3dmPromise: Promise<RhinoModule> | null = null;

export const loadRhino3dm = async (): Promise<RhinoModule> => {
  if (rhino3dmPromise) return rhino3dmPromise;

  if (window.rhino3dm) {
    rhino3dmPromise = window.rhino3dm();
    return rhino3dmPromise;
  }

  rhino3dmPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/rhino3dm@8.17.0/rhino3dm.min.js";
    script.async = true;

    script.onload = async () => {
      if (window.rhino3dm) {
        const rhino = await window.rhino3dm();
        resolve(rhino);
      } else {
        reject("rhino3dm failed to load.");
      }
    };

    script.onerror = reject;
    document.body.appendChild(script);
  });

  console.log("rhino3dm loaded");
  return rhino3dmPromise;
};
