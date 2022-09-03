using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public class ResultOptionalValuePoco : IResultOptionalValues
    {
        public int ResultOptionId { get; set; }
        public string OptionalValue { get; set; }
        public int Index { get; set; }
        public IResultOption ResultOption { get; set; }
    }
}