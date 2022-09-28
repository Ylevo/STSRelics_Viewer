using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public class TagService : ITagService 
    {
        readonly STSBuilderContext Context;
        public TagService(STSBuilderContext context)
        {
            Context = context;
        }
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            return await Context.Tag.ToListAsync();
        }

        public async Task<ActionResult> UpdateTag(string id, Tag tag)
        {
            if (id != tag.TagName)
            {
                return new BadRequestResult();
            }

            Context.Entry(tag).State = EntityState.Modified;

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }

        public async Task<ActionResult<Tag>> CreateNewTag(Tag tag)
        {
            Context.Tag.Add(tag);
            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TagExists(tag.TagName))
                {
                    return new ConflictResult();
                }
                else
                {
                    throw;
                }
            }
            return new CreatedAtActionResult("GetTag", "tag", new { id = tag.TagName }, tag);
        }

        public async Task<ActionResult<Tag>> DeleteTag(string id)
        {
            var tag = await Context.Tag.FindAsync(id);
            if (tag == null)
            {
                return new NotFoundResult();
            }
            Context.Tag.Remove(tag);
            await Context.SaveChangesAsync();
            return tag;
        }

        private bool TagExists(string id)
        {
            return Context.Tag.Any(e => e.TagName == id);
        }
    }
}
