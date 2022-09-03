using CardGameTracker.Models.Interface;

namespace CardGameTracker.Services.GameServices
{
    enum WizardErrors {
        TooManyTricks,
        TooFewTricks,
        NoNegativeTricks
    }

    public class WizardGameService : GameServiceBase, IGameService
    {
        public const string TRICKS_EARNED = "Tricks Earned";

        public WizardGameService(DataServices.IDataService dataService) : base(dataService) { }

        public (bool success, IEnumerable<int> errorCodes) Validate(IGame game)
        {
            var validationResults = game.Rounds
                .Select(x => Validate(x))
                .Aggregate((x,y) => (x.success && y.success, x.errorCodes.Union(y.errorCodes)));

            return (validationResults.success, validationResults.errorCodes.Distinct().ToList());
        }

        public (bool success, IEnumerable<int> errorCodes) Validate(IRound round)
        {
            var errors = new List<int>();

            var trickEarnedId = round.Game.ResultOptions.First(x => x.Name == TRICKS_EARNED).ResultOptionId;
            var numTricks = round.RoundResults.Sum(x =>
            {
                var resultValue = x.ResultValues?.First(y => y.ResultOptionId == trickEarnedId);
                return (resultValue?.ParsedValue as int?) ?? 0;
            });

            if(round.RoundResults.Any(x => x.ResultValues.Any(y => y.ResultValueId == trickEarnedId && (int?)y.ParsedValue < 0)))
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

        protected override Task<bool> CreateRoundOptions(IRound round)
        {
            throw new NotImplementedException();
        }
    }
}