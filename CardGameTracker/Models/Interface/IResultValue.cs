namespace CardGameTracker.Models.Interface
{
    public interface IResultValue
    {
        int ResultValueId { get; set; }
        int RoundResultId { get; set; }
        int ResultOptionId { get; set; }
        
        IRoundResult RoundResult { get; set; }
        IResultOption ResulutOption { get; set; }
    }
}
