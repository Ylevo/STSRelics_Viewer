using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace STSBuilder.Services
{
    public class RelicService : IRelicService
    {
        readonly STSBuilderContext Context;
        public RelicService(STSBuilderContext context)
        {
            Context = context;
        }

        public async Task<ActionResult<IEnumerable<Relic>>> GetRelics()
        {
            return await Context.Relic.ToListAsync();
        }
        public async Task<ActionResult<IEnumerable<Relic>>> GetRelics(string language)
        {
            Language lang = Context.Language.Find(language);
            if (lang == null)
            {
                return new BadRequestResult();
            }
            var relics = await Context.Relic
                .Include(d => d.Descriptions)
                .Include(d => d.Tags).ThenInclude(tags => tags.TagNavigation)
                .Select(r => new Relic
                {
                    Id = r.Id,
                    Image = r.Image,
                    Sound = r.Sound,
                    Tier = r.Tier,
                    Tags = r.Tags,
                    Descriptions = (ICollection<RelicDescription>)r.Descriptions.Where(desc => desc.DescriptionLanguage == language)
                }).ToListAsync();
            return relics;
        }

        public async Task<ActionResult<IEnumerable<object>>> GetRelicsAdmin()
        {
            var relics = await Context.Relic
                .Include(d => d.Descriptions)
                .Include(d => d.Tags)
                .Select(r => new 
                {
                    Id = r.Id,
                    Image = r.Image,
                    Sound = r.Sound,
                    Tier = r.Tier,
                    Tags = r.Tags.Select(t => t.TagNavigation),
                    Descriptions = r.Descriptions
                }).ToListAsync();
            return relics;
        }

        public async Task<ActionResult<Relic>> CreateNewRelic(Relic relic)
        {
            Context.Relic.Add(relic);
            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RelicExists(relic.Id))
                {
                    return new ConflictResult();
                }
                else
                {
                    throw;
                }
            }
            return new CreatedAtActionResult("GetRelic", "relic", new { id = relic.Id }, relic);
        }

        public async Task<ActionResult> DeleteRelic(string id)
        {
            var relic = await Context.Relic.FindAsync(id);
            if (relic == null)
            {
                return new NotFoundResult();
            }
            Context.Relic.Remove(relic);
            await Context.SaveChangesAsync();
            return new OkResult();
        }

        public async Task<ActionResult> UpdateRelic(string id, Relic relic)
        {
            if (id != relic.Id)
            {
                return new BadRequestResult();
            }
            Context.Entry(relic).State = EntityState.Modified;
            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RelicExists(id))
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


        private bool RelicExists(string id)
        {
            return Context.Relic.Any(e => e.Id == id);
        }
    }


}
