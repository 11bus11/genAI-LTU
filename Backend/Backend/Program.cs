// Entity Framework and Identity
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);
// Loads user secrets
builder.Configuration.AddUserSecrets<Program>();
// Adds controllers
builder.Services.AddControllers();
// Enables Swagger
builder.Services.AddSwaggerGen();
// Configures SQLite database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=Data/app.db"));
    // Configures Identity authentication
    builder.Services.AddIdentity<IdentityUser, IdentityRole>()
        .AddEntityFrameworkStores<AppDbContext>();
// Registers Gemini AI service
builder.Services.AddHttpClient<GeminiService>();
// Configures CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader());
});

var app = builder.Build();
// Enables Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
// Enables CORS policy
app.UseCors("AllowReactApp");
// Enables authentication
app.UseAuthentication();
// Enables authentication
app.UseAuthorization();
// Maps controllers
app.MapControllers();

app.Run();
