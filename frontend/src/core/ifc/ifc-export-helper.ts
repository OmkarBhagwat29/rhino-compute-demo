import { BoxGeometry, Mesh } from "three";
import * as WebIFC from "web-ifc";
import { v4 as uuidv4 } from "uuid";
import * as uuid from "uuid";
// @ts-ignore
import * as d64 from "d64";

// Initialize IFC API
const ifcapi = new WebIFC.IfcAPI();
let loaded = false;
export const getWebIFC = async (): Promise<WebIFC.IfcAPI> => {
  if (loaded) return ifcapi;

  ifcapi.SetWasmPath("/", true);
  await ifcapi.Init();
  loaded = true;
  return ifcapi;
};

let expressId = 0;
export const writeIfc = async (
  wallMesh: Mesh,
  studs: Mesh[],

  name: string = "oWow"
) => {
  await getWebIFC();

  const newIfcModel = {
    schema: WebIFC.Schemas.IFC4,
    name: name,
    description: ["demo ifc model"],
    authors: ["Om Bhagwat"],
    organizations: [],
  };

  const modelId = ifcapi.CreateModel(newIfcModel);

  // let expressId = 0;

  const org = new WebIFC.IFC4.IfcOrganization(
    null,
    new WebIFC.IFC4.IfcLabel("Om"),
    null,
    null,
    null
  );
  org.expressID = expressId;

  ifcapi.WriteLine(modelId, org);

  const app = new WebIFC.IFC4.IfcApplication(
    org,
    new WebIFC.IFC4.IfcLabel("0.0.1"),
    new WebIFC.IFC4.IfcLabel("parametric-wall-generator"),
    new WebIFC.IFC4.IfcIdentifier("parametric-bim")
  );
  app.expressID = ++expressId;

  ifcapi.WriteLine(modelId, app);

  createWallEntity(modelId, wallMesh);

  downloadIFC(modelId, `${name}.ifc`);
};

function createWallEntity(modelId: number, wallMesh: Mesh) {
  const geometry = wallMesh.geometry as BoxGeometry;
  geometry.computeBoundingBox();

  const bbox = geometry.boundingBox!;
  const width = bbox.max.x - bbox.min.x;
  const height = bbox.max.z - bbox.min.z;
  const depth = bbox.max.y - bbox.min.y;

  // Build nested IFC structure
  const profile = new WebIFC.IFC4.IfcRectangleProfileDef(
    WebIFC.IFC4.IfcProfileTypeEnum.AREA,
    new WebIFC.IFC4.IfcLabel("Wall Profile"),
    null,
    new WebIFC.IFC4.IfcPositiveLengthMeasure(width),
    new WebIFC.IFC4.IfcPositiveLengthMeasure(height)
  );

  const direction = new WebIFC.IFC4.IfcDirection([
    new WebIFC.IFC4.IfcReal(0),
    new WebIFC.IFC4.IfcReal(1),
    new WebIFC.IFC4.IfcReal(0),
  ]);

  const origin = new WebIFC.IFC4.IfcCartesianPoint([
    new WebIFC.IFC4.IfcLengthMeasure(0),
    new WebIFC.IFC4.IfcLengthMeasure(0),
    new WebIFC.IFC4.IfcLengthMeasure(0),
  ]);
  const axisPlacement = new WebIFC.IFC4.IfcAxis2Placement3D(origin, null, null);

  const solid = new WebIFC.IFC4.IfcExtrudedAreaSolid(
    profile,
    axisPlacement,
    direction,
    new WebIFC.IFC4.IfcPositiveLengthMeasure(depth)
  );

  const rep = new WebIFC.IFC4.IfcShapeRepresentation(
    new WebIFC.IFC4.IfcRepresentationContext(null, null),
    new WebIFC.IFC4.IfcLabel("Body"),
    new WebIFC.IFC4.IfcLabel("SweptSolid"),
    [solid]
  );

  const productShape = new WebIFC.IFC4.IfcProductDefinitionShape(null, null, [
    rep,
  ]);

  // ✅ The topmost entity: IfcWallStandardCase
  const wall = new WebIFC.IFC4.IfcWallStandardCase(
    generateGlobalId(), // GlobalId
    null, // OwnerHistory
    new WebIFC.IFC4.IfcLabel("Wall"),
    null, // Description
    null, // ObjectType
    null, // Placement (you can add IfcLocalPlacement if needed)
    productShape, // Representation
    null, // Tag
    WebIFC.IFC4.IfcWallTypeEnum.SOLIDWALL
  );

  // Only write the top-level wall
  const wallId = ifcapi.WriteLine(modelId, wall);

  return wallId;
}

export const downloadIFC = (modelId: number, fileName: string) => {
  try {
    const ifcBytes = ifcapi.SaveModel(modelId);
    // Create a Blob from the data
    // @ts-ignore
    const blob = new Blob([ifcBytes], { type: "application/octet-stream" });

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log("IFC file saved:", fileName);
  } catch (err) {
    console.error("Failed to save IFC:", err);
  }
};

const generateGlobalId = (): WebIFC.IFC4.IfcGloballyUniqueId => {
  return new WebIFC.IFC4.IfcGloballyUniqueId(d64.encode(uuid.parse(uuidv4())));
};
