using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface ISoundService
    {
        Task<ActionResult<IEnumerable<Sound>>> GetSounds();
    }
}
