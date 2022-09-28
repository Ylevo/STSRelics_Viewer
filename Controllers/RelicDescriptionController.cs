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
    public class RelicDescriptionController : ControllerBase
    {
        private readonly IRelicsDescriptionsService Service;

        public RelicDescriptionController(IRelicsDescriptionsService service)
        {
            Service = service;
        }

        // GET: api/RelicDescription
        [AllowAnonymous]
        [HttpGet]
        public Task<ActionResult<IEnumerable<RelicDescription>>> GetRelicsDescriptions()
        {
            return Service.GetRelicsDescriptions();
        }

        // GET: api/RelicDescription/5
        [AllowAnonymous]
        [HttpGet("{language}")]
        public Task<ActionResult<IEnumerable<RelicDescription>>> GetRelicsDescriptions(string language)
        {
            return Service.GetRelicsDescriptions(language);
        }

        // PUT: api/RelicDescription/5/en
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{relicId}/{language}")]
        public Task<ActionResult> UpdateRelicDescription(string relicId, string language, RelicDescription relicDescription)
        {
            return Service.UpdateRelicDescription(relicId, language, relicDescription);
        }

        
    }
}
