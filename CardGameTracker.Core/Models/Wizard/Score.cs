namespace CardGameTracker.Models.Wizard;

public class Score
{
    public Score()
    {
        Bid = 0;
        TricksTaken = null;
    }

    public Score(int bid, int tricksTaken)
    {
        Bid = bid;
        TricksTaken = tricksTaken;
    }

    public int Bid { get; set; }
    public int? TricksTaken { get; set; }
    public int? CalculatedScore()
    {
        if (TricksTaken == null)
        {
            return null;
        }

        if (Bid == TricksTaken)
        {
            return 20 + Bid * 10;
        }
        else
        {
            return Math.Abs(Bid - TricksTaken.Value) * -10;
        }
    }
}