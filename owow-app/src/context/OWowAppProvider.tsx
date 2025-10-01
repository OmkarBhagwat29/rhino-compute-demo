import { getDefaultWallAutomationParams } from "@/core/wall-automation-helper";
import { IBtnProps } from "@/props/IBtnProps";
import { IClickedElement } from "@/props/IClickedElement";
import { getDefaultDatViz, IDataVizProps } from "@/props/IDataVisProps";
import { IWallProps } from "@/props/IWallProps";
import { IWallResult } from "@/props/IWallResult";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface OWowProps {
  topFeatureBtn: IBtnProps;
  setTopFeatureBtn: (btn: IBtnProps) => void;

  selElm: IClickedElement | null;
  setSelElm: (e: IClickedElement | null) => void;

  wallResult: IWallResult | null;
  setWallResult: (result: IWallResult | null) => void;

  wallParams: IWallProps;
  setWallParams: (params: IWallProps) => void;

  dataViz: IDataVizProps;
  setDataViz: (viz: IDataVizProps) => void;
}

export const OWowAppContext = createContext<OWowProps | undefined>(undefined);

export const OWowAppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [topFeatureBtn, setTopFeatureBtn] = useState<IBtnProps>({
    name: "Viewer",
    active: true,
  });

  //const [wallMesh, setWallMesh] = useState<Mesh | null>(null);
  const [wallResult, setWallResult] = useState<IWallResult | null>(null);

  const [wallParams, setWallParams] = useState<IWallProps>(
    getDefaultWallAutomationParams()
  );

  const [selElm, setSelElm] = useState<IClickedElement | null>(null);

  const [dataViz, setDataViz] = useState<IDataVizProps>(getDefaultDatViz());

  return (
    <OWowAppContext.Provider
      value={{
        dataViz,
        setDataViz,
        selElm,
        setSelElm,
        wallResult,
        setWallResult,
        topFeatureBtn,
        setTopFeatureBtn,
        wallParams,
        setWallParams,
      }}
    >
      {children}
    </OWowAppContext.Provider>
  );
};

export const useOWowApp = (): OWowProps => {
  const context = useContext(OWowAppContext);

  if (!context) {
    throw new Error("useOWowApp must be used within an OWowAppProvider");
  }
  return context;
};
