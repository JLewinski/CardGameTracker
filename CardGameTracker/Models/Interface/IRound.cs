namespace CardGameTracker.Models.Interface
{
    public interface IRound
    {
        int RoundNumber { get; set; }
        int RoundId { get; set; }
        int GameId { get; set; }
        
        IGame Game { get; set; }
        IEnumerable<IRoundResult> RoundResults { get; set; }
    }
}
