import { useComputed, useSignal, useSignals } from "@preact/signals-react/runtime";
import { Player } from "../../models/player";
import WizardGame from "../../models/wizard/game";
import { effect, signal } from "@preact/signals-react";
import Round from "../../models/wizard/round";

const isFullMode = signal(true);

const ScoreBoard: React.FC<{ game: WizardGame }> = ({ game }) => {
    useSignals();
    const PlayerScore: React.FC<{ player: Player }> = ({ player }) => (
        <tr>
            <td>{player.Name}</td>
            <td className="text-center">{game.GetTotalScore(player)}</td>
        </tr>
    );

    const Condinsed = (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th className="text-center">Score</th>
                </tr>
            </thead>
            <tbody>
                {game.Players.map(player => <PlayerScore key={player.Id} player={player} />)}
            </tbody>
        </table>
    );

    const numberArray = Array.from(Array(game.GetTotalRounds()).keys());

    const PlayerRoundScore: React.FC<{ player: Player, round: Round }> = ({ player, round }) => {
        const score = round.Scores[player.Id];
        let className = useComputed(() => round.Scores[player.Id].Bid === round.Scores[player.Id].TricksTaken ? "text-success" : "text-danger")
        return <div className={className.value}>
            {score.ComputedScore}({score.Bid} / {score.TricksTaken})
        </div>
    }

    const RoundScores: React.FC<{ roundNumber: number }> = ({ roundNumber: roundIndex }) => {
        var maxRounds = useSignal(0);
        effect(() => {
            if (game.CurrentRoundNumber > maxRounds.value){
                maxRounds.value = game.CurrentRoundNumber - 1;
            }
            if (game.IsFinished){
                maxRounds.value = game.CurrentRoundNumber;
            }
        });
        return <tr>
            <td>Round {roundIndex + 1}</td>
            {roundIndex < maxRounds.value && game.Players.map(player => <td key={player.Id} className="text-center"><PlayerRoundScore player={player} round={game.Rounds[roundIndex]} /></td>)}
            {roundIndex >= maxRounds.value && game.Players.map(player => <td key={player.Id} className="text-center"> - </td>)}
        </tr>
    };

    const Full = (
        <table className="table">
            <thead>
                <tr>
                    <th>Names</th>
                    {game.Players.map(player => <th key={player.Id} className="text-center">{player.Name}</th>)}
                </tr>
            </thead>
            <tbody>
                {numberArray.map(i => <RoundScores key={i} roundNumber={i} />)}
                <tr>
                    <td>Total</td>
                    {game.Players.map(player => <td key={player.Id} className="text-center">{game.GetTotalScore(player)}</td>)}
                </tr>
            </tbody>
        </table>
    );

    return <div>
        <button type="button" className="btn btn-primary" onClick={() => isFullMode.value = !isFullMode.value}>Toggle</button>
        {isFullMode.value ? Full : Condinsed}
    </div>
}



export default ScoreBoard;