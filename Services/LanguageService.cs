using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public class LanguageService : ILanguageService
    {
        readonly STSBuilderContext Context;
        public LanguageService(STSBuilderContext context)
        {
            Context = context;
        }
        public async Task<ActionResult<IEnumerable<Language>>> GetLanguages()
        {
            return await Context.Language.ToListAsync();
        }
    }
    
}
