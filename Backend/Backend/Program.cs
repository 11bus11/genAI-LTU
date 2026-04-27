using Google.GenAI;
using Microsoft.Extensions.AI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;

using System.Net.Http.Headers;

builder.Services.AddSingleton<GeminiService>();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=Data/app.db"));

var app = builder.Build();
namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Configuration.AddUserSecrets<Program>();

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpClient<GeminiService>();

app.MapGet("/ai", async (string prompt, GeminiService geminiService) =>
{
    var result = await geminiService.GenerateTextAsync(prompt);
    return Results.Ok(result);
});

app.Run();
            var allowedOrigins = builder.Configuration.GetSection("allowedOrigins").Get<string[]>()!;

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors();

            app.UseHttpsRedirection();

            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

//builder.Services.AddControllers();

//string connectionString = builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'Default' not found.");
//builder.Services.AddDbContext<AppDbContext>(op=> op.UseSqlite(connectionString));

