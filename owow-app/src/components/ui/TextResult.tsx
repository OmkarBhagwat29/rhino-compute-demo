import { useOWowApp } from "@/context/OWowAppProvider";
import React, { useEffect } from "react";

const TextResult = () => {
  const { wallResult, topFeatureBtn, selElm, setSelElm } = useOWowApp();

  useEffect(() => {
    if (topFeatureBtn.name !== "Data Visualization") {
      setSelElm(null);
    }
  }, [topFeatureBtn, setSelElm]);

  return (
    <div className="absolute left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col justify-center">
      <div className="flex justify-center items-center w-full bg-gray-300/75 border rounded-md select-none overflow-y-auto">
        {topFeatureBtn.name === "Automation" &&
          topFeatureBtn.active === true && (
            <div className="p-2 text-black flex flex-col gap-2">
              <label className="underline font-bold">
                Automation Properties
              </label>
              <div>Wall Volume: {wallResult?.wallVolume} m3</div>
              <div>Total Studs Count: {wallResult?.studsCount}</div>
              <div>Total Studs Length: {wallResult?.studsLength} mts</div>
            </div>
          )}

        {topFeatureBtn.name === "Data Visualization" &&
          topFeatureBtn.active === true && (
            <>
              <div className="p-2 text-black flex-wrap flex flex-col gap-2 w-72">
                <label className="underline font-bold">
                  Element Properties:
                </label>

                {selElm ? (
                  <div className="max-h-96 flex-wrap overflow-y-auto border rounded p-2 bg-white text-sm">
                    {/* Basic info */}
                    <div className="mb-2">
                      <p>
                        <strong>Name:</strong> {selElm.props.name}
                      </p>
                      <p>
                        <strong>Category:</strong>{" "}
                        {selElm.props.elementCategory}
                      </p>
                      <p>
                        <strong>ID:</strong> {selElm.props.elementId}
                      </p>
                    </div>

                    {/* Parameters */}
                    {selElm.props.parameters && (
                      <div className="space-y-1">
                        {Object.entries(selElm.props.parameters).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex flex-wrap justify-between"
                            >
                              <span className="font-medium">{key}:</span>
                              <span className="text-gray-700">
                                {String(value)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="italic text-gray-500">
                    Click on an element to view details
                  </p>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default TextResult;
