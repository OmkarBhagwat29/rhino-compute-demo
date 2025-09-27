import { IBtnProps } from "@/props/IBtnProps";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface OWowProps {
  topFeatureBtn: IBtnProps;
  setTopFeatureBtn: (btn: IBtnProps) => void;
}

export const OWowAppContext = createContext<OWowProps | undefined>(undefined);

export const OWowAppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [topFeatureBtn, setTopFeatureBtn] = useState<IBtnProps>({
    name: "Viewer",
    active: true,
  });

  return (
    <OWowAppContext.Provider value={{ topFeatureBtn, setTopFeatureBtn }}>
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
