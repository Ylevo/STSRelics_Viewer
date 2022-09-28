using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public interface IRelicIconService
    {
        IEnumerable<string> GetRelicIcons();
        Task<IActionResult> UploadNewRelicIcon(IconFile iconFile);
    }
}
