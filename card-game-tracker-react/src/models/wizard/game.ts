import { Game, GameType } from "../game";
import { Player } from "../player";
import Round, { IRound } from "./round";
import { v4 as uuid } from 'uuid';

interface IWizardGame extends Game {
    Rounds: IRound[];
    FirstDealer?: number;
    GetDealer(roundNumber: number): Player | undefined;
}

class WizardGame implements IWizardGame {

    constructor(game: IWizardGame | string) {
        if (typeof game === 'string') {
            this.UserId = game;
            this.Id = uuid();
            this.Players = [];
            this.CreatedDate = new Date();
            this.Rounds = [];
        } else {
            this.UserId = game?.UserId;
            this.Id = game.Id;
            this.Players = game.Players;
            this.CreatedDate = game.CreatedDate;
            this.LastModifiedDate = game.LastModifiedDate;
            this.Rounds = game.Rounds.map(x => new Round(x));
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
        let round = this.Rounds[roundNumber - 1];
        return round.getTotalTricks();
    }

    CurrentRound: number = 0;

    public AddRound() {
        if(this.CurrentRound > 0 && !this.Rounds[this.CurrentRound - 1].isValid()){
            //TODO: Show error message
            return null;
        }

        this.Rounds.push(new Round(this.CurrentRound + 1, this.Players));
        return this.Rounds[this.CurrentRound++];
    }

    FirstDealer: number | undefined = undefined;

    public GetDealer(roundNumber: number) {
        if (this.FirstDealer === undefined) {
            return undefined;
        }
        let index = (roundNumber + this.FirstDealer - 1) % this.Players.length;
        return this.Players[index];
    }

    public GetTotalScore(player: Player) {
        return this.Rounds.map(round => round.Scores[player.Id].CalculateScore()).reduce((sum, score) => sum + score, 0);
    }

    public GetScore(player: Player, roundNumber: number){
        return this.Rounds[roundNumber - 1].Scores[player.Id].CalculateScore();
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
export type { IWizardGame };