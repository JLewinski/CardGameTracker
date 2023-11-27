namespace CardGameTracker.Models.Wizard;

public class Score
{
    public Score() { }

    public Score(int bid, int tricksTaken)
    {
        Bid = bid;
        TricksTaken = tricksTaken;
    }

    public int Bid { get; set; }
    public int TricksTaken { get; set; }
    public int CalculatedScore => Bid == TricksTaken ? 20 + Bid * 10 : Math.Abs(Bid - TricksTaken) * -10;
}