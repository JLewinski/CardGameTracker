import Score, { IScore } from "./score";

type Suit = 'Spades' | 'Hearts' | 'Diamonds' | 'Clubs' | 'No Trump';

interface IRound {
    Suit?: Suit;
    Number: number;
    Scores: Record<string, Score>;
}

class Round implements IRound {

    constructor(round: IRound | number, playerNames?: string[]) {
        this.scores = {};
        if (typeof round === 'number') {
            this.Number = round;
            playerNames?.forEach(name => this.Scores[name] = new Score());
        } else {
            this.Suit = round.Suit;
            this.Number = round.Number;
            Object.keys(round.Scores).forEach(key => this.Scores[key] = new Score(round.Scores[key]));
        }
    }

    Suit?: Suit | undefined;
    Number: number;
    private scores: Record<string, Score>;

    get Scores(): Record<string, Score> {
        return this.scores;
    }

}

export default Round;
export type { IRound, Suit };