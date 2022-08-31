using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public interface IRoundResult
    {
        int RoundResultId { get; set; }
        int RoundId { get; set; }
        int PlayerId { get; set; }

        [JsonIgnore]
        IRound Round { get; set; }
        [JsonIgnore]
        IPlayer Player { get; set; }

        IEnumerable<IResult> ResultValues { get; set; }
    }
}
