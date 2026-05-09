using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

[ApiController]
[Route("api/[controller]")]
public class StudyPlanController :ControllerBase
{
    private readonly AppDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;

    public StudyPlanController(AppDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    //CREATE a new study plan

    //Fetch all study plans for a user
    [HttpGet("my-plans")]
    public async Task<IActionResult> GetMyStudyPlans()
    {
        var email = Request.Headers["user-email"].ToString();

        if (string.IsNullOrEmpty(email))
            return BadRequest("Email saknas i header");

        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return NotFound("Användaren hittades inte");

        var plans = await _context.StudyPlans
            .Where(sp => sp.UserId == user.Id)
            .Select(sp => new
        {
            sp.Id,
            sp.Name
        })
        .ToListAsync();

    return Ok(plans);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudyPlan(int id)
    {
        var plan = await _context.StudyPlans
            .Include(sp => sp.Courses)
            .FirstOrDefaultAsync(sp => sp.Id == id);

        if (plan == null)
            return NotFound("Studieplanen hittades inte");

        return Ok(new
        {
            plan.Id,
            plan.Name,
            plan.CourseName,
            plan.CourseCode,
            plan.StartDate,
            plan.Deadline,
            plan.StudyHoursPerWeek,
            plan.GeneratedPlan,
            Courses = plan.Courses
        });
    }
    //Delete a study plan
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudyPlan(int id)
    {
        var plan = await _context.StudyPlans.FindAsync(id);

        if (plan == null)
            return NotFound("Studieplanen hittades inte");

        _context.StudyPlans.Remove(plan);
        await _context.SaveChangesAsync();

        return Ok("Studieplanen har tagits bort");
    }

        [HttpPost("populate-test-data")]
    public async Task<IActionResult> PopulateTestData()
    {
        var email = "student1@ltu.se";

        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return NotFound("Testanvändare hittades inte.");

        if (!_context.StudyPlans.Any(sp => sp.UserId == user.Id))
        {
            _context.StudyPlans.Add(new StudyPlan
            {
                Name = "Databaser Studieplan",
                UserId = user.Id
            });

            _context.StudyPlans.Add(new StudyPlan
            {
                Name = "Java Studieplan",
                UserId = user.Id
            });

            await _context.SaveChangesAsync();
        }

        return Ok("Test studieplaner har lagts till.");
    }
}
