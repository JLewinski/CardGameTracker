using CardGameTracker.Models.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Models.Poco
{
    public class GamePoco : IGame
    {
        public int GameId { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public DateTime? Deleted { get; set; }
        public bool IsFinished { get; set; }
        public IEnumerable<IPlayer> Players { get; set; }
        public IEnumerable<IResultOption> ResultOptions { get; set; }
        public IEnumerable<IRound> Rounds { get; set; }

        public void AddCreatedRound(IRound round)
        {
            if (Rounds is ICollection<IRound> rounds)
            {
                rounds.Add(round);
            }
            else
            {
                Rounds = Rounds.Append(round);
            }
        }
    }

    public class GameDisplay
    {
        public int GameId { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
    }
}
