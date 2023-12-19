import { Game, GameType } from "../models/game";

interface ISaveService {
    save(game: Game): Promise<void>;
    load<T>(id: string): Promise<T>;
    loadAll<T>(gameType: GameType): Promise<T[]>;
    delete(id: string): Promise<void>;
}

export type { ISaveService }