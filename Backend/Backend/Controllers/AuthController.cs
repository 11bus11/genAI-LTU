using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]

public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;

    // Authentication services
    public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }
    // Creates test users
    [HttpPost("create-test-user")]
    public async Task<IActionResult> CreateTestUser()
{
        var testUsers = new[]
        {
            new { Email = "student1@ltu.se", Password = "Test321!" },
            new { Email = "student2@ltu.se", Password = "Test123!" }
        };

        foreach (var testUser in testUsers)
        {
            // Checks if user already exists
            var existingUser = await _userManager.FindByEmailAsync(testUser.Email);

            if (existingUser == null)
            {
                var user = new IdentityUser
                {
                    UserName = testUser.Email,
                    Email = testUser.Email
                };
            // Creates new user
            var result = await _userManager.CreateAsync(user, testUser.Password);

            if (!result.Succeeded)
                return BadRequest($"Kunde inte skapa användaren {testUser.Email}");
            }
        }

        return Ok("Testanvändare har skapats.");
    }
    // Logs in user
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Finds user by email
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
        return Unauthorized("Användaren hittades inte");
        // Verifies password
        var result = await _signInManager.PasswordSignInAsync(
            user,
            request.Password,
            false,
            false
        );

        if (!result.Succeeded)
            return Unauthorized("Felaktigt lösenord");

            return Ok(new
            {
                message = "Inloggning lyckades",
                email = user.Email,
            });
    }
}