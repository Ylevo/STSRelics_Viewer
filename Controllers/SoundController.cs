using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using STSBuilder.Models;
using STSBuilder.Services;

namespace STSBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoundController : ControllerBase
    {
        private readonly ISoundService Service;

        public SoundController(ISoundService service)
        {
            Service = service;
        }

        // GET: api/Sound
        [HttpGet]
        public  Task<ActionResult<IEnumerable<Sound>>> GetSounds()
        {
            return Service.GetSounds();
        }
    }
}
