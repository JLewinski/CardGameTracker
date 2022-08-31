using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public enum ResultType
    {
        STRING,
        INT,
        DOUBLE
    }
    
    public interface IResultOption
    {
        int ResultOptionId { get; set; }
        int GameId { get; set; }
        string Name { get; set; }
        ResultType ResultType { get; set; }

        [JsonIgnore]
        IGame Game { get; set; }
    }
}
