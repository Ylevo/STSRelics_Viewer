using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using STSBuilder.Models;
using STSBuilder.Services;

namespace STSBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageService Service;

        public LanguageController(ILanguageService service)
        {
            Service = service;
        }

        // GET: api/Language
        [HttpGet]
        public Task<ActionResult<IEnumerable<Language>>> GetLanguages()
        {
            return Service.GetLanguages();
        }
    }
}
