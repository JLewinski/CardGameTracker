using CardGameTracker.Models.Interface;

namespace CardGameTracker.Services.GameServices
{
    public class WizardGameService : GameServiceBase, IGameService
    {
        public WizardGameService(DataServices.IDataService dataService) : base(dataService) { }

        public (bool success, IEnumerable<string> errors) Validate(IGame game)
        {
            throw new NotImplementedException();
        }

        public (bool success, IEnumerable<string> errors) Validate(IRound round)
        {
            throw new NotImplementedException();
        }

        protected override Task<bool> CreateRoundOptions(IRound round)
        {
            throw new NotImplementedException();
        }
    }
}