using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ChatController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        public record ChatRequest(string question);

        [HttpPost]
        public async Task<IActionResult> Chat([FromBody] ChatRequest request)
        {
            var http = _httpClientFactory.CreateClient("openai");
            var body = new
            {
                model = "gpt-4.1",
                input = request.question
            };
            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
            var response = await http.PostAsync("responses", content);

            var raw = await response.Content.ReadAsStringAsync();

            Console.WriteLine("Raw: " + raw);

            return Ok(request);
        }
    }
}