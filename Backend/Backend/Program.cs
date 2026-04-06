var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

//builder.Services.AddControllers();

//string connectionString = builder.Configuration.GetConnectionString("Default") ?? throw new InvalidOperationException("Connection string 'Default' not found.");
//builder.Services.AddDbContext<AppDbContext>(op=> op.UseSqlite(connectionString));

app.Run();
