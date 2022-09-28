using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public class TierService : ITierService
    {
        readonly STSBuilderContext Context;
        public TierService(STSBuilderContext context)
        {
            Context = context;
        }
        public async Task<ActionResult<IEnumerable<Tier>>> GetTiers()
        {
            return await Context.Tier.ToListAsync();
        }
    }
}
