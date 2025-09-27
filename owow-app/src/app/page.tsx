"use client";

import OWowScene from "@/components/OWowScene";
import MainFeatures from "@/components/ui/Features";
import MainPanels from "@/components/ui/Panels";
import { OWowAppProvider } from "@/context/OWowAppProvider";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <OWowAppProvider>
        <MainFeatures />
        <MainPanels />

        {/* Logo in top-right */}
        <div className="absolute left-0 top-0 p-2 z-50">
          <Image
            src="/OWow.png"
            alt="OWow Logo"
            width={75}
            height={75}
            className="rounded-md opacity-75"
            priority
          />
        </div>

        <OWowScene />
      </OWowAppProvider>
    </>
  );
}
