using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public class RoundPoco : IRound
    {
        public int RoundId { get; set; }
        public int RoundNumber { get; set; }
        public int GameId { get; set; }
        private IGame game;
        public IGame Game
        {
            get => game;
            set
            {
                game = value;
                GameId = game.GameId;
            }
        }

        public IEnumerable<IRoundResult> RoundResults { get; set; }
        public IEnumerable<IRoundOption> RoundOptions { get; set; }
    }

    public class RoundOptionPoco : IRoundOption
    {
        public int RoundId { get; set; }
        public int RoundOptionId { get; set; }
        public string Name { get; set; }
        public string? Value { get; set; }
        public IRound Round { get; set; }
    }
}
