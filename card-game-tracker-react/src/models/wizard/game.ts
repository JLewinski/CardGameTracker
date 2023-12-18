import { Game, GameType } from "../game";
import { Player } from "../player";
import Round, { IRound } from "./round";

interface IWizardGame extends Game {
    Rounds: Round[];
}

class WizardGame implements IWizardGame {

    constructor(game: IWizardGame | string) {
        if (typeof game === 'string') {
            this.UserId = game;
            this.Id = crypto.randomUUID();
            this.Players = [];
            this.CreatedDate = new Date();
            this.Rounds = [];
        } else {
            this.UserId = game?.UserId;
            this.Id = game.Id;
            this.Players = game.Players;
            this.CreatedDate = game.CreatedDate;
            this.LastModifiedDate = game.LastModifiedDate;
            this.Rounds = game.Rounds;
        }
    }

    UserId: string;
    Id: string;
    Players: Player[];
    CreatedDate: Date;
    LastModifiedDate?: Date | undefined;
    get GameType(): GameType { return 'Wizard'; }

    Rounds: Round[];

    public IsValidRound(roundNumber: number) {
        if (roundNumber == 0) {
            return true;
        }

        let round = this.Rounds[roundNumber - 1];
        let totalTricksTaken = 0;
        for(let score of Object.values(round.Scores)){
            if(score.TricksTaken == undefined){
                return false;
            }
            totalTricksTaken += score.TricksTaken;
        }

        return totalTricksTaken === round.Number;
    }

    public getTotalTricks(roundNumber: number) {
        let scores = this.Rounds[roundNumber - 1].Scores;
        return Object.values(scores).reduce((sum, score) => sum + (score.TricksTaken ?? 0), 0);
    }

    CurrentRound: number = 0;

    public AddRound() {
        if(!this.IsValidRound(this.CurrentRound)){
            //TODO: Show error message
            return;
        }

        this.Rounds.push(new Round(this.CurrentRound + 1, this.Players.map(p => p.Name)));
        this.CurrentRound++;
    }

    FirstDealer: number = 0;

    public GetDealer(roundNumber: number) {
        let index = (roundNumber + this.FirstDealer) % this.Players.length;
        return this.Players[index];
    }

    public GetTotalScore(player: Player) {
        return this.Rounds.map(round => round.Scores[player.Name].CalculateScore()).reduce((sum, score) => sum + score, 0);
    }

    public GetScore(player: Player, roundNumber: number){
        return this.Rounds[roundNumber - 1].Scores[player.Name].CalculateScore();
    }

    public IsWinner(player: Player){
        let maxScore = Math.max(...this.Players.map(p => this.GetTotalScore(p)));
        return this.GetTotalScore(player) === maxScore;
    }

    public IsLowest(player: Player){
        let minScore = Math.min(...this.Players.map(p => this.GetTotalScore(p)));
        return this.GetTotalScore(player) === minScore;
    }
}

export default WizardGame;