using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public class RoundResultPoco : IRoundResult
    {
        public int RoundResultId { get; set; }
        public int RoundId { get; set; }
        public int PlayerId { get; set; }
        private IRound round;
        public IRound Round
        {
            get => round;
            set
            {
                round = value;
                RoundId = round.RoundId;
            }
        }

        private IPlayer player;
        public IPlayer Player
        {
            get => player;
            set
            {
                player = value;
                PlayerId = player.PlayerId;
            }
        }

        public IEnumerable<IResult> ResultValues { get; set; }
    }
}
