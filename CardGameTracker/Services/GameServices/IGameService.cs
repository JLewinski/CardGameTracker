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
    public interface IGameService
    {
        (bool success, IEnumerable<string> errors) Validate(IGame game);
        (bool success, IEnumerable<string> errors) Validate(IRound round);
        Task<IRound> CreateRound(IGame game);

    }

    public abstract class GameServiceBase
    {
        protected readonly IDataService _dataService;

        public GameServiceBase(IDataService dataService)
        {
            _dataService = dataService;
        }

        protected abstract Task<bool> CreateRoundOptions(IRound round);

        public async Task<IRound> CreateRound(IGame game)
        {
            var lastRoundNumber = game.Rounds.Any() ? game.Rounds.Max(x => x.RoundNumber) : 0;
            var round = new RoundPoco
            {
                Game = game,
                RoundNumber = lastRoundNumber + 1
            };
            await _dataService.InsertAsync(round);
            var success = await CreateRoundOptions(round);
            return round;
        }
    }
}
