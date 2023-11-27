namespace CardGameTracker.Models;

public class User(string name)
{
    public string Name { get; set; } = name;
    public Guid Id { get; set; } = new Guid();
}