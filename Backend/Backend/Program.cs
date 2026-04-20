using Google.GenAI;
using Microsoft.Extensions.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<GeminiService>();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/ai", async(string prompt, GeminiService geminiService) =>
{
    var result = await geminiService.GenerateTextAsync(prompt);
    return Results.Ok(result);
});

//builder.Services.AddControllers();

//string connectionString = builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'Default' not found.");
//builder.Services.AddDbContext<AppDbContext>(op=> op.UseSqlite(connectionString));

app.Run();
