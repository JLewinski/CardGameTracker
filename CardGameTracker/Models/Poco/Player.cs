using CardGameTracker.Models.Interface;
using CardGameTracker.Services.DataServices;
using System.Data;

namespace CardGameTracker.Models.Poco
{
    public class PlayerPoco : IPlayer
    {
        public PlayerPoco() { }
        public PlayerPoco(IDataReader reader)
        {
            PlayerId = reader.GetValue<int>(nameof(PlayerId));
            Name = reader.GetValue<string>(nameof(Name));
            NickName = reader.GetValue<string>(nameof(NickName));
        }

        public int PlayerId { get; set; }
        public string Name { get; set; }
        public string NickName { get; set; }
        public IEnumerable<IGame> Games { get; set; }
        public IEnumerable<IRoundResult> RoundResults { get; set; }
    }
}
