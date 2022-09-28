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
    public class RelicController : ControllerBase
    {
        private readonly IRelicService Service;

        public RelicController(IRelicService service)
        {
            Service = service;
        }

        // GET: api/Relic
        [AllowAnonymous]
        [HttpGet]
        public Task<ActionResult<IEnumerable<Relic>>> GetRelics()
        {
            return Service.GetRelics();
        }

        // GET: api/Relic/relicswithtags
        [HttpGet("relicswithtags")]
        public Task<ActionResult<IEnumerable<object>>> GetRelicsWithTags()
        {
            return Service.GetRelicsAdmin();
        }

        // GET: api/Relic/5
        [AllowAnonymous]
        [HttpGet("{language}")]
        public Task<ActionResult<IEnumerable<Relic>>> GetRelics(string language)
        {
            return Service.GetRelics(language);
        }

        // POST: api/Relic
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public Task<ActionResult<Relic>> CreateRelic(Relic relic)
        {
            return Service.CreateNewRelic(relic);
        }

        // DELETE: api/Relic/5
        [HttpDelete("{id}")]
        public Task<ActionResult> DeleteRelic(string id)
        {
            return Service.DeleteRelic(id);
        }

        // PUT: api/Relic/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public Task<ActionResult> UpdateRelic(string id, Relic relic)
        {
            return Service.UpdateRelic(id, relic);
        }
    }
}
