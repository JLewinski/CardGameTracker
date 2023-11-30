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

    private int _bid;
    public int Bid
    {
        get => _bid;
        set
        {
            if (value < 0)
            {
                _bid = 0;
            }
            else
            {
                _bid = value;
            }
            CalculateScore();
        }
    }
    private int? _tricksTaken;
    public int? TricksTaken
    {
        get => _tricksTaken;
        set
        {
            if (value < 0)
            {
                _tricksTaken = 0;
            }
            else
            {
                _tricksTaken = value;
            }
            CalculateScore();
        }
    }

    public int? CalculateScore()
    {

        if (TricksTaken == null)
        {
            CalculatedScore = null;
        }
        else if (Bid == TricksTaken)
        {
            CalculatedScore = 20 + Bid * 10;
        }
        else
        {
            CalculatedScore = Math.Abs(Bid - TricksTaken.Value) * -10;
        }

        return CalculatedScore;
    }

    public int? CalculatedScore { get; private set; }
}