using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public interface IPlayer
    {
        int PlayerId { get; set; }
        string Name { get; set; }
        string NickName { get; set; }
        [JsonIgnore]
        IEnumerable<IGame> Games { get; set; }
        IEnumerable<IRoundResult> RoundResults { get; set; }
    }
}
