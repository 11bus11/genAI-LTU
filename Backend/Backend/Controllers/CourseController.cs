using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CourseController : ControllerBase
{
    private readonly AppDbContext _context;

     // Database context
    public CourseController(AppDbContext context)
    {
        _context = context;
    }

    //Fetch course by course code
    [HttpGet("by-code")]
    public async Task<IActionResult> GetCourseByCode([FromQuery] string code)
    {
        if (string.IsNullOrEmpty(code))
            return BadRequest("Kurskod saknas");

        var course = await _context.Courses
            .FirstOrDefaultAsync(c => c.Code == code);

        if (course == null)
            return NotFound("Kursen hittades inte");

        return Ok(new
        {
            course.Id,
            course.Code,
            course.Name,
        });
    }
     // Adds test courses to the database
    [HttpPost("populate-test-data")]
    public async Task<IActionResult> PopulateTestData()
    {
        // Checks if courses already exist
        if (!_context.Courses.Any())
        {
            _context.Courses.Add(new Course
            {
                Code = "D0018E",
                Name = "Databases"
            });

            _context.Courses.Add(new Course
            {
                Code = "D0020E",
                Name = "Java Programming"
            });
            // Saves changes to database
            await _context.SaveChangesAsync();
        }

        return Ok("Test courses added.");
    }
}