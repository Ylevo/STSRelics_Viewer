using System.Linq;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace STSBuilder.Services
{
    public class RelicTagService : IRelicTagService
    {
        readonly STSBuilderContext Context;
        public RelicTagService(STSBuilderContext context)
        {
            Context = context;
        }

        public async Task<ActionResult<RelicTag>> AddTagToRelic(RelicTag relicTag)
        {
            Context.RelicTag.Add(relicTag);
            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RelicTagExists(relicTag))
                {
                    return new ConflictResult();
                }
                else
                {
                    throw;
                }
            }
            return new CreatedAtActionResult("GetRelicTag", "relictag", new { relicTag.RelicId, relicTag.RelicTagName }, relicTag);
        }

        public async Task<ActionResult<RelicTag>> DeleteTagFromRelic(string relicId, string tagName)
        {
            var relicTag = await Context.RelicTag.FindAsync(relicId, tagName);
            if (relicTag == null)
            {
                return new NotFoundResult();
            }

            Context.RelicTag.Remove(relicTag);
            await Context.SaveChangesAsync();
            return relicTag;
        }

        private bool RelicTagExists(RelicTag relicTag)
        {
            return Context.RelicTag.Any(e => e.RelicId == relicTag.RelicId && e.RelicTagName == relicTag.RelicTagName);
        }
    }
}
