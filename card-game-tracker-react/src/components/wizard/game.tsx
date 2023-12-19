import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISaveService } from "../../services/ISaveService";
import { SaveServiceContext } from "../../App";
import WizardGame, { IWizardGame } from "../../models/wizard/game";
import Round, { IRound } from "../../models/wizard/round";
import { Player } from "../../models/player";



export default function Game() {
    const saveService = useContext<ISaveService>(SaveServiceContext);
    const { id } = useParams<{ id: string }>();

    if (!id) throw new Error('No id provided');

    const [game, setGame] = useState<WizardGame | null>(null);
    const [currentRound, setRound] = useState<IRound | null>(null);

    function setFirstDealer() {
        debugger;
        if (game?.FirstDealer == undefined) return;

        setRound(game.AddRound());
        setGame(game);
        saveService.save(game);
    }

    useEffect(() => {
        const loadGame = async () => {
            const wizardGame = new WizardGame(await saveService.load<IWizardGame>(id));
            setGame(wizardGame);
            setRound(wizardGame.Rounds.length ? wizardGame.Rounds[wizardGame.Rounds.length - 1] : null);
        };

        loadGame();
    }, [saveService]);

    function PlayerScore(params: { player: Player}) {
        const { player } = params;
        return <tr>
            <td>{player.Name}</td>
            <td className="text-center">{game?.GetTotalScore(player)}</td>
        </tr>
    }

    return <div className="container">
        {game == null && <h1>Loading...</h1>}
        {game != null && currentRound == null &&
            <div>
                <h1>Select Dealer</h1>
                <select className="form-select" aria-label="Default select example" onChange={e => game.FirstDealer = parseInt(e.target.value)}>
                    <option key="0" value={undefined}>Select Dealer</option>
                    {game.Players.map((player, i) => <option key={player.Id} value={i}>{player.Name}</option>)}
                </select>
                <button type="button" onClick={setFirstDealer} className="btn btn-primary mt-2">Set Dealer</button>
            </div>
        }
        {currentRound != null &&
            <div>
                <div className="row">
                    <div className="col-md-3 order-1 order-md-0">
                        <h1 className="text-center">Score Board</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="text-center">Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    game?.Players.map(player => <PlayerScore player={player} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        }
    </div>
}