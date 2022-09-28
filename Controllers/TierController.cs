using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using STSBuilder.Models;
using STSBuilder.Services;

namespace STSBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TierController : ControllerBase
    {
        private readonly ITierService Service;

        public TierController(ITierService service)
        {
            Service = service;
        }

        // GET: api/Sound
        [HttpGet]
        public Task<ActionResult<IEnumerable<Tier>>> GetTiers()
        {
            return Service.GetTiers();
        }
    }
}
