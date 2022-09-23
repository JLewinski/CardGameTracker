using CardGameTracker.API.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace CardGameTracker.API.Services.Auth
{
    public class UserManager
    {
        private readonly string _connectionString;
        private const int SaltSize = 16; // 128 bit 
        private const int KeySize = 32; // 256 bit
        private const int Iterations = 10000;

        public UserManager(string connectionString)
        {
            _connectionString = connectionString;
        }

        internal Task AddToRoleAsync(CardUser user, string role)
        {
            return AddToRoleAsync(user.UserId, role);
        }

        internal async Task AddToRoleAsync(Guid userId, string roleName)
        {
            var parameters = new
            {
                userId,
                roleName
            };
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure("AddUserToRole", parameters))
                {
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        private static string HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations, HashAlgorithmName.SHA256))
            {
                var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
                var salt = Convert.ToBase64String(algorithm.Salt);

                return $"{Iterations}.{salt}.{key}";
            }
        }

        private static (bool verified, bool needsUpgrade) Check(string hash, string password)
        {
            var parts = hash.Split('.', 3);

            if (parts.Length != 3)
            {
                throw new FormatException("Unexpected hash format. " +
                  "Should be formatted as `{iterations}.{salt}.{hash}`");
            }

            var iterations = Convert.ToInt32(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var key = Convert.FromBase64String(parts[2]);

            var needsUpgrade = iterations != Iterations;

            using (var algorithm = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256))
            {
                var keyToCheck = algorithm.GetBytes(KeySize);

                var verified = keyToCheck.SequenceEqual(key);

                return (verified, needsUpgrade);
            }
        }

        private async Task<string> GetHash(CardUser user)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure(nameof(GetHash), new { user.UserId }))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        await reader.ReadAsync();
                        return reader.GetValue<string>("Hash");
                    }
                }
            }
        }

        internal async Task<bool> CheckPasswordAsync(CardUser user, string password)
        {

            var hash = await GetHash(user);
            var test = Check(hash, password);
            return test.verified;
        }

        internal async Task<bool> CreateAsync(CardUser user, string password)
        {
            var parameters = new
            {
                user.UserName,
                user.Email,
                user.SecurityStamp,
                password
            };

            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure("CreateUser", parameters))
                {
                    await command.ExecuteNonQueryAsync();
                }
            }

            return true;
        }

        internal async Task<CardUser> FindByNameAsync(string username)
        {
            CardUser user;

            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure("CreateUser", new { username }))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        await reader.ReadAsync();
                        user = new CardUser(reader);
                    }
                }
            }

            return user;
        }

        internal async Task<IEnumerable<string>> GetRolesAsync(CardUser user)
        {
            var roles = new List<string>();
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure("GetRoles", new { user.UserId }))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            roles.Add(reader.GetValue<string>("RoleName"));
                        }
                    }
                }
            }
            return roles;
        }
    }

    public class RoleManager
    {
        internal Task CreateAsync(CardRole cardRole)
        {
            throw new NotImplementedException();
        }

        internal Task<bool> RoleExistsAsync(string roleName)
        {
            return Task.FromResult<bool>(roleName == UserRoles.Admin || roleName == UserRoles.User);
        }
    }
}
