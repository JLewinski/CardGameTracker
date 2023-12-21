import { useComputed, useSignals } from "@preact/signals-react/runtime";
import WizardGame from "../../models/wizard/game";
import Round, { Suit } from "../../models/wizard/round";
import { Player } from "../../models/player";
import { useContext } from "react";
import { ISaveService } from "../../services/ISaveService";
import { SaveServiceContext } from "../../App";


const PlayerRound: React.FC<{ game: WizardGame, player: Player }> = ({ game, player }) => {
    useSignals();
    const round = game.CurrentRound as Round;
    const score = round.Scores[player.Id];
    return <tr>
        <td>{player.Name}</td>
        <td><input disabled={round.isValid} title="bid" type="number" min={0} max={round.Number} value={round.Scores[player.Id].Bid} className="form-control" tabIndex={1} onChange={e => round.Scores[player.Id].Bid = e.target.valueAsNumber} /></td>
        <td><input disabled={game.IsFinished} title="tricks" type="number" min={0} max={round.Number} value={round.Scores[player.Id].TricksTaken ?? ''} className="form-control" tabIndex={2} onChange={e => round.Scores[player.Id].TricksTaken = e.target.valueAsNumber} /></td>
        <td className="text-center">{score.ComputedScore}</td>
    </tr>
}

const RoundTotal: React.FC<{ game: WizardGame }> = ({ game }) => {
    useSignals();
    const round = game.CurrentRound as Round;
    return <tr>
        <td></td>
        <td className="text-center"><small>{round.TotalBid} / {round.Number}</small>
        </td>
        <td className="text-center"><small className={round.isValid ? "text-success" : "text-danger"}>{round.TotalTricks} / {round.Number}</small></td>
        <td></td>
    </tr>
}

const RoundHeader: React.FC<{ game: WizardGame }> = ({ game }) => {
    useSignals();
    const round = game.CurrentRound as Round;
    var suitClass = useComputed(() => {
        if (game.CurrentRound?.Suit == undefined) return 'bi';
        if (game.CurrentRound?.Suit == 'No Trump') return 'bi bi-slash-circle';
        let suitName = game.CurrentRound.Suit.toLocaleLowerCase();
        suitName = suitName.substring(0, suitName.length - 1);

        return `bi bi-suit-${suitName}`;
    });
    return <>
        <h1>
            {round.Suit != undefined && <span className={suitClass.value}></span>}
            {!round.Suit?.length && <span className="text-danger">SELECT SUIT</span>}
            <span className="ms-2">Round {round.Number} / {game.GetTotalRounds()}</span>
        </h1>
        <select title="suit" value={round.Suit ?? ''} className="form-control" onChange={e => round.Suit = e.target.value as Suit}>
            <option value="">Select Suit</option>
            <option value="Clubs">Clubs</option>
            <option value="Diamonds">Diamonds</option>
            <option value="Hearts">Hearts</option>
            <option value="Spades">Spades</option>
            <option value="No Trump">No Trump</option>
        </select>
    </>
}

const RoundButtons: React.FC<{ game: WizardGame }> = ({ game }) => {
    useSignals();
    const saveService = useContext<ISaveService>(SaveServiceContext);
    const round = game.CurrentRound as Round;
    return <div className="row">
        <div className="col"></div>
        <div className="col-auto">
            {round.Number > 1 &&
                <button type="button" onClick={e => game.CurrentRoundNumber -= 1} className="btn btn-primary m-2" tabIndex={4}>Previous Round</button>
            }
            {round.isValid && !(round.Number == game.GetTotalRounds() && game.IsFinished) &&
                <button type="button" onClick={() => { game.AddRound(); saveService.save(game); }} className="btn btn-primary" tabIndex={3}>{round.Number == game.GetTotalRounds() ? 'Finish Game' : 'Next Round'}</button>
            }
        </div>
        <div className="col"></div>
    </div>
}

const RoundPanel: React.FC<{ game: WizardGame }> = ({ game }) => {
    const players = game.Players;
    return <div>
        <RoundHeader game={game} />

        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Bid</th>
                        <th>Tricks</th>
                        <th className="text-center">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(player => <PlayerRound key={player.Id} game={game} player={player} />)}
                    <RoundTotal game={game} />
                </tbody>
            </table>
        </div>
        <RoundButtons game={game} />
    </div>
}

export default RoundPanel;