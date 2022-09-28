using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface ILanguageService
    {
        Task<ActionResult<IEnumerable<Language>>> GetLanguages();
    }
}
