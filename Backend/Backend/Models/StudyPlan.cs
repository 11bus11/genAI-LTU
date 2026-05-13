// Study plan model
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

public class StudyPlan
{
    public int Id { get; set; }
    // Study plan name
    public string Name { get; set; } = "";
    // Connected user id
    public string UserId { get; set; }
    // Connected course id
    public int CourseId { get; set; }
    // Start day of Study plan
    public DateTime StartDate { get; set; }
    // Deadline of Study plan
    public DateTime Deadline { get; set; }
    // Study hours per week
    public int StudyHoursPerWeek { get; set; }
    // AI generated study plan content
    public string PlanContent { get; set; } = "";
}