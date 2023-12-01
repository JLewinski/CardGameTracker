using System.ComponentModel;

namespace CardGameTracker.Models.Wizard;

public enum Trump
{
    Spades,
    Hearts,
    Diamonds,
    Clubs,
    [Description("No Trump")]
    NoTrump
}

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

    public Trump Trump { get; set; } = Trump.NoTrump;

    public int Number { get; init; }
    public Dictionary<string, Score> Scores { get; init; } = new();
    public bool IsComplete()
    {
        return Scores.Sum(x => x.Value.TricksTaken ?? 0) == Number;
    }
}