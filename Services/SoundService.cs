using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public class SoundService : ISoundService
    {
        readonly STSBuilderContext Context;
        public SoundService(STSBuilderContext context)
        {
            Context = context;
        }
        public async Task<ActionResult<IEnumerable<Sound>>> GetSounds()
        {
            return await Context.Sound.ToListAsync();
        }
    }
}
