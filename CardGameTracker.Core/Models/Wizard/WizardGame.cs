
using CardGameTracker.Models.Wizard;

namespace CardGameTracker.Models
{
    public class WizardGame : Game
    {
        public WizardGame() : base() { }

        public WizardGame(List<Player> players, User user) : base(players, user, GameType.Wizard) { }

        public override GameType GameType { get => GameType.Wizard; init => base.GameType = GameType.Wizard; }

        public string FirstDealer { get; set; } = string.Empty;
        public List<Round> Rounds { get; init; } = [];
        public int NumTotalRounds => Players.Count != 0 ? 60 / Players.Count : 0;

        public void AddRound()
        {
            if (Rounds.Count != 0)
            {
                var lastRound = Rounds.Last();
                var totalTricksTaken = lastRound.Scores.Sum(x => x.Value.TricksTaken);
                if (totalTricksTaken < Rounds.Count)
                {
                    //Not enough tricks taken
                    return;
                }
                else if (totalTricksTaken > Rounds.Count)
                {
                    //Too many tricks taken
                    return;
                }
                else if (lastRound.Scores.Any(x => x.Value.TricksTaken == null))
                {
                    //Not players recorded
                    return;
                }
            }

            Rounds.Add(new Round(Rounds.Count, Players));
        }

        public string GetCurrentDealer()
        {
            if (string.IsNullOrEmpty(FirstDealer))
            {
                return string.Empty;
            }

            var firstDealerIndex = Players.FindIndex(x => x.Name == FirstDealer);
            if (firstDealerIndex == -1)
            {
                return string.Empty;
            }

            var currentDealerIndex = (firstDealerIndex + Rounds.Count) % Players.Count;
            return Players[currentDealerIndex].Name;
        }

        public int GetScore(Player player)
        {
            return Rounds.Count != 0 ? Rounds.Sum(x => x.Scores[player.Name].CalculatedScore() ?? 0) : 0;
        }
    }
}