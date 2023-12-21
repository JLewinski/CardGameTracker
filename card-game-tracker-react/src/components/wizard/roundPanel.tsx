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
        <td className={game.CurrentDealer === player ? 'text-success' : ''}>{player.Name}</td>
        <td><input disabled={round.isValid} title="bid" type="number" min={0} max={round.Number} value={round.Scores[player.Id].Bid} className="form-control" tabIndex={3} onChange={e => round.Scores[player.Id].Bid = e.target.valueAsNumber} /></td>
        <td><input disabled={game.IsFinished} title="tricks" type="number" min={0} max={round.Number} value={round.Scores[player.Id].TricksTaken ?? ''} className="form-control" tabIndex={4} onChange={e => round.Scores[player.Id].TricksTaken = e.target.valueAsNumber} /></td>
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

    const isSuitSelected = useComputed(() => game.CurrentRound?.Suit?.length);

    var suitClass = useComputed(() => {
        if (!isSuitSelected.value || game.CurrentRound?.Suit === 'No Trump') return 'bi bi-slash-circle';

        if (game.CurrentRound?.Suit === undefined) return '';

        let suitName = game.CurrentRound.Suit.toLocaleLowerCase();
        suitName = suitName.substring(0, suitName.length - 1);

        return `bi bi-suit-${suitName}`;
    });

    const headerClass = useComputed(() => !isSuitSelected.value ? 'text-center text-danger' : 'text-center');

    return <>
        <h1 className={headerClass.value}>
            <span className={suitClass.value}></span>
            <span className="ms-2">Round {round.Number} / {game.GetTotalRounds()}</span>
        </h1>
        <select title="suit" value={round.Suit ?? ''} className="form-control" onChange={e => round.Suit = e.target.value as Suit} tabIndex={1}>
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
    return <div>
        <div className="row">
            <div className="col"></div>
            <div className="col-auto">
                {round.Number > 1 &&
                    <button type="button" onClick={e => game.CurrentRoundNumber -= 1} className="btn btn-primary m-2" tabIndex={7}>Previous</button>
                }
                {round.isValid && !(round.Number === game.GetTotalRounds() && game.IsFinished) &&
                    <button type="button" onClick={() => { game.AddRound(); saveService.save(game); }} className="btn btn-primary" tabIndex={6}>{round.Number === game.GetTotalRounds() ? 'Finish Game' : 'Next'}</button>
                }
            </div>
            <div className="col"></div>
        </div>
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