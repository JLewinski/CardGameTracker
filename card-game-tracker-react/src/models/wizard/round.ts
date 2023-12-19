import { Player } from "../player";
import Score, { IScore } from "./score";

type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs' | 'No Trump';

interface IRound {
    Suit?: Suit;
    Number: number;
    Scores: { [key: string]: IScore };
}

class Round implements IRound {

    constructor(round: IRound | number, players?: Player[]) {
        this.Scores = {};
        if (typeof round === 'number') {
            this.Number = round;
            players?.forEach(player => this.Scores[player.Id] = new Score());
        } else {
            this.Suit = round.Suit;
            this.Number = round.Number;
            Object.keys(round.Scores).forEach(key => this.Scores[key] = new Score(round.Scores[key]));
        }
    }

    Suit?: Suit | undefined;
    Number: number;
    Scores: { [key: string]: Score };

    getTotalTricks() {
        return Object.values(this.Scores).reduce((sum, score) => sum + (score.TricksTaken ?? 0), 0);
    }

    isValid() {
        let totalTricksTaken = 0;
        for (let score of Object.values(this.Scores)) {
            if (score.TricksTaken == undefined) {
                return false;
            }
            totalTricksTaken += score.TricksTaken;
        }

        return totalTricksTaken === this.Number;
    }
}

export default Round;
export type { IRound, Suit };