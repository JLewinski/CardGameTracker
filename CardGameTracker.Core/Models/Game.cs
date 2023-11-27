namespace CardGameTracker.Models;

public class Game(List<Player> players, User user)
{
    public Guid UserId { get; set; } = user.Id;
    public Guid Id { get; set; } = Guid.NewGuid();
    public List<Player> Players { get; set; } = players;
    

}