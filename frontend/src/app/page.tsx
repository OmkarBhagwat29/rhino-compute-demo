"use client";

import OWowScene from "@/components/three/OWowScene";
import MainFeatures from "@/components/ui/Features";
import MainPanels from "@/components/ui/Panels";
import { OWowAppProvider } from "@/context/OWowAppProvider";

export default function Home() {
  return (
    <>
      <OWowAppProvider>
        <MainFeatures />
        <MainPanels />
        <OWowScene />
      </OWowAppProvider>
    </>
  );
}
