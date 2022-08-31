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
    }
}
