import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISaveService } from "../../services/ISaveService";
import { SaveServiceContext } from "../../App";
import WizardGame, { IWizardGameData } from "../../models/wizard/game";
import ScoreBoard from "./scoreBoard";
import RoundPanel from "./roundPanel";

const Game: React.FC<{}> = () => {
    const saveService = useContext<ISaveService>(SaveServiceContext);
    const { id } = useParams<{ id: string }>();

    if (!id) throw new Error('No id provided');

    useEffect(() => {
        const loadGame = async () => {
            const loadedGameData = await saveService.load<IWizardGameData>(id);
            const wizardGame = new WizardGame(loadedGameData);
            setGame(wizardGame);
        };

        loadGame();
    }, [saveService, id]);

    const [game, setGame] = useState<WizardGame | null>(null);

    function setFirstDealer() {
        if (game?.FirstDealer === undefined) return;

        game.AddRound();
        saveService.save(game);
    }

    const DealerPanel: React.FC<{ game: WizardGame }> = ({ game }) => {
        return <div>
            <h1>Select Dealer</h1>
            <select className="form-select" aria-label="Default select example" onChange={e => game.FirstDealer = parseInt(e.target.value)}>
                <option value={undefined}>Select Dealer</option>
                {game.Players.map((player, i) => <option key={player.Id} value={i}>{player.Name}</option>)}
            </select>
            <button type="button" onClick={setFirstDealer} className="btn btn-primary mt-2">Set Dealer</button>
        </div>
    }

    return <div className="container">
        {game == null && <h1>Loading...</h1>}
        {game != null && game.CurrentRound === undefined &&
            <DealerPanel game={game} />
        }
        {game?.CurrentRound !== undefined &&
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#round-tab" type="button" role="tab">Round</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#score-tab" type="button" role="tab">Score</button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div id="score-tab" className="tab-pane fade">
                            <h1 className="text-center">Score Board</h1>
                            <ScoreBoard game={game} />
                        </div>
                        <div id="round-tab" className="tab-pane fade show active">
                            <RoundPanel game={game} />
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}

export default Game;