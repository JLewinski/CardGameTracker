using CardGameTracker.Models.Interface;

namespace CardGameTracker.Models.Poco
{
    public class ResultValuePoco : IResultValue
    {
        public int ResultValueId { get; set; }
        public int RoundResultId { get; set; }
        public int ResultOptionId { get; set; }
        public IRoundResult RoundResult { get; set; }
        public IResultOption ResulutOption { get; set; }
    }
}
