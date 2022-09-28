using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface ITagService
    {
        Task<ActionResult<IEnumerable<Tag>>> GetTags();

        Task<ActionResult> UpdateTag(string id, Tag tag);

        Task<ActionResult<Tag>> CreateNewTag(Tag tag);
        Task<ActionResult<Tag>> DeleteTag(string id);

    }
}