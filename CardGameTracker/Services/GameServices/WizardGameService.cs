using CardGameTracker.Models.Interface;

namespace CardGameTracker.Services.GameServices
{
    enum WizardErrors
    {
        TooManyTricks,
        TooFewTricks,
        NoNegativeTricks
    }

    enum WizardResultOptions
    {
        TricksEarned,
        TricksBet
    }

    enum WizardRoundOptions
    {
        Trump
    }

    public class WizardGameService : GameServiceBase, IGameService
    {

        public WizardGameService(DataServices.IDataService dataService) : base(dataService) { }

        public Dictionary<int, IEnumerable<PlayerValue>> GetPlayerValues(IGame game)
        {
            return game.Players.ToDictionary(x => x.PlayerId, x =>
                new List<PlayerValue>{
                    new PlayerValue<int>{
                        Player = x,
                        Title = "Points",
                        ParsedValue = GetScore(x)
                    }
                } as IEnumerable<PlayerValue>
            );
        }

        private int GetScore(IPlayer player)
        {
            if (!player.RoundResults.Any())
            {
                return 0;
            }
            return player.RoundResults.Sum(x =>
            {
                int tricksEarned = (int)x.ResultValues.First(y => y.ResultOption.Name == WizardResultOptions.TricksEarned.ToString()).ParsedValue;
                int tricksBet = (int)x.ResultValues.First(y => y.ResultOption.Name == WizardResultOptions.TricksBet.ToString()).ParsedValue;

                return tricksBet == tricksEarned
                    ? tricksBet * 10 + 20
                    : Math.Abs(tricksBet - tricksEarned) * -10;
            });
        }

        public bool IsGameComplete(IGame game)
        {
            return game.Rounds.Any(x => x.RoundNumber == 60 / game.Players.Count() && Validate(x).success);
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

            var trickEarnedId = round.Game.ResultOptions.First(x => x.Name == WizardResultOptions.TricksEarned.ToString()).ResultOptionId;
            var numTricks = round.RoundResults.Sum(x =>
            {
                var resultValue = x.ResultValues?.First(y => y.ResultOptionId == trickEarnedId);
                return (resultValue?.ParsedValue as int?) ?? 0;
            });

            if (round.RoundResults.Any(x => x.ResultValues.Any(y => y.ResultValueId == trickEarnedId && (int?)y.ParsedValue < 0)))
            {
                errors.Add((int)WizardErrors.NoNegativeTricks);
            }

            if (numTricks > round.RoundNumber)
            {
                errors.Add((int)WizardErrors.TooManyTricks);
            }
            else if (numTricks < round.RoundNumber)
            {
                errors.Add((int)WizardErrors.TooFewTricks);
            }

            return (!errors.Any(), errors);
        }

        protected override async Task<bool> CreateRoundOptions(IRound round, IGame game)
        {
            var roundOptions = new List<IRoundOption>{
                new Models.Poco.RoundOptionPoco
                {
                    Name = WizardRoundOptions.Trump.ToString(),
                    Round = round,
                    RoundId = round.RoundId,
                    Value = 60 / game.Players.Count() == round.RoundNumber ? CardSuits.NA.ToString() : null
                }
            };

            foreach (var option in roundOptions)
            {
                await _dataService.InsertAsync(option);
            }

            round.RoundOptions = roundOptions;

            return true;
        }
    }
}