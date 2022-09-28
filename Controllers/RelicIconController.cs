using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STSBuilder.Models;
using STSBuilder.Services;

namespace STSBuilder.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RelicIconController : ControllerBase
    {
        readonly IRelicIconService Service;

        public RelicIconController(IRelicIconService service)
        {
            Service = service;
        }

        [HttpGet]
        public IEnumerable<string>GetRelicIcons()
        {
            return Service.GetRelicIcons();
        }

        [HttpPost]
        // POST: api/RelicIcon
        public Task<IActionResult> UploadNewRelicIcon([FromForm] IconFile file)
        {
            return Service.UploadNewRelicIcon(file);
        }
    }
}
