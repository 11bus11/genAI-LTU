using Google.GenAI;
using Microsoft.Extensions.AI;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<GeminiService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=Data/app.db"));

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapGet("/ai", async (string prompt, GeminiService geminiService) =>
{
    var result = await geminiService.GenerateTextAsync(prompt);
    return Results.Ok(result);
});

app.Run();