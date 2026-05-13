using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

[ApiController]
[Route("api/[controller]")]
// Study plan controller
public class StudyPlanController :ControllerBase
{
    // Database context and user manager
    private readonly AppDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;


    // Constructor
    public StudyPlanController(AppDbContext context, UserManager<IdentityUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    //CREATE a new study plan
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] CreateStudyPlanRequest request)
    {
        if (request == null)
            return BadRequest("Begäran är tom");

        if (string.IsNullOrEmpty(request.Email))
            return BadRequest("Email saknas");

        if (string.IsNullOrEmpty(request.CourseCode))
            return BadRequest("Kurskod saknas");

        var course = await _context.Courses.FirstOrDefaultAsync(c => c.Code == request.CourseCode);
        
        if (course == null)
            return BadRequest($"Kursen med kod {request.CourseCode} hittades inte");
        
        var user = await _userManager.FindByEmailAsync(request.Email);
        
        if (user == null)
            return BadRequest($"Användaren med email {request.Email} hittades inte");

        var studyPlan = new StudyPlan
        {
            Name = $"Study Plan for {course.Name}",
            UserId = user.Id,
            CourseId = course.Id,
            StartDate = request.StartDate,
            Deadline = request.Deadline,
            StudyHoursPerWeek = request.StudyHoursPerWeek,
            PlanContent = request.PlanContent
        };

        _context.StudyPlans.Add(studyPlan);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Study plan created successfully", id = studyPlan.Id });
    }


    

    //Fetch all study plans for a user
    [HttpGet("my-plans")]
    public async Task<IActionResult> GetMyStudyPlans()
    {
        // Gets user email from request header
        var email = Request.Headers["user-email"].ToString();

        if (string.IsNullOrEmpty(email))
            return BadRequest("Email saknas i header");
        // Finds user by email
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return NotFound("Användaren hittades inte");
        // Returns study plans for the user
        var plans = await _context.StudyPlans
            .Where(sp => sp.UserId == user.Id)
            .Select(sp => new
        {
            sp.Id,
            sp.Name,
            sp.CourseName,
            sp.CourseCode,
            sp.StartDate,
            sp.Deadline,
            sp.StudyHoursPerWeek
        })
        .ToListAsync();

    return Ok(plans);
    }
    /*[HttpGet("{id}")]
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
    */
    //Delete a study plan
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudyPlan(int id)
    {
        // Finds study plan by id
        var plan = await _context.StudyPlans.FindAsync(id);

        if (plan == null)
            return NotFound("Studieplanen hittades inte");
        // Removes study plan from database
        _context.StudyPlans.Remove(plan);
        await _context.SaveChangesAsync();

        return Ok("Studieplanen har tagits bort");
    }
        // Populates database with test study plans
        [HttpGet("populate-test-data")]
        public async Task<IActionResult> PopulateTestData()
        {
            var email = "student@ltu.se";

            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                return NotFound("Testanvändare hittades inte.");
            // Checks if study plans already exist
            if (!_context.StudyPlans.Any(sp => sp.UserId == user.Id))
            {
                _context.StudyPlans.Add(new StudyPlan
                {
                    Name = "Databaser D0027E",
                    CourseName = "Databaser",
                    CourseCode = "D0027E",
                    StartDate = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(14),
                    StudyHoursPerWeek = 10,
                    UserId = user.Id
                });

                _context.StudyPlans.Add(new StudyPlan
                {
                    Name = "Javaprogrammering D0010E",
                    CourseName = "Javaprogrammering",
                    CourseCode = "D0010E",
                    StartDate = DateTime.Now,
                    Deadline = DateTime.Now.AddDays(21),
                    StudyHoursPerWeek = 15,
                    UserId = user.Id
                });

                await _context.SaveChangesAsync();
            }

            return Ok("Test studieplaner har lagts till.");
        }
    }
