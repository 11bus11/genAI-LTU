using Microsoft.AspNetCore.Identity;

public class StudyPlan
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public IdentityUser User { get; set; }
    public List<Course> Courses { get; set; }
}