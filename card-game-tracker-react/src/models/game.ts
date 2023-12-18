import { Player } from "./player";

type GameType = 'Wizard' | 'Hearts';

interface Game{
    UserId: string;
    Id: string;
    Players: Player[];
    CreatedDate: Date;
    LastModifiedDate?: Date;
    GameType: GameType;
}

export type { Game, GameType };