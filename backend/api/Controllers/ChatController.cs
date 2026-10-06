using System.Text;
using System.Text.Json;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly AvailabilityService _availabilityService;
        public ChatController(IHttpClientFactory httpClientFactory, AvailabilityService availabilityService)
        {
            _httpClientFactory = httpClientFactory;
            _availabilityService = availabilityService;
        }
        public record ChatRequest(string question);

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            var http = _httpClientFactory.CreateClient("openai");
            var bookings = await _availabilityService.getDataAvailabilityContext();
            var body = new
            {
                model = "gpt-4.1",
                input = new object[]
                {
                    new
                    {
                        role = "developer",
                        content = "Data availability context: \n" + bookings
                    },
                    new
                    {
                        role = "user",
                        content = request.question
                    }
                }
            };
            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await http.PostAsync("responses", content);
            var raw = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
            {
                System.Console.WriteLine("Något är fel med OpenAI-förfrågan.");
                return BadRequest("Något gick fel, försök igen senare!");
            }

            var doc = JsonDocument.Parse(raw);
            var root = doc.RootElement;
            string reply = root.GetProperty("output")[0].GetProperty("content")[0].GetProperty("text").GetString() ?? "inget svar";
            return Ok(reply);
        }
    }
}