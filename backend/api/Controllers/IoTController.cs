using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
[Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class IoTController : ControllerBase
    {
        
        
    }
}
