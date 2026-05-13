// Study plan request model
public class CreateStudyPlanRequest
{
    public string Email { get; set; }
    public string CourseCode { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime Deadline { get; set; }
    public int StudyHoursPerWeek { get; set; }
    public string PlanContent { get; set; }
}
