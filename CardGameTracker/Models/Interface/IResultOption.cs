using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public enum ResultType
    {
        STRING,
        INT,
        DOUBLE,
        SELECTION
    }

    public interface IResultOption
    {
        int ResultOptionId { get; set; }
        int GameId { get; set; }
        string Name { get; set; }
        ResultType ResultType { get; set; }

        [JsonIgnore]
        IGame Game { get; set; }

        IEnumerable<IResultOptionalValues> ResultOptionalValues { get; set; }

    }

    public interface IResultOptionalValues
    {
        int ResultOptionId { get; set; }
        string OptionalValue { get; set; }
        int Index { get; set; }

        [JsonIgnore]
        IResultOption ResultOption { get; set; }
    }
}
