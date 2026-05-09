using Microsoft.AspNetCore.Identity;

public class StudyPlan
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public IdentityUser User { get; set; }
    public List<Course> Courses { get; set; }
    public string CourseName { get; set; } = "";
    public string CourseCode { get; set; } = "";
    public DateTime StartDate { get; set; }
    public DateTime Deadline { get; set; }
    public int StudyHoursPerWeek { get; set; }
    public string GeneratedPlan { get; set; } = "";
}