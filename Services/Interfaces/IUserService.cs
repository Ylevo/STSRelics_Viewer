using Microsoft.AspNetCore.Mvc;
using STSBuilder.Models;

namespace STSBuilder.Services
{
    public interface IUserService
    {
        IActionResult Login(string username, string password);
        User GetById(int id);
    }
}
