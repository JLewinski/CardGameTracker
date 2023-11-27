namespace CardGameTracker.Models.Wizard;

public class Round
{
    public Round() { }
    public Round(int number, List<Player> players)
    {
        Number = number;
        foreach (var player in players)
        {
            Scores.Add(player.Name, new Score());
        }
    }

    public int Number { get; init; }
    public Dictionary<string, Score> Scores { get; init; } = new();
}