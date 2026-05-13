// Database context
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    // Study plans table
    public DbSet<StudyPlan> StudyPlans { get; set; }
    // Courses table
    public DbSet<Course> Courses { get; set; }
    // Database configuration
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}