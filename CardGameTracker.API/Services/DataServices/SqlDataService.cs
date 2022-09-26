using CardGameTracker.Models.Interface;
using CardGameTracker.Models.Poco;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Services.DataServices
{
    public class SqlDataService : IDataService
    {
        private readonly string _connectionString;

        public IGame GetGame(int id)
        {
            return GetGameAsync(id).Result;
        }

        public async Task<IGame> GetGameAsync(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure("GetGame", new { GameId = id }))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        await reader.ReadAsync();
                        return new GamePoco(reader);
                    }
                }
            }
        }

        public List<GameDisplay> GetGameList(IEnumerable<int>? playerIds = null, int startIndex = 0, int endIndex = 0, string? name = null, bool? isFinished = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            throw new NotImplementedException();
        }

        public async Task<List<GameDisplay>> GetGameListAsync(IEnumerable<int>? playerIds = null, int startIndex = 0, int endIndex = 0, string? name = null, bool? isFinished = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            var games = new List<GameDisplay>();
            var parameters = new
            {
                startIndex,
                endIndex,
                name,
                isFinished,
                startDate,
                endDate,
                playerIds = playerIds?.Select(x => x.ToString()).Aggregate((a,b) => $"{a}, {b}") ?? null,
            };

            using (var conn = new SqlConnection(_connectionString))
            {
                using (var command = conn.CreateStoredProcedure("GetGameList", parameters))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            games.Add(new GameDisplay(reader));
                        }
                    }
                }
            }

            return games;
        }

        public IPlayer GetPlayer(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IPlayer> GetPlayerAsync(int id)
        {
            throw new NotImplementedException();
        }

        public IRound GetRound(int id)
        {
            throw new NotImplementedException();
        }

        public IRound GetRound(int gameId, int roundNumber)
        {
            throw new NotImplementedException();
        }

        public Task<IRound> GetRoundAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IRound> GetRoundAsync(int gameId, int roundNumber)
        {
            throw new NotImplementedException();
        }

        public bool Insert(IRound round)
        {
            throw new NotImplementedException();
        }

        public bool Insert(IRoundOption roundOption)
        {
            throw new NotImplementedException();
        }

        public Task<bool> InsertAsync(IRound round)
        {
            throw new NotImplementedException();
        }

        public Task<bool> InsertAsync(IRoundOption roundOption)
        {
            throw new NotImplementedException();
        }

        public bool Save(IRoundOption roundOption)
        {
            throw new NotImplementedException();
        }

        public bool Save(IRound round)
        {
            throw new NotImplementedException();
        }

        public bool Save(IGame game)
        {
            throw new NotImplementedException();
        }

        public bool Save(IPlayer player)
        {
            throw new NotImplementedException();
        }

        public bool Save(IRoundResult roundResult)
        {
            throw new NotImplementedException();
        }

        public bool Save(Models.Interface.IResult roundValue)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAsync(IRoundOption roundOption)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAsync(IRound round)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAsync(IGame game)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAsync(IPlayer player)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAsync(IRoundResult roundResult)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAsync(Models.Interface.IResult roundValue)
        {
            throw new NotImplementedException();
        }
    }
}
