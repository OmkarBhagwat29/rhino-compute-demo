import React from "react";

const BottomFeatures = () => {
  return (
    <div className="w-full h-8 absolute bottom-4 z-50">
      <div className="flex flex-row ml-10 items-center h-full gap-4">
        <div className="text-black w-auto bg-amber-300 p-1 px-8 rounded-xl border-2 cursor-pointer">
          Filters
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
  );
};

export default BottomFeatures;
