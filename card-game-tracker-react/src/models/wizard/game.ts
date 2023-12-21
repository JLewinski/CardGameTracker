import { Game, GameType } from "../game";
import { Player } from "../player";
import Round, { IRoundData } from "./round";
import { v4 as uuid } from 'uuid';
import { computed, signal } from '@preact/signals-react';

interface IWizardGameData extends Game {
    Rounds: IRoundData[];
    FirstDealer?: number;
    // GetDealer(roundNumber: number): Player | undefined;
    currentRoundNumber?: number;
    isFinished?: boolean;
}

class WizardGame {

    constructor(game: IWizardGameData | string) {
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
            this.CurrentRoundNumber = game.currentRoundNumber ?? 0;
            this.FirstDealer = game.FirstDealer;
            this.IsFinished = game.isFinished ?? false;
        }
    }

    UserId: string;
    Id: string;
    Players: Player[];
    CreatedDate: Date;
    LastModifiedDate?: Date | undefined;

    GameType = 'Wizard' as GameType;

    Rounds: Round[];

    private isFinished = signal(false);
    get IsFinished() { return this.isFinished.value; }
    set IsFinished(value) { this.isFinished.value = value; }

    private currentRoundNumber = signal(0);
    get CurrentRoundNumber() { return this.currentRoundNumber.value; }
    set CurrentRoundNumber(value) { this.currentRoundNumber.value = value; }

    private currentRound = computed(() => this.CurrentRoundNumber > 0 ? this.Rounds[this.CurrentRoundNumber - 1] : undefined);
    get CurrentRound() { return this.currentRound.value; }

    FirstDealer?: number;

    public IsValidRound(roundNumber: number) {
        if (roundNumber === 0) {
            return true;
        }

        let round = this.Rounds[roundNumber - 1];
        let totalTricksTaken = 0;
        for (let score of Object.values(round.Scores)) {
            if (score.TricksTaken === undefined) {
                return false;
            }
            totalTricksTaken += score.TricksTaken;
        }

        return totalTricksTaken === round.Number;
    }

    public getTotalTricks(roundNumber: number) {
        let round = this.Rounds[roundNumber - 1];
        return round.TotalTricks;
    }

    public AddRound() {
        if (this.CurrentRoundNumber > 0 && !this.CurrentRound?.isValid) {
            //TODO: Show error message
            console.log(`Round is not valid ${this.CurrentRoundNumber}`);
            return false;
        }

        if (this.CurrentRoundNumber < this.GetTotalRounds()) {
            if (this.CurrentRoundNumber === this.Rounds.length) {
                this.Rounds.push(new Round(this.CurrentRoundNumber + 1, this.Players));
            }
            this.CurrentRoundNumber++;
        } else {
            this.IsFinished = true;
        }

        return true;
    }

    public GetDealer(roundNumber: number) {
        if (this.FirstDealer === undefined) {
            return undefined;
        }
        let index = (roundNumber + this.FirstDealer - 1) % this.Players.length;
        return this.Players[index];
    }

    public GetTotalScore(player: Player) {
        const roundScores = this.Rounds.map(round => round.Scores[player.Id].ComputedScore);
        return roundScores.reduce((sum, score) => sum + score, 0);
    }

    public GetScore(player: Player, roundNumber: number) {
        return this.Rounds[roundNumber - 1].Scores[player.Id].ComputedScore;
    }

    public IsWinner(player: Player) {
        let maxScore = Math.max(...this.Players.map(p => this.GetTotalScore(p)));
        return this.GetTotalScore(player) === maxScore;
    }

    public IsLowest(player: Player) {
        let minScore = Math.min(...this.Players.map(p => this.GetTotalScore(p)));
        return this.GetTotalScore(player) === minScore;
    }

    public GetTotalRounds() {
        return Math.floor(60 / this.Players.length);
    }
}

export default WizardGame;
export type { IWizardGameData };