import { computed, effect, signal } from "@preact/signals-react";

interface IScoreData {
    bid: number;
    tricksTaken?: number;
}

class Score {

    constructor(score?: IScoreData) {
        if (score !== undefined) {
            this.Bid = score.bid;
            this.TricksTaken = score.tricksTaken;
        }
    }

    private count = 0;

    bid = signal(0);
    peekBid() { return this.bid.peek(); }
    get Bid() { return this.bid.value; }
    set Bid(value) { this.bid.value = value; }

    private tricksTaken = signal<number | undefined>(undefined);
    peekTricks() { return this.tricksTaken.peek(); }
    get TricksTaken() { return this.tricksTaken.value; }
    set TricksTaken(value) { this.tricksTaken.value = value; }

    score = computed(() =>
        (this.Bid === this.TricksTaken)
            ? 20 + (this.Bid * 10)
            : (this.TricksTaken === undefined)
                ? 0
                : Math.abs(this.Bid - this.TricksTaken) * -10);

    get ComputedScore() { return this.score.value; }

}

export default Score;
export type { IScoreData };