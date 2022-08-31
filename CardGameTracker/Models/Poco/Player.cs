using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public class PlayerPoco : IPlayer
    {
        public int PlayerId { get; set; }
        public string Name { get; set; }
        public string NickName { get; set; }
        public IEnumerable<IGame> Games { get; set; }
        public IEnumerable<IRoundResult> RoundResults { get; set; }
    }
}
