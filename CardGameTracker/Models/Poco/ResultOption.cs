using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public class ResultOptionPoco : IResultOption
    {
        public int ResultOptionId { get; set; }
        public int GameId { get; set; }
        public string Name { get; set; }
        public ResultType ResultType { get; set; }
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
    }
}
