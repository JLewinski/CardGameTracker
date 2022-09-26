using CardGameTracker.Models.Interface;
using CardGameTracker.Services.DataServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CardGameTracker.Models.Poco
{
    public class GamePoco : IGame
    {
        public GamePoco() { }
        public GamePoco(IDataReader reader)
        {
            GameId = reader.GetValue<int>(nameof(GameId));
            Name = reader.GetValue<string>(nameof(Name));
            Created = reader.GetValue<DateTime>(nameof(Created));
            Updated = reader.GetValue<DateTime>(nameof(Updated));
            Deleted = reader.GetValue<DateTime?>(nameof(Deleted));
            IsFinished = reader.GetValue<bool>(nameof(IsFinished));

        }

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
        public GameDisplay() { }
        public GameDisplay(IDataReader reader)
        {
            GameId = reader.GetValue<int>(nameof(GameId));
            Name = reader.GetValue<string>(nameof(Name));
            Created = reader.GetValue<DateTime>(nameof(Created));   
        }

        public int GameId { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
    }
}
