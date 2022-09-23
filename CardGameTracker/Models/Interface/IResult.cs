using System.Text.Json.Serialization;

namespace CardGameTracker.Models.Interface
{
    public interface IResult
    {
        int ResultValueId { get; set; }
        int RoundResultId { get; set; }
        int ResultOptionId { get; set; }
        string ResultValue { get; set; }


        [JsonIgnore]
        IRoundResult RoundResult { get; set; }
        [JsonIgnore]
        IResultOption ResultOption { get; set; }

        public object ParsedValue { get; set; }
    }

    public abstract class ResultBase
    {
        public virtual string ResultValue { get; set; }
        [JsonIgnore]
        public abstract IResultOption ResultOption { get; set; }

        public virtual object ParsedValue
        {
            get => Parse(ResultValue);
            set
            {
                ResultValue = GetDefault(value);
            }
        }

        private object Parse(string str) => ResultOption?.ResultType switch
        {
            ResultType.DOUBLE => double.TryParse(ResultValue, out double dval) ? dval : 0,
            ResultType.INT => int.TryParse(ResultValue, out var ival) ? ival : 0,
            ResultType.STRING => ResultValue,
            ResultType.SELECTION =>
                int.TryParse(ResultValue, out var ival) ?
                    ResultOption?.ResultOptionalValues.First(x => x.Index == ival).OptionalValue ??
                        throw new NullReferenceException("Value was null") :
                    throw new NullReferenceException("Index of value was not a number."),
            _ => throw new ArgumentOutOfRangeException(nameof(ResultOption), $"Not expected enum value: {ResultOption?.ResultType}")
        };

        private string GetDefault(object obj) => obj?.ToString() ?? ResultOption?.ResultType switch
        {
            ResultType.DOUBLE => "0",
            ResultType.INT => "0",
            ResultType.STRING => string.Empty,
            _ => throw new ArgumentOutOfRangeException(nameof(ResultOption), $"Not expected enum value: {ResultOption?.ResultType}")
        };
    }
}
