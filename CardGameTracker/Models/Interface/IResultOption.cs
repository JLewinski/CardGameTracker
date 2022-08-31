namespace CardGameTracker.Models.Interface
{
    public interface IResultOption
    {
        int ResultOptionId { get; set; }
        int GameId { get; set; }
        string Name { get; set; }
        
        IGame Game { get; set; }
    }
}
