using Google.GenAI;
using Google.GenAI.Types;

public class GeminiService
{
    private readonly Client _client;

    public GeminiService()
    {
        _client = new Client();
    }

    public async  Task<string> GenerateTextAsync(string prompt)
    {
        var response = await _client.Models.GenerateContentAsync(
            model: "gemini-3-flash-preview",
            contents:prompt
        );

        return response.Candidates?
            .FirstOrDefault()?
            .Content?
            .Parts?
            .FirstOrDefault()?
            .Text ?? "No response from AI";
    }
}