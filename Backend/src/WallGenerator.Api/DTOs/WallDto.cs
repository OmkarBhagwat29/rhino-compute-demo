using System;
using Newtonsoft.Json;

namespace WallGenerator.Api.DTOs;

public class WallDto
{
    [JsonProperty("width_A")]
    public double Width_A { get; set; }

    [JsonProperty("width_B")]
    public double Width_B { get; set; }

    [JsonProperty("height_A")]
    public double Height_A { get; set; }

    [JsonProperty("height_B")]
    public double Height_B { get; set; }

    [JsonProperty("insert_A")]
    public InsertDto Insert_A { get; set; }

    [JsonProperty("insert_B")]
    public InsertDto Insert_B { get; set; }

    [JsonProperty("stud_gap")]
    public double Stud_Gap { get; set; }
}

public class InsertDto
{
    [JsonProperty("x")]
    public double X { get; set; }

    [JsonProperty("y")]
    public double Y { get; set; }

    [JsonProperty("z")]
    public double Z { get; set; }
}