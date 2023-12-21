import { computed, signal } from "@preact/signals-react";
import { Player } from "../player";
import Score, { IScoreData } from "./score";

type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs' | 'No Trump';

interface IRoundData {
    suit?: Suit;
    Number: number;
    Scores: { [key: string]: IScoreData };
}

class Round {

    constructor(round: IRoundData | number, players?: Player[]) {
        this.Scores = {};
        if (typeof round === 'number') {
            this.Number = round;
            players?.forEach(player => this.Scores[player.Id] = new Score());
        } else {
            this.Suit = round.suit;
            this.Number = round.Number;
            Object.keys(round.Scores).forEach(key => this.Scores[key] = new Score(round.Scores[key]));
        }
    }

    private suit = signal<Suit | undefined>(undefined);
    get Suit() { return this.suit.value; }
    set Suit(value) { this.suit.value = value; }
    
    Number: number;
    Scores: { [key: string]: Score };

    private totalBid = computed(() => Object.values(this.Scores).reduce((sum, score) => sum + score.Bid, 0));
    get TotalBid() { return this.totalBid.value; }

    private totalTricks = computed(() => Object.values(this.Scores).reduce((sum, score) => sum + (score.TricksTaken ?? 0), 0));
    get TotalTricks() { return this.totalTricks.value; }

    private _isValid = computed(() => {
    
        let totalTricksTaken = 0;
        if (this.Suit === undefined) {
            return false;
        }
        for (let score of Object.values(this.Scores)) {
            if (score.TricksTaken === undefined) {
                return false;
            }
            totalTricksTaken += score.TricksTaken;
        }

        return totalTricksTaken === this.Number;
    });
    get isValid() { return this._isValid.value; }
}

export default Round;
export type { IRoundData, Suit };