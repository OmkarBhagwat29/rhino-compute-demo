"use client";

import OWowScene from "@/components/OWowScene";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="w-full h-8 absolute top-2 z-50">
        <div className="flex flex-row justify-center items-center h-full gap-4">
          <div className="text-black w-auto bg-amber-300 p-1 px-8 rounded-xl cursor-pointer border-2 hover:bg-gray-400 active:scale-95 transition-all duration-200">
            Viewer
          </div>

          <div className="text-black w-auto bg-amber-300 p-1 px-8 rounded-xl cursor-pointer border-2 hover:bg-gray-400 active:scale-95 transition-all duration-200">
            Data Visualization
          </div>
          <div className="text-black w-auto bg-white p-1 px-8 rounded-xl cursor-pointer hover:bg-gray-400 active:scale-95 transition-all duration-200 border-2">
            Automation
          </div>
          <div className="text-black w-auto bg-white p-1 px-8 rounded-xl cursor-pointer hover:bg-gray-400 active:scale-95 transition-all duration-200 border-2">
            I/O
          </div>
        </div>
      </div>

      <div className="w-full h-8 absolute bottom-4 z-50">
        <div className="flex flex-row ml-10 items-center h-full gap-4">
          <div className="text-black w-auto bg-amber-300 p-1 px-8 rounded-xl border-2 cursor-pointer">
            Filter
          </div>

          <div className="text-black w-auto bg-white p-1 px-8 rounded-xl cursor-pointer border-2">
            Walls
          </div>
          <div className="text-black w-auto bg-white p-1 px-8 rounded-xl cursor-pointer border-2">
            Furniture
          </div>
          <div className="text-black w-auto bg-white p-1 px-8 rounded-xl cursor-pointer border-2">
            Plumbing
          </div>
        </div>
      </div>

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
    </>
  );
}
