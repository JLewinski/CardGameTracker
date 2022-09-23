using CardGameTracker.Models.Interface;
using CardGameTracker.Services.DataServices;

namespace CardGameTracker.Services.GameServices
{
    public enum Phase10Errors
    {
        NobodyWentOut
    }

    public enum Phase10RoundOptions
    {
        PointsEarned,
        CompletedPhase,
        CurrentPhase
    }
    public class Phase10GameService : GameServiceBase, IGameService
    {
        public Phase10GameService(IDataService dataService) : base(dataService)
        {
        }

        public (bool success, IEnumerable<int> errorCodes) Validate(IGame game)
        {
            var validationResults = game.Rounds
                .Select(x => Validate(x))
                .Aggregate((x, y) => (x.success && y.success, x.errorCodes.Union(y.errorCodes)));

            return (validationResults.success, validationResults.errorCodes.Distinct().ToList());
        }

        public (bool success, IEnumerable<int> errorCodes) Validate(IRound round)
        {
            var errors = new List<int>();

            var pointsEarnedId = round.Game.ResultOptions.First(x => x.Name == Phase10RoundOptions.PointsEarned.ToString()).ResultOptionId;
            var has0 = round.RoundResults
                .Any(x => x.ResultValues.Any(y => y.ResultOptionId == pointsEarnedId && y.ResultValue == "0"));

            if (!has0)
            {
                errors.Add((int)Phase10Errors.NobodyWentOut);
            }

            return (has0, errors);
        }

        protected override Task<bool> CreateRoundOptions(IRound round, IGame game)
        {
            return Task.FromResult<bool>(true);
        }

        public bool IsGameComplete(IGame game)
        {
            var phaseCompletedId = game.ResultOptions.First(x => x.Name == Phase10RoundOptions.CompletedPhase.ToString()).ResultOptionId;
            var currentPhaseId = game.ResultOptions.First(x => x.Name == Phase10RoundOptions.CurrentPhase.ToString()).ResultOptionId;
            var someoneCompletedPhase10 = game.Rounds
                .Any(x => x.RoundResults
                    .Any(y =>
                        y.ResultValues.Any(z => z.ResultOptionId == phaseCompletedId && z.ResultValue == "true")
                        && y.ResultValues.Any(z => z.ResultOptionId == currentPhaseId && z.ResultValue == "10")
                    ));

            return someoneCompletedPhase10;
        }

        public Dictionary<int, IEnumerable<PlayerValue>> GetPlayerValues(IGame game)
        {
            return game.Players.ToDictionary(x => x.PlayerId, x =>
                new List<PlayerValue>{
                    new PlayerValue<int>{
                        Player = x,
                        Title = "Points",
                        ParsedValue = GetScore(x)
                    },
                    new PlayerValue<int>{
                        Player = x,
                        Title = "Phase",
                        ParsedValue = GetPhase(x)
                    }
                } as IEnumerable<PlayerValue>
            );
        }

        public int GetScore(IPlayer player)
        {
            if (!player.RoundResults.Any())
            {
                return 0;
            }
            return player.RoundResults.Sum(x => (int)x.ResultValues.First(y => y.ResultOption.Name == Phase10RoundOptions.PointsEarned.ToString()).ParsedValue);
        }

        public int GetPhase(IPlayer player)
        {
            if (!player.RoundResults.Any())
            {
                return 1;
            }
            return player.RoundResults.Max(x =>
            {
                int phaseNumber = (int)x.ResultValues.First(y => y.ResultOption.Name == Phase10RoundOptions.CurrentPhase.ToString()).ParsedValue;
                bool completedPhase = (bool)x.ResultValues.First(y => y.ResultOption.Name == Phase10RoundOptions.CompletedPhase.ToString()).ParsedValue;
                return completedPhase ? phaseNumber + 1 : phaseNumber;
            });
        }
    }
}