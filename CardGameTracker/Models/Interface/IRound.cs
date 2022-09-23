using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public interface IRound
    {
        int RoundNumber { get; set; }
        int RoundId { get; set; }
        int GameId { get; set; }

        [JsonIgnore]
        IGame Game { get; set; }
        IEnumerable<IRoundResult> RoundResults { get; set; }
        IEnumerable<IRoundOption> RoundOptions { get; set; }
    }

    public interface IRoundOption
    {
        int RoundId { get; set; }
        int RoundOptionId { get; set; }
        string Name { get; set; }
        string? Value { get; set; }
        [JsonIgnore]
        IRound Round { get; set; }
    }
}
