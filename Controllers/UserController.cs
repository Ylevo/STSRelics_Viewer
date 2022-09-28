using Microsoft.AspNetCore.Mvc;
using STSBuilder.Dtos;
using STSBuilder.Services;

namespace STSBuilder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService Service;

        public UserController(IUserService service)
        {
            Service = service;
        }

        [HttpPost("login")]
        public IActionResult Login(UserDto userDto)
        {
            return Service.Login(userDto.Username, userDto.Password);
        }

    }
}
