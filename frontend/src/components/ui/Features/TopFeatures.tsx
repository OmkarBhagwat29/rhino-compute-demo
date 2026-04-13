import { useOWowApp } from "@/context/OWowAppProvider";
import React from "react";

const TopFeatures = () => {
  const [buttons, setSetButtons] = React.useState([
    { name: "Viewer", active: true },
    { name: "Data Visualization", active: false },
    { name: "Automation", active: false },
    { name: "I/O", active: false },
  ]);

  const { setTopFeatureBtn } = useOWowApp();

  return (
    <div className="w-full h-8 absolute top-2 z-50">
      <div className="flex flex-row justify-center items-center h-full gap-4 select-none">
        {buttons.map((button, index) => (
          <div
            key={index}
            onClick={() => {
              const newButtons = buttons.map((btn, btnIndex) => {
                if (btn.name === "Viewer") return btn; // if already active, do nothing

                if (btnIndex === index) {
                  setTopFeatureBtn({ name: btn.name, active: !button.active });

                  return {
                    ...btn,
                    active: !button.active,
                  };
                } else {
                  return { ...btn, active: false };
                }
              });
              setSetButtons(newButtons);
            }}
            className={`text-black ${
              button.active ? "bg-amber-300" : "bg-white"
            } w-auto p-1 px-8 rounded-xl cursor-pointer border-2 hover:bg-amber-500 active:scale-95 transition-all duration-200`}
          >
            {button.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopFeatures;
