using Newtonsoft.Json;
using Owow.Api.DTOs;
using Rhino.Compute;
using Rhino.Geometry;

var builder = WebApplication.CreateBuilder(args);


// 1. Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJs",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000","https://map-testing-rho.vercel.app") // your Next.js front-end
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


var app = builder.Build();

// Enable static file serving
app.UseStaticFiles();

// 3. Use CORS middleware
app.UseCors("AllowNextJs");

app.MapGet("/", () =>
{
    // Assume you put your Grasshopper file in wwwroot/definitions/
    var defName = "automation.gh";

    // Get the absolute path to the file
    var defPath = Path.Combine(
        builder.Environment.WebRootPath ?? "wwwroot",
        defName
    );

    if (!System.IO.File.Exists(defPath))
    {
        return Results.NotFound($"Grasshopper file not found: {defPath}");
    }

    var result = Rhino.Compute.GrasshopperCompute.EvaluateDefinition(defPath, new List<GrasshopperDataTree>());

    var wall = result[0].InnerTree.First().Value[0].Data;

var parsed = JsonConvert.DeserializeObject<Dictionary<string, string>>(wall);
    //var json = JsonConvert.DeserializeObject(wall);
    // var studs = result[0].InnerTree.First().Value;

    // Optionally, you could load the definition or return its path
    // For now, just returning the file path
    return Results.Ok(parsed);

});

// POST endpoint: receives WallDto
app.MapPost("/generate-wall", (WallDto wallInput) =>
{
    try
    { 
            var defName = "automation.gh";
    var defPath = Path.Combine(
        builder.Environment.WebRootPath ?? "wwwroot",
        defName
    );

    if (!System.IO.File.Exists(defPath))
    {
        return Results.NotFound($"Grasshopper file not found: {defPath}");
    }

    // Build input trees for Grasshopper definition
    var trees = new List<GrasshopperDataTree>();

    // Example: passing width_A as Grasshopper input param "width_A"
    var widthA_Val = new GrasshopperObject(wallInput.Width_A);
    var widthA_Param = new GrasshopperDataTree("width_A");
    widthA_Param.Add("0", [widthA_Val]);
    trees.Add(widthA_Param);


    var heightA_Val = new GrasshopperObject(wallInput.Height_A);
    var heightA_Param = new GrasshopperDataTree("height_A");
    heightA_Param.Add("0", [heightA_Val]);
    trees.Add(heightA_Param);

        var widthB_Val = new GrasshopperObject(wallInput.Width_B);
    var widthB_Param = new GrasshopperDataTree("width_B");
    widthB_Param.Add("0", [widthB_Val]);
    trees.Add(widthB_Param);


    var heightB_Val = new GrasshopperObject(wallInput.Height_B);
    var heightB_Param = new GrasshopperDataTree("height_B");
    heightB_Param.Add("0", [heightB_Val]);
    trees.Add(heightB_Param);

    var ptA = new 
    {
        X = wallInput.Insert_A.X,
        Y = -wallInput.Insert_A.Z,
        Z = wallInput.Insert_A.Y
    };
    var insertA_Val = new GrasshopperObject(ptA);
    var insertA_Param = new GrasshopperDataTree("insert_A");
    insertA_Param.Add("0", [insertA_Val]);
    trees.Add(insertA_Param);


        var ptB = new 
    {
        X = wallInput.Insert_B.X,
        Y = -wallInput.Insert_B.Z,
        Z = wallInput.Insert_B.Y
    };
    var insertB_Val = new GrasshopperObject(ptB);
    var insertB_Param = new GrasshopperDataTree("insert_B");
    insertB_Param.Add("0", [insertB_Val]);
        trees.Add(insertB_Param);

    var gap_Val = new GrasshopperObject(wallInput.Stud_Gap);
    var gap_Param = new GrasshopperDataTree("stud_gap");
    gap_Param.Add("0", [gap_Val]);
    trees.Add(gap_Param);

    // Evaluate definition with inputs
    var result = GrasshopperCompute.EvaluateDefinition(defPath, trees);

    // Extract wall JSON
    var wall = result[0].InnerTree.First().Value[0].Data;
    var studs = result[1].InnerTree.First().Value;
    var wallVolume = result[2].InnerTree.First().Value[0].Data;
        var studsCount = result[3].InnerTree.First().Value[0].Data;
        var studsLength = result[4].InnerTree.First().Value[0].Data;

    var studsData = new List<Dictionary<string, object>>();
    foreach (var stud in studs)
    {
        var sData = stud.Data;
        var parsedStud = JsonConvert.DeserializeObject<Dictionary<string, object>>(sData);
        if (parsedStud == null)
            continue;
        studsData.Add(parsedStud);
    }

    var parsedWall = JsonConvert.DeserializeObject<Dictionary<string, object>>(wall);

    var sendObj = new { wall = parsedWall, studs = studsData, wallVolume,studsCount,studsLength };

    return Results.Ok(sendObj);

    }
    catch
    {
        return Results.BadRequest();
    }

});

app.Run();
