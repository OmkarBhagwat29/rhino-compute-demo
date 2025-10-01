import { Object3D } from "three";

export interface IDataVizProps {
  hideOnSelect: boolean;
  categories: IDataCategory[];
}

export interface IDataCategory {
  name: string;
  objects: Object3D[];
  hide: boolean;
}

export const getDefaultDatViz = (): IDataVizProps => {
  return {
    hideOnSelect: false,
    categories: [
      {
        name: "Walls",
        objects: [],
        hide: false,
      },
      {
        name: "Windows",
        objects: [],
        hide: false,
      },
      {
        name: "Duct",
        objects: [],
        hide: false,
      },
      {
        name: "Pipe",
        objects: [],
        hide: false,
      },
      {
        name: "Ceiling",
        objects: [],
        hide: false,
      },
      {
        name: "Column",
        objects: [],
        hide: false,
      },
      //   {
      //     name: "Structural Framing",
      //     objects: [],
      //     hide: false,
      //   },
      {
        name: "Plumbing",
        objects: [],
        hide: false,
      },
      {
        name: "Casework",
        objects: [],
        hide: false,
      },
      //   {
      //     name: "Generic",
      //     objects: [],
      //     hide: false,
      //   },
      {
        name: "Floors",
        objects: [],
        hide: false,
      },
    ],
  };
};
