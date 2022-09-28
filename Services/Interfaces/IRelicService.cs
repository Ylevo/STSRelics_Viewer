using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface IRelicService
    {
        Task<ActionResult<IEnumerable<Relic>>> GetRelics();
        Task<ActionResult<IEnumerable<Relic>>> GetRelics(string language);
        Task<ActionResult<IEnumerable<object>>> GetRelicsAdmin();
        Task<ActionResult<Relic>> CreateNewRelic(Relic relic);
        Task<ActionResult> DeleteRelic(string id);
        Task<ActionResult> UpdateRelic(string id, Relic relic);
    }
}
