import { useOWowApp } from "@/context/OWowAppProvider";
import { IDataCategory } from "@/props/IDataVisProps";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const DataVisThree = () => {
  const { dataViz, setDataViz, topFeatureBtn } = useOWowApp(); // assuming your context has setter
  const { scene } = useThree();

  useEffect(() => {
    if (
      topFeatureBtn.name !== "Data Visualization" ||
      dataViz.categories[0].objects.length !== 0
    ) {
      return;
    }
    //console.log("category length", dataViz.categories[0].objects.length);
    // deep clone categories so we don’t mutate context directly
    const categories: IDataCategory[] = dataViz.categories.map((c) => ({
      ...c,
      objects: [],
    }));

    scene.traverse((child) => {
      if (!child.name) return;

      const name = child.name.toLowerCase();
      //console.log(name);
      // loop through each category and match
      categories.forEach((cat) => {
        if (name.includes(cat.name.toLowerCase())) {
          cat.objects.push(child);
        }
      });
    });
    setDataViz({ hideOnSelect: false, categories: categories });

    // console.log(categories);
  }, [topFeatureBtn, dataViz.categories, setDataViz]);

  return null;
};

export default DataVisThree;
