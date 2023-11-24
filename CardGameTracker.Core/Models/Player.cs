namespace CardGameTracker.Models;

public class Player(string name)
{
    public string Name { get; set; } = name;
    public int Id { get; set; }
}
