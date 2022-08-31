namespace CardGameTracker.Models.Interface
{
    public interface IPlayer
    {
        int PlayerId { get; set; }
        string Name { get; set; }
        string NickName { get; set; }
        IEnumerable<IGame> Games { get; set; }
        IEnumerable<IRoundResult> RoundResults { get; set; }
    }
}
