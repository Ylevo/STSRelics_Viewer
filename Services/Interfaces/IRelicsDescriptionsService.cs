using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface IRelicsDescriptionsService
    {
        Task<ActionResult<IEnumerable<RelicDescription>>> GetRelicsDescriptions(string language = "eng");
        Task<ActionResult<IEnumerable<RelicDescription>>> GetRelicsDescriptions();
        Task<ActionResult> UpdateRelicDescription(string relicId, string language, RelicDescription relicDescription);
    }
}
