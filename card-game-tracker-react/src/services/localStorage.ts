import { Game, GameType } from "../models/game";
import { ISaveService } from "./ISaveService";

class LocalStorageSaveService implements ISaveService {

    private getIds() {
        return JSON.parse(localStorage.getItem('gameIds') ?? '[]') as string[];
    }

    async save(game: Game) {
        let ids = this.getIds();
        if (ids.indexOf(game.Id) === -1) {
            ids.push(game.Id);
        }
        localStorage.setItem('gameIds', JSON.stringify(ids));
        localStorage.setItem(game.Id, JSON.stringify(game));
    }

    async load<T>(id: string): Promise<T> {
        var jsonText = localStorage.getItem(id);
        if (!jsonText) {
            throw new Error(`No game found with id ${id}`);
        }
        return JSON.parse(jsonText);
    }

    async loadAll<T>(gameType: GameType): Promise<T[]> {
        const ids = this.getIds();

        const games = ids.map(id => localStorage.getItem(id))
            .filter(x => x)
            .map(x => JSON.parse(x as string) as Game)
            .filter(x => x.GameType === gameType);

        return games as T[];
    }

    async delete(id: string): Promise<void> {
        let ids = this.getIds();
        const index = ids.indexOf(id);
        if (index > -1) {
            ids.splice(index, 1);
        }
        localStorage.removeItem(id);
    }

}

export default LocalStorageSaveService;