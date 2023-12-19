interface IScore {
    Bid: number;
    TricksTaken?: number;
}

class Score implements IScore {

    constructor(score?: IScore) {
        this.Bid = score?.Bid ?? 0;
        this.TricksTaken = score?.TricksTaken;
    }

    Bid: number;
    TricksTaken?: number;

    CalculateScore() {
        let score = 0;

        if (this.Bid === this.TricksTaken) {
            score = 20 + (this.Bid * 10);
        } else if (this.TricksTaken == undefined) {
            score = 0;
        } else {
            score = Math.abs(this.Bid - this.TricksTaken) * -10;
        }

        return score;
    }
}

export default Score;
export type { IScore };