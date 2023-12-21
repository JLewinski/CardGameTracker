import { useContext, useEffect, useState } from "react";
import { IWizardGameData } from "../../models/wizard/game";
import { ISaveService } from "../../services/ISaveService";
import { NavLink, useNavigate } from "react-router-dom";
import { SaveServiceContext } from "../../App";
import { v4 as uuid } from 'uuid';
import { Player } from "../../models/player";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";


function Start() {

    const saveService = useContext<ISaveService>(SaveServiceContext);
    const navigate = useNavigate();

    const playerName = signal('');
    const players = signal<Player[]>([]);

    const [savedGames, setSavedGames] = useState<IWizardGameData[]>([]);

    useEffect(() => {
        const loadGames = async () => {
            const games = await saveService.loadAll<IWizardGameData>('Wizard');
            setSavedGames(games);
        };

        loadGames();
    }, [saveService]);


    function PlayerList() {
        useSignals();

        function removePlayer(player: Player) {
            players.value = players.value.filter(p => p !== player);
        }

        function addPlayer() {
            players.value = [...players.value, { Name: playerName.peek(), Id: uuid() }];
            playerName.value = '';
        }

        function PlayerItem(params: { player: Player }) {
            const { player } = params;
            return <li className="list-group-item">
                <div className="row">
                    <div className="col-2-md col">
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
            const game: IWizardGameData = {
                Id: uuid(),
                UserId: uuid(),
                CreatedDate: new Date(),
                LastModifiedDate: new Date(),
                GameType: 'Wizard',
                Players: players.value,
                Rounds: [],
            };

            saveService.save(game);
            navigate(`/wizard/game/${game.Id}`);
        }

        return <div>
            <ul className="list-group mb-2">
                {players.value.map(player => <PlayerItem key={player.Id} player={player} />)}
            </ul>
            {
                players.value.length < 6 &&
                <form className="row" onSubmit={e => { e.preventDefault(); addPlayer(); }}>
                    <div className="col-auto">
                        <input className="form-control" type="text" placeholder="Player Name" value={playerName.value} onChange={e => playerName.value = (e.target.value)} />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            }
            {
                players.value.length >= 4 && players.value.length <= 6 &&
                <button type="button" className="btn btn-primary mt-2" onClick={startGame}>Start Game</button>
            }
        </div>
    }

    function GameSettings() {
        return <div>Coming Soon</div>
    }

    function LoadedGames() {
        async function DeleteGame(game: IWizardGameData) {
            await saveService.delete(game.Id);
            setSavedGames(savedGames.filter(g => g.Id !== game.Id));
        }

        function LoadedGame(params: { game: IWizardGameData }) {
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
                        <th aria-label="open button"></th>
                        <th>Created</th>
                        <th>Updated</th>
                        <th>Type</th>
                        <th>Round</th>
                        <th>Players</th>
                        <th aria-label="delete button"></th>
                    </tr>
                </thead>
                <tbody>
                    {savedGames.map(game => <LoadedGame key={game.Id} game={game} />)}
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