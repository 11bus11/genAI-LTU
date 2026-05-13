using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Backend.Models;

namespace GeminiAIChat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly GeminiService _geminiService;

        // Gemini AI service
        public ChatController(GeminiService geminiService)
        {
            _geminiService = geminiService;
        }
        // Sends prompt to Gemini AI
        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] string prompt)
        {
            // Checks if prompt is empty
            if (string.IsNullOrWhiteSpace(prompt))
            {
                return BadRequest("Prompt cannot be empty.");
            }
            try
            {
                // Gets AI response                
                var response = await _geminiService.getChatResponse(prompt);
                return Ok(new ChatResponse { Response = response });
            }
            catch (Exception ex)
            {
                // Returns server error
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    } 
}