using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/auth")]

public class AuthController : ControllerBase
{
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;

    public AuthController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpPost("create-test-user")]
    public async Task<IActionResult> CreateTestUser()
    {
        var email = "student@ltu.se";
        var password = "Test123!";

        var existingUser = await _userManager.FindByEmailAsync(email);

        if (existingUser != null)
            return BadRequest("Användaren finns redan");

        var user = new IdentityUser { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("Användare skapad");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user == null)
        return Unauthorized("Användaren hittades inte");

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