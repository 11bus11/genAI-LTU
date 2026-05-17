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
        public async Task<IActionResult> Chat([FromForm] string prompt, IFormFileCollection files)
        {
            // Checks if prompt is empty
            if (string.IsNullOrWhiteSpace(prompt))
            {
                return BadRequest("Prompt cannot be empty.");
            }
            
            Console.WriteLine($"Chat endpoint called. Prompt length: {prompt.Length}, Files count: {files?.Count ?? 0}");
            
            try
            {
                // Gets AI response                
                var response = await _geminiService.getChatResponse(prompt, files);
                return Ok(new ChatResponse { Response = response });
            }
            catch (Exception ex)
            {
                // Returns server error with actual exception message
                Console.WriteLine($"Error in Chat endpoint: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { error = ex.Message, details = ex.StackTrace });
            }
        }
    } 
}