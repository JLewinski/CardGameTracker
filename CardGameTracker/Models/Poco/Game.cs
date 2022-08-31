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
        public IEnumerable<IPlayer> Players { get; set; }
        public IEnumerable<IResultOption> ResultOptions { get; set; }
        public IEnumerable<IRound> Rounds { get; set; }
    }
}
