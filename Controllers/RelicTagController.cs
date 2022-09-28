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
    public class RelicTagController : ControllerBase
    {
        private readonly IRelicTagService Service;

        public RelicTagController(IRelicTagService service)
        {
            Service = service;
        }

        // POST: api/RelicTag
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public Task<ActionResult<RelicTag>> AddTagToRelic(RelicTag relicTag)
        {
            return Service.AddTagToRelic(relicTag);
        }

        // DELETE: api/RelicTag/5
        [HttpDelete("{relicId}&{tagName}")]
        public Task<ActionResult<RelicTag>> DeleteRelicTag(string relicId, string tagName)
        {
            return Service.DeleteTagFromRelic(relicId, tagName);
        }
    }
}
