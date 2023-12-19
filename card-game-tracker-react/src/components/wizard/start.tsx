import { useContext, useEffect, useState } from "react";
import { IWizardGame } from "../../models/wizard/game";
import { ISaveService } from "../../services/ISaveService";
import { NavLink, useNavigate } from "react-router-dom";
import { SaveServiceContext } from "../../App";
import { v4 as uuid } from 'uuid';
import { Player } from "../../models/player";


function Start() {

    const saveService = useContext<ISaveService>(SaveServiceContext);
    const navigate = useNavigate();

    function PlayerList() {
        const [players, setPlayers] = useState<Player[]>([]);
        const [playerName, setPlayerName] = useState<string>('');

        function removePlayer(player: Player) {
            setPlayers(players.filter(p => p != player));
        }

        function addPlayer() {
            players.push({ Name: playerName, Id: uuid() });
            setPlayerName('');
        }

        function PlayerItem(params: { player: Player }) {
            const { player } = params;
            return <li className="list-group-item">
                <div className="row">
                    <div className="col-2">
                        <p>{player.Name}</p>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger"
                            onClick={e => removePlayer(player)}>Remove</button>
                    </div>
                </div>
            </li >;
        }

        function startGame() {
            const game: IWizardGame = {
                Id: uuid(),
                UserId: uuid(),
                CreatedDate: new Date(),
                LastModifiedDate: new Date(),
                GameType: 'Wizard',
                Players: players,
                Rounds: [],
                GetDealer: (round: number) => undefined
            };

            saveService.save(game);
            navigate(`/wizard/game/${game.Id}`);
        }

        return <div>
            <ul className="list-group mb-2">
                {players.map(player => <PlayerItem player={player} />)}
            </ul>
            {
                players.length < 6 &&
                <form className="row" onSubmit={e => { e.preventDefault(); addPlayer(); }}>
                    <div className="col-auto">
                        <input className="form-control" type="text" placeholder="Player Name" value={playerName} onChange={e => setPlayerName(e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            }
            {
                players.length >= 4 && players.length <= 6 &&
                <button type="button" className="btn btn-primary mt-2" onClick={startGame}>Start Game</button>
            }
        </div>
    }

    function GameSettings() {
        return <div>Coming Soon</div>
    }

    const [savedGames, setSavedGames] = useState<IWizardGame[]>([]);

    useEffect(() => {
        const loadGames = async () => {
            const games = await saveService.loadAll<IWizardGame>('Wizard');
            setSavedGames(games);
        };

        loadGames();
    }, [saveService]);

    function LoadedGames() {
        async function DeleteGame(game: IWizardGame) {
            await saveService.delete(game.Id);
            setSavedGames(savedGames.filter(g => g.Id != game.Id));
        }

        function LoadedGame(params: { game: IWizardGame }) {
            const { game } = params;

            return <tr>
                <td>
                    <NavLink className="btn btn-primary" to={`/wizard/game/${game.Id}`}>
                        <span>Open</span>
                    </NavLink>
                </td>
                <td>{game.CreatedDate.toString()}</td>
                <td>{game.LastModifiedDate?.toString()}</td>
                <td>{game.GameType}</td>
                <td>{game.Rounds.length / (60 / game.Players.length)}</td>
                <td>{game.Players.length}</td>
                <td>
                    <button type="button" className="btn btn-danger" onClick={() => DeleteGame(game)}>Delete</button>
                </td>
            </tr >
        }

        return <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Type</th>
                        <th>Round</th>
                        <th>Players</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {savedGames.map(game => <LoadedGame game={game} />)}
                </tbody>
            </table>
        </div >
    }

    return (
        <div className="container mt-2">
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#players-tab" type="button"
                                role="tab">Players</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#settings-tab" type="button"
                                role="tab">Settings</button>
                        </li>
                        {savedGames.length > 0 &&
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#load-tab" type="button"
                                    role="tab">Load</button>
                            </li>
                        }
                    </ul>
                </div>
                <div className="card-body">
                    <div className="tab-content">
                        <div id="players-tab" className="tab-pane fade show active" role="tabpanel">
                            <PlayerList />
                        </div>
                        <div id="settings-tab" className="tab-pane fade" role="tabpanel">
                            <GameSettings />
                        </div>
                        <div id="load-tab" className="tab-pane fade" role="tabpanel">
                            <LoadedGames />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Start;