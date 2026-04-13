import { Mesh } from "three";

export interface IWallResult {
  wall: Mesh;
  studs: Mesh[];
  wallVolume: number;
  studsLength: number;
  studsCount: number;
}
