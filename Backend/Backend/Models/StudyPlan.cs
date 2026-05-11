using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

public class StudyPlan
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string UserId { get; set; }
    
    public int CourseId { get; set; }
    
    public DateTime StartDate { get; set; }
    public DateTime Deadline { get; set; }
    public int StudyHoursPerWeek { get; set; }
    public string PlanContent { get; set; } = "";
    public string CourseName { get; set; } = "";
    public string CourseCode { get; set; } = "";
}