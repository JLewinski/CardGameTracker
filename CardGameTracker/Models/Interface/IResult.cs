using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public interface IResult
    {
        int ResultValueId { get; set; }
        int RoundResultId { get; set; }
        int ResultOptionId { get; set; }

        [JsonIgnore]
        IRoundResult RoundResult { get; set; }
        [JsonIgnore]
        IResultOption ResultOption { get; set; }
    }
}
