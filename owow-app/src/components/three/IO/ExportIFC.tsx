import { useOWowApp } from "@/context/OWowAppProvider";

import React, { useEffect } from "react";

const ExportIFC = () => {
  const { wallResult } = useOWowApp();

  useEffect(() => {
    if (!wallResult) return;
  }, [wallResult]);

  return <></>;
};

export default ExportIFC;
