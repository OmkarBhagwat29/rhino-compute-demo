import { RhinoModule } from "rhino3dm";

declare global {
  interface Window {
    rhino3dm?: () => Promise<RhinoModule>;
  }
}

// This line is required to make this file a module and allow global augmentation
export {};
