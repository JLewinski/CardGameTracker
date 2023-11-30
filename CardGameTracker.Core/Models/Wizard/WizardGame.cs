
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
            if (!IsValidRound(Rounds.Count))
            {
                //Round is not valid
                return;
            }
            else if (Rounds.Count == NumTotalRounds)
            {
                //Game is over
                return;
            }

            Rounds.Add(new Round(Rounds.Count, Players));
        }

        public bool IsValidRound(int roundNumber)
        {
            if (roundNumber == 0)
            {
                return true;
            }

            var round = Rounds[roundNumber - 1];
            var totalTricksTaken = round.Scores.Sum(x => x.Value.TricksTaken);
            if (totalTricksTaken < roundNumber)
            {
                //Not enough tricks taken
                return false;
            }
            else if (totalTricksTaken > roundNumber)
            {
                //Too many tricks taken
                return false;
            }
            else if (round.Scores.Any(x => x.Value.TricksTaken == null))
            {
                //Not players recorded
                return false;
            }

            return true;
        }

        public string GetDealer(int round)
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

            var currentDealerIndex = (firstDealerIndex + round - 1) % Players.Count;
            return Players[currentDealerIndex].Name;
        }

        public string GetCurrentDealer()
        {
            return GetDealer(Rounds.Count);
        }

        public int GetTotalScore(Player player)
        {
            return Rounds.Count != 0 ? Rounds.Sum(x => x.Scores[player.Name].CalculateScore() ?? 0) : 0;
        }

        public Score GetScore(Player player)
        {
            return Rounds.Last().Scores[player.Name];
        }
    }
}