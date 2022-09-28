using STSBuilder.Models;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using STSBuilder.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace STSBuilder.Services
{
    public class UserService : IUserService
    {
        readonly STSBuilderContext Context;
        private readonly IMapper Mapper;
        private readonly AppSettings AppSettings;

        public UserService(STSBuilderContext context, IMapper mapper, IOptions<AppSettings> appSettings)
        {
            Context = context;
            Mapper = mapper;
            AppSettings = appSettings.Value;
        }

        public IActionResult Login(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                return new UnauthorizedResult();
            }
            var user = Context.User.SingleOrDefault(u => u.Username == username);
            if (user == null)
            {
                return new UnauthorizedResult();
            }
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return new UnauthorizedResult();
            }
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(AppSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return new OkObjectResult(new {
                Id = user.Id,
                Username = user.Username,
                Token = tokenString
            });
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null || string.IsNullOrWhiteSpace(password) || storedHash.Length != 64 || storedSalt.Length != 128)
            {
                return false;
            }
            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }
            return true;
        }

        public User GetById(int id)
        {
            return Context.User.Find(id);
        }
    }
}
