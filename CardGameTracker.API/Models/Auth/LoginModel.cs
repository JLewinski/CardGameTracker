using CardGameTracker.API.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.API.Models.Auth
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
    }

    public class Response
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }

    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string User = "User";
    }

    public class CardUser
    {
        public CardUser() { }
        public CardUser(IDataReader reader)
        {
            
            UserId = reader.GetValue<Guid>(nameof(UserId));
            UserName = reader.GetValue<string>(nameof(UserName));
            Email = reader.GetValue<string>(nameof(Email));
            SecurityStamp = Guid.NewGuid();
        }
        public Guid UserId { get; set; }
        public string UserName { get; set; }

        public string Email { get; set; }
        public Guid SecurityStamp { get; set; }
    }

    public class CardRole
    {
        public Guid Id { get; set; }
        public CardRole()
        {
            Id = Guid.NewGuid();
        }
        public CardRole(string name) : this()
        {

            Name = name;
        }

        public string Name { get; set; }
    }
}
