namespace CardGameTracker.Models;

public enum GameType
{
    Wizard
}

public class Game
{
    public Game()
    {
        Players = [];
        Id = Guid.NewGuid();
    }
    
    public Game(List<Player> players, User user, GameType gameType)
    {
        UserId = user.Id;
        Id = Guid.NewGuid();
        Players = players;
        GameType = gameType;
    }

    public Guid UserId { get; init; }
    public Guid Id { get; init; } = Guid.NewGuid();
    public List<Player> Players { get; init; }

    public virtual GameType GameType { get; init; }

    public DateTime CreatedDate { get; init; } = DateTime.Now;
    public DateTime? LastModifiedDate { get; set; }
}