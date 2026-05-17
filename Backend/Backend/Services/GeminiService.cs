using System.Net.Mime;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Google.GenAI;
using Google.GenAI.Types;
using Microsoft.Extensions.Configuration;

// Gemini AI service
public class GeminiService
{
    private readonly HttpClient _httpClient;
    private readonly string apiKey;
    //private readonly string url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

    public GeminiService(HttpClient httpClient, IConfiguration configuration)
    {
        this._httpClient = httpClient;
        this.apiKey = ""; //add api key here
    }
    // Sends prompt to Gemini API
    public async Task<string> getChatResponse(string prompt, IFormFileCollection files)
    {
        Console.WriteLine("getChatResponse called");
        var parts = new List<object> { new { text = prompt } };

        if (files != null && files.Count > 0)
        {
            Console.WriteLine($"Processing {files.Count} files");
        }

        foreach (var file in files ?? new FormFileCollection())
        {
            using (var stream = file.OpenReadStream())
            using (var memoryStream = new MemoryStream())
            {
                await stream.CopyToAsync(memoryStream);
                var base64 = Convert.ToBase64String(memoryStream.ToArray());
                var mimeType = file.ContentType ?? "application/pdf";
                
                Console.WriteLine($"File: {file.FileName}, Size: {memoryStream.Length} bytes, MIME Type: {mimeType}");
                
                parts.Add(new
                {
                    inlineData = new
                    {
                        mimeType = mimeType,
                        data = base64
                    }
                });
            }
        }
        // Creates request body for Gemini API
        var requestBody = new
        {
            contents = new[]
            {
                new
                {
                    parts = parts
                }
            }
        };
        var request = new HttpRequestMessage
        (
            HttpMethod.Post,
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent"
        );
        request.Headers.Add("X-goog-api-key", apiKey);
        request.Content = new StringContent(
            System.Text.Json.JsonSerializer.Serialize(requestBody), 
            Encoding.UTF8,
            "application/json"
        );
        // Sends request to Gemini API
        var response = await _httpClient.SendAsync(request);
        if (response.IsSuccessStatusCode)
        {            
            var responseContent = await response.Content.ReadAsStringAsync();
            using var jsonDoc = JsonDocument.Parse(responseContent);
            // Extracts AI response text
            var text = jsonDoc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();
            return text ?? "No response from AI";
        } else
        {
            var errorContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"Gemini API Error: Status {response.StatusCode}");
            Console.WriteLine($"Error Response: {errorContent}");
            throw new Exception($"Request failed with status code: {response.StatusCode}. Error: {errorContent}");
        }

    }
}


