using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface IRelicTagService
    {
        Task<ActionResult<RelicTag>> AddTagToRelic(RelicTag relicTag);
        Task<ActionResult<RelicTag>> DeleteTagFromRelic(string relicId, string tagName);
    }
}
