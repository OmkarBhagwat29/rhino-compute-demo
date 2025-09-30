import { getDefaultWallAutomationParams } from "@/core/wall-automation-helper";
import { IBtnProps } from "@/props/IBtnProps";
import { IWallProps } from "@/props/IWallProps";
import { IWallResult } from "@/props/IWallResult";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Mesh } from "three";

interface OWowProps {
  topFeatureBtn: IBtnProps;
  setTopFeatureBtn: (btn: IBtnProps) => void;
  // wallMesh: Mesh | null;
  // setWallMesh: (wallMesh: Mesh | null) => void;

  // studs: Mesh[];
  // setStuds: (studs: Mesh[]) => void;

  wallResult: IWallResult | null;
  setWallResult: (result: IWallResult | null) => void;

  wallParams: IWallProps;
  setWallParams: (params: IWallProps) => void;
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

  return (
    <OWowAppContext.Provider
      value={{
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
