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
    public class TagController : ControllerBase
    {
        private readonly ITagService Service;

        public TagController(ITagService service)
        {
            Service = service;
        }

        // GET: api/Tag
        [AllowAnonymous]
        [HttpGet]
        public Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            return Service.GetTags();
        }

        // PUT: api/Tag/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public Task<ActionResult> UpdateTag(string id, Tag tag)
        {
            return Service.UpdateTag(id, tag);
            
        }

        // POST: api/Tag
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public Task<ActionResult<Tag>> CreateTag(Tag tag)
        {
            return Service.CreateNewTag(tag);
        }

        // DELETE: api/Tag/5
        [HttpDelete("{id}")]
        public Task<ActionResult<Tag>> DeleteTag(string id)
        {
            return Service.DeleteTag(id);
        }
    }
}
