using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace STSBuilder.Services
{
    public class RelicDescriptionService : IRelicsDescriptionsService
    {
        readonly STSBuilderContext Context;
        public RelicDescriptionService(STSBuilderContext context)
        {
            Context = context;
        }

        public async Task<ActionResult<IEnumerable<RelicDescription>>> GetRelicsDescriptions(string language = "eng")
        {
            return await Context.RelicDescription
                .Where(d => d.DescriptionLanguage == language)
                .ToListAsync();
        }

        public async Task<ActionResult<IEnumerable<RelicDescription>>> GetRelicsDescriptions()
        {
            return await Context.RelicDescription
                .ToListAsync();
        }

        public async Task<ActionResult> UpdateRelicDescription(string relicId, string language, RelicDescription relicDescription)
        {
            if (relicId != relicDescription.RelicId && language != relicDescription.DescriptionLanguage)
            {
                return new BadRequestResult();
            }

            Context.Entry(relicDescription).State = EntityState.Modified;

            try
            {
                await Context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RelicDescriptionExists(relicId, language))
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

        private bool RelicDescriptionExists(string relicId, string language)
        {
            return Context.RelicDescription.Any(e => e.RelicId == relicId && e.DescriptionLanguage == language);
        }
    }
}
