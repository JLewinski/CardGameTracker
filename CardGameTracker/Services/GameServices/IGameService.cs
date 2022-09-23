using CardGameTracker.Models.Interface;
using CardGameTracker.Models.Poco;
using CardGameTracker.Services.DataServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Services.GameServices
{
    public enum CardSuits
    {
        Clubs,
        Diamonds,
        Spades,
        Hearts,
        NA
    }
    public interface IGameService
    {
        // Task<IGame> CreateGame();
        (bool success, IEnumerable<int> errorCodes) Validate(IGame game);
        (bool success, IEnumerable<int> errorCodes) Validate(IRound round);
        Task<IRound> CreateRound(IGame game);
        bool IsGameComplete(IGame game);

        Dictionary<int, IEnumerable<PlayerValue>> GetPlayerValues(IGame game);
    }

    public abstract class GameServiceBase
    {
        protected readonly IDataService _dataService;

        public GameServiceBase(IDataService dataService)
        {
            _dataService = dataService;
        }

        protected abstract Task<bool> CreateRoundOptions(IRound round, IGame game);

        public async Task<IRound> CreateRound(IGame game)
        {
            var lastRoundNumber = game.Rounds.Any() ? game.Rounds.Max(x => x.RoundNumber) : 0;
            var round = new RoundPoco
            {
                Game = game,
                RoundNumber = lastRoundNumber + 1
            };
            await _dataService.InsertAsync(round);
            var success = await CreateRoundOptions(round, game);
            return round;
        }

        
    }

    public abstract class PlayerValue
    {
        public IPlayer Player { get; set; }
        public string Title { get; set; }
        public abstract string Value { get; }
    }

    public class PlayerValue<T> : PlayerValue
    {
        public override string Value => ParsedValue?.ToString() ?? string.Empty;
        public T ParsedValue { get; set; }
    }
}
