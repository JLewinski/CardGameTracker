namespace CardGameTracker.Models.Interface
{
    public interface IRoundResult
    {
        int RoundResultId { get; set; }
        int RoundId { get; set; }
        int PlayerId { get; set; }
        
        IRound Round { get; set; }
        IPlayer Player { get; set; }
    }
}
