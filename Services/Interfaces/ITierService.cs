using System.Collections.Generic;
using System.Threading.Tasks;
using STSBuilder.Models;
using Microsoft.AspNetCore.Mvc;

namespace STSBuilder.Services
{
    public interface ITierService
    {
        Task<ActionResult<IEnumerable<Tier>>> GetTiers();
    }
}
