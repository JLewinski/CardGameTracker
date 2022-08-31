using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Models.Interface
{
    public interface IGame
    {
        int GameId { get; set; }
        string Name { get; set; }
        DateTime Created { get; set; }
        DateTime Updated { get; set; }
        DateTime? Deleted { get; set; }
        bool IsFinished { get; set; }

        IEnumerable<IPlayer> Players { get; set; }
        IEnumerable<IResultOption> ResultOptions { get; set; }
        IEnumerable<IRound> Rounds { get; set; }

        void AddCreatedRound(IRound round);
    }
}
